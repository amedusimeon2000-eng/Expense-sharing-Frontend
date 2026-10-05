import {
  IconArrowBackUp,
  IconChartPie,
  IconDevices,
  IconLock,
  IconRoute,
  IconScale,
} from '@tabler/icons-react';

export const HOW_IT_WORKS = [
  {
    title: 'Create a group',
    body: 'Start one for a trip, a flat or a regular lunch, and add friends by their email address.',
  },
  {
    title: 'Record expenses',
    body: 'Log who paid and how to split it: equally, by exact amounts or by percentage.',
  },
  {
    title: 'Settle up',
    body: 'Follow the settle-up plan, then record each payment so balances return to zero.',
  },
];

export const FEATURES = [
  {
    Icon: IconChartPie,
    title: 'Three ways to split',
    body: 'Equal shares, exact amounts or percentages. SplitBook checks the shares add up before saving.',
  },
  {
    Icon: IconRoute,
    title: 'Fewest payments',
    body: "The settle-up plan simplifies a group's debts so fewer transfers change hands.",
  },
  {
    Icon: IconScale,
    title: 'One balance across groups',
    body: "Your dashboard shows what you're owed and what you owe, person by person.",
  },
  {
    Icon: IconArrowBackUp,
    title: 'Payments you can undo',
    body: 'Record a bank transfer or cash payment with a note, and undo it if it was logged by mistake.',
  },
  {
    Icon: IconLock,
    title: 'No group left half-settled',
    body: "Members can't be removed and groups can't be deleted while money is still owed.",
  },
  {
    Icon: IconDevices,
    title: 'Control your sessions',
    body: "See where you're signed in and log out other devices from your profile.",
  },
];

/** Sample rows for the hero illustration — static marketing copy, not user data. */
export const HERO_PAYMENTS = [
  { initials: 'TA', name: 'Tolu', amount: '₦44,150', tint: 'bg-info-100 text-info-950' },
  { initials: 'CE', name: 'Chidi', amount: '₦37,650', tint: 'bg-purple-transparent text-purple-800' },
  { initials: 'NO', name: 'Ngozi', amount: '₦16,575', tint: 'bg-warning-50 text-warning-1200' },
];

export const AUTH_POINTS = [
  { Icon: IconChartPie, text: 'Split equally, by exact amounts or by percentage.' },
  { Icon: IconRoute, text: 'Get a settle-up plan with the fewest payments.' },
  { Icon: IconScale, text: 'See one balance across all your groups.' },
];
