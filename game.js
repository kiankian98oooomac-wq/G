// ==========================================
//  Game Engine — ترمینال هک
// ==========================================

const output   = document.getElementById('output');
const command  = document.getElementById('command');
const glitch   = document.getElementById('glitch-overlay');

const state = {
  player: null,
  unlocked: new Set(),
  hintsUsed: new Set(),
  awaitingAnswer: null,
  awaitingDecrypt: false,
  booted: false
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function print(text, className = '') {
  if (!output) return;
  const div = document.createElement('div');
  div.className = className;
  div.textContent = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function printHTML(html) {
  if (!output) return;
  const div = document.createElement('div');
  div.innerHTML = html;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function triggerGlitch() {
  if (!glitch) return;
  glitch.classList.add('glitch-active');
  setTimeout(() => glitch.classList.remove('glitch-active'), 300);
}

function buildFinalKey() {
  return GAME_DATA.nodes
    .map(n => n.answer[0][0].toLowerCase())
    .join('');
}

// ============ بوت ترمینال ============
async function bootTerminal(player) {
  state.player = player;
  if (!output) return;
  output.innerHTML = '';

  printHTML(`<pre class="green bold" style="font-size:9px; line-height:1.1; margin-bottom:15px;">${ASCII_LOGO}</pre>`);
  print(`[i] Welcome, ${player.username} (${player.codename})`, 'magenta bold');
  print(`[i] Access level: ${player.level.toUpperCase()}`, 'cyan');
  print('');

  for (const line of GAME_DATA.bootLines) {
    print(line, 'dim');
    await sleep(180);
  }

  print('');
  print('═══════════════════════════════════', 'green bold');
  print('  Type  help  to see commands.', 'yellow');
  print('═══════════════════════════════════', 'green bold');
  print('');
  state.booted = true;
}

// ============ دستورات ============
const commands = {

  help() {
    printHTML(`
<span class="cyan bold">╔══════════════════════════════════════════════╗</span>
<span class="cyan bold">║           AVAILABLE COMMANDS                 ║</span>
<span class="cyan bold">╚══════════════════════════════════════════════╝</span>

  <span class="green bold">scan</span>              اسکن شبکه و دیدن همه node ها
  <span class="green bold">connect <node></span>    اتصال به یه node (مثلاً: connect node_1)
  <span class="green bold">list</span>              لیست node های باز شده
  <span class="green bold">hint <node></span>       گرفتن راهنما
  <span class="green bold">status</span>            دیدن وضعیت
  <span class="green bold">decrypt final</span>     رمزگشایی پیام نهایی
  <span class="green bold">clear</span>             پاک کردن صفحه
  <span class="green bold">help</span>              همین راهنما
`);
  },

  scan() {
    print('[+] Scanning network...', 'cyan');
    setTimeout(() => {
      print(`[+] Found ${GAME_DATA.nodes.length} encrypted nodes:`, 'cyan');
      GAME_DATA.nodes.forEach(n => {
        const open = state.unlocked.has(n.id);
        const mark = open ? '✓ UNLOCKED' : '● LOCKED';
        const cls  = open ? 'green' : 'red';
        print(`    ${n.id}  [${n.lang}]  ${mark}`, cls);
      });
      print("\nType 'connect <node_id>' to start.", 'dim');
    }, 600);
  },

  connect(args) {
    const id = args[0];
    if (!id) { print('[!] Usage: connect <node_id>', 'red'); return; }

    const node = GAME_DATA.nodes.find(n => n.id === id);
    if (!node) { print(`[!] Node '${id}' not found. Try 'scan'.`, 'red'); return; }

    if (state.unlocked.has(id)) {
      print(`[*] Node ${id} already unlocked.`, 'yellow');
      return;
    }

    triggerGlitch();
    print('');
    printHTML(`<div class="panel">
<span class="magenta bold">[ ${node.title} ]</span>
<span class="dim">Language: ${node.lang}</span>

<span class="white">${node.story}</span>

<span class="yellow">PUZZLE:</span>
<span class="white">${node.puzzle}</span>
</div>`);
    print(`[?] Enter answer (or type 'hint ${id}'):`, 'cyan');

    state.awaitingAnswer = id;
  },

  hint(args) {
    const id = args[0] || state.awaitingAnswer;
    if (!id) { print('[!] Usage: hint <node_id>', 'red'); return; }
    const node = GAME_DATA.nodes.find(n => n.id === id);
    if (!node) { print('[!] Node not found.', 'red'); return; }

    state.hintsUsed.add(id);
    print(`[💡] ${node.hint}`, 'yellow');
    print(`[🎁] ${node.reward}`, 'magenta');
  },

  list() {
    if (state.unlocked.size === 0) {
      print('[!] No nodes unlocked yet.', 'red');
      return;
    }
    print(`[+] Unlocked (${state.unlocked.size}/${GAME_DATA.nodes.length}):`, 'green');
    state.unlocked.forEach(id => print(`    ✓ ${id}`, 'green'));
  },

  status() {
    print('═══ STATUS ═══', 'cyan bold');
    print(`Target : ${GAME_DATA.targetName}`, 'white');
    print(`Agent  : ${state.player?.codename || '?'}`, 'white');
    print(`Nodes  : ${state.unlocked.size}/${GAME_DATA.nodes.length}`, 'green');
    print(`Hints  : ${state.hintsUsed.size} used`, 'yellow');
  },

  decrypt(args) {
    if (args[0] !== 'final') {
      print('[!] Usage: decrypt final', 'red');
      return;
    }
    if (state.unlocked.size < GAME_DATA.nodes.length) {
      print(`[!] ${GAME_DATA.nodes.length - state.unlocked.size} node(s) still locked.`, 'red');
      return;
    }
    print('[?] Enter decryption key:', 'cyan');
    state.awaitingDecrypt = true;
  },

  clear() { output.innerHTML = ''; },

  exit() {
    print('[!] Connection terminated.', 'red');
    command.disabled = true;
  },

  sudo() {
    print('[!] Nice try. But love cannot be sudo-ed. ❤️', 'magenta');
  },

  whoami() {
    print(`${state.player?.codename} — a hacker in love with ${GAME_DATA.targetName}`, 'magenta');
  },

  love() { print('❤️  ❤️  ❤️', 'magenta'); }
};

// ============ پردازش دستور ============
function handleCommand(raw) {
  const input = raw.trim();
  if (!input) return;

  print(`agent@shadow-net:~$ ${input}`, 'dim');

  // حالت انتظار برای جواب معما
  if (state.awaitingAnswer) {
    const node = GAME_DATA.nodes.find(n => n.id === state.awaitingAnswer);
    const normalized = input.toLowerCase().trim();

    if (node.answer.some(a => a.toLowerCase() === normalized)) {
      state.unlocked.add(node.id);
      state.awaitingAnswer = null;
      triggerGlitch();
      printHTML(`<div class="panel panel-magenta">
<span class="green bold">[✓] NODE UNLOCKED</span>
<span class="white">${node.id} (${node.lang}) has been decrypted.</span>
<span class="yellow">${node.reward}</span>
</div>`);

      if (state.unlocked.size === GAME_DATA.nodes.length) {
        print('');
        print('[★] ALL NODES UNLOCKED!', 'green bold');
        print('[★] Final message ready. Type: decrypt final', 'magenta bold');
      }
    } else {
      print('[✗] Access denied. Wrong answer.', 'red');
      print(`[?] Try again, or type 'hint ${node.id}'.`, 'yellow');
    }
    return;
  }

  // حالت انتظار برای کلید نهایی
  if (state.awaitingDecrypt) {
    const key = input.toLowerCase().replace(/\s+/g, '');
    const realKey = buildFinalKey().replace(/\s+/g, '');

    if (key === realKey) {
      state.awaitingDecrypt = false;
      triggerGlitch();
      print('');
      printHTML(`<div class="panel panel-magenta">
<span class="magenta bold">████████████████████████████████████████</span>
<span class="green bold">        ACCESS GRANTED</span>
<span class="magenta bold">████████████████████████████████████████</span>

<pre class="white" style="margin-top:10px; white-space:pre-wrap; font-family:inherit;">${GAME_DATA.finalMessage}</pre>

<span class="magenta bold">████████████████████████████████████████</span>
</div>`);
      print('[★] Mission complete. ❤️', 'magenta bold');
    } else {
      print('[✗] Wrong key. Access denied.', 'red');
      print('[?] Try again.', 'yellow');
    }
    return;
  }

  const [cmd, ...args] = input.split(/\s+/);
  const fn = commands[cmd.toLowerCase()];
  if (fn) fn(args);
  else print(`[!] Unknown command: '${cmd}'. Type 'help'.`, 'red');
}

// ============ دکمه‌های لمسی موبایل ============
function bindMobileButtons() {
  document.querySelectorAll('[data-cmd]').forEach(btn => {
    // برای دسکتاپ
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleCommand(btn.dataset.cmd);
      return false;
    });

    // برای موبایل — جلوی رفرش رو می‌گیره
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleCommand(btn.dataset.cmd);
      return false;
    }, { passive: false });
  });
}

// ============ جلوگیری از رفرش کل صفحه ============
document.addEventListener('touchmove', (e) => {
  // اگه توی input نیست، جلوی scroll صفحه رو بگیر
  if (!e.target.closest('#output') && !e.target.closest('input')) {
    if (e.touches.length === 1) {
      // اجازه بده اسکرول توی عناصر مجاز
    }
  }
}, { passive: true });

// جلوگیری از pull-to-refresh
let lastTouchY = 0;
document.addEventListener('touchstart', (e) => {
  lastTouchY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const y = e.touches[0].clientY;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // اگه بالای صفحه بود و به پایین کشید
  if (scrollTop <= 0 && y > lastTouchY) {
    e.preventDefault();
  }
}, { passive: false });

// ============ شروع ============
window.addEventListener('DOMContentLoaded', () => {
  let player = null;
  try {
    const saved = localStorage.getItem('operationHeartPlayer');
    if (saved) player = JSON.parse(saved);
  } catch(e) {}

  if (!player) {
    player = {
      username: "عشق من",
      codename: "Agent",
      level: "hacker",
      charId: "hacker",
      outfitId: "neon"
    };
  }

  // لیسنر برای input
  command?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const val = command.value;
      command.value = '';
      handleCommand(val);
      return false;
    }
  });

  // فوکوس روی input
  document.addEventListener('click', () => {
    if (state.booted && window.innerWidth > 900) command.focus();
  });

  // دکمه‌های موبایل
  bindMobileButtons();

  // شروع داستان
  startStory(player);
});