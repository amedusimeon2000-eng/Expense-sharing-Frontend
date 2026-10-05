import { TextUtils } from './text';

/** Tinted background + matching text, picked per user so colours stay stable. */
const PALETTE = [
  'bg-info-100 text-info-950',
  'bg-success-transparent text-success-1100',
  'bg-warning-50 text-warning-1200',
  'bg-purple-transparent text-purple-800',
  'bg-pink-transparent text-pink-1000',
  'bg-teal-transparent text-teal-1000',
  'bg-orange-100 text-orange-1000',
];

export class AvatarUtils {
  static colors = (seed = '') => {
    let hash = 0;
    for (const char of String(seed)) hash = (hash * 31 + char.charCodeAt(0)) | 0;
    return PALETTE[Math.abs(hash) % PALETTE.length];
  };

  static initials = (name) => TextUtils.initials(name);
}
