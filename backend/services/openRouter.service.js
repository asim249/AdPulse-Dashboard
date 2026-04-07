const askAi = async (messages) => {
    if (!messages || messages.length === 0) {
        throw new Error('Invalid message format');
    }

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
            // model: 'openai/gpt-4o-mini',
            model: 'arcee-ai/trinity-large-preview:free',
            messages
        })
    });

    const responseData = await res.json();

    if (!res.ok) {
        console.error("OpenRouter Error:", responseData);
        throw new Error(responseData.error?.message || "AI request failed");
    }

    const content = responseData?.choices?.[0]?.message?.content;

    if (!content) {
        console.error("Unexpected AI response:", responseData);
        throw new Error('No response from AI');
    }

    return content;
};
module.exports = askAi;