import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แดชบอร์ด - DPHM Portal',
  description: 'ระบบสารสนเทศ กรมการแพทย์ กระทรวงสาธารณสุข',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}