export const portfolioData = {
  name: "Tanmay Warke",
  bio: "Third-year B.Tech student in Computer Science Engineering – Artificial Intelligence & Analytics at MIT ADT University, Pune. AI Engineer & Creative Technologist building intelligent systems where AI, computer vision, software and hardware meet.",
  email: "tanmaywarke1227@gmail.com",
  phone: "+91 7888249506",
  location: "Pune, Maharashtra, India",
  social: {
    linkedin: "https://www.linkedin.com/in/tanmay-warke-0278b2331/",
    github: "https://github.com/tanmaywarke1227",
    resume: "/resume.pdf"
  },
  certifications: [
    "IBM Machine Learning",
    "IBM Introduction to Artificial Intelligence",
    "Google Computer Networking"
  ],
  experience: [
    {
      company: "Uchit Technology Pvt. Ltd.",
      position: "Software Engineer Intern",
      duration: "2024",
      location: "Pune, India",
      modules: [
        {
          id: "01",
          title: "AI & Video Analytics",
          areas: [
            "VMS / CCTV analytics system development",
            "AI model testing across detection classes (PPE, helmet, fire/smoke, vehicle, queue)",
            "Production-focused model evaluation and accuracy benchmarking",
          ],
        },
        {
          id: "02",
          title: "Model Evaluation & QA",
          areas: [
            "Precision, recall, F1-score analysis",
            "Black-box testing methodology",
            "Confidence threshold optimization",
            "Backend model evaluation pipelines",
          ],
        },
        {
          id: "03",
          title: "Testing & Audits",
          areas: [
            "Backend and API testing for AI services",
            "VMS UI testing and validation",
            "Lighthouse performance audits",
            "HRM application testing",
          ],
        },
        {
          id: "04",
          title: "Automation Architecture",
          areas: [
            "Email and WhatsApp automation system design",
            "AI automation architecture planning",
            "Internal process automation workflows",
          ],
        },
        {
          id: "05",
          title: "Research & Documentation",
          areas: [
            "Client and lead research",
            "Product strategy and B2B sales research",
            "Technical reports and research documentation",
          ],
        },
      ],
    },
    {
      company: "IEEE TechForGood 2026",
      position: "Project-Based Intern — Team NeuroX",
      duration: "2026",
      location: "Remote",
      project: "Dynamic Energy Load Balancing for Smart Buildings Using RL-Based HVAC Optimization",
      modules: [
        {
          id: "01",
          title: "RL & Simulation",
          areas: [
            "TD3 reinforcement learning using Stable-Baselines3 and PyTorch",
            "43,200 simulated sensor records for validation",
            "100k training episodes with reward-shaped optimization",
          ],
        },
        {
          id: "02",
          title: "Embedded Integration",
          areas: [
            "Raspberry Pi Pico W sensor node design",
            "MicroPython firmware for temperature and humidity data",
            "Real-time data pipeline from hardware to model",
          ],
        },
        {
          id: "03",
          title: "Dashboard & Testing",
          areas: [
            "React + TypeScript monitoring dashboard",
            "96% end-to-end test pass rate",
            "Energy optimization visualization and analytics",
          ],
        },
      ],
    },
  ],
  projects: [
    {
      slug: "ieee-energy-rl",
      title: "Dynamic Energy Load Balancing for Smart Buildings",
      category: "AI / Reinforcement Learning",
      description: "RL-based HVAC optimization system using TD3 for intelligent energy management in smart buildings, built for IEEE TechForGood 2026.",
      overview: "Designed and implemented a reinforcement learning system for dynamic energy load balancing in smart buildings. The system uses a TD3 agent trained on simulated building sensor data to optimize HVAC operations and reduce energy waste.",
      role: "RL Engineer & Embedded Integration",
      challenge: "Optimizing HVAC energy usage in real-time while maintaining comfort conditions across diverse building zones with varying occupancy patterns.",
      solution: "TD3 reinforcement learning agent trained over 100k episodes on 43,200 simulated sensor records, integrated with Raspberry Pi Pico W hardware for real-time temperature and humidity acquisition.",
      technologies: ["Python", "PyTorch", "Stable-Baselines3", "Raspberry Pi Pico W", "MicroPython", "React", "TypeScript"],
      features: [
        "TD3 reinforcement learning for HVAC control",
        "43,200 simulated sensor records for training validation",
        "100k training episodes with reward shaping",
        "Raspberry Pi Pico W sensor integration",
        "React + TypeScript monitoring dashboard",
        "96% end-to-end test pass rate"
      ],
      architecture: {
        problem: "Buildings waste significant energy through inefficient HVAC scheduling that doesn't adapt to real-time conditions",
        context: "IEEE TechForGood 2026 project with Team NeuroX, targeting sustainable building energy management",
        myRole: "Designed the RL training pipeline, implemented TD3 agent, built hardware sensor integration, and developed the monitoring dashboard",
        technicalChallenges: [
          "Balancing exploration vs exploitation in a complex continuous action space",
          "Simulating realistic building thermal dynamics for training",
          "Bridging the sim-to-real gap with hardware sensor data",
          "Maintaining inference speed for real-time control decisions"
        ],
        approach: "TD3 (Twin Delayed DDPG) with custom reward shaping, trained on synthetic building data, validated against real sensor readings from Pico W nodes",
        testing: "End-to-end testing achieving 96% pass rate, simulation fidelity validation, hardware integration testing",
        outcome: "Functional RL-based HVAC optimization system demonstrating measurable energy savings in simulated building environments",
        learnings: "Reward engineering is the hardest part of RL — small changes in the reward function drastically alter learned behavior"
      },
      testing: "End-to-end pipeline testing, simulation validation, hardware integration tests",
      outcome: "Demonstrated RL-based energy optimization for IEEE TechForGood 2026",
      status: "Completed",
      year: 2026,
      images: ["/projects/ieee-energy-rl/monitoring.png", "/projects/ieee-energy-rl/dashboard.png", "/projects/ieee-energy-rl/hardware.jpeg"],
      github: "https://github.com/tanmaywarke1227/neuroX-project",
      liveDemo: "#",
      featured: true
    },
    {
      slug: "ai-character-detector",
      title: "AI Character Detector",
      category: "Computer Vision / Deep Learning",
      description: "Deep learning character classification system using fine-tuned ResNet50 with Grad-CAM explainability, achieving 99.94% accuracy on 30k images.",
      overview: "Built a high-accuracy character detection and classification system by fine-tuning a ResNet50 backbone on a dataset of 30,000 character images, with Grad-CAM visualization for model interpretability.",
      role: "ML Engineer & Backend Developer",
      challenge: "Achieving near-perfect classification accuracy across a large number of character classes while maintaining model interpretability and fast inference.",
      solution: "Transfer learning with ResNet50 fine-tuned on augmented data, FastAPI backend for inference, and Grad-CAM heatmaps for visual explanation of model decisions.",
      technologies: ["Python", "PyTorch", "ResNet50", "FastAPI", "Grad-CAM", "Albumentations", "OpenCV"],
      features: [
        "99.94% classification accuracy on 30k images",
        "Fine-tuned ResNet50 backbone",
        "Grad-CAM explainability heatmaps",
        "FastAPI inference endpoint",
        "Data augmentation pipeline with Albumentations",
        "Real-time character detection"
      ],
      architecture: {
        problem: "Automated character recognition requires high accuracy and explainability for trust in downstream applications",
        context: "Personal project exploring transfer learning and model explainability techniques",
        myRole: "Designed the training pipeline, fine-tuned the model, implemented Grad-CAM, and built the FastAPI backend",
        technicalChallenges: [
          "Preventing overfitting on a moderately-sized dataset",
          "Balancing augmentation intensity to improve generalization without distortion",
          "Implementing Grad-CAM correctly for the ResNet50 architecture",
          "Optimizing inference latency for real-time use"
        ],
        approach: "Transfer learning from ImageNet-pretrained ResNet50, progressive unfreezing, heavy augmentation, Grad-CAM on the final convolutional layer",
        testing: "K-fold cross-validation, confusion matrix analysis, Grad-CAM visual inspection",
        outcome: "99.94% accuracy with interpretable predictions via Grad-CAM",
        learnings: "Transfer learning with careful fine-tuning dramatically outperforms training from scratch on limited data"
      },
      testing: "Cross-validation, confusion matrix analysis, Grad-CAM visual inspection",
      outcome: "Production-ready character classifier with explainability",
      status: "Completed",
      year: 2024,
      images: [],
      github: "https://github.com/tanmaywarke1227/AI-character-detector",
      liveDemo: "#",
      featured: true
    },
    {
      slug: "term-grant-slip",
      title: "Term Grant Slip Digitalization System",
      category: "Full Stack / Web",
      description: "Full-stack web application for digitizing university term grant slip processing with real-time status tracking and automated SMTP notifications.",
      overview: "Built an end-to-end system to replace paper-based term grant slip workflows at the university with a digital application featuring form submission, approval routing, real-time status tracking, and email notifications.",
      role: "Full Stack Developer",
      challenge: "Replacing a manual, paper-based administrative workflow with a reliable digital system while ensuring ease of use for non-technical staff.",
      solution: "React 18 frontend with Vite build tooling, Flask backend with Firebase Firestore for document storage, and SMTP-based automated notifications for status updates.",
      technologies: ["React 18", "Vite", "Flask", "Firebase Firestore", "SMTP", "JavaScript", "Python"],
      features: [
        "Digital form submission replacing paper slips",
        "Multi-stage approval routing",
        "Real-time status tracking for students",
        "Automated SMTP email notifications",
        "Firebase Firestore document storage",
        "Responsive design for mobile access"
      ],
      architecture: {
        problem: "Paper-based term grant slip processing is slow, error-prone, and lacks transparency for students",
        context: "University administrative workflow digitization project",
        myRole: "Designed and built the full application — frontend, backend API, database schema, and notification system",
        technicalChallenges: [
          "Modeling the multi-stage approval workflow correctly",
          "Ensuring reliable email delivery via SMTP",
          "Real-time status updates without complex WebSocket infrastructure",
          "Handling concurrent form submissions gracefully"
        ],
        approach: "React SPA with Vite for fast development, Flask REST API, Firestore for flexible document storage, SMTP for notifications",
        testing: "Unit tests for API endpoints, integration testing for approval workflow, user acceptance testing",
        outcome: "Working system deployed for university use, replacing paper workflows",
        learnings: "Administrative workflows have many edge cases that only surface during user testing with real staff"
      },
      testing: "API unit tests, workflow integration tests, user acceptance testing",
      outcome: "Deployed digital system replacing paper-based grant slip processing",
      status: "Completed",
      year: 2024,
      images: [],
      github: "https://github.com/tanmaywarke1227/tgs-frontend",
      githubBackend: "https://github.com/tanmaywarke1227/tgs-backend",
      liveDemo: "#",
      featured: true
    },
    {
      slug: "loan-approval",
      title: "Explainable Loan Approval System",
      category: "ML / Explainability",
      description: "Machine learning loan approval prediction system using Random Forest with SHAP-based explainability and an interactive Streamlit dashboard.",
      overview: "Developed a loan approval prediction system that combines a Random Forest classifier with SHAP (SHapley Additive exPlanations) to provide transparent, human-interpretable explanations for each prediction.",
      role: "ML Developer",
      challenge: "Building a loan approval model that is not only accurate but also explainable — meeting regulatory and ethical requirements for automated financial decisions.",
      solution: "Random Forest classifier with SHAP integration for feature importance and individual prediction explanations, deployed via Streamlit for interactive exploration.",
      technologies: ["Python", "Scikit-learn", "SHAP", "Streamlit", "Pandas", "NumPy", "Matplotlib"],
      features: [
        "Random Forest loan approval prediction",
        "SHAP-based global and local explainability",
        "Interactive Streamlit dashboard",
        "Feature importance visualization",
        "Individual prediction explanation",
        "Data cleaning and feature engineering pipeline"
      ],
      architecture: {
        problem: "Black-box ML models for financial decisions are unacceptable — regulators and users need to understand why a loan was approved or denied",
        context: "Academic project exploring explainable AI in financial applications",
        myRole: "Built the end-to-end pipeline: data preprocessing, model training, SHAP analysis, and Streamlit interface",
        technicalChallenges: [
          "Balancing model accuracy with interpretability",
          "Computing SHAP values efficiently for large datasets",
          "Designing an intuitive interface for non-technical users to understand explanations",
          "Handling imbalanced approval/denial classes"
        ],
        approach: "Random Forest for robust classification, SHAP TreeExplainer for efficient explanation, Streamlit for rapid prototyping of the interactive dashboard",
        testing: "Cross-validation, SHAP consistency checks, user comprehension testing",
        outcome: "Explainable loan approval system with transparent decision-making",
        learnings: "SHAP makes ML models genuinely trustworthy by revealing exactly which features drive each prediction"
      },
      testing: "Cross-validation, SHAP consistency validation, user testing",
      outcome: "Transparent, explainable loan approval ML system",
      status: "Completed",
      year: 2024,
      images: [],
      github: "https://github.com/tanmaywarke1227/loan-approval-xai",
      liveDemo: "#",
      featured: true
    },
    {
      slug: "rainfall-prediction",
      title: "Rainfall Prediction Model",
      category: "Data Science / ML",
      description: "Machine learning model for rainfall prediction using structured weather data with comprehensive data analysis and visualization.",
      overview: "Built a rainfall prediction model using structured weather datasets, encompassing the full data science pipeline from cleaning and exploratory analysis through feature engineering, model training, and evaluation.",
      role: "Data Scientist",
      challenge: "Accurately predicting rainfall from noisy, incomplete weather data with complex temporal and spatial patterns.",
      solution: "Systematic data science pipeline: cleaning, profiling, feature engineering, model selection (multiple algorithms compared), and evaluation with visualizations.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "NumPy"],
      features: [
        "Comprehensive data cleaning and profiling",
        "Feature engineering from weather attributes",
        "Multiple model comparison and selection",
        "Detailed performance evaluation metrics",
        "Data visualization with Matplotlib and Seaborn",
        "End-to-end reproducible pipeline"
      ],
      architecture: {
        problem: "Rainfall prediction is critical for agriculture and disaster management but is challenging due to noisy and incomplete weather data",
        context: "Data science project covering the complete ML pipeline",
        myRole: "Designed and executed the full pipeline: data exploration, cleaning, feature engineering, model training, and evaluation",
        technicalChallenges: [
          "Handling missing values and noisy sensor data",
          "Engineering meaningful features from raw weather attributes",
          "Selecting the right model from multiple candidates",
          "Avoiding data leakage in temporal weather data"
        ],
        approach: "Structured pipeline: EDA → cleaning → feature engineering → model comparison → evaluation → visualization",
        testing: "Train/test split, cross-validation, metric comparison across models",
        outcome: "Accurate rainfall prediction model with comprehensive analysis",
        learnings: "Feature engineering and data quality matter far more than model complexity for structured data problems"
      },
      testing: "Cross-validation, metric comparison, visualization analysis",
      outcome: "Working rainfall prediction pipeline with thorough analysis",
      status: "Completed",
      year: 2024,
      images: [],
      github: "https://github.com/tanmaywarke1227/Rainfall-prediction-model-ML",
      liveDemo: "#",
      featured: true
    }
  ],
  skills: {
    aiMl: ["Python", "PyTorch", "Scikit-learn", "YOLO / OpenCV", "Reinforcement Learning", "SHAP"],
    data: ["Pandas", "NumPy", "SQL", "Matplotlib"],
    web: ["React / Next.js", "TypeScript", "FastAPI / Flask", "REST APIs"],
    threeD: ["Three.js", "React Three Fiber", "Framer Motion / GSAP"],
    embedded: ["Raspberry Pi Pico W / MicroPython", "ESP8266 / ESP32", "Arduino / Sensor Integration"],
    tools: ["Git / GitHub", "Docker", "VS Code", "Lighthouse"]
  }
};




