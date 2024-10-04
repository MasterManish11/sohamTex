import 'tailwindcss/tailwind.css';
import React from 'react';
import { ToastContainer } from './nexttostify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '@/components/LayoutWrapper'; // Adjust the path as necessary

export const metadata = {
  title: 'SohamTex',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <ToastContainer />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
