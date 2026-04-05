const OpenAI = require('openai');

const openai = new OpenAI({
    baseUrl: process.env.BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

const runDiagnostic = async (userData) => {
    const { industry, hardSkills, softSkills, intent } = userData;

    const prompt = `
        You are career.exe, a high-precision career diagnostic AI.
        Analyze this candidate:
        - Industry: ${industry}
        - Current Hard Skills: ${hardSkills}
        - Soft Skill Profile (Scores 1-5): ${JSON.stringify(softSkills)}
        - Direct Career Intent: "${intent}"

        Return a strictly formatted JSON object:
        {
          "topMatches": [{"title": "Role", "description": "...", "matchReason": "..."}],
          "readinessScore": 85,
          "gapAnalysis": {"matched": ["Skill A"], "missing": ["Skill B"]},
          "strategicPlan": {
            "technicalSprint": {"focus": "Skill", "action": "Step", "impact": "Why"},
            "softSkillLeverage": {"powerSkill": "Trait", "blindSpot": "Trait", "exercise": "Action"},
            "portfolioStrategy": {"projectConcept": "Idea", "networkingTip": "Who"}
          }
        }
    `;

    const response = await openai.chat.completions.create({
        model: 'AtlaAI/Selene-1-Mini-Llama-3.1-8B',
        max_tokens: 4096,
        messages: [
            { role: "system", content: "You are a professional career architect." },
            { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
};

module.exports = { runDiagnostic };