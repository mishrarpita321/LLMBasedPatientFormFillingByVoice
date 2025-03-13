const TestTTS = () => {
    const germanText = `Die Schönheit der Natur ist in jeder Jahreszeit auf ihre eigene Weise faszinierend. Im Frühling erwacht die Welt zu neuem Leben, wenn die ersten Knospen an den Bäumen erscheinen und bunte Blumen die Wiesen schmücken. Die Tage werden länger, die Temperaturen steigen, und die Vögel kehren aus ihren Winterquartieren zurück. Der Sommer bringt warme Sonnenstrahlen und lädt dazu ein, Zeit im Freien zu verbringen – sei es beim Schwimmen im See, beim Wandern in den Bergen oder bei einem gemütlichen Grillabend mit Freunden. Im Herbst verwandeln sich die Blätter der Bäume in ein beeindruckendes Farbenspiel aus Rot, Orange und Gelb, während die Luft frischer wird und die Erntezeit beginnt. Schließlich bringt der Winter eine ganz eigene Magie mit sich: verschneite Landschaften, gemütliche Abende am Kamin und festliche Feiertage, die die Menschen zusammenbringen. Jede Jahreszeit hat ihren eigenen Charme und bietet zahlreiche Möglichkeiten, die Natur in all ihren Facetten zu genießen.`;
    
    const englishText = "according to the South Korean constitution, the chairperson of the cabinet, the chief executive of the government, commander-in-chief of the armed forces, and the head of state of South Korea. The Constitution and the amended Presidential Election Act of 1987 provide for election of the president by direct, secret ballot, ending sixteen years of indirect presidential elections under the preceding two governments. The president is directly elected to a five-year term with no possibility of re-election. If a presidential vacancy should occur, a successor must be elected within sixty days, during which time presidential duties are to be performed by the prime minister or other senior cabinet members in the order of priority as determined by law. While in office, the chief executive lives in Cheong Wa Dae (the 'Blue House'), and is exempt from criminal liability (except for insurrection or treason).";
    
    const handleSpeak = (text: string, lang = "de-DE", voiceName = "Google Deutsch") => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        
        const loadVoices = () => {
            const voices = synth.getVoices();
            const selectedVoice = voices.find(voice => voice.name === voiceName && voice.lang === lang);
            
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            } else {
                console.warn(`${voiceName} voice not found. Using default voice.`);
            }
            
            utterance.lang = lang;
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.onend = () => console.log("Speech ended");
            utterance.onerror = () => console.log("Speech error");
            utterance.onpause = () => console.log("Speech paused");
            utterance.onresume = () => console.log("Speech resumed");
            utterance.onstart = () => console.log("Speech started");
            
            synth.cancel();
            synth.speak(utterance);
            
            const r = setInterval(() => {
                console.log(synth.speaking);
                if (!synth.speaking) clearInterval(r);
                else synth.resume();
            }, 14000);
        };
        
        if (synth.getVoices().length > 0) {
            loadVoices();
        } else {
            synth.onvoiceschanged = loadVoices;
        }
    };
    
    return (
        <div>
            <button onClick={() => handleSpeak(germanText, "de-DE", "Google Deutsch")}>Speak German</button>
            <button onClick={() => handleSpeak(englishText, "en-US", "Google US English")}>Speak English</button>
        </div>
    );
};

export default TestTTS;
