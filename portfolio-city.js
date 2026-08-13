import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";


/* ==========================================================
   DOM
========================================================== */

const threeContainer =
  document.getElementById("threeContainer");

const loadingScreen =
  document.getElementById("loadingScreen");

const loadingFill =
  document.getElementById("loadingFill");

const loadingPercent =
  document.getElementById("loadingPercent");

const loadingStatus =
  document.getElementById("loadingStatus");

const enterCityButton =
  document.getElementById("enterCityButton");

const districtHoverCard =
  document.getElementById("districtHoverCard");

const hoverIndex =
  document.getElementById("hoverIndex");

const hoverTitle =
  document.getElementById("hoverTitle");

const hoverDescription =
  document.getElementById("hoverDescription");

const enterSectionButton =
  document.getElementById("enterSectionButton");

const customCursor =
  document.getElementById("customCursor");

const exploreHint =
  document.getElementById("exploreHint");

const sectorReadout =
  document.getElementById("sectorReadout");

const coordinateReadout =
  document.getElementById("coordinateReadout");

const directoryToggle =
  document.getElementById("directoryToggle");

const directoryClose =
  document.getElementById("directoryClose");

const districtDirectory =
  document.getElementById("districtDirectory");

const sectionModal =
  document.getElementById("sectionModal");

const sectionBackdrop =
  document.getElementById("sectionBackdrop");

const sectionPanel =
  document.getElementById("sectionPanel");

const sectionClose =
  document.getElementById("sectionClose");

const modalSectionIndex =
  document.getElementById("modalSectionIndex");

const modalSectionTitle =
  document.getElementById("modalSectionTitle");

const modalSectionSubtitle =
  document.getElementById("modalSectionSubtitle");

const sectionContent =
  document.getElementById("sectionContent");

const sectionSlider =
  document.getElementById("sectionSlider");

const sliderCurrent =
  document.getElementById("sliderCurrent");

const sliderTotal =
  document.getElementById("sliderTotal");

const sliderLabel =
  document.getElementById("sliderLabel");

const previousItem =
  document.getElementById("previousItem");

const nextItem =
  document.getElementById("nextItem");


/* ==========================================================
   PORTFOLIO DATA
========================================================== */

