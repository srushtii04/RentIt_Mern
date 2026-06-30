const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const generateDescription = async (req, res) => {

    try {

        const {
            title,
            description, 
            category
        } = req.body;

        if (!title) {

            return res.status(400).json({
                message: "Title is required"
            });

        }

        const prompt = `

You are writing descriptions for a peer-to-peer rental marketplace.

Item Title:
${title}

Existing Description:
${description || "None"}

Category:
${category}

Generate an attractive and professional rental description.

Requirements:

- Around 30-40 words.
- Mention important features.
- Mention that the item is well maintained.
- Make it attractive for renters.
- Do NOT use bullet points.
- Return ONLY the description.

`;

        const result = await model.generateContent(prompt);

        const response = await result.response;

        const text = response.text();

        res.json({

            description: text

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    generateDescription

};