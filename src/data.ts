import { Project, Experience, SkillCategory, Education, Award } from "./types";

export const projects: Project[] = [
  {
    id: "neuro-log",
    title: "NeuroLog",
    subtitle: "Edge-Native Semantic Video Search",
    category: "Computer Vision & Edge AI",
    description: "100% offline, zero-shot multimodal semantic video search engine designed with strict 6GB VRAM hardware constraints.",
    points: [
      "Engineered a zero-shot video indexing pipeline operating fully on-device within tight budget boundaries.",
      "Cast model weights to FP16 (half-precision), cutting VRAM usage by ~48% with negligible accuracy loss.",
      "Built low-latency temporal video ingestion loops using OpenCV and structured a local high-dimensional FAISS vector database for real-time semantic query matching."
    ],
    metrics: [
      { label: "Memory Footprint", value: "<6GB VRAM" },
      { label: "Search Latency", value: "85ms" },
      { label: "Precision Casting", value: "FP16" }
    ],
    techStack: ["PyTorch", "CLIP", "FAISS", "OpenCV", "NumPy", "Python"],
    codeHighlight: {
      filename: "search_engine.py",
      language: "python",
      code: `import torch
import faiss
import cv2

# CAST TO FP16 FOR 6GB VRAM HARDWARE CONSTRAINTS
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
model = model.half() # Convert weights to FP16

def index_video_frames(video_path, faiss_index, batch_size=32):
    cap = cv2.VideoCapture(video_path)
    frames, timestamps = [], []
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break
        
        # Raw OpenCV BGR to RGB Temporal Loop
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frames.append(preprocess(rgb_frame))
        
        if len(frames) == batch_size:
            # Stack and extract PyTorch tensors in half-precision
            tensor = torch.stack(frames).to(device).half()
            with torch.no_grad():
                features = model.encode_image(tensor).cpu().numpy()
            faiss_index.add(features)
            frames = []`
    }
  },
  {
    id: "eelam-flame",
    title: "Project Eelam Flame",
    subtitle: "Offline GenAI Secure Pipeline",
    category: "Generative AI & Privacy Enclave",
    description: "Secure, zero-trust pipeline built entirely on a localized Gemma 2/4B architecture to process highly sensitive historical testimonies.",
    points: [
      "Designed a fully on-device environment that blocks all network access, keeping sensitive data confidential.",
      "Implemented a customized local Retrieval-Augmented Generation (RAG) agent operating against an encrypted vector database.",
      "Extracted structured semantic metadata and validated information flows using zero outside API calls."
    ],
    metrics: [
      { label: "Network Activity", value: "0% (Fully Offline)" },
      { label: "Architecture", value: "Gemma Local" },
      { label: "Processing Security", value: "Zero-Trust" }
    ],
    techStack: ["Gemma 2", "FAISS", "Python", "Cryptography", "Sentence-Transformers"],
    codeHighlight: {
      filename: "secure_rag.py",
      language: "python",
      code: `# ENCRYPTED OFFLINE VECTOR DB INITIALIZATION
from cryptography.fernet import Fernet
import numpy as np

class ZeroTrustRAG:
    def __init__(self, key: bytes):
        self.fernet = Fernet(key)
        self.local_llm = "gemma-2b-it-local"
        
    def decrypt_search(self, encrypted_vector_bytes):
        # Local secure decryption layer before loading to tensor
        raw_bytes = self.fernet.decrypt(encrypted_vector_bytes)
        vector = np.frombuffer(raw_bytes, dtype=np.float32)
        return torch.tensor(vector).half().cuda()`
    }
  },
  {
    id: "low-param-bug",
    title: "Low-Parameter AI Bug Detector",
    subtitle: "Transformer-based Code Assistant",
    category: "Natural Language Processing",
    description: "Hybrid Edge-AI system designed to detect and repair Python syntax bugs while performing Time and Space complexity analyses.",
    points: [
      "Fine-tuned a CodeT5 transformer on a curated 2,000-sample syntax dataset using parameter-efficient fine-tuning (PEFT/LoRA).",
      "Built custom analytical engines evaluating abstract syntax trees (AST) to compute algorithmic complexities natively at the edge.",
      "Integrated backend inference with a lightweight Flask engine and a responsive Node.js frontend, currently writing a research paper on the results."
    ],
    metrics: [
      { label: "Parameters", value: "CodeT5 (LoRA)" },
      { label: "Inference Latency", value: "110ms" },
      { label: "Training Dataset", value: "2,000 Samples" }
    ],
    techStack: ["CodeT5", "PEFT/LoRA", "Hugging Face", "AST", "Flask", "Node.js"],
    codeHighlight: {
      filename: "lora_peft.py",
      language: "python",
      code: `from peft import LoraConfig, get_peft_model
from transformers import AutoModelForSeq2SeqLM

# Low-Parameter Fine-Tuning Setup for Edge Hardware
base_model = AutoModelForSeq2SeqLM.from_pretrained("Salesforce/codet5-base")
lora_config = LoraConfig(
    r=8,
    lora_alpha=32,
    target_modules=["q", "v"],
    lora_dropout=0.05,
    bias="none",
    task_type="SEQ_2_SEQ_LM"
)
model = get_peft_model(base_model, lora_config)
print("Active Trainable Parameters:", model.print_trainable_parameters())`
    }
  },
  {
    id: "niki-lauda",
    title: "NIKI-LAUDA-AI",
    subtitle: "Real-Time Race Engineering Pipeline",
    category: "Telemetry & Time-Series Prediction",
    description: "High-performance Linux UDP network pipeline to intercept, decode, and model 50Hz binary telemetry data from physics simulators.",
    points: [
      "Programmed socket architectures to capture high-frequency C-struct packets, decoding complex simulation states under 2ms delay.",
      "Designed sliding-window data formatters to transform raw continuous parameters into sequential matrices representing tire and aerodynamics status.",
      "Developed a custom PyTorch LSTM neural network to predict future tire wear and thermal degradation, facilitating dynamic racing strategizing."
    ],
    metrics: [
      { label: "Pipeline Frequency", value: "50Hz (Real-time)" },
      { label: "Socket Latency", value: "<1.8ms" },
      { label: "Model Architecture", value: "PyTorch LSTM" }
    ],
    techStack: ["C++ Socket", "PyTorch", "LSTM", "Python Struct", "UDP Pipelines"],
    codeHighlight: {
      filename: "telemetry_socket.py",
      language: "python",
      code: `import socket
import struct

# 50Hz Binary C-Struct UDP Pipeline Interceptor
UDP_IP = "0.0.0.0"
UDP_PORT = 20777

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))

# format matching the simulator binary layout (float variables)
struct_format = "<fffffff" 

def intercept_telemetry():
    while True:
        data, addr = sock.recvfrom(1024)
        if len(data) >= struct.calcsize(struct_format):
            # Unpack values: speeds, tire temps, suspension values
            unpacked = struct.unpack(struct_format, data[:struct.calcsize(struct_format)])
            yield unpacked`
    }
  },
  {
    id: "march-mania",
    title: "March-Mania-2026",
    subtitle: "Kaggle Tournament Predictor",
    category: "Applied Classification & Feature Engineering",
    description: "Probability classification model built for the Kaggle March Madness tournament analytics competition.",
    points: [
      "Engineered team features based on Dean Oliver's 'Four Factors' (shooting, turnovers, rebounding, free throws).",
      "Constructed chronologically expanding rolling evaluation windows to ensure zero forward data leakage across multi-year historical games.",
      "Trained an optimized XGBoost classifier with strict hyperparameter tuning, outputting calibrated probabilities for tournament bracket matches."
    ],
    metrics: [
      { label: "Primary Model", value: "XGBoost" },
      { label: "Evaluation Scheme", value: "Expanding Window" },
      { label: "Key Predictor", value: "Four Factors" }
    ],
    techStack: ["XGBoost", "Scikit-Learn", "Pandas", "NumPy", "Kaggle Platforms"]
  },
  {
    id: "ffcs-buddy",
    title: "FFCS-Buddy",
    subtitle: "FastAPI Hybrid Search Engine",
    category: "NLP & Course Recommender",
    description: "Award-winning academic search system built during VIT's Hackademia to assist students in indexing and designing optimized course schedules.",
    points: [
      "Created a hybrid searching system merging TF-IDF lexical lookup and dense vector embeddings from the 'all-MiniLM-L6-v2' transformer.",
      "Served extremely fast recommendations using a highly optimized FastAPI router, drastically lowering query times for thousands of students.",
      "Captured the 2nd Prize at Hackademia (graVITas'25) for backend speed and modular architecture."
    ],
    metrics: [
      { label: "Course Queries", value: "<15ms" },
      { label: "Dense Embeddings", value: "384 Dimensions" },
      { label: "Award Status", value: "2nd Prize Hack" }
    ],
    techStack: ["FastAPI", "Sentence-Transformers", "TF-IDF", "Uvicorn", "Python"]
  }
];

export const experiences: Experience[] = [
  {
    id: "iiit-kottayam",
    company: "IIIT Kottayam",
    role: "Research Intern",
    location: "Hybrid",
    period: "May 2026 – Present",
    type: "Internship",
    description: [
      "Conducting extensive research and empirical evaluation on state-of-the-art Transformer-based architectures (TransReID) and lightweight CNN models for robust pedestrian identification.",
      "Developing quantization and pruning workflows to compress complex vision parameters, targeting efficient operations on highly resource-constrained edge systems.",
      "Actively bridging complex mathematical models in deep learning with target hardware compilers."
    ],
    highlightMetric: { value: "State of Art", label: "TransReID Focus" },
    technologies: ["PyTorch", "TransReID", "Model Compression", "Edge Compilers"]
  },
  {
    id: "kalkini",
    company: "KalkiNi (AI Surveillance System)",
    role: "Machine Learning Intern",
    location: "Vellore, India",
    period: "Feb 2025 – Sep 2025",
    type: "Internship",
    description: [
      "Structured and deployed comprehensive processing pipelines utilizing NumPy and Pandas, transforming multi-threaded video stream data into optimized model structures.",
      "Trained and fine-tuned deep learning classifiers focused on live threat profiling, optimizing feed-forward feature filters.",
      "Designed advanced multi-task models by applying Transfer Learning, yielding notable gains in operational precision while reducing computing constraints."
    ],
    highlightMetric: { value: "35% Speedup", label: "Surveillance Pipeline" },
    technologies: ["Pandas", "NumPy", "PyTorch", "OpenCV", "Transfer Learning"]
  },
  {
    id: "cloudstier",
    company: "Cloudstier Solutions Pvt. Ltd.",
    role: "AI Intern",
    location: "Tiruppatur, India",
    period: "May 2025 – Jun 2025",
    type: "Internship",
    description: [
      "Conceptualized and deployed a local custom NLP chatbot served via the Django web framework executing lightweight Phi model structures.",
      "Managed pipeline orchestration involving supervised fine-tuning, strict prompt alignments, and structured output formatting.",
      "Tested and verified web endpoints utilizing Postman for optimal network exchange."
    ],
    highlightMetric: { value: "Phi Model", label: "On-Premises Chatbot" },
    technologies: ["Django", "Phi-Model", "Prompt Engineering", "Postman", "WSGI"]
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
    technologies: ["System Arch", "Database Modeling", "Node.js", "Express"]
  },
  {
    id: "electronics-club",
    company: "The Electronics Club, VIT",
    role: "Junior Core Member",
    location: "Vellore, India",
    period: "Jan 2026 – Present",
    type: "Leadership / Academic Subgroup",
    description: [
      "Directing developmental pipelines merging microcontrollers with tiny neural model structures (TinyML).",
      "Mentored peers on loading and flashing optimized C++ tensor algorithms onto embedded environments to establish localized automation grids."
    ],
    highlightMetric: { value: "TinyML", label: "Hardware-AI Integrations" },
    technologies: ["C++", "C", "TinyML", "Microcontrollers", "Edge Deployments"]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Python", context: "Primary research & ML system engineering", vibe: "Core" },
      { name: "C++", context: "Low-latency firmware & hardware communications", vibe: "Hardware" },
      { name: "Java", context: "System integration & algorithmic development", vibe: "Familiar" }
    ]
  },
  {
    id: "ai-core",
    title: "Machine Learning & AI",
    iconName: "BrainCircuit",
    skills: [
      { name: "PyTorch & TensorFlow", context: "Neural Network architecture design & custom training", vibe: "Core" },
      { name: "Decoder-Only LLMs", context: "Local LoRA, PEFT fine-tuning, and offline RAG environments", vibe: "Optimization" },
      { name: "Computer Vision", context: "State-of-the-Art CNNs, Person Re-ID, and CLIP vision embeddings", vibe: "Core" },
      { name: "Edge AI / TinyML", context: "Quantizing weights to FP16/INT8 for strict hardware parameters", vibe: "Optimization" },
      { name: "NLP", context: "Sentence Transformers structural cosine similarity search", vibe: "Core" },
      { name: "Classification Engines", context: "XGBoost, Scikit-Learn validation and feature extraction & selection", vibe: "Core" }
    ]
  },
  {
    id: "tools",
    title: "Libraries, Databases & OS",
    iconName: "Cpu",
    skills: [
      { name: "OpenCV", context: "High-frequency frame buffering and temporal color conversion loops", vibe: "Core" },
      { name: "FAISS", context: "Ultra-fast high-dimensional vector search index databases", vibe: "Optimization" },
      { name: "Hugging Face Ecosystem", context: "Model Hub deployment, PEFT fine-tune and tokenizer alignment", vibe: "Core" },
      { name: "NumPy & Pandas", context: "Massive matrix calculations, chronologically shifting datasets", vibe: "Core" },
      { name: "Linux (Ubuntu)", context: "Kernel command structures, network pipelines, resource monitoring", vibe: "Hardware" },
      { name: "Git", context: "Iterative branch management and collaborative pipeline structures", vibe: "Core" }
    ]
  },
  {
    id: "frameworks",
    title: "Web Backends",
    iconName: "Network",
    skills: [
      { name: "FastAPI & Flask", context: "High performance REST microservices for deep learning inference servers", vibe: "Core" },
      { name: "Django", context: "Solid monolithic architectures supporting on-premise localized LLM chat pipelines", vibe: "Core" },
      { name: "Node.js", context: "V8 platform scaling for interface-backend handshakes", vibe: "Familiar" }
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
    grade: "8.05",
    gradeLabel: "CGPA",
    details: [
      "Coursework: Stanford Machine Learning Specialization",
      "Active Junior Core Member of The Electronics Club, leading ML-hardware architectures",
      "Specializing deep in on-device AI compilers, high-accuracy computer vision, and predictive statistics."
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
      "Rigorous core curriculum specializing in Physics, Chemistry, and Advanced Mathematics.",
      "Developed early programs integrating numerical computing libraries and matrix geometry."
    ]
  }
];

export const awards: Award[] = [
  {
    id: "award-1",
    title: "2nd Runner-Up",
    sub: "National Ideathon (Team V-RACING)",
    description: "Architected \"Pre-Cog Brakes\", a prospective torque vectoring system using driver telemetry data stream modeling.",
    date: "Oct 2024",
    badge: "National Level"
  },
  {
    id: "award-2",
    title: "2nd Prize",
    sub: "Hackademia (graVITas'25)",
    description: "Awarded for the unique backend NLP course filtering search architecture of FFCS-Buddy using sentence-transformers.",
    date: "Feb 2025",
    badge: "VIT Technical Festival"
  },
  {
    id: "award-3",
    title: "Patent Application Filed",
    sub: "Architecture / IP",
    description: "Filed a patent application, currently under review, on memory-optimization techniques for embedded machine learning models.",
    date: "Under Review",
    badge: "Intellectual Property"
  }
];
