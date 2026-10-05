import {
  IconDeviceDesktop,
  IconDeviceLaptop,
  IconDeviceMobile,
} from '@tabler/icons-react';

const BROWSERS = [
  ['Edg/', 'Edge'],
  ['OPR/', 'Opera'],
  ['Chrome/', 'Chrome'],
  ['Firefox/', 'Firefox'],
  ['Safari/', 'Safari'],
];

const SYSTEMS = [
  ['iPhone', 'iPhone'],
  ['iPad', 'iPad'],
  ['Android', 'Android'],
  ['Mac OS X', 'macOS'],
  ['Windows', 'Windows'],
  ['Linux', 'Linux'],
];

export const describeDevice = (rawUserAgent) => {
  const userAgent = rawUserAgent ?? '';
  const browser = BROWSERS.find(([token]) => userAgent.includes(token))?.[1];
  const system = SYSTEMS.find(([token]) => userAgent.includes(token))?.[1];
  const isMobile = /iPhone|Android|Mobile/.test(userAgent);

  const label =
    browser && system
      ? `${browser} on ${system}`
      : browser || system || 'Unknown device';
  const Icon = isMobile
    ? IconDeviceMobile
    : system === 'macOS'
      ? IconDeviceLaptop
      : IconDeviceDesktop;

  return { label, Icon };
};
