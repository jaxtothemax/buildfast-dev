import type { ReactNode } from 'react';

// Root layout — the [locale] layout provides html/body
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
