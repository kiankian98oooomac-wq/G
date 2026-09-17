// ==========================================
//  Auth — ثبت‌نام
// ==========================================

function renderCharOptions() {
  const box = document.getElementById('char-select');
  box.innerHTML = '';
  CHARACTERS.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'char-option' + (i === 0 ? ' selected' : '');
    div.dataset.id = c.id;
    div.innerHTML = `
      <div class="avatar" style="color:${c.color}">${c.emoji}</div>
      <div class="name">${c.name}</div>
    `;
    div.onclick = () => {
      document.querySelectorAll('.char-option').forEach(el => el.classList.remove('selected'));
      div.classList.add('selected');
    };
    box.appendChild(div);
  });
}

function renderOutfitOptions() {
  const box = document.getElementById('outfit-select');
  box.innerHTML = '';
  OUTFITS.forEach((o, i) => {
    const div = document.createElement('div');
    div.className = 'outfit-option' + (i === 0 ? ' selected' : '');
    div.dataset.id = o.id;
    div.innerHTML = `
      <div class="swatch" style="
        display:inline-block;width:32px;height:32px;
        border-radius:50%;
        background: radial-gradient(circle, ${o.color}, ${o.accent});
        box-shadow: 0 0 15px ${o.color};
        margin-bottom:6px;
      "></div>
      <div class="name">${o.name}</div>
    `;
    div.onclick = () => {
      document.querySelectorAll('.outfit-option').forEach(el => el.classList.remove('selected'));
      div.classList.add('selected');
    };
    box.appendChild(div);
  });
}

document.getElementById('auth-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const codename = document.getElementById('codename').value.trim();
  const level    = document.getElementById('level').value;
  const charId   = document.querySelector('.char-option.selected')?.dataset.id || 'hacker';
  const outfitId = document.querySelector('.outfit-option.selected')?.dataset.id || 'neon';

  const player = { username, codename, level, charId, outfitId };
  localStorage.setItem('operationHeartPlayer', JSON.stringify(player));

  document.body.style.transition = 'opacity 0.5s';
  document.body.style.opacity = '0';
  setTimeout(() => {
    window.location.href = 'game.html';
  }, 500);
});

// ============ ذرات پس‌زمینه ============
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function create() {
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5
    }));
  }

  function draw() {
    ctx.fillStyle = 'rgba(5,8,7,0.15)';
    ctx.fillRect(0, 0, w, h);

    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,136,0.6)';
      ctx.fill();

      particles.slice(i + 1).forEach(q => {
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,255,136,${0.15 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }

  resize();
  create();
  draw();
  window.addEventListener('resize', () => { resize(); create(); });
}

renderCharOptions();
renderOutfitOptions();
initParticles();