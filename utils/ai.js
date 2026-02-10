const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const askAI = async (question) => {
  if (typeof question !== "string") {
    throw new Error("Invalid AI input");
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 10
    });

    return response.choices[0].message.content.trim().split(/\s+/)[0];

  } catch (err) {
    // ✅ OFFICIAL GRACEFUL FAILURE
    throw new Error("AI service unavailable");
  }
};

module.exports = { askAI };