const portfolioSections = {

  /* ========================================================
     PROJECTS
  ========================================================= */

  projects: {
    cityIndex: "DISTRICT 01",
    cityName: "PROJECT DISTRICT",
    cityDescription: "Games • AI • VR • Simulation",

    panelTitle: "PROJECT ARCHIVE",
    panelSubtitle:
      "Gameplay systems, intelligent agents and immersive simulation",

    type: "showcase",

    items: [

      {
        kicker: "PROJECT 01 // GAME AI",
        title: "Human in the Loop RL for Minecraft",

        description:
          "A reinforcement-learning experimentation environment built in Project Malmo. The system uses a baseline DQN with replay memory, a target network and epsilon-greedy exploration while supporting pipelines for human-in-the-loop and imitation-learning research.",

        media: "images/minecraft.png",

        mediaAlt:
          "Minecraft Project Malmo reinforcement learning project",

        meta: [
          {
            label: "SYSTEM",
            value:
              "Deep Q Network with replay buffer, target network and epsilon-greedy exploration."
          },
          {
            label: "PURPOSE",
            value:
              "Study assistive agents and human-guided learning in game environments."
          },
          {
            label: "ENVIRONMENT",
            value:
              "Microsoft Project Malmo / Minecraft."
          }
        ],

        tags: [
          "Python",
          "DQN",
          "Reinforcement Learning",
          "Project Malmo",
          "Imitation Learning"
        ],

        link:
          "https://github.com/Gamedog0319/ImitationLearning",

        linkLabel:
          "OPEN GITHUB ↗"
      },


      {
        kicker: "PROJECT 02 // VR + AI",
        title: "VR Neck Exoskeleton",

        description:
          "A wearable neck-assistance prototype connected to a Unity VR environment. The system explores adaptive controller selection and personalized assistance using multi-armed bandit algorithms.",

        media:
          "images/vr-neck.png",

        mediaAlt:
          "VR Neck Exoskeleton project",

        meta: [
          {
            label: "PROBLEM",
            value:
              "Fixed assistance policies do not adapt to individual comfort or user behavior."
          },
          {
            label: "SYSTEM",
            value:
              "Unity integration, wearable hardware and adaptive controller selection."
          },
          {
            label: "AI",
            value:
              "UCB1 and contextual/non-contextual bandit experimentation."
          }
        ],

        tags: [
          "Unity",
          "VR",
          "Bandits",
          "UCB1",
          "Hardware",
          "Adaptive Systems"
        ],

        link:
          "https://github.com/aria-lab-code/vr-exoskeleton/tree/master/vr_exoskeleton",

        linkLabel:
          "OPEN PROJECT ↗"
      },


      {
        kicker: "PROJECT 03 // VR",
        title: "Indonesian VR History Shop Sim",

        description:
          "An interactive VR history-shop experience designed around artifact interaction, environmental storytelling and smooth standalone VR performance.",

        media:
          "images/shopsim.jpg",

        mediaAlt:
          "Indonesian VR History Shop simulation",

        meta: [
          {
            label: "ENGINE",
            value:
              "Unity"
          },
          {
            label: "FOCUS",
            value:
              "Immersive interaction and virtual artifact exploration."
          },
          {
            label: "PLATFORM",
            value:
              "Standalone VR."
          }
        ],

        tags: [
          "Unity",
          "VR",
          "Interaction",
          "Simulation"
        ],

        link:
          "https://github.com/Gamedog0319/ShopSim",

        linkLabel:
          "OPEN GITHUB ↗"
      },


      {
        kicker: "PROJECT 04 // GAMEPLAY",
        title: "Pompeii",

        description:
          "An Unreal Engine FPS jam project featuring weapon mechanics, player damage systems, animation setup and gameplay-focused interaction systems.",

        media:
          "images/pompeii.jpg",

        mediaAlt:
          "Pompeii Unreal Engine game",

        meta: [
          {
            label: "ENGINE",
            value:
              "Unreal Engine"
          },
          {
            label: "SYSTEMS",
            value:
              "FPS weapons, damage, animation and gameplay logic."
          },
          {
            label: "TYPE",
            value:
              "Game jam / gameplay programming project."
          }
        ],

        tags: [
          "Unreal Engine",
          "Blueprints",
          "Gameplay",
          "Animation",
          "FPS"
        ],

        link:
          "https://github.com/Gamedogstudios/Pompeii",

        linkLabel:
          "OPEN GITHUB ↗"
      },


      {
        kicker: "PROJECT 05 // COMPUTER VISION",
        title: "Howzzat!",

        description:
          "A cricket simulation built in Unity using computer-vision gesture batting, custom stadium assets and physics-driven ball behavior.",

        media:
          "images/Howzzatt.jpg",

        mediaAlt:
          "Howzzat cricket game",

        meta: [
          {
            label: "ENGINE",
            value:
              "Unity"
          },
          {
            label: "INPUT",
            value:
              "Computer-vision gesture recognition."
          },
          {
            label: "GAMEPLAY",
            value:
              "Physics-based cricket batting and ball simulation."
          }
        ],

        tags: [
          "Unity",
          "Computer Vision",
          "Physics",
          "Blender",
          "Gameplay"
        ],

        link:
          "https://github.com/Gamedog0319/Howzzat",

        linkLabel:
          "OPEN GITHUB ↗"
      },


      {
        kicker: "PROJECT 06 // MIXED REALITY",
        title: "VR / AR Molecular Simulation",

        description:
          "An interactive Unity molecular-visualization system for mixed-reality research workflows, including real-time manipulation and nanoparticle orientation exploration.",

        media:
          "images/molecular-sim.jpg",

        mediaAlt:
          "VR AR molecular simulation",

        meta: [
          {
            label: "ENGINE",
            value:
              "Unity"
          },
          {
            label: "DOMAIN",
            value:
              "Scientific visualization and mixed reality."
          },
          {
            label: "INTERACTION",
            value:
              "Real-time molecular manipulation and orientation exploration."
          }
        ],

        tags: [
          "Unity",
          "VR",
          "AR",
          "Scientific Visualization",
          "Simulation"
        ],

        link:
          "https://github.com/Gamedog0319/VR-AR-For-Molecular-Simulation",

        linkLabel:
          "OPEN GITHUB ↗"
      }

    ]
  },


  /* ========================================================
     FEATURED
  ========================================================= */

  featured: {

    cityIndex: "DISTRICT 02",
    cityName: "INNOVATION CENTER",
    cityDescription:
      "Featured Systems • Case Studies",

    panelTitle:
      "INNOVATION ARCHIVE",

    panelSubtitle:
      "Three systems that best represent my current work",

    type:
      "showcase",

    items: [

      {
        kicker:
          "FEATURED 01 // ADAPTIVE VR",

        title:
          "VR Neck Exoskeleton",

        description:
          "Designed and prototyped a wearable VR neck exoskeleton with adaptive controller personalization. The work combines real hardware, immersive VR and online learning techniques.",

        media:
          "images/vr-neck.png",

        mediaAlt:
          "VR neck exoskeleton",

        meta: [
          {
            label: "PROBLEM",
            value:
              "Support VR comfort and posture using adaptive rather than fixed assistance."
          },
          {
            label: "SYSTEM",
            value:
              "Wearable hardware, Unity runtime and online controller selection."
          },
          {
            label: "RESULT",
            value:
              "Pilot testing reported improved perceived comfort."
          }
        ],

        tags: [
          "VR",
          "Unity",
          "Bandits",
          "Adaptive Control",
          "Hardware"
        ],

        link:
          "https://github.com/aria-lab-code/vr-exoskeleton/tree/master/vr_exoskeleton",

        linkLabel:
          "VIEW CASE PROJECT ↗"
      },


      {
        kicker:
          "FEATURED 02 // GAME AI",

        title:
          "DQN Assistive Agent",

        description:
          "Built an assistive reinforcement-learning agent in Project Malmo for navigation and resource-collection tasks using Deep Q Learning.",

        media:
          "images/minecraft.png",

        mediaAlt:
          "Minecraft reinforcement learning agent",

        meta: [
          {
            label: "PROBLEM",
            value:
              "Create a reliable game agent capable of supporting player tasks."
          },
          {
            label: "SYSTEM",
            value:
              "DQN, replay memory and epsilon-greedy exploration."
          },
          {
            label: "ENVIRONMENT",
            value:
              "Minecraft via Microsoft Project Malmo."
          }
        ],

        tags: [
          "Game AI",
          "DQN",
          "Malmo",
          "Python",
          "Human in the Loop"
        ],

        link:
          "https://github.com/Gamedog0319/ImitationLearning",

        linkLabel:
          "VIEW CASE PROJECT ↗"
      },


      {
        kicker:
          "FEATURED 03 // UNREAL AI",

        title:
          "Unreal Learning Agents",

        description:
          "Worked with Unreal Engine Learning Agents, NPC perception, pathfinding and behavior systems in battle-simulation environments at Zen Technologies.",

        media:
          "images/unreal.png",

        mediaAlt:
          "Unreal Engine Learning Agents project",

        meta: [
          {
            label: "PROBLEM",
            value:
              "Develop adaptive NPC behavior for simulation-driven scenes."
          },
          {
            label: "SYSTEM",
            value:
              "Learning Agents, AI perception, pathfinding and behavior trees."
          },
          {
            label: "ENGINE",
            value:
              "Unreal Engine 5.3 / 5.4."
          }
        ],

        tags: [
          "Unreal",
          "Learning Agents",
          "NPC AI",
          "Behavior Trees",
          "Simulation"
        ],

        link:
          "https://github.com/Gamedog0319/RLAgentDrivers-Unreal",

        linkLabel:
          "VIEW PROJECT ↗"
      }

    ]
  },


  /* ========================================================
     EXPERIENCE
  ========================================================= */

  experience: {

    cityIndex:
      "DISTRICT 03",

    cityName:
      "EXPERIENCE TOWERS",

    cityDescription:
      "Career • Research • Development",

    panelTitle:
      "CAREER TIMELINE",

    panelSubtitle:
      "Research, game development and interactive systems",

    type:
      "experience",

    items: [

      {
        year:
          "2025",

        period:
          "Aug 2025 — Present",

        company:
          "UNIVERSITY OF UTAH",

        title:
          "Research Assistant",

        description:
          "Research and development focused on adaptive VR systems, intelligent agents and human-in-the-loop learning.",

        points: [
          "Designed and prototyped a wearable VR neck exoskeleton.",
          "Implemented bandit-based controller personalization experiments.",
          "Built reinforcement-learning agents in Project Malmo.",
          "Developed experimental pipelines for evaluating adaptive controllers."
        ],

        tags: [
          "Unity",
          "VR",
          "Python",
          "Reinforcement Learning",
          "Research"
        ]
      },


      {
        year:
          "2024",

        period:
          "Aug 2024 — Jun 2025",

        company:
          "ZEN TECHNOLOGIES",

        title:
          "Game Developer Intern",

        description:
          "Worked on Unreal Engine AI systems and simulation-oriented gameplay environments.",

        points: [
          "Trained and deployed ML agents using Unreal Learning Agents.",
          "Integrated perception, pathfinding and behavior-tree systems.",
          "Worked with Unreal Engine 5.3 and 5.4.",
          "Improved runtime performance in the target simulation scene."
        ],

        tags: [
          "Unreal Engine",
          "Learning Agents",
          "Game AI",
          "Behavior Trees",
          "Simulation"
        ]
      },


      {
        year:
          "2024",

        period:
          "May 2024 — Jun 2025",

        company:
          "ADVANCED ACADEMIC CENTER",

        title:
          "Teaching Assistant",

        description:
          "Taught Unity and C# fundamentals to aspiring game developers while building educational material for interactive game development.",

        points: [
          "Taught game-development fundamentals using Unity.",
          "Mentored students in C# gameplay programming.",
          "Created practical game-development learning material.",
          "Authored a guidebook for building immersive Unity projects."
        ],

        tags: [
          "Unity",
          "C#",
          "Teaching",
          "Game Development"
        ]
      },


      {
        year:
          "2024",

        period:
          "Apr 2024 — Jun 2024",

        company:
          "IIT GANDHINAGAR",

        title:
          "Summer Research Intern",

        description:
          "Developed an interactive VR/AR molecular-simulation platform for nanoparticle orientation research and education.",

        points: [
          "Created a Unity mixed-reality visualization environment.",
          "Implemented real-time molecular manipulation.",
          "Worked on nanoparticle orientation visualization.",
          "Designed the system for research and educational workflows."
        ],

        tags: [
          "Unity",
          "VR",
          "AR",
          "Simulation",
          "Research"
        ]
      }

    ]
  },


  /* ========================================================
     EDUCATION
  ========================================================= */

  education: {

    cityIndex:
      "DISTRICT 04",

    cityName:
      "UNIVERSITY CAMPUS",

    cityDescription:
      "Academic Systems • Game Engineering",

    panelTitle:
      "ACADEMIC RECORD",

    panelSubtitle:
      "Game engineering, AI and interactive systems",

    type:
      "education",

    items: [

      {
        code:
          "ACADEMIC FILE // 001",

        icon:
          "U",

        kicker:
          "CURRENT PROGRAM",

        title:
          "Master of Entertainment Arts and Engineering",

        description:
          "Game Engineering at the University of Utah.",

        meta: [
          {
            label:
              "INSTITUTION",
            value:
              "University of Utah"
          },
          {
            label:
              "PERIOD",
            value:
              "August 2025 — Present"
          },
          {
            label:
              "GPA",
            value:
              "4.0 / 4.0"
          },
          {
            label:
              "FOCUS",
            value:
              "Game engineering, gameplay programming, machine learning and interactive systems."
          }
        ]
      },


      {
        code:
          "ACADEMIC FILE // 002",

        icon:
          "AI",

        kicker:
          "UNDERGRADUATE",

        title:
          "B.Tech in Computer Science and Engineering",

        description:
          "Undergraduate program specializing in Artificial Intelligence and Machine Learning.",

        meta: [
          {
            label:
              "PROGRAM",
            value:
              "Computer Science and Engineering — AIML"
          },
          {
            label:
              "PERIOD",
            value:
              "2021 — 2025"
          },
          {
            label:
              "DOMAIN",
            value:
              "Artificial Intelligence and Machine Learning"
          }
        ]
      },


      {
        code:
          "ACADEMIC FILE // 003",

        icon:
          "∞",

        kicker:
          "CORE AREAS",

        title:
          "Academic Focus",

        description:
          "The areas connecting my academic work to the games and interactive systems I build.",

        meta: [
          {
            label:
              "01",
            value:
              "Game Engineering"
          },
          {
            label:
              "02",
            value:
              "Machine Learning"
          },
          {
            label:
              "03",
            value:
              "Interactive Systems"
          },
          {
            label:
              "04",
            value:
              "Simulation and AI"
          }
        ]
      }

    ]
  },


  /* ========================================================
     SKILLS
  ========================================================= */

  skills: {

    cityIndex:
      "DISTRICT 05",

    cityName:
      "TECH FOUNDRY",

    cityDescription:
      "Languages • Engines • Game AI",

    panelTitle:
      "SYSTEM MODULES",

    panelSubtitle:
      "Technology I use to build interactive intelligent systems",

    type:
      "skills",

    items: [

      {
        symbol:
          "{ }",

        kicker:
          "MODULE 01",

        title:
          "Languages",

        description:
          "Programming languages used across gameplay systems, AI research, simulation and web development.",

        skills: [
          "C++",
          "C#",
          "Python",
          "Java",
          "HTML",
          "CSS"
        ],

        usedIn: [
          "Unreal gameplay and AI systems",
          "Unity VR applications",
          "Reinforcement-learning research",
          "Portfolio and interactive web systems"
        ]
      },


      {
        symbol:
          "3D",

        kicker:
          "MODULE 02",

        title:
          "Engines & Tools",

        description:
          "Primary environments used to build, test and ship game and simulation systems.",

        skills: [
          "Unity",
          "Unreal Engine",
          "Blender",
          "Arduino",
          "Jupyter"
        ],

        usedIn: [
          "VR Neck Exoskeleton",
          "Unreal Learning Agents",
          "Howzzat!",
          "ShopSim",
          "Molecular Simulation"
        ]
      },


      {
        symbol:
          "AI",

        kicker:
          "MODULE 03",

        title:
          "Game AI / Machine Learning",

        description:
          "Learning and decision-making systems used to create adaptive agents and player-facing intelligence.",

        skills: [
          "Reinforcement Learning",
          "Deep Q Networks",
          "Multi-Armed Bandits",
          "Imitation Learning",
          "Behavior Trees",
          "AI Perception"
        ],

        usedIn: [
          "Minecraft assistive agents",
          "VR controller personalization",
          "Unreal adaptive NPCs",
          "Game AI research"
        ]
      },


      {
        symbol:
          "XR",

        kicker:
          "MODULE 04",

        title:
          "VR / Simulation",

        description:
          "Interactive and hardware-linked technology for immersive simulation environments.",

        skills: [
          "Virtual Reality",
          "Mixed Reality",
          "Simulation",
          "Hardware Integration",
          "Interaction Design"
        ],

        usedIn: [
          "VR Neck Exoskeleton",
          "History Shop Sim",
          "Molecular VR / AR Simulation"
        ]
      }

    ]
  },


  /* ========================================================
     RESEARCH
  ========================================================= */

  research: {

    cityIndex:
      "DISTRICT 06",

    cityName:
      "RESEARCH COMPLEX",

    cityDescription:
      "Game AI • Reinforcement Learning",

    panelTitle:
      "RESEARCH DATABASE",

    panelSubtitle:
      "Publications and research-oriented work",

    type:
      "research",

    items: [

      {
        number:
          "01",

        kicker:
          "RESEARCH FILE 001",

        title:
          "Evaluating Deep Q Networks Based Agents in Game Environments",

        description:
          "Research exploring Deep Q Network based reinforcement-learning agents in game environments.",

        citation:
          "RamKumar, M. & Rithvik, M. (2024). Reinforcement learning for Flappy Bird.",

        tags: [
          "DQN",
          "Reinforcement Learning",
          "Game AI"
        ]
      },


      {
        number:
          "02",

        kicker:
          "RESEARCH FILE 002",

        title:
          "Optimizing Lunar Lander Performance Using Dueling Deep Q Networks",

        description:
          "Research focused on improving Lunar Lander reinforcement-learning performance using a Dueling DQN architecture.",

        citation:
          "Poornima, S. & Rithvik, M. (2023).",

        tags: [
          "Dueling DQN",
          "Deep Reinforcement Learning",
          "Lunar Lander"
        ]
      },


      {
        number:
          "03",

        kicker:
          "RESEARCH FILE 003",

        title:
          "Reinforcement Learning for Autonomous Agents in Unreal Engine",

        description:
          "Research examining reinforcement-learning approaches for autonomous agents inside Unreal Engine environments.",

        citation:
          "Rajini, P. & Rithvik, M. (2024). International Conference on Innovative Emerging Technologies, ICIET 2025.",

        tags: [
          "Unreal Engine",
          "Autonomous Agents",
          "Reinforcement Learning"
        ]
      }

    ]
  },


  /* ========================================================
     ABOUT
  ========================================================= */

  about: {

    cityIndex:
      "DISTRICT 07",

    cityName:
      "RITHVIK HQ",

    cityDescription:
      "Identity • Mission • Current Work",

    panelTitle:
      "PERSONNEL FILE",

    panelSubtitle:
      "Rithvik Mandya // Gameplay • Game AI • VR",

    type:
      "about",

    items: [

      {
        monogram:
          "RM",

        kicker:
          "IDENTITY // RM-0319",

        title:
          "Rithvik Mandya",

        description:
          "Gameplay programmer focused on building intelligent systems where AI is part of the player experience rather than something layered on top.",

        meta: [
          {
            label:
              "LOCATION",
            value:
              "Salt Lake City, Utah"
          },
          {
            label:
              "FOCUS",
            value:
              "Gameplay Programming, Game AI, VR and Simulation"
          },
          {
            label:
              "CURRENT",
            value:
              "Master of Entertainment Arts and Engineering — Game Engineering, University of Utah"
          }
        ],

        tags: [
          "Gameplay Programmer",
          "Game AI",
          "VR",
          "Simulation"
        ]
      },


      {
        monogram:
          "AI",

        kicker:
          "CURRENT MISSION",

        title:
          "Intelligence Designed Into Play",

        description:
          "My work sits at the intersection of gameplay feel, autonomous behavior and immersive simulation. I am particularly interested in systems where intelligent behavior meaningfully changes how the player experiences the game.",

        meta: [
          {
            label:
              "01",
            value:
              "Gameplay systems and player-facing mechanics"
          },
          {
            label:
              "02",
            value:
              "Reinforcement learning and adaptive behavior"
          },
          {
            label:
              "03",
            value:
              "VR interaction and hardware-linked systems"
          },
          {
            label:
              "04",
            value:
              "Simulation environments for intelligent agents"
          }
        ]
      },


      {
        monogram:
          "↗",

        kicker:
          "ACTIVE RESEARCH",

        title:
          "Currently Exploring",

        description:
          "Areas I am actively pushing through research and project development.",

        meta: [
          {
            label:
              "01",
            value:
              "Human-in-the-loop training"
          },
          {
            label:
              "02",
            value:
              "Adaptive VR control systems"
          },
          {
            label:
              "03",
            value:
              "Agentic gameplay behaviors"
          }
        ]
      }

    ]
  },


  /* ========================================================
     CONTACT
  ========================================================= */

  contact: {

    cityIndex:
      "DISTRICT 08",

    cityName:
      "COMMS ARRAY",

    cityDescription:
      "Email • LinkedIn • GitHub",

    panelTitle:
      "COMMUNICATION ARRAY",

    panelSubtitle:
      "Establish a connection",

    type:
      "contact",

    items: [

      {
        icon:
          "@",

        kicker:
          "CHANNEL 01 // EMAIL",

        title:
          "Email",

        description:
          "For roles, research collaborations, game-development work or just an interesting conversation.",

        value:
          "rithvikmandya@gmail.com",

        link:
          "mailto:rithvikmandya@gmail.com",

        button:
          "SEND EMAIL →"
      },


      {
        icon:
          "in",

        kicker:
          "CHANNEL 02 // LINKEDIN",

        title:
          "LinkedIn",

        description:
          "Professional profile, work history and networking.",

        value:
          "Rithvik Mandya",

        link:
          "https://www.linkedin.com/in/rithvik-mandya-49a59222b/",

        button:
          "OPEN LINKEDIN ↗"
      },


      {
        icon:
          "git",

        kicker:
          "CHANNEL 03 // GITHUB",

        title:
          "GitHub",

        description:
          "Source code, experiments and game-development projects.",

        value:
          "Gamedog0319",

        link:
          "https://github.com/Gamedog0319",

        button:
          "OPEN GITHUB ↗"
      },


      {
        icon:
          "CV",

        kicker:
          "CHANNEL 04 // PERSONNEL FILE",

        title:
          "Resume",

        description:
          "Current resume covering game development, research, AI and VR work.",

        value:
          "Rithvik Mandya — Resume",

        link:
          "https://drive.google.com/file/d/1Sr2o9YOB9zykX7TD470YEVzy2giZCKKL/view?usp=sharing",

        button:
          "OPEN RESUME ↗"
      }

    ]
  }

};


/* ==========================================================
   THREE.JS GLOBALS
========================================================== */

let scene;
let camera;
let renderer;

let raycaster;

const pointer =
  new THREE.Vector2();

const pointerTarget =
  new THREE.Vector2();

const clock =
  new THREE.Clock();

const interactiveDistricts = [];

const districtVisuals =
  new Map();

const animatedVehicles = [];

const animatedElements = [];

let activeHoverKey = null;

let currentSectionKey = null;

let currentItemIndex = 0;

let hoverCardLocked = false;

let worldEntered = false;


/* ==========================================================
   COLORS
========================================================== */

const COLORS = {

  red:
    0xff2f36,

  redSoft:
    0xff676d,

  cyan:
    0x5de7ff,

  white:
    0xe7eefc,

  concrete:
    0x17191f,

  concreteLight:
    0x242833,

  road:
    0x07080b,

  ground:
    0x0d1012,

  glass:
    0x152131,

  dark:
    0x050609

};


/* ==========================================================
   DISTRICT CONFIG
========================================================== */

const districtConfigs = [

  {
    key:
      "projects",

    x:
      0,

    z:
      0,

    width:
      23,

    depth:
      18,

    accent:
      COLORS.red
  },

  {
    key:
      "featured",

    x:
      -28,

    z:
      -1,

    width:
      19,

    depth:
      17,

    accent:
      0xff5d72
  },

  {
    key:
      "experience",

    x:
      28,

    z:
      -1,

    width:
      19,

    depth:
      18,

    accent:
      0x5de7ff
  },

  {
    key:
      "education",

    x:
      0,

    z:
      25,

    width:
      22,

    depth:
      15,

    accent:
      0x7f9cff
  },

  {
    key:
      "research",

    x:
      -28,

    z:
      24,

    width:
      19,

    depth:
      16,

    accent:
      0xad78ff
  },

  {
    key:
      "skills",

    x:
      28,

    z:
      24,

    width:
      19,

    depth:
      16,

    accent:
      0x53e6c4
  },

  {
    key:
      "about",

    x:
      -16,

    z:
      -25,

    width:
      21,

    depth:
      15,

    accent:
      COLORS.red
  },

  {
    key:
      "contact",

    x:
      17,

    z:
      -25,

    width:
      21,

    depth:
      15,

    accent:
      0xff764d
  }

];


/* ==========================================================
   INITIALIZATION
========================================================== */

function initWorld() {

  scene =
    new THREE.Scene();

  scene.background =
    new THREE.Color(0x020306);

  scene.fog =
    new THREE.FogExp2(
      0x020306,
      0.012
    );


  /* ========================================================
     CAMERA
  ========================================================= */

  camera =
    new THREE.OrthographicCamera(
      -50,
      50,
      40,
      -40,
      0.1,
      300
    );

  camera.position.set(
    55,
    67,
    61
  );

  camera.lookAt(
    0,
    0,
    0
  );


  /* ========================================================
     RENDERER
  ========================================================= */

  renderer =
    new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.shadowMap.enabled =
    true;

  renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

  renderer.outputColorSpace =
    THREE.SRGBColorSpace;

  renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

  renderer.toneMappingExposure =
    1.15;

  threeContainer.appendChild(
    renderer.domElement
  );


  /* ========================================================
     RAYCASTER
  ========================================================= */

  raycaster =
    new THREE.Raycaster();


  addLighting();

  createGround();

  createRoadNetwork();

  createCityBoundary();

  createDistricts();

  createStreetLights();

  createVehicles();

  createAtmosphere();

  resizeRenderer();

  animate();

}


/* ==========================================================
   LIGHTING
========================================================== */

function addLighting() {

  const hemisphere =
    new THREE.HemisphereLight(
      0x5c78a8,
      0x080609,
      1.5
    );

  scene.add(
    hemisphere
  );


  const ambient =
    new THREE.AmbientLight(
      0xffffff,
      0.45
    );

  scene.add(
    ambient
  );


  const moon =
    new THREE.DirectionalLight(
      0x99b8ff,
      3.4
    );

  moon.position.set(
    -35,
    55,
    30
  );

  moon.castShadow =
    true;

  moon.shadow.mapSize.set(
    2048,
    2048
  );

  moon.shadow.camera.left =
    -80;

  moon.shadow.camera.right =
    80;

  moon.shadow.camera.top =
    80;

  moon.shadow.camera.bottom =
    -80;

  scene.add(
    moon
  );


  const redLight =
    new THREE.PointLight(
      COLORS.red,
      40,
      65,
      2
    );

  redLight.position.set(
    0,
    12,
    2
  );

  scene.add(
    redLight
  );


  const cyanLight =
    new THREE.PointLight(
      COLORS.cyan,
      25,
      50,
      2
    );

  cyanLight.position.set(
    26,
    12,
    22
  );

  scene.add(
    cyanLight
  );

}


/* ==========================================================
   GROUND
========================================================== */

function createGround() {

  const geometry =
    new THREE.PlaneGeometry(
      110,
      82
    );

  const material =
    new THREE.MeshStandardMaterial({
      color:
        COLORS.ground,

      roughness:
        0.93,

      metalness:
        0.05
    });

  const ground =
    new THREE.Mesh(
      geometry,
      material
    );

  ground.rotation.x =
    -Math.PI / 2;

  ground.receiveShadow =
    true;

  scene.add(
    ground
  );


  const grid =
    new THREE.GridHelper(
      110,
      55,
      0x252932,
      0x17191e
    );

  grid.position.y =
    0.012;

  grid.material.opacity =
    0.18;

  grid.material.transparent =
    true;

  scene.add(
    grid
  );

}


/* ==========================================================
   ROADS
========================================================== */

function createRoadNetwork() {

  createRoad(
    0,
    0.03,
    0,
    9,
    82
  );

  createRoad(
    0,
    0.035,
    0,
    110,
    8
  );

  createRoad(
    -27,
    0.04,
    0,
    6,
    82
  );

  createRoad(
    27,
    0.04,
    0,
    6,
    82
  );

  createRoad(
    0,
    0.045,
    23,
    110,
    5
  );

  createRoad(
    0,
    0.045,
    -23,
    110,
    5
  );


  addRoadLines();

}


function createRoad(
  x,
  y,
  z,
  width,
  depth
) {

  const geometry =
    new THREE.PlaneGeometry(
      width,
      depth
    );

  const material =
    new THREE.MeshStandardMaterial({
      color:
        COLORS.road,

      roughness:
        0.76,

      metalness:
        0.12
    });

  const road =
    new THREE.Mesh(
      geometry,
      material
    );

  road.rotation.x =
    -Math.PI / 2;

  road.position.set(
    x,
    y,
    z
  );

  road.receiveShadow =
    true;

  scene.add(
    road
  );

}


function addRoadLines() {

  const lineMaterial =
    new THREE.MeshBasicMaterial({
      color:
        0x87686a
    });

  for (
    let z = -38;
    z <= 38;
    z += 5
  ) {

    const marker =
      new THREE.Mesh(
        new THREE.PlaneGeometry(
          0.1,
          2.1
        ),
        lineMaterial
      );

    marker.rotation.x =
      -Math.PI / 2;

    marker.position.set(
      0,
      0.06,
      z
    );

    scene.add(
      marker
    );

  }


  for (
    let x = -50;
    x <= 50;
    x += 5
  ) {

    const marker =
      new THREE.Mesh(
        new THREE.PlaneGeometry(
          2.1,
          0.1
        ),
        lineMaterial
      );

    marker.rotation.x =
      -Math.PI / 2;

    marker.position.set(
      x,
      0.06,
      0
    );

    scene.add(
      marker
    );

  }

}


/* ==========================================================
   CITY EDGE
========================================================== */

function createCityBoundary() {

  const geometry =
    new THREE.BoxGeometry(
      108,
      0.35,
      80
    );

  const material =
    new THREE.MeshStandardMaterial({
      color:
        0x101216,

      roughness:
        0.7,

      metalness:
        0.25
    });

  const platform =
    new THREE.Mesh(
      geometry,
      material
    );

  platform.position.y =
    -0.24;

  platform.receiveShadow =
    true;

  scene.add(
    platform
  );

}


/* ==========================================================
   DISTRICTS
========================================================== */

function createDistricts() {

  districtConfigs.forEach(
    config => {

      const district =
        new THREE.Group();

      district.position.set(
        config.x,
        0,
        config.z
      );

      scene.add(
        district
      );


      const pad =
        createDistrictPad(
          config.width,
          config.depth,
          config.accent
        );

      district.add(
        pad
      );


      const border =
        createDistrictBorder(
          config.width,
          config.depth,
          config.accent
        );

      district.add(
        border
      );


      const buildings =
        createDistrictArchitecture(
          config.key,
          config.width,
          config.depth,
          config.accent
        );

      district.add(
        buildings
      );


      const hitbox =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            config.width,
            16,
            config.depth
          ),

          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            depthWrite: false
          })

        );

      hitbox.position.y =
        8;

      hitbox.userData.section =
        config.key;

      hitbox.userData.isDistrictHitbox =
        true;

      district.add(
        hitbox
      );

      interactiveDistricts.push(
        hitbox
      );


      districtVisuals.set(
        config.key,
        {
          root:
            district,

          pad,

          border,

          config
        }
      );

    }
  );

}


/* ==========================================================
   DISTRICT PAD
========================================================== */

function createDistrictPad(
  width,
  depth,
  accent
) {

  const material =
    new THREE.MeshStandardMaterial({
      color:
        accent,

      emissive:
        accent,

      emissiveIntensity:
        0.08,

      transparent:
        true,

      opacity:
        0.055,

      roughness:
        0.45,

      metalness:
        0.35,

      depthWrite:
        false
    });

  const mesh =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        width,
        depth
      ),

      material

    );

  mesh.rotation.x =
    -Math.PI / 2;

  mesh.position.y =
    0.075;

  return mesh;

}


/* ==========================================================
   DISTRICT BORDER
========================================================== */

function createDistrictBorder(
  width,
  depth,
  accent
) {

  const points = [

    new THREE.Vector3(
      -width / 2,
      0.13,
      -depth / 2
    ),

    new THREE.Vector3(
      width / 2,
      0.13,
      -depth / 2
    ),

    new THREE.Vector3(
      width / 2,
      0.13,
      depth / 2
    ),

    new THREE.Vector3(
      -width / 2,
      0.13,
      depth / 2
    )

  ];

  const geometry =
    new THREE.BufferGeometry()
      .setFromPoints(
        points
      );

  const material =
    new THREE.LineBasicMaterial({
      color:
        accent,

      transparent:
        true,

      opacity:
        0
    });

  const line =
    new THREE.LineLoop(
      geometry,
      material
    );

  return line;

}


/* ==========================================================
   DISTRICT ARCHITECTURE
========================================================== */

function createDistrictArchitecture(
  key,
  width,
  depth,
  accent
) {

  const group =
    new THREE.Group();


  if (
    key === "projects"
  ) {

    createProjectsDistrict(
      group,
      accent
    );

  }


  if (
    key === "featured"
  ) {

    createFeaturedDistrict(
      group,
      accent
    );

  }


  if (
    key === "experience"
  ) {

    createExperienceDistrict(
      group,
      accent
    );

  }


  if (
    key === "education"
  ) {

    createEducationDistrict(
      group,
      accent
    );

  }


  if (
    key === "research"
  ) {

    createResearchDistrict(
      group,
      accent
    );

  }


  if (
    key === "skills"
  ) {

    createSkillsDistrict(
      group,
      accent
    );

  }


  if (
    key === "about"
  ) {

    createAboutDistrict(
      group,
      accent
    );

  }


  if (
    key === "contact"
  ) {

    createContactDistrict(
      group,
      accent
    );

  }


  return group;

}


/* ==========================================================
   STANDARD BUILDING
========================================================== */

