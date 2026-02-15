Sentrazo — YouTube Comment Intelligence Platform

Sentrazo is an AI-powered analytics platform designed to convert unstructured YouTube comments into actionable, structured insights. Developed by team Audience Alchemists for XENIA’26, the platform serves as a decision-support system for creators, brands, and agencies by providing deep intelligence beyond basic sentiment.
+3

## Core Features

Rapid Data Retrieval: Fetches up to 10,000 comments in seconds using the YouTube Data API v3.
+1


Comprehensive Sentiment Analysis: Categorizes audience feedback into positive, neutral, and negative distributions.

Actionable AI Insights:


Emotional Heatmap: Maps sentiment to exact video timestamps to identify high-performing or problematic moments.


Toxicity Overview: Automatically flags and filters toxic comments to encourage healthier discussions.
+1


AI Reply Composer: Generates professional, friendly, or witty tone-based replies.

Market Differentiators:


Sponsor Readiness Score: A single metric (0–100) summarizing brand safety and audience quality.


Multilingual Support: Analyzes non-English comments using the XLM-R transformer model.


One-Click Reports: Generates downloadable PDF summaries of analytics.

## Tech Stack
### Frontend

React + TypeScript: For a scalable and maintainable user interface.


Tailwind CSS: Modern, consistent design system.


Recharts / Chart.js: Real-time, interactive analytics visualizations.

### Backend

Python + FastAPI: High-performance asynchronous API.


Celery + Redis: Background job processing and scalable queueing.


PostgreSQL: Structured storage for metadata and analysis results.

### AI / ML Layer

Hugging Face Transformers: Utilizes RoBERTa and XLM-R for sentiment and multilingual analysis.


Batch Inference Pipeline: Optimized for speed and operational cost.

### Infrastructure & DevOps

Docker: Containerized deployment for environment consistency.

Cloud Hosting: Frontend on Vercel; Backend on Render/GCP.


CI/CD: Automated testing and deployment via GitHub Actions.

## Business & Impact
### Revenue Model

Freemium SaaS: Core features available for free with premium tiers for advanced analytics.


Subscription Based: Projected at an average of $20/month.
+1


Usage-Based API: Monetization through direct data access for third parties.

### Market Potential

Content Creators: Targets 50M+ creators seeking data-driven strategies.


Brands & Businesses: Provides PR crisis prevention and ROI validation for the $600B digital advertising market.
+1


Agencies: Offers 90% faster reporting and bulk action capabilities
