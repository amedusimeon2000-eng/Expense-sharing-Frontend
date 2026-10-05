const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export class DateUtils {
  static format = (date, short) =>
    new Date(date).toLocaleDateString(
      'en-GB',
      short
        ? { day: 'numeric', month: 'short' }
        : { day: 'numeric', month: 'short', year: 'numeric' },
    );

  static dayLabel = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

  static toInputDate = (date = new Date()) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };

  static relative = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    if (diff < 2 * MINUTE) return 'Active now';
    if (diff < HOUR) return `${Math.floor(diff / MINUTE)} minutes ago`;
    if (diff < DAY) {
      const hours = Math.floor(diff / HOUR);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
    const days = Math.floor(diff / DAY);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  };
}
