import DocsLayout from '@/components/Layout/DocsLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocsLayout>{children}</DocsLayout>;
}