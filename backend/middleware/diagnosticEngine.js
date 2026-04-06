const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.FEATHERLESS_API_KEY,
  timeout: 60000,
});

const runDiagnostic = async (userData) => {
  console.log("Using Provider URL:", process.env.BASE_URL);
  const { industry, hardSkills, softSkills, intent } = userData;

  const prompt = `
You are career.exe, a high-precision career diagnostic AI.
Your task is to generate a structured "Career Report" based ONLY on the provided candidate data.

=== INPUT DATA ===
- Industry: ${JSON.stringify(industry)}
- Hard Skills: ${JSON.stringify(hardSkills)}
- Soft Skill Scores (1-5): ${JSON.stringify(softSkills)}
- Intent: "${intent}"

=== OUTPUT REQUIREMENTS ===
Return ONLY a valid JSON object. No explanations, no extra text.

=== OUTPUT STRUCTURE ===
{
  "topMatches": [
    {
      "title": "Primary role name",
      "description": "Short explanation of the role",
      "matchReason": "Why this is the strongest match based on intent"
    },
      {
        "title": "Alternative role 1",
        "description": "Short explanation",
        "matchReason": "How it leverages existing skills"
      },
      {
        "title": "Alternative role 2",
        "description": "Short explanation",
        "matchReason": "How it leverages existing skills"
      }
],
  "readiness": {
    "score": 76,
    "label": "76% Ready",
    "gapAnalysis": {
      "whatYouHave": ["List of matched skills"],
      "industryDemand": ["List of required skills"],
      "missing": ["Critical missing skills"]
    }
  },
  "strategicPlan": {
    "technicalSprint": {
      "focus": "Most important missing technical skill",
      "action": "Specific measurable learning plan (include time commitment)",
      "impact": "Clear explanation of career impact"
    },
    "softSkillLeverage": {
      "powerSkill": "Highest-rated soft skill",
      "howToUse": "How to leverage it in job applications or roles",
      "blindSpot": "Lowest-rated soft skill",
      "exercise": "Practical improvement activity"
    },
    "portfolioStrategy": {
      "projectConcept": "Specific real-world project idea aligned with target role",
      "executionTip": "What features or tools to include",
      "networkingTip": "Who to connect with or where to showcase"
    }
  }
}

=== RULES ===
- Ensure readiness score is realistic (0–100) based on skill overlap.
- Primary match MUST align strongly with the user's intent.
- Pivot roles MUST reuse existing skills in different career paths.
- Be concise but specific (no vague advice).
- Do NOT repeat the same skills across all sections unnecessarily.
- Ensure all arrays contain meaningful items (minimum 3 where applicable).
- Output must always be complete and valid JSON.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
  max_tokens: 2048,
      messages: [
        {
          role: "system",
          content:
            "You are a professional career architect that outputs strictly in JSON.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("AI Engine Error:", error.message);
    throw new Error("Failed to synthesize diagnostic data.");
  }
};

module.exports = { runDiagnostic };
