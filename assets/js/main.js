/* =========================================================
   RITHVIK CITY — GitHub Pages build
   Uses the global THREE object loaded in index.html.
========================================================= */

(() => {
  "use strict";

  if (!window.THREE) {
    document.getElementById("loadingStatus").textContent =
      "Three.js could not be loaded. Check your internet connection.";
    return;
  }

  const $ = (id) => document.getElementById(id);

  const threeContainer = $("threeContainer");
  const loadingScreen = $("loadingScreen");
  const loadingFill = $("loadingFill");
  const loadingPercent = $("loadingPercent");
  const loadingStatus = $("loadingStatus");
  const enterCityButton = $("enterCityButton");

  const districtHoverCard = $("districtHoverCard");
  const hoverIndex = $("hoverIndex");
  const hoverTitle = $("hoverTitle");
  const hoverDescription = $("hoverDescription");
  const enterSectionButton = $("enterSectionButton");
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
          description: "A reinforcement-learning experimentation environment built in Project Malmo. The system uses a baseline DQN with replay memory, a target network and epsilon-greedy exploration while supporting human-in-the-loop and imitation-learning research.",
          media: "./images/minecraft.png",
          mediaAlt: "Minecraft reinforcement learning project",
          meta: [
            ["SYSTEM", "Deep Q Network with replay buffer, target network and epsilon-greedy exploration."],
            ["PURPOSE", "Assistive-agent and human-guided learning experiments."],
            ["ENVIRONMENT", "Microsoft Project Malmo / Minecraft."]
          ],
          tags: ["Python","DQN","Reinforcement Learning","Project Malmo","Imitation Learning"],
          link: "https://github.com/Gamedog0319/ImitationLearning",
          linkLabel: "OPEN GITHUB ↗"
        },
        {
          kicker: "PROJECT 02 // VR + AI",
          title: "VR Neck Exoskeleton",
          description: "A wearable neck-assistance prototype connected to a Unity VR environment. The system explores adaptive controller selection and personalized assistance using online bandit algorithms.",
          media: "./images/vr-neck.png",
          mediaAlt: "VR neck exoskeleton",
          meta: [
            ["PROBLEM", "Fixed assistance policies do not adapt to individual comfort or behavior."],
            ["SYSTEM", "Unity integration, wearable hardware and adaptive controller selection."],
            ["AI", "Contextual and non-contextual bandit experimentation."]
          ],
          tags: ["Unity","VR","Bandits","Adaptive Systems","Hardware"],
          link: "https://github.com/aria-lab-code/vr-exoskeleton/tree/master/vr_exoskeleton",
          linkLabel: "OPEN PROJECT ↗"
        },
        {
          kicker: "PROJECT 03 // VR",
          title: "Indonesian VR History Shop Sim",
          description: "An interactive VR history-shop experience designed around artifact interaction, environmental storytelling and smooth standalone VR performance.",
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
          description: "An Unreal Engine FPS jam project featuring weapon mechanics, damage systems, animation setup and gameplay-focused interaction systems.",
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
          description: "A cricket simulation built in Unity using computer-vision gesture batting, custom stadium assets and physics-driven ball behavior.",
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
          description: "An interactive Unity molecular-visualization system for mixed-reality research workflows, including real-time manipulation and nanoparticle orientation exploration.",
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
          description: "Designed and prototyped a wearable VR neck exoskeleton with adaptive controller personalization, connecting real hardware, immersive VR and online learning.",
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
          description: "Built an assistive reinforcement-learning agent in Project Malmo for navigation and resource-collection tasks using Deep Q Learning.",
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
          description: "Worked with Unreal Engine Learning Agents, NPC perception, pathfinding and behavior systems in battle-simulation environments at Zen Technologies.",
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

  const COLORS = {
    red: 0xff2f36,
    cyan: 0x5de7ff,
    concrete: 0x17191f,
    concreteLight: 0x242833,
    road: 0x07080b,
    ground: 0x0d1012
  };

  const districtConfigs = [
    {key:"projects",x:0,z:0,width:23,depth:18,accent:COLORS.red},
    {key:"featured",x:-28,z:-1,width:19,depth:17,accent:0xff5d72},
    {key:"experience",x:28,z:-1,width:19,depth:18,accent:COLORS.cyan},
    {key:"education",x:0,z:25,width:22,depth:15,accent:0x7f9cff},
    {key:"research",x:-28,z:24,width:19,depth:16,accent:0xad78ff},
    {key:"skills",x:28,z:24,width:19,depth:16,accent:0x53e6c4},
    {key:"about",x:-16,z:-25,width:21,depth:15,accent:COLORS.red},
    {key:"contact",x:17,z:-25,width:21,depth:15,accent:0xff764d}
  ];

  let scene, camera, renderer, raycaster;
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const clock = new THREE.Clock();
  const interactiveDistricts = [];
  const districtVisuals = new Map();
  const animatedVehicles = [];
  const animatedElements = [];

  let activeHoverKey = null;
  let currentSectionKey = null;
  let currentItemIndex = 0;
  let hoverCardLocked = false;
  let worldEntered = false;

  function initWorld(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020306);
    scene.fog = new THREE.FogExp2(0x020306,0.012);

    camera = new THREE.OrthographicCamera(-50,50,40,-40,0.1,300);
    camera.position.set(55,67,61);
    camera.lookAt(0,0,0);

    renderer = new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    threeContainer.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();

    addLighting();
    createGround();
    createRoadNetwork();
    createCityBase();
    createDistricts();
    createStreetLights();
    createVehicles();
    createAtmosphere();
    resizeRenderer();
    animate();
  }

  function addLighting(){
    scene.add(new THREE.HemisphereLight(0x5c78a8,0x080609,1.5));
    scene.add(new THREE.AmbientLight(0xffffff,0.45));

    const moon = new THREE.DirectionalLight(0x99b8ff,3.4);
    moon.position.set(-35,55,30);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048,2048);
    moon.shadow.camera.left = -80;
    moon.shadow.camera.right = 80;
    moon.shadow.camera.top = 80;
    moon.shadow.camera.bottom = -80;
    scene.add(moon);

    const redLight = new THREE.PointLight(COLORS.red,40,65,2);
    redLight.position.set(0,12,2);
    scene.add(redLight);

    const cyanLight = new THREE.PointLight(COLORS.cyan,25,50,2);
    cyanLight.position.set(26,12,22);
    scene.add(cyanLight);
  }

  function createGround(){
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(110,82),
      new THREE.MeshStandardMaterial({color:COLORS.ground,roughness:.93,metalness:.05})
    );
    ground.rotation.x = -Math.PI/2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(110,55,0x252932,0x17191e);
    grid.position.y = .012;
    grid.material.opacity = .18;
    grid.material.transparent = true;
    scene.add(grid);
  }

  function createCityBase(){
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(108,.35,80),
      new THREE.MeshStandardMaterial({color:0x101216,roughness:.7,metalness:.25})
    );
    base.position.y = -.24;
    base.receiveShadow = true;
    scene.add(base);
  }

  function createRoadNetwork(){
    [
      [0,.03,0,9,82],
      [0,.035,0,110,8],
      [-27,.04,0,6,82],
      [27,.04,0,6,82],
      [0,.045,23,110,5],
      [0,.045,-23,110,5]
    ].forEach(v => createRoad(...v));

    const lineMaterial = new THREE.MeshBasicMaterial({color:0x87686a});
    for(let z=-38;z<=38;z+=5){
      const marker = new THREE.Mesh(new THREE.PlaneGeometry(.1,2.1),lineMaterial);
      marker.rotation.x = -Math.PI/2;
      marker.position.set(0,.06,z);
      scene.add(marker);
    }
    for(let x=-50;x<=50;x+=5){
      const marker = new THREE.Mesh(new THREE.PlaneGeometry(2.1,.1),lineMaterial);
      marker.rotation.x = -Math.PI/2;
      marker.position.set(x,.06,0);
      scene.add(marker);
    }
  }

  function createRoad(x,y,z,width,depth){
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(width,depth),
      new THREE.MeshStandardMaterial({color:COLORS.road,roughness:.76,metalness:.12})
    );
    road.rotation.x = -Math.PI/2;
    road.position.set(x,y,z);
    road.receiveShadow = true;
    scene.add(road);
  }

  function createDistricts(){
    districtConfigs.forEach(config => {
      const district = new THREE.Group();
      district.position.set(config.x,0,config.z);
      scene.add(district);

      const pad = new THREE.Mesh(
        new THREE.PlaneGeometry(config.width,config.depth),
        new THREE.MeshStandardMaterial({
          color:config.accent,emissive:config.accent,emissiveIntensity:.08,
          transparent:true,opacity:.055,roughness:.45,metalness:.35,depthWrite:false
        })
      );
      pad.rotation.x = -Math.PI/2;
      pad.position.y = .075;
      district.add(pad);

      const points = [
        new THREE.Vector3(-config.width/2,.13,-config.depth/2),
        new THREE.Vector3(config.width/2,.13,-config.depth/2),
        new THREE.Vector3(config.width/2,.13,config.depth/2),
        new THREE.Vector3(-config.width/2,.13,config.depth/2)
      ];
      const border = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({color:config.accent,transparent:true,opacity:0})
      );
      district.add(border);

      district.add(createDistrictArchitecture(config.key,config.accent));

      const hitbox = new THREE.Mesh(
        new THREE.BoxGeometry(config.width,20,config.depth),
        new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false})
      );
      hitbox.position.y = 10;
      hitbox.userData.section = config.key;
      district.add(hitbox);
      interactiveDistricts.push(hitbox);

      districtVisuals.set(config.key,{root:district,pad,border,config});
    });
  }

  function createDistrictArchitecture(key,accent){
    const group = new THREE.Group();

    if(key==="projects"){
      group.add(createBuilding(0,0,6,6,18,accent));
      [[-7,-5,4,4,8],[7,-5,4,4,11],[-7,5,4,4,10],[7,5,4,4,7],[0,6,4.5,3.5,9]]
        .forEach(b=>group.add(createBuilding(...b,accent)));
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(2.8,2.8,.25,32),new THREE.MeshBasicMaterial({color:accent}));
      crown.position.y = 18.65;
      group.add(crown);
    }

    if(key==="featured"){
      [[-4.7,0,6,6,12],[4.7,-3.3,5,5,8.5],[4.7,4,5,5,8.5]]
        .forEach(b=>group.add(createBuilding(...b,accent)));
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(8,.45,1.1),new THREE.MeshStandardMaterial({color:0x252a31,metalness:.65,roughness:.28}));
      bridge.position.set(0,5,0);
      bridge.castShadow = true;
      group.add(bridge);
    }

    if(key==="experience"){
      [[-5,-4,4.4,4.4,18],[4.8,-4,4,4,14],[-4,4.5,4,4,12],[4.5,4.5,5,5,20]]
        .forEach(b=>group.add(createBuilding(...b,accent)));
    }

    if(key==="education"){
      group.add(createBuilding(0,1,10,6,6,accent,0x22252d));
      group.add(createBuilding(-6,-4,5,5,4,accent));
      group.add(createBuilding(6,-4,5,5,4,accent));
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(2.3,24,16,0,Math.PI*2,0,Math.PI/2),
        new THREE.MeshStandardMaterial({color:0x1c2635,emissive:accent,emissiveIntensity:.14,metalness:.7,roughness:.2})
      );
      dome.position.set(0,6,1);
      group.add(dome);
    }

    if(key==="research"){
      group.add(createBuilding(0,1,8,7,5,accent,0x181b22));
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(3.3,28,18,0,Math.PI*2,0,Math.PI/2),
        new THREE.MeshStandardMaterial({color:0x171520,emissive:accent,emissiveIntensity:.2,transparent:true,opacity:.95,metalness:.6,roughness:.22})
      );
      dome.position.set(0,5,1);
      group.add(dome);
      for(let i=0;i<3;i++){
        const pod = new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.4,2,20),new THREE.MeshStandardMaterial({color:0x242735,emissive:accent,emissiveIntensity:.09}));
        pod.position.set(-5+i*5,1,-5);
        pod.castShadow = true;
        group.add(pod);
      }
    }

    if(key==="skills"){
      [[-4.5,-4,4,4,6],[4.5,-4,4,4,8],[-4.5,4,4,4,10],[4.5,4,4,4,12]]
        .forEach(b=>group.add(createBuilding(...b,accent)));
      const core = new THREE.Mesh(
        new THREE.OctahedronGeometry(2.1),
        new THREE.MeshStandardMaterial({color:accent,emissive:accent,emissiveIntensity:1.6,metalness:.5,roughness:.2})
      );
      core.position.y = 5;
      group.add(core);
      animatedElements.push({object:core,type:"rotate",speed:.4});
    }

    if(key==="about"){
      group.add(createBuilding(0,0,9,8,7,accent,0x1d1e23));
      const upper = createBuilding(1.8,-.5,4,4,5,accent,0x24262c);
      upper.position.y = 6.7;
      group.add(upper);
      addTrees(group,[[-7,-4],[-7,4],[7,-4],[7,4]]);
    }

    if(key==="contact"){
      group.add(createBuilding(0,0,7,7,5,accent));
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(.22,.4,13,12),new THREE.MeshStandardMaterial({color:0x34373f,metalness:.75,roughness:.28}));
      mast.position.y = 11;
      mast.castShadow = true;
      group.add(mast);

      for(let i=0;i<3;i++){
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.8+i*1.1,.07,8,48),
          new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.5-i*.1})
        );
        ring.rotation.x = Math.PI/2;
        ring.position.y = 17;
        group.add(ring);
        animatedElements.push({object:ring,type:"signal",offset:i*.7});
      }
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(.35,16,16),new THREE.MeshBasicMaterial({color:accent}));
      beacon.position.y = 17;
      group.add(beacon);
    }

    return group;
  }

  function createBuilding(x=0,z=0,width=4,depth=4,height=8,accent=COLORS.red,color=COLORS.concrete){
    const group = new THREE.Group();
    group.position.set(x,0,z);

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(width,height,depth),
      new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.35})
    );
    body.position.y = height/2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const windowMaterial = new THREE.MeshStandardMaterial({color:accent,emissive:accent,emissiveIntensity:2.4,roughness:.2,metalness:.15});
    const floors = Math.max(2,Math.floor(height/2));
    for(let floor=0;floor<floors;floor++){
      const y = 1.2+floor*1.8;
      if(y>height-.6) break;
      const front = new THREE.Mesh(new THREE.BoxGeometry(width*.62,.16,.08),windowMaterial);
      front.position.set(0,y,depth/2+.045);
      group.add(front);
      const back = front.clone();
      back.position.z = -depth/2-.045;
      group.add(back);
    }

    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(width*.5,.5,depth*.5),
      new THREE.MeshStandardMaterial({color:0x282b33,metalness:.55,roughness:.35})
    );
    roof.position.y = height+.25;
    group.add(roof);

    return group;
  }

  function addTrees(group,locations){
    locations.forEach(([x,z])=>{
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.16,.22,1.5,8),new THREE.MeshStandardMaterial({color:0x3a2720}));
      trunk.position.y = .75;
      tree.add(trunk);
      const leaves = new THREE.Mesh(new THREE.ConeGeometry(1,2.8,9),new THREE.MeshStandardMaterial({color:0x18382d,roughness:.9}));
      leaves.position.y = 2.35;
      tree.add(leaves);
      tree.position.set(x,0,z);
      group.add(tree);
    });
  }

  function createStreetLights(){
    const positions = [];
    for(let x=-48;x<=48;x+=8) positions.push([x,-5],[x,5]);
    for(let z=-36;z<=36;z+=8) positions.push([-5,z],[5,z]);

    positions.forEach((loc,index)=>{
      const g = new THREE.Group();
      g.position.set(loc[0],0,loc[1]);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(.04,.06,2.5,8),new THREE.MeshStandardMaterial({color:0x41434a,metalness:.8}));
      pole.position.y = 1.25;
      g.add(pole);
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(.11,10,10),new THREE.MeshBasicMaterial({color:index%5===0?COLORS.red:0xd8e9ff}));
      lamp.position.y = 2.55;
      g.add(lamp);
      scene.add(g);
    });
  }

  function createVehicles(){
    for(let i=0;i<7;i++){
      const car = new THREE.Mesh(
        new THREE.BoxGeometry(1.3,.35,.65),
        new THREE.MeshStandardMaterial({color:i%2===0?0x30333b:0x18191e,metalness:.65,roughness:.28,emissive:i%3===0?0x300006:0})
      );
      car.position.set(-45+i*13,.38,i%2===0?-1.9:1.9);
      car.castShadow = true;
      scene.add(car);
      animatedVehicles.push({object:car,axis:"x",speed:4+Math.random()*2,direction:i%2===0?1:-1});
    }

    for(let i=0;i<5;i++){
      const car = new THREE.Mesh(
        new THREE.BoxGeometry(.65,.35,1.3),
        new THREE.MeshStandardMaterial({color:0x272a31,metalness:.65,roughness:.28})
      );
      car.position.set(i%2===0?-1.9:1.9,.38,-35+i*15);
      scene.add(car);
      animatedVehicles.push({object:car,axis:"z",speed:3+Math.random()*2,direction:i%2===0?1:-1});
    }
  }

  function createAtmosphere(){
    const particles = 550;
    const positions = new Float32Array(particles*3);
    for(let i=0;i<particles;i++){
      positions[i*3]=(Math.random()-.5)*120;
      positions[i*3+1]=Math.random()*35+4;
      positions[i*3+2]=(Math.random()-.5)*95;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
    scene.add(new THREE.Points(
      geometry,
      new THREE.PointsMaterial({color:0x9eb7d8,size:.08,transparent:true,opacity:.35})
    ));
  }

  function updateRaycast(clientX,clientY){
    pointer.x = (clientX/window.innerWidth)*2-1;
    pointer.y = -(clientY/window.innerHeight)*2+1;
    raycaster.setFromCamera(pointer,camera);

    const intersections = raycaster.intersectObjects(interactiveDistricts,false);
    if(intersections.length){
      const key = intersections[0].object.userData.section;
      showDistrictHover(key,clientX,clientY);
    }else if(!hoverCardLocked){
      clearDistrictHover();
    }
  }

  function showDistrictHover(key,mouseX,mouseY){
    const data = portfolioSections[key];
    if(!data) return;

    if(activeHoverKey!==key){
      highlightDistrict(activeHoverKey,false);
      highlightDistrict(key,true);
      activeHoverKey = key;
    }

    hoverIndex.textContent = data.cityIndex;
    hoverTitle.textContent = data.cityName;
    hoverDescription.textContent = data.cityDescription;
    sectorReadout.textContent = data.cityName;

    positionHoverCard(mouseX,mouseY);
    districtHoverCard.classList.add("visible");
    districtHoverCard.setAttribute("aria-hidden","false");
    customCursor.classList.add("active");
    exploreHint.classList.add("hidden");
  }

  function positionHoverCard(x,y){
    if(window.innerWidth<=700) return;
    const width=290,height=170;
    let left=x+28,top=y-35;
    if(left+width>window.innerWidth-20) left=x-width-28;
    if(top+height>window.innerHeight-20) top=window.innerHeight-height-20;
    if(top<95) top=95;
    districtHoverCard.style.left=`${left}px`;
    districtHoverCard.style.top=`${top}px`;
  }

  function clearDistrictHover(){
    if(activeHoverKey) highlightDistrict(activeHoverKey,false);
    activeHoverKey=null;
    districtHoverCard.classList.remove("visible");
    districtHoverCard.setAttribute("aria-hidden","true");
    sectorReadout.textContent="CENTRAL";
    customCursor.classList.remove("active");
  }

  function highlightDistrict(key,active){
    if(!key||!districtVisuals.has(key)) return;
    const visual=districtVisuals.get(key);
    visual.pad.material.opacity=active?.24:.055;
    visual.pad.material.emissiveIntensity=active?.5:.08;
    visual.border.material.opacity=active?.9:0;
  }

  function openSection(key){
    const data=portfolioSections[key];
    if(!data) return;

    currentSectionKey=key;
    currentItemIndex=0;
    modalSectionIndex.textContent=data.cityIndex;
    modalSectionTitle.textContent=data.panelTitle;
    modalSectionSubtitle.textContent=data.panelSubtitle;
    sliderLabel.textContent=data.panelTitle;
    sectionSlider.min=0;
    sectionSlider.max=Math.max(0,data.items.length-1);
    sectionSlider.value=0;
    sliderTotal.textContent=formatNumber(data.items.length);

    sectionModal.classList.add("open");
    sectionModal.setAttribute("aria-hidden","false");
    districtDirectory.classList.remove("open");
    districtDirectory.setAttribute("aria-hidden","true");
    renderCurrentItem();
  }

  function closeSection(){
    sectionModal.classList.remove("open");
    sectionModal.setAttribute("aria-hidden","true");
  }

  function navigateItem(direction){
    if(!currentSectionKey) return;
    const data=portfolioSections[currentSectionKey];
    currentItemIndex=(currentItemIndex+direction+data.items.length)%data.items.length;
    sectionSlider.value=currentItemIndex;
    renderCurrentItem();
  }

  function renderCurrentItem(){
    if(!currentSectionKey) return;
    const data=portfolioSections[currentSectionKey];
    const item=data.items[currentItemIndex];
    sliderCurrent.textContent=formatNumber(currentItemIndex+1);

    if(data.type==="showcase") return renderShowcase(item);
    if(data.type==="experience") return renderExperience(item);
    if(data.type==="education") return renderEducation(item);
    if(data.type==="skills") return renderSkills(item);
    if(data.type==="research") return renderResearch(item);
    if(data.type==="about") return renderAbout(item);
    if(data.type==="contact") return renderContact(item);
  }

  function renderShowcase(item){
    sectionContent.innerHTML=`
      <div class="showcase-layout content-enter">
        <div class="showcase-media">
          <img src="${item.media}" alt="${item.mediaAlt}" />
          <div class="media-overlay"></div>
          <span class="media-label">PROJECT VISUAL // MEDIA FEED</span>
        </div>
        <div class="showcase-copy">
          <span class="content-kicker">${item.kicker}</span>
          <h3>${item.title}</h3>
          <p class="content-description">${item.description}</p>
          ${renderMeta(item.meta)}
          ${renderTags(item.tags)}
          <a class="archive-link" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.linkLabel}</a>
        </div>
      </div>`;
  }

  function renderExperience(item){
    sectionContent.innerHTML=`
      <div class="timeline-record content-enter">
        <div class="timeline-side">
          <span class="timeline-year">${item.year}</span>
          <div class="timeline-period">${item.period}</div>
          <div class="timeline-marker"></div>
        </div>
        <div class="record-main">
          <span class="record-company">${item.company}</span>
          <h3>${item.title}</h3>
          <span class="record-role">${item.period}</span>
          <p class="content-description">${item.description}</p>
          <ul class="record-points">${item.points.map(p=>`<li>${p}</li>`).join("")}</ul>
          ${renderTags(item.tags)}
        </div>
      </div>`;
  }

  function renderEducation(item){
    sectionContent.innerHTML=`
      <div class="education-record content-enter">
        <div class="visual-card">
          <span class="visual-card-code">${item.code}</span>
          <div class="visual-symbol">${item.symbol}</div>
        </div>
        <div class="record-main">
          <span class="content-kicker">${item.kicker}</span>
          <h3>${item.title}</h3>
          <p class="content-description">${item.description}</p>
          ${renderMeta(item.meta)}
        </div>
      </div>`;
  }

  function renderSkills(item){
    sectionContent.innerHTML=`
      <div class="skill-record content-enter">
        <div class="visual-card"><div class="visual-symbol">${item.symbol}</div></div>
        <div class="record-main">
          <span class="content-kicker">${item.kicker}</span>
          <h3>${item.title}</h3>
          <p class="content-description">${item.description}</p>
          <div class="skill-list">${item.skills.map(s=>`<span class="skill-pill">${s}</span>`).join("")}</div>
          <div class="used-in"><span>USED IN</span><div class="used-projects">${item.usedIn.map(p=>`<div class="used-project">${p}</div>`).join("")}</div></div>
        </div>
      </div>`;
  }

  function renderResearch(item){
    sectionContent.innerHTML=`
      <div class="research-record content-enter">
        <div class="research-file-number">${item.number}</div>
        <div class="record-main">
          <span class="content-kicker">${item.kicker}</span>
          <h3>${item.title}</h3>
          <p class="content-description">${item.description}</p>
          <div class="research-citation">${item.citation}</div>
          ${renderTags(item.tags)}
        </div>
      </div>`;
  }

  function renderAbout(item){
    sectionContent.innerHTML=`
      <div class="about-record content-enter">
        <div class="visual-card"><div class="visual-symbol">${item.symbol}</div></div>
        <div class="record-main">
          <span class="content-kicker">${item.kicker}</span>
          <h3>${item.title}</h3>
          <p class="content-description">${item.description}</p>
          ${item.meta?renderMeta(item.meta):""}
          ${item.tags?renderTags(item.tags):""}
        </div>
      </div>`;
  }

  function renderContact(item){
    const target=item.link.startsWith("mailto:")?"":'target="_blank" rel="noopener noreferrer"';
    sectionContent.innerHTML=`
      <div class="contact-record content-enter">
        <div class="contact-inner">
          <div class="contact-signal">${item.icon}</div>
          <span class="content-kicker">${item.kicker}</span>
          <h3>${item.title}</h3>
          <p class="content-description">${item.description}</p>
          <div class="contact-value">${item.value}</div>
          <a class="archive-link" href="${item.link}" ${target}>${item.button}</a>
        </div>
      </div>`;
  }

  function renderMeta(meta=[]){
    return `<div class="content-meta">${meta.map(row=>`
      <div class="meta-row"><span>${row[0]}</span><strong>${row[1]}</strong></div>`).join("")}</div>`;
  }

  function renderTags(tags=[]){
    return `<div class="tag-list">${tags.map(tag=>`<span>${tag}</span>`).join("")}</div>`;
  }

  function updateCamera(){
    pointer.x=THREE.MathUtils.lerp(pointer.x,pointerTarget.x,.035);
    pointer.y=THREE.MathUtils.lerp(pointer.y,pointerTarget.y,.035);

    camera.position.x=THREE.MathUtils.lerp(camera.position.x,55+pointer.x*2.7,.025);
    camera.position.y=THREE.MathUtils.lerp(camera.position.y,67+pointer.y*1.1,.025);
    camera.position.z=THREE.MathUtils.lerp(camera.position.z,61+pointer.y*2.4,.025);
    camera.lookAt(pointer.x*1.5,0,pointer.y*-1.2);
  }

  function updateVehicles(delta){
    animatedVehicles.forEach(v=>{
      v.object.position[v.axis]+=v.speed*v.direction*delta;
      if(v.axis==="x"){
        if(v.object.position.x>53) v.object.position.x=-53;
        if(v.object.position.x<-53) v.object.position.x=53;
      }else{
        if(v.object.position.z>39) v.object.position.z=-39;
        if(v.object.position.z<-39) v.object.position.z=39;
      }
    });
  }

  function updateSpecialAnimations(elapsed,delta){
    animatedElements.forEach(el=>{
      if(el.type==="rotate"){
        el.object.rotation.y+=delta*el.speed;
        el.object.rotation.x+=delta*el.speed*.45;
      }
      if(el.type==="signal"){
        const pulse=(Math.sin(elapsed*2+el.offset)+1)/2;
        el.object.scale.setScalar(.95+pulse*.1);
        el.object.material.opacity=.17+pulse*.42;
      }
    });
  }

  function resizeRenderer(){
    if(!renderer||!camera) return;
    const width=window.innerWidth,height=window.innerHeight,aspect=width/height;
    let viewHeight=width<700?88:69;
    let viewWidth=viewHeight*aspect;
    if(aspect>1.75){viewWidth=110;viewHeight=viewWidth/aspect}
    camera.left=-viewWidth/2;
    camera.right=viewWidth/2;
    camera.top=viewHeight/2;
    camera.bottom=-viewHeight/2;
    camera.updateProjectionMatrix();
    renderer.setSize(width,height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  }

  function animate(){
    requestAnimationFrame(animate);
    const delta=clock.getDelta();
    const elapsed=clock.elapsedTime;
    updateCamera();
    updateVehicles(delta);
    updateSpecialAnimations(elapsed,delta);
    renderer.render(scene,camera);
  }

  const loadingPhases=[
    [15,"Initializing city kernel..."],
    [33,"Loading architecture..."],
    [52,"Activating navigation grid..."],
    [68,"Connecting district archives..."],
    [82,"Establishing communication array..."],
    [94,"Calibrating tactical camera..."],
    [100,"City simulation ready."]
  ];

  function runLoadingSequence(){
    let progress=0;
    const tick=()=>{
      progress+=progress<70?Math.random()*9:Math.random()*4;
      progress=Math.min(100,progress);
      const rounded=Math.floor(progress);
      loadingFill.style.width=`${rounded}%`;
      loadingPercent.textContent=`${rounded}%`;
      const phase=loadingPhases.find(([max])=>rounded<=max);
      if(phase) loadingStatus.textContent=phase[1];

      if(rounded<100){
        setTimeout(tick,90+Math.random()*100);
      }else{
        loadingFill.style.width="100%";
        loadingPercent.textContent="100%";
        enterCityButton.disabled=false;
        enterCityButton.classList.add("ready");
      }
    };
    tick();
  }

  function formatNumber(n){return String(n).padStart(2,"0")}

  window.addEventListener("pointermove",event=>{
    customCursor.style.left=`${event.clientX}px`;
    customCursor.style.top=`${event.clientY}px`;

    pointerTarget.x=(event.clientX/window.innerWidth)*2-1;
    pointerTarget.y=-(event.clientY/window.innerHeight)*2+1;

    coordinateReadout.textContent=`X ${String(Math.round(event.clientX)).padStart(3,"0")} // Y ${String(Math.round(event.clientY)).padStart(3,"0")}`;

    if(!worldEntered||sectionModal.classList.contains("open")) return;
    if(event.target.closest(".district-hover-card,.game-hud,.district-directory,.section-modal")) return;
    updateRaycast(event.clientX,event.clientY);
  });

  document.addEventListener("pointerdown",event=>{
    if(!worldEntered||sectionModal.classList.contains("open")) return;
    if(event.target.closest("button,a,.district-directory,.section-modal")) return;
    updateRaycast(event.clientX,event.clientY);
  });

  districtHoverCard.addEventListener("mouseenter",()=>hoverCardLocked=true);
  districtHoverCard.addEventListener("mouseleave",()=>hoverCardLocked=false);

  enterSectionButton.addEventListener("click",()=>{if(activeHoverKey) openSection(activeHoverKey)});
  sectionClose.addEventListener("click",closeSection);
  sectionBackdrop.addEventListener("click",closeSection);
  previousItem.addEventListener("click",()=>navigateItem(-1));
  nextItem.addEventListener("click",()=>navigateItem(1));
  sectionSlider.addEventListener("input",()=>{
    currentItemIndex=Number(sectionSlider.value);
    renderCurrentItem();
  });

  directoryToggle.addEventListener("click",()=>{
    const open=districtDirectory.classList.toggle("open");
    districtDirectory.setAttribute("aria-hidden",open?"false":"true");
  });
  directoryClose.addEventListener("click",()=>{
    districtDirectory.classList.remove("open");
    districtDirectory.setAttribute("aria-hidden","true");
  });

  document.querySelectorAll("[data-open-section]").forEach(button=>{
    button.addEventListener("click",()=>openSection(button.dataset.openSection));
  });

  enterCityButton.addEventListener("click",()=>{
    worldEntered=true;
    loadingScreen.classList.add("is-hidden");
    setTimeout(()=>exploreHint.classList.remove("hidden"),500);
  });

  window.addEventListener("keydown",event=>{
    if(event.key==="Escape"){
      if(sectionModal.classList.contains("open")) closeSection();
      else districtDirectory.classList.remove("open");
    }
    if(sectionModal.classList.contains("open")){
      if(event.key==="ArrowRight") navigateItem(1);
      if(event.key==="ArrowLeft") navigateItem(-1);
    }
    if(event.key.toLowerCase()==="m"&&!sectionModal.classList.contains("open")) directoryToggle.click();
  });

  window.addEventListener("resize",resizeRenderer);

  initWorld();
  runLoadingSequence();
})();
