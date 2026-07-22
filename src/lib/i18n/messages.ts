export type Locale = "en" | "tr";

export const LOCALES: Locale[] = ["en", "tr"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "gst-locale";

export type Messages = {
  brand: {
    product: string;
    desk: string;
    workspace: string;
    viewBefore: string;
    primaryNav: string;
    skipToMain: string;
  };
  nav: {
    liveops: string;
    liveopsDesc: string;
    builds: string;
    buildsDesc: string;
    patches: string;
    patchesDesc: string;
    settings: string;
    settingsDesc: string;
  };
  language: {
    label: string;
    en: string;
    tr: string;
  };
  inbox: {
    eyebrow: string;
    title: string;
    description: string;
    loading: string;
    resultsHeading: string;
    search: string;
    searchPlaceholder: string;
    platform: string;
    allPlatforms: string;
    status: string;
    severity: string;
    resultCount: string;
    emptyTitle: string;
    emptyDescription: string;
    clearFilters: string;
    emptyEyebrow: string;
    tableCaption: string;
    colSeverity: string;
    colTitle: string;
    colBuild: string;
    colPlatform: string;
    colStatus: string;
    colReporter: string;
    colAge: string;
    loadingAria: string;
  };
  drawer: {
    close: string;
    closeBackdrop: string;
    build: string;
    description: string;
    steps: string;
    reporter: string;
    created: string;
    triage: string;
    status: string;
    assignee: string;
    unassigned: string;
    statusUpdated: string;
    assignedTo: string;
    assigneeCleared: string;
  };
  builds: {
    eyebrow: string;
    title: string;
    description: string;
    caption: string;
    colVersion: string;
    colStatus: string;
    colChannel: string;
    colPlatform: string;
    colCommit: string;
    colReleased: string;
    colNotes: string;
    platformMulti: string;
  };
  patches: {
    eyebrow: string;
    title: string;
    description: string;
    published: string;
    draft: string;
  };
  settings: {
    eyebrow: string;
    title: string;
    description: string;
    loading: string;
    workspaceTitle: string;
    workspaceDesc: string;
    studioName: string;
    defaultPlatform: string;
    defaultPlatformHint: string;
    timezone: string;
    notificationsTitle: string;
    notificationsDesc: string;
    notifyCritical: string;
    notifyCriticalHint: string;
    notifyAssignee: string;
    notifyAssigneeHint: string;
    quietHours: string;
    quietHoursHint: string;
    inboxTitle: string;
    inboxDesc: string;
    defaultAssignee: string;
    pageSize: string;
    teamTitle: string;
    teamDesc: string;
    roleTriager: string;
    languageTitle: string;
    languageDesc: string;
    languageHint: string;
    save: string;
    reset: string;
    saved: string;
    resetDone: string;
    persistHint: string;
  };
  severity: Record<"critical" | "high" | "medium" | "low", string>;
  status: Record<"new" | "triaged" | "in_progress" | "done", string>;
  platform: Record<"pc" | "ios" | "android", string>;
  buildStatus: Record<"live" | "candidate" | "internal" | "retired", string>;
};

export const messages: Record<Locale, Messages> = {
  en: {
    brand: {
      product: "Game Studio Tool",
      desk: "LiveOps Desk",
      workspace: "Studio workspace",
      viewBefore: "View before baseline",
      primaryNav: "Primary",
      skipToMain: "Skip to main content",
    },
    nav: {
      liveops: "LiveOps",
      liveopsDesc: "Feedback inbox",
      builds: "Builds",
      buildsDesc: "Release candidates",
      patches: "Patch Notes",
      patchesDesc: "Live updates",
      settings: "Settings",
      settingsDesc: "Workspace prefs",
    },
    language: {
      label: "Language",
      en: "EN",
      tr: "TR",
    },
    inbox: {
      eyebrow: "LiveOps",
      title: "Feedback Inbox",
      description:
        "Triage playtest reports, bugs, and build notes in one dense desk.",
      loading: "Loading inbox…",
      resultsHeading: "Feedback results",
      search: "Search",
      searchPlaceholder: "Title or description…",
      platform: "Platform",
      allPlatforms: "All platforms",
      status: "Status",
      severity: "Severity",
      resultCount: "{count} of {total} items",
      emptyTitle: "No feedback matches these filters",
      emptyDescription:
        "Clear a chip or broaden search to see more playtest reports.",
      clearFilters: "Clear filters",
      emptyEyebrow: "No results",
      tableCaption:
        "Playtest feedback inbox. Use arrow keys to move between rows, Enter to open details.",
      colSeverity: "Severity",
      colTitle: "Title",
      colBuild: "Build",
      colPlatform: "Platform",
      colStatus: "Status",
      colReporter: "Reporter",
      colAge: "Age",
      loadingAria: "Loading feedback inbox",
    },
    drawer: {
      close: "Close",
      closeBackdrop: "Close feedback details",
      build: "Build",
      description: "Description",
      steps: "Steps to reproduce",
      reporter: "Reporter",
      created: "Created",
      triage: "Triage",
      status: "Status",
      assignee: "Assignee",
      unassigned: "Unassigned",
      statusUpdated: "Status updated to {status}",
      assignedTo: "Assigned to {name}",
      assigneeCleared: "Assignee cleared",
    },
    builds: {
      eyebrow: "LiveOps",
      title: "Builds",
      description:
        "Recent release candidates and live binaries used by playtest triage.",
      caption: "Recent studio builds",
      colVersion: "Version",
      colStatus: "Status",
      colChannel: "Channel",
      colPlatform: "Platform",
      colCommit: "Commit",
      colReleased: "Released",
      colNotes: "Notes",
      platformMulti: "Multi",
    },
    patches: {
      eyebrow: "LiveOps",
      title: "Patch Notes",
      description:
        "Player-facing updates and draft notes synced from the current LiveOps week.",
      published: "Published",
      draft: "Draft",
    },
    settings: {
      eyebrow: "Workspace",
      title: "Settings",
      description:
        "Studio preferences and notification defaults for the LiveOps desk.",
      loading: "Loading settings…",
      workspaceTitle: "Workspace",
      workspaceDesc: "Identity and defaults for this studio desk.",
      studioName: "Studio name",
      defaultPlatform: "Default inbox platform",
      defaultPlatformHint:
        "Applied when you open LiveOps with no platform filter in the URL.",
      timezone: "Timezone",
      notificationsTitle: "Notifications",
      notificationsDesc: "Mock alerts — saved locally, not sent to a backend.",
      notifyCritical: "Critical severity alerts",
      notifyCriticalHint: "Ping when a Critical report lands in the inbox.",
      notifyAssignee: "Assignee change alerts",
      notifyAssigneeHint: "Notify when triage assigns or clears an owner.",
      quietHours: "Quiet hours (22:00–07:00)",
      quietHoursHint: "Suppress non-critical pings overnight.",
      inboxTitle: "Inbox defaults",
      inboxDesc: "Starting preferences for daily triage.",
      defaultAssignee: "Preferred assignee",
      pageSize: "Rows per page",
      teamTitle: "Team",
      teamDesc: "People available in the assignee picker.",
      roleTriager: "Triager",
      languageTitle: "Language",
      languageDesc: "UI and mock feedback language.",
      languageHint: "Also available from the sidebar.",
      save: "Save settings",
      reset: "Reset to defaults",
      saved: "Settings saved",
      resetDone: "Settings reset to defaults",
      persistHint: "Stored in this browser via localStorage.",
    },
    severity: {
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    status: {
      new: "New",
      triaged: "Triaged",
      in_progress: "In progress",
      done: "Done",
    },
    platform: {
      pc: "PC",
      ios: "iOS",
      android: "Android",
    },
    buildStatus: {
      live: "Live",
      candidate: "Candidate",
      internal: "Internal",
      retired: "Retired",
    },
  },
  tr: {
    brand: {
      product: "Game Studio Tool",
      desk: "LiveOps Masası",
      workspace: "Stüdyo çalışma alanı",
      viewBefore: "Önceki baseline’ı gör",
      primaryNav: "Ana menü",
      skipToMain: "Ana içeriğe geç",
    },
    nav: {
      liveops: "LiveOps",
      liveopsDesc: "Geri bildirim kutusu",
      builds: "Build’ler",
      buildsDesc: "Sürüm adayları",
      patches: "Yama Notları",
      patchesDesc: "Canlı güncellemeler",
      settings: "Ayarlar",
      settingsDesc: "Çalışma alanı",
    },
    language: {
      label: "Dil",
      en: "EN",
      tr: "TR",
    },
    inbox: {
      eyebrow: "LiveOps",
      title: "Geri Bildirim Kutusu",
      description:
        "Playtest raporlarını, bug’ları ve build notlarını tek yoğun masada önceliklendir.",
      loading: "Kutu yükleniyor…",
      resultsHeading: "Geri bildirim sonuçları",
      search: "Ara",
      searchPlaceholder: "Başlık veya açıklama…",
      platform: "Platform",
      allPlatforms: "Tüm platformlar",
      status: "Durum",
      severity: "Önem",
      resultCount: "{total} öğeden {count}",
      emptyTitle: "Bu filtrelere uyan geri bildirim yok",
      emptyDescription:
        "Bir chip’i temizleyin veya aramayı genişleterek daha fazla rapor görün.",
      clearFilters: "Filtreleri temizle",
      emptyEyebrow: "Sonuç yok",
      tableCaption:
        "Playtest geri bildirim kutusu. Satırlar arasında ok tuşlarıyla gezin, detay için Enter’a basın.",
      colSeverity: "Önem",
      colTitle: "Başlık",
      colBuild: "Build",
      colPlatform: "Platform",
      colStatus: "Durum",
      colReporter: "Raporlayan",
      colAge: "Süre",
      loadingAria: "Geri bildirim kutusu yükleniyor",
    },
    drawer: {
      close: "Kapat",
      closeBackdrop: "Geri bildirim detayını kapat",
      build: "Build",
      description: "Açıklama",
      steps: "Yeniden üretme adımları",
      reporter: "Raporlayan",
      created: "Oluşturulma",
      triage: "Önceliklendirme",
      status: "Durum",
      assignee: "Atanan",
      unassigned: "Atanmamış",
      statusUpdated: "Durum {status} olarak güncellendi",
      assignedTo: "{name} kişisine atandı",
      assigneeCleared: "Atama temizlendi",
    },
    builds: {
      eyebrow: "LiveOps",
      title: "Build’ler",
      description:
        "Playtest önceliklendirmesinde kullanılan son sürüm adayları ve canlı binary’ler.",
      caption: "Son stüdyo build’leri",
      colVersion: "Sürüm",
      colStatus: "Durum",
      colChannel: "Kanal",
      colPlatform: "Platform",
      colCommit: "Commit",
      colReleased: "Yayın",
      colNotes: "Notlar",
      platformMulti: "Çoklu",
    },
    patches: {
      eyebrow: "LiveOps",
      title: "Yama Notları",
      description:
        "Oyuncuya dönük güncellemeler ve mevcut LiveOps haftasından senkron draft notlar.",
      published: "Yayında",
      draft: "Taslak",
    },
    settings: {
      eyebrow: "Çalışma alanı",
      title: "Ayarlar",
      description:
        "LiveOps masası için stüdyo tercihleri ve bildirim varsayılanları.",
      loading: "Ayarlar yükleniyor…",
      workspaceTitle: "Çalışma alanı",
      workspaceDesc: "Bu stüdyo masası için kimlik ve varsayılanlar.",
      studioName: "Stüdyo adı",
      defaultPlatform: "Varsayılan inbox platformu",
      defaultPlatformHint:
        "URL’de platform filtresi yokken LiveOps açılışında uygulanır.",
      timezone: "Saat dilimi",
      notificationsTitle: "Bildirimler",
      notificationsDesc:
        "Mock uyarılar — yerelde kaydedilir, backend’e gönderilmez.",
      notifyCritical: "Kritik önem uyarıları",
      notifyCriticalHint: "Inbox’a Critical rapor düşünce bildirim.",
      notifyAssignee: "Atama değişikliği uyarıları",
      notifyAssigneeHint:
        "Önceliklendirmede atama yapınca veya temizleyince bildir.",
      quietHours: "Sessiz saatler (22:00–07:00)",
      quietHoursHint: "Gece kritik olmayan ping’leri bastır.",
      inboxTitle: "Inbox varsayılanları",
      inboxDesc: "Günlük önceliklendirme için başlangıç tercihleri.",
      defaultAssignee: "Tercih edilen atanan",
      pageSize: "Sayfa başına satır",
      teamTitle: "Ekip",
      teamDesc: "Atanan seçicisinde görünen kişiler.",
      roleTriager: "Önceliklendirici",
      languageTitle: "Dil",
      languageDesc: "Arayüz ve mock feedback dili.",
      languageHint: "Sidebar’dan da değiştirilebilir.",
      save: "Ayarları kaydet",
      reset: "Varsayılana dön",
      saved: "Ayarlar kaydedildi",
      resetDone: "Ayarlar varsayılana döndü",
      persistHint: "Bu tarayıcıda localStorage ile saklanır.",
    },
    severity: {
      critical: "Kritik",
      high: "Yüksek",
      medium: "Orta",
      low: "Düşük",
    },
    status: {
      new: "Yeni",
      triaged: "Önceliklendirildi",
      in_progress: "Devam ediyor",
      done: "Bitti",
    },
    platform: {
      pc: "PC",
      ios: "iOS",
      android: "Android",
    },
    buildStatus: {
      live: "Canlı",
      candidate: "Aday",
      internal: "Dahili",
      retired: "Emekli",
    },
  },
};

export function formatMessage(
  template: string,
  vars: Record<string, string | number>,
): string {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
