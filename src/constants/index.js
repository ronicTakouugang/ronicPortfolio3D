const navLinks = [
    {
        name: "Work",
        link: "#work",
    },
    {
        name: "Experience",
        link: "#experience",
    },
    {
        name: "Skills",
        link: "#skills",
    },
];

const words = [
    { text: "Data", imgPath: "/images/designs.svg" },
    { text: "Pipelines", imgPath: "/images/code.svg" },
    { text: "Insights", imgPath: "/images/ideas.svg" },
    { text: "Models", imgPath: "/images/concepts.svg" },
];

const logoIconsList = [
    {
        imgPath: "/images/logos/snowflake.png",
    },
    {
        imgPath: "/images/logos/databricks.png",
    },
    {
        imgPath: "/images/logos/python.svg",
    },
    {
        imgPath: "/images/logos/react.png",
    },
    {
        imgPath: "/images/logos/node.png",
    },
    {
        imgPath: "/images/logos/three.png",
    },
    {
        imgPath: "/images/logos/git.svg",
    },
];

const abilities = [
    {
        imgPath: "/images/seo.png",
        title: "Quality Focus",
        desc: "Delivering high-quality results while maintaining attention to every detail.",
    },
    {
        imgPath: "/images/chat.png",
        title: "Reliable Communication",
        desc: "Keeping you updated at every step to ensure transparency and clarity.",
    },
    {
        imgPath: "/images/time.png",
        title: "On-Time Delivery",
        desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
    },
];

const techStackImgs = [
    {
        name: "Data Visualizer",
        imgPath: "/images/logos/react.png",
    },
    {
        name: "Python Developer",
        imgPath: "/images/logos/python.svg",
    },
    {
        name: "Data Modeler",
        imgPath: "/images/logos/node.png",
    },
    {
        name: "BI Developer",
        imgPath: "/images/logos/three.png",
    },
    {
        name: "Project Manager",
        imgPath: "/images/logos/git.svg",
    },
];

const techStackIcons = [
    {
        name: "Data Architecture",
        modelPath: "/models/git-svg-transformed.glb",
        scale: 0.05,
        rotation: [0, 0, 0],
    },
    {
        name: "Python Developer",
        modelPath: "/models/python-transformed.glb",
        scale: 0.8,
        rotation: [0, 0, 0],
    },
    {
        name: "Power BI",
        modelPath: "/models/power_bi.glb",
        scale: 0.6,
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "BI Developer",
        modelPath: "/models/tableau.glb",
        scale: 0.2,
        rotation: [0, 0, 0],
    },
    {
        name: "Cloud Data",
        modelPath: "/models/data_center_low-poly.glb",
        scale: 0.1,
        rotation: [0, -Math.PI / 4, 0],
    },
];

const expCards = [
    {
        review:
            "Junior Data Analyst & BI Developer at Financial House S.A.",
        imgPath: "/images/Fh.png",
        logoPath: "/images/Fh_logo.png",
        title: "Junior Data Analyst & BI Developer",
        date: "January 2024 - January 2025",
        responsibilities: [
            "Participated in the implementation of a Data Warehouse on a secure Cloud architecture.",
            "Developed ETL scripts connected to Cloud APIs to automate financial flows.",
            "Star Schema modeling in SQL Server to optimize analytical queries.",
        ],
    },
    {
        review:
            "Data Analyst at Win Technology.",
        imgPath: "/images/Win.png",
        logoPath: "/images/Win.png",
        title: "Data Analyst",
        date: "September 2022 - October 2023",
        responsibilities: [
            "Data collection (Python scraping) and storage in the Cloud (Cloud Storage) for archiving.",
            "Cleaned and structured raw datasets before ingestion into a remote PostgreSQL database.",
            "Collaborated on the migration of certain on-premises data to a Cloud environment.",
        ],
    },
    {
        review:
            "Software Engineer at Source du Pays S.A.",
        imgPath: "/images/Source_P.png",
        logoPath: "/images/Source_logo.png",
        title: "Software Engineer",
        date: "February 2022 - June 2022",
        responsibilities: [
            "Corrective and evolutionary maintenance of the inventory management application (Java).",
            "Optimization of SQL queries to accelerate the display of inventory reports.",
            "Creation of UML diagrams for the design of new modules.",
        ],
    },
];

const expLogos = [
    {
        name: "logo1",
        imgPath: "/images/logo1.png",
    },
    {
        name: "logo2",
        imgPath: "/images/logo2.png",
    },
    {
        name: "logo3",
        imgPath: "/images/logo3.png",
    },
];

const socialImgs = [
    {
        name: "insta",
        url: "https://www.instagram.com/",
        imgPath: "/images/insta.png",
    },
    {
        name: "fb",
        url: "https://www.facebook.com/",
        imgPath: "/images/fb.png",
    },
    {
        name: "x",
        url: "https://www.x.com/",
        imgPath: "/images/x.png",
    },
    {
        name: "linkedin",
        url: "https://www.linkedin.com/",
        imgPath: "/images/linkedin.png",
    },
];

const projectTechStack = [
    { name: "Next.js" },
    { name: "FastAPI" },
    { name: "Prophet" },
    { name: "FinBERT" },
    { name: "Gemini AI" },
];

const jobMarketTechStack = [
    { name: "Python" },
    { name: "pandas" },
    { name: "SQLite" },
    { name: "Medaillon" },
    { name: "ETL" },
    { name: "Tableau" },
];

const shopWiseTechStack = [
    { name: "Angular" },
    { name: "Flask" },
    { name: "PostgreSQL" },
    { name: "Docker" },
    { name: "Firebase" },
    { name: "Chart.js" },
];

export {
    words,
    abilities,
    logoIconsList,
    expCards,
    expLogos,
    socialImgs,
    techStackIcons,
    techStackImgs,
    navLinks,
    projectTechStack,
    jobMarketTechStack,
    shopWiseTechStack,
};