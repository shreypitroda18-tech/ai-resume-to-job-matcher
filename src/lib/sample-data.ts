export interface SamplePreset {
  id: string;
  title: string;
  role: string;
  resumeText: string;
  jobDescriptionText: string;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: "senior-swe",
    title: "Senior Full-Stack Engineer",
    role: "Engineering",
    resumeText: `Alex Morgan
alex.morgan@email.com | (555) 345-6789 | San Francisco, CA | github.com/alexm-dev | linkedin.com/in/alexmorgan

SUMMARY
Full-Stack Software Engineer with 5+ years of experience designing, scaling, and maintaining high-traffic web applications using React, TypeScript, Node.js, and AWS. Proven track record of optimizing frontend bundle performance and building RESTful microservices.

TECHNICAL SKILLS
- Languages: TypeScript, JavaScript (ES6+), Python, HTML5, CSS3/Tailwind
- Frameworks & Libraries: React, Node.js, Express, Redux Toolkit, Jest, React Testing Library
- Databases: PostgreSQL, MongoDB, Redis
- Cloud & Infrastructure: AWS (S3, EC2, CloudFront, Lambda), Docker, Git, Linux
- Concepts: REST APIs, System Design, Agile/Scrum, CI/CD pipelines (GitHub Actions)

PROFESSIONAL EXPERIENCE

Lead Software Engineer | ApexCloud Solutions, San Francisco, CA | 2022 - Present
- Architected and shipped a multi-tenant analytics dashboard in React and Node.js serving over 40,000 daily active users.
- Migrated legacy monolith service to containerized Docker microservices on AWS EC2, improving deployment cadence by 60%.
- Integrated Redis caching layer for top database queries, dropping average p95 response times from 850ms to 120ms.
- Mentored 4 junior engineers on clean architecture, unit testing, and code review standards.
- Built reusable UI component library used across 3 separate internal engineering teams.

Full-Stack Developer | InnovateTech Labs, Austin, TX | 2020 - 2022
- Developed responsive client portal using React, TypeScript, and Tailwind CSS, increasing user onboarding completion by 22%.
- Created automated test suites using Jest and React Testing Library, boosting overall test coverage from 45% to 82%.
- Built RESTful backend endpoints in Node.js/Express backed by PostgreSQL, handling 2M+ transactions monthly.
- Collaborated with product managers and designers in bi-weekly sprints to define technical specifications and acceptance criteria.

Junior Web Developer | Nexus Digital, Austin, TX | 2018 - 2020
- Built and maintained client web applications using JavaScript, HTML5, and Sass.
- Fixed performance bottlenecks and resolved browser cross-compatibility bugs across modern browsers.
- Wrote SQL queries and automated reporting scripts in Python for business operations.

EDUCATION
Bachelor of Science in Computer Science | University of Texas at Austin | 2014 - 2018`,
    jobDescriptionText: `Senior Full-Stack Software Engineer — High Growth B2B SaaS

About the Role:
We are looking for a Senior Full-Stack Software Engineer to lead the architecture and implementation of our real-time collaboration platform. You will build resilient, distributed systems, lead technical initiatives from discovery to deployment, and raise our engineering standards.

Requirements & Qualifications:
- 5+ years of professional software engineering experience building scalable web applications.
- Strong proficiency in TypeScript, React, and Next.js (App Router, Server Components).
- Extensive experience designing backend microservices with Node.js and GraphQL APIs.
- Production experience with Kubernetes orchestration, Docker containerization, and Terraform / Infrastructure as Code.
- Deep hands-on experience with cloud platforms (AWS preferred: Lambda, EKS, RDS, SQS).
- Experience with real-time event streaming and message brokers (Apache Kafka, RabbitMQ, or WebSockets).
- Solid knowledge of database engineering with PostgreSQL, including indexing, query optimization, and schema migrations.
- Commitment to software craftsmanship: automated testing (Cypress, Playwright, Jest), CI/CD pipelines, and observability (Datadog, OpenTelemetry).
- Proven ability to mentor engineers, conduct architectural design reviews, and break down ambiguous product requirements.

Nice to Have:
- Experience with AI/LLM application development (LangChain, OpenAI or Gemini API integration).
- Familiarity with Vector Databases (Pinecone, pgvector) and RAG architecture.
- Background in high-compliance SaaS environments (SOC2, HIPAA).`,
  },
  {
    id: "product-manager",
    title: "Technical Product Manager",
    role: "Product",
    resumeText: `Jordan Taylor
jordan.taylor@email.com | (555) 789-0123 | New York, NY | linkedin.com/in/jordantaylor-pm

SUMMARY
Technical Product Manager with 4+ years leading cross-functional teams to build data-intensive B2B SaaS products. Adept at translating complex customer pain points into roadmaps, partnering closely with engineering, and driving user adoption through data-informed experiments.

CORE COMPETENCIES
- Product Strategy: OKRs, Roadmapping, Market Research, Competitor Benchmarking, User Journey Mapping
- Methodologies: Agile/Scrum, Sprint Planning, Feature Prioritization (RICE/MoSCoW), Backlog Grooming
- Analytics & Data: SQL, Mixpanel, Google Analytics, Excel/Sheets financial modeling, Tableau
- Technical Skills: API Integrations, Webhooks, Basic Python, Postman, System Architecture understanding
- Tools: Jira, Confluence, Figma, Notion, Miro, Linear

WORK EXPERIENCE

Product Manager | Dataview Systems, New York, NY | 2022 - Present
- Led roadmap execution for enterprise data integration suite used by Fortune 500 financial clients, driving \$3.8M in net new ARR.
- Partnered with engineering leads to redesign webhook and public API authentication, reducing developer onboarding time by 35%.
- Formulated and executed 14 A/B tests on self-serve checkout funnel, increasing trial-to-paid conversion by 18%.
- Authored 40+ comprehensive PRDs, user stories, and acceptance criteria in Jira and Confluence.
- Conducted 50+ user interviews with enterprise buyers to identify feature gaps and inform quarterly roadmap priorities.

Associate Product Manager | VentureScale Media, Boston, MA | 2020 - 2022
- Managed feature delivery for core publishing workflow application serving 150+ internal editorial staff.
- Analyzed product telemetry using SQL and Mixpanel to identify user drop-off points, leading to a revamped navigation UI.
- Coordinated weekly sprint ceremonies (standups, sprint planning, retrospectives) for a squad of 8 engineers and 1 designer.
- Increased monthly feature adoption by 28% through in-app walkthroughs and detailed release notes.

EDUCATION
Bachelor of Science in Information Systems | Boston University | 2016 - 2020`,
    jobDescriptionText: `Senior Technical Product Manager — Enterprise Platform

Overview:
We are seeking an experienced Technical Product Manager to drive the evolution of our developer platform and API ecosystem. You will serve as the bridge between enterprise customers, engineering teams, and executive stakeholders.

Key Responsibilities:
- Define product strategy, maintain quarterly roadmaps, and articulate ROI for enterprise platform capabilities.
- Partner with engineering to design developer-friendly REST & GraphQL APIs, SDKs, and developer portal documentation.
- Leverage Amplitude, SQL, and Snowflake to measure feature adoption, retention cohorts, and funnel drop-offs.
- Drive Go-To-Market (GTM) launches in tight collaboration with Sales Engineering, Product Marketing, and Customer Success.
- Lead discovery sprints, customer advisory councils, and quantitative surveys to validate product hypotheses.

Required Qualifications:
- 4+ years of product management experience in B2B SaaS or developer tooling.
- Demonstrated technical depth: ability to read API docs, write SQL queries independently, and evaluate system tradeoffs with senior engineers.
- Strong analytical chops using product analytics platforms (Amplitude or Mixpanel) and data warehouses (Snowflake, BigQuery).
- Experience managing Developer Experience (DevEx), Developer Portals, or API platforms.
- Proven track record of launching enterprise-grade features with high security and compliance rigor.

Bonus Points:
- CS degree or past software development experience.
- Experience with AI agent workflows or LLM evaluations.`,
  },
  {
    id: "data-analyst",
    title: "Senior Data Analyst",
    role: "Data & Analytics",
    resumeText: `Samantha Chen
samantha.chen@email.com | (555) 234-5678 | Chicago, IL | linkedin.com/in/samanthachen-data

PROFESSIONAL SUMMARY
Results-driven Data Analyst with 4+ years of experience transforming raw operational and transactional data into actionable business intelligence. Specialized in SQL query optimization, Tableau dashboards, and statistical cohort analysis for growth and finance teams.

TECHNICAL SKILLS
- Querying & Warehouses: Advanced SQL, Google BigQuery, PostgreSQL, Snowflake
- Data Visualization: Tableau, Power BI, Looker, Metabase, Matplotlib, Seaborn
- Programming & Statistics: Python (pandas, numpy, scipy), R, Git, Jupyter Notebooks
- Business Skills: Cohort Retention, LTV/CAC Modeling, Churn Forecasting, KPI Dashboarding, Stakeholder Presentation

EXPERIENCE

Senior Data Analyst | FinPeak Financial, Chicago, IL | 2022 - Present
- Built centralized revenue and customer health dashboard in Tableau and BigQuery, utilized daily by C-suite executives.
- Optimized 25+ critical SQL ETL queries, reducing query processing costs by \$18,000 annually.
- Conducted predictive customer churn analysis in Python using logistic regression, identifying key churn drivers and reducing monthly attrition by 14%.
- Collaborated with engineering to define data schemas and tracking event dictionaries for new mobile product launches.

Business Intelligence Analyst | Orbit Retail Group, Chicago, IL | 2020 - 2022
- Designed automated Power BI reports for regional supply chain logistics across 120 retail stores.
- Performed weekly inventory forecasting models in Excel and Python, decreasing stockouts by 9%.
- Automated daily email report generation using Python and Airflow, saving 8 hours of manual analyst time per week.

EDUCATION
B.S. in Applied Mathematics & Statistics | University of Illinois Urbana-Champaign | 2016 - 2020`,
    jobDescriptionText: `Senior Product Data Analyst — Growth & Retention

Role Overview:
Join our growth analytics team to uncover actionable insights, optimize product funnels, and build self-serve data models that empower our entire product organization to make faster, evidence-backed decisions.

What You'll Do:
- Partner with Growth Product Managers and Engineers to design, execute, and analyze multivariate A/B tests.
- Build clean, scalable dimensional data models in dbt and Snowflake following best modeling practices.
- Develop interactive executive dashboards in Looker to monitor key North Star metrics (DAU, MAU, Retention, Net Revenue Retention).
- Perform deep-dive exploratory data analysis to diagnose funnel leaks, user onboarding friction, and churn signals.
- Present statistical findings and strategic growth recommendations to senior leadership.

What We Look For:
- 4+ years of experience in product or growth data analytics within tech/SaaS.
- Mastery of SQL (window functions, CTEs, query performance tuning) and dimensional modeling (dbt).
- Extensive experience designing and evaluating rigorous A/B experiments (sample sizing, power analysis, p-values, SRM checks).
- Hands-on expertise with modern BI tools (Looker / LookML preferred, or Tableau).
- Proficiency in Python or R for statistical modeling and exploratory data analysis.
- Exceptional storytelling ability: turning complex data into clear strategic recommendations for non-technical partners.`,
  },
];
