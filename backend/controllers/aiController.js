const askAi = require("../services/openRouter.service");

// const generateBrief = async (req, res) => {
//   try {
//     const { name, industry, objective, budget, targetAudience, tone } =
//       req.body;
//     if (!name || !objective) {
//       return res
//         .status(400)
//         .json({ message: "Please provide all required fields." });
//     }

//     const messages = [
//   {
//     role: "user",
//     content: `
//       You are a Senior Creative Director at a top advertising agency. 
//       Based on the following details, generate a comprehensive Creative Brief:
//       - Client: ${name} (${industry})
//       - Campaign Objective: ${objective}
//       - Budget: $${budget}
//       - Target Audience: ${targetAudience}
//       - Desired Tone: ${tone}

//       Please provide the output in the following structure:
//       1. Campaign Title
//       2. Strategic Approach
//       3. 3 Creative Headline Ideas
//       4. Recommended Advertising Channels
//       5. Tone of Voice Guidelines
//     `
//   }
// ];

//     const aiResponse = await askAi(messages);
//     if (!aiResponse || !aiResponse.trim()) {
//       return res.status(500).json({ error: "Failed to generate Response" });
//     }
// //     const sections = aiResponse.split(/\n(?=\d+\.\s)/);

// // const cleanResponse = sections.map(section =>
// //   section.replace(/\*\*/g, "").trim()
// // );

//     const cleanResponse = aiResponse
//   .split("\n")
//   .map(q => q.replace(/^\d+[\).\-\s]*/, '').trim())
//   .filter(q => q.length > 10)
//   .slice(0, 5);
//     res.status(200).json({ Response: cleanResponse });
//   } catch (error) {
//     console.error("Error generating brief:", error);
//     res.status(500).json({ error: "Failed to generate brief" });
//   }
// };
const generateBrief = async (req, res) => {
  try {
    const { name, industry, objective, budget, targetAudience, tone } =
      req.body;
    if (!name || !objective) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const messages = [
  {
    role: "user",
    content: `
      You are a Senior Creative Director at a top advertising agency.Return ONLY valid JSON. No markdown.
      Format:
{
  "title": "",
  "strategy": "",
  "headlines": ["", "", ""],
  "channels": ["", "", ""],
  "tone": ""
}
 
      Based on the following details, generate a comprehensive Creative Brief:
      - Client: ${name} (${industry})
      - Campaign Objective: ${objective}
      - Budget: $${budget}
      - Target Audience: ${targetAudience}
      - Desired Tone: ${tone}

      Please provide the output in the following structure:
      1. Campaign Title
      2. Strategic Approach
      3. 3 Creative Headline Ideas
      4. Recommended Advertising Channels
      5. Tone of Voice Guidelines
    `
  }
];
    const aiResponse = await askAi(messages);

    let parsed;
    const clean = aiResponse.replace(/```json|```/g, '').trim();
    try {
      parsed = JSON.parse(clean);
    } catch (err) {
      console.log("RAW AI:", aiResponse);
      return res.status(500).json({
        error: "Invalid JSON from AI",
        raw: aiResponse
      });
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error generating brief:", error);
    res.status(500).json({ error: "Failed to generate brief" });
  }
};

const generateCopy = async (req, res) => {
  try {
   const { productName, tone } = req.body;
    if (!productName) {
      return res.status(400).json({ message: "Product name is required." });
    }

    const messages = [
  {
    role: "user",
    content: `
     Write 3 catchy ad headlines and 1 short body paragraph for a product named "${productName}" with a ${tone || 'professional'} tone. Keep it concise for social media ads.
    `
  }
];

    const aiResponse = await askAi(messages);
    if (!aiResponse || !aiResponse.trim()) {
      return res.status(500).json({ error: "Failed to generate Response" });
    }
    const sections = aiResponse.split(/\n(?=\d+\.\s)/);

const cleanResponse = sections.map(section =>
  section.replace(/^\d+\.\s*/, "") // remove 1. 2. etc
    .replace(/\*\*/g, "")     // remove bold **
    .trim()
);
    res.status(200).json({ Response: cleanResponse });
  } catch (error) {
    console.error("Error generating copy:", error);
    res.status(500).json({ error: "Failed to generate copy" });
  }
};

module.exports = {
    generateBrief,
    generateCopy
}