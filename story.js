// ==========================================
//  Story Engine — انیمیشن داستانی
// ==========================================

let storyIndex = 0;
let storyTyping = false;
let storySkipTyping = false;
let storyPlayer = null;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function startStory(player) {
  storyPlayer = player;
  const emojiEl   = document.getElementById('char-emoji');
  const glowEl    = document.getElementById('char-glow');
  const char      = CHARACTERS.find(c => c.id === player.charId) || CHARACTERS[0];
  const outfit    = OUTFITS.find(o => o.id === player.outfitId) || OUTFITS[0];

  emojiEl.textContent = char.emoji;
  emojiEl.style.color = outfit.color;
  emojiEl.style.textShadow = `0 0 30px ${outfit.color}, 0 0 60px ${outfit.color}40`;
  glowEl.style.color = outfit.color;

  playLine();
}

function replaceVars(text) {
  if (!storyPlayer) return text;
  return text
    .replace(/{codename}/g, storyPlayer.codename)
    .replace(/{username}/g, storyPlayer.username);
}

async function typeText(text, el) {
  el.innerHTML = '';
  storyTyping = true;
  storySkipTyping = false;

  for (let i = 0; i < text.length; i++) {
    if (storySkipTyping) {
      el.textContent = text;
      break;
    }
    el.textContent += text[i];
    await sleep(35);
  }
  storyTyping = false;
}

async function playLine() {
  const bgEl      = document.getElementById('scene-bg');
  const emojiEl   = document.getElementById('char-emoji');
  const speakerEl = document.getElementById('speaker');
  const textEl    = document.getElementById('dialogue-text');

  if (storyIndex >= STORY.length) {
    // پایان داستان
    const scene = document.getElementById('story-scene');
    scene.style.transition = 'opacity 0.8s';
    scene.style.opacity = '0';
    await sleep(800);
    scene.classList.add('hidden');
    document.getElementById('terminal').classList.remove('hidden');
    document.getElementById('command').focus();
    if (typeof bootTerminal === 'function') bootTerminal(storyPlayer);
    return;
  }

  const line = STORY[storyIndex];

  bgEl.dataset.bg = line.bg;

  const isPlayer = line.speaker === "{codename}";
  const outfit = OUTFITS.find(o => o.id === storyPlayer.outfitId) || OUTFITS[0];

  emojiEl.style.transform = isPlayer ? 'scale(1.15)' : 'scale(1)';
  emojiEl.style.filter = isPlayer
    ? `drop-shadow(0 0 40px ${outfit.color})`
    : `drop-shadow(0 0 20px ${outfit.color}) brightness(0.7)`;

  speakerEl.textContent = replaceVars(line.speaker);
  await sleep(200);
  await typeText(replaceVars(line.text), textEl);
}

function advanceStory() {
  if (storyTyping) {
    storySkipTyping = true;
    return;
  }
  storyIndex++;
  playLine();
}

// لیسنرها
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'Enter') {
    const scene = document.getElementById('story-scene');
    if (scene && !scene.classList.contains('hidden')) {
      e.preventDefault();
      advanceStory();
    }
  }
});

document.addEventListener('click', (e) => {
  const scene = document.getElementById('story-scene');
  if (scene && !scene.classList.contains('hidden') && e.target.closest('.story-scene')) {
    advanceStory();
  }
});