export class TextUtils {
  static queryText = (message) => `Failed to fetch ${message}`;

  static capitalize = ({ str }) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  static initials = (name = '') =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
}
