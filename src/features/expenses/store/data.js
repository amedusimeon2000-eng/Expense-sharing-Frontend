import { SPLIT_TYPES } from '@/models/expense';
import {
  IconBolt,
  IconCar,
  IconConfetti,
  IconHome,
  IconReceipt,
  IconToolsKitchen2,
} from '@tabler/icons-react';

export const CATEGORIES = {
  food: {
    label: 'Food',
    Icon: IconToolsKitchen2,
    tint: 'bg-warning-50 text-warning-1200',
  },
  rent: { label: 'Rent', Icon: IconHome, tint: 'bg-info-100 text-info-950' },
  transport: {
    label: 'Transport',
    Icon: IconCar,
    tint: 'bg-teal-transparent text-teal-1000',
  },
  utilities: {
    label: 'Utilities',
    Icon: IconBolt,
    tint: 'bg-purple-transparent text-purple-800',
  },
  entertainment: {
    label: 'Entertainment',
    Icon: IconConfetti,
    tint: 'bg-pink-transparent text-pink-1000',
  },
  other: {
    label: 'Other',
    Icon: IconReceipt,
    tint: 'bg-brand-light text-grey-500',
  },
};

export const categoryFor = (key) => CATEGORIES[key] ?? CATEGORIES.other;

export const CATEGORY_OPTIONS = Object.entries(CATEGORIES).map(
  ([value, { label }]) => ({
    value,
    label,
  }),
);

export const SPLIT_LABELS = {
  [SPLIT_TYPES.EQUAL]: 'Equal',
  [SPLIT_TYPES.EXACT]: 'Exact',
  [SPLIT_TYPES.PERCENTAGE]: 'Percentage',
};
