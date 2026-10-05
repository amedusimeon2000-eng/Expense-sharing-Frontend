import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Without this, tailwind-merge reads our custom theme keys as colours
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['xxs', '13'] }],
      shadow: [
        {
          shadow: [
            'default',
            'default-2',
            'elevation-1',
            'drop-blur',
            'drop-down',
            'popover',
            'darken',
            'card-shadow',
            'content-shadow',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
