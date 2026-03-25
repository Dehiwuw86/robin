import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EasyLink',
  description: 'صفحة شخصية مميزة',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
