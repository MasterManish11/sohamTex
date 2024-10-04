// components/LayoutWrapper.js
'use client'
import { usePathname } from 'next/navigation';
import { DashboardLayout } from '@/dashboard/Layout';

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname(); // Get the current path
  const noLayoutPaths = ['/auth/login', '/auth/register'];

  const isNoLayoutPath = noLayoutPaths.includes(pathname);

  return isNoLayoutPath ? children : <DashboardLayout>{children}</DashboardLayout>;
};

export default LayoutWrapper;

