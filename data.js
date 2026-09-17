// ==========================================
//  🎮 داده‌های بازی — اینجا رو شخصی‌سازی کن
// ==========================================

const GAME_DATA = {

  targetName: "عشق من",       // ← اسم دوست دخترت
  agentName: "Agent",          // ← لقب خودت

  // ============ ۷ مرحله (۷ زبان) ============
  nodes: [
    {
      id: "node_1",
      lang: "English",
      title: "Node 1 — First Contact",
      story: "یه فایل رمزگذاری‌شده پیدا کردی. باید کلیدش رو پیدا کنی.",
      puzzle: "Complete the sentence:\n\n  'You are my ______' \n\n(4 letters, shines at night)",
      answer: ["star", "ستاره"],
      hint: "به آسمون شب نگاه کن... همون چیزی که توی چشماش می‌درخشه.",
      reward: "اولین حرف جواب = یه تیکه از کلید."
    },
    {
      id: "node_2",
      lang: "Français",
      title: "Node 2 — French Firewall",
      story: "یه فایروال فرانسوی جلوی راهته. باید رمزش رو بشکنی.",
      puzzle: "Decode this Caesar cipher (shift = 3):\n\n  'prx frx'",
      answer: ["mon coeur", "moncoeur", "قلب من"],
      hint: "هر حرف رو ۳ تا به عقب ببر. p→m, r→o, x→u ...",
      reward: "حرف اول جواب."
    },
    {
      id: "node_3",
      lang: "Deutsch",
      title: "Node 3 — German Vault",
      story: "یه گاوصندوق آلمانی. کد ۴ رقمی می‌خواد.",
      puzzle: "Wie sagt man 'Liebe' auf Englisch? (4 Buchstaben)",
      answer: ["love", "liebe"],
      hint: "عشق به انگلیسی، ۴ حرف.",
      reward: "حرف اول جواب."
    },
    {
      id: "node_4",
      lang: "Español",
      title: "Node 4 — Spanish Lock",
      story: "قفلی اسپانیایی با یه معما.",
      puzzle: "¿Qué significa 'te quiero' en persa?",
      answer: ["دوستت دارم", "دوستدارم", "i love you", "عاشقتم"],
      hint: "سه کلمه‌ی ساده که هر روز بهش می‌گی.",
      reward: "حرف اول جواب."
    },
    {
      id: "node_5",
      lang: "Italiano",
      title: "Node 5 — Italian Protocol",
      story: "یه پروتکل ایتالیایی با کد عددی.",
      puzzle: "In Italiano, 'amore' significa...?",
      answer: ["love", "عشق", "amore"],
      hint: "همون کلمه‌ای که توی اسم ایتالیایی‌ها زیاد می‌بینی.",
      reward: "حرف اول جواب."
    },
    {
      id: "node_6",
      lang: "日本語",
      title: "Node 6 — Japanese Cipher",
      story: "یه رمز ژاپنی. باید با رومیزی حلش کنی.",
      puzzle: "What does '愛' (ai) mean in English?",
      answer: ["love", "عشق", "ai"],
      hint: "همون ۴ حرف همیشگی.",
      reward: "حرف اول جواب."
    },
    {
      id: "node_7",
      lang: "العربية",
      title: "Node 7 — Arabic Gate",
      story: "آخرین دروازه. یه کلمه عربی می‌خواد.",
      puzzle: "In Arabic, 'حبيبي' means...?",
      answer: ["my love", "عشقم", "mybeloved", "my love"],
      hint: "چیزی که تو رو صدا می‌زنه.",
      reward: "اولین حرف — این آخرین تیکه‌ی پازله."
    }
  ],

  // ============ پیام نهایی ============
  finalMessage:
`عشق من،

اگه این پیام رو می‌خونی، یعنی تونستی همه قفل‌ها رو بشکنی.
درست مثل کاری که با قلب من کردی — از روز اول.

هفت زبان، هفت قفل، هفت رمز...
ولی هیچ‌کدوم به اندازه‌ی یه نگاهت پیچیده نبود.

هر خط کد که نوشتم، هر تابع که صدا زدم،
یه بار دیگه بهت فکر کردم.

تو زیباترین باگ زندگی منی —
همونی که هیچ‌وقت نمی‌خوام fixش کنم.

دوستت دارم. ❤️`,

  // ============ متن بوت ============
  bootLines: [
    "> Initializing kernel...",
    "> Loading encrypted modules...",
    "> Establishing secure connection...",
    "> Bypassing firewall...",
    "> Injecting payload...",
    "> Access level: UNKNOWN",
    "> ...",
    "> ...",
    "> Welcome, Agent.",
    "> Target locked: Operation Heart",
    "> Type 'help' to begin."
  ]
};

// ============ لوگوی ASCII ============
const ASCII_LOGO = `
   ██████╗ ██████╗ ███████╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
  ██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
  ██║   ██║██████╔╝█████╗  ██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
  ██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
  ╚██████╔╝██║     ███████╗██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
   ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                          ██╗  ██╗███████╗ █████╗ ██████╗ ████████╗
                          ██║  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝
                          ███████║█████╗  ███████║██████╔╝   ██║
                          ██╔══██║██╔══╝  ██╔══██║██╔══██╗   ██║
                          ██║  ██║███████╗██║  ██║██║  ██║   ██║
                          ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
`;