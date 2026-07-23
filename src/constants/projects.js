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
    title: "ShopWise",
    tech: ["Angular", "Flask", "PostgreSQL", "Docker", "Firebase", "Chart.js"],
    description: `ShopWise is a multi-retailer price comparison platform that simultaneously searches several e-commerce sites (Amazon, Glotelho, E.Leclerc, Auchan, Materiel.net), normalizes the results, and displays them side-by-side.

- Frontend: Angular 19 with PrimeNG components, RxJS, and Chart.js for price-history visualization.
- Backend: A layered Flask API (routes, services, repositories, scrapers) using curl_cffi and BeautifulSoup for scraping, with rate limiting via Flask-Limiter.
- Data: PostgreSQL in production (SQLite for development), with APScheduler running periodic price checks that trigger email/in-app alerts when a monitored product drops in price.
- Auth & Deployment: Firebase authentication, Docker containers, deployed via Render with GitHub Actions CI/CD.`,
    image: "/images/ShopWise.png",
    link: "https://shopwise-client.onrender.com/",
  },
  {
    title: "Job Market Dashboard",
    tech: ["Python", "pandas", "SQLite", "Medaillon", "ETL", "Tableau"],
    description: `An ETL pipeline collecting job postings from three official French job-market APIs (APEC, France Travail, Adzuna) to analyze the Data/BI job market in France.

- Extraction: Python & requests against REST/OAuth2 APIs, pulling postings from all three sources.
- Transformation: A medallion architecture (Bronze → Silver → Gold) built with pandas, deduplicating postings and enriching them with detected skills, job categories, and salary information.
- Storage: A SQLite data warehouse modeled as a star schema, alongside CSV exports.
- Visualization: An interactive Tableau dashboard covering 3,097 analyzed postings across 1,095 companies, surfacing in-demand skills, tech stacks, and experience levels.
- Testing: pytest coverage across the pipeline.`,
    image: "/images/JobMarket.png",
    link: "https://public.tableau.com/app/profile/takougang.kuatse.ronic/viz/Projet_Visualisation_17740458603320/Job_Market",
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
