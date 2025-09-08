// Orange Tribute Interactive Script
(function(){
  const punBtn = document.getElementById('punBtn');
  const punDisplay = document.getElementById('punDisplay');
  const summonBtn = document.getElementById('summonBtn');
  const orangeField = document.getElementById('orangeField');
  const factList = document.getElementById('factList');
  const addFactBtn = document.getElementById('addFact');
  const factTemplate = document.getElementById('factTemplate');
  const orangeTemplate = document.getElementById('orangeTemplate');
  const cMeter = document.getElementById('cMeter');
  const cValue = document.getElementById('cValue');
  const consumeBtn = document.getElementById('consumeBtn');
  const ritualProgressEl = document.getElementById('ritualProgress');
  const ritualStatus = document.getElementById('ritualStatus');
  const modeToggle = document.getElementById('modeToggle');
  const timerEl = document.getElementById('timer');
  const memeBox = document.getElementById('memeBox');
  const memeNext = document.getElementById('memeNext');
  const memeModeBtn = document.getElementById('memeModeBtn');
  const overloadBtn = document.getElementById('overloadBtn');
  const intensityRange = document.getElementById('intensityRange');
  const intensityVal = document.getElementById('intensityVal');

  const puns = [
    "Orange u awake?",
    "Zest mode",
    "Full pulp",
    "C++? C = Citrus",
    "Low latency juice",
    "Kernel panic: need orange",
    "404: lemon not found",
    "Ping: 阿橙 reply = juicy",
    "Deploying zest...",
    "Cache miss, eat fruit",
    "Main thread blocked by Vitamin C",
    "Peak rind energy",
    "Pulp fiction IRL",
    "Legend: 阿橙.exe",
    "Input: orange, Output: greatness"
  ];

  const extraFacts = [
    "Scent = chill buff.",
    "Brazil = orange farm boss.",
    "Peel > fruit (fiber).",
    "600+ variants unlocked.",
    "Cold = sweeter patch.",
    "Color named after fruit.",
    "Green skin? Still valid.",
    "50y tree uptime.",
    "Collagen boost pack.",
    "Secret: hesperidium tech.",
    "阿橙 certified juicy." 
  ];

  const memes = [
    "[MEME] When life gives lemons -> forward to 阿橙",
    "Upgrade path: 🍋 -> 🍊 -> 阿橙 -> Ultra",
    "Doctor: you need rest. Me: need orange.",
    "Productivity hack: replace coffee with citrus aura.",
    "Skill issue? Add Vitamin C.",
    "If it rhymed with orange it would be too OP.",
    "FPS drop? Lower juice particles.",
    "Roadmap: 1) Peel 2) Dominate 3) Repeat",
    "Be the rind you want to see.",
    "Stack Overflow answer: just add orange",
    "Real gamers preload puns",
    "Powered by 120Hz pulp",
    "Orange core temperature stable",
    "GPU overheated from saturation",
    "Patch notes: +10% zest, -2% sanity"
  ];

  function random(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  punBtn?.addEventListener('click', () => {
    punDisplay.textContent = random(puns);
    flash(punDisplay);
  });

  function flash(el){
    el.animate([
      { transform:'scale(1)', filter:'brightness(1)' },
      { transform:'scale(1.08)', filter:'brightness(1.4)' },
      { transform:'scale(1)', filter:'brightness(1)' }
    ], { duration:550, easing:'cubic-bezier(.65,.05,.36,1)' });
  }

  // Orange spawner
  function spawnOrange(count=1){
    const intensity = parseInt(intensityRange?.value || '5',10);
    const total = count + Math.round(intensity/2);
    for(let i=0;i<total;i++){
      const clone = orangeTemplate.content.firstElementChild.cloneNode(true);
      const size = 28 + Math.random()* (50 + intensity*3);
      clone.style.setProperty('--size', size+'px');
      clone.style.top = (Math.random()*100)+'%';
      clone.style.left = (Math.random()*100)+'%';
      clone.style.animationDuration = (4 + Math.random()* (20 - intensity))+'s';
      clone.style.animationDirection = Math.random() > .5 ? 'reverse' : 'normal';
      clone.style.mixBlendMode = intensity > 9 ? 'screen' : 'normal';
      clone.style.opacity = 0.85 + Math.random()*0.15;
      clone.style.setProperty('--i', (Math.random()*10).toFixed(2));
      clone.addEventListener('click', () => {
        increaseVitamin(Math.round(size/10)+1);
        pop(clone);
      });
      orangeField.appendChild(clone);
      setTimeout(()=> clone.classList.add('drift'), 50);
      setTimeout(()=> clone.remove(), 45000 + intensity*3000);
    }
    if(intensity > 11) flash(orangeField);
  }

  summonBtn?.addEventListener('click', () => {
    spawnOrange(2 + Math.floor(Math.random()*4));
    checkRitual('spawn');
  });

  overloadBtn?.addEventListener('click', () => {
    document.body.classList.toggle('overload');
    overloadBtn.textContent = document.body.classList.contains('overload') ? 'Calm Mode 😴' : 'OVERLOAD 🔥';
    if(document.body.classList.contains('overload')){
      let waves = 0;
      const blast = setInterval(()=>{
        spawnOrange(12);
        waves++;
        if(waves>8 || !document.body.classList.contains('overload')) clearInterval(blast);
      }, 500);
    }
  });

  function pop(el){
    el.animate([
      { transform:el.style.transform+' scale(1)', opacity:1 },
      { transform:el.style.transform+' scale(.2) rotate(40deg)', opacity:0 }
    ], { duration:260, easing:'cubic-bezier(.55,.08,.55,.95)' });
    setTimeout(()=> el.remove(), 240);
  }

  // Facts
  addFactBtn?.addEventListener('click', () => {
    const fact = random(extraFacts);
    const li = factTemplate.content.firstElementChild.cloneNode(true);
    li.textContent = fact;
    factList.appendChild(li);
    flash(li);
  });

  memeNext?.addEventListener('click', nextMeme);
  function nextMeme(){
    memeBox.textContent = random(memes);
    memeBox.classList.remove('flash');
    void memeBox.offsetWidth; // restart animation
    memeBox.classList.add('flash');
  }
  nextMeme();

  memeModeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('meme-mode');
    memeModeBtn.textContent = document.body.classList.contains('meme-mode') ? 'Unmeme 😐' : 'Meme Mode 🤪';
  });

  intensityRange?.addEventListener('input', () => {
    intensityVal.textContent = intensityRange.value;
  });
  intensityVal.textContent = intensityRange?.value || '5';

  // Vitamin C Meter
  let vitamin = 5;
  function increaseVitamin(amount){
    vitamin = Math.min(100, vitamin + amount);
    updateVitamin();
  }
  function consume(){
    increaseVitamin(7 + Math.round(Math.random()*9));
    checkRitual('vitamin');
  }
  function updateVitamin(){
    cMeter.style.width = vitamin+'%';
    cValue.textContent = vitamin+'%';
    if(vitamin >= 100){
      document.body.classList.add('max-c');
      ritualStatus.dataset.vitaminDone = '1';
      checkRitual('vitamin');
    }
  }
  consumeBtn?.addEventListener('click', consume);

  // Ritual: clicking logo 8 times
  const headerTitle = document.querySelector('.hero h1');
  let clickCount = 0;
  headerTitle?.addEventListener('click', () => {
    clickCount++;
    flash(headerTitle);
    if(clickCount === 8){
      headerTitle.classList.add('clicked-eight');
      checkRitual('clicks');
    }
  });

  // Konami Code
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let buffer = [];
  window.addEventListener('keydown', e => {
    buffer.push(e.key);
    buffer.splice(-konami.length-1, buffer.length - konami.length);
    if(buffer.join('').toLowerCase() === konami.join('').toLowerCase()){
      ascend();
      checkRitual('konami');
    }
  });
  function ascend(){
    if(document.body.classList.contains('ascended')) return;
    document.body.classList.add('ascended');
    spawnOrange(15);
    flash(document.querySelector('.hero h1'));
    punDisplay.textContent = 'ULTRA ZEST MODE ACTIVATED 🌞🍊';
  }

  // Dark mode toggle
  modeToggle?.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark');
    modeToggle.textContent = dark ? 'Day Peel ☀️' : 'Night Peel 🌙';
    modeToggle.setAttribute('aria-pressed', String(dark));
  });

  // Countdown to midnight
  function updateTimer(){
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(24,0,0,0);
    const diff = tomorrow - now;
    const h = Math.floor(diff/3.6e6).toString().padStart(2,'0');
    const m = Math.floor(diff%3.6e6/6e4).toString().padStart(2,'0');
    const s = Math.floor(diff%6e4/1000).toString().padStart(2,'0');
    timerEl.textContent = `${h}:${m}:${s}`;
  }
  setInterval(updateTimer, 1000); updateTimer();

  // Vitamin passive regen
  setInterval(()=>{ if(vitamin < 100) { increaseVitamin(.6); } }, 3500);

  // Ritual tracking
  const ritual = { clicks:false, konami:false, vitamin:false };
  function checkRitual(type){
    if(type==='clicks') ritual.clicks = true;
    if(type==='konami') ritual.konami = true;
    if(type==='vitamin' && vitamin >= 100) ritual.vitamin = true;
    const done = Object.values(ritual).filter(Boolean).length;
    ritualProgressEl.textContent = done;
    if(done === 3){
      ritualStatus.classList.add('done');
      punDisplay.textContent = 'RITUAL COMPLETE. 阿橙 HAS BLESSED THIS DOMAIN.';
      spawnOrange(25);
    }
  }

  // Initial spawn
  spawnOrange(8);

})();
