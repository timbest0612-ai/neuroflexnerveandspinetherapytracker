import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Physical Therapist Chat Endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured in settings.",
          fallbackResponse:
            "I'm currently running in offline clinical guideline mode. Degenerative spine changes typically involve facet joints or intervertebral discs compressing adjacent nerve roots (like cervical nerves radiating down into the arm and hand, or lumbar nerves radiating into the legs and sciatic nerve). Always prioritize gentle nerve sliders over hard stretches, centralize radiating symptoms, and avoid pushing through sharp or electric pain.",
        });
      }

      const systemInstruction = `You are NeuroFlex PT Assistant, a board-certified Physical Therapist and Orthopedic & Neurological Rehabilitation Specialist.
The user is managing degenerative spinal changes (e.g. cervical and lumbar disc degeneration, spinal stenosis, spondylosis) that irritate nerves affecting the neck, back, hands/arms, and legs/feet.

Your goals:
1. Provide empathetic, evidence-based, clinical physical therapy advice focusing on neurodynamics (nerve flossing/gliding), postural restoration (cervical retraction, thoracic extension), and spinal decompression/core stabilization.
2. Emphasize "Centralization of Symptoms" (symptoms retreating out of extremities back into the spine is a positive prognostic indicator; peripheralization/spreading further down fingers or toes means the exercise should be modified or paused).
3. Distinguish clearly between "Nerve Sliders" (gentle gliding of the nerve without tension) and "Nerve Tensioners" (applying dual-ended stretch, only for non-irritable stages).
4. Provide practical home ergonomics, sleep position advice (e.g., cervical roll, pillow between knees), and safe modifications.
5. Emphasize red flags (sudden loss of bowel/bladder control, progressive foot drop or hand clumsiness/dropping cups, saddle anesthesia) that require immediate urgent medical care.
6. Keep responses clear, warm, structured with bullet points or numbered steps when describing exercises.

User Context:
${JSON.stringify(context || {})}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini Chat Error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate response",
      });
    }
  });

  // AI Custom Routine Generator Endpoint
  app.post("/api/gemini/generate-routine", async (req, res) => {
    try {
      const { affectedAreas, painLevel, primarySymptoms, activityLevel, durationMinutes } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key not configured.",
        });
      }

      const prompt = `Generate a customized, safe physical therapy and nerve flossing routine for a patient with degenerative spinal irritation.
Details:
- Affected Areas: ${affectedAreas?.join(", ") || "Neck, Lower Back, Hands, Legs"}
- Current Irritability/Pain: ${painLevel}/10
- Primary Symptoms: ${primarySymptoms?.join(", ") || "Tingling, Stiff back, Arm numbness, Sciatica"}
- Patient Mobility/Activity Level: ${activityLevel || "Gentle"}
- Target Routine Duration: ${durationMinutes || 12} minutes

Return a JSON array of exercises. Each exercise object MUST contain:
- id: string (kebab-case)
- title: string
- targetArea: string ("Neck & Cervical" | "Hands & Arms" | "Back & Spine" | "Legs & Sciatic")
- type: string ("Nerve Glide" | "Decompression" | "Mobility" | "Stabilization")
- durationSeconds: number
- repsDescription: string (e.g. "8-10 gentle glides per side", "Hold 5s, 6 reps")
- stepByStep: string[]
- clinicalBenefit: string (explain what nerve or spinal segment is mobilized)
- safetyCue: string
- intensity: "Gentle" | "Moderate" | "Progressive"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction:
            "You are an expert orthopedic physical therapist specializing in neurodynamic mobilization and spinal rehabilitation.",
        },
      });

      const parsed = JSON.parse(response.text || "[]");
      res.json({ routine: parsed });
    } catch (error: any) {
      console.error("Routine Gen Error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate custom routine",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
