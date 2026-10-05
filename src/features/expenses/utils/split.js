import { SPLIT_TYPES } from '@/models/expense';
import { MoneyUtils } from '@/utils/money';

/** Same rounding as the backend: leftover kobo go to the first people in order. */
export const splitEqually = (amount, ids) => {
  const count = ids.length || 1;
  const base = Math.floor(amount / count);
  const remainder = amount - base * count;
  return Object.fromEntries(ids.map((id, i) => [id, base + (i < remainder ? 1 : 0)]));
};

/**
 * Rescales an exact split to a new total, keeping each person's proportion.
 * Rounding leftovers land on the last share so the sum is exact. The backend
 * reapplies stored exact shares as-is on an amount-only edit, which fails once
 * the total changes, so exact edits send the scaled shares explicitly.
 */
export const scaleExactShares = (shares, oldAmount, newAmount) => {
  let assigned = 0;
  return shares.map((share, index) => {
    const amount =
      index === shares.length - 1
        ? newAmount - assigned
        : Math.round((share.amount * newAmount) / oldAmount);
    assigned += amount;
    return { user: share.user.id ?? share.user, amount };
  });
};

/**
 * Turns the add-expense form into per-member previews, a status line and the
 * API payload. `form`: `{ amount, splitType, participants, exact, pct }` where
 * `participants` maps id → bool and `exact`/`pct` map id → input string.
 */
export const computeSplit = (form, memberIds) => {
  const amount = MoneyUtils.toKobo(form.amount);
  const shares = {};
  let ok;
  let statusText;
  let payload;

  if (form.splitType === SPLIT_TYPES.EQUAL) {
    const ids = memberIds.filter((id) => form.participants[id]);
    Object.assign(shares, splitEqually(amount, ids));
    ok = ids.length > 0 && amount > 0;
    statusText = ids.length
      ? `Split equally between ${ids.length} ${ids.length === 1 ? 'person' : 'people'}`
      : 'Pick at least one person';
    payload = { splitType: SPLIT_TYPES.EQUAL, participants: ids };
  } else if (form.splitType === SPLIT_TYPES.EXACT) {
    let assigned = 0;
    memberIds.forEach((id) => {
      shares[id] = MoneyUtils.toKobo(form.exact[id]);
      assigned += shares[id];
    });
    const left = amount - assigned;
    ok = amount > 0 && left === 0;
    statusText =
      left === 0
        ? 'Shares add up to the total'
        : left > 0
          ? `${MoneyUtils.format(left)} left to assign`
          : `${MoneyUtils.format(left)} over the total`;
    payload = {
      splitType: SPLIT_TYPES.EXACT,
      shares: memberIds.filter((id) => shares[id] > 0).map((id) => ({ user: id, amount: shares[id] })),
    };
  } else {
    let total = 0;
    memberIds.forEach((id) => {
      const pct = parseFloat(form.pct[id]) || 0;
      total += pct;
      shares[id] = Math.round((amount * pct) / 100);
    });
    const left = Math.round((100 - total) * 100) / 100;
    ok = amount > 0 && Math.abs(left) < 0.001;
    statusText =
      left === 0
        ? 'Percentages add up to 100%'
        : left > 0
          ? `${left}% left to assign`
          : `${-left}% over 100%`;
    payload = {
      splitType: SPLIT_TYPES.PERCENTAGE,
      shares: memberIds
        .filter((id) => (parseFloat(form.pct[id]) || 0) > 0)
        .map((id) => ({ user: id, percent: parseFloat(form.pct[id]) })),
    };
  }

  const tone = ok ? 'success' : amount ? 'warning' : 'neutral';

  return {
    amount,
    shares,
    ok,
    tone,
    payload,
    statusText: amount ? statusText : 'Enter an amount to split',
  };
};
