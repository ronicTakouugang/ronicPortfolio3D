export const projects = [
  {
    title: "Real-time Transaction Scoring Engine",
    tech: ["Python", "Machine Learning", "PCA", "SMOTE", "Streamlit", "SHAP"],
    description: `A real-time transaction scoring engine for proactive financial fraud detection on imbalanced data streams.

- Scoring & Risk Management: Developed a real-time inference pipeline to score fraud probability, optimized to reduce false positives.
- Advanced Feature Engineering: Used PCA on anonymized banking data and managed class imbalance with SMOTE to maximize model sensitivity.
- Operational Dashboarding: Created a Streamlit interface for Risk teams to interpret model predictions (SHAP values) and audit suspicious transactions.`,
    image: "/images/Credit_Card.png",
    link: "#",
  },
  {
    title: "Population Health Management Platform",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Data Visualization"],
    description: `A Healthcare Intelligence solution designed for epidemiological monitoring and computer-assisted diagnosis of diabetes.

- Predictive Modeling Pipeline: Trained and fine-tuned predictive models on historical clinical data to identify major determinants of diabetes using Feature Importance Analysis.
- Data Visualization & Reporting: Created interactive dashboards for statistical exploration of patient data (e.g., glucose distribution, age/pathology correlation) to audit public health trends.
- End-to-End Deployment: Deployed the model via a responsive web application with an intuitive interface for entering vital signs and receiving immediate probabilistic diagnoses.`,
    image: "/images/diabetes_project.png",
    link: "#",
  },
  {
    title: "Edu Chat",
    tech: ["Python", "LangChain", "Pinecone (Vector DB)", "Google Gemini API", "Hugging Face Embeddings", "Streamlit"],
    description: `Designed a Sovereign Generative AI (GenAI) infrastructure to democratize access to academic resources, transforming complex syllabuses into actionable pedagogical insights.

- RAG Architecture: Implemented a LangChain orchestration pipeline to integrate LLMs (Google Gemini) with a factual knowledge base, reducing model hallucinations.
- Semantic Search Engine: Deployed a Pinecone vector database with Hugging Face Transformers embeddings for low-latency semantic search in unstructured curricular documents.
- Context-Aware Synthesis: Developed an abstraction layer for the chatbot to contextualize responses based on official syllabuses, ensuring pedagogical compliance.`,
    image: "/images/Edu_chat.png",
    link: "https://arlybest-edu-chat-acceuil-d9najq.streamlit.app/",
  },
  {
    title: "Sales Dashboard",
    tech: ["Tableau Desktop", "SQL (Data Preparation)", "Calculated Fields (LOD Expressions)"],
    description: `A centralized Business Intelligence (BI) solution for commercial performance monitoring, providing Top Management with a 360° view of operational profitability to accelerate strategic decision-making.

- Multi-Dimensional KPI Tracking: Dynamic monitoring of critical indicators (Revenue, Net Margin, Volumes) with automated YoY Growth calculations.
- Granular Profitability Analysis: Implemented a sub-category profitability matrix to identify "Cash Cows" and "Loss Leaders."
- Trend & Seasonality Detection: Utilized Time Series Analysis to detect seasonalities and anticipate demand fluctuations for Demand Planning.
- Interactive UX/UI Design: Optimized information architecture for "Data Literacy" with dynamic filters and contextual tooltips for non-technical users.`,
    image: "/images/Sales_Dashboard.png",
    link: "https://public.tableau.com/app/profile/takougang.kuatse.ronic/viz/SalesCustomerDashboards_17701527739330/SalesDashboard?publish=yes",
  },
  {
    title: "AI-powered stock analysis platform with predictive forecasting and financial sentiment.",
    tech: ["Next.js", "FastAPI", "Prophet", "FinBERT", "Gemini AI"],
    description: `An AI-powered stock analysis platform featuring a multi-layered predictive system.

Core ML components include:
- Time-Series Forecasting: Facebook Prophet for price trajectory predictions.
- NLP Sentiment Analysis: FinBERT for real-time news sentiment scoring.
- Strategy Backtesting: A Python engine to validate trading models.

A Gemini AI layer synthesizes these signals to generate investment recommendations. The full-stack application is built with a FastAPI backend and a Next.js frontend, deployed on Vercel and Render.`,
    image: "/images/Stock.png",
    link: "https://stockz.vercel.app/",
  },
  {
    title: "HR Dashboard",
    tech: ["GCP", "DataBricks", "ETL", "Medaillon", "Tableau", "Python"],
    description: "A comprehensive dashboard for HR data analysis and visualization.",
    image: "/images/HR_Dashboard.png",
    link: "#",
  },
  {
    title: "Meteo Dashboard",
    tech: ["Terraform", "Python", "GCP", "BigQuery", "dbt", "Looker Studio"],
    description: `I've deployed a "Meteo Analytics" Data platform, ingesting, transforming, and visualizing 14 years of weather history (2010-2024) for 40 major French cities. This fully automated, serverless solution was a significant Full Stack Data Engineering challenge, built on modern best practices:

🛠 Technical Stack:
- Infrastructure as Code (IaC): Terraform for provisioning all GCP resources.
- Ingestion (EL): Python & Google Cloud Functions (Serverless) with Parquet storage on GCS (Data Lake).
- Data Warehouse: Google BigQuery (external tables on the Data Lake).
- Transformation (T): dbt (data build tool) for data modeling and quality (Staging & Marts models).
- Orchestration: Cloud Scheduler for daily updates.
- Visualization: Looker Studio for the interactive dashboard.

From API management to SQL intricacies and dashboard design, this project offered a fascinating deep dive into the modern Data ecosystem.`,
    image: "/images/Meteo_Dashboard.png",
    link: "https://lookerstudio.google.com/reporting/10eb5b17-4356-47c7-8cd1-b2c5fc27cdb2",
  },
  {
    title: "Coming Soon",
    tech: ["Python", "SQL", "Tableau", "Data Analysis"],
    description: "An upcoming project focusing on advanced data analytics techniques to derive actionable insights from complex datasets.",
    image: "/images/cs_1.png",
    link: "#",
  },
  {
    title: "Confidential Project",
    tech: ["GCP", "ETL", "BigQuery", "Looker Studio"],
    description: "A confidential project involving the design and implementation of a scalable data pipeline and dashboarding solution in a cloud environment.",
    image: "/images/cs_2.png",
    link: "#",
  },
  {
    title: "Project Alpha",
    tech: ["Machine Learning", "Python", "Predictive Modeling"],
    description: "An internal R&D project exploring predictive modeling for business forecasting using various machine learning algorithms.",
    image: "/images/cs_3.png",
    link: "#",
  },
  {
    title: "Project Beta",
    tech: ["Spark", "Kafka", "Data Streaming"],
    description: "A project focused on building a real-time data streaming platform for processing high-velocity data using distributed computing.",
    image: "/images/cs_4.png",
    link: "#",
  },
  {
    title: "Project Gamma",
    tech: ["Cloud Computing", "Data Warehousing", "AWS/Azure"],
    description: "Developing a cloud-based data warehousing solution for robust data storage and retrieval, ensuring data integrity and accessibility.",
    image: "/images/cs_5.png",
    link: "#",
  },
];
