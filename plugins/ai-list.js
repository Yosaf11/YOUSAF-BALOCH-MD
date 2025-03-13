/*╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺
    🇵🇰 ＰＲＯＪＥＣＴ ＮＡＭＥ:
    YOUSAF-BALOCH-MD ＷＨＡＴＳＡＰP ＢＯＴ
    
    🔥 ＤＥＶＥＬＯＰＥＲ
     ＭＲ YOUSAF BALOCH 
     
    🔥 ＭＹ ＴＥＡＭ
     YOUSAF MD SHABAN MD
     
    🔥 ＯＵＲ ＷＥＢＳＩＴＥ
     https://github.com/YosafN/YOUSAF-BALOCH-MD

© 2025 GOD IS GOOD ⚠

╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺*/











const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "chatgpt",
    alias: "ai",
    desc: "Interact with ChatGPT using the Dreaded API.",
    category: "ai",
    react: "🤖",
    use: "<your query>",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        // Check user input
        if (!q) return reply("⚠️ Please provide a query for ChatGPT.\n\nExample:\n.gpt What is AI?");

        const text = encodeURIComponent(q); // Encode user query

        const url = `https://api.dreaded.site/api/chatgpt?text=${text}`;

        console.log('Requesting URL:', url); // Debug log

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
            }
        });

        console.log('Full API Response:', response.data); // Debug log

        if (!response.data || response.data.status !== 200 || !response.data.success) {
            return reply("❌ No valid response from the GPT API. Please try again later.");
        }

        const gptResponse = response.data.result.prompt; // Updated structure

        if (!gptResponse) {
            return reply("❌ The API returned an unexpected format. Please try again later.");
        }

        const ALIVE_IMG = 'https://i.ibb.co/QF0ZDCgx/shaban-md.jpg'; // AI image URL

        const formattedInfo = `🤖 *ChatGPT Response:*\n\n${gptResponse}`;

        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363391372789917@newsletter',
                    newsletterName: 'SHABAN AI',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in GPT command:", error);

        if (error.response) {
            console.log("Error Response Data:", error.response.data);
        } else {
            console.log("Error Details:", error.message);
        }

        const errorMessage = `
❌ An error occurred while processing the GPT command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
