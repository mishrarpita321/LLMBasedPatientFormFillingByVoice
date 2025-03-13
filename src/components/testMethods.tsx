const token = import.meta.env.VITE_GPT_API_KEY;

export const extractDataFromLLM = async (inputText: string) => {
    // const prompt = "My name is John Doe, I am 30 years old, born on May 15, 1993. My email is john.doe@example.com, and I live in Germany.";
    const url = "https://api.openai.com/v1/chat/completions";
    const requiredKeys = ["passengerName", "email", "departureCity", "destinationCity", "departureDate", "returnDate", "numberOfPassengers", "travelClass", "additionalRequests"];
    const requestData = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a helpful assistant and you only reply with JSON. Extract the following keys from the provided text: Required keys: ${requiredKeys}
                make sure the values start with capital letters and are in the correct format.
                the departure date and return date should be in the format YYYY-MM-DD. The travel class should be one of the following: economy, business, first-class.
                the number of passengers should be a number. Additional requests can be any text.
                null should be returned if the key is not found and the value is not provided.
                `,
            },
            {
                role: "user",
                content: inputText,
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
        console.log(data);
        const completion = data.choices[0].message.content;
        return completion;
    } catch (error) {
        console.error(error);
    }
};


export const extractDataWithRegex = (inputText: string) => {
    // Define regex patterns for the required fields
    // const regexPatterns = {
    //     passengerName: /(?:Passenger Name|my name is):?\s*([a-zA-Z\s]+)/i,
    //     email: /(?:Email|email is|my email is):?\s*([\w.%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,})/i,
    //     departureCity: /(?:Departure City|leaving from|from):?\s*([a-zA-Z\s]+)/i,
    //     destinationCity: /(?:Destination City|going to|to):?\s*([a-zA-Z\s]+)/i,
    //     departureDate: /(?:Departure Date|leaving on|date of departure is):?\s*(\d{4}-\d{2}-\d{2})/i,
    //     returnDate: /(?:Return Date|returning on|date of return is):?\s*(\d{4}-\d{2}-\d{2})/i,
    //     numberOfPassengers: /(?:Number of Passengers|traveling with|number of people is):?\s*(\d+)/i,
    //     travelClass: /(?:Travel Class|class of travel is):?\s*(economy|business|first-class)/i,
    //     additionalRequests: /(?:Additional Requests|special requests are):?\s*(.+)/i,
    // };


    // Flight-related regex patterns
    const regexPatterns = {
        // Captures names in phrases like "I'm Emily Davis", "Passenger Name: John Doe", or "booking a ticket for James O'Connor"
        passengerName: /(?:I(?:'m| am)|Passenger Name|booking a ticket for|flight for):?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+(?:['’][A-Z][a-z]+)?))/i,

        // Matches common email formats preceded by labels like "Email", "email is", or "my email is"
        email: /(?:Email(?: address)?|my email is):?\s*([\w.%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,})/i,

        // Captures the departure city from phrases like "from New York" or "leaving from Chicago"
        departureCity: /(?:from|leaving from):?\s*([A-Za-z\s]+)/i,

        // Captures the destination city from phrases like "to Los Angeles" or "going to San Francisco"
        destinationCity: /(?:to|going to):?\s*([A-Za-z\s]+)/i,

        // Matches dates in formats like "on March 15, 2025" or "departing on 12th June 2025"
        departureDate: /(?:on|departing on):?\s*((?:\d{1,2}(?:st|nd|rd|th)?\s+)?[A-Za-z]+\s+\d{4})/i,

        // Matches return dates from phrases like "returning on March 20th"
        returnDate: /(?:return(?:ing)? on):?\s*((?:\d{1,2}(?:st|nd|rd|th)?\s+)?[A-Za-z]+\s+\d{4})/i,

        // Extracts travel class from phrases like "traveling in business class" or "in premium economy"
        travelClass: /(?:in\s+|travel(?:ing)?\s*(?:in|class[:]?))\s*(economy|business|first class|premium economy|first-class)/i,

        // Matches phone numbers in various formats, e.g., "555-987-6543", "+1-312-789-4560"
        phoneNumber: /(?:phone number|phone|contact):?\s*([\+0-9][\d\-\+\s\(\)]{7,})/i,

        // Captures any additional requests like "wheelchair assistance" if mentioned
        additionalRequests: /(?:additional requests|special requests):?\s*(.+)/i,
    };

    // Extracted data object
    const extractedData: { [key: string]: string | null } = {};

    // Iterate through regex patterns and match data
    for (const [key, regex] of Object.entries(regexPatterns)) {
        const match = inputText.match(regex);
        extractedData[key] = match ? match[1] : null; // Use match[1] if a match is found, otherwise null
    }
    console.log(extractedData);
    return JSON.stringify(extractedData, null, 4); // Pretty-print JSON
    // return extractedData;
};
