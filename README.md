# PulseIQ - Comprehensive Health Management Platform

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Component Details](#component-details)
6. [Setup & Installation](#setup--installation)
7. [API Documentation](#api-documentation)
8. [Key Features](#key-features)
9. [System Integration Flow](#system-integration-flow)

---

## 🏥 Project Overview

**PulseIQ** is an AI-powered comprehensive health management platform designed to provide personalized healthcare solutions. It integrates:
- **Real-time health monitoring** (fitness, vital signs)
- **AI-powered medical guidance** (RAG-based medical assistant)
- **Digital Twin analysis** (health risk assessment)
- **Appointment booking & management**
- **Medical report analysis** (PDF/document uploads)
- **Skin disease detection** (AI-based image analysis)
- **Medication adherence tracking**
- **Care plan generation**

The platform serves both **patients** and **doctors** with a user-friendly interface and robust backend infrastructure.

---

## 🏗️ Architecture

PulseIQ uses a **3-tier architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│              - User Interface                                 │
│              - State Management (Redux)                       │
│              - Real-time Updates                              │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP/REST API
                 ↓
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                      │
│              - API Gateway                                    │
│              - Authentication & Authorization                │
│              - Business Logic                                 │
│              - Database Management                            │
└────────────────┬────────────────────────────────────────────┘
                 │ Internal API Calls
                 ↓
┌─────────────────────────────────────────────────────────────┐
│         ML/AI ENGINE (FastAPI + Python)                      │
│              - Medical RAG (Retrieval-Augmented Generation)   │
│              - Digital Twin Analysis                          │
│              - Document Processing                            │
│              - LLM Integration (Google Gemini AI)             │
│              - Vector Store (FAISS)                           │
└─────────────────────────────────────────────────────────────┘
```

### Data Persistence
- **MongoDB**: Primary database (User profiles, appointments, fitness data)
- **PostgreSQL**: ML database (Chat history, documents, medical records)
- **Vector Store (FAISS)**: Semantic search for medical documents

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 19 | UI Framework |
| Vite | Build tool & dev server |
| Redux Toolkit | Global state management |
| React Router v7 | Client-side routing |
| Tailwind CSS | Styling & UI components |
| Axios | HTTP client |
| Framer Motion | Animations |
| Lucide React | Icon library |
| Chart.js | Data visualization |
| React Markdown | Markdown rendering |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication tokens |
| BCrypt | Password hashing |
| Passport.js | OAuth authentication |
| Google APIs | OAuth integration |
| Morgan | HTTP logging |
| Jest | Testing framework |

### ML/AI Engine
| Technology | Purpose |
|-----------|---------|
| FastAPI | High-performance API |
| Python 3.x | Core language |
| PostgreSQL | Document storage |
| SQLAlchemy | ORM |
| FAISS | Vector similarity search |
| Google Generative AI | LLM integration (Gemini) |
| PyPDF2 | PDF processing |
| LangChain | LLM orchestration |

---

## 📁 Project Structure

```
PulseIQ/
├── Backend/                    # Node.js REST API
│   ├── controllers/           # Business logic for each feature
│   │   ├── user.controller.js
│   │   ├── appointment.controller.js
│   │   ├── fitness.controller.js
│   │   ├── assessment.controller.js
│   │   ├── carePlan.controller.js
│   │   ├── doctor.controller.js
│   │   └── skinDetection.controller.js
│   ├── models/               # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── patient.model.js
│   │   ├── doctor.model.js
│   │   ├── appointment.model.js
│   │   └── fitness.model.js
│   ├── routes/               # API route definitions
│   │   ├── user.route.js
│   │   ├── appointment.route.js
│   │   ├── fitness.route.js
│   │   ├── assessment.route.js
│   │   ├── carePlan.route.js
│   │   ├── doctor.route.js
│   │   ├── skinDetection.route.js
│   │   └── aqi.route.js
│   ├── middlewares/          # Express middleware
│   │   ├── auth.js          # JWT verification
│   │   └── errorHandler.js  # Global error handling
│   ├── utils/               # Utility functions
│   │   ├── ApiResponse.js   # Standard API response wrapper
│   │   ├── ApiError.js      # Custom error class
│   │   └── asyncHandler.js  # Async error wrapper
│   ├── db/                  # Database connection
│   │   └── db.js           # MongoDB connection
│   ├── tests/               # Jest test files
│   │   ├── user.test.js
│   │   ├── auth.test.js
│   │   ├── doctor.test.js
│   │   ├── appointment.test.js
│   │   └── profile.test.js
│   ├── App.js              # Express app configuration
│   ├── Index.js            # Server entry point
│   ├── package.json        # Dependencies & scripts
│   ├── jest.config.js      # Jest configuration
│   └── babel.config.js     # Babel configuration
│
├── Frontend/               # React + Vite application
│   ├── src/
│   │   ├── Components/     # React components
│   │   │   ├── HomePage.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── AppNavbar.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── MainPage.jsx
│   │   │   ├── ChatBot.jsx
│   │   │   ├── Assessment.jsx
│   │   │   ├── FitnessDashboard.jsx
│   │   │   ├── HealthRiskDashboard.jsx
│   │   │   ├── DigitalTwinDashboard.jsx
│   │   │   ├── Appointmentbooking.jsx
│   │   │   ├── DoctorAppointment.jsx
│   │   │   ├── SkinDetection.jsx
│   │   │   ├── NutritionPlanner.jsx
│   │   │   ├── DailyCheckIn.jsx
│   │   │   ├── MedicationAdherenceAssistant.jsx
│   │   │   ├── SmartCarePlanGenerator.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── UserReportUpload.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │   │   ├── QuestionScreen.jsx
│   │   │   └── ResultScreen.jsx
│   │   ├── store/          # Redux state management
│   │   │   ├── authSlice.js
│   │   │   ├── medicationSlice.js
│   │   │   └── store.js
│   │   ├── utils/          # Utility functions
│   │   │   ├── api.js      # Axios instance & API calls
│   │   │   ├── localAuth.js
│   │   │   ├── markdownFormatter.js
│   │   │   └── markdownFormatter.jsx
│   │   ├── App.jsx         # Root component
│   │   ├── main.jsx        # React DOM render
│   │   ├── App.css
│   │   └── index.css
│   ├── public/             # Static assets
│   │   └── data/
│   │       └── puneOutbreak.json
│   ├── package.json
│   ├── vite.config.js      # Vite configuration
│   ├── eslint.config.js    # ESLint configuration
│   └── index.html
│
└── PulseIQ ML/            # AI/ML Engine (FastAPI + Python)
    ├── medical_rag/       # Medical RAG system
    │   ├── main.py        # FastAPI application entry point
    │   ├── database.py    # PostgreSQL models & ORM setup
    │   ├── utils/         # Utility modules
    │   │   ├── llm_service.py           # Google Gemini AI integration
    │   │   ├── vector_store.py          # User-specific vector store (FAISS)
    │   │   ├── global_vector_store.py   # Global medical data vector store
    │   │   ├── pdf_extractor.py         # PDF parsing & text extraction
    │   │   ├── chunker.py               # Text chunking for embeddings
    │   │   ├── prompt_builder.py        # Prompt engineering
    │   │   └── digital_twin.py          # Health risk analysis
    │   ├── global_data/   # Pre-built medical knowledge base
    │   │   ├── global_chunks.txt        # Medical information chunks
    │   │   └── global_index.faiss       # Pre-computed vector embeddings
    │   ├── user_data/     # User-specific documents & embeddings
    │   │   ├── {user_id}_chunks.txt
    │   │   └── {user_id}_index.faiss
    │   ├── uploads/       # Temporary uploaded files
    │   ├── global_docs/   # Source medical documents
    │   └── .env           # Environment variables
    │
    └── NurtureNestmodel/  # Additional ML models (placeholder)
```

---

## 🔧 Component Details

### Backend Components

#### User Controller (`user.controller.js`)
- User registration (Patient & Doctor)
- User login & authentication
- Password change
- Profile retrieval

#### Appointment Controller (`appointment.controller.js`)
- Book appointments
- Manage existing appointments
- Doctor availability management
- Appointment notifications

#### Fitness Controller (`fitness.controller.js`)
- Track fitness activities
- Store workout logs
- Calculate fitness metrics

#### Assessment Controller (`assessment.controller.js`)
- Create health assessments
- Store assessment results
- Track health metrics over time

#### Care Plan Controller (`carePlan.controller.js`)
- Generate personalized care plans
- Update care plans
- Track care plan adherence

#### Skin Detection Controller (`skinDetection.controller.js`)
- Process skin disease detection
- Integrate with ML model
- Store detection results

#### Doctor Controller (`doctor.controller.js`)
- Doctor profile management
- Specialization tracking
- Patient management

### Frontend Components

#### Authentication Components
- `Register.jsx` - Signup/Login page
- `ProfileDropdown.jsx` - User profile menu

#### Dashboard Components
- `MainPage.jsx` - Home dashboard
- `FitnessDashboard.jsx` - Fitness tracking
- `HealthRiskDashboard.jsx` - Health risk visualization
- `DigitalTwinDashboard.jsx` - AI health assessment
- `ProfilePage.jsx` - User profile

#### Feature Components
- `ChatBot.jsx` - AI health assistant (RAG-based)
- `Assessment.jsx` - Health assessment questionnaire
- `SkinDetection.jsx` - Skin disease detection
- `NutritionPlanner.jsx` - Nutrition recommendations
- `DailyCheckIn.jsx` - Daily health check-in
- `MedicationAdherenceAssistant.jsx` - Medication tracking
- `Appointmentbooking.jsx` - Book appointments
- `UserReportUpload.jsx` - Upload medical documents

#### Layout Components
- `Sidebar.jsx` - Navigation sidebar
- `AppNavbar.jsx` - Top navigation bar
- `MainLayout.jsx` - Main layout wrapper

### ML/AI Engine Components

#### RAG System (Retrieval-Augmented Generation)
The system uses two vector stores:
1. **Global Vector Store**: Pre-built medical knowledge base
2. **User Vector Store**: User-specific medical documents

**Flow**:
```
User Question
    ↓
Retrieve relevant medical chunks (similarity search)
    ↓
Build contextual prompt
    ↓
Generate response using Google Gemini AI
    ↓
Return personalized response
```

#### Digital Twin Analysis (`digital_twin.py`)
- Analyzes user's chat history
- Identifies health risks
- Generates health risk assessment
- Provides preventive recommendations

#### Document Processing Pipeline
1. **PDF Extraction** (`pdf_extractor.py`) - Extract text from PDFs
2. **Chunking** (`chunker.py`) - Split text into semantic chunks
3. **Embeddings** - Convert chunks to vector embeddings
4. **Indexing** (`vector_store.py`) - Store in FAISS index
5. **Retrieval** - Fetch relevant chunks for queries

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB (v6.0+)
- PostgreSQL (v13+)
- Git

### Backend Setup

```bash
cd Backend
npm install

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
EOF

# Start backend
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd Frontend
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_ML_URL=http://localhost:8000
EOF

# Start frontend
npm run dev
# App runs on http://localhost:5173
```

### ML/AI Engine Setup

```bash
cd "PulseIQ ML/medical_rag"
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/medical_rag
GOOGLE_API_KEY=your_google_gemini_api_key
EOF

# Start FastAPI server
uvicorn main:app --reload --port 8000
# API runs on http://localhost:8000
```

---

## 🌐 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register/patient    - Register patient
POST   /api/auth/register/doctor     - Register doctor
POST   /api/login                    - Login user
POST   /api/logout                   - Logout user (protected)
GET    /api/profile                  - Get user profile (protected)
POST   /api/change-password          - Change password (protected)
```

### Appointment Endpoints
```
POST   /api/appointments             - Book appointment (protected)
GET    /api/appointments             - Get appointments (protected)
PUT    /api/appointments/:id         - Update appointment (protected)
DELETE /api/appointments/:id         - Cancel appointment (protected)
```

### Fitness Endpoints
```
POST   /api/fitness                  - Log fitness activity (protected)
GET    /api/fitness                  - Get fitness logs (protected)
GET    /api/fitness/stats            - Get fitness statistics (protected)
```

### Assessment Endpoints
```
POST   /api/assessment               - Create assessment (protected)
GET    /api/assessment               - Get assessments (protected)
GET    /api/assessment/:id           - Get assessment details (protected)
```

### ML/AI Endpoints (FastAPI)
```
POST   /chat/personalized            - Personalized health assistant
POST   /chat/save                    - Save chat history
POST   /upload-document              - Upload medical document
GET    /digital-twin/:userId         - Get health risk assessment
POST   /skin-detection               - Skin disease detection
```

---

## ✨ Key Features

### 1. **AI Health Assistant (RAG-based)**
- Uses Retrieval-Augmented Generation with Google Gemini AI
- Searches personalized medical documents + global medical knowledge base
- Provides context-aware health guidance

### 2. **Digital Twin Technology**
- Analyzes entire chat history
- Identifies emerging health risks
- Provides personalized health recommendations
- Tracks health patterns over time

### 3. **Multi-format Document Support**
- Upload and parse PDF reports
- Extract medical information automatically
- Build personal medical knowledge base

### 4. **Real-time Fitness Tracking**
- Log workouts and activities
- Track vital signs
- Visualize fitness metrics over time
- Integration with smartwatch data

### 5. **Appointment Management**
- Book appointments with doctors
- View doctor availability
- Doctor appointment dashboard
- Automated scheduling

### 6. **AI-Powered Assessments**
- Health risk questionnaires
- Personalized scoring
- Historical tracking

### 7. **Skin Disease Detection**
- Image-based skin analysis
- AI classification of skin conditions
- Recommendation for professional consultation

### 8. **Medication Adherence Tracking**
- Medication reminders
- Adherence tracking
- Integration with daily check-ins

### 9. **Care Plan Generation**
- AI-generated personalized care plans
- Based on health assessments
- Adaptable and updateable

### 10. **Dual User Roles**
- **Patient Portal**: Access to all health features
- **Doctor Dashboard**: Manage patients and appointments

---

## 🔄 System Integration Flow

### User Registration & Authentication
```
User Registration
    ↓
Backend validates & hashes password
    ↓
Stores in MongoDB
    ↓
JWT token generated
    ↓
Stored in localStorage (frontend)
    ↓
All subsequent requests include JWT
```

### Chat/Query Flow
```
User asks health question (Frontend)
    ↓
Sent to ML Engine (FastAPI)
    ↓
RAG System retrieves relevant documents
    ↓
Builds prompt with retrieved context
    ↓
Google Gemini AI generates response
    ↓
Response stored in PostgreSQL (with user_id)
    ↓
Digital Twin analyzes conversation pattern
    ↓
Returns response to Frontend + risk assessment
```

### Document Upload Flow
```
User uploads PDF (Frontend)
    ↓
Sent to ML Engine
    ↓
PDFExtractor parses document
    ↓
Chunker splits into semantic chunks
    ↓
Embeddings generated for each chunk
    ↓
FAISS vector index updated (user-specific)
    ↓
Metadata stored in PostgreSQL
    ↓
Available for future RAG queries
```

### Fitness Tracking Flow
```
User logs workout (Frontend)
    ↓
Backend stores in MongoDB
    ↓
Frontend retrieves & displays on dashboard
    ↓
Data used for health risk assessment
    ↓
Integrated in Digital Twin analysis
```

---

## 📊 Database Schema Overview

### MongoDB Collections
- **Users**: Authentication & profile data
- **Patients**: Patient-specific health data
- **Doctors**: Doctor specializations & schedules
- **Appointments**: Booking details
- **Fitness**: Workout logs & metrics

### PostgreSQL Tables
- **global_documents**: Medical knowledge base
- **global_chunks**: Indexed medical information
- **user_documents**: User-uploaded medical files
- **user_chunks**: Chunks from user documents
- **user_chat**: Chat history with medical AI

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt for secure password storage
- **CORS Protection**: Configured CORS for frontend communication
- **Protected Routes**: Authorization middleware on all sensitive endpoints
- **Session Management**: Express sessions for OAuth flow
- **Environment Variables**: Sensitive data in .env files (not committed)

---

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_oauth_id
GOOGLE_CLIENT_SECRET=your_oauth_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_ML_URL=http://localhost:8000
```

### ML Engine (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/db
GOOGLE_API_KEY=your_gemini_api_key
FAISS_INDEX_PATH=./user_data/
GLOBAL_INDEX_PATH=./global_data/
```

---

## 🧪 Testing

### Backend Testing
```bash
cd Backend
npm test
```

Tests include:
- User authentication (registration, login)
- Authorization (protected routes)
- API endpoints
- Error handling

### Test Files
- `tests/user.test.js` - User controller tests
- `tests/auth.test.js` - Authentication tests
- `tests/doctor.test.js` - Doctor controller tests
- `tests/appointment.test.js` - Appointment tests
- `tests/profile.test.js` - Profile tests

---

## 🎯 Future Enhancements

- [ ] Real-time notifications (WebSockets)
- [ ] Video consultation integration
- [ ] Wearable device integration (Apple Watch, Fitbit)
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with EHR systems
- [ ] Telemedicine video streaming

---

## 👨‍💻 Development Workflow

### Code Structure Best Practices
- **Controllers**: Business logic layer
- **Models**: Data schema layer
- **Routes**: API endpoint definitions
- **Middlewares**: Cross-cutting concerns
- **Utils**: Reusable functions

### Frontend Component Structure
```jsx
Component
├── State Management (Redux hooks)
├── Side Effects (useEffect)
├── Handlers (event listeners)
└── JSX (UI rendering)
```

---

## 📞 Support & Documentation

For additional information:
- Check individual component files for detailed comments
- Review test files for usage examples
- Refer to API route files for endpoint specifications

---

## 📄 License

All rights reserved. PulseIQ © 2024-2026

---

**Last Updated**: February 22, 2026
