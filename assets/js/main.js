/* =========================================================
   RITHVIK CITY — Recruiter Optimized V13
   Uses the global THREE object loaded in index.html.
========================================================= */

(() => {
  "use strict";

  if (!window.THREE) {
    const screen = document.getElementById("loadingScreen");
    if (screen) screen.innerHTML = '<div class="loading-inner loading-minimal"><h1 class="loading-logo welcome-only"><span>WELCOME</span></h1></div>';
    console.error("Three.js could not be loaded.");
    return;
  }

  const $ = (id) => document.getElementById(id);

  const threeContainer = $("threeContainer");
  const loadingScreen = $("loadingScreen");
  const loadingFill = $("loadingFill");

  const districtHoverCard = $("districtHoverCard");
  const hoverIndex = $("hoverIndex");
  const hoverGlyph = $("hoverGlyph");
  const hoverTitle = $("hoverTitle");
  const hoverDescription = $("hoverDescription");
  const customCursor = $("customCursor");
  const exploreHint = $("exploreHint");
  const sectorReadout = $("sectorReadout");
  const coordinateReadout = $("coordinateReadout");

  const directoryToggle = $("directoryToggle");
  const directoryClose = $("directoryClose");
  const districtDirectory = $("districtDirectory");

  const sectionModal = $("sectionModal");
  const sectionBackdrop = $("sectionBackdrop");
  const sectionClose = $("sectionClose");
  const modalSectionIndex = $("modalSectionIndex");
  const modalSectionTitle = $("modalSectionTitle");
  const modalSectionSubtitle = $("modalSectionSubtitle");
  const sectionContent = $("sectionContent");
  const sectionSlider = $("sectionSlider");
  const sliderCurrent = $("sliderCurrent");
  const sliderTotal = $("sliderTotal");
  const sliderLabel = $("sliderLabel");
  const previousItem = $("previousItem");
  const nextItem = $("nextItem");
  const soundToggle = $("soundToggle");
  const soundToggleLabel = $("soundToggleLabel");
  const volumeSlider = $("volumeSlider");
  const volumeValue = $("volumeValue");
  const tourButton = $("tourButton");
  const exploredCount = $("exploredCount");
  const exploredFill = $("exploredFill");
  const cityStatus = $("cityStatus");
  const sectionSidebar = $("sectionSidebar");
  const timeModeButton = $("timeModeButton");
  const cinematicButton = $("cinematicButton");
  const objectiveTitle = $("objectiveTitle");
  const objectiveText = $("objectiveText");
  const objectiveFill = $("objectiveFill");
  const objectiveCard = $("objectiveCard");
  const toastStack = $("toastStack");
  const telemetryReadout = $("telemetryReadout");
  const controlHintText = $("controlHintText");
  const hudStatusPrimary = $("hudStatusPrimary");
  const hudStatusSecondary = $("hudStatusSecondary");
  const recruiterViewButton = $("recruiterViewButton");
  const mobileRecruiterViewButton = $("mobileRecruiterViewButton");
  const recruiterModal = $("recruiterModal");
  const recruiterBackdrop = $("recruiterBackdrop");
  const recruiterClose = $("recruiterClose");
  const cityMinimap = $("cityMinimap");
  const minimapLabel = $("minimapLabel");
  const mobileMenuToggle = $("mobileMenuToggle");
  const mobileMenuPanel = $("mobileMenuPanel");
  const mobileMenuBackdrop = $("mobileMenuBackdrop");
  const mobileMenuClose = $("mobileMenuClose");
  const mobileSoundToggle = $("mobileSoundToggle");
  const mobileSoundState = $("mobileSoundState");
  const mobileTimeModeButton = $("mobileTimeModeButton");
  const mobileTimeState = $("mobileTimeState");
  const mobileTourButton = $("mobileTourButton");
  const mobileTourState = $("mobileTourState");
  const mobileHomeViewButton = $("mobileHomeViewButton");
  const mobileCinematicButton = $("mobileCinematicButton");
  const mobileCinematicState = $("mobileCinematicState");
  const mobileExploredCount = $("mobileExploredCount");
  const mobileExploredFill = $("mobileExploredFill");

  /* =========================================================
     LIGHTWEIGHT PROCEDURAL AUDIO
     No MP3 files required. Audio starts after the first click/tap because
     modern browsers block audible autoplay before a user gesture.
  ========================================================= */

  let audioCtx = null;
  let masterGain = null;
  let bgmGain = null;
  let sfxGain = null;
  let audioEnabled = true;
  let bgmStarted = false;
  let bgmTimer = null;
  let bgmStep = 0;
  let ambienceOscillators = [];
  let compressor = null;
  let ambientNoiseSource = null;
  let ambientNoiseGain = null;
  let masterVolume = .95;

  const visitedSections = new Set();
  let tourActive = false;
  let tourTimer = null;
  let tourIndex = 0;
  const tourOrder = ["about","featured","projects","experience","education","research","skills","contact"];
  const districtGlyphs = {projects:"◈",featured:"✦",experience:"▥",education:"⌂",skills:"⚙",research:"⌬",about:"RM",contact:"◎"};
  const timeModes = ["day","night"];
  let timeModeIndex = 0;
  let cinematicMode = false;
  let projectReplayTimer = null;
  let projectReplayStep = -1;
  let mobileMenuReturnFocus = null;
  let mobileMenuView = "explore";
  let mobileHintTimer = null;
  let mobileSectionSwipeStart = null;

  function setMobileMenuView(view="explore"){
    mobileMenuView=view;
    document.querySelectorAll("[data-mobile-menu-tab]").forEach(button=>{
      const active=button.dataset.mobileMenuTab===view;
      button.classList.toggle("is-active",active);
      button.setAttribute("aria-selected",active?"true":"false");
    });
    document.querySelectorAll("[data-mobile-menu-view]").forEach(panel=>{
      panel.hidden=panel.dataset.mobileMenuView!==view;
    });
    if(mobileMenuPanel){
      const scroll=mobileMenuPanel.querySelector(".mobile-menu-scroll");
      if(scroll)scroll.scrollTop=0;
    }
  }

  function dismissMobileHint(){
    if(!mobile||!exploreHint)return;
    exploreHint.classList.add("hidden");
    if(mobileHintTimer){clearTimeout(mobileHintTimer);mobileHintTimer=null;}
  }

  function setMobileMenu(open,withSound=true){
    if(!mobileMenuPanel||!mobileMenuToggle)return;
    if(open){
      mobileMenuReturnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
      dismissMobileHint();
      setMobileMenuView(mobileMenuView||"explore");
    }
    mobileMenuPanel.classList.toggle("open",open);
    mobileMenuBackdrop?.classList.toggle("open",open);
    mobileMenuPanel.setAttribute("aria-hidden",open?"false":"true");
    mobileMenuBackdrop?.setAttribute("aria-hidden",open?"false":"true");
    mobileMenuToggle.setAttribute("aria-expanded",open?"true":"false");
    document.body.classList.toggle("mobile-menu-open",open);
    if(open&&typeof clearDistrictHover==="function")clearDistrictHover();
    if(open){
      window.setTimeout(()=>mobileMenuClose?.focus({preventScroll:true}),80);
    }else if(mobileMenuReturnFocus){
      window.setTimeout(()=>mobileMenuReturnFocus?.focus?.({preventScroll:true}),40);
      mobileMenuReturnFocus=null;
    }
    if(withSound&&audioCtx?.state==="running")playClick();
  }

  function syncMobileMenuUi(){
    if(mobileSoundState) mobileSoundState.textContent=audioEnabled?`On • ${Math.round(masterVolume*100)}%`:"Off";
    if(mobileTimeState) mobileTimeState.textContent=(timeModes[timeModeIndex]||"day").replace(/^./,c=>c.toUpperCase());
    if(mobileTourState) mobileTourState.textContent=tourActive?"Running":"Start";
    if(mobileCinematicState) mobileCinematicState.textContent=cinematicMode?"On":"Off";
    if(mobileExploredCount) mobileExploredCount.textContent=`${visitedSections.size} / ${tourOrder.length}`;
    if(mobileExploredFill) mobileExploredFill.style.width=`${(visitedSections.size/tourOrder.length)*100}%`;
  }

  function createAudioContext(){
    if(audioCtx) return audioCtx;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if(!AudioContext) return null;

    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    bgmGain = audioCtx.createGain();
    sfxGain = audioCtx.createGain();
    compressor = audioCtx.createDynamicsCompressor();

    masterGain.gain.value = audioEnabled ? masterVolume : 0;
    bgmGain.gain.value = .52;
    sfxGain.gain.value = .72;

    compressor.threshold.value = -10;
    compressor.knee.value = 18;
    compressor.ratio.value = 3;
    compressor.attack.value = .008;
    compressor.release.value = .2;

    bgmGain.connect(masterGain);
    sfxGain.connect(masterGain);
    masterGain.connect(compressor);
    compressor.connect(audioCtx.destination);
    return audioCtx;
  }

  async function ensureAudio(){
    if(!audioEnabled) return;
    const ctx=createAudioContext();
    if(!ctx) return;
    if(ctx.state==="suspended"){
      try{await ctx.resume()}catch(_e){}
    }
    if(!bgmStarted) startBgm();
  }

  function startBgm(){
    if(!audioCtx || bgmStarted || !audioEnabled) return;
    bgmStarted=true;

    // A quiet, airy city pad. Only three continuous oscillators are used.
    const padFilter=audioCtx.createBiquadFilter();
    padFilter.type="lowpass";
    padFilter.frequency.value=900;
    padFilter.Q.value=.3;
    padFilter.connect(bgmGain);

    [82.41,110,164.81,220].forEach((freq,index)=>{
      const osc=audioCtx.createOscillator();
      const gain=audioCtx.createGain();
      osc.type=index===1?"triangle":"sine";
      osc.frequency.value=freq;
      osc.detune.value=index===2?4:index===3?-5:0;
      gain.gain.value=index===0?.028:index===1?.035:.02;
      osc.connect(gain); gain.connect(padFilter); osc.start();
      ambienceOscillators.push({osc,gain});
    });

    // Very quiet filtered city-air texture so the soundscape does not feel empty.
    const buffer=audioCtx.createBuffer(1,audioCtx.sampleRate*2,audioCtx.sampleRate);
    const channel=buffer.getChannelData(0);
    for(let i=0;i<channel.length;i++) channel[i]=(Math.random()*2-1)*.18;
    ambientNoiseSource=audioCtx.createBufferSource();
    ambientNoiseSource.buffer=buffer;ambientNoiseSource.loop=true;
    const noiseFilter=audioCtx.createBiquadFilter();
    noiseFilter.type="lowpass";noiseFilter.frequency.value=430;
    ambientNoiseGain=audioCtx.createGain();ambientNoiseGain.gain.value=.018;
    ambientNoiseSource.connect(noiseFilter);noiseFilter.connect(ambientNoiseGain);ambientNoiseGain.connect(bgmGain);ambientNoiseSource.start();

    scheduleMusicPhrase();
    bgmTimer=window.setInterval(scheduleMusicPhrase,4200);
  }

  function scheduleMusicPhrase(){
    if(!audioCtx || !audioEnabled || audioCtx.state!=="running") return;
    const chords=[
      [329.63,392.00,493.88,659.25],
      [293.66,369.99,440.00,587.33],
      [261.63,329.63,392.00,523.25],
      [293.66,349.23,440.00,587.33]
    ];
    const chord=chords[bgmStep%chords.length];
    const now=audioCtx.currentTime+.05;
    chord.forEach((freq,i)=>{
      const osc=audioCtx.createOscillator();
      const gain=audioCtx.createGain();
      const filter=audioCtx.createBiquadFilter();
      osc.type="sine";
      osc.frequency.value=freq;
      filter.type="lowpass";
      filter.frequency.value=1700;
      gain.gain.setValueAtTime(.0001,now+i*.34);
      gain.gain.exponentialRampToValueAtTime(.027,now+i*.34+.08);
      gain.gain.exponentialRampToValueAtTime(.0001,now+i*.34+1.15);
      osc.connect(filter); filter.connect(gain); gain.connect(bgmGain);
      osc.start(now+i*.34); osc.stop(now+i*.34+1.25);
    });
    bgmStep++;
  }

  function playTone(startFreq,endFreq,duration=.075,volume=.12,type="sine"){
    if(!audioEnabled) return;
    const ctx=createAudioContext();
    if(!ctx || ctx.state!=="running") return;
    const now=ctx.currentTime;
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type=type;
    osc.frequency.setValueAtTime(startFreq,now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(30,endFreq),now+duration);
    gain.gain.setValueAtTime(.0001,now);
    gain.gain.exponentialRampToValueAtTime(volume,now+.008);
    gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
    osc.connect(gain); gain.connect(sfxGain);
    osc.start(now); osc.stop(now+duration+.02);
  }

  function playClick(){ playTone(650,390,.06,.16,"triangle"); }
  function playOpenSound(){
    playTone(390,720,.095,.15,"sine");
    window.setTimeout(()=>playTone(610,980,.11,.11,"triangle"),44);
  }
  function playCloseSound(){ playTone(540,250,.1,.13,"triangle"); }
  function playHoverTick(){ playTone(930,790,.035,.052,"sine"); }
  function playTourChime(){
    playTone(520,780,.09,.09,"sine");
    window.setTimeout(()=>playTone(780,1040,.12,.07,"sine"),70);
  }

  async function setAudioEnabled(enabled){
    audioEnabled=enabled;
    soundToggle?.classList.toggle("sound-off",!enabled);
    soundToggle?.setAttribute("aria-pressed",enabled?"true":"false");
    if(soundToggleLabel) soundToggleLabel.textContent=enabled?"SOUND ON":"SOUND OFF";
    syncMobileMenuUi();

    if(enabled){
      await ensureAudio();
      if(masterGain && audioCtx){
        masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGain.gain.setTargetAtTime(masterVolume,audioCtx.currentTime,.04);
      }
      playClick();
    }else if(masterGain && audioCtx){
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setTargetAtTime(0,audioCtx.currentTime,.035);
    }
  }

  function setMasterVolume(value){
    masterVolume=THREE.MathUtils.clamp(value,0,1);
    if(volumeValue) volumeValue.textContent=`${Math.round(masterVolume*100)}%`;
    if(masterGain&&audioCtx&&audioEnabled){
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setTargetAtTime(masterVolume,audioCtx.currentTime,.035);
    }
    syncMobileMenuUi();
  }

  function duckMusic(ducked){
    if(!bgmGain||!audioCtx)return;
    bgmGain.gain.cancelScheduledValues(audioCtx.currentTime);
    bgmGain.gain.setTargetAtTime(ducked?.31:.52,audioCtx.currentTime,.12);
  }

  function updateExploredUi(){
    const count=visitedSections.size;
    const pct=(count/tourOrder.length)*100;
    if(exploredCount) exploredCount.textContent=`${count} / ${tourOrder.length}`;
    if(exploredFill) exploredFill.style.width=`${pct}%`;
    if(objectiveFill) objectiveFill.style.width=`${pct}%`;
    visitedSections.forEach(key=>{
      document.querySelectorAll(`[data-open-section="${key}"]`).forEach(el=>el.classList.add("is-visited"));
    });
    syncMobileMenuUi();
    const next=tourOrder.find(key=>!visitedSections.has(key));
    if(cityStatus){
      cityStatus.textContent=count===tourOrder.length?"CITY COMPLETE // ALL DISTRICTS EXPLORED":`${count} / ${tourOrder.length} DISTRICTS EXPLORED`;
    }
    if(objectiveTitle && objectiveText){
      if(count===tourOrder.length){
        objectiveTitle.textContent="Portfolio city complete";
        objectiveText.textContent="All districts discovered. Thanks for exploring.";
        objectiveCard?.classList.add("is-complete");
      }else{
        objectiveCard?.classList.remove("is-complete");
        objectiveTitle.textContent=`Explore the city • ${count}/${tourOrder.length}`;
        objectiveText.textContent=next?`Suggested next: ${portfolioSections[next].cityName}`:"Discover the portfolio districts.";
      }
    }
  }

  function showDiscoveryToast(key){
    if(!toastStack)return;
    const data=portfolioSections[key];if(!data)return;
    const toast=document.createElement("div");
    toast.className="discovery-toast";
    toast.style.setProperty("--toast-accent",`#${new THREE.Color(getDistrictConfig(key)?.accent||COLORS.accent).getHexString()}`);
    toast.innerHTML=`<span class="discovery-glyph">${districtGlyphs[key]||"◈"}</span><div><small>DISTRICT DISCOVERED</small><strong>${data.cityName}</strong><span>${visitedSections.size} / ${tourOrder.length} explored</span></div>`;
    toastStack.appendChild(toast);
    requestAnimationFrame(()=>toast.classList.add("show"));
    setTimeout(()=>{toast.classList.remove("show");setTimeout(()=>toast.remove(),360)},3200);
  }

  function getDistrictConfig(key){return districtConfigs.find(d=>d.key===key)||null}

  function focusDistrict(key,zoom=1.13){
    const cfg=getDistrictConfig(key);if(!cfg)return;
    cameraPanTarget.x=THREE.MathUtils.clamp(cfg.x*.58,-15,15);
    cameraPanTarget.y=THREE.MathUtils.clamp(cfg.z*.48,-10,10);
    cameraZoomTarget=mobile?Math.min(zoom,1.09):zoom;
    clampPan();
  }

  function syncMinimap(key=null){
    document.querySelectorAll("[data-map-section]").forEach(button=>button.classList.toggle("is-active",!!key && button.dataset.mapSection===key));
    if(minimapLabel) minimapLabel.textContent=key && portfolioSections[key] ? portfolioSections[key].cityName : "CENTRAL";
  }

  function focusFromMinimap(key){
    if(!portfolioSections[key])return;
    stopGuidedTour();
    if(activeHoverKey && activeHoverKey!==key)highlightDistrict(activeHoverKey,false);
    activeHoverKey=key;
    focusDistrict(key,1.08);
    highlightDistrict(key,true);
    syncMinimap(key);
    sectorReadout.textContent=portfolioSections[key].cityName;
    if(!coarsePointer && window.innerWidth>720){
      const x=Math.max(330,window.innerWidth-560),y=Math.max(120,window.innerHeight-270);
      showDistrictHover(key,x,y);
    }
    if(audioCtx?.state==="running")playTourChime();
  }


  function stopGuidedTour(){
    if(!tourActive)return;
    tourActive=false;
    if(tourTimer){clearInterval(tourTimer);tourTimer=null}
    tourButton?.classList.remove("is-active");tourButton?.setAttribute("aria-pressed","false");
    if(tourButton)tourButton.textContent="GUIDED TOUR";
    syncMobileMenuUi();
  }

  function tourStep(){
    if(sectionModal.classList.contains("open")){stopGuidedTour();return}
    const key=tourOrder[tourIndex%tourOrder.length];tourIndex++;
    clearDistrictHover();
    focusDistrict(key,1.08);
    syncMinimap(key);
    highlightDistrict(key,true);activeHoverKey=key;
    const data=portfolioSections[key];
    hoverIndex.textContent=data.cityIndex;if(hoverGlyph)hoverGlyph.textContent=districtGlyphs[key]||"◈";hoverTitle.textContent=data.cityName;hoverDescription.textContent=data.cityDescription;
    districtHoverCard.style.setProperty("--hover-accent",`#${new THREE.Color(getDistrictConfig(key)?.accent||COLORS.accent).getHexString()}`);
    districtHoverCard.style.left="50%";districtHoverCard.style.top="96px";districtHoverCard.style.transform="translateX(-50%)";
    districtHoverCard.classList.add("visible");districtHoverCard.setAttribute("aria-hidden","false");
    document.querySelector(`.section-sidebar-item[data-open-section="${key}"]`)?.classList.add("is-map-hover");
    playTourChime();
  }

  async function startGuidedTour(){
    if(tourActive){stopGuidedTour();return}
    await ensureAudio();
    tourActive=true;tourIndex=0;
    tourButton?.classList.add("is-active");tourButton?.setAttribute("aria-pressed","true");
    if(tourButton)tourButton.textContent="STOP TOUR";
    syncMobileMenuUi();
    tourStep();tourTimer=setInterval(tourStep,3600);
  }

  const portfolioSections = {
    projects: {
      cityIndex: "DISTRICT 01",
      cityName: "PROJECT DISTRICT",
      cityDescription: "Games • AI • VR • Simulation",
      panelTitle: "PROJECT ARCHIVE",
      panelSubtitle: "Gameplay systems, intelligent agents and immersive simulation",
      type: "showcase",
      items: [
        {
          kicker: "PROJECT 01 // GAME AI",
          title: "Human in the Loop RL for Minecraft",
          description: "Built a reinforcement-learning agent in Project Malmo using a DQN, replay memory, a target network and epsilon-greedy exploration, then extended the environment for human-in-the-loop and imitation-learning experiments.",
          media: "./images/minecraft.png",
          mediaAlt: "Minecraft reinforcement learning project",
          meta: [
            ["WHAT I BUILT", "DQN game agent with replay memory, target network and epsilon-greedy exploration."],
            ["RESEARCH USE", "Human-in-the-loop and imitation-learning experiments."],
            ["ENVIRONMENT", "Microsoft Project Malmo / Minecraft."]
          ],
          tags: ["Python","DQN","Reinforcement Learning","Project Malmo","Imitation Learning"],
          link: "https://github.com/Gamedog0319/ImitationLearning",
          linkLabel: "OPEN GITHUB ↗"
        },
        {
          kicker: "PROJECT 02 // VR + AI",
          title: "VR Neck Exoskeleton",
          description: "Built the Unity-side adaptive assistance runtime for a wearable VR neck-exoskeleton prototype, connecting immersive interaction, experiment logging and online bandit-based controller selection.",
          media: "./images/vr-neck.png",
          mediaAlt: "VR neck exoskeleton",
          meta: [
            ["WHAT I BUILT", "Unity runtime connecting wearable hardware, adaptive assistance and experiment logging."],
            ["AI SYSTEM", "Contextual and non-contextual bandit controller selection."],
            ["FOCUS", "Personalized VR assistance and human-centered adaptive control."]
          ],
          tags: ["Unity","VR","Bandits","Adaptive Systems","Hardware"],
          link: "https://github.com/aria-lab-code/vr-exoskeleton/tree/master/vr_exoskeleton",
          linkLabel: "OPEN PROJECT ↗"
        },
        {
          kicker: "PROJECT 03 // VR",
          title: "Indonesian VR History Shop Sim",
          description: "Built a standalone VR history-shop experience in Unity with interactive artifacts, environment-driven storytelling and interaction systems designed around immersive exploration.",
          media: "./images/shopsim.jpg",
          mediaAlt: "VR history shop simulation",
          meta: [["ENGINE","Unity"],["FOCUS","Immersive interaction and virtual artifact exploration."],["PLATFORM","Standalone VR."]],
          tags: ["Unity","VR","Interaction","Simulation"],
          link: "https://github.com/Gamedog0319/ShopSim",
          linkLabel: "OPEN GITHUB ↗"
        },
        {
          kicker: "PROJECT 04 // GAMEPLAY",
          title: "Pompeii",
          description: "Implemented core FPS gameplay systems in Unreal Engine, including weapons, damage handling, animation setup and moment-to-moment interaction logic for a game-jam project.",
          media: "./images/pompeii.jpg",
          mediaAlt: "Pompeii Unreal Engine project",
          meta: [["ENGINE","Unreal Engine"],["SYSTEMS","FPS weapons, damage, animation and gameplay logic."],["TYPE","Game jam / gameplay programming project."]],
          tags: ["Unreal Engine","Blueprints","Gameplay","Animation","FPS"],
          link: "https://github.com/Gamedogstudios/Pompeii",
          linkLabel: "OPEN GITHUB ↗"
        },
        {
          kicker: "PROJECT 05 // COMPUTER VISION",
          title: "Howzzat!",
          description: "Built a Unity cricket simulation that maps computer-vision gesture input to batting, with custom stadium assets and physics-driven ball behavior.",
          media: "./images/Howzzatt.jpg",
          mediaAlt: "Howzzat cricket simulator",
          meta: [["ENGINE","Unity"],["INPUT","Computer-vision gesture recognition."],["GAMEPLAY","Physics-based cricket batting and ball simulation."]],
          tags: ["Unity","Computer Vision","Physics","Blender","Gameplay"],
          link: "https://github.com/Gamedog0319/Howzzat",
          linkLabel: "OPEN GITHUB ↗"
        },
        {
          kicker: "PROJECT 06 // MIXED REALITY",
          title: "VR / AR Molecular Simulation",
          description: "Built an interactive Unity VR/AR molecular-visualization system for research workflows, including real-time manipulation and nanoparticle-orientation exploration.",
          media: "./images/molecular-sim.jpg",
          mediaAlt: "VR AR molecular simulation",
          meta: [["ENGINE","Unity"],["DOMAIN","Scientific visualization and mixed reality."],["INTERACTION","Real-time molecular manipulation and orientation exploration."]],
          tags: ["Unity","VR","AR","Scientific Visualization","Simulation"],
          link: "https://github.com/Gamedog0319/VR-AR-For-Molecular-Simulation",
          linkLabel: "OPEN GITHUB ↗"
        }
      ]
    },

    featured: {
      cityIndex: "DISTRICT 02",
      cityName: "INNOVATION CENTER",
      cityDescription: "Featured systems • Case studies",
      panelTitle: "INNOVATION ARCHIVE",
      panelSubtitle: "Three systems that best represent my current work",
      type: "showcase",
      items: [
        {
          kicker: "FEATURED 01 // ADAPTIVE VR",
          title: "VR Neck Exoskeleton",
          description: "Built and prototyped a wearable VR neck-exoskeleton system with adaptive controller personalization, connecting Unity, physical hardware and online bandit learning.",
          media: "./images/vr-neck.png",
          mediaAlt: "VR neck exoskeleton",
          meta: [["PROBLEM","Support VR comfort and posture using adaptive rather than fixed assistance."],["SYSTEM","Wearable hardware, Unity runtime and online controller selection."],["FOCUS","Human-centered adaptive control."]],
          tags: ["VR","Unity","Bandits","Adaptive Control","Hardware"],
          link: "https://github.com/aria-lab-code/vr-exoskeleton/tree/master/vr_exoskeleton",
          linkLabel: "VIEW PROJECT ↗"
        },
        {
          kicker: "FEATURED 02 // GAME AI",
          title: "DQN Assistive Agent",
          description: "Built an assistive DQN agent in Project Malmo for navigation and resource-collection tasks, using replay memory, a target network and epsilon-greedy exploration.",
          media: "./images/minecraft.png",
          mediaAlt: "Minecraft reinforcement learning agent",
          meta: [["PROBLEM","Create a reliable game agent capable of supporting player tasks."],["SYSTEM","DQN, replay memory and epsilon-greedy exploration."],["ENVIRONMENT","Minecraft via Microsoft Project Malmo."]],
          tags: ["Game AI","DQN","Malmo","Python","Human in the Loop"],
          link: "https://github.com/Gamedog0319/ImitationLearning",
          linkLabel: "VIEW PROJECT ↗"
        },
        {
          kicker: "FEATURED 03 // UNREAL AI",
          title: "Unreal Learning Agents",
          description: "Developed and integrated Unreal Engine AI systems for simulation environments, working with Learning Agents, AI perception, pathfinding and behavior logic at Zen Technologies.",
          media: "./images/unreal.png",
          mediaAlt: "Unreal Engine Learning Agents",
          meta: [["PROBLEM","Develop adaptive NPC behavior for simulation-driven scenes."],["SYSTEM","Learning Agents, AI perception, pathfinding and behavior trees."],["ENGINE","Unreal Engine 5.3 / 5.4."]],
          tags: ["Unreal","Learning Agents","NPC AI","Behavior Trees","Simulation"],
          link: "https://github.com/Gamedog0319/RLAgentDrivers-Unreal",
          linkLabel: "VIEW PROJECT ↗"
        }
      ]
    },

    experience: {
      cityIndex: "DISTRICT 03",
      cityName: "EXPERIENCE TOWERS",
      cityDescription: "Career • Research • Development",
      panelTitle: "CAREER TIMELINE",
      panelSubtitle: "Research, prototyping and intelligent systems development",
      type: "experience",
      items: [
        {
          year:"2025", period:"Aug 2025 — Present", company:"UNIVERSITY OF UTAH", title:"Research Assistant",
          description:"Research and development focused on adaptive VR systems, intelligent agents and human-in-the-loop learning.",
          points:["Designed and prototyped a wearable VR neck exoskeleton.","Implemented bandit-based controller-personalization experiments.","Built reinforcement-learning agents in Project Malmo.","Developed experimental pipelines for evaluating adaptive controllers."],
          tags:["Unity","VR","Python","Reinforcement Learning","Research"]
        },
        {
          year:"2024", period:"Aug 2024 — Jun 2025", company:"ZEN TECHNOLOGIES", title:"Game Developer Intern",
          description:"Worked on Unreal Engine AI systems and simulation-oriented gameplay environments.",
          points:["Trained and deployed ML agents using Unreal Learning Agents.","Integrated perception, pathfinding and behavior-tree systems.","Worked with Unreal Engine 5.3 and 5.4.","Improved runtime performance in the target simulation scene."],
          tags:["Unreal Engine","Learning Agents","Game AI","Behavior Trees","Simulation"]
        },
        {
          year:"2024", period:"May 2024 — Jun 2025", company:"ADVANCED ACADEMIC CENTER", title:"Teaching Assistant",
          description:"Taught Unity and C# fundamentals and created practical learning material for aspiring game developers.",
          points:["Taught game-development fundamentals using Unity.","Mentored students in C# gameplay programming.","Created practical game-development learning material.","Authored a guidebook for building immersive Unity projects."],
          tags:["Unity","C#","Teaching","Game Development"]
        },
        {
          year:"2024", period:"Apr 2024 — Jun 2024", company:"IIT GANDHINAGAR", title:"Summer Research Intern",
          description:"Developed an interactive VR/AR molecular-simulation platform for nanoparticle-orientation research and education.",
          points:["Created a Unity mixed-reality visualization environment.","Implemented real-time molecular manipulation.","Worked on nanoparticle orientation visualization.","Designed the system for research and educational workflows."],
          tags:["Unity","VR","AR","Simulation","Research"]
        }
      ]
    },

    education: {
      cityIndex:"DISTRICT 04",
      cityName:"UNIVERSITY CAMPUS",
      cityDescription:"Academic systems • Game engineering",
      panelTitle:"ACADEMIC RECORD",
      panelSubtitle:"Game engineering, AI and interactive systems",
      type:"education",
      items:[
        {
          code:"ACADEMIC FILE // 001", symbol:"U", kicker:"CURRENT PROGRAM",
          title:"Master of Entertainment Arts and Engineering",
          description:"Game Engineering at the University of Utah.",
          meta:[["INSTITUTION","University of Utah"],["PERIOD","August 2025 — Present"],["GPA","4.0 / 4.0"],["FOCUS","Game engineering, gameplay programming, machine learning and interactive systems."]]
        },
        {
          code:"ACADEMIC FILE // 002", symbol:"AI", kicker:"UNDERGRADUATE",
          title:"B.Tech in Computer Science and Engineering",
          description:"Undergraduate program specializing in Artificial Intelligence and Machine Learning.",
          meta:[["PROGRAM","Computer Science and Engineering — AIML"],["PERIOD","2021 — 2025"],["DOMAIN","Artificial Intelligence and Machine Learning"]]
        },
        {
          code:"ACADEMIC FILE // 003", symbol:"∞", kicker:"CORE AREAS",
          title:"Academic Focus",
          description:"The areas connecting my academic work to the games and interactive systems I build.",
          meta:[["01","Game Engineering"],["02","Machine Learning"],["03","Interactive Systems"],["04","Simulation and AI"]]
        }
      ]
    },

    skills: {
      cityIndex:"DISTRICT 05",
      cityName:"TECH FOUNDRY",
      cityDescription:"Languages • Engines • Game AI",
      panelTitle:"SYSTEM MODULES",
      panelSubtitle:"Technology used to build intelligent interactive systems",
      type:"skills",
      items:[
        {symbol:"{ }",kicker:"MODULE 01",title:"Languages",description:"Programming languages used across gameplay systems, AI research, simulation and web development.",skills:["C++","C#","Python","Java","HTML","CSS"],usedIn:["Unreal gameplay and AI systems","Unity VR applications","Reinforcement-learning research","Interactive web systems"]},
        {symbol:"3D",kicker:"MODULE 02",title:"Engines & Tools",description:"Primary environments used to build, test and ship game and simulation systems.",skills:["Unity","Unreal Engine","Blender","Arduino","Jupyter"],usedIn:["VR Neck Exoskeleton","Unreal Learning Agents","Howzzat!","ShopSim","Molecular Simulation"]},
        {symbol:"AI",kicker:"MODULE 03",title:"Game AI / Machine Learning",description:"Learning and decision-making systems used to create adaptive agents and player-facing intelligence.",skills:["Reinforcement Learning","Deep Q Networks","Multi-Armed Bandits","Imitation Learning","Behavior Trees","AI Perception"],usedIn:["Minecraft assistive agents","VR controller personalization","Unreal adaptive NPCs","Game AI research"]},
        {symbol:"XR",kicker:"MODULE 04",title:"VR / Simulation",description:"Interactive and hardware-linked technology for immersive simulation environments.",skills:["Virtual Reality","Mixed Reality","Simulation","Hardware Integration","Interaction Design"],usedIn:["VR Neck Exoskeleton","History Shop Sim","Molecular VR / AR Simulation"]}
      ]
    },

    research: {
      cityIndex:"DISTRICT 06",
      cityName:"RESEARCH COMPLEX",
      cityDescription:"Game AI • Reinforcement Learning",
      panelTitle:"RESEARCH DATABASE",
      panelSubtitle:"Publications and research-oriented work",
      type:"research",
      items:[
        {number:"01",kicker:"RESEARCH FILE 001",title:"Evaluating Deep Q Networks Based Agents in Game Environments",description:"Research exploring Deep Q Network based reinforcement-learning agents in game environments.",citation:"RamKumar, M. & Rithvik, M. (2024). Reinforcement learning for Flappy Bird.",tags:["DQN","Reinforcement Learning","Game AI"]},
        {number:"02",kicker:"RESEARCH FILE 002",title:"Optimizing Lunar Lander Performance Using Dueling Deep Q Networks",description:"Research focused on improving Lunar Lander reinforcement-learning performance using a Dueling DQN architecture.",citation:"Poornima, S. & Rithvik, M. (2023).",tags:["Dueling DQN","Deep Reinforcement Learning","Lunar Lander"]},
        {number:"03",kicker:"RESEARCH FILE 003",title:"Reinforcement Learning for Autonomous Agents in Unreal Engine",description:"Research examining reinforcement-learning approaches for autonomous agents inside Unreal Engine environments.",citation:"Rajini, P. & Rithvik, M. (2024). International Conference on Innovative Emerging Technologies, ICIET 2025.",tags:["Unreal Engine","Autonomous Agents","Reinforcement Learning"]}
      ]
    },

    about: {
      cityIndex:"DISTRICT 07",
      cityName:"RITHVIK HQ",
      cityDescription:"Identity • Mission • Current work",
      panelTitle:"PERSONNEL FILE",
      panelSubtitle:"Rithvik Mandya // Gameplay • Game AI • VR",
      type:"about",
      items:[
        {symbol:"RM",kicker:"IDENTITY // RM-0319",title:"Rithvik Mandya",description:"Gameplay programmer focused on building intelligent systems where AI is part of the player experience rather than something layered on top.",meta:[["LOCATION","Salt Lake City, Utah"],["FOCUS","Gameplay Programming, Game AI, VR and Simulation"],["CURRENT","Master of Entertainment Arts and Engineering — Game Engineering, University of Utah"]],tags:["Gameplay Programmer","Game AI","VR","Simulation"]},
        {symbol:"AI",kicker:"CURRENT MISSION",title:"Intelligence Designed Into Play",description:"My work sits at the intersection of gameplay feel, autonomous behavior and immersive simulation. I am particularly interested in systems where intelligent behavior meaningfully changes how the player experiences the game.",meta:[["01","Gameplay systems and player-facing mechanics"],["02","Reinforcement learning and adaptive behavior"],["03","VR interaction and hardware-linked systems"],["04","Simulation environments for intelligent agents"]]},
        {symbol:"↗",kicker:"ACTIVE RESEARCH",title:"Currently Exploring",description:"Areas I am actively pushing through research and project development.",meta:[["01","Human-in-the-loop training"],["02","Adaptive VR control systems"],["03","Agentic gameplay behaviors"]]}
      ]
    },

    contact: {
      cityIndex:"DISTRICT 08",
      cityName:"COMMS ARRAY",
      cityDescription:"Email • LinkedIn • GitHub",
      panelTitle:"COMMUNICATION ARRAY",
      panelSubtitle:"Establish a connection",
      type:"contact",
      items:[
        {icon:"@",kicker:"CHANNEL 01 // EMAIL",title:"Email",description:"For roles, research collaborations, game-development work or an interesting conversation.",value:"rithvikmandya@gmail.com",link:"mailto:rithvikmandya@gmail.com",button:"SEND EMAIL →"},
        {icon:"in",kicker:"CHANNEL 02 // LINKEDIN",title:"LinkedIn",description:"Professional profile, work history and networking.",value:"Rithvik Mandya",link:"https://www.linkedin.com/in/rithvik-mandya-49a59222b/",button:"OPEN LINKEDIN ↗"},
        {icon:"git",kicker:"CHANNEL 03 // GITHUB",title:"GitHub",description:"Source code, experiments and game-development projects.",value:"Gamedog0319",link:"https://github.com/Gamedog0319",button:"OPEN GITHUB ↗"},
        {icon:"CV",kicker:"CHANNEL 04 // PERSONNEL FILE",title:"Resume",description:"Current resume covering game development, research, AI and VR work.",value:"Rithvik Mandya — Resume",link:"https://drive.google.com/file/d/1Sr2o9YOB9zykX7TD470YEVzy2giZCKKL/view?usp=sharing",button:"OPEN RESUME ↗"}
      ]
    }
  };

  const homeViewButton = $("homeViewButton");
  const cameraReadout = $("cameraReadout");

  /* =========================================================
     DAYLIGHT CITY / PERFORMANCE CONFIG
  ========================================================= */

  const projectExtras = {
    "Human in the Loop RL for Minecraft": {
      replay:["Observe the Minecraft state","Encode the current observation","DQN selects an action","Execute action through Project Malmo","Store transition in replay memory","Sample replay and update the network"],
      blueprint:["Minecraft / Malmo","Observation","DQN Policy","Action","Reward","Replay Buffer","Training Update"],
      evidence:[
        ["AI","AGENT BUILT","DQN with replay memory and a target network"],
        ["HL","HUMAN LOOP","Environment extended for human-guided learning experiments"],
        ["EX","EXPLORATION","Epsilon-greedy action selection"]
      ]
    },
    "DQN Assistive Agent": {
      replay:["Observe the Minecraft state","Encode the current observation","DQN selects an action","Execute action through Project Malmo","Store transition in replay memory","Sample replay and update the network"],
      blueprint:["Minecraft / Malmo","Observation","DQN Policy","Action","Reward","Replay Buffer","Training Update"],
      evidence:[
        ["AI","AGENT BUILT","Deep Q-learning decision system"],
        ["RB","REPLAY BUFFER","Experience replay used during learning"],
        ["TG","TARGET NETWORK","Separate target network for DQN updates"]
      ]
    },
    "VR Neck Exoskeleton": {
      replay:["Read VR and user context","Build the controller context vector","Bandit scores available controllers","Select an assistance policy","Apply assistance through the Unity runtime","Log interaction and experimental outcome"],
      blueprint:["VR User","Unity Runtime","Context Vector","Bandit Selector","Assistance Controller","Wearable Hardware","Experiment Log"],
      evidence:[
        ["XR","HARDWARE LINKED","Unity runtime connected to wearable VR assistance"],
        ["AI","ONLINE LEARNING","Contextual and non-contextual bandit controller selection"],
        ["DX","EXPERIMENT PIPELINE","Interaction and controller outcomes logged for evaluation"]
      ]
    },
    "Unreal Learning Agents": {
      replay:["Sense the simulation environment","Update AI perception","Evaluate learning / behavior state","Request pathfinding when movement is needed","Execute the NPC action","Feed simulation state into the next decision"],
      blueprint:["Simulation World","AI Perception","Learning Agents","Behavior Logic","Navigation","NPC Action"],
      evidence:[
        ["UE","UNREAL AI","Learning Agents used in simulation-oriented environments"],
        ["AP","AI PERCEPTION","Perception integrated with NPC decision systems"],
        ["BT","BEHAVIOR SYSTEMS","Pathfinding and behavior-tree logic"]
      ]
    },
    "Indonesian VR History Shop Sim": {
      replay:["Player explores the VR shop","VR input targets an artifact","Interaction logic validates the action","Artifact state responds","Environmental feedback updates","Player continues the exploration loop"],
      blueprint:["VR Input","Unity Interaction","Artifact Logic","Object State","Environmental Feedback"],
      evidence:[
        ["VR","STANDALONE VR","Interactive experience designed for immersive exploration"],
        ["IN","INTERACTION","Artifact-focused interaction systems"],
        ["ES","ENVIRONMENT","Storytelling delivered through the virtual shop space"]
      ]
    },
    "Pompeii": {
      replay:["Player sends combat input","Weapon system processes the action","Hit / damage logic resolves","Animation state responds","Gameplay state is updated"],
      blueprint:["Player Input","Weapon System","Hit Detection","Damage Logic","Animation","Game State"],
      evidence:[
        ["UE","UNREAL","Gameplay implementation in Unreal Engine"],
        ["DM","DAMAGE SYSTEM","Weapon and damage handling"],
        ["AN","ANIMATION","Gameplay logic connected to animation setup"]
      ]
    },
    "Howzzat!": {
      replay:["Camera captures the batting gesture","Computer-vision layer recognizes the gesture","Gesture maps to game input","Bat interaction drives the physics response","Ball simulation updates the play"],
      blueprint:["Camera Input","Gesture Recognition","Input Mapping","Bat Controller","Physics","Ball State"],
      evidence:[
        ["CV","COMPUTER VISION","Gesture-driven batting input"],
        ["PH","PHYSICS","Physics-based bat and ball behavior"],
        ["3D","CUSTOM WORLD","Unity stadium experience with custom assets"]
      ]
    },
    "VR / AR Molecular Simulation": {
      replay:["User targets a molecular object","VR / AR input selects the object","Interaction system applies manipulation","Molecular orientation updates","Visualization refreshes for the research task"],
      blueprint:["XR Input","Object Selection","Unity Interaction","Molecular Model","Transform / Orientation","Research Visualization"],
      evidence:[
        ["XR","MIXED REALITY","VR / AR scientific visualization workflow"],
        ["3D","MANIPULATION","Real-time molecular interaction"],
        ["RS","RESEARCH TOOL","Nanoparticle-orientation exploration"]
      ]
    }
  };

  function getProjectExtras(title){
    return projectExtras[title] || {
      replay:["Input enters the system","Runtime processes the state","Core logic selects a response","The result updates the experience"],
      blueprint:["Input","Runtime","Core System","Output"],
      evidence:[["SYS","SYSTEM BUILT","Project-specific interactive system"],["DEV","IMPLEMENTED","Gameplay / simulation logic"],["OUT","OUTPUT","Working interactive result"]]
    };
  }

  const COLORS = {
    accent: 0xff5f57,
    accentSoft: 0xff8b7d,
    sky: 0x9fd1ff,
    fog: 0xdff0fb,
    grass: 0x8ac26c,
    grassDark: 0x679954,
    road: 0x474d58,
    roadLine: 0xffecb2,
    sidewalk: 0xd9d4ca,
    concrete: 0xd4d8df,
    concreteDark: 0x818c98,
    glass: 0x7fbfcb,
    roof: 0x6d7681,
    tree: 0x5f914e,
    treeDark: 0x47783c,
    trunk: 0x78583d,
    white: 0xf7f6f0
  };

  const districtConfigs = [
    {key:"projects",x:0,z:0,width:21,depth:16,accent:COLORS.accent},
    {key:"featured",x:-24,z:-1,width:17,depth:15,accent:0xff7f7f},
    {key:"experience",x:24,z:-1,width:17,depth:16,accent:0x57bde3},
    {key:"education",x:0,z:21,width:20,depth:14,accent:0x7fa5ff},
    {key:"research",x:-24,z:21,width:17,depth:14,accent:0xb38cff},
    {key:"skills",x:24,z:21,width:17,depth:14,accent:0x50d5a4},
    {key:"about",x:-14,z:-21,width:19,depth:14,accent:COLORS.accent},
    {key:"contact",x:14,z:-21,width:19,depth:14,accent:0xffa35f}
  ];

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches || (navigator.maxTouchPoints || 0) > 0;
  const mobileViewport = window.matchMedia("(max-width: 820px)").matches;
  const tabletViewport = coarsePointer && window.matchMedia("(max-width: 1024px)").matches;
  const mobile = mobileViewport || tabletViewport;
  const cpuCores = navigator.hardwareConcurrency || 8;
  const deviceMemory = navigator.deviceMemory || 8;
  const saveData = !!navigator.connection?.saveData;
  const lowCpu = cpuCores <= 4 || deviceMemory <= 4 || saveData;
  const veryLowEnd = cpuCores <= 2 || deviceMemory <= 2 || (saveData && cpuCores <= 4);
  const largeMobile = mobile && Math.min(window.innerWidth,window.innerHeight) >= 600;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.classList.toggle("touch-mode", coarsePointer);
  document.body.classList.toggle("mobile-mode", mobile);

  const PERF = {
    pixelRatio: Math.min(window.devicePixelRatio || 1, mobile ? (veryLowEnd ? .72 : largeMobile ? 1.0 : .90) : lowCpu ? 1.16 : 1.35),
    minPixelRatio: mobile ? (veryLowEnd ? .56 : .62) : .95,
    antialias: !mobile && !lowCpu,
    shadows: !mobile && !lowCpu,
    shadowMap: lowCpu ? 512 : 1024,
    people: reducedMotion ? 4 : mobile ? (veryLowEnd ? 5 : largeMobile ? 10 : 8) : lowCpu ? 16 : 28,
    movingCars: reducedMotion ? 3 : mobile ? (veryLowEnd ? 3 : largeMobile ? 6 : 5) : lowCpu ? 9 : 14,
    parkedCars: mobile ? (largeMobile ? 6 : 5) : 12,
    trees: mobile ? (veryLowEnd ? 18 : largeMobile ? 30 : 26) : lowCpu ? 44 : 62,
    lamps: mobile ? (largeMobile ? 20 : 17) : 42,
    benches: mobile ? 4 : 13,
    birds: reducedMotion ? 0 : mobile ? 1 : 6,
    clouds: mobile ? 1 : lowCpu ? 3 : 5,
    targetFps: mobile ? (veryLowEnd ? 30 : 40) : 60,
    animate: !reducedMotion
  };

  if(controlHintText){
    controlHintText.textContent = coarsePointer
      ? "Drag to move • pinch to zoom • tap any district to open."
      : "Explore the city • or use QUICK VIEW for a 30-second recruiter overview.";
  }

  let scene, camera, renderer, raycaster, sunLight, hemiLight, ambientLight, sunDisc;
  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const interactiveDistricts = [];
  const districtVisuals = new Map();
  const animatedElements = [];

  let activeHoverKey = null;
  let currentSectionKey = null;
  let currentItemIndex = 0;
  let worldEntered = false;
  let pageVisible = true;
  let raycastDirty = false;
  let latestPointerX = window.innerWidth * .5;
  let latestPointerY = window.innerHeight * .5;

  let cameraZoomTarget = 1;
  let cameraZoom = 1;
  const cameraPan = new THREE.Vector2(0,0);
  const cameraPanTarget = new THREE.Vector2(0,0);
  const baseCamera = new THREE.Vector3(48,72,52);
  const dragPlane = new THREE.Plane(new THREE.Vector3(0,1,0),0);
  const dragStartWorld = new THREE.Vector3();
  const dragCurrentWorld = new THREE.Vector3();
  const dragPanStart = new THREE.Vector2();
  let dragPointerId = null;
  let dragStartScreenX = 0;
  let dragStartScreenY = 0;
  let dragMoved = false;
  let pointerOverUi = false;

  const activeTouchPointers = new Map();
  let pinching = false;
  let pinchStartDistance = 0;
  let pinchStartZoom = 1;

  let renderPixelRatio = PERF.pixelRatio;
  let lastRenderStamp = 0;
  let perfWindowStart = performance.now();
  let perfFrames = 0;

  const cameraRight = new THREE.Vector3();
  const cameraForward = new THREE.Vector3();
  const EDGE_ZONE = coarsePointer ? 0 : mobile ? .12 : .19;

  const shared = {};
  const glassMaterials = [];
  const movingCars = [];
  const parkedCars = [];
  const pedestrians = [];
  const ambientActors = [];
  const matrixDummy = new THREE.Object3D();

  let carBodyMesh, carCabinMesh, parkedBodyMesh, parkedCabinMesh;
  let personBodyMesh, personHeadMesh;

  function clampPan(){
    cameraPanTarget.x = THREE.MathUtils.clamp(cameraPanTarget.x,-15,15);
    cameraPanTarget.y = THREE.MathUtils.clamp(cameraPanTarget.y,-10,10);
  }

  function makeSharedAssets(){
    shared.building = new THREE.MeshStandardMaterial({color:COLORS.concrete,roughness:.68,metalness:.08});
    shared.buildingWarm = new THREE.MeshStandardMaterial({color:0xd9d4c8,roughness:.72,metalness:.05});
    shared.buildingDark = new THREE.MeshStandardMaterial({color:COLORS.concreteDark,roughness:.6,metalness:.16});
    shared.glass = new THREE.MeshStandardMaterial({color:COLORS.glass,roughness:.18,metalness:.22,transparent:true,opacity:.84});
    glassMaterials.push(shared.glass);
    shared.roof = new THREE.MeshStandardMaterial({color:COLORS.roof,roughness:.55,metalness:.25});
    shared.sidewalk = new THREE.MeshStandardMaterial({color:COLORS.sidewalk,roughness:.96,metalness:.01});
    shared.road = new THREE.MeshStandardMaterial({color:COLORS.road,roughness:.94,metalness:.03});
    shared.grass = new THREE.MeshLambertMaterial({color:COLORS.grass});
    shared.grassDark = new THREE.MeshLambertMaterial({color:COLORS.grassDark});
    shared.tree = new THREE.MeshLambertMaterial({color:COLORS.tree,vertexColors:true});
    shared.trunk = new THREE.MeshLambertMaterial({color:COLORS.trunk});
    shared.dark = new THREE.MeshLambertMaterial({color:0x3f4548});
    shared.skin = new THREE.MeshLambertMaterial({color:0xd9ad86});
    shared.person = new THREE.MeshLambertMaterial({color:0xffffff,vertexColors:true});
    shared.car = new THREE.MeshStandardMaterial({color:0xffffff,roughness:.36,metalness:.48,vertexColors:true});
    shared.carGlass = new THREE.MeshStandardMaterial({color:0x658897,roughness:.15,metalness:.25,transparent:true,opacity:.88});
    shared.solar = new THREE.MeshStandardMaterial({color:0x315b6c,roughness:.22,metalness:.4});
    shared.wood = new THREE.MeshLambertMaterial({color:0x8b6a4e});
    shared.metal = new THREE.MeshStandardMaterial({color:0x737b7f,roughness:.43,metalness:.55});
    shared.water = new THREE.MeshStandardMaterial({color:0x6cc8e4,transparent:true,opacity:.7,roughness:.12,metalness:.05});
  }

  function initWorld(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.sky);
    scene.fog = new THREE.Fog(COLORS.fog,78,156);

    camera = new THREE.OrthographicCamera(-50,50,40,-40,.1,300);
    camera.position.copy(baseCamera);
    camera.lookAt(0,0,0);

    renderer = new THREE.WebGLRenderer({
      antialias:PERF.antialias,
      alpha:false,
      powerPreference: mobile ? "default" : "high-performance"
    });
    renderer.setPixelRatio(PERF.pixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.shadowMap.enabled = PERF.shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    threeContainer.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    makeSharedAssets();
    addDayLighting();
    createTerrain();
    createRoadNetwork();
    createDistricts();
    createGreenery();
    createStreetFurniture();
    createTraffic();
    createPedestrians();
    createAmbientLife();
    createPublicSpaces();
    createEnvironmentDesign();
    if(telemetryReadout) telemetryReadout.textContent=`${PERF.people} PEOPLE • ${PERF.movingCars + PERF.parkedCars} VEHICLES`;
    applyTimeMode("day",false);
    updateExploredUi();
    resizeRenderer();
    animate();
  }

  /* =========================================================
     LIGHT / SUN / SKY
  ========================================================= */

  function addDayLighting(){
    hemiLight = new THREE.HemisphereLight(0xf5fbff,0x769162,1.75);
    scene.add(hemiLight);
    ambientLight = new THREE.AmbientLight(0xffffff,.34);
    scene.add(ambientLight);

    sunLight = new THREE.DirectionalLight(0xffedc0,3.15);
    sunLight.position.set(-48,75,-28);
    sunLight.castShadow = PERF.shadows;
    if(PERF.shadows){
      sunLight.shadow.mapSize.set(PERF.shadowMap,PERF.shadowMap);
      sunLight.shadow.camera.left=-70;
      sunLight.shadow.camera.right=70;
      sunLight.shadow.camera.top=62;
      sunLight.shadow.camera.bottom=-62;
      sunLight.shadow.camera.near=5;
      sunLight.shadow.camera.far=170;
      sunLight.shadow.bias=-.0005;
      sunLight.shadow.normalBias=.025;
    }
    scene.add(sunLight);

    sunDisc = new THREE.Mesh(
      new THREE.SphereGeometry(4.5,14,10),
      new THREE.MeshBasicMaterial({color:0xfff0a7,fog:false})
    );
    sunDisc.position.set(-78,72,-105);
    scene.add(sunDisc);
  }

  function applyTimeMode(mode,withSound=true){
    document.body.classList.remove("time-day","time-night");
    document.body.classList.add(`time-${mode}`);
    if(!scene||!renderer)return;
    const presets={
      day:{sky:0x9fd1ff,fog:0xdff0fb,sun:0xffe4a1,sunI:3.25,hemiSky:0xf5fbff,hemiGround:0x7da26a,hemiI:1.78,ambient:0xffffff,ambientI:.36,exposure:1.04,sunPos:[-48,75,-28],disc:0xffefaa},
      night:{sky:0x0d1a2b,fog:0x22374f,sun:0x7fb0ff,sunI:.74,hemiSky:0x6385b3,hemiGround:0x1c3041,hemiI:.85,ambient:0x9ec0ff,ambientI:.27,exposure:.88,sunPos:[-45,62,-32],disc:0xdce9ff}
    };
    const p=presets[mode]||presets.day;
    scene.background.setHex(p.sky);scene.fog.color.setHex(p.fog);
    sunLight.color.setHex(p.sun);sunLight.intensity=p.sunI;sunLight.position.set(...p.sunPos);
    hemiLight.color.setHex(p.hemiSky);hemiLight.groundColor.setHex(p.hemiGround);hemiLight.intensity=p.hemiI;
    ambientLight.color.setHex(p.ambient);ambientLight.intensity=p.ambientI;
    renderer.toneMappingExposure=p.exposure;
    glassMaterials.forEach(mat=>{
      if(!mat.emissive)return;
      mat.emissive.setHex(mode==="night"?0x244e6b:0x000000);
      mat.emissiveIntensity=mode==="night"?.62:0;
      mat.needsUpdate=true;
    });
    if(sunDisc){sunDisc.material.color.setHex(p.disc);sunDisc.visible=mode!=="night";}
    if(timeModeButton)timeModeButton.textContent=`MODE: ${mode.toUpperCase()}`;
    if(hudStatusPrimary) hudStatusPrimary.textContent = mode==="night" ? "NIGHT MODE ONLINE" : "DAY MODE ONLINE";
    if(hudStatusSecondary) hudStatusSecondary.textContent = mode==="night" ? "CITY LIGHTS ACTIVE" : "CLEAR SKIES ACTIVE";
    if(cityStatus) cityStatus.textContent = mode==="night" ? "NIGHT CITY // LIGHTS AND AMBIENCE ACTIVE" : "DAY CITY // BRIGHT AND READABLE";
    syncMobileMenuUi();
    if(withSound){playTone(mode==="night"?340:690,mode==="night"?220:860,.12,.09,"sine");}
  }

  function cycleTimeMode(){
    timeModeIndex=(timeModeIndex+1)%timeModes.length;
    applyTimeMode(timeModes[timeModeIndex]);
  }

  function toggleCinematic(){
    cinematicMode=!cinematicMode;
    document.body.classList.toggle("cinematic-mode",cinematicMode);
    cinematicButton?.setAttribute("aria-pressed",cinematicMode?"true":"false");
    if(cinematicButton)cinematicButton.textContent=cinematicMode?"HUD ON":"CINEMATIC";
    syncMobileMenuUi();
    playClick();
  }

  /* =========================================================
     TERRAIN / ROADS / SIDEWALKS / CROSSWALKS
  ========================================================= */

  function createTerrain(){
    const outer = new THREE.Mesh(new THREE.PlaneGeometry(176,142),shared.grassDark);
    outer.rotation.x=-Math.PI/2;outer.position.y=-.07;scene.add(outer);

    const city = new THREE.Mesh(new THREE.BoxGeometry(104,.42,78),new THREE.MeshStandardMaterial({color:0xbcb9ae,roughness:.96}));
    city.position.y=-.23;city.receiveShadow=true;scene.add(city);

    const turf = new THREE.Mesh(new THREE.PlaneGeometry(101,74),shared.grass);
    turf.rotation.x=-Math.PI/2;turf.position.y=.001;turf.receiveShadow=true;scene.add(turf);
  }

  function createRoad(x,z,width,depth){
    const road = new THREE.Mesh(new THREE.PlaneGeometry(width,depth),shared.road);
    road.rotation.x=-Math.PI/2;road.position.set(x,.03,z);road.receiveShadow=true;scene.add(road);
  }

  function createFlatRect(x,z,w,d,material,y=.055){
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w,d),material);
    mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);mesh.receiveShadow=true;scene.add(mesh);return mesh;
  }

  function createRoadNetwork(){
    createRoad(0,0,9,82);
    createRoad(0,0,110,8);
    createRoad(-27,0,6,82);
    createRoad(27,0,6,82);
    createRoad(0,23,110,5);
    createRoad(0,-23,110,5);

    [
      [-5.6,0,1.4,82],[5.6,0,1.4,82],[-30.5,0,1.2,82],[-23.5,0,1.2,82],[23.5,0,1.2,82],[30.5,0,1.2,82],
      [0,-5.5,110,1.4],[0,5.5,110,1.4],[0,19.7,110,1.2],[0,26.3,110,1.2],[0,-19.7,110,1.2],[0,-26.3,110,1.2]
    ].forEach(([x,z,w,d])=>createFlatRect(x,z,w,d,shared.sidewalk,.055));

    const lineMat = new THREE.MeshBasicMaterial({color:COLORS.roadLine});
    for(let z=-37;z<=37;z+=5){createFlatRect(0,z,.12,2.15,lineMat,.072)}
    for(let x=-50;x<=50;x+=5){createFlatRect(x,0,2.15,.12,lineMat,.073)}

    const edgeMat = new THREE.MeshBasicMaterial({color:0xf1f1eb});
    [-4.15,4.15].forEach(x=>createFlatRect(x,0,.08,81,edgeMat,.071));
    [-3.65,3.65].forEach(z=>createFlatRect(0,z,109,.08,edgeMat,.071));

    [[0,-9,true],[0,9,true],[-10,0,false],[10,0,false],[-27,-9,true],[-27,9,true],[27,-9,true],[27,9,true]].forEach(c=>createCrosswalk(...c));
    createParkingMarkings();
  }

  function createCrosswalk(x,z,vertical){
    const mat = new THREE.MeshBasicMaterial({color:0xf9f7ed});
    for(let i=-3;i<=3;i++){
      const sx = vertical ? x+i*.72 : x;
      const sz = vertical ? z : z+i*.72;
      createFlatRect(sx,sz,vertical?.42:2.5,vertical?2.5:.42,mat,.081);
    }
  }

  function createParkingMarkings(){
    const mark = new THREE.MeshBasicMaterial({color:0xe9e8de,transparent:true,opacity:.88});
    const lots=[[-43,31,16,8],[42,31,16,8],[-43,-31,16,8],[42,-31,16,8]];
    lots.forEach(([x,z,w,d])=>{
      createFlatRect(x,z,w,d,new THREE.MeshStandardMaterial({color:0x7b7f81,roughness:.95}),.04);
      for(let i=-3;i<=3;i++)createFlatRect(x+i*2,z,.06,d*.82,mark,.082);
    });
  }

  /* =========================================================
     DISTRICTS / BUILDINGS
  ========================================================= */

  function createDistricts(){
    districtConfigs.forEach(config=>{
      const district = new THREE.Group();
      district.position.set(config.x,0,config.z);
      scene.add(district);

      const pad = new THREE.Mesh(
        new THREE.PlaneGeometry(config.width,config.depth),
        new THREE.MeshBasicMaterial({color:config.accent,transparent:true,opacity:.06,depthWrite:false})
      );
      pad.rotation.x=-Math.PI/2;pad.position.y=.09;district.add(pad);

      const pts=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx,sz])=>new THREE.Vector3(sx*config.width/2,.14,sz*config.depth/2));
      const border = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:config.accent,transparent:true,opacity:.28}));
      district.add(border);

      const hoverPlate = new THREE.Mesh(
        new THREE.PlaneGeometry(config.width * .96, config.depth * .96),
        new THREE.MeshBasicMaterial({color:config.accent,transparent:true,opacity:.02,depthWrite:false,side:THREE.DoubleSide})
      );
      hoverPlate.rotation.x=-Math.PI/2;hoverPlate.position.y=.115;district.add(hoverPlate);

      const hoverRing = new THREE.Mesh(
        new THREE.RingGeometry(Math.min(config.width,config.depth)*.18,Math.min(config.width,config.depth)*.25,32),
        new THREE.MeshBasicMaterial({color:config.accent,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide})
      );
      hoverRing.rotation.x=-Math.PI/2;hoverRing.position.y=.16;district.add(hoverRing);
      const districtGlow = new THREE.Mesh(
        new THREE.CircleGeometry(Math.max(config.width,config.depth)*.38,40),
        new THREE.MeshBasicMaterial({color:config.accent,transparent:true,opacity:.08,depthWrite:false,side:THREE.DoubleSide})
      );
      districtGlow.rotation.x=-Math.PI/2;districtGlow.position.y=.095;district.add(districtGlow);

      const hoverBeacon = new THREE.Group();
      const beaconBeam = new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,6.5,6),new THREE.MeshBasicMaterial({color:config.accent,transparent:true,opacity:0,depthWrite:false}));
      beaconBeam.position.y=17.6;hoverBeacon.add(beaconBeam);
      const beaconGem = new THREE.Mesh(new THREE.OctahedronGeometry(.58,0),new THREE.MeshBasicMaterial({color:config.accent,transparent:true,opacity:0,depthWrite:false}));
      beaconGem.position.y=21.2;hoverBeacon.add(beaconGem);
      const beaconHalo = new THREE.Mesh(new THREE.TorusGeometry(.95,.055,6,24),new THREE.MeshBasicMaterial({color:config.accent,transparent:true,opacity:0,depthWrite:false}));
      beaconHalo.rotation.x=Math.PI/2;beaconHalo.position.y=21.2;hoverBeacon.add(beaconHalo);
      district.add(hoverBeacon);

      const architecture = createDistrictArchitecture(config.key,config.accent);
      district.add(architecture);

      const hitbox = new THREE.Mesh(new THREE.BoxGeometry(config.width*(mobile?1.18:1.08),24,config.depth*(mobile?1.18:1.08)),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
      hitbox.position.y=12;hitbox.userData.section=config.key;district.add(hitbox);interactiveDistricts.push(hitbox);

      districtVisuals.set(config.key,{root:district,architecture,pad,border,hoverPlate,hoverRing,districtGlow,hoverBeacon,beaconBeam,beaconGem,beaconHalo,config,targetLift:0,targetScale:1});
    });
  }

  function createDistrictArchitecture(key,accent){
    const g = new THREE.Group();

    // Every district has a visibly different architectural language.  The
    // rooftop signs are intentionally large enough to remain readable from
    // the default tactical camera.
    if(key==="projects"){
      g.add(createTwistTower({x:0,z:0,w:6.3,d:6.3,h:17.5,accent,label:"PROJECT HUB",colors:[0xd9e2e6,0xb9cbd2,0x7897a5]}));
      g.add(createSawtoothFactory({x:-7.2,z:-4.7,w:5.2,d:4.6,h:5.4,accent:0xe36e52,label:"AI LAB",color:0xd9cfc3}));
      g.add(createHexTower({x:7.1,z:-4.8,r:2.35,h:10.8,accent:0x4b91b3,label:"VR BAY",color:0xc9dbe3}));
      g.add(createCantileverBuilding({x:-7.2,z:5,w:5.1,d:4.1,h:9.4,accent:0xc58c48,label:"SIM HUB",color:0xe0d5c4}));
      g.add(createBuilding({x:7.1,z:5,w:4.5,d:4.5,h:7.7,accent:0x7c7bd1,style:"cylinder",label:"GAME DEV",baseColor:0xd4d8e4,glassColor:0x8eb9ce}));
      g.add(createFrameTower({x:0,z:6.2,w:5,d:3.6,h:8.5,accent:0x54a682,label:"PLAY TEST",color:0xd7dfd9}));
      addRooftopGarden(g,0,0,17.8,5.4,5.4);
    }

    if(key==="featured"){
      g.add(createPrismGallery({x:-4.5,z:.2,r:3.7,h:10.8,accent:0xd65e73,label:"FEATURED",color:0xeadde0}));
      g.add(createCantileverBuilding({x:4.8,z:-3.7,w:4.9,d:4.6,h:8.1,accent:0xd88954,label:"VR CASE",color:0xe1d7c8}));
      g.add(createHexTower({x:4.9,z:4.1,r:2.2,h:8.4,accent:0x5f99c3,label:"AI CASE",color:0xd6e0e7}));
      const bridge=new THREE.Mesh(new THREE.BoxGeometry(7.6,.34,1.0),makeGlassMaterial(0x93c3d6,.76));bridge.position.set(.1,4.6,.1);bridge.rotation.y=-.08;g.add(bridge);
      g.add(createSignboard("INNOVATION CENTER",{x:-.5,y:12.2,z:1.5,width:5.7,height:1.0,color:accent}));
    }

    if(key==="experience"){
      g.add(createFrameTower({x:-5.1,z:-4.1,w:4.7,d:4.7,h:16.5,accent:0x4e8fac,label:"U OF U",color:0xd3dde3}));
      g.add(createTwistTower({x:4.8,z:-4.1,w:4.5,d:4.5,h:13.2,accent:0xd26e57,label:"ZEN",colors:[0xe2d5cd,0xc6d0d5,0x8da7b4]}));
      g.add(createHexTower({x:-4.1,z:4.5,r:2.2,h:10.7,accent:0x7c9b63,label:"AAC",color:0xd7dfd0}));
      g.add(createCantileverBuilding({x:4.7,z:4.6,w:5.2,d:5.0,h:18.4,accent:0x7767b0,label:"IIT",color:0xdad7e4}));
    }

    if(key==="education"){
      g.add(createCampusHall({x:0,z:1,w:10.5,d:6.4,h:5.5,accent:0xb34448,label:"UNIVERSITY",color:0xe7dfd2}));
      g.add(createBuilding({x:-6.5,z:-4,w:4.5,d:4.4,h:4.1,accent:0x5c7eb0,style:"slab",label:"MEAE",baseColor:0xd7dee8,glassColor:0x92b5ca}));
      g.add(createPrismGallery({x:6.4,z:-4,r:2.35,h:4.7,accent:0xd29348,label:"AI / ML",color:0xe5d7bd}));
      const dome=new THREE.Mesh(new THREE.SphereGeometry(2.18,16,9,0,Math.PI*2,0,Math.PI/2),makeGlassMaterial(0x9ecfdb,.72));dome.position.set(0,5.55,1);g.add(dome);
      addFlag(g,-4.7,-1.6,0xb34448);
    }

    if(key==="research"){
      g.add(createRadialLab({x:0,z:1,r:4.4,h:4.2,accent:0x8668b1,label:"RESEARCH",color:0xd8dce7}));
      const dome=new THREE.Mesh(new THREE.SphereGeometry(3.0,18,10,0,Math.PI*2,0,Math.PI/2),makeGlassMaterial(0x88c4d2,.64));dome.position.set(0,4.35,1);g.add(dome);
      g.add(createHexTower({x:-5.4,z:-4.8,r:1.35,h:2.6,accent:0x6b9fc0,label:"DQN",color:0xcbdbe4}));
      g.add(createPrismGallery({x:0,z:-5.1,r:1.75,h:2.2,accent:0xb47a9a,label:"PAPERS",color:0xe4d5df}));
      g.add(createBuilding({x:5.2,z:-4.8,w:2.6,d:2.6,h:2.4,accent:0x6eaa82,style:"cylinder",label:"AGENTS",baseColor:0xd4e0d6}));
    }

    if(key==="skills"){
      g.add(createSawtoothFactory({x:-4.9,z:-4.2,w:4.7,d:4.2,h:5.4,accent:0xd57448,label:"CODE",color:0xe0d4c5}));
      g.add(createFrameTower({x:4.7,z:-4.2,w:4.2,d:4.2,h:8.1,accent:0x4f91bd,label:"TOOLS",color:0xd4dee6}));
      g.add(createHexTower({x:-4.8,z:4.2,r:2.15,h:10.1,accent:0x7665b5,label:"AI",color:0xdad7e5}));
      g.add(createTwistTower({x:4.7,z:4.2,w:4.25,d:4.25,h:12.0,accent:0x4aa17d,label:"XR",colors:[0xd5e1da,0xb8d0c4,0x729c88]}));
      const core=new THREE.Mesh(new THREE.OctahedronGeometry(1.7,0),new THREE.MeshStandardMaterial({color:accent,roughness:.25,metalness:.55}));core.position.y=4.4;g.add(core);animatedElements.push({object:core,type:"rotate",speed:.34});
      g.add(createSignboard("TECH FOUNDRY",{x:0,y:2.3,z:.2,width:4.7,height:.9,color:accent}));
    }

    if(key==="about"){
      g.add(createVillaHQ({x:0,z:0,w:9.4,d:8.0,h:6.2,accent:0xc24e42,label:"RITHVIK HQ",color:0xe5ddd1}));
      g.add(createHexTower({x:3.2,z:-1.2,r:1.9,h:5.2,accent:0x4f91a7,label:"AI STUDIO",color:0xd4e1e4}));
      addRooftopGarden(g,-1.3,.8,6.25,5.6,4.8);
      addFlag(g,-3.6,2.6,accent);
    }

    if(key==="contact"){
      g.add(createBuilding({x:0,z:0,w:7.2,d:7.2,h:5.0,accent:0xd8824f,style:"cylinder",hero:true,label:"CONTACT",baseColor:0xe3d8c9,glassColor:0x98bdc9}));
      const mast=new THREE.Mesh(new THREE.CylinderGeometry(.18,.34,12.5,10),shared.metal);mast.position.y=11.1;g.add(mast);
      const dish=new THREE.Mesh(new THREE.SphereGeometry(1.0,12,7,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:0xe7ecee,roughness:.36,metalness:.42,side:THREE.DoubleSide}));dish.rotation.x=-.7;dish.position.set(0,14.7,0);g.add(dish);
      for(let i=0;i<3;i++){
        const ring=new THREE.Mesh(new THREE.TorusGeometry(1.7+i*.9,.055,6,28),new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.24-i*.04}));
        ring.rotation.x=Math.PI/2;ring.position.y=17.2;g.add(ring);animatedElements.push({object:ring,type:"signal",offset:i*.7});
      }
      g.add(createSignboard("COMMS ARRAY",{x:0,y:6.5,z:1.0,width:4.8,height:1.0,color:accent}));
    }
    return g;
  }

  function createTwistTower({x=0,z=0,w=5,d=5,h=14,accent=COLORS.accent,label="",colors=[0xd9dde0,0xbfcdd2,0x829ba7]}={}){
    const g=new THREE.Group();g.position.set(x,0,z);
    const levels=6, levelH=h/levels;
    for(let i=0;i<levels;i++){
      const t=i/(levels-1), scale=1-t*.22;
      const mat=makeBuildingMaterial(colors[i%colors.length],.54,.14);
      const slab=new THREE.Mesh(new THREE.BoxGeometry(w*scale,levelH*.9,d*scale),mat);
      slab.position.y=levelH*(i+.5);slab.rotation.y=(i-(levels-1)/2)*.075;slab.castShadow=PERF.shadows&&i<2;slab.receiveShadow=true;g.add(slab);
      const glass=new THREE.Mesh(new THREE.BoxGeometry(w*scale*.72,levelH*.43,.055),makeGlassMaterial(0x84b6c7,.82));
      glass.position.set(0,levelH*(i+.56),d*scale/2+.035);glass.rotation.y=slab.rotation.y;g.add(glass);
    }
    const crown=new THREE.Mesh(new THREE.CylinderGeometry(.65,.85,.55,6),makeBuildingMaterial(accent,.3,.5));crown.position.y=h+.28;g.add(crown);
    addRoofTech(g,h+.55,w,d);
    if(label)g.add(createSignboard(label,{x:0,y:h+1.75,z:0,width:Math.max(2.7,label.length*.23),height:.78,color:accent}));
    return g;
  }

  function createHexTower({x=0,z=0,r=2.2,h=9,accent=COLORS.accent,label="",color=0xd6dde0}={}){
    const g=new THREE.Group();g.position.set(x,0,z);
    const body=new THREE.Mesh(new THREE.CylinderGeometry(r,r*.96,h,6),makeBuildingMaterial(color,.58,.12));body.position.y=h/2;body.rotation.y=Math.PI/6;body.castShadow=PERF.shadows;body.receiveShadow=true;g.add(body);
    for(let y=1.2;y<h-.7;y+=1.5){const band=new THREE.Mesh(new THREE.CylinderGeometry(r+.035,r+.035,.22,6),makeGlassMaterial(0x7eafc1,.84));band.position.y=y;band.rotation.y=Math.PI/6;g.add(band)}
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(r*.72,r*.85,.42,6),makeBuildingMaterial(accent,.3,.45));cap.position.y=h+.2;cap.rotation.y=Math.PI/6;g.add(cap);
    if(label)g.add(createSignboard(label,{x:0,y:h+1.45,z:0,width:Math.max(2.6,label.length*.23),height:.76,color:accent}));
    return g;
  }

  function createCantileverBuilding({x=0,z=0,w=5,d=4,h=9,accent=COLORS.accent,label="",color=0xded8cf}={}){
    const g=new THREE.Group();g.position.set(x,0,z);const mat=makeBuildingMaterial(color,.67,.08);const glass=makeGlassMaterial(0x8eb9c8,.84);
    const base=new THREE.Mesh(new THREE.BoxGeometry(w,h*.43,d),mat);base.position.y=h*.215;base.castShadow=PERF.shadows;base.receiveShadow=true;g.add(base);
    const mid=new THREE.Mesh(new THREE.BoxGeometry(w*.82,h*.28,d*.84),mat);mid.position.set(w*.11,h*.57,-d*.05);g.add(mid);
    const top=new THREE.Mesh(new THREE.BoxGeometry(w*.72,h*.24,d*.72),mat);top.position.set(-w*.12,h*.83,d*.08);g.add(top);
    const window=new THREE.Mesh(new THREE.BoxGeometry(w*.58,h*.28,.06),glass);window.position.set(0,h*.31,d/2+.035);g.add(window);
    const terrace=new THREE.Mesh(new THREE.BoxGeometry(w*.78,.11,d*.78),new THREE.MeshLambertMaterial({color:0x779c68}));terrace.position.set(w*.1,h*.725,-d*.05);g.add(terrace);
    const fin=new THREE.Mesh(new THREE.BoxGeometry(.18,h*.72,d*.94),makeBuildingMaterial(accent,.4,.35));fin.position.set(-w*.42,h*.4,0);g.add(fin);
    addRoofTech(g,h,w,d);
    if(label)g.add(createSignboard(label,{x:0,y:h+1.4,z:0,width:Math.max(2.6,label.length*.23),height:.76,color:accent}));
    return g;
  }

  function createFrameTower({x=0,z=0,w=4.5,d=4.5,h=11,accent=COLORS.accent,label="",color=0xd7dce0}={}){
    const g=new THREE.Group();g.position.set(x,0,z);const frame=makeBuildingMaterial(color,.48,.2), glass=makeGlassMaterial(0x7da9bd,.78);
    const core=new THREE.Mesh(new THREE.BoxGeometry(w*.68,h*.9,d*.68),glass);core.position.y=h*.47;g.add(core);
    const col=.28;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{const c=new THREE.Mesh(new THREE.BoxGeometry(col,h,d<4?.22:col),frame);c.position.set(sx*(w/2-col/2),h/2,sz*(d/2-col/2));c.castShadow=PERF.shadows;g.add(c)});
    for(let y=1;y<h;y+=2){const floor=new THREE.Mesh(new THREE.BoxGeometry(w,.16,d),frame);floor.position.y=y;g.add(floor)}
    const crown=new THREE.Mesh(new THREE.BoxGeometry(w*.72,.42,d*.72),makeBuildingMaterial(accent,.3,.42));crown.position.y=h+.21;g.add(crown);
    if(label)g.add(createSignboard(label,{x:0,y:h+1.5,z:0,width:Math.max(2.5,label.length*.23),height:.76,color:accent}));
    return g;
  }

  function createSawtoothFactory({x=0,z=0,w=5,d=4.5,h=5,accent=COLORS.accent,label="",color=0xdad3ca}={}){
    const g=new THREE.Group();g.position.set(x,0,z);const mat=makeBuildingMaterial(color,.78,.06);const base=new THREE.Mesh(new THREE.BoxGeometry(w,h*.72,d),mat);base.position.y=h*.36;base.castShadow=PERF.shadows;base.receiveShadow=true;g.add(base);
    const glass=makeGlassMaterial(0x8cb5c2,.82);const front=new THREE.Mesh(new THREE.BoxGeometry(w*.72,h*.38,.06),glass);front.position.set(0,h*.37,d/2+.035);g.add(front);
    const teeth=4;
    for(let i=0;i<teeth;i++){
      const roof=new THREE.Mesh(new THREE.CylinderGeometry(.78,.78,d*.9,3),makeBuildingMaterial(i%2?0x9fa6aa:accent,.52,.2));
      roof.rotation.z=Math.PI/2;roof.rotation.y=Math.PI/2;roof.position.set(-w*.34+i*(w*.68/(teeth-1)),h*.86,0);roof.scale.x=.7;g.add(roof);
    }
    const chimney=new THREE.Mesh(new THREE.CylinderGeometry(.22,.28,2.0,8),shared.metal);chimney.position.set(w*.34,h+1,-d*.24);g.add(chimney);
    if(label)g.add(createSignboard(label,{x:0,y:h+2.0,z:0,width:Math.max(2.6,label.length*.23),height:.76,color:accent}));
    return g;
  }

  function createPrismGallery({x=0,z=0,r=3,h=8,accent=COLORS.accent,label="",color=0xe4dadd}={}){
    const g=new THREE.Group();g.position.set(x,0,z);const body=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,3),makeBuildingMaterial(color,.63,.08));body.position.y=h/2;body.rotation.y=Math.PI/6;body.castShadow=PERF.shadows;body.receiveShadow=true;g.add(body);
    const face=new THREE.Mesh(new THREE.PlaneGeometry(r*1.45,h*.62),makeGlassMaterial(0x88b9ca,.82));face.position.set(0,h*.5,r*.87);g.add(face);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(r*.72,r*.9,.34,3),makeBuildingMaterial(accent,.28,.4));cap.position.y=h+.17;cap.rotation.y=Math.PI/6;g.add(cap);
    if(label)g.add(createSignboard(label,{x:0,y:h+1.45,z:0,width:Math.max(2.8,label.length*.23),height:.78,color:accent}));
    return g;
  }

  function createCampusHall({x=0,z=0,w=10,d=6,h=5.5,accent=0xb34448,label="",color=0xe7dfd2}={}){
    const g=new THREE.Group();g.position.set(x,0,z);const mat=makeBuildingMaterial(color,.76,.03);
    const body=new THREE.Mesh(new THREE.BoxGeometry(w,h*.78,d),mat);body.position.y=h*.39;body.castShadow=PERF.shadows;body.receiveShadow=true;g.add(body);
    const wingMat=makeBuildingMaterial(0xd7d2c8,.78,.03);[-1,1].forEach(s=>{const wing=new THREE.Mesh(new THREE.BoxGeometry(w*.2,h*.6,d*1.22),wingMat);wing.position.set(s*w*.42,h*.3,0);g.add(wing)});
    for(let i=0;i<6;i++){const col=new THREE.Mesh(new THREE.CylinderGeometry(.11,.14,h*.55,8),makeBuildingMaterial(0xf2ede3,.8,.02));col.position.set(-w*.28+i*(w*.112),h*.275,d/2+.24);g.add(col)}
    const entrance=new THREE.Mesh(new THREE.BoxGeometry(w*.58,h*.38,.08),makeGlassMaterial(0x8db7c7,.82));entrance.position.set(0,h*.26,d/2+.055);g.add(entrance);
    const pediment=new THREE.Mesh(new THREE.CylinderGeometry(w*.19,w*.19,d*.18,3),makeBuildingMaterial(accent,.65,.06));pediment.rotation.z=Math.PI/2;pediment.rotation.y=Math.PI/2;pediment.position.set(0,h*.86,d/2+.02);pediment.scale.x=1.7;g.add(pediment);
    if(label)g.add(createSignboard(label,{x:0,y:h+1.7,z:0,width:Math.max(4.3,label.length*.23),height:.82,color:accent}));
    return g;
  }

  function createRadialLab({x=0,z=0,r=4,h=4,accent=0x8668b1,label="",color=0xd8dce7}={}){
    const g=new THREE.Group();g.position.set(x,0,z);const base=new THREE.Mesh(new THREE.CylinderGeometry(r,r*1.06,h,12),makeBuildingMaterial(color,.58,.12));base.position.y=h/2;base.castShadow=PERF.shadows;base.receiveShadow=true;g.add(base);
    const glassRing=new THREE.Mesh(new THREE.CylinderGeometry(r+.04,r+.04,h*.42,12,1,true),makeGlassMaterial(0x84b8c9,.8));glassRing.position.y=h*.55;g.add(glassRing);
    for(let a=0;a<Math.PI*2;a+=Math.PI/2){const arm=new THREE.Mesh(new THREE.BoxGeometry(r*.9,.35,1.05),makeBuildingMaterial(0xbac4cf,.62,.12));arm.position.set(Math.cos(a)*r*.85,1.25,Math.sin(a)*r*.85);arm.rotation.y=-a;g.add(arm)}
    if(label)g.add(createSignboard(label,{x:0,y:h+4.15,z:0,width:Math.max(3.3,label.length*.23),height:.8,color:accent}));
    return g;
  }

  function createVillaHQ({x=0,z=0,w=9,d=8,h=6,accent=COLORS.accent,label="",color=0xe5ddd1}={}){
    const g=new THREE.Group();g.position.set(x,0,z);const mat=makeBuildingMaterial(color,.74,.04),glass=makeGlassMaterial(0x91bdc8,.82);
    const a=new THREE.Mesh(new THREE.BoxGeometry(w*.72,h*.7,d*.55),mat);a.position.set(-w*.12,h*.35,d*.13);a.castShadow=PERF.shadows;a.receiveShadow=true;g.add(a);
    const b=new THREE.Mesh(new THREE.BoxGeometry(w*.42,h*.5,d*.8),makeBuildingMaterial(0xd4ddd8,.72,.05));b.position.set(w*.28,h*.25,-d*.05);g.add(b);
    const upper=new THREE.Mesh(new THREE.BoxGeometry(w*.45,h*.38,d*.42),makeBuildingMaterial(0xe9e3d9,.7,.04));upper.position.set(-w*.16,h*.84,-d*.05);g.add(upper);
    const glassWall=new THREE.Mesh(new THREE.BoxGeometry(w*.5,h*.42,.07),glass);glassWall.position.set(-w*.08,h*.36,d*.41);g.add(glassWall);
    const terrace=new THREE.Mesh(new THREE.BoxGeometry(w*.65,.12,d*.45),new THREE.MeshLambertMaterial({color:0x7ba66c}));terrace.position.set(-w*.1,h*.72,-d*.03);g.add(terrace);
    const canopy=new THREE.Mesh(new THREE.BoxGeometry(w*.34,.18,1.0),makeBuildingMaterial(accent,.32,.32));canopy.position.set(w*.22,1.35,d*.46);g.add(canopy);
    if(label)g.add(createSignboard(label,{x:-.4,y:h+1.45,z:0,width:Math.max(3.1,label.length*.23),height:.8,color:accent}));
    return g;
  }

  function addRoofTech(group,topY,w,d){
    const unit=new THREE.Mesh(new THREE.BoxGeometry(Math.max(.8,w*.2),.35,Math.max(.8,d*.2)),shared.roof);unit.position.set(-w*.16,topY+.18,0);group.add(unit);
    const panel=new THREE.Mesh(new THREE.BoxGeometry(Math.max(1.0,w*.28),.07,Math.max(.75,d*.22)),shared.solar);panel.position.set(w*.15,topY+.22,0);panel.rotation.x=-.12;group.add(panel);
  }

  function makeBuildingMaterial(color,roughness=.68,metalness=.08){
    return new THREE.MeshStandardMaterial({color,roughness,metalness});
  }

  function makeGlassMaterial(color=COLORS.glass,opacity=.84){
    const material=new THREE.MeshStandardMaterial({color,roughness:.18,metalness:.22,transparent:true,opacity});
    glassMaterials.push(material);
    return material;
  }

  function createBuilding({x=0,z=0,w=4,d=4,h=8,accent=COLORS.accent,hero=false,warm=false,style="tower",label="",baseColor=null,glassColor=COLORS.glass}={}){
    const group=new THREE.Group();
    group.position.set(x,0,z);
    const bodyMat = baseColor ? makeBuildingMaterial(baseColor, warm ? .72 : .68, warm ? .05 : .08) : (warm ? shared.buildingWarm : shared.building);
    const darkMat = makeBuildingMaterial(0x7e8589,.58,.2);
    const glassMat = makeGlassMaterial(glassColor, style === "glass" ? .9 : .84);

    function addRoofDetails(topY){
      const roof=new THREE.Mesh(new THREE.BoxGeometry(Math.max(1.3,w*.62),.34,Math.max(1.3,d*.62)),shared.roof);roof.position.y=topY+.17;group.add(roof);
      if(h>7){
        const hvac=new THREE.Mesh(new THREE.BoxGeometry(Math.max(.8,w*.2),.36,Math.max(.8,d*.22)),darkMat);hvac.position.set(-w*.18,topY+.52,0);group.add(hvac);
        const panel=new THREE.Mesh(new THREE.BoxGeometry(Math.max(1,w*.3),.08,Math.max(.8,d*.25)),shared.solar);panel.position.set(w*.17,topY+.48,0);panel.rotation.x=-.12;group.add(panel);
      }
    }

    function addVerticalAccent(sideX,topY){
      const strip=new THREE.Mesh(new THREE.BoxGeometry(Math.max(.24,w*.12),Math.max(2.1,topY*.45),.075),new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.72}));
      strip.position.set(sideX,Math.max(1.6,topY*.44),d/2+.045);group.add(strip);
    }

    if(style==="tower"||style==="slab"||style==="glass"||style==="industrial"||style==="lab"||style==="campus"||style==="terrace"||style==="pod"){
      const body=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),bodyMat);
      body.position.y=h/2;body.receiveShadow=true;body.castShadow=PERF.shadows && hero;group.add(body);

      if(style!=="pod"){
        if(style==="slab"){
          for(let y=1.1;y<h-0.8;y+=1.05){
            const band=new THREE.Mesh(new THREE.BoxGeometry(w*.78,.18,.06),glassMat);
            band.position.set(0,y,d/2+.035);group.add(band);
          }
        }else if(style==="industrial"){
          const glassFront=new THREE.Mesh(new THREE.BoxGeometry(w*.55,h*.44,.06),glassMat);glassFront.position.set(0,h*.38,d/2+.04);group.add(glassFront);
          for(let i=-1;i<=1;i++){const fin=new THREE.Mesh(new THREE.BoxGeometry(.18,h*.88,.12),darkMat);fin.position.set(i*w*.22,h*.44,d/2+.055);group.add(fin)}
        }else if(style==="campus"){
          const colCount=5;
          for(let i=0;i<colCount;i++){const col=new THREE.Mesh(new THREE.BoxGeometry(.18,h*.58,.18),makeBuildingMaterial(0xf1ece0,.72,.04));col.position.set(-w*.34+i*(w*.17),h*.29,d/2+.055);group.add(col)}
          const entrance=new THREE.Mesh(new THREE.BoxGeometry(w*.58,h*.34,.08),glassMat);entrance.position.set(0,h*.22,d/2+.045);group.add(entrance);
        }else if(style==="lab"){
          const glassFront=new THREE.Mesh(new THREE.BoxGeometry(w*.76,h*.58,.06),glassMat);glassFront.position.set(0,h*.42,d/2+.035);group.add(glassFront);
          const canopy=new THREE.Mesh(new THREE.BoxGeometry(w*.4,.2,1.0),makeBuildingMaterial(accent,.28,.42));canopy.position.set(0,1.25,d/2+.46);group.add(canopy);
        }else if(style==="terrace"){
          const lower=new THREE.Mesh(new THREE.BoxGeometry(w*.78,h*.28,d*.72),bodyMat);lower.position.set(0,h+.14,0);group.add(lower);
          const glassFront=new THREE.Mesh(new THREE.BoxGeometry(w*.62,h*.54,.06),glassMat);glassFront.position.set(0,h*.44,d/2+.04);group.add(glassFront);
        }else{
          const glassFront=new THREE.Mesh(new THREE.BoxGeometry(w*.7,h*.72,.06),glassMat);glassFront.position.set(0,h*.52,d/2+.035);group.add(glassFront);
          const glassSide = new THREE.Mesh(new THREE.BoxGeometry(.06,h*.62,d*.52),glassMat);glassSide.position.set(w/2+.035,h*.5,0);group.add(glassSide);
        }
        addVerticalAccent(-w*.31,h);
      }

      if(style==="pod"){
        const cap=new THREE.Mesh(new THREE.CylinderGeometry(w*.52,w*.54,.18,10),darkMat);cap.position.y=h+.1;group.add(cap);
      }
      addRoofDetails(h);
    }

    if(style==="stepped"){
      const lower=new THREE.Mesh(new THREE.BoxGeometry(w,h*.62,d),bodyMat);lower.position.y=h*.31;lower.receiveShadow=true;lower.castShadow=PERF.shadows && hero;group.add(lower);
      const mid=new THREE.Mesh(new THREE.BoxGeometry(w*.82,h*.2,d*.82),bodyMat);mid.position.y=h*.72;group.add(mid);
      const top=new THREE.Mesh(new THREE.BoxGeometry(w*.58,h*.18,d*.58),bodyMat);top.position.y=h*.91;group.add(top);
      const glassFront=new THREE.Mesh(new THREE.BoxGeometry(w*.66,h*.43,.06),glassMat);glassFront.position.set(0,h*.42,d/2+.035);group.add(glassFront);
      const crown=new THREE.Mesh(new THREE.BoxGeometry(w*.28,.26,d*.28),makeBuildingMaterial(accent,.3,.55));crown.position.y=h+.13;group.add(crown);
      addVerticalAccent(-w*.29,h*.9);
      addRoofDetails(h+.08);
    }

    if(style==="cylinder"){
      const radius=Math.min(w,d)*.48;
      const body=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,h,18),bodyMat);body.position.y=h/2;body.receiveShadow=true;body.castShadow=PERF.shadows && hero;group.add(body);
      const glassBand=new THREE.Mesh(new THREE.CylinderGeometry(radius+.03,radius+.03,h*.42,18,1,true),glassMat);glassBand.position.y=h*.48;group.add(glassBand);
      const top=new THREE.Mesh(new THREE.CylinderGeometry(radius*.72,radius*.82,.34,18),shared.roof);top.position.y=h+.17;group.add(top);
      const ring=new THREE.Mesh(new THREE.TorusGeometry(radius*.88,.08,6,24),new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.75}));ring.rotation.x=Math.PI/2;ring.position.y=h+.36;group.add(ring);
    }

    if(label){
      const signW = Math.min(6.2,Math.max(2.2,label.length*.22));
      let signY = h + 1.15;
      if(style==="stepped")signY=h+1.35;
      if(style==="terrace")signY=h+2.15;
      if(style==="cylinder")signY=h+1.0;
      if(style==="pod")signY=h+.9;
      const signZ = d/2 + .55;
      group.add(createSignboard(label,{x:0,y:signY,z:signZ,width:signW,height:.8,color:accent}));
    }

    return group;
  }

  function createSignboard(text,{x=0,y=0,z=0,width=3.6,height=.8,color=COLORS.accent,rotationY=Math.PI/4}={}){
    return new THREE.Group();
  }

  function roundRect(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.lineTo(x+w-r,y);
    ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r);
    ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h);
    ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y);
    ctx.closePath();
  }

  function addRooftopGarden(group,x,z,y,w,d){
    const patch=new THREE.Mesh(new THREE.BoxGeometry(w*.55,.12,d*.42),new THREE.MeshLambertMaterial({color:0x73a161}));patch.position.set(x,y+.46,z);group.add(patch);
    for(let i=0;i<4;i++){
      const pot=new THREE.Mesh(new THREE.CylinderGeometry(.16,.22,.26,7),new THREE.MeshLambertMaterial({color:0x9b7657}));
      pot.position.set(x-w*.18+i*w*.12,y+.68,z);group.add(pot);
    }
  }

  function addFlag(group,x,z,accent){
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(.035,.045,3,6),shared.dark);pole.position.set(x,1.5,z);group.add(pole);
    const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.15,.62),new THREE.MeshBasicMaterial({color:accent,side:THREE.DoubleSide}));flag.position.set(x+.6,2.55,z);flag.rotation.y=Math.PI/2;group.add(flag);
  }

  /* =========================================================
     TREES / LAMPS / BENCHES — STATIC INSTANCED PROPS
  ========================================================= */

  function createGreenery(){
    const positions=[];
    for(let x=-51;x<=51;x+=6){positions.push([x,-10],[x,10],[x,18],[x,-18],[x,33],[x,-33])}
    for(let z=-32;z<=32;z+=7){positions.push([-11,z],[11,z],[-36,z],[36,z])}

    const count=Math.min(PERF.trees,positions.length);
    const trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.13,.2,1.35,6),shared.trunk,count);
    const crowns=new THREE.InstancedMesh(new THREE.ConeGeometry(.85,2.25,7),shared.tree,count);
    const color=new THREE.Color();
    for(let i=0;i<count;i++){
      const [x,z]=positions[i];
      const s=.88+(i%5)*.035;
      matrixDummy.position.set(x+((i*11)%5-2)*.08,.68,z+((i*17)%5-2)*.08);matrixDummy.rotation.y=(i*.67)%6.28;matrixDummy.scale.set(s,s,s);matrixDummy.updateMatrix();trunks.setMatrixAt(i,matrixDummy.matrix);
      matrixDummy.position.y=2.15;matrixDummy.updateMatrix();crowns.setMatrixAt(i,matrixDummy.matrix);
      color.setHex(i%4===0?COLORS.treeDark:COLORS.tree);crowns.setColorAt(i,color);
    }
    trunks.instanceMatrix.needsUpdate=true;crowns.instanceMatrix.needsUpdate=true;if(crowns.instanceColor)crowns.instanceColor.needsUpdate=true;
    scene.add(trunks,crowns);
  }

  function createStreetFurniture(){
    const lampPositions=[];
    for(let x=-48;x<=48;x+=9){lampPositions.push([x,-6.2],[x,6.2])}
    for(let z=-34;z<=34;z+=9){lampPositions.push([-6.2,z],[6.2,z])}
    const lampCount=Math.min(PERF.lamps,lampPositions.length);
    const poles=new THREE.InstancedMesh(new THREE.CylinderGeometry(.045,.06,2.5,6),shared.metal,lampCount);
    const heads=new THREE.InstancedMesh(new THREE.BoxGeometry(.5,.1,.18),new THREE.MeshBasicMaterial({color:0xfff2c4}),lampCount);
    for(let i=0;i<lampCount;i++){
      const [x,z]=lampPositions[i];matrixDummy.position.set(x,1.25,z);matrixDummy.rotation.set(0,0,0);matrixDummy.scale.set(1,1,1);matrixDummy.updateMatrix();poles.setMatrixAt(i,matrixDummy.matrix);
      matrixDummy.position.y=2.5;matrixDummy.updateMatrix();heads.setMatrixAt(i,matrixDummy.matrix);
    }
    poles.instanceMatrix.needsUpdate=true;heads.instanceMatrix.needsUpdate=true;scene.add(poles,heads);

    const benchPositions=[[-17,13],[-39,13],[17,13],[39,13],[-17,-13],[17,-13],[-39,-13],[39,-13],[-16,30],[16,30],[-16,-30],[16,-30],[45,14],[-45,-14],[45,-14]];
    const benchCount=Math.min(PERF.benches,benchPositions.length);
    const seats=new THREE.InstancedMesh(new THREE.BoxGeometry(1.35,.13,.45),shared.wood,benchCount);
    const backs=new THREE.InstancedMesh(new THREE.BoxGeometry(1.35,.52,.1),shared.wood,benchCount);
    for(let i=0;i<benchCount;i++){
      const [x,z]=benchPositions[i];matrixDummy.position.set(x,.48,z);matrixDummy.rotation.set(0,(i%2)*Math.PI/2,0);matrixDummy.updateMatrix();seats.setMatrixAt(i,matrixDummy.matrix);
      matrixDummy.position.y=.78;matrixDummy.position.z=z+(i%2===0?.2:0);matrixDummy.position.x=x+(i%2===1?.2:0);matrixDummy.updateMatrix();backs.setMatrixAt(i,matrixDummy.matrix);
    }
    scene.add(seats,backs);
  }

  /* =========================================================
     TRAFFIC — MOVING + PARKED INSTANCED CARS
  ========================================================= */

  function createTraffic(){
    const bodyGeo=new THREE.BoxGeometry(1.55,.34,.72);
    const cabinGeo=new THREE.BoxGeometry(.78,.32,.62);

    carBodyMesh=new THREE.InstancedMesh(bodyGeo,shared.car,PERF.movingCars);
    carCabinMesh=new THREE.InstancedMesh(cabinGeo,shared.carGlass,PERF.movingCars);
    carBodyMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);carCabinMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const palette=[0xe5e5df,0x315f83,0xb34d42,0x3a3f43,0xc2a35d,0x547c6b,0xeaf0f4];

    for(let i=0;i<PERF.movingCars;i++){
      const horizontal=i<Math.ceil(PERF.movingCars*.63);
      const route=horizontal
        ? {axis:"x",lane:i%2===0?-2:2,min:-53,max:53,direction:i%2===0?1:-1}
        : {axis:"z",lane:i%2===0?-2:2,min:-40,max:40,direction:i%2===0?1:-1};
      const progress=(i*.137)%1;
      movingCars.push({route,progress,speed:3.1+(i%5)*.45,color:palette[i%palette.length]});
      carBodyMesh.setColorAt(i,new THREE.Color(palette[i%palette.length]));
    }
    if(carBodyMesh.instanceColor)carBodyMesh.instanceColor.needsUpdate=true;
    scene.add(carBodyMesh,carCabinMesh);

    parkedBodyMesh=new THREE.InstancedMesh(bodyGeo,shared.car,PERF.parkedCars);
    parkedCabinMesh=new THREE.InstancedMesh(cabinGeo,shared.carGlass,PERF.parkedCars);
    for(let i=0;i<PERF.parkedCars;i++){
      const lot=i%4;
      const row=Math.floor(i/4);
      const base=[[-47,31],[-39,31],[-47,-31],[-39,-31]][lot];
      const x=base[0]+(row%4)*2.2+(lot%2?81:0);
      const z=base[1]+(i%2?1.7:-1.7);
      setCarMatrix(parkedBodyMesh,parkedCabinMesh,i,x,z,lot<2?0:Math.PI,false);
      parkedBodyMesh.setColorAt(i,new THREE.Color(palette[(i+2)%palette.length]));
    }
    if(parkedBodyMesh.instanceColor)parkedBodyMesh.instanceColor.needsUpdate=true;
    scene.add(parkedBodyMesh,parkedCabinMesh);
    updateTraffic(0);
  }

  function setCarMatrix(bodyMesh,cabinMesh,index,x,z,rotation,raise=true){
    matrixDummy.position.set(x,raise?.28:.28,z);matrixDummy.rotation.set(0,rotation,0);matrixDummy.scale.set(1,1,1);matrixDummy.updateMatrix();bodyMesh.setMatrixAt(index,matrixDummy.matrix);
    const localOffset=new THREE.Vector3(.06,.33,0).applyAxisAngle(new THREE.Vector3(0,1,0),rotation);
    matrixDummy.position.set(x+localOffset.x,.61,z+localOffset.z);matrixDummy.updateMatrix();cabinMesh.setMatrixAt(index,matrixDummy.matrix);
  }

  function updateTraffic(delta){
    if(!carBodyMesh)return;
    for(let i=0;i<movingCars.length;i++){
      const c=movingCars[i],r=c.route;
      if(PERF.animate)c.progress=(c.progress+(c.speed*delta)/(r.max-r.min))%1;
      const pos=THREE.MathUtils.lerp(r.min,r.max,r.direction>0?c.progress:1-c.progress);
      if(r.axis==="x")setCarMatrix(carBodyMesh,carCabinMesh,i,pos,r.lane,r.direction>0?0:Math.PI);
      else setCarMatrix(carBodyMesh,carCabinMesh,i,r.lane,pos,r.direction>0?-Math.PI/2:Math.PI/2);
    }
    carBodyMesh.instanceMatrix.needsUpdate=true;carCabinMesh.instanceMatrix.needsUpdate=true;
  }

  /* =========================================================
     PEDESTRIANS — TWO INSTANCED DRAW CALLS
  ========================================================= */

  function createPedestrians(){
    personBodyMesh=new THREE.InstancedMesh(new THREE.CylinderGeometry(.14,.19,.7,6),shared.person,PERF.people);
    personHeadMesh=new THREE.InstancedMesh(new THREE.SphereGeometry(.155,7,6),shared.skin,PERF.people);
    personBodyMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);personHeadMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const colors=[0x315f83,0x8d4b40,0x5c7653,0x6c5a8b,0x9b7648,0x3f7d8d,0x7e5f4f];
    const routes=[
      {axis:"x",fixed:-7,min:-50,max:50},{axis:"x",fixed:7,min:-50,max:50},{axis:"x",fixed:18.2,min:-47,max:47},{axis:"x",fixed:-18.2,min:-47,max:47},
      {axis:"z",fixed:-8.4,min:-33,max:33},{axis:"z",fixed:8.4,min:-33,max:33},{axis:"z",fixed:-35,min:-31,max:31},{axis:"z",fixed:35,min:-31,max:31}
    ];
    for(let i=0;i<PERF.people;i++){
      const route=routes[i%routes.length];
      pedestrians.push({route,progress:(i*.173)%1,speed:.72+(i%5)*.1,direction:i%2?1:-1,phase:i*.7});
      personBodyMesh.setColorAt(i,new THREE.Color(colors[i%colors.length]));
    }
    if(personBodyMesh.instanceColor)personBodyMesh.instanceColor.needsUpdate=true;
    scene.add(personBodyMesh,personHeadMesh);
    updatePedestrians(0,0);
  }

  function updatePedestrians(delta,elapsed){
    if(!personBodyMesh)return;
    for(let i=0;i<pedestrians.length;i++){
      const p=pedestrians[i],r=p.route;
      if(PERF.animate)p.progress=(p.progress+(p.speed*delta)/(r.max-r.min))%1;
      const t=p.direction>0?p.progress:1-p.progress;
      const travel=THREE.MathUtils.lerp(r.min,r.max,t);
      let x,z,rotation;
      if(r.axis==="x"){x=travel;z=r.fixed+((i%3)-1)*.34;rotation=p.direction>0?0:Math.PI}
      else{x=r.fixed+((i%3)-1)*.34;z=travel;rotation=p.direction>0?-Math.PI/2:Math.PI/2}
      const bob=PERF.animate?Math.abs(Math.sin(elapsed*5+p.phase))*.025:0;
      matrixDummy.position.set(x,.58+bob,z);matrixDummy.rotation.set(0,rotation,0);matrixDummy.scale.set(1,1,1);matrixDummy.updateMatrix();personBodyMesh.setMatrixAt(i,matrixDummy.matrix);
      matrixDummy.position.y=1.08+bob;matrixDummy.updateMatrix();personHeadMesh.setMatrixAt(i,matrixDummy.matrix);
    }
    personBodyMesh.instanceMatrix.needsUpdate=true;personHeadMesh.instanceMatrix.needsUpdate=true;
  }

  /* =========================================================
     PUBLIC SPACE / FOUNTAIN / PLAZA / TRAFFIC LIGHTS
  ========================================================= */

  function createPublicSpaces(){
    const plaza=new THREE.Mesh(new THREE.CylinderGeometry(5.8,5.8,.13,32),new THREE.MeshStandardMaterial({color:0xd9d5ca,roughness:.9}));
    plaza.position.set(0,.08,-34);scene.add(plaza);
    const basin=new THREE.Mesh(new THREE.CylinderGeometry(2.45,2.65,.56,28),new THREE.MeshStandardMaterial({color:0xb4b1aa,roughness:.75}));basin.position.set(0,.34,-34);scene.add(basin);
    const water=new THREE.Mesh(new THREE.CylinderGeometry(2.12,2.12,.08,28),shared.water);water.position.set(0,.62,-34);scene.add(water);
    animatedElements.push({object:water,type:"water",baseY:.62});

    const lightPositions=[[-5,-5],[5,-5],[-5,5],[5,5],[-32,-5],[-22,-5],[22,-5],[32,-5],[-32,5],[-22,5],[22,5],[32,5]];
    lightPositions.forEach(([x,z],i)=>{
      const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,3.1,6),shared.dark);pole.position.set(x,1.55,z);scene.add(pole);
      const box=new THREE.Mesh(new THREE.BoxGeometry(.28,.7,.22),new THREE.MeshLambertMaterial({color:0x303436}));box.position.set(x,2.7,z);scene.add(box);
      const signal=new THREE.Mesh(new THREE.SphereGeometry(.07,6,6),new THREE.MeshBasicMaterial({color:i%3===0?0xe84b45:0x55a76a}));signal.position.set(x,2.82,z+.12);scene.add(signal);
    });
  }

  function createEnvironmentDesign(){
    const pavedMat = new THREE.MeshStandardMaterial({color:0xe4ddd1,roughness:.95});
    const hedgeMat = new THREE.MeshLambertMaterial({color:0x6a9756});
    const flowerPalette=[0xe9829b,0xffce68,0x7fa7d9,0xf6f0da];
    const environmentDetail = veryLowEnd ? .28 : mobile ? .48 : 1;

    // Reflecting pool near the northern academic districts
    const poolBorder = new THREE.Mesh(new THREE.BoxGeometry(14,.32,5.8), new THREE.MeshStandardMaterial({color:0xc7c1b7,roughness:.88}));
    poolBorder.position.set(0,.16,35.5); poolBorder.receiveShadow=true; scene.add(poolBorder);
    const poolWater = new THREE.Mesh(new THREE.PlaneGeometry(13.1,4.9), shared.water);
    poolWater.rotation.x=-Math.PI/2; poolWater.position.set(0,.34,35.5); scene.add(poolWater);
    animatedElements.push({object:poolWater,type:"water",baseY:.34});

    // Pocket parks around the city to soften the layout
    createPocketPark(-43,-26,10,8);
    createPocketPark(43,-26,10,8);
    createPocketPark(-43,26,10,8);
    createPocketPark(43,26,10,8);

    // Courtyard gardens closer to the center
    createPocketGarden(-13,34,7.5,5.2);
    createPocketGarden(13,34,7.5,5.2);
    createPocketGarden(-13,-34,7.5,5.2);
    createPocketGarden(13,-34,7.5,5.2);

    // Decorative promenade ring around the fountain plaza
    const ring = new THREE.Mesh(new THREE.RingGeometry(6.6,8.7,48), pavedMat);
    ring.rotation.x=-Math.PI/2; ring.position.set(0,.081,-34); scene.add(ring);
    const planterCount = mobile ? 4 : 8;
    for(let i=0;i<planterCount;i++){
      const a=(i/planterCount)*Math.PI*2;
      const px=Math.cos(a)*7.65;
      const pz=-34+Math.sin(a)*7.65;
      const planter = new THREE.Mesh(new THREE.CylinderGeometry(.45,.52,.28,10), new THREE.MeshLambertMaterial({color:0xb18a65}));
      planter.position.set(px,.18,pz); scene.add(planter);
      const shrub = new THREE.Mesh(new THREE.SphereGeometry(.52,10,8), hedgeMat);
      shrub.position.set(px,.58,pz); scene.add(shrub);
    }

    // Median landscaping strips
    createFlatRect(0,14,8.4,1.1,new THREE.MeshLambertMaterial({color:0x7baa67}),.082);
    createFlatRect(0,-14,8.4,1.1,new THREE.MeshLambertMaterial({color:0x7baa67}),.082);
    addFlowerBed(0,14,7,8,flowerPalette);
    addFlowerBed(0,-14,7,8,flowerPalette);

    function createPocketPark(x,z,w,d){
      const base = new THREE.Mesh(new THREE.BoxGeometry(w,.18,d), pavedMat);
      base.position.set(x,.09,z); scene.add(base);
      const lawn = new THREE.Mesh(new THREE.PlaneGeometry(w-1.2,d-1.2), new THREE.MeshLambertMaterial({color:0x7dab65}));
      lawn.rotation.x=-Math.PI/2; lawn.position.set(x,.19,z); scene.add(lawn);
      const pathH = new THREE.Mesh(new THREE.PlaneGeometry(w-1.2,.55), new THREE.MeshBasicMaterial({color:0xece5d8}));
      pathH.rotation.x=-Math.PI/2; pathH.position.set(x,.195,z); scene.add(pathH);
      const pathV = new THREE.Mesh(new THREE.PlaneGeometry(.55,d-1.2), new THREE.MeshBasicMaterial({color:0xece5d8}));
      pathV.rotation.x=-Math.PI/2; pathV.position.set(x,.196,z); scene.add(pathV);
      addFlowerBed(x,z,6,12,flowerPalette);
    }

    function createPocketGarden(x,z,w,d){
      const pad = new THREE.Mesh(new THREE.BoxGeometry(w,.16,d), pavedMat);
      pad.position.set(x,.08,z); scene.add(pad);
      const green = new THREE.Mesh(new THREE.PlaneGeometry(w-.8,d-.8), new THREE.MeshLambertMaterial({color:0x85b66a}));
      green.rotation.x=-Math.PI/2; green.position.set(x,.17,z); scene.add(green);
      const circle = new THREE.Mesh(new THREE.CircleGeometry(.95,18), new THREE.MeshLambertMaterial({color:0x6f9650}));
      circle.rotation.x=-Math.PI/2; circle.position.set(x,.18,z); scene.add(circle);
      addFlowerBed(x,z,4,6,flowerPalette);
    }

    function addFlowerBed(x,z,count,spread,palette){
      const actualCount=Math.max(2,Math.round(count*environmentDetail));
      for(let i=0;i<actualCount;i++){
        const px = x + (((i*37)%100)/100-.5)*spread;
        const pz = z + (((i*53)%100)/100-.5)*spread*.6;
        const flower = new THREE.Mesh(new THREE.CircleGeometry(.14 + (i%3)*.03,8), new THREE.MeshBasicMaterial({color:palette[i%palette.length]}));
        flower.rotation.x=-Math.PI/2; flower.position.set(px,.205,pz); scene.add(flower);
      }
    }
  }

  /* =========================================================
     BIRDS / DRONES / CLOUDS
  ========================================================= */

  function createAmbientLife(){
    for(let i=0;i<PERF.birds;i++){
      const drone=i%4===0;
      let object;
      if(drone){
        object=new THREE.Group();
        object.add(new THREE.Mesh(new THREE.BoxGeometry(.55,.12,.28),shared.dark));
        const beacon=new THREE.Mesh(new THREE.SphereGeometry(.055,6,6),new THREE.MeshBasicMaterial({color:COLORS.accent}));beacon.position.y=-.1;object.add(beacon);
      }else{
        object=new THREE.Mesh(new THREE.ConeGeometry(.12,.62,3),new THREE.MeshLambertMaterial({color:0x606b72}));object.rotation.z=Math.PI/2;
      }
      object.position.set(-55+i*17,14+(i%4)*3,-36+(i*19)%72);scene.add(object);
      ambientActors.push({object,kind:drone?"drone":"bird",speed:.7+(i%3)*.22,phase:i*.8});
    }

    const cloudMat=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.52,depthWrite:false,fog:false});
    for(let i=0;i<PERF.clouds;i++){
      const cloud=new THREE.Group();
      for(let j=0;j<3;j++){const c=new THREE.Mesh(new THREE.SphereGeometry(2.1+j*.35,9,6),cloudMat);c.position.set(j*2.0,(j%2)*.45,0);cloud.add(c)}
      cloud.position.set(-72+i*30,33+(i%2)*5,-50+(i*23)%95);scene.add(cloud);
      ambientActors.push({object:cloud,kind:"cloud",speed:.09+(i%3)*.018,phase:i});
    }
  }

  function updateAmbient(elapsed,delta){
    if(!PERF.animate)return;
    ambientActors.forEach(a=>{
      if(a.kind==="cloud"){
        a.object.position.x+=a.speed*delta;
        if(a.object.position.x>78)a.object.position.x=-78;
      }else{
        a.object.position.x+=a.speed*delta;
        a.object.position.y+=Math.sin(elapsed*1.7+a.phase)*.004;
        if(a.object.position.x>62)a.object.position.x=-62;
      }
    });

    animatedElements.forEach(el=>{
      if(el.type==="rotate"){el.object.rotation.y+=delta*el.speed;el.object.rotation.x+=delta*el.speed*.35}
      if(el.type==="signal"){
        const pulse=(Math.sin(elapsed*2+el.offset)+1)/2;
        el.object.scale.setScalar(.96+pulse*.08);el.object.material.opacity=.12+pulse*.32;
      }
      if(el.type==="water")el.object.position.y=el.baseY+Math.sin(elapsed*2.4)*.015;
    });
  }

  /* =========================================================
     DISTRICT HOVER / RAYCAST
  ========================================================= */

  function getDistrictAt(clientX,clientY){
    pointer.x=(clientX/window.innerWidth)*2-1;
    pointer.y=-(clientY/window.innerHeight)*2+1;
    raycaster.setFromCamera(pointer,camera);
    const hits=raycaster.intersectObjects(interactiveDistricts,false);
    return hits.length ? hits[0].object.userData.section : null;
  }

  function updateRaycast(clientX,clientY){
    const key=getDistrictAt(clientX,clientY);
    if(key)showDistrictHover(key,clientX,clientY);
    else clearDistrictHover();
  }

  function showDistrictHover(key,mouseX,mouseY){
    const data=portfolioSections[key];if(!data)return;
    if(activeHoverKey!==key){
      highlightDistrict(activeHoverKey,false);
      document.querySelectorAll(".section-sidebar-item.is-map-hover").forEach(el=>el.classList.remove("is-map-hover"));
      highlightDistrict(key,true);
      document.querySelector(`.section-sidebar-item[data-open-section="${key}"]`)?.classList.add("is-map-hover");
      activeHoverKey=key;
      if(audioCtx?.state==="running") playHoverTick();
    }
    hoverIndex.textContent=data.cityIndex;if(hoverGlyph)hoverGlyph.textContent=districtGlyphs[key]||"◈";hoverTitle.textContent=data.cityName;hoverDescription.textContent=data.cityDescription;sectorReadout.textContent=data.cityName;
    syncMinimap(key);
    districtHoverCard.style.setProperty("--hover-accent",`#${new THREE.Color(getDistrictConfig(key)?.accent||COLORS.accent).getHexString()}`);
    positionHoverCard(mouseX,mouseY);districtHoverCard.classList.add("visible");districtHoverCard.setAttribute("aria-hidden","false");customCursor.classList.add("active");exploreHint.classList.add("hidden");
  }

  function positionHoverCard(x,y){
    if(window.innerWidth<=720)return;
    const width=290,height=140;let left=x+30,top=y-38;
    if(left+width>window.innerWidth-18)left=x-width-26;
    if(top+height>window.innerHeight-18)top=window.innerHeight-height-18;
    if(top<88)top=88;
    districtHoverCard.style.left=`${left}px`;districtHoverCard.style.top=`${top}px`;
  }

  function clearDistrictHover(){
    if(activeHoverKey)highlightDistrict(activeHoverKey,false);
    activeHoverKey=null;districtHoverCard.classList.remove("visible");districtHoverCard.setAttribute("aria-hidden","true");sectorReadout.textContent="CENTRAL";customCursor.classList.remove("active");
    if(!sectionModal.classList.contains("open"))syncMinimap(null);
    document.querySelectorAll(".section-sidebar-item.is-map-hover").forEach(el=>el.classList.remove("is-map-hover"));
  }

  function highlightDistrict(key,active){
    if(!key||!districtVisuals.has(key))return;
    const v=districtVisuals.get(key);
    v.pad.material.opacity=active?.20:.06;
    v.border.material.opacity=active?.95:.28;
    v.hoverPlate.material.opacity=active?.18:.02;
    if(v.districtGlow) v.districtGlow.material.opacity=active?.20:.08;
    v.hoverRing.material.opacity=active?.82:0;
    if(v.beaconBeam)v.beaconBeam.material.opacity=active?.42:0;
    if(v.beaconGem)v.beaconGem.material.opacity=active?.95:0;
    if(v.beaconHalo)v.beaconHalo.material.opacity=active?.72:0;
    v.targetLift=active?.32:0;
    v.targetScale=active?1.035:1;
  }

  function updateDistrictHoverMotion(){
    const pulse=(Math.sin(clock.elapsedTime*4)+1)/2;
    districtVisuals.forEach(v=>{
      v.root.position.y=THREE.MathUtils.lerp(v.root.position.y,v.targetLift,.18);
      const nextScale=THREE.MathUtils.lerp(v.architecture.scale.x,v.targetScale,.16);
      v.architecture.scale.setScalar(nextScale);
      if(v.hoverRing.material.opacity>0){
        const ringScale=.94+pulse*.16;
        v.hoverRing.scale.setScalar(ringScale);
        v.hoverRing.material.opacity=.55+pulse*.35;
      }else{
        v.hoverRing.scale.setScalar(1);
      }
      if(v.districtGlow){
        const baseGlow = v.targetScale > 1 ? .16 : .08;
        v.districtGlow.material.opacity = baseGlow + pulse*.018;
      }
      if(v.beaconGem && v.beaconGem.material.opacity>0){
        v.beaconGem.position.y=21.2+Math.sin(clock.elapsedTime*3.2)*.28;
        v.beaconGem.rotation.y+=.025;
        const halo=.92+pulse*.18;v.beaconHalo.scale.setScalar(halo);
      }
    });
  }

  /* =========================================================
     RECRUITER QUICK VIEW
  ========================================================= */

  function openRecruiterView(){
    if(!recruiterModal)return;
    stopGuidedTour();
    setMobileMenu(false,false);
    recruiterModal.classList.add("open");
    recruiterModal.setAttribute("aria-hidden","false");
    document.body.classList.add("recruiter-open");
    if(bgmGain&&audioCtx){
      bgmGain.gain.cancelScheduledValues(audioCtx.currentTime);
      bgmGain.gain.linearRampToValueAtTime(.22,audioCtx.currentTime+.12);
    }
    playOpenSound();
  }

  function closeRecruiterView(){
    if(!recruiterModal)return;
    recruiterModal.classList.remove("open");
    recruiterModal.setAttribute("aria-hidden","true");
    document.body.classList.remove("recruiter-open");
    if(bgmGain&&audioCtx){
      bgmGain.gain.cancelScheduledValues(audioCtx.currentTime);
      bgmGain.gain.linearRampToValueAtTime(.52,audioCtx.currentTime+.18);
    }
    playCloseSound();
  }

  function openFromRecruiter(key){
    closeRecruiterView();
    window.setTimeout(()=>openSection(key),120);
  }

  /* =========================================================
     MODAL / PORTFOLIO CONTENT
  ========================================================= */

  function openSection(key){
    const data=portfolioSections[key];if(!data)return;
    stopGuidedTour();
    setMobileMenu(false,false);
    ensureAudio();
    playOpenSound();
    focusDistrict(key,1.12);
    syncMinimap(key);
    const firstVisit=!visitedSections.has(key);
    visitedSections.add(key);updateExploredUi();
    if(firstVisit){showDiscoveryToast(key);playTourChime();}
    duckMusic(true);
    currentSectionKey=key;currentItemIndex=0;modalSectionIndex.textContent=data.cityIndex;modalSectionTitle.textContent=data.panelTitle;modalSectionSubtitle.textContent=data.panelSubtitle;sliderLabel.textContent=data.panelTitle;
    sectionSlider.min=0;sectionSlider.max=Math.max(0,data.items.length-1);sectionSlider.value=0;sliderTotal.textContent=formatNumber(data.items.length);
    sectionModal.classList.add("open");sectionModal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
    districtDirectory.classList.remove("open");districtDirectory.setAttribute("aria-hidden","true");
    document.querySelectorAll(".section-sidebar-item,.mobile-section-item").forEach(el=>el.classList.toggle("is-active",el.dataset.openSection===key));
    renderCurrentItem();
  }

  function closeSection(){
    stopProjectReplay();
    if(!sectionModal.classList.contains("open"))return;
    playCloseSound();duckMusic(false);
    sectionModal.classList.remove("open");sectionModal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");
    document.querySelectorAll(".section-sidebar-item.is-active,.mobile-section-item.is-active").forEach(el=>el.classList.remove("is-active"));
    syncMinimap(null);
  }

  function navigateItem(direction){
    if(!currentSectionKey)return;playClick();const data=portfolioSections[currentSectionKey];currentItemIndex=(currentItemIndex+direction+data.items.length)%data.items.length;sectionSlider.value=currentItemIndex;renderCurrentItem();
  }

  function renderCurrentItem(){
    if(!currentSectionKey)return;
    if(mobile && sectionContent) sectionContent.scrollTop=0;
    const data=portfolioSections[currentSectionKey],item=data.items[currentItemIndex];sliderCurrent.textContent=formatNumber(currentItemIndex+1);
    if(data.type==="showcase")return renderShowcase(item);if(data.type==="experience")return renderExperience(item);if(data.type==="education")return renderEducation(item);if(data.type==="skills")return renderSkills(item);if(data.type==="research")return renderResearch(item);if(data.type==="about")return renderAbout(item);if(data.type==="contact")return renderContact(item);
  }

  function stopProjectReplay(){
    if(projectReplayTimer){clearInterval(projectReplayTimer);projectReplayTimer=null}
    projectReplayStep=-1;
  }

  function renderEvidenceCards(extras){
    return `<div class="project-evidence"><span class="project-subhead">TECHNICAL EVIDENCE</span><div class="evidence-grid">${extras.evidence.map(([icon,label,text])=>`<article class="evidence-card"><span>${icon}</span><div><small>${label}</small><strong>${text}</strong></div></article>`).join("")}</div></div>`;
  }

  function renderReplay(extras){
    return `<div class="project-tool-panel replay-panel" id="projectReplayPanel" hidden><div class="tool-panel-head"><div><span>SYSTEM REPLAY</span><strong>Watch the logic flow</strong></div><span class="replay-state" id="replayState">READY</span></div><div class="replay-track">${extras.replay.map((step,index)=>`<div class="replay-step" data-replay-step="${index}"><span>${String(index+1).padStart(2,"0")}</span><p>${step}</p></div>`).join("")}</div><div class="replay-progress"><span id="replayProgress"></span></div></div>`;
  }

  function renderBlueprint(extras){
    return `<div class="project-tool-panel blueprint-panel" id="projectBlueprintPanel" hidden><div class="tool-panel-head"><div><span>TECHNICAL BLUEPRINT</span><strong>System architecture</strong></div><span class="blueprint-legend">DATA / DECISION FLOW</span></div><div class="blueprint-flow">${extras.blueprint.map((node,index)=>`<div class="blueprint-node"><span>${String(index+1).padStart(2,"0")}</span><strong>${node}</strong></div>${index<extras.blueprint.length-1?'<span class="blueprint-arrow">→</span>':''}`).join("")}</div></div>`;
  }

  function startProjectReplay(extras){
    stopProjectReplay();
    const panel=$("projectReplayPanel"),state=$("replayState"),progress=$("replayProgress");
    if(!panel)return;
    panel.hidden=false;
    const steps=[...panel.querySelectorAll(".replay-step")];
    const runStep=()=>{
      projectReplayStep++;
      steps.forEach((el,index)=>el.classList.toggle("is-active",index===projectReplayStep));
      if(progress)progress.style.width=`${((projectReplayStep+1)/steps.length)*100}%`;
      if(state)state.textContent=projectReplayStep>=steps.length-1?"COMPLETE":`STEP ${String(projectReplayStep+1).padStart(2,"0")} / ${String(steps.length).padStart(2,"0")}`;
      if(projectReplayStep>=steps.length-1){stopProjectReplay();return}
      if(audioCtx?.state==="running")playHoverTick();
    };
    projectReplayStep=-1;runStep();
    projectReplayTimer=setInterval(runStep,900);
  }

  function bindProjectTools(item){
    const extras=getProjectExtras(item.title);
    const replayButton=$("projectReplayButton");
    const blueprintButton=$("projectBlueprintButton");
    const replayPanel=$("projectReplayPanel");
    const blueprintPanel=$("projectBlueprintPanel");
    replayButton?.addEventListener("click",()=>{
      ensureAudio();
      if(blueprintPanel)blueprintPanel.hidden=true;
      blueprintButton?.classList.remove("is-active");
      replayButton.classList.add("is-active");
      startProjectReplay(extras);
    });
    blueprintButton?.addEventListener("click",()=>{
      stopProjectReplay();
      if(replayPanel)replayPanel.hidden=true;
      replayButton?.classList.remove("is-active");
      const opening=blueprintPanel?.hidden!==false;
      if(blueprintPanel)blueprintPanel.hidden=!opening;
      blueprintButton.classList.toggle("is-active",opening);
      if(audioCtx?.state==="running")playOpenSound();
    });
  }

  function renderShowcase(item){
    stopProjectReplay();
    const extras=getProjectExtras(item.title);
    sectionContent.innerHTML=`<div class="showcase-layout content-enter"><div class="showcase-media"><img src="${item.media}" alt="${item.mediaAlt}" loading="lazy" decoding="async" /><div class="media-overlay"></div><span class="media-label">PROJECT VISUAL // MEDIA FEED</span><div class="media-tech-overlay"><span>LIVE CASE STUDY</span><strong>${extras.blueprint.length} SYSTEM NODES</strong></div></div><div class="showcase-copy"><span class="content-kicker">${item.kicker}</span><h3>${item.title}</h3><p class="content-description">${item.description}</p>${renderMeta(item.meta)}${renderTags(item.tags)}<div class="project-tool-actions"><button type="button" id="projectReplayButton">▶ PLAY SYSTEM REPLAY</button><button type="button" id="projectBlueprintButton">⌘ VIEW SYSTEM</button><a class="archive-link" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.linkLabel}</a></div>${renderEvidenceCards(extras)}</div></div>${renderReplay(extras)}${renderBlueprint(extras)}`;
    bindProjectTools(item);
  }

  function renderExperience(item){sectionContent.innerHTML=`<div class="timeline-record content-enter"><div class="timeline-side"><span class="timeline-year">${item.year}</span><div class="timeline-period">${item.period}</div><div class="timeline-marker"></div></div><div class="record-main"><span class="record-company">${item.company}</span><h3>${item.title}</h3><span class="record-role">${item.period}</span><p class="content-description">${item.description}</p><ul class="record-points">${item.points.map(p=>`<li>${p}</li>`).join("")}</ul>${renderTags(item.tags)}</div></div>`}
  function renderEducation(item){sectionContent.innerHTML=`<div class="education-record content-enter"><div class="visual-card"><span class="visual-card-code">${item.code}</span><div class="visual-symbol">${item.symbol}</div></div><div class="record-main"><span class="content-kicker">${item.kicker}</span><h3>${item.title}</h3><p class="content-description">${item.description}</p>${renderMeta(item.meta)}</div></div>`}
  function renderSkills(item){sectionContent.innerHTML=`<div class="skill-record content-enter"><div class="visual-card"><div class="visual-symbol">${item.symbol}</div></div><div class="record-main"><span class="content-kicker">${item.kicker}</span><h3>${item.title}</h3><p class="content-description">${item.description}</p><div class="skill-list">${item.skills.map(s=>`<span class="skill-pill">${s}</span>`).join("")}</div><div class="used-in"><span>USED IN</span><div class="used-projects">${item.usedIn.map(p=>`<div class="used-project">${p}</div>`).join("")}</div></div></div></div>`}
  function renderResearch(item){sectionContent.innerHTML=`<div class="research-record content-enter"><div class="research-file-number">${item.number}</div><div class="record-main"><span class="content-kicker">${item.kicker}</span><h3>${item.title}</h3><p class="content-description">${item.description}</p><div class="research-citation">${item.citation}</div>${renderTags(item.tags)}</div></div>`}
  function renderAbout(item){sectionContent.innerHTML=`<div class="about-record content-enter"><div class="visual-card"><div class="visual-symbol">${item.symbol}</div></div><div class="record-main"><span class="content-kicker">${item.kicker}</span><h3>${item.title}</h3><p class="content-description">${item.description}</p>${item.meta?renderMeta(item.meta):""}${item.tags?renderTags(item.tags):""}</div></div>`}
  function renderContact(item){const target=item.link.startsWith("mailto:")?"":'target="_blank" rel="noopener noreferrer"';sectionContent.innerHTML=`<div class="contact-record content-enter"><div class="contact-inner"><div class="contact-signal">${item.icon}</div><span class="content-kicker">${item.kicker}</span><h3>${item.title}</h3><p class="content-description">${item.description}</p><div class="contact-value">${item.value}</div><a class="archive-link" href="${item.link}" ${target}>${item.button}</a></div></div>`}
  function renderMeta(meta=[]){return `<div class="content-meta">${meta.map(row=>`<div class="meta-row"><span>${row[0]}</span><strong>${row[1]}</strong></div>`).join("")}</div>`}
  function renderTags(tags=[]){return `<div class="tag-list">${tags.map(tag=>`<span>${tag}</span>`).join("")}</div>`}

  /* =========================================================
     CAMERA / NAVIGATION
  ========================================================= */

  function screenToGround(clientX,clientY,target){
    const p=new THREE.Vector2((clientX/window.innerWidth)*2-1,-(clientY/window.innerHeight)*2+1);
    raycaster.setFromCamera(p,camera);return raycaster.ray.intersectPlane(dragPlane,target);
  }

  function resetCamera(){stopGuidedTour();cameraPanTarget.set(0,0);cameraZoomTarget=1;clampPan()}

  function updateCamera(delta){
    // Mouse-only navigation: moving the pointer into the outer edge zones
    // glides the camera.  Dragging still gives precise panning and the wheel
    // controls zoom. Camera movement is fully mouse-driven.
    if(!coarsePointer && worldEntered && !sectionModal.classList.contains("open") && dragPointerId===null && !pointerOverUi){
      const zoneX=window.innerWidth*EDGE_ZONE;
      const zoneY=window.innerHeight*EDGE_ZONE;
      let edgeX=0,edgeY=0;
      if(latestPointerX<zoneX)edgeX=-(1-latestPointerX/zoneX);
      else if(latestPointerX>window.innerWidth-zoneX)edgeX=(latestPointerX-(window.innerWidth-zoneX))/zoneX;
      if(latestPointerY<zoneY)edgeY=-(1-latestPointerY/zoneY);
      else if(latestPointerY>window.innerHeight-zoneY)edgeY=(latestPointerY-(window.innerHeight-zoneY))/zoneY;

      if(Math.abs(edgeX)>.01 || Math.abs(edgeY)>.01){
        cameraRight.set(1,0,0).applyQuaternion(camera.quaternion);cameraRight.y=0;cameraRight.normalize();
        cameraForward.set(0,0,-1).applyQuaternion(camera.quaternion);cameraForward.y=0;cameraForward.normalize();
        const speed=(mobile?12.5:20.5)*delta/Math.max(.82,cameraZoom);
        cameraPanTarget.x += (cameraRight.x*edgeX + cameraForward.x*(-edgeY))*speed;
        cameraPanTarget.y += (cameraRight.z*edgeX + cameraForward.z*(-edgeY))*speed;
        clampPan();
        raycastDirty=true;
      }
    }

    pointer.x=THREE.MathUtils.lerp(pointer.x,pointerTarget.x,.18);
    pointer.y=THREE.MathUtils.lerp(pointer.y,pointerTarget.y,.18);
    cameraPan.lerp(cameraPanTarget,.21);
    cameraZoom=THREE.MathUtils.lerp(cameraZoom,cameraZoomTarget,.19);
    camera.zoom=cameraZoom;camera.updateProjectionMatrix();

    // Very small parallax keeps the city feeling alive without fighting hover.
    const cinematicDrift=cinematicMode?Math.sin(clock.elapsedTime*.22)*.65:0;
    const parallaxX=mobile?0:pointer.x*.42+cinematicDrift;
    const parallaxZ=mobile?0:pointer.y*-.32+(cinematicMode?Math.cos(clock.elapsedTime*.18)*.45:0);
    camera.position.set(baseCamera.x+cameraPan.x+parallaxX,baseCamera.y,baseCamera.z+cameraPan.y+parallaxZ);
    camera.lookAt(cameraPan.x+parallaxX*.12,0,cameraPan.y+parallaxZ*.12);
    cameraReadout.textContent=`${Math.round(cameraZoom*100)}%`;
  }

  function resizeRenderer(){
    if(!renderer||!camera)return;
    const width=Math.max(1,window.innerWidth);
    const height=Math.max(1,window.innerHeight);
    const aspect=width/height;

    let viewHeight;
    if(width <= 390) viewHeight = aspect < .62 ? 112 : 102;
    else if(width <= 480) viewHeight = aspect < .68 ? 108 : 99;
    else if(width <= 820) viewHeight = aspect < .82 ? 98 : 91;
    else viewHeight = 78;

    let viewWidth=viewHeight*aspect;
    if(aspect>1.8){viewWidth=122;viewHeight=viewWidth/aspect}

    camera.left=-viewWidth/2;
    camera.right=viewWidth/2;
    camera.top=viewHeight/2;
    camera.bottom=-viewHeight/2;
    camera.updateProjectionMatrix();

    renderer.setSize(width,height,false);
    renderer.setPixelRatio(renderPixelRatio);
    raycastDirty=true;
  }

  function adaptMobileQuality(now){
    if(!mobile || reducedMotion) return;
    perfFrames++;
    const elapsed=now-perfWindowStart;
    if(elapsed<2600) return;

    const fps=(perfFrames*1000)/elapsed;
    perfFrames=0;
    perfWindowStart=now;

    if(fps < 25 && renderPixelRatio > PERF.minPixelRatio){
      renderPixelRatio=Math.max(PERF.minPixelRatio,renderPixelRatio-.06);
      renderer.setPixelRatio(renderPixelRatio);
    }else if(fps > 38 && renderPixelRatio < PERF.pixelRatio){
      renderPixelRatio=Math.min(PERF.pixelRatio,renderPixelRatio+.02);
      renderer.setPixelRatio(renderPixelRatio);
    }
  }

  /* =========================================================
     MAIN LOOP
  ========================================================= */

  function animate(now=performance.now()){
    requestAnimationFrame(animate);
    if(!pageVisible)return;

    const sectionOpen=sectionModal.classList.contains("open");
    const recruiterOpen=!!recruiterModal?.classList.contains("open");
    const mobileMenuOpen=!!mobileMenuPanel?.classList.contains("open");
    const uiOverlayOpen=sectionOpen||recruiterOpen||mobileMenuOpen;
    const effectiveFps=(mobile&&uiOverlayOpen)?20:PERF.targetFps;
    const minFrameMs=1000/effectiveFps;
    if(now-lastRenderStamp<minFrameMs)return;
    lastRenderStamp=now;

    const delta=Math.min(clock.getDelta(),.045);
    const elapsed=clock.elapsedTime;

    updateCamera(delta);

    // Pause nonessential world simulation behind large mobile UI and recruiter overlays.
    // The city remains rendered, but actors stop consuming CPU/GPU while obscured.
    if(!(mobile&&uiOverlayOpen) && !recruiterOpen){
      updateTraffic(delta);
      updatePedestrians(delta,elapsed);
      updateAmbient(elapsed,delta);
      updateDistrictHoverMotion();
    }

    if(raycastDirty&&!dragMoved&&!pinching&&worldEntered&&!uiOverlayOpen){
      raycastDirty=false;
      updateRaycast(latestPointerX,latestPointerY);
    }

    if(!(mobile&&uiOverlayOpen)) adaptMobileQuality(now);
    renderer.render(scene,camera);
  }

  /* =========================================================
     LOADING
  ========================================================= */

  function runLoadingSequence(){
    let progress=0;
    const started=performance.now();
    const tick=()=>{
      const elapsed=performance.now()-started;
      progress=Math.min(100,Math.max(progress+14,elapsed/5.5));
      loadingFill.style.width=`${Math.floor(progress)}%`;
      if(progress<100){
        setTimeout(tick,42);
      }else{
        loadingFill.style.width="100%";
        setTimeout(()=>{
          worldEntered=true;
          loadingScreen.classList.add("is-hidden");
          setTimeout(()=>{
            exploreHint.classList.remove("hidden");
            if(mobile){
              if(mobileHintTimer)clearTimeout(mobileHintTimer);
              mobileHintTimer=setTimeout(dismissMobileHint,5200);
            }
          },140);
        },100);
      }
    };
    tick();
  }

  function formatNumber(n){return String(n).padStart(2,"0")}

  /* =========================================================
     INPUT
  ========================================================= */

  window.addEventListener("pointermove",event=>{
    if(tourActive && event.isTrusted) stopGuidedTour();
    if(customCursor){
      customCursor.style.left=`${event.clientX}px`;
      customCursor.style.top=`${event.clientY}px`;
    }
    latestPointerX=event.clientX;latestPointerY=event.clientY;
    pointerTarget.x=(event.clientX/window.innerWidth)*2-1;pointerTarget.y=-(event.clientY/window.innerHeight)*2+1;
    if(coordinateReadout) coordinateReadout.textContent=`X ${String(Math.round(event.clientX)).padStart(3,"0")} // Y ${String(Math.round(event.clientY)).padStart(3,"0")}`;

    if(coarsePointer && activeTouchPointers.has(event.pointerId)){
      activeTouchPointers.set(event.pointerId,{x:event.clientX,y:event.clientY});

      if(pinching && activeTouchPointers.size>=2){
        event.preventDefault();
        const pts=[...activeTouchPointers.values()].slice(0,2);
        const distance=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);
        if(pinchStartDistance>0){
          const scale=distance/pinchStartDistance;
          cameraZoomTarget=THREE.MathUtils.clamp(pinchStartZoom*scale,.78,1.34);
          raycastDirty=true;
        }
        return;
      }
    }

    if(dragPointerId===event.pointerId){
      const dx=event.clientX-dragStartScreenX,dy=event.clientY-dragStartScreenY;
      if(Math.hypot(dx,dy)>(coarsePointer?9:5))dragMoved=true;
      if(screenToGround(event.clientX,event.clientY,dragCurrentWorld)){
        cameraPanTarget.x=dragPanStart.x+(dragStartWorld.x-dragCurrentWorld.x);
        cameraPanTarget.y=dragPanStart.y+(dragStartWorld.z-dragCurrentWorld.z);clampPan();
      }
      customCursor.classList.add("dragging");
      return;
    }

    pointerOverUi=!!event.target.closest(".game-hud,.district-directory,.section-sidebar,.mobile-menu-panel,.mobile-menu-toggle,.mobile-menu-backdrop,.city-minimap,.section-modal,.explore-hint");
    if(!worldEntered||sectionModal.classList.contains("open"))return;
    if(pointerOverUi)return;
    raycastDirty=true;
  },{passive:false});

  window.addEventListener("pointerleave",()=>{pointerTarget.set(0,0);pointerOverUi=false});

  rendererEventSetup();
  function rendererEventSetup(){
    document.addEventListener("pointerdown",event=>{
      if(worldEntered && audioEnabled) ensureAudio();
      if(mobile && event.target.closest("#threeContainer")) dismissMobileHint();
      if(!worldEntered||sectionModal.classList.contains("open"))return;
      if(event.target.closest("button,a,.district-directory,.section-sidebar,.mobile-menu-panel,.mobile-menu-toggle,.mobile-menu-backdrop,.city-minimap,.section-modal"))return;
      if(!event.target.closest("#threeContainer"))return;

      if(coarsePointer){
        activeTouchPointers.set(event.pointerId,{x:event.clientX,y:event.clientY});

        if(activeTouchPointers.size===2){
          const pts=[...activeTouchPointers.values()].slice(0,2);
          pinchStartDistance=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);
          pinchStartZoom=cameraZoomTarget;
          pinching=true;
          dragPointerId=null;
          dragMoved=true;
          clearDistrictHover();
          return;
        }
      }

      if(pinching)return;

      dragPointerId=event.pointerId;
      dragStartScreenX=event.clientX;
      dragStartScreenY=event.clientY;
      dragMoved=false;
      dragPanStart.copy(cameraPanTarget);
      screenToGround(event.clientX,event.clientY,dragStartWorld);

      if(event.target.setPointerCapture){
        try{event.target.setPointerCapture(event.pointerId)}catch(_e){}
      }
    },{passive:true});

    document.addEventListener("pointerup",event=>{
      if(coarsePointer && activeTouchPointers.has(event.pointerId)){
        activeTouchPointers.delete(event.pointerId);
        if(pinching){
          if(activeTouchPointers.size<2){
            pinching=false;
            pinchStartDistance=0;
            dragPointerId=null;
            setTimeout(()=>{dragMoved=false},60);
          }
          return;
        }
      }

      if(dragPointerId!==event.pointerId)return;

      if(!dragMoved){
        const key=getDistrictAt(event.clientX,event.clientY);
        if(key){
          // Desktop gets hover feedback first; touch opens immediately.
          if(!coarsePointer) showDistrictHover(key,event.clientX,event.clientY);
          openSection(key);
        }else{
          clearDistrictHover();
        }
      }

      dragPointerId=null;
      if(customCursor) customCursor.classList.remove("dragging");
      setTimeout(()=>{dragMoved=false},0);
    },{passive:true});

    document.addEventListener("pointercancel",event=>{
      activeTouchPointers.delete(event.pointerId);
      if(activeTouchPointers.size<2)pinching=false;
      if(dragPointerId===event.pointerId){
        dragPointerId=null;
        dragMoved=false;
        if(customCursor)customCursor.classList.remove("dragging");
      }
    },{passive:true});
  }

  if(sectionContent){
    sectionContent.addEventListener("touchstart",event=>{
      if(!mobile || event.touches.length!==1)return;
      if(event.target.closest("button,a,input,.replay-track,.blueprint-flow"))return;
      const touch=event.touches[0];
      mobileSectionSwipeStart={x:touch.clientX,y:touch.clientY,time:performance.now()};
    },{passive:true});
    sectionContent.addEventListener("touchend",event=>{
      if(!mobile || !mobileSectionSwipeStart || !sectionModal.classList.contains("open"))return;
      const touch=event.changedTouches[0];
      const dx=touch.clientX-mobileSectionSwipeStart.x;
      const dy=touch.clientY-mobileSectionSwipeStart.y;
      const elapsed=performance.now()-mobileSectionSwipeStart.time;
      mobileSectionSwipeStart=null;
      if(elapsed<700 && Math.abs(dx)>64 && Math.abs(dx)>Math.abs(dy)*1.35){
        navigateItem(dx<0?1:-1);
      }
    },{passive:true});
    sectionContent.addEventListener("touchcancel",()=>{mobileSectionSwipeStart=null},{passive:true});
  }

  window.addEventListener("wheel",event=>{
    if(tourActive)stopGuidedTour();
    if(!worldEntered||sectionModal.classList.contains("open"))return;
    cameraZoomTarget=THREE.MathUtils.clamp(cameraZoomTarget-event.deltaY*.0008,.78,1.34);
  },{passive:true});


  window.addEventListener("keydown",event=>{
    // Escape is kept only as a conventional close shortcut; city navigation is mouse-only.
    if(event.key==="Escape"){
      if(recruiterModal?.classList.contains("open"))closeRecruiterView();
      else if(sectionModal.classList.contains("open"))closeSection();
      else if(mobileMenuPanel?.classList.contains("open"))setMobileMenu(false);
      else{districtDirectory.classList.remove("open");districtDirectory.setAttribute("aria-hidden","true")}
    }
  });

  sectionClose.addEventListener("click",closeSection);sectionBackdrop.addEventListener("click",closeSection);
  previousItem.addEventListener("click",()=>navigateItem(-1));nextItem.addEventListener("click",()=>navigateItem(1));
  sectionSlider.addEventListener("input",()=>{currentItemIndex=Number(sectionSlider.value);playClick();renderCurrentItem()});

  if(soundToggle){
    soundToggle.addEventListener("click",async event=>{
      event.stopPropagation();
      await setAudioEnabled(!audioEnabled);
    });
  }

  if(volumeSlider){
    volumeSlider.addEventListener("input",async()=>{
      if(!audioEnabled)await setAudioEnabled(true);
      await ensureAudio();setMasterVolume(Number(volumeSlider.value)/100);
    });
  }
  if(timeModeButton)timeModeButton.addEventListener("click",event=>{event.stopPropagation();ensureAudio();cycleTimeMode()});
  recruiterViewButton?.addEventListener("click",event=>{event.stopPropagation();ensureAudio();openRecruiterView()});
  mobileRecruiterViewButton?.addEventListener("click",event=>{event.stopPropagation();ensureAudio();openRecruiterView()});
  recruiterClose?.addEventListener("click",closeRecruiterView);
  recruiterBackdrop?.addEventListener("click",closeRecruiterView);
  document.querySelectorAll("[data-recruiter-section]").forEach(button=>button.addEventListener("click",()=>openFromRecruiter(button.dataset.recruiterSection)));
  if(cinematicButton)cinematicButton.addEventListener("click",event=>{event.stopPropagation();toggleCinematic()});
  if(tourButton)tourButton.addEventListener("click",event=>{event.stopPropagation();startGuidedTour()});

  mobileMenuToggle?.addEventListener("click",async event=>{
    event.stopPropagation();
    if(audioEnabled)await ensureAudio();
    setMobileMenu(!mobileMenuPanel?.classList.contains("open"));
  });
  mobileMenuClose?.addEventListener("click",event=>{event.stopPropagation();setMobileMenu(false)});
  mobileMenuBackdrop?.addEventListener("click",event=>{event.stopPropagation();setMobileMenu(false)});
  document.querySelectorAll("[data-mobile-menu-tab]").forEach(button=>{
    button.addEventListener("click",event=>{
      event.stopPropagation();
      setMobileMenuView(button.dataset.mobileMenuTab||"explore");
      if(audioCtx?.state==="running")playClick();
    });
  });

  mobileSoundToggle?.addEventListener("click",async event=>{
    event.stopPropagation();
    await setAudioEnabled(!audioEnabled);
    syncMobileMenuUi();
  });
  mobileTimeModeButton?.addEventListener("click",async event=>{
    event.stopPropagation();
    await ensureAudio();
    cycleTimeMode();
    syncMobileMenuUi();
  });
  mobileTourButton?.addEventListener("click",async event=>{
    event.stopPropagation();
    setMobileMenu(false,false);
    await startGuidedTour();
    syncMobileMenuUi();
  });
  mobileHomeViewButton?.addEventListener("click",event=>{
    event.stopPropagation();
    playClick();
    resetCamera();
    setMobileMenu(false,false);
  });
  mobileCinematicButton?.addEventListener("click",event=>{
    event.stopPropagation();
    toggleCinematic();
    setMobileMenu(false,false);
    syncMobileMenuUi();
  });

  document.querySelectorAll(".section-sidebar-item").forEach(button=>{
    button.addEventListener("mouseenter",()=>{
      if(sectionModal.classList.contains("open"))return;
      const key=button.dataset.openSection;
      if(activeHoverKey && activeHoverKey!==key)highlightDistrict(activeHoverKey,false);
      activeHoverKey=key;
      highlightDistrict(key,true);
      focusDistrict(key,1.035);
      syncMinimap(key);
      button.classList.add("is-map-hover");
      sectorReadout.textContent=portfolioSections[key]?.cityName||"CENTRAL";
      if(audioCtx?.state==="running")playHoverTick();
    });
    button.addEventListener("mouseleave",()=>{
      if(sectionModal.classList.contains("open"))return;
      const key=button.dataset.openSection;
      highlightDistrict(key,false);
      button.classList.remove("is-map-hover");
      activeHoverKey=null;
      syncMinimap(null);
      sectorReadout.textContent="CENTRAL";
    });
  });

  document.querySelectorAll("[data-map-section]").forEach(button=>{
    button.addEventListener("click",event=>{
      event.stopPropagation();
      ensureAudio();
      const key=button.dataset.mapSection;
      focusFromMinimap(key);
      if(button.closest(".mobile-menu-panel"))setMobileMenu(false,false);
    });
    if(!coarsePointer){
      button.addEventListener("mouseenter",()=>{
        const key=button.dataset.mapSection;
        if(key)focusFromMinimap(key);
      });
    }
  });

  document.addEventListener("click",event=>{
    const target=event.target.closest("button,a.archive-link");
    if(!target || target===soundToggle || target===sectionClose || target===previousItem || target===nextItem)return;
    if(audioCtx?.state==="running")playClick();
  });

  directoryToggle.addEventListener("click",()=>{const open=districtDirectory.classList.toggle("open");districtDirectory.setAttribute("aria-hidden",open?"false":"true")});
  directoryClose.addEventListener("click",()=>{districtDirectory.classList.remove("open");districtDirectory.setAttribute("aria-hidden","true")});
  document.querySelectorAll("[data-open-section]").forEach(button=>button.addEventListener("click",()=>{
    if(button.closest(".mobile-menu-panel"))setMobileMenu(false,false);
    openSection(button.dataset.openSection);
  }));
  homeViewButton?.addEventListener("click",()=>{playClick();resetCamera()});

  document.addEventListener("visibilitychange",()=>{
    pageVisible=!document.hidden;
    if(pageVisible){clock.getDelta();if(audioEnabled&&audioCtx?.state==="suspended")audioCtx.resume().catch(()=>{});}
    else if(audioCtx?.state==="running")audioCtx.suspend().catch(()=>{});
  });
  window.addEventListener("resize",resizeRenderer,{passive:true});
  window.addEventListener("orientationchange",()=>setTimeout(resizeRenderer,120),{passive:true});
  if(window.visualViewport) window.visualViewport.addEventListener("resize",resizeRenderer,{passive:true});

  setMasterVolume(.88);updateExploredUi();syncMobileMenuUi();setMobileMenuView("explore");
  initWorld();
  runLoadingSequence();
})();
