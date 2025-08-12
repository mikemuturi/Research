import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RAFSIA Readiness Assessment',
  description: 'Satellite Internet Adoption Readiness Assessment Framework',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}