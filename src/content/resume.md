# Maniraj Sai

📞 +31684011721  
📧 manirajadapa@gmail.com  
🔗 https://www.linkedin.com/in/manirajsai/  
💻 https://github.com/thecr7guy2  

---

## Professional Summary

AI Engineer with 3+ years of experience developing and deploying production-ready AI applications. Built end-to-end solutions spanning fine-tuning, evaluation, and agentic workflows, with a strong focus on scalability, reliability, and real-world impact.

---

## Experience

### aXite Security Tools  
**AI Engineer**  
Schiphol, The Netherlands  
July 2024 - Present  

- Led end-to-end development of AX-Office.ai, a fully on-premise AI platform delivering 5 production applications (private LLM assistant, Agentic RAG, ASR transcription, document OCR, and AI coding agent) across the organization, eliminating all external LLM API dependencies on sensitive security data.  
- Established an internal model evaluation framework benchmarking 10+ open-weight models across reasoning, instruction following, code quality, and summarization, driving continuous data-driven model selection and stack upgrades for production deployment.  
- Designed Airflow-orchestrated ETL pipelines for large-scale network event processing, automating extract/clean/enrich stages and powering real-time anomaly detection across ICMP flood attacks, unknown MAC/IP registrations, and device availability, feeding downstream analytics and monitoring dashboards.  

---

### Labelfuse  
**LLM Engineer**  
Eindhoven, The Netherlands  
April 2024 – July 2024  

- Architected a privacy-focused Text-to-SQL system using locally hosted LLMs, enabling non-technical users to query and retrieve insights from sensitive private databases through natural language, with zero data exposure to external APIs.  

---

## Projects

### Autonomous AI Trading Bot  
**Tech:** Python, Anthropic API, GitHub Actions, GitHub Pages  
**Year:** 2026  

- Built an autonomous trading system that scrapes SEC filings and Congressional disclosures, scores insider conviction using a custom weighted model (stake increase, role seniority, recency decay), and places real trades on a demo account twice weekly with zero human intervention.  
- Integrated Claude Opus as the portfolio manager, feeding enriched candidate data (fundamentals, RSI, price history, news) to generate up to 5 picks per run with allocation percentages, confidence scores, and written rationale referencing specific insider signals.  

---

### GPT-2 Small (124M): Pretraining & Instruction Tuning  
**Tech:** PyTorch, RunPod, HuggingFace  
**Year:** 2025  

- Pretrained GPT-2 Small from scratch on a curated 18B token dataset assembled from 7 sources (FineWeb-EDU, arXiv, RefinedWeb, Gutenberg) across 8 x A100 GPUs, building a custom memory-mapped dataloader to handle large-scale data streaming beyond RAM capacity.  
- Instruction-finetuned the pretrained model on 17M tokens across multiple SFT datasets, outperforming the original GPT-2 Small on TruthfulQA and MMLU benchmarks and deployed an interactive demo on HuggingFace Spaces for public evaluation.  

---

## Education

### University of Groningen  
**Masters in Artificial Intelligence**  
Groningen, The Netherlands  
September 2021 – September 2023  
GPA: 8.0/10  

- Thesis: Estimating Uncertainty in GANs for Super-resolution - incorporated uncertainty estimation techniques into GAN-based super resolution, with applications in medical imaging and computer vision.  

---

## Technical Skills

**Languages:** Python, SQL, Bash  

**AI / ML:** PyTorch, Tensorflow, HuggingFace, Scikit-learn, XGBoost, OpenCV  

**MLOps:** MLflow, Weights & Biases, Airflow, Prometheus, Grafana, Docker, Terraform  

**Cloud & Infra:** AWS, GCP, RunPod, Multi-GPU Training (A100)  

**Databases:** PostgreSQL, MySQL, MongoDB, DuckDB  