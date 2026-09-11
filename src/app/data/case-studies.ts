// Workflow copy is grounded in the supplied brief and existing project records.
// Do not add metrics, split ratios or preprocessing methods without source evidence.
export interface WorkflowStep { title: string; description: string; tools: string; }
export const evidenceCaptions: Record<string, string> = {
  "/projects/ieee-energy-rl/monitoring.png": "TD3 training history and monitoring dashboard — original project screenshot.",
  "/projects/ieee-energy-rl/dashboard.png": "RL decision flow, rewards and action distribution — original project screenshot.",
  "/projects/ieee-energy-rl/hardware.jpeg": "Physical sensor and relay integration — original project hardware photograph.",
};
export const dataWorkflows: Record<string, WorkflowStep[]> = {
  "rainfall-prediction": [
    { title: "Clean & explore", description: "Clean structured weather data with Pandas and use exploratory analysis to understand data quality, missing values and weather patterns.", tools: "Pandas · EDA" },
    { title: "Prepare features", description: "Engineer model inputs from weather attributes, connecting the exploratory analysis to the prediction task.", tools: "Pandas · NumPy" },
    { title: "Model & evaluate", description: "Train and compare Scikit-learn models, using validation and evaluation metrics to assess their predictions.", tools: "Scikit-learn" },
    { title: "Make the analysis visible", description: "Use Matplotlib and Seaborn to visualize the data and communicate the model comparison and evaluation.", tools: "Matplotlib · Seaborn" },
  ],
  "loan-approval": [
    { title: "Applicant data & preprocessing", description: "Prepare the Kaggle Loan Prediction applicant dataset for modeling, handling categorical and numerical features with saved encoders, a scaler and a consistent feature list.", tools: "Pandas · Scikit-learn" },
    { title: "Train & predict", description: "Train a Random Forest classifier and present both the approval decision and its prediction probability in the Streamlit interface.", tools: "Scikit-learn · Streamlit" },
    { title: "Explain the decision", description: "Calculate SHAP feature contributions to show how applicant attributes influence an individual prediction.", tools: "SHAP" },
    { title: "Visualize & evaluate", description: "Use SHAP waterfall and bar charts to explain predictions, alongside classification reports, a confusion matrix and feature-importance visuals for model evaluation.", tools: "SHAP · Matplotlib" },
  ],
  "ieee-energy-rl": [
    { title: "Profile the simulation data", description: "Profile and validate the simulated smart-building dataset before using it for reinforcement-learning experiments.", tools: "Simulated building sensor data" },
    { title: "Understand building behavior", description: "Examine occupancy, environmental conditions and energy-consumption trends to understand the conditions the HVAC controller must respond to.", tools: "Occupancy · Environment · Energy" },
    { title: "Prepare training & evaluation", description: "Prepare the simulated building data for TD3 training and evaluation, keeping simulation validation distinct from hardware integration testing.", tools: "PyTorch · Stable-Baselines3" },
  ],
  "ai-character-detector": [
    { title: "Prepare image inputs", description: "Prepare character images for ResNet50 fine-tuning and apply the documented augmentation pipeline to support generalization.", tools: "OpenCV · Albumentations" },
    { title: "Evaluate classification", description: "Use cross-validation and confusion-matrix analysis to examine classification performance across character classes.", tools: "PyTorch · Model evaluation" },
    { title: "Inspect visual explanations", description: "Inspect Grad-CAM heatmaps to see which image regions contribute to the model’s character predictions.", tools: "Grad-CAM" },
  ],
};

// High-level relationships from the existing architecture descriptions, not evidence screenshots.
export const systemFlows: Record<string, string[]> = {
  "ieee-energy-rl": ["Building simulation", "TD3 controller", "Monitoring dashboard"],
  "ai-character-detector": ["Character image", "ResNet50", "Prediction + Grad-CAM"],
  "term-grant-slip": ["React interface", "Flask API", "Firestore + SMTP"],
  "loan-approval": ["Applicant features", "Random Forest", "SHAP + Streamlit"],
  "rainfall-prediction": ["Weather data", "Feature preparation", "Prediction + evaluation"],
};

