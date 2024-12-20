const handleTranscription = async () => {
    const prompt = "My name is John Doe, I am 30 years old, born on May 15, 1993. My email is john.doe@example.com, and I live in Germany.";
    const url = "https://api.openai.com/v1/chat/completions";
    const token = "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";
    const requiredKeys = ["name", "age", "dob", "email", "country"];
    const requestData = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant and you only reply with JSON. Extract the following keys from the provided text: Required keys: ${requiredKeys}`,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        response_format: {
            type: "json_object",
        },
        temperature: 0.7
    };
  
    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
        });
    
        const data = await response.json();
        const completion = data.choices[0].message.content;
        return completion;
        } catch (error) {
        console.error(error);
    }
  };
  
  const result = await handleTranscription();
  console.log(result);