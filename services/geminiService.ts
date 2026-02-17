
import { GoogleGenAI, Type } from "@google/genai";
import { PortfolioData } from "../types";

export async function parseResume(resumeText: string): Promise<PortfolioData> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as an expert Tech Recruiter specializing in AI and Innovation roles. 
    Analyze the provided resume and transform it into a high-impact professional brand identity.
    
    CRITICAL: Even if the candidate's background is in business, retail, or operations, pivot their accomplishments toward "innovation," "strategy," and "digital transformation" to appeal to the AI industry.
    
    Craft a "magnetic story" for the "about" section that connects their past achievements to a futuristic vision in AI/Tech.
    
    Resume Text:
    ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          about: { type: Type.STRING },
          skills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                level: { type: Type.NUMBER }
              },
              required: ["name", "category", "level"]
            }
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                link: { type: Type.STRING }
              },
              required: ["title", "description", "techStack"]
            }
          },
          contact: {
            type: Type.OBJECT,
            properties: {
              email: { type: Type.STRING },
              linkedin: { type: Type.STRING },
              github: { type: Type.STRING }
            },
            required: ["email"]
          }
        },
        required: ["name", "title", "summary", "about", "skills", "projects", "contact"]
      }
    }
  });

  const jsonStr = response.text?.trim();
  if (!jsonStr) throw new Error("Model response was empty.");

  return JSON.parse(jsonStr) as PortfolioData;
}

export async function generatePortfolioSource(data: PortfolioData): Promise<{ html: string, css: string, js: string }> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write the complete source code for a single-page professional portfolio for ${data.name}. 
    
    Persona: Senior UI/UX Designer.
    Aesthetic: High-end tech brand, dark mode default, neon accents, sleek interactions.
    Constraint: HTML5, CSS3, and Vanilla JS ONLY. 100% GitHub Pages ready.
    
    Data: ${JSON.stringify(data)}
    
    Output JSON with 'html', 'css', and 'js' keys.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          html: { type: Type.STRING, description: "Full HTML5 document including meta tags" },
          css: { type: Type.STRING, description: "Complete CSS3 with modern layouts and animations" },
          js: { type: Type.STRING, description: "Vanilla JS for theme toggling and scroll effects" }
        },
        required: ["html", "css", "js"]
      }
    }
  });

  const jsonStr = response.text?.trim();
  if (!jsonStr) throw new Error("Code generation failed.");
  return JSON.parse(jsonStr);
}

export function generateAIPrompt(data: PortfolioData): string {
  const skillsList = data.skills.map(s => s.name).join(", ");
  const projectsDetails = data.projects.map(p => `- **${p.title}**: ${p.description} (Key Concepts: ${p.techStack.join(", ")})`).join("\n");

  return `### ELITE RECRUITER'S META-PROMPT FOR PORTFOLIO GENERATION

**PERSONA**: Act as a World-Class Tech Recruiter and Senior UI/UX Designer. Your goal is to build a high-conversion, magnetic brand page for ${data.name}.

**THE MISSION**:
Create a digital presence that tells an authentic story, has immense visual impact, and is easy to navigate. The primary audience is potential clients hiring for top-tier AI and innovation roles.

**TECHNICAL CONSTRAINTS (MANDATORY)**:
- Output ONLY high-quality HTML5, CSS3, and Vanilla JavaScript.
- NO frameworks, libraries, or build steps.
- The code must be ready for instant hosting on GitHub Pages.
- Responsive, Mobile-First, and Accessibility (ARIA) focused.

**VISUAL BRANDING SPECIFICATIONS**:
- **Design System**: Sleek "Future-Tech" aesthetic. 
- **Theme**: Support for Dark/Light mode. Default: Premium Dark (BG: #0A0F1E, Accent: Neon Cyan #00F5FF).
- **Typography**: 
  - Headlines: 'Poppins' (Sans-Serif, Bold/Extra-Bold) for authority.
  - Body: 'Inter' (Sans-Serif, Medium) for readability.
- **Iconography**: Minimalist line icons (SVG).
- **Interactivity**: Subtle entry animations and neon-glow hover states that feel intelligent and responsive.

**BRAND NARRATIVE & SECTIONS**:
1. **Hero**: Headline: "${data.summary}". Positioning ${data.name} as a leader in their field.
2. **About (The Narrative)**: "${data.about.replace(/"/g, "'")}". Tell a compelling, visionary story.
3. **The Arsenal (Skills)**: Create a visually engaging skills grid: ${skillsList}.
4. **Impact (Projects)**:
${projectsDetails}
5. **Call to Action**: Magnetic contact section for ${data.contact.email} and social profiles.

**INSTRUCTION**: Deliver the complete source code (HTML, CSS, JS) to build this magnetic brand immediately.`;
}