function createBuilding({
  x = 0,
  z = 0,
  width = 4,
  depth = 4,
  height = 8,
  accent = COLORS.red,
  color = COLORS.concrete,
  roof = true
}) {

  const group =
    new THREE.Group();

  group.position.set(
    x,
    0,
    z
  );


  const bodyMaterial =
    new THREE.MeshStandardMaterial({
      color,
      roughness:
        0.55,
      metalness:
        0.35
    });

  const geometry =
    new THREE.BoxGeometry(
      width,
      height,
      depth
    );

  const building =
    new THREE.Mesh(
      geometry,
      bodyMaterial
    );

  building.position.y =
    height / 2;

  building.castShadow =
    true;

  building.receiveShadow =
    true;

  group.add(
    building
  );


  addWindows(
    group,
    width,
    depth,
    height,
    accent
  );


  if (
    roof
  ) {

    const roofMesh =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          width * 0.5,
          0.5,
          depth * 0.5
        ),

        new THREE.MeshStandardMaterial({
          color:
            0x282b33,

          metalness:
            0.55,

          roughness:
            0.35
        })

      );

    roofMesh.position.y =
      height + 0.25;

    group.add(
      roofMesh
    );

  }


  return group;

}


/* ==========================================================
   WINDOWS
========================================================== */

function addWindows(
  group,
  width,
  depth,
  height,
  accent
) {

  const material =
    new THREE.MeshStandardMaterial({
      color:
        accent,

      emissive:
        accent,

      emissiveIntensity:
        2.4,

      roughness:
        0.2,

      metalness:
        0.15
    });


  const floors =
    Math.max(
      2,
      Math.floor(
        height / 2
      )
    );


  for (
    let floor = 0;
    floor < floors;
    floor++
  ) {

    const y =
      1.2 +
      floor * 1.8;


    if (
      y > height - 0.6
    ) {
      break;
    }


    const front =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          width * 0.62,
          0.16,
          0.08
        ),

        material

      );

    front.position.set(
      0,
      y,
      depth / 2 + 0.045
    );

    group.add(
      front
    );


    const back =
      front.clone();

    back.position.z =
      -depth / 2 - 0.045;

    group.add(
      back
    );

  }

}


/* ==========================================================
   PROJECT DISTRICT
========================================================== */

function createProjectsDistrict(
  group,
  accent
) {

  const center =
    createBuilding({
      x:
        0,

      z:
        0,

      width:
        6,

      depth:
        6,

      height:
        18,

      accent
    });

  group.add(
    center
  );


  const positions = [

    [-7, -5, 4, 4, 8],

    [7, -5, 4, 4, 11],

    [-7, 5, 4, 4, 10],

    [7, 5, 4, 4, 7],

    [0, 6, 4.5, 3.5, 9]

  ];


  positions.forEach(
    item => {

      group.add(

        createBuilding({
          x:
            item[0],

          z:
            item[1],

          width:
            item[2],

          depth:
            item[3],

          height:
            item[4],

          accent
        })

      );

    }
  );


  const crown =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        2.8,
        2.8,
        0.25,
        32
      ),

      new THREE.MeshBasicMaterial({
        color:
          accent
      })

    );

  crown.position.y =
    18.65;

  group.add(
    crown
  );

}


/* ==========================================================
   FEATURED DISTRICT
========================================================== */

function createFeaturedDistrict(
  group,
  accent
) {

  const points = [

    [-4.7, 0],

    [4.7, -3.3],

    [4.7, 4]

  ];


  points.forEach(
    (
      point,
      index
    ) => {

      const height =
        index === 0
          ? 12
          : 8.5;


      const tower =
        createBuilding({
          x:
            point[0],

          z:
            point[1],

          width:
            index === 0
              ? 6
              : 5,

          depth:
            index === 0
              ? 6
              : 5,

          height,

          accent
        });

      group.add(
        tower
      );

    }
  );


  const bridgeMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0x252a31,

      metalness:
        0.65,

      roughness:
        0.28
    });


  const bridge =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        8,
        0.45,
        1.1
      ),

      bridgeMaterial

    );

  bridge.position.set(
    0,
    5,
    0
  );

  bridge.rotation.y =
    -0.1;

  bridge.castShadow =
    true;

  group.add(
    bridge
  );

}


/* ==========================================================
   EXPERIENCE DISTRICT
========================================================== */

function createExperienceDistrict(
  group,
  accent
) {

  const towers = [

    [-5, -4, 4.4, 4.4, 18],

    [4.8, -4, 4, 4, 14],

    [-4, 4.5, 4, 4, 12],

    [4.5, 4.5, 5, 5, 20]

  ];


  towers.forEach(
    tower => {

      group.add(

        createBuilding({
          x:
            tower[0],

          z:
            tower[1],

          width:
            tower[2],

          depth:
            tower[3],

          height:
            tower[4],

          accent
        })

      );

    }
  );

}


/* ==========================================================
   EDUCATION DISTRICT
========================================================== */

function createEducationDistrict(
  group,
  accent
) {

  group.add(

    createBuilding({
      x:
        0,

      z:
        1,

      width:
        10,

      depth:
        6,

      height:
        6,

      accent,

      color:
        0x22252d
    })

  );


  group.add(

    createBuilding({
      x:
        -6,

      z:
        -4,

      width:
        5,

      depth:
        5,

      height:
        4,

      accent
    })

  );


  group.add(

    createBuilding({
      x:
        6,

      z:
        -4,

      width:
        5,

      depth:
        5,

      height:
        4,

      accent
    })

  );


  const dome =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        2.3,
        24,
        16,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      ),

      new THREE.MeshStandardMaterial({
        color:
          0x1c2635,

        emissive:
          accent,

        emissiveIntensity:
          0.14,

        metalness:
          0.7,

        roughness:
          0.2
      })

    );

  dome.position.set(
    0,
    6,
    1
  );

  group.add(
    dome
  );

}


/* ==========================================================
   RESEARCH DISTRICT
========================================================== */

function createResearchDistrict(
  group,
  accent
) {

  const laboratory =
    createBuilding({
      x:
        0,

      z:
        1,

      width:
        8,

      depth:
        7,

      height:
        5,

      accent,

      color:
        0x181b22
    });

  group.add(
    laboratory
  );


  const dome =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        3.3,
        28,
        18,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      ),

      new THREE.MeshStandardMaterial({
        color:
          0x171520,

        emissive:
          accent,

        emissiveIntensity:
          0.2,

        transparent:
          true,

        opacity:
          0.95,

        metalness:
          0.6,

        roughness:
          0.22
      })

    );

  dome.position.set(
    0,
    5,
    1
  );

  group.add(
    dome
  );


  for (
    let i = 0;
    i < 3;
    i++
  ) {

    const pod =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          1.4,
          1.4,
          2,
          20
        ),

        new THREE.MeshStandardMaterial({
          color:
            0x242735,

          emissive:
            accent,

          emissiveIntensity:
            0.09
        })

      );

    pod.position.set(
      -5 + i * 5,
      1,
      -5
    );

    pod.castShadow =
      true;

    group.add(
      pod
    );

  }

}


/* ==========================================================
   SKILLS DISTRICT
========================================================== */

function createSkillsDistrict(
  group,
  accent
) {

  const bases = [

    [-4.5, -4],

    [4.5, -4],

    [-4.5, 4],

    [4.5, 4]

  ];


  bases.forEach(
    (
      pos,
      index
    ) => {

      const stack =
        createBuilding({
          x:
            pos[0],

          z:
            pos[1],

          width:
            4,

          depth:
            4,

          height:
            6 +
            index * 2,

          accent
        });

      group.add(
        stack
      );

    }
  );


  const core =
    new THREE.Mesh(

      new THREE.OctahedronGeometry(
        2.1
      ),

      new THREE.MeshStandardMaterial({
        color:
          accent,

        emissive:
          accent,

        emissiveIntensity:
          1.6,

        metalness:
          0.5,

        roughness:
          0.2
      })

    );

  core.position.y =
    5;

  group.add(
    core
  );

  animatedElements.push({
    object:
      core,

    type:
      "rotate",

    speed:
      0.4
  });

}


/* ==========================================================
   ABOUT DISTRICT
========================================================== */

function createAboutDistrict(
  group,
  accent
) {

  const hq =
    createBuilding({
      x:
        0,

      z:
        0,

      width:
        9,

      depth:
        8,

      height:
        7,

      accent,

      color:
        0x1d1e23
    });

  group.add(
    hq
  );


  const upper =
    createBuilding({
      x:
        1.8,

      z:
        -0.5,

      width:
        4,

      depth:
        4,

      height:
        5,

      accent,

      color:
        0x24262c
    });

  upper.position.y =
    6.7;

  group.add(
    upper
  );


  addTrees(
    group,
    [
      [-7, -4],
      [-7, 4],
      [7, -4],
      [7, 4]
    ]
  );

}


/* ==========================================================
   CONTACT DISTRICT
========================================================== */

function createContactDistrict(
  group,
  accent
) {

  const base =
    createBuilding({
      x:
        0,

      z:
        0,

      width:
        7,

      depth:
        7,

      height:
        5,

      accent
    });

  group.add(
    base
  );


  const towerMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0x34373f,

      metalness:
        0.75,

      roughness:
        0.28
    });


  const mast =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.22,
        0.4,
        13,
        12
      ),

      towerMaterial

    );

  mast.position.y =
    11;

  mast.castShadow =
    true;

  group.add(
    mast
  );


  for (
    let i = 0;
    i < 3;
    i++
  ) {

    const ring =
      new THREE.Mesh(

        new THREE.TorusGeometry(
          1.8 +
          i * 1.1,

          0.07,
          8,
          48
        ),

        new THREE.MeshBasicMaterial({
          color:
            accent,

          transparent:
            true,

          opacity:
            0.5 -
            i * 0.1
        })

      );

    ring.rotation.x =
      Math.PI / 2;

    ring.position.y =
      17;

    group.add(
      ring
    );

    animatedElements.push({
      object:
        ring,

      type:
        "signal",

      offset:
        i * 0.7
    });

  }


  const beacon =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.35,
        16,
        16
      ),

      new THREE.MeshBasicMaterial({
        color:
          accent
      })

    );

  beacon.position.y =
    17;

  group.add(
    beacon
  );

}


/* ==========================================================
   TREES
========================================================== */

function addTrees(
  group,
  locations
) {

  locations.forEach(
    position => {

      const tree =
        new THREE.Group();


      const trunk =
        new THREE.Mesh(

          new THREE.CylinderGeometry(
            0.16,
            0.22,
            1.5,
            8
          ),

          new THREE.MeshStandardMaterial({
            color:
              0x3a2720
          })

        );

      trunk.position.y =
        0.75;

      tree.add(
        trunk
      );


      const leaves =
        new THREE.Mesh(

          new THREE.ConeGeometry(
            1,
            2.8,
            9
          ),

          new THREE.MeshStandardMaterial({
            color:
              0x18382d,

            roughness:
              0.9
          })

        );

      leaves.position.y =
        2.35;

      tree.add(
        leaves
      );


      tree.position.set(
        position[0],
        0,
        position[1]
      );

      group.add(
        tree
      );

    }
  );

}


/* ==========================================================
   STREET LIGHTS
========================================================== */

function createStreetLights() {

  const positions = [];


  for (
    let x = -48;
    x <= 48;
    x += 8
  ) {

    positions.push(
      [x, -5],
      [x, 5]
    );

  }


  for (
    let z = -36;
    z <= 36;
    z += 8
  ) {

    positions.push(
      [-5, z],
      [5, z]
    );

  }


  positions.forEach(
    (
      location,
      index
    ) => {

      const lightGroup =
        new THREE.Group();

      lightGroup.position.set(
        location[0],
        0,
        location[1]
      );


      const pole =
        new THREE.Mesh(

          new THREE.CylinderGeometry(
            0.04,
            0.06,
            2.5,
            8
          ),

          new THREE.MeshStandardMaterial({
            color:
              0x41434a,

            metalness:
              0.8
          })

        );

      pole.position.y =
        1.25;

      lightGroup.add(
        pole
      );


      const color =
        index % 5 === 0
          ? COLORS.red
          : 0xd8e9ff;


      const lamp =
        new THREE.Mesh(

          new THREE.SphereGeometry(
            0.11,
            10,
            10
          ),

          new THREE.MeshBasicMaterial({
            color
          })

        );

      lamp.position.y =
        2.55;

      lightGroup.add(
        lamp
      );


      scene.add(
        lightGroup
      );

    }
  );

}


/* ==========================================================
   VEHICLES
========================================================== */

function createVehicles() {

  for (
    let i = 0;
    i < 7;
    i++
  ) {

    const car =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          1.3,
          0.35,
          0.65
        ),

        new THREE.MeshStandardMaterial({
          color:
            i % 2 === 0
              ? 0x30333b
              : 0x18191e,

          metalness:
            0.65,

          roughness:
            0.28,

          emissive:
            i % 3 === 0
              ? 0x300006
              : 0x000000
        })

      );

    car.position.set(
      -45 + i * 13,
      0.38,
      i % 2 === 0
        ? -1.9
        : 1.9
    );

    car.castShadow =
      true;

    scene.add(
      car
    );


    animatedVehicles.push({
      object:
        car,

      axis:
        "x",

      speed:
        4 +
        Math.random() * 2,

      direction:
        i % 2 === 0
          ? 1
          : -1
    });

  }


  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const car =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          0.65,
          0.35,
          1.3
        ),

        new THREE.MeshStandardMaterial({
          color:
            0x272a31,

          metalness:
            0.65,

          roughness:
            0.28
        })

      );

    car.position.set(
      i % 2 === 0
        ? -1.9
        : 1.9,

      0.38,

      -35 +
      i * 15
    );

    scene.add(
      car
    );


    animatedVehicles.push({
      object:
        car,

      axis:
        "z",

      speed:
        3 +
        Math.random() * 2,

      direction:
        i % 2 === 0
          ? 1
          : -1
    });

  }

}


/* ==========================================================
   ATMOSPHERE
========================================================== */

function createAtmosphere() {

  const particles =
    550;

  const positions =
    new Float32Array(
      particles * 3
    );


  for (
    let i = 0;
    i < particles;
    i++
  ) {

    positions[
      i * 3
    ] =
      (Math.random() - 0.5) *
      120;

    positions[
      i * 3 + 1
    ] =
      Math.random() *
      35 +
      4;

    positions[
      i * 3 + 2
    ] =
      (Math.random() - 0.5) *
      95;

  }


  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );


  const material =
    new THREE.PointsMaterial({
      color:
        0x9eb7d8,

      size:
        0.08,

      transparent:
        true,

      opacity:
        0.35
    });


  const points =
    new THREE.Points(
      geometry,
      material
    );

  scene.add(
    points
  );

}


/* ==========================================================
   POINTER
========================================================== */

window.addEventListener(
  "pointermove",
  event => {

    customCursor.style.left =
      `${event.clientX}px`;

    customCursor.style.top =
      `${event.clientY}px`;


    pointerTarget.x =
      (
        event.clientX /
        window.innerWidth
      ) * 2 - 1;

    pointerTarget.y =
      -(
        event.clientY /
        window.innerHeight
      ) * 2 + 1;


    coordinateReadout.textContent =
      `X ${String(
        Math.round(
          event.clientX
        )
      ).padStart(
        3,
        "0"
      )} // Y ${String(
        Math.round(
          event.clientY
        )
      ).padStart(
        3,
        "0"
      )}`;


    if (
      !worldEntered
      ||
      sectionModal.classList.contains(
        "open"
      )
    ) {

      return;

    }


    if (
      event.target.closest(
        ".district-hover-card"
      )
      ||
      event.target.closest(
        ".game-hud"
      )
      ||
      event.target.closest(
        ".district-directory"
      )
    ) {

      return;

    }


    updateRaycast(
      event.clientX,
      event.clientY
    );

  }
);


/* ==========================================================
   MOBILE / CLICK DISTRICT
========================================================== */

rendererPointerHandler();


function rendererPointerHandler() {

  document.addEventListener(
    "pointerdown",
    event => {

      if (
        !worldEntered
        ||
        sectionModal.classList.contains(
          "open"
        )
      ) {
        return;
      }


      if (
        event.target.closest(
          "button"
        )
        ||
        event.target.closest(
          "a"
        )
        ||
        event.target.closest(
          ".district-directory"
        )
        ||
        event.target.closest(
          ".section-modal"
        )
      ) {

        return;

      }


      updateRaycast(
        event.clientX,
        event.clientY
      );

    }
  );

}


/* ==========================================================
   RAYCASTING
========================================================== */

function updateRaycast(
  clientX,
  clientY
) {

  pointer.x =
    (
      clientX /
      window.innerWidth
    ) * 2 - 1;

  pointer.y =
    -(
      clientY /
      window.innerHeight
    ) * 2 + 1;


  raycaster.setFromCamera(
    pointer,
    camera
  );


  const intersections =
    raycaster.intersectObjects(
      interactiveDistricts,
      false
    );


  if (
    intersections.length > 0
  ) {

    const key =
      intersections[0]
        .object
        .userData
        .section;


    showDistrictHover(
      key,
      clientX,
      clientY
    );

  }

  else if (
    !hoverCardLocked
  ) {

    clearDistrictHover();

  }

}


/* ==========================================================
   DISTRICT HOVER
========================================================== */

function showDistrictHover(
  key,
  mouseX,
  mouseY
) {

  const data =
    portfolioSections[key];


  if (
    !data
  ) {
    return;
  }


  if (
    activeHoverKey !== key
  ) {

    highlightDistrict(
      activeHoverKey,
      false
    );

    highlightDistrict(
      key,
      true
    );

    activeHoverKey =
      key;

  }


  hoverIndex.textContent =
    data.cityIndex;

  hoverTitle.textContent =
    data.cityName;

  hoverDescription.textContent =
    data.cityDescription;


  sectorReadout.textContent =
    data.cityName;


  positionHoverCard(
    mouseX,
    mouseY
  );


  districtHoverCard.classList.add(
    "visible"
  );

  districtHoverCard.setAttribute(
    "aria-hidden",
    "false"
  );


  customCursor.classList.add(
    "active"
  );

  exploreHint.classList.add(
    "hidden"
  );

}


/* ==========================================================
   HOVER CARD POSITION
========================================================== */

function positionHoverCard(
  x,
  y
) {

  if (
    window.innerWidth <= 700
  ) {
    return;
  }


  const width =
    280;

  const height =
    165;

  let left =
    x + 28;

  let top =
    y - 35;


  if (
    left + width >
    window.innerWidth - 20
  ) {

    left =
      x -
      width -
      28;

  }


  if (
    top + height >
    window.innerHeight - 20
  ) {

    top =
      window.innerHeight -
      height -
      20;

  }


  if (
    top < 100
  ) {

    top =
      100;

  }


  districtHoverCard.style.left =
    `${left}px`;

  districtHoverCard.style.top =
    `${top}px`;

}


