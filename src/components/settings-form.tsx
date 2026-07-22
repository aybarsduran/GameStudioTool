"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Toast, type ToastMessage } from "@/components/toast";
import { ASSIGNEES } from "@/components/detail-drawer";
import { useLocale } from "@/lib/i18n/provider";
import {
  DEFAULT_SETTINGS,
  TIMEZONES,
  loadSettings,
  saveSettings,
  type WorkspaceSettings,
} from "@/lib/settings";
import { PLATFORMS, type Platform } from "@/lib/types";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-md)] border border-border bg-surface p-5 shadow-[var(--shadow-panel)]">
      <div className="border-b border-border pb-4">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

const inputClass =
  "mt-0 w-full rounded-[var(--radius-sm)] border border-border bg-surface-muted px-3 py-2 text-sm text-foreground";

export function SettingsForm() {
  const { t } = useLocale();
  const [settings, setSettings] = useState<WorkspaceSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    setSettings(loadSettings());
    setReady(true);
  }, []);

  function update<K extends keyof WorkspaceSettings>(
    key: K,
    value: WorkspaceSettings[K],
  ) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function handleSave() {
    saveSettings(settings);
    setToast({ id: Date.now(), text: t.settings.saved });
  }

  function handleReset() {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    setToast({ id: Date.now(), text: t.settings.resetDone });
  }

  if (!ready) {
    return (
      <p className="text-sm text-muted">{t.settings.loading}</p>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <Section
          title={t.settings.workspaceTitle}
          description={t.settings.workspaceDesc}
        >
          <Field label={t.settings.studioName}>
            <input
              className={inputClass}
              value={settings.studioName}
              onChange={(event) => update("studioName", event.target.value)}
            />
          </Field>

          <Field
            label={t.settings.defaultPlatform}
            hint={t.settings.defaultPlatformHint}
          >
            <select
              className={inputClass}
              value={settings.defaultPlatform}
              onChange={(event) =>
                update(
                  "defaultPlatform",
                  event.target.value as Platform | "all",
                )
              }
            >
              <option value="all">{t.inbox.allPlatforms}</option>
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {t.platform[platform]}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t.settings.timezone}>
            <select
              className={inputClass}
              value={settings.timezone}
              onChange={(event) => update("timezone", event.target.value)}
            >
              {TIMEZONES.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </Field>
        </Section>

        <Section
          title={t.settings.notificationsTitle}
          description={t.settings.notificationsDesc}
        >
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={settings.notifyCritical}
              onChange={(event) =>
                update("notifyCritical", event.target.checked)
              }
            />
            <span>
              <span className="font-medium text-foreground">
                {t.settings.notifyCritical}
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {t.settings.notifyCriticalHint}
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={settings.notifyAssignee}
              onChange={(event) =>
                update("notifyAssignee", event.target.checked)
              }
            />
            <span>
              <span className="font-medium text-foreground">
                {t.settings.notifyAssignee}
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {t.settings.notifyAssigneeHint}
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={settings.quietHours}
              onChange={(event) => update("quietHours", event.target.checked)}
            />
            <span>
              <span className="font-medium text-foreground">
                {t.settings.quietHours}
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {t.settings.quietHoursHint}
              </span>
            </span>
          </label>
        </Section>

        <Section
          title={t.settings.inboxTitle}
          description={t.settings.inboxDesc}
        >
          <Field label={t.settings.defaultAssignee}>
            <select
              className={inputClass}
              value={settings.defaultAssignee}
              onChange={(event) => update("defaultAssignee", event.target.value)}
            >
              <option value="">{t.drawer.unassigned}</option>
              {ASSIGNEES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t.settings.pageSize}>
            <select
              className={inputClass}
              value={settings.pageSize}
              onChange={(event) =>
                update(
                  "pageSize",
                  Number(event.target.value) as WorkspaceSettings["pageSize"],
                )
              }
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </Field>
        </Section>

        <Section title={t.settings.teamTitle} description={t.settings.teamDesc}>
          <ul className="divide-y divide-border rounded-[var(--radius-sm)] border border-border">
            {ASSIGNEES.map((name) => (
              <li
                key={name}
                className="flex items-center justify-between px-3 py-2.5 text-sm"
              >
                <span className="font-medium">{name}</span>
                <span className="font-mono text-xs text-muted">
                  {t.settings.roleTriager}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          title={t.settings.languageTitle}
          description={t.settings.languageDesc}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted">{t.settings.languageHint}</p>
            <LanguageSwitcher />
          </div>
        </Section>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-[var(--radius-sm)] bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-ink"
          >
            {t.settings.save}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-muted"
          >
            {t.settings.reset}
          </button>
          <p className="text-xs text-muted">{t.settings.persistHint}</p>
        </div>
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
