const LEVELS = [
  { label: '', color: 'bg-grey-transparent', text: 'text-grey-500' },
  { label: 'Weak', color: 'bg-error-1000', text: 'text-error-1000' },
  { label: 'Fair', color: 'bg-warning-1100', text: 'text-warning-1100' },
  { label: 'Good', color: 'bg-info-1000', text: 'text-info-1000' },
  { label: 'Strong', color: 'bg-success-1000', text: 'text-success-1000' },
];

export const passwordStrength = (password = '') => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score++;

  const level = password ? Math.max(score, 1) : 0;
  return { level, ...LEVELS[level] };
};