/* ==========================================================
   CLEAR HOVER
========================================================== */

function clearDistrictHover() {

  if (
    activeHoverKey
  ) {

    highlightDistrict(
      activeHoverKey,
      false
    );

  }


  activeHoverKey =
    null;


  districtHoverCard.classList.remove(
    "visible"
  );

  districtHoverCard.setAttribute(
    "aria-hidden",
    "true"
  );


  sectorReadout.textContent =
    "CENTRAL";


  customCursor.classList.remove(
    "active"
  );

}


/* ==========================================================
   HOVER LOCK
========================================================== */

districtHoverCard.addEventListener(
  "mouseenter",
  () => {

    hoverCardLocked =
      true;

  }
);


districtHoverCard.addEventListener(
  "mouseleave",
  () => {

    hoverCardLocked =
      false;

  }
);


/* ==========================================================
   DISTRICT HIGHLIGHT
========================================================== */

function highlightDistrict(
  key,
  active
) {

  if (
    !key
    ||
    !districtVisuals.has(
      key
    )
  ) {

    return;

  }


  const visual =
    districtVisuals.get(
      key
    );


  visual.pad.material.opacity =
    active
      ? 0.24
      : 0.055;


  visual.pad.material.emissiveIntensity =
    active
      ? 0.5
      : 0.08;


  visual.border.material.opacity =
    active
      ? 0.9
      : 0;

}


/* ==========================================================
   ENTER SECTION
========================================================== */

enterSectionButton.addEventListener(
  "click",
  () => {

    if (
      activeHoverKey
    ) {

      openSection(
        activeHoverKey
      );

    }

  }
);


/* ==========================================================
   OPEN MODAL
========================================================== */

function openSection(
  key
) {

  const data =
    portfolioSections[key];


  if (
    !data
  ) {
    return;
  }


  currentSectionKey =
    key;

  currentItemIndex =
    0;


  modalSectionIndex.textContent =
    data.cityIndex;

  modalSectionTitle.textContent =
    data.panelTitle;

  modalSectionSubtitle.textContent =
    data.panelSubtitle;


  sliderLabel.textContent =
    data.panelTitle;


  sectionSlider.min =
    0;

  sectionSlider.max =
    Math.max(
      0,
      data.items.length - 1
    );

  sectionSlider.value =
    0;


  sliderTotal.textContent =
    formatNumber(
      data.items.length
    );


  sectionModal.classList.add(
    "open"
  );

  sectionModal.setAttribute(
    "aria-hidden",
    "false"
  );


  districtDirectory.classList.remove(
    "open"
  );


  renderCurrentItem();

}


/* ==========================================================
   CLOSE MODAL
========================================================== */

function closeSection() {

  sectionModal.classList.remove(
    "open"
  );

  sectionModal.setAttribute(
    "aria-hidden",
    "true"
  );

}


sectionClose.addEventListener(
  "click",
  closeSection
);


sectionBackdrop.addEventListener(
  "click",
  closeSection
);


/* ==========================================================
   SLIDER
========================================================== */

sectionSlider.addEventListener(
  "input",
  () => {

    currentItemIndex =
      Number(
        sectionSlider.value
      );

    renderCurrentItem();

  }
);


/* ==========================================================
   PREVIOUS / NEXT
========================================================== */

previousItem.addEventListener(
  "click",
  () => {

    navigateItem(
      -1
    );

  }
);


nextItem.addEventListener(
  "click",
  () => {

    navigateItem(
      1
    );

  }
);


function navigateItem(
  direction
) {

  if (
    !currentSectionKey
  ) {

    return;

  }


  const data =
    portfolioSections[
      currentSectionKey
    ];


  currentItemIndex =
    (
      currentItemIndex +
      direction +
      data.items.length
    ) %
    data.items.length;


  sectionSlider.value =
    currentItemIndex;


  renderCurrentItem();

}


/* ==========================================================
   RENDER CURRENT ITEM
========================================================== */

function renderCurrentItem() {

  if (
    !currentSectionKey
  ) {
    return;
  }


  const data =
    portfolioSections[
      currentSectionKey
    ];


  const item =
    data.items[
      currentItemIndex
    ];


  sliderCurrent.textContent =
    formatNumber(
      currentItemIndex + 1
    );


  sectionContent.innerHTML =
    "";


  if (
    data.type ===
    "showcase"
  ) {

    renderShowcase(
      item
    );

  }


  if (
    data.type ===
    "experience"
  ) {

    renderExperience(
      item
    );

  }


  if (
    data.type ===
    "education"
  ) {

    renderEducation(
      item
    );

  }


  if (
    data.type ===
    "skills"
  ) {

    renderSkills(
      item
    );

  }


  if (
    data.type ===
    "research"
  ) {

    renderResearch(
      item
    );

  }


  if (
    data.type ===
    "about"
  ) {

    renderAbout(
      item
    );

  }


  if (
    data.type ===
    "contact"
  ) {

    renderContact(
      item
    );

  }

}


/* ==========================================================
   SHOWCASE RENDER
========================================================== */

function renderShowcase(
  item
) {

  sectionContent.innerHTML = `

    <div class="showcase-layout content-enter">

      <div class="showcase-media">

        <img
          src="${item.media}"
          alt="${item.mediaAlt}"
        />

        <div class="media-overlay"></div>

        <span class="media-label">
          PROJECT VISUAL // MEDIA FEED
        </span>

      </div>


      <div class="showcase-copy">

        <span class="content-kicker">
          ${item.kicker}
        </span>

        <h3>
          ${item.title}
        </h3>

        <p class="content-description">
          ${item.description}
        </p>

        ${renderMeta(
          item.meta
        )}

        ${renderTags(
          item.tags
        )}

        ${
          item.link
            ? `
              <a
                class="archive-link"
                href="${item.link}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${item.linkLabel || "OPEN PROJECT ↗"}
              </a>
            `
            : ""
        }

      </div>

    </div>

  `;

}


/* ==========================================================
   EXPERIENCE RENDER
========================================================== */

function renderExperience(
  item
) {

  sectionContent.innerHTML = `

    <div class="timeline-record content-enter">

      <div class="timeline-side">

        <span class="timeline-year">
          ${item.year}
        </span>

        <div class="timeline-period">
          ${item.period}
        </div>

        <div class="timeline-marker"></div>

      </div>


      <div class="record-main">

        <span class="record-company">
          ${item.company}
        </span>

        <h3>
          ${item.title}
        </h3>

        <span class="record-role">
          ${item.period}
        </span>

        <p class="content-description">
          ${item.description}
        </p>


        <ul class="record-points">

          ${
            item.points
              .map(
                point => `
                  <li>
                    ${point}
                  </li>
                `
              )
              .join("")
          }

        </ul>

        ${renderTags(
          item.tags
        )}

      </div>

    </div>

  `;

}


/* ==========================================================
   EDUCATION RENDER
========================================================== */

function renderEducation(
  item
) {

  sectionContent.innerHTML = `

    <div class="education-record content-enter">

      <div class="campus-card">

        <span class="campus-code">
          ${item.code}
        </span>

        <div class="campus-icon">
          ${item.icon}
        </div>

      </div>


      <div class="record-main">

        <span class="content-kicker">
          ${item.kicker}
        </span>

        <h3>
          ${item.title}
        </h3>

        <p class="content-description">
          ${item.description}
        </p>

        ${renderMeta(
          item.meta
        )}

      </div>

    </div>

  `;

}


/* ==========================================================
   SKILLS RENDER
========================================================== */

function renderSkills(
  item
) {

  sectionContent.innerHTML = `

    <div class="skill-record content-enter">

      <div class="skill-symbol">
        <span>
          ${item.symbol}
        </span>
      </div>


      <div class="record-main">

        <span class="content-kicker">
          ${item.kicker}
        </span>

        <h3>
          ${item.title}
        </h3>

        <p class="content-description">
          ${item.description}
        </p>


        <div class="skill-list">

          ${
            item.skills
              .map(
                skill => `
                  <span class="skill-pill">
                    ${skill}
                  </span>
                `
              )
              .join("")
          }

        </div>


        <div class="used-in">

          <span>
            USED IN
          </span>

          <div class="used-projects">

            ${
              item.usedIn
                .map(
                  project => `
                    <div class="used-project">
                      ${project}
                    </div>
                  `
                )
                .join("")
            }

          </div>

        </div>

      </div>

    </div>

  `;

}


/* ==========================================================
   RESEARCH RENDER
========================================================== */

function renderResearch(
  item
) {

  sectionContent.innerHTML = `

    <div class="research-record content-enter">

      <div class="research-file-number">
        ${item.number}
      </div>


      <div class="record-main">

        <span class="content-kicker">
          ${item.kicker}
        </span>

        <h3>
          ${item.title}
        </h3>

        <p class="content-description">
          ${item.description}
        </p>

        <div class="research-citation">
          ${item.citation}
        </div>

        ${renderTags(
          item.tags
        )}

      </div>

    </div>

  `;

}


/* ==========================================================
   ABOUT RENDER
========================================================== */

