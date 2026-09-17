// ==========================================
//  شخصیت‌ها و لباس‌ها
// ==========================================

const CHARACTERS = [
  { id: "hacker",  name: "هکر نئونی",    emoji: "🧑‍💻", color: "#00ff88", description: "کلاسیک — هودی و عینک" },
  { id: "ninja",   name: "نینجا سایبری", emoji: "🥷",  color: "#ff2d55", description: "مخفی و سریع" },
  { id: "cyborg",  name: "سایبورگ",      emoji: "🤖",  color: "#00ddff", description: "نیمه انسان، نیمه ماشین" },
  { id: "phantom", name: "فانتوم",       emoji: "👻",  color: "#ff44dd", description: "روح دیجیتال" },
  { id: "agent",   name: "مأمور مخفی",   emoji: "🕵️",  color: "#ffcc00", description: "کت و شلوار رسمی" },
  { id: "gamer",   name: "گیمر",         emoji: "🎮",  color: "#aa66ff", description: "با هدفون گیمینگ" }
];

const OUTFITS = [
  { id: "neon",    name: "نئون سبز",     color: "#00ff88", accent: "#004422" },
  { id: "crimson", name: "قرمز خون",     color: "#ff2d55", accent: "#440010" },
  { id: "ocean",   name: "آبی اقیانوس",  color: "#00ddff", accent: "#003344" },
  { id: "magenta", name: "بنفش نئونی",   color: "#ff44dd", accent: "#440033" },
  { id: "gold",    name: "طلایی",        color: "#ffcc00", accent: "#443300" },
  { id: "violet",  name: "بنفش کهکشانی", color: "#aa66ff", accent: "#221144" }
];

// ==========================================
//  داستان — دیالوگ‌های انیمیشن سینمایی
// ==========================================

const STORY = [
  { scene: "intro",   bg: "matrix", speaker: "سیستم",     text: "اتصال برقرار شد..." },
  { scene: "intro",   bg: "matrix", speaker: "سیستم",     text: "خوش آمدی، مأمور {codename}." },
  { scene: "intro",   bg: "matrix", speaker: "{codename}", text: "من آماده‌ام. هدف کجاست؟" },
  { scene: "briefing",bg: "city",   speaker: "سیستم",     text: "یه سازمان مخفی یه پیام رو دزدیده." },
  { scene: "briefing",bg: "city",   speaker: "سیستم",     text: "پیامی که فقط برای {username} نوشته شده بود." },
  { scene: "briefing",bg: "city",   speaker: "{codename}", text: "پس باید نفوذ کنم و پسش بگیرم." },
  { scene: "mission", bg: "server", speaker: "سیستم",     text: "۷ قفل رمزنگاری‌شده سر راهته." },
  { scene: "mission", bg: "server", speaker: "سیستم",     text: "هر قفل به یه زبان مختلف قفله." },
  { scene: "mission", bg: "server", speaker: "{codename}", text: "هیچ‌وقت متوقف نمی‌شم." },
  { scene: "final",   bg: "heart",  speaker: "سیستم",     text: "وقتش رسیده. ترمینال رو باز کن..." },
  { scene: "final",   bg: "heart",  speaker: "{codename}", text: "بیا شروع کنیم. 💻" }
];