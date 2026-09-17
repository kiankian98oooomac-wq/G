// ==========================================
//  🎮 داده‌های بازی — ۷ زبان زنده‌ی دنیا
// ==========================================

const GAME_DATA = {

  targetName: "عشق من",
  agentName: "Agent",

  // ============ ۷ مرحله (۷ زبان) ============
  nodes: [
    {
      id: "node_1",
      lang: "English",
      title: "Node 1 — English Protocol",
      story: "A secret file is encrypted. Find the key word.",
      puzzle: "Complete the sentence:\n\n  'You are my ______'\n\n(4 letters, shines at night)",
      answer: ["star", "ستاره"],
      hint: "Look at the night sky — the thing that shines in her eyes.",
      reward: "First letter of the answer."
    },
    {
      id: "node_2",
      lang: "Français",
      title: "Node 2 — Pare-feu Français",
      story: "Un fichier français est verrouillé. Trouve le mot-clé.",
      puzzle: "Décode ce message (César, décalage = 3):\n\n  'prx frx'\n\n(2 mots)",
      answer: ["mon coeur", "moncoeur", "قلب من"],
      hint: "Décale chaque lettre de 3 en arrière. p→m, r→o, x→u ...",
      reward: "Première lettre de la réponse."
    },
    {
      id: "node_3",
      lang: "Deutsch",
      title: "Node 3 — Deutscher Tresor",
      story: "Ein deutscher Tresor. Ein Wort genügt.",
      puzzle: "Was bedeutet 'Liebe' auf Englisch?\n\n(4 Buchstaben)",
      answer: ["love", "liebe", "عشق"],
      hint: "Das Gefühl, das du für sie hast.",
      reward: "Erster Buchstabe der Antwort."
    },
    {
      id: "node_4",
      lang: "Español",
      title: "Node 4 — Candado Español",
      story: "Un candado español. Una frase corta.",
      puzzle: "¿Qué significa 'te quiero' en persa?",
      answer: ["دوستت دارم", "دوستدارم", "i love you", "عاشقتم"],
      hint: "Tres palabras simples que le dices cada día.",
      reward: "Primera letra de la respuesta."
    },
    {
      id: "node_5",
      lang: "Italiano",
      title: "Node 5 — Protocollo Italiano",
      story: "Un protocollo italiano. Una parola dolce.",
      puzzle: "In italiano, 'amore' significa...?",
      answer: ["love", "amore", "عشق"],
      hint: "La parola più bella del mondo.",
      reward: "Prima lettera della risposta."
    },
    {
      id: "node_6",
      lang: "日本語",
      title: "Node 6 — 日本語プロトコル",
      story: "日本語のファイル。漢字を読め。",
      puzzle: "「愛」は英語で何と言いますか？\n\n(4 letters)",
      answer: ["love", "ai", "愛", "عشق"],
      hint: "世界で一番美しい言葉。",
      reward: "答えの最初の文字。"
    },
    {
      id: "node_7",
      lang: "العربية",
      title: "Node 7 — البوابة العربية",
      story: "ملف عربي مقفل. ابحث عن الكلمة.",
      puzzle: "ماذا تعني كلمة 'حبيبي' بالإنجليزية؟\n\n(كلمتان)",
      answer: ["my love", "عشقم", "my beloved"],
      hint: "الكلمة التي تناديها كل يوم.",
      reward: "أول حرف من الجواب."
    }
  ],

  // ============ پیام نهایی ============
  finalMessage:
`عشق من،

اگه این پیام رو می‌خونی، یعنی تونستی ۷ تا قفل رو با ۷ زبان دنیا بشکنی.
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
`;
