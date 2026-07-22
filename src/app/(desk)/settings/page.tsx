"use client";

import { PageHeader } from "@/components/page-header";
import { SettingsForm } from "@/components/settings-form";
import { useLocale } from "@/lib/i18n/provider";

export default function SettingsPage() {
  const { t } = useLocale();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col outline-none"
    >
      <PageHeader
        eyebrow={t.settings.eyebrow}
        title={t.settings.title}
        description={t.settings.description}
      />

      <section className="flex flex-1 flex-col px-5 py-5 md:px-8">
        <SettingsForm />
      </section>
    </main>
  );
}
