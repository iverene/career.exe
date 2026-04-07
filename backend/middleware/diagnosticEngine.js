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
You are career.exe, a high-precision AI career diagnostic system. 
Your task is to generate a structured, actionable "Career Report" based ONLY on the candidate data provided.

=== INPUT DATA ===
- Industry: ${JSON.stringify(industry)}
- Hard Skills: ${JSON.stringify(hardSkills)}
- Soft Skill Scores (1-5): ${JSON.stringify(softSkills)}
- Intent: "${intent}"

=== OUTPUT REQUIREMENTS ===
1. Return ONLY a valid JSON object. Do not include explanations, comments, or extra text.
2. Ensure that all arrays have meaningful items; include at least 3 items where applicable.
3. Provide actionable, specific, and measurable recommendations—no vague advice.

=== OUTPUT STRUCTURE ===
{
  "topMatches": [
    {
      "title": "Primary role name",
      "description": "Detailed explanation of the role, responsibilities, and career trajectory",
      "matchReason": "Why this role strongly matches the user's intent and current skillset"
    },
    {
      "title": "Alternative role 1",
      "description": "Detailed explanation of the role",
      "matchReason": "How this role leverages existing skills differently"
    },
    {
      "title": "Alternative role 2",
      "description": "Detailed explanation of the role",
      "matchReason": "How this role leverages existing skills differently"
    }
  ],
  "readiness": {
    "score": "Realistic readiness score (0-100)",
    "gapAnalysis": {
      "whatYouHave": ["List of matched skills with industry relevance"],
      "industryDemand": ["Full list of required skills for top roles"],
      "missing": ["Critical missing skills to acquire for readiness"]
    }
  },
  "strategicPlan": {
    "technicalSprint": {
      "focus": "Most important missing technical skill",
      "action": "Specific, measurable learning plan with estimated time commitment",
      "impact": "Clear explanation of how acquiring this skill will improve career readiness"
    },
    "softSkillLeverage": {
      "powerSkill": "Highest-rated soft skill",
      "howToUse": "Practical advice on leveraging this skill in roles or applications",
      "blindSpot": "Lowest-rated soft skill",
      "exercise": "Actionable activity to improve the blind spot skill"
    },
    "portfolioStrategy": {
      "projectConcept": "Specific, real-world project idea aligned with the target role",
      "executionTip": "Recommended tools, features, or approaches to implement the project",
      "networkingTip": "Suggestions on who to connect with or where to showcase the project"
    }
  }
}

=== RULES ===
- Primary match MUST align strongly with the user's intent.
- Alternative roles MUST reuse existing skills in different career paths.
- Be concise but specific; avoid vague or generic advice.
- Do NOT repeat the same skills unnecessarily across sections.
- Ensure output is always complete, valid JSON.
- Prioritize actionable insights and measurable steps the user can take.
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
