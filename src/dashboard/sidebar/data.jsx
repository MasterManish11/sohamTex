import { DocIcon } from './icons/DocIcon';
import { HomeIcon } from './icons/HomeIcon';
import { ReportIcon } from './icons/ReportIcon';
// import { CreditIcon } from './icons/CreditIcon';
// import { ArchiveIcon } from './icons/ArchiveIcon';
import { SettingsIcon } from './icons/SettingsIcon';

export const data = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Report',
    icon: <ReportIcon />,
    link: '/admin/report',
  },
  // {
  //   title: 'Archives',
  //   icon: <ArchiveIcon />,
  //   link: '/admin/archives',
  // },
  // {
  //   title: 'Credits',
  //   icon: <CreditIcon />,
  //   link: '/admin/credits',
  // },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/settings/password',
  },
  {
    title: 'About us',
    icon: <DocIcon />,
    link: '/admin/documentation',
  },
];