function renderAbout(
  item
) {

  sectionContent.innerHTML = `

    <div class="about-record content-enter">

      <div class="identity-display">

        <div class="identity-monogram">
          ${item.monogram}
        </div>

      </div>


      <div class="record-main">

        <span class="content-kicker">
          ${item.kicker}
        </span>

        <h3>
          ${item.title}
        </h3>

        <p class="content-description">
          ${item.description}
        </p>

        ${
          item.meta
            ? renderMeta(
                item.meta
              )
            : ""
        }

        ${
          item.tags
            ? renderTags(
                item.tags
              )
            : ""
        }

      </div>

    </div>

  `;

}


/* ==========================================================
   CONTACT RENDER
========================================================== */

function renderContact(
  item
) {

  sectionContent.innerHTML = `

    <div class="contact-record content-enter">

      <div class="contact-inner">

        <div class="contact-signal">
          ${item.icon}
        </div>

        <span class="content-kicker">
          ${item.kicker}
        </span>

        <h3>
          ${item.title}
        </h3>

        <p class="content-description">
          ${item.description}
        </p>

        <div class="contact-value">
          ${item.value}
        </div>

        <a
          class="archive-link"
          href="${item.link}"
          ${
            item.link.startsWith(
              "mailto:"
            )
              ? ""
              : `
                target="_blank"
                rel="noopener noreferrer"
              `
          }
        >
          ${item.button}
        </a>

      </div>

    </div>

  `;

}


/* ==========================================================
   META
========================================================== */

function renderMeta(
  meta = []
) {

  return `

    <div class="content-meta">

      ${
        meta
          .map(
            row => `

              <div class="meta-row">

                <span>
                  ${row.label}
                </span>

                <strong>
                  ${row.value}
                </strong>

              </div>

            `
          )
          .join("")
      }

    </div>

  `;

}


/* ==========================================================
   TAGS
========================================================== */

function renderTags(
  tags = []
) {

  return `

    <div class="tag-list">

      ${
        tags
          .map(
            tag => `
              <span>
                ${tag}
              </span>
            `
          )
          .join("")
      }

    </div>

  `;

}


/* ==========================================================
   DIRECTORY
========================================================== */

directoryToggle.addEventListener(
  "click",
  () => {

    const open =
      districtDirectory.classList.toggle(
        "open"
      );

    districtDirectory.setAttribute(
      "aria-hidden",
      open
        ? "false"
        : "true"
    );

  }
);


directoryClose.addEventListener(
  "click",
  () => {

    districtDirectory.classList.remove(
      "open"
    );

    districtDirectory.setAttribute(
      "aria-hidden",
      "true"
    );

  }
);


document
  .querySelectorAll(
    "[data-open-section]"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          openSection(
            button.dataset.openSection
          );

        }
      );

    }
  );


/* ==========================================================
   KEYBOARD
========================================================== */

window.addEventListener(
  "keydown",
  event => {

    if (
      event.key ===
      "Escape"
    ) {

      if (
        sectionModal.classList.contains(
          "open"
        )
      ) {

        closeSection();

      }

      else {

        districtDirectory.classList.remove(
          "open"
        );

      }

    }


    if (
      sectionModal.classList.contains(
        "open"
      )
    ) {

      if (
        event.key ===
        "ArrowRight"
      ) {

        navigateItem(
          1
        );

      }


      if (
        event.key ===
        "ArrowLeft"
      ) {

        navigateItem(
          -1
        );

      }

    }


    if (
      event.key.toLowerCase() ===
      "m"
      &&
      !sectionModal.classList.contains(
        "open"
      )
    ) {

      directoryToggle.click();

    }

  }
);


/* ==========================================================
   LOADING
========================================================== */

const loadingPhases = [

  {
    max:
      15,

    text:
      "Initializing city kernel..."
  },

  {
    max:
      33,

    text:
      "Loading architecture..."
  },

  {
    max:
      52,

    text:
      "Activating navigation grid..."
  },

  {
    max:
      68,

    text:
      "Connecting district archives..."
  },

  {
    max:
      82,

    text:
      "Establishing communication array..."
  },

  {
    max:
      94,

    text:
      "Calibrating tactical camera..."
  },

  {
    max:
      100,

    text:
      "City simulation ready."
  }

];


function runLoadingSequence() {

  let progress =
    0;


  const tick =
    () => {

      progress +=
        progress < 70
          ? Math.random() * 9
          : Math.random() * 4;


      progress =
        Math.min(
          100,
          progress
        );


      const rounded =
        Math.floor(
          progress
        );


      loadingFill.style.width =
        `${rounded}%`;

      loadingPercent.textContent =
        `${rounded}%`;


      const phase =
        loadingPhases.find(
          item =>
            rounded <= item.max
        );


      if (
        phase
      ) {

        loadingStatus.textContent =
          phase.text;

      }


      if (
        rounded < 100
      ) {

        window.setTimeout(
          tick,
          90 +
          Math.random() * 100
        );

      }

      else {

        loadingFill.style.width =
          "100%";

        loadingPercent.textContent =
          "100%";

        enterCityButton.disabled =
          false;

        enterCityButton.classList.add(
          "ready"
        );

      }

    };


  tick();

}


/* ==========================================================
   ENTER CITY
========================================================== */

enterCityButton.addEventListener(
  "click",
  () => {

    worldEntered =
      true;

    loadingScreen.classList.add(
      "is-hidden"
    );


    window.setTimeout(
      () => {

        exploreHint.classList.remove(
          "hidden"
        );

      },
      500
    );

  }
);


/* ==========================================================
   CAMERA RESIZE
========================================================== */

window.addEventListener(
  "resize",
  resizeRenderer
);


function resizeRenderer() {

  if (
    !renderer
    ||
    !camera
  ) {

    return;

  }


  const width =
    window.innerWidth;

  const height =
    window.innerHeight;

  const aspect =
    width / height;


  let viewHeight =
    width < 700
      ? 88
      : 69;


  let viewWidth =
    viewHeight * aspect;


  if (
    aspect > 1.75
  ) {

    viewWidth =
      110;

    viewHeight =
      viewWidth / aspect;

  }


  camera.left =
    -viewWidth / 2;

  camera.right =
    viewWidth / 2;

  camera.top =
    viewHeight / 2;

  camera.bottom =
    -viewHeight / 2;


  camera.updateProjectionMatrix();


  renderer.setSize(
    width,
    height
  );


  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );

}


/* ==========================================================
   CAMERA PARALLAX
========================================================== */

function updateCamera() {

  pointer.x =
    THREE.MathUtils.lerp(
      pointer.x,
      pointerTarget.x,
      0.035
    );

  pointer.y =
    THREE.MathUtils.lerp(
      pointer.y,
      pointerTarget.y,
      0.035
    );


  const targetX =
    55 +
    pointer.x * 2.7;

  const targetY =
    67 +
    pointer.y * 1.1;

  const targetZ =
    61 +
    pointer.y * 2.4;


  camera.position.x =
    THREE.MathUtils.lerp(
      camera.position.x,
      targetX,
      0.025
    );

  camera.position.y =
    THREE.MathUtils.lerp(
      camera.position.y,
      targetY,
      0.025
    );

  camera.position.z =
    THREE.MathUtils.lerp(
      camera.position.z,
      targetZ,
      0.025
    );


  camera.lookAt(
    pointer.x * 1.5,
    0,
    pointer.y * -1.2
  );

}


/* ==========================================================
   VEHICLE ANIMATION
========================================================== */

function updateVehicles(
  delta
) {

  animatedVehicles.forEach(
    vehicle => {

      vehicle.object.position[
        vehicle.axis
      ] +=
        vehicle.speed *
        vehicle.direction *
        delta;


      if (
        vehicle.axis ===
        "x"
      ) {

        if (
          vehicle.object.position.x >
          53
        ) {

          vehicle.object.position.x =
            -53;

        }


        if (
          vehicle.object.position.x <
          -53
        ) {

          vehicle.object.position.x =
            53;

        }

      }


      if (
        vehicle.axis ===
        "z"
      ) {

        if (
          vehicle.object.position.z >
          39
        ) {

          vehicle.object.position.z =
            -39;

        }


        if (
          vehicle.object.position.z <
          -39
        ) {

          vehicle.object.position.z =
            39;

        }

      }

    }
  );

}


/* ==========================================================
   SPECIAL ANIMATIONS
========================================================== */

function updateSpecialAnimations(
  elapsed,
  delta
) {

  animatedElements.forEach(
    element => {

      if (
        element.type ===
        "rotate"
      ) {

        element.object.rotation.y +=
          delta *
          element.speed;

        element.object.rotation.x +=
          delta *
          element.speed *
          0.45;

      }


      if (
        element.type ===
        "signal"
      ) {

        const pulse =
          (
            Math.sin(
              elapsed * 2 +
              element.offset
            ) +
            1
          ) /
          2;


        element.object.scale.setScalar(
          0.95 +
          pulse * 0.1
        );


        element.object.material.opacity =
          0.17 +
          pulse * 0.42;

      }

    }
  );

}


/* ==========================================================
   ANIMATION LOOP
========================================================== */

function animate() {

  requestAnimationFrame(
    animate
  );


  const delta =
    clock.getDelta();

  const elapsed =
    clock.elapsedTime;


  updateCamera();

  updateVehicles(
    delta
  );

  updateSpecialAnimations(
    elapsed,
    delta
  );


  renderer.render(
    scene,
    camera
  );

}


/* ==========================================================
   UTIL
========================================================== */

function formatNumber(
  number
) {

  return String(
    number
  ).padStart(
    2,
    "0"
  );

}


/* ==========================================================
   START
========================================================== */

initWorld();

runLoadingSequence();