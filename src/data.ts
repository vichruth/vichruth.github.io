import { Project, Experience, SkillCategory, Education, Award } from "./types";

export const projects: Project[] = [
  {
    id: "acqm-reid",
    title: "ACQM-ReID",
    subtitle: "Attribute-Conditioned Query Modulation for Person Re-ID",
    category: "Research · Vision Transformers",
    description:
      "A novel attention mechanism for Vision Transformer person re-identification: predicted soft-biometric attributes are injected into the attention Query of the late transformer blocks in a single forward pass — beating the multi-task baseline on Market-1501.",
    points: [
      "Designed ACQM on top of TransReID (ViT-B/16), fusing multi-task attribute predictions directly into late-block attention queries.",
      "Improved Rank-1 from 91.2 → 92.0 and mAP from 79.8 → 80.5 over the ViT-MTL baseline on Market-1501, with full ablations (STAR/DTAP multi-task wrapper, SOQ orthogonal part pooling).",
      "Built the full research pipeline — attribute data loaders, a multi-task + triplet + BNNeck training engine, and publication figures — as clean extensions of the Torchreid framework."
    ],
    metrics: [
      { label: "Rank-1 (Market-1501)", value: "92.0%" },
      { label: "mAP", value: "80.5" },
      { label: "Backbone", value: "ViT-B/16" }
    ],
    techStack: ["PyTorch", "TransReID", "Torchreid", "ViT", "Multi-Task Learning", "Triplet Loss"],
    codeHighlight: {
      filename: "vit_adapter.py",
      language: "python",
      code: `# ACQM: inject predicted attributes into the attention Query
# of the late transformer blocks — one forward pass, no re-ranking.

class AttributeConditionedBlock(nn.Module):
    def __init__(self, dim, num_attrs):
        super().__init__()
        self.attr_proj = nn.Linear(num_attrs, dim)
        self.gate = nn.Parameter(torch.zeros(1))  # learn how much to trust attrs

    def modulate_query(self, q, attr_logits):
        # soft-biometric predictions (gender, bag, sleeve...) -> query space
        attr_embed = self.attr_proj(attr_logits.softmax(dim=-1))
        # gated residual: starts at identity, learns modulation strength
        return q + torch.tanh(self.gate) * attr_embed.unsqueeze(1)

# Result on Market-1501 (single seed):
#   Baseline ViT-MTL : Rank-1 91.2 | mAP 79.8
#   + ACQM (ours)    : Rank-1 92.0 | mAP 80.5`
    }
  },
  {
    id: "edge-id",
    title: "EdgeID",
    subtitle: "A Person Has 256 Numbers — Re-ID on Android, Without the Cloud",
    category: "Edge AI · On-Device Vision",
    description:
      "Find your people in a crowd, even when their face isn't visible. A two-stage person detection + re-identification pipeline that compresses every person into a 256-dimensional embedding and runs entirely offline on an Android phone.",
    points: [
      "Trained a MobileNetV3-Large embedding network with batch-hard triplet loss on Market-1501, targeting a sub-6 MB on-device model.",
      "Built the two-stage live pipeline — on-device person detector → 256-D embedding → nearest-neighbour search over the registered group — running frame-by-frame on a phone camera feed.",
      "Shipped the full Android app in Kotlin: register your group once, then pan the camera across a crowd and get live matches. No photos ever leave the device."
    ],
    metrics: [
      { label: "Embedding", value: "256-D" },
      { label: "Model Budget", value: "<6 MB" },
      { label: "Network Calls", value: "Zero" }
    ],
    techStack: ["Kotlin", "Android", "MobileNetV3", "Triplet Loss", "PyTorch", "Market-1501"]
  },
  {
    id: "neuro-log",
    title: "NeuroLog",
    subtitle: "Edge-Native Semantic Video Search",
    category: "Computer Vision · Multimodal",
    description:
      "A fully offline, zero-shot video search engine: describe anything in natural language — \"a green taxi\", \"person with a black backpack\" — and find it in hours of raw footage, on a 6 GB laptop GPU.",
    points: [
      "Open-vocabulary retrieval with CLIP (ViT-B/32) embeddings instead of a closed-label detector — anything you can describe, you can search, with zero task-specific training.",
      "Cast the model and input tensors to FP16 to fit the 6 GB VRAM budget with negligible retrieval-quality loss.",
      "L2-normalized 512-D embeddings in a local FAISS inner-product index (mathematically equivalent to cosine similarity): 0.284 s query latency over a 1,414-frame index, measured on an RTX 4050."
    ],
    metrics: [
      { label: "Query Latency", value: "0.284s" },
      { label: "VRAM Budget", value: "6 GB" },
      { label: "Vocabulary", value: "Open (zero-shot)" }
    ],
    techStack: ["PyTorch", "CLIP", "FAISS", "OpenCV", "Streamlit", "NumPy"],
    githubUrl: "https://github.com/vichruth/NeuroLog",
    codeHighlight: {
      filename: "search_engine.py",
      language: "python",
      code: `# FP16 CLIP + normalized FAISS inner-product index.
# Normalized vectors => inner product == cosine similarity.

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
model = model.half().to("cuda").eval()   # fit the 6GB VRAM budget

index = faiss.IndexFlatIP(512)

def ingest(video_path, fps=1):
    for ts, frame in sample_frames(video_path, fps):     # OpenCV temporal loop
        pixel = preprocess(frame).unsqueeze(0).half().cuda()
        with torch.no_grad():
            v = model.get_image_features(pixel_values=pixel)
        v = torch.nn.functional.normalize(v, dim=-1)
        index.add(v.cpu().float().numpy())

def search(query, k=3):
    t = tokenizer(query, return_tensors="pt").to("cuda")
    q = normalize(model.get_text_features(**t))
    return index.search(q.cpu().float().numpy(), k)  # 0.284s over 1,414 frames`
    }
  },
  {
    id: "classroom-monitor",
    title: "Attentiveness Monitor",
    subtitle: "Offline Classroom Edge-AI on a Raspberry Pi",
    category: "Edge AI · Embedded Deployment",
    description:
      "A fully offline system that recognises every enrolled student and classifies attentiveness in real time — on a Raspberry Pi 4's ARM CPU, no GPU, no cloud — then emails teachers a one-page report so they never touch a screen.",
    points: [
      "Built the full vision pipeline on ONNX models — YuNet face detection → SFace face recognition → attentive/distracted/drowsy classification — running continuously on an 8 GB Pi 4.",
      "Automated the entire reporting loop: attendance every 5 seconds, aggregate snapshots every 5 minutes, and a scheduled end-of-period HTML email report with charts and a colour-coded timeline.",
      "Delivered a Flask admin portal for the whole lifecycle — bulk Excel + photo-ZIP student enrollment, timetable import, SMTP settings, live dashboard, and per-session Excel/SQLite export."
    ],
    metrics: [
      { label: "Hardware", value: "Pi 4 (ARM CPU)" },
      { label: "Cloud Dependency", value: "None" },
      { label: "Teacher UI", value: "Zero-touch email" }
    ],
    techStack: ["ONNX", "OpenCV", "YuNet", "SFace", "Flask", "Raspberry Pi", "SQLite"],
    githubUrl: "https://github.com/vichruth/classroom_attentiveness"
  },
  {
    id: "niki-lauda",
    title: "NIKI-LAUDA-AI",
    subtitle: "Real-Time AI Race Engineer",
    category: "Time-Series · Telemetry Systems",
    description:
      "A tribute to Niki Lauda: an end-to-end system that intercepts a racing sim's 60 Hz binary UDP telemetry, predicts tyre degradation and lap-time delta with an LSTM, and streams it to a live \"Pit Wall\" broadcast dashboard.",
    points: [
      "Decoded high-frequency C-struct UDP packets into one canonical frame format, with a CSV replay path so the whole stack is demoable without the game running.",
      "Trained a 2-layer, ~54k-parameter PyTorch LSTM over a rolling 30-frame window to predict lap delta and per-corner tyre wear — small enough to run inference in real time alongside the game.",
      "Built the Node + Socket.IO Pit Wall dashboard (shift lights, tyre grid, MoTeC-style pedal/RPM traces), with an honest physics-model fallback that reports its active mode: LSTM / HEURISTIC."
    ],
    metrics: [
      { label: "Telemetry Rate", value: "60 Hz UDP" },
      { label: "Model Size", value: "~54k params" },
      { label: "Prediction Window", value: "30 frames" }
    ],
    techStack: ["PyTorch", "LSTM", "Python Struct", "UDP Sockets", "Node.js", "Socket.IO", "Chart.js"],
    githubUrl: "https://github.com/vichruth/pit-window-predictor",
    codeHighlight: {
      filename: "telemetry_client.py",
      language: "python",
      code: `# 60Hz binary C-struct UDP interceptor -> canonical frames
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("0.0.0.0", 20777))

def live_udp_frames():
    while True:
        data, _ = sock.recvfrom(2048)
        header = struct.unpack_from("<HBBBBQfIBB", data)
        if header[5] == PACKET_CAR_TELEMETRY:
            yield decode_telemetry(data)   # speeds, tyre temps, wear

# Rolling 30-frame window -> 2-layer LSTM (~54k params)
# outputs: [lap_delta, wear_FL, wear_FR, wear_RL, wear_RR]
window = deque(maxlen=30)
for frame in live_udp_frames():
    window.append(featurize(frame))
    if len(window) == 30:
        pred = race_lstm(torch.tensor([list(window)]))
        socketio.emit("prediction", pred.tolist())  # -> Pit Wall`
    }
  },
  {
    id: "pseudo-compiler",
    title: "Pseudo Is All You Need",
    subtitle: "A Pseudocode Compiler That Learns How You Type",
    category: "Compilers · Systems + ML",
    description:
      "A pseudocode compiler with a dual-backend architecture — one shared IR executed by either a bytecode VM or ahead-of-time compiled C — plus an ML input layer that learns a user's personal typing patterns to tell real syntax errors from handwriting.",
    points: [
      "Designed a single shared intermediate representation with two genuinely different execution strategies: a bytecode VM for fast iteration and debugging, and AOT compilation to C for real performance.",
      "Building an adaptive input layer that learns per-user typos, abbreviations, and habitual shorthand, correcting ambiguous input from context instead of failing on the first unparseable token.",
      "Full classical front-end — lexer, parser, IR lowering — engineered so both backends share every phase above code generation."
    ],
    metrics: [
      { label: "Backends", value: "VM + AOT→C" },
      { label: "Front-End", value: "Shared IR" },
      { label: "Input Layer", value: "ML-adaptive" }
    ],
    techStack: ["Compilers", "Bytecode VM", "C Codegen", "Lexer/Parser", "ML Correction", "Python"]
  },
  {
    id: "eelam-flame",
    title: "Project Eelam Flame",
    subtitle: "Offline GenAI Pipeline for Sensitive Testimonies",
    category: "Generative AI · Privacy",
    description:
      "A zero-trust, fully offline pipeline built on a local Gemma architecture to process highly sensitive historical testimonies — preserving the linguistic nuances of the Eelam Tamil dialect with zero outside API calls.",
    points: [
      "Designed a fully on-device environment that blocks all network access, keeping sensitive testimony data confidential end to end.",
      "Implemented a local Retrieval-Augmented Generation agent operating against an encrypted vector database.",
      "Extracted structured semantic metadata and validated every information flow offline — nothing leaves the machine."
    ],
    metrics: [
      { label: "Network Activity", value: "0% (offline)" },
      { label: "LLM", value: "Gemma, local" },
      { label: "Vector DB", value: "Encrypted" }
    ],
    techStack: ["Gemma", "FAISS", "Cryptography", "Sentence-Transformers", "Python"],
    githubUrl: "https://github.com/vichruth/Eelam-Flame",
    codeHighlight: {
      filename: "secure_rag.py",
      language: "python",
      code: `# Encrypted, fully-offline vector store for a local RAG agent
from cryptography.fernet import Fernet

class ZeroTrustRAG:
    def __init__(self, key: bytes):
        self.fernet = Fernet(key)
        self.llm = load_local("gemma-2b-it")   # no API, no network

    def decrypt_search(self, encrypted_vec: bytes):
        raw = self.fernet.decrypt(encrypted_vec)
        vector = np.frombuffer(raw, dtype=np.float32)
        return torch.from_numpy(vector.copy()).half()`
    }
  },
  {
    id: "ffcs-buddy",
    title: "FFCS-Buddy",
    subtitle: "Hybrid Lexical + Semantic Course Search",
    category: "NLP · Search Systems",
    description:
      "Award-winning course search engine built at VIT's Hackademia: a hybrid retrieval system that merges TF-IDF lexical lookup with dense transformer embeddings to help students build optimal schedules.",
    points: [
      "Fused TF-IDF lexical scoring with 384-D dense embeddings from all-MiniLM-L6-v2 for robust matching on both exact codes and fuzzy natural-language queries.",
      "Served sub-15 ms course queries from an optimized FastAPI router.",
      "Won 2nd Prize at Hackademia (graVITas'25) for the backend search architecture."
    ],
    metrics: [
      { label: "Query Latency", value: "<15 ms" },
      { label: "Embeddings", value: "384-D MiniLM" },
      { label: "Result", value: "2nd Prize" }
    ],
    techStack: ["FastAPI", "Sentence-Transformers", "TF-IDF", "Uvicorn", "Python"],
    githubUrl: "https://github.com/vichruth/FFCS_Buddy"
  }
];

export const experiences: Experience[] = [
  {
    id: "nit-trichy",
    company: "NIT Tiruchirappalli",
    role: "Summer Research Intern — LLM & Multimodal AI",
    location: "Tiruchirappalli, India · On-site",
    period: "Jun 2026 – Jul 2026",
    type: "Research",
    description: [
      "Designed and built a fully offline, edge-AI classroom attentiveness monitor under Dr. B. Janet — real-time computer vision for automated attendance and engagement analysis on a Raspberry Pi, zero cloud dependency.",
      "Built the face detection + recognition pipeline (OpenCV YuNet, SFace 128-D embeddings, cosine similarity) and a multimodal YOLO11-pose + MediaPipe engagement layer (gaze, drowsiness via EAR, hand-raise, emotion) reaching ~78% attentive-classification accuracy.",
      "Shipped the full stack solo: Flask admin portal (SQLite, Excel bulk import, live monitoring), automated SMTP report delivery verified end-to-end, and a security review remediating stored XSS, CSRF, and session-management vulnerabilities.",
      "Benchmarked the edge system against a cloud VLM baseline to quantify the accuracy–latency trade-off; findings feeding a journal paper in preparation."
    ],
    highlightMetric: { value: "100% Offline", label: "Raspberry Pi Deployment" },
    technologies: ["ONNX Runtime", "OpenCV", "YOLO11-pose", "MediaPipe", "Flask", "Raspberry Pi"]
  },
  {
    id: "iiit-kottayam",
    company: "IIIT Kottayam",
    role: "Summer Research Intern — CV & Model Compression",
    location: "Kottayam, India · Hybrid",
    period: "May 2026 – Jun 2026",
    type: "Research",
    description: [
      "Selected to research Transformer-based person re-identification under Dr. Sridhar Raj S: extended TransReID (ViT-B/16) with ACQM, a novel attribute-conditioned attention mechanism, lifting Rank-1 to 92.0% on Market-1501.",
      "Diagnosed and resolved three silent architectural failures in the evaluation pipeline — zero crashes, zero errors, accuracy quietly suppressed — by distrusting healthy-looking loss curves and reading intermediate state directly.",
      "Ran systematic ablations across multi-task attribute learning, orthogonal part pooling, and triplet + BNNeck training regimes, all within a 6 GB VRAM budget on consumer hardware.",
      "Patent filed; first-author paper pending publication in an IEEE journal."
    ],
    highlightMetric: { value: "IEEE Paper", label: "Pending Publication · First Author" },
    technologies: ["PyTorch", "TransReID", "ViT", "Model Compression", "Torchreid"]
  },
  {
    id: "freelance",
    company: "Independent Client Projects",
    role: "Freelance AI & Automation Engineer",
    location: "Remote",
    period: "2025 – Present",
    type: "Production Systems",
    description: [
      "Operate a live 24/7 B2B lead-generation and enrichment pipeline for a migration-services client: 8-phase automation covering scraping, AI website audits via GPT-4o vision, personalised outreach, reply classification, proposals, Stripe payments, and onboarding.",
      "Self-hosted n8n + PostgreSQL with 15+ API integrations; the operator manages the entire funnel from a phone via Telegram approval flows.",
      "All client data handled under strict on-premise / zero-external-API constraints where sensitivity requires it. Real users, real payments, real \"why is it broken at 2 AM\" energy."
    ],
    highlightMetric: { value: "24/7 Live", label: "Production System in Operation" },
    technologies: ["n8n", "PostgreSQL", "GPT-4o Vision", "Stripe", "Telegram Bots", "REST APIs"]
  },
  {
    id: "kalkini",
    company: "KalkiNi (AI Surveillance)",
    role: "Machine Learning Intern",
    location: "Vellore, India",
    period: "Feb 2025 – Sep 2025",
    type: "Internship",
    description: [
      "Built processing pipelines with NumPy and Pandas that transform multi-threaded video stream data into optimized model inputs.",
      "Trained and fine-tuned deep learning classifiers for live threat profiling, optimizing feed-forward feature filters.",
      "Applied transfer learning to multi-task models, improving precision while cutting compute — a 35% pipeline speedup."
    ],
    highlightMetric: { value: "35% Speedup", label: "Surveillance Pipeline" },
    technologies: ["PyTorch", "OpenCV", "Transfer Learning", "Pandas", "NumPy"]
  },
  {
    id: "cloudstier",
    company: "Cloudstier Solutions Pvt. Ltd.",
    role: "AI Intern",
    location: "Tiruppatur, India",
    period: "May 2025 – Jun 2025",
    type: "Internship",
    description: [
      "Built and deployed an on-premises NLP chatbot on the Django web framework running lightweight Phi models locally.",
      "Owned the pipeline end to end: supervised fine-tuning, prompt alignment, and structured output formatting.",
      "Verified web endpoints with Postman for reliable network exchange."
    ],
    highlightMetric: { value: "Phi Model", label: "On-Premises Chatbot" },
    technologies: ["Django", "Phi", "Prompt Engineering", "Postman", "WSGI"]
  },
  {
    id: "boardly",
    company: "Boardly.in",
    role: "Product Developer",
    location: "Vellore, India",
    period: "Jan 2025 – Feb 2025",
    type: "Co-Development",
    description: [
      "Co-designed the backend for a CBSE ed-tech platform, scaling the database to over 10,000 records.",
      "Helped onboard 1,000+ students and 20+ partner schools within the first 37 days."
    ],
    highlightMetric: { value: "1,000+ Users", label: "Gained in 37 Days" },
    technologies: ["System Architecture", "Database Modeling", "Node.js", "Express"]
  },
  {
    id: "padasalai",
    company: "Padasalai",
    role: "App Developer",
    location: "Remote",
    period: "Nov 2024 – Jan 2026",
    type: "Part-Time",
    description: [
      "Maintained the web app for Tamil Nadu's No.1 educational platform, building quiz and study tools serving 10th and 12th standard students.",
      "Recognised with an award from the Padasalai and Sura Publications leadership for the app work."
    ],
    highlightMetric: { value: "TN's #1", label: "Educational Platform" },
    technologies: ["Web Apps", "WordPress", "Software Design"]
  },
  {
    id: "masters-union",
    company: "Masters' Union",
    role: "AI Campus Ambassador",
    location: "India · Hybrid",
    period: "Apr 2026 – Present",
    type: "Ambassador",
    description: [
      "Leading campus-wide initiatives promoting Masters' Union AI seminars and education programs — strategic outreach, community management, and verified participation drives."
    ],
    highlightMetric: { value: "Campus-Wide", label: "AI Education Outreach" },
    technologies: ["Community Management", "Strategic Growth"]
  },
  {
    id: "electronics-club",
    company: "The Electronics Club, VIT",
    role: "Junior Core Member",
    location: "Vellore, India",
    period: "Jan 2026 – Present",
    type: "Leadership",
    description: [
      "Directing projects that merge microcontrollers with tiny neural models (TinyML).",
      "Mentoring peers on flashing optimized C++ tensor code onto embedded boards for localized automation."
    ],
    highlightMetric: { value: "TinyML", label: "Hardware-AI Integration" },
    technologies: ["C++", "TinyML", "Microcontrollers", "Embedded"]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Python", context: "Primary language for research, training pipelines & ML systems", vibe: "Core" },
      { name: "C++", context: "Low-latency systems, embedded firmware & compiler backends", vibe: "Hardware" },
      { name: "Kotlin", context: "On-device Android AI apps — camera pipelines to inference", vibe: "Mobile" },
      { name: "Java", context: "System integration & algorithmic development", vibe: "Familiar" }
    ]
  },
  {
    id: "ai-core",
    title: "Machine Learning & AI",
    iconName: "BrainCircuit",
    skills: [
      { name: "Vision Transformers & Re-ID", context: "TransReID, attribute-conditioned attention, triplet + BNNeck training", vibe: "Research" },
      { name: "PyTorch & TensorFlow", context: "Custom architectures, training engines & loss design", vibe: "Core" },
      { name: "Model Compression", context: "FP16/INT8 quantization, pruning, LoRA/PEFT — fitting models to real hardware", vibe: "Specialty" },
      { name: "Multimodal / CLIP", context: "Zero-shot open-vocabulary retrieval, image-text embedding spaces", vibe: "Core" },
      { name: "Local LLMs & RAG", context: "Gemma/Phi on-device, offline RAG over encrypted vector stores", vibe: "Core" },
      { name: "Time-Series & Classical ML", context: "LSTMs on live telemetry, XGBoost with leakage-safe evaluation", vibe: "Core" }
    ]
  },
  {
    id: "tools",
    title: "Libraries, Runtimes & OS",
    iconName: "Cpu",
    skills: [
      { name: "ONNX Runtime", context: "Deploying vision models on ARM CPUs — Raspberry Pi & Android", vibe: "Edge" },
      { name: "OpenCV", context: "High-frequency frame ingestion, YuNet/SFace pipelines", vibe: "Core" },
      { name: "FAISS", context: "Normalized inner-product indexes for real-time vector search", vibe: "Core" },
      { name: "Hugging Face", context: "Transformers, PEFT fine-tuning, tokenizer alignment", vibe: "Core" },
      { name: "NumPy & Pandas", context: "Matrix computation and chronologically-safe dataset handling", vibe: "Core" },
      { name: "Linux (Ubuntu)", context: "Daily driver — networking, sockets, resource monitoring, deployment", vibe: "Hardware" }
    ]
  },
  {
    id: "frameworks",
    title: "Backends & Serving",
    iconName: "Network",
    skills: [
      { name: "FastAPI & Flask", context: "REST microservices for ML inference & admin portals", vibe: "Core" },
      { name: "Django", context: "Monolithic backends hosting on-premise LLM chat pipelines", vibe: "Core" },
      { name: "Node.js + Socket.IO", context: "Real-time dashboards streaming live model predictions", vibe: "Core" }
    ]
  }
];

export const educations: Education[] = [
  {
    id: "vit",
    institution: "Vellore Institute of Technology (VIT)",
    location: "Vellore, India",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "Jul 2024 – Jul 2028 (Expected)",
    grade: "7.5",
    gradeLabel: "CGPA",
    details: [
      "Research internships completed at two national institutes — NIT Tiruchirappalli and IIIT Kottayam — alongside coursework.",
      "Certifications: Machine Learning Specialization (DeepLearning.AI, Andrew Ng), VIT Generative AI Bootcamp, AI to Vision (IIIT Kottayam), App Development Workshop (IIT Madras).",
      "Junior Core Member of The Electronics Club — ML-hardware pipelines, TinyML, embedded C++ mentoring."
    ]
  },
  {
    id: "high-school",
    institution: "Maharishi International Residential School",
    location: "Chennai, India",
    degree: "High School Diploma (Senior Matriculation)",
    period: "Apr 2020 – May 2024",
    grade: "85%",
    gradeLabel: "Grade",
    details: [
      "Core curriculum in Physics, Chemistry, and Advanced Mathematics.",
      "Early programs integrating numerical computing libraries and matrix geometry."
    ]
  }
];

export const awards: Award[] = [
  {
    id: "ieee-paper",
    title: "First-Author Paper — Pending Publication",
    sub: "IEEE Journal · IIIT Kottayam",
    description: "\"Person Re-Identification using Multi-Task Vision Transformers with Domain Adversarial Training\" — Vichruth M, Dr. Sridhar Raj S. Covers the multi-task ViT architecture, domain adversarial training, and a systematic silent-failure diagnosis methodology.",
    date: "2026",
    badge: "Research Publication"
  },
  {
    id: "neurogolf-badge",
    title: "Kaggle Research Competitor",
    sub: "NeuroGolf 2026 · IJCAI-ECAI Competitions Track",
    description: "Earned the Research Competitor badge designing minimal, exactly-correct ONNX networks that solve ARC-AGI reasoning tasks.",
    date: "Jul 2026",
    badge: "Kaggle"
  },
  {
    id: "patent",
    title: "Patent Application Filed",
    sub: "Memory Optimization for Embedded ML",
    description: "Filed a patent application, currently under review, on memory-optimization techniques for embedded machine learning models.",
    date: "Under Review",
    badge: "Intellectual Property"
  },
  {
    id: "hackademia",
    title: "2nd Prize",
    sub: "Hackademia (graVITas'25)",
    description: "Awarded for FFCS-Buddy's hybrid lexical + semantic course search backend built on sentence-transformers.",
    date: "Feb 2025",
    badge: "VIT Technical Festival"
  },
  {
    id: "ideathon",
    title: "2nd Runner-Up",
    sub: "National Ideathon (Team V-RACING)",
    description: "Architected \"Pre-Cog Brakes\", a prospective torque-vectoring system modeled on driver telemetry data streams.",
    date: "Oct 2024",
    badge: "National Level"
  },
  {
    id: "freuid",
    title: "Active Competitor",
    sub: "FREUID Challenge 2026 · IJCAI-ECAI",
    description: "Identity-document fraud detection (Microblink / 35th IJCAI): physical manipulations, GenAI-driven edits, and print-and-capture forgeries, evaluated on a private held-out test set.",
    date: "2026",
    badge: "Ongoing"
  }
];
