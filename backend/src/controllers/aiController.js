import OpenAI from "openai";
import asyncHandler from "../utils/asyncHandler.js";

const maybeClient = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const localSummaryEnhancer = ({ role = "", skills = "", summary = "" }) => {
  const intro = role ? `Results-driven ${role}` : "Results-driven professional";
  const skillsLine = skills ? ` with strengths in ${skills}` : "";
  const base = summary?.trim() || "I build reliable solutions that improve delivery speed and quality.";
  return `${intro}${skillsLine}. ${base} Focused on measurable impact, cross-functional collaboration, and ATS-friendly clarity.`;
};

const localExperienceEnhancer = ({ text = "", role = "" }) => {
  const seed = text || "Worked on core business projects and collaborated with teams.";
  return `As ${role || "a contributor"}, ${seed} Improved outcomes through ownership, better documentation, and process optimization with measurable delivery improvements.`;
};

export const enhanceSummary = asyncHandler(async (req, res) => {
  const { role, skills, summary } = req.body;

  if (!maybeClient) {
    return res.json({
      success: true,
      data: { content: localSummaryEnhancer({ role, skills, summary }), mock: true }
    });
  }

  const prompt = `Rewrite this professional summary to be concise, ATS-friendly, and achievement-focused. Role: ${role || "N/A"}. Skills: ${skills || "N/A"}. Current summary: ${summary || "N/A"}`;

  const completion = await maybeClient.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert resume writing assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.6,
    max_tokens: 220
  });

  const content = completion.choices?.[0]?.message?.content?.trim();
  res.json({ success: true, data: { content } });
});

export const improveExperience = asyncHandler(async (req, res) => {
  const { role, text } = req.body;

  if (!maybeClient) {
    return res.json({
      success: true,
      data: { content: localExperienceEnhancer({ role, text }), mock: true }
    });
  }

  const prompt = `Improve the following job experience bullet/paragraph for ATS readability and impact. Keep facts unchanged. Role: ${role || "N/A"}. Text: ${text || "N/A"}`;

  const completion = await maybeClient.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert career coach and technical recruiter." },
      { role: "user", content: prompt }
    ],
    temperature: 0.5,
    max_tokens: 220
  });

  const content = completion.choices?.[0]?.message?.content?.trim();
  res.json({ success: true, data: { content } });
});

export const atsSuggestions = asyncHandler(async (req, res) => {
  const { targetRole, resumeText } = req.body;
  const suggestions = [
    `Add role-specific keywords for ${targetRole || "your target role"}.`,
    "Quantify achievements using numbers, percentages, and timelines.",
    "Use action verbs and keep bullet points concise."
  ];

  if (!maybeClient) return res.json({ success: true, data: { suggestions, mock: true } });

  const completion = await maybeClient.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an ATS optimization expert." },
      {
        role: "user",
        content: `Analyze this resume text and return 5 concise ATS improvement suggestions. Role: ${targetRole || "N/A"}. Resume: ${resumeText || "N/A"}`
      }
    ],
    temperature: 0.4,
    max_tokens: 250
  });

  const content = completion.choices?.[0]?.message?.content?.trim() || "";
  res.json({ success: true, data: { suggestions: content.split("\n").filter(Boolean) } });
});