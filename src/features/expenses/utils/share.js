import { MoneyUtils } from '@/utils/money';

/**
 * What an expense means for the viewer: "You lent ₦X" when they paid,
 * "You borrowed ₦X" when someone else did, else "Not involved".
 *
 * This is what the expense itself did, not a live balance: payments aren't
 * tied to expenses, so whether it's been paid back shows in the balances.
 */
export const shareInfo = ({ amount, paidById, myShare, meId }) => {
  if (paidById === meId) {
    const lent = amount - myShare;
    return lent
      ? { text: `You lent ${MoneyUtils.format(lent)}`, className: 'text-success-1100' }
      : { text: 'Just you', className: 'text-grey-400' };
  }
  if (myShare) {
    return { text: `You borrowed ${MoneyUtils.format(myShare)}`, className: 'text-error-950' };
  }
  return { text: 'Not involved', className: 'text-grey-400' };
};

/**
 * The viewer is "You" as a subject and "you" as an object; everyone else is
 * their first name. Pass `{ object: true }` after a verb or preposition.
 */
export const displayName = (user, meId, { object = false } = {}) => {
  if (user?.id === meId) return object ? 'you' : 'You';
  return (user?.name ?? 'Someone').split(' ')[0];
};

/** Present-tense verb that agrees with the subject: "You pay" / "Tolu pays". */
export const payVerb = (user, meId) => (user?.id === meId ? 'pay' : 'pays');
