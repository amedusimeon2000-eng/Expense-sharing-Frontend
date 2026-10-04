import { MoneyUtils } from './money';

export class BalanceUtils {
  static tone = (net) => (net > 0 ? 'success' : net < 0 ? 'error' : 'neutral');

  static textColor = (net) =>
    net > 0
      ? 'text-success-1100'
      : net < 0
        ? 'text-error-950'
        : 'text-grey-500';

  /** Your own balance: "You're owed ₦X" / "You owe ₦X" / "Settled up". */
  static mine = (net) => ({
    tone: BalanceUtils.tone(net),
    text:
      net > 0
        ? `You're owed ${MoneyUtils.format(net)}`
        : net < 0
          ? `You owe ${MoneyUtils.format(net)}`
          : 'Settled up',
  });

  /** Someone else's balance in a group: "Gets back ₦X" / "Owes ₦X" / "Settled". */
  static member = (net) => ({
    tone: BalanceUtils.tone(net),
    text:
      net > 0
        ? `Gets back ${MoneyUtils.format(net)}`
        : net < 0
          ? `Owes ${MoneyUtils.format(net)}`
          : 'Settled',
  });
}
