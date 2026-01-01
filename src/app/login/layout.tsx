import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เข้าสู่ระบบ - DPHM Portal',
  description: 'ระบบสารสนเทศ กรมการแพทย์ กระทรวงสาธารณสุข',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}