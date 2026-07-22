"use client";

import { Sidebar } from "@/components/sidebar";
import { useLocale } from "@/lib/i18n/provider";

export default function DeskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useLocale();

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.brand.skipToMain}
      </a>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </>
  );
}
