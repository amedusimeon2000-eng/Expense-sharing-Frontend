/** The API stores every amount as whole kobo (₦1 = 100 kobo). */
export class MoneyUtils {
  static toKobo = (naira) => Math.round((parseFloat(naira) || 0) * 100);

  static toNaira = (kobo) => (kobo ?? 0) / 100;

  /** `₦15,000` or `₦3,333.34` — always unsigned; callers add their own wording. */
  static format = (kobo) => {
    const naira = Math.abs(kobo ?? 0) / 100;
    return `₦${naira.toLocaleString('en-NG', {
      minimumFractionDigits: naira % 1 ? 2 : 0,
      maximumFractionDigits: 2,
    })}`;
  };

  /** `+₦500`, `−₦500` or `₦0`. */
  static formatSigned = (kobo) => {
    const sign = kobo > 0 ? '+' : kobo < 0 ? '−' : '';
    return `${sign}${MoneyUtils.format(kobo)}`;
  };
}
