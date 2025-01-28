# LLM-Based Patient Form Filling by Voice

This project enables patient form filling using voice inputs powered by LLMs (Large Language Models). It streamlines the process of collecting patient data through voice recognition and form field extraction.

---

## Features
- **Voice Input**: Fill out forms using your voice with real-time feedback.
- **LLM-Powered Data Extraction**: Extract form data using advanced language models or regex-based methods.
- **Multilingual Support**: English and German available for interactions.
- **Customizable**: Designed with React, TypeScript, and Tailwind for easy expansion.
- **Deployment Ready**: Configured with Docker for streamlined deployment.

---

## Getting Started

### Prerequisites
1. **Node.js**: Version 20 or later.
2. **Docker** (optional for containerized deployment).

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd mishrarpita321-llmbasedpatientformfillingbyvoice
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project
- Start the development server:
  ```bash
  npm run dev
  ```
- Open the app in your browser at `http://localhost:5173`.

---

## Key Files and Structure

- `src/`: Main source code directory.
  - `components/`: Reusable components, including voice input and form fields.
  - `forms/`: Patient intake and flight booking forms.
  - `context/`: React Context for global state management.
  - `utility/`: Helper functions for API and utility logic.

- `Dockerfile`: Docker setup for containerization.
- `vite.config.ts`: Vite configuration for bundling.
- `public/`: Static assets.

---

## Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Run the Docker container:
   ```bash
   docker build -t patient-form-filling .
   docker run -p 5173:5173 patient-form-filling
   ```

---

## Contact
For questions or suggestions, open an issue or reach out to the project maintainer.