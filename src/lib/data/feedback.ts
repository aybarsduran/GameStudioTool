import type { FeedbackItem, LocalizedText } from "@/lib/types";

function L(en: string, tr: string): LocalizedText {
  return { en, tr };
}

/** Fixed timestamps so the desk looks stable in demos. */
export const feedbackItems: FeedbackItem[] = [
  {
    id: "fb-1001",
    title: L(
      "Tutorial soft-lock after skipping first cutscene",
      "İlk cutscene atlanınca tutorial soft-lock oluyor",
    ),
    body: L(
      "Skipping the intro leaves the objective marker pointing at a blocked door. Player cannot progress without restarting the chapter.",
      "İntroyu atlamak, hedef işaretini kilitli bir kapıya bırakıyor. Bölümü yeniden başlatmadan ilerlenemiyor.",
    ),
    stepsToReproduce: [
      L("Start New Game", "Yeni Oyun başlat"),
      L("Skip the opening cutscene", "Açılış cutscene’ini atla"),
      L("Walk to the marked hangar door", "İşaretli hangar kapısına yürü"),
    ],
    severity: "critical",
    status: "new",
    platform: "pc",
    build: "0.9.12-rc2",
    reporter: "Maya Chen",
    assignee: null,
    createdAt: "2026-07-21T08:12:00.000Z",
  },
  {
    id: "fb-1002",
    title: L(
      "Controller rumble never stops after boss hit",
      "Boss vuruşundan sonra kontrolcü titreşimi hiç durmuyor",
    ),
    body: L(
      "On DualSense, vibration continues indefinitely after the first heavy attack in the boss arena.",
      "DualSense’te boss arenasındaki ilk ağır saldırıdan sonra titreşim süresiz devam ediyor.",
    ),
    stepsToReproduce: [
      L(
        "Enter the Foundry boss arena with DualSense",
        "DualSense ile Foundry boss arenasına gir",
      ),
      L("Land a charged melee hit", "Şarjlı yakın dövüş vuruşu yap"),
      L(
        "Observe rumble after returning to idle",
        "Idle’a döndükten sonra titreşimi gözlemle",
      ),
    ],
    severity: "high",
    status: "triaged",
    platform: "pc",
    build: "0.9.12-rc2",
    reporter: "Jonas Berg",
    assignee: "Leila Okonkwo",
    createdAt: "2026-07-21T06:40:00.000Z",
  },
  {
    id: "fb-1003",
    title: L(
      "iOS: store purchase sheet flickers on resume",
      "iOS: mağaza satın alma sayfası resume’da titriyor",
    ),
    body: L(
      "Returning from background while the IAP sheet is open causes a one-frame white flash and duplicate confirm button.",
      "IAP sayfası açıkken arka plandan dönüşte bir kare beyaz flaş ve çift onay butonu oluşuyor.",
    ),
    stepsToReproduce: [
      L("Open the premium pack sheet", "Premium paket sayfasını aç"),
      L(
        "Background the app for 10 seconds",
        "Uygulamayı 10 saniye arka plana al",
      ),
      L("Resume and inspect the sheet", "Geri dönüp sayfayı incele"),
    ],
    severity: "high",
    status: "in_progress",
    platform: "ios",
    build: "0.9.11",
    reporter: "Priya Nair",
    assignee: "Sam Ortiz",
    createdAt: "2026-07-20T19:05:00.000Z",
  },
  {
    id: "fb-1004",
    title: L(
      "Android: audio ducking fails during voice chat",
      "Android: sesli sohbette audio ducking çalışmıyor",
    ),
    body: L(
      "Game music stays at full volume when Discord overlay voice is active. Happens on Pixel 8 only so far.",
      "Discord overlay sesi açıkken oyun müziği tam sesinde kalıyor. Şimdilik yalnızca Pixel 8’de görüldü.",
    ),
    stepsToReproduce: [
      L(
        "Join a Discord voice call with overlay enabled",
        "Overlay açıkken Discord sesli aramaya katıl",
      ),
      L("Enter any combat encounter", "Herhangi bir savaş karşılaşmasına gir"),
      L(
        "Compare music vs chat levels",
        "Müzik ile sohbet ses seviyelerini karşılaştır",
      ),
    ],
    severity: "medium",
    status: "new",
    platform: "android",
    build: "0.9.12-rc1",
    reporter: "Chris Hale",
    assignee: null,
    createdAt: "2026-07-20T15:22:00.000Z",
  },
  {
    id: "fb-1005",
    title: L(
      "Patch notes typo in 0.9.11 balance section",
      "0.9.11 denge bölümünde yama notu yazım hatası",
    ),
    body: L(
      "Shield regen listed as +12% but design doc and live values are +8%. Confuses players reading LiveOps notes.",
      "Kalkan yenilenmesi +12% yazıyor ama tasarım dokümanı ve canlı değerler +8%. LiveOps notlarını okuyan oyuncuları yanıltıyor.",
    ),
    stepsToReproduce: [
      L("Open in-game Patch Notes", "Oyun içi Yama Notları’nı aç"),
      L("Scroll to Balance Changes", "Denge Değişiklikleri’ne kaydır"),
      L(
        "Compare shield regen line to design sheet",
        "Kalkan yenilenmesi satırını tasarım sayfasıyla karşılaştır",
      ),
    ],
    severity: "low",
    status: "done",
    platform: "pc",
    build: "0.9.11",
    reporter: "Elena Voss",
    assignee: "Elena Voss",
    createdAt: "2026-07-19T11:00:00.000Z",
  },
  {
    id: "fb-1006",
    title: L(
      "Quest marker overlaps minimap legend",
      "Görev işareti minimap legend’inin üstüne biniyor",
    ),
    body: L(
      "On 16:10 laptops the active quest pin sits on top of the north indicator. Hard to read during night missions.",
      "16:10 dizüstülerde aktif görev pimi kuzey göstergesinin üstünde kalıyor. Gece görevlerinde okumak zor.",
    ),
    stepsToReproduce: [
      L("Set resolution to 1920x1200", "Çözünürlüğü 1920x1200 yap"),
      L(
        "Accept Night Sweep side quest",
        "Night Sweep yan görevini kabul et",
      ),
      L(
        "Open minimap for 5+ seconds",
        "Minimap’i 5+ saniye açık tut",
      ),
    ],
    severity: "medium",
    status: "triaged",
    platform: "pc",
    build: "0.9.12-rc2",
    reporter: "Noah Park",
    assignee: "Leila Okonkwo",
    createdAt: "2026-07-21T09:01:00.000Z",
  },
  {
    id: "fb-1007",
    title: L(
      "Crash when opening inventory during zipline",
      "Zipline sırasında envanter açılınca crash",
    ),
    body: L(
      "Hard crash to desktop if inventory is opened mid-zipline. Repro rate ~70% on Steam Deck OLED.",
      "Zipline ortasında envanter açılırsa masaüstüne sert crash. Steam Deck OLED’de repro oranı ~%70.",
    ),
    stepsToReproduce: [
      L("Start any zipline segment", "Herhangi bir zipline segmentine başla"),
      L("Open inventory mid-travel", "Yolculuk ortasında envanteri aç"),
      L("Repeat until crash", "Crash olana kadar tekrarla"),
    ],
    severity: "critical",
    status: "in_progress",
    platform: "pc",
    build: "0.9.12-rc2",
    reporter: "Aisha Rahman",
    assignee: "Tomás Silva",
    createdAt: "2026-07-21T10:18:00.000Z",
  },
  {
    id: "fb-1008",
    title: L(
      "iOS: haptic pattern missing on successful parry",
      "iOS: başarılı parry’de haptic yok",
    ),
    body: L(
      "Parry success VFX plays but no haptic. Feels unresponsive compared to Android build.",
      "Parry başarı VFX’i oynuyor ama haptic yok. Android build’e göre tepkisiz hissettiriyor.",
    ),
    stepsToReproduce: [
      L("Enable haptics in Settings", "Ayarlar’da haptic’leri aç"),
      L(
        "Parry a melee enemy successfully",
        "Yakın dövüş düşmanını başarıyla parry’le",
      ),
      L(
        "Confirm haptic pulse is absent",
        "Haptic nabzının olmadığını doğrula",
      ),
    ],
    severity: "medium",
    status: "new",
    platform: "ios",
    build: "0.9.12-rc2",
    reporter: "Kenji Mori",
    assignee: null,
    createdAt: "2026-07-21T07:33:00.000Z",
  },
  {
    id: "fb-1009",
    title: L(
      "Daily login reward grants duplicate crafting mat",
      "Günlük giriş ödülü crafting malzemesini iki kez veriyor",
    ),
    body: L(
      "Day 3 reward grants Alloy Scrap twice if the player claims while offline sync is pending.",
      "3. gün ödülü, offline sync beklerken alınırsa Alloy Scrap’i iki kez veriyor.",
    ),
    stepsToReproduce: [
      L("Reach Day 3 login streak", "3. gün giriş serisine ulaş"),
      L(
        "Claim reward with airplane mode on briefly",
        "Kısa süre uçak modundayken ödülü al",
      ),
      L(
        "Reconnect and inspect inventory",
        "Yeniden bağlanıp envanteri kontrol et",
      ),
    ],
    severity: "high",
    status: "triaged",
    platform: "android",
    build: "0.9.12-rc1",
    reporter: "Sofia Rossi",
    assignee: "Sam Ortiz",
    createdAt: "2026-07-20T21:44:00.000Z",
  },
  {
    id: "fb-1010",
    title: L(
      "Localization: truncated German UI in loadout screen",
      "Lokalizasyon: loadout ekranında Almanca UI kesiliyor",
    ),
    body: L(
      "Weapon rarity label overflows the chip on de-DE. Screenshot attached in playtest thread.",
      "de-DE’de silah nadirlik etiketi chip’ten taşıyor. Playtest thread’ine ekran görüntüsü eklendi.",
    ),
    stepsToReproduce: [
      L("Set language to German", "Dili Almanca yap"),
      L("Open Loadout", "Loadout’u aç"),
      L(
        "Inspect Epic rarity chip on secondary weapon",
        "İkincil silahtaki Epic nadirlik chip’ini incele",
      ),
    ],
    severity: "low",
    status: "new",
    platform: "pc",
    build: "0.9.12-rc2",
    reporter: "Jonas Berg",
    assignee: null,
    createdAt: "2026-07-21T04:55:00.000Z",
  },
  {
    id: "fb-1011",
    title: L(
      "Spectator camera desync in co-op hub",
      "Co-op hub’da spectator kamerası desync oluyor",
    ),
    body: L(
      "When player B dies, spectator view shows player A one room behind for ~2 seconds.",
      "B oyuncusu ölünce spectator görünümü A’yı ~2 saniye bir oda geride gösteriyor.",
    ),
    stepsToReproduce: [
      L("Start co-op hub session", "Co-op hub oturumu başlat"),
      L(
        "Kill player B near the elevator",
        "Asansör yakınında B oyuncusunu öldür",
      ),
      L(
        "Enter spectator mode immediately",
        "Hemen spectator moduna gir",
      ),
    ],
    severity: "high",
    status: "new",
    platform: "pc",
    build: "0.9.12-rc2",
    reporter: "Maya Chen",
    assignee: null,
    createdAt: "2026-07-21T11:02:00.000Z",
  },
  {
    id: "fb-1012",
    title: L(
      "Android: battery drain spike on idle title screen",
      "Android: boş title ekranında pil tüketimi sıçrıyor",
    ),
    body: L(
      "Title screen keeps rendering full particle loop at 60fps while idle. Device heats within 8 minutes.",
      "Title ekranı idle iken particle döngüsünü 60fps’te render etmeye devam ediyor. Cihaz 8 dakikada ısınıyor.",
    ),
    stepsToReproduce: [
      L("Boot to title screen", "Title ekranına boot et"),
      L("Leave idle for 8 minutes", "8 dakika idle bırak"),
      L(
        "Check thermal / battery stats",
        "Isı / pil istatistiklerini kontrol et",
      ),
    ],
    severity: "medium",
    status: "in_progress",
    platform: "android",
    build: "0.9.11",
    reporter: "Chris Hale",
    assignee: "Tomás Silva",
    createdAt: "2026-07-19T16:30:00.000Z",
  },
  {
    id: "fb-1013",
    title: L(
      "Build badge shows rc1 after installing rc2",
      "rc2 kurulunca build rozeti hâlâ rc1 gösteriyor",
    ),
    body: L(
      "Settings → About still displays 0.9.12-rc1 after updating through the internal store.",
      "Dahili mağazadan güncelleme sonrası Ayarlar → Hakkında hâlâ 0.9.12-rc1 gösteriyor.",
    ),
    stepsToReproduce: [
      L("Install 0.9.12-rc2 over rc1", "rc1 üzerine 0.9.12-rc2 kur"),
      L("Open Settings → About", "Ayarlar → Hakkında’yı aç"),
      L(
        "Compare badge to binary version",
        "Rozeti binary sürümüyle karşılaştır",
      ),
    ],
    severity: "low",
    status: "done",
    platform: "ios",
    build: "0.9.12-rc2",
    reporter: "Priya Nair",
    assignee: "Elena Voss",
    createdAt: "2026-07-18T13:10:00.000Z",
  },
  {
    id: "fb-1014",
    title: L(
      "NPC dialogue skips first line on fast tap",
      "Hızlı dokunuşta NPC diyaloğu ilk satırı atlıyor",
    ),
    body: L(
      "Double-tapping advance on the first bubble swallows the intro line permanently for that session.",
      "İlk balonda ilerlemeye çift dokunmak, intro satırını o oturum için kalıcı olarak yutuyor.",
    ),
    stepsToReproduce: [
      L("Talk to Quartermaster", "Quartermaster ile konuş"),
      L(
        "Double-tap advance within 200ms of open",
        "Açılıştan 200ms içinde ilerlemeye çift dokun",
      ),
      L(
        "Replay conversation in same session",
        "Aynı oturumda konuşmayı yeniden oynat",
      ),
    ],
    severity: "medium",
    status: "triaged",
    platform: "pc",
    build: "0.9.12-rc1",
    reporter: "Noah Park",
    assignee: "Leila Okonkwo",
    createdAt: "2026-07-20T09:18:00.000Z",
  },
];
