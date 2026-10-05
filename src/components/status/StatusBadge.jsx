import { cn } from '@/utils/cn';

const badgeTones = {
  success: 'bg-success-transparent text-success-1100',
  error: 'bg-error-transparent text-error-950',
  neutral: 'bg-brand-light text-grey-500',
  accent: 'bg-orange-900 text-white',
  info: 'bg-info-100 text-tag-text',
};

export const StatusBadge = ({ text, tone = 'neutral', icon, className }) => (
  <span
    className={cn(
      badgeTones[tone],
      'inline-flex h-5 shrink-0 items-center gap-1 rounded-sm px-2 text-xs font-medium whitespace-nowrap',
      className,
    )}
  >
    {icon}
    {text}
  </span>
);
