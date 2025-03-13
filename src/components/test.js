
// document.addEventListener("DOMContentLoaded", () => {
//     speakText(text);
// });


const text = `Die Schönheit der Natur ist in jeder Jahreszeit auf ihre eigene Weise faszinierend. Im Frühling erwacht die Welt zu neuem Leben, wenn die ersten Knospen an den Bäumen erscheinen und bunte Blumen die Wiesen schmücken. Die Tage werden länger, die Temperaturen steigen, und die Vögel kehren aus ihren Winterquartieren zurück. Der Sommer bringt warme Sonnenstrahlen und lädt dazu ein, Zeit im Freien zu verbringen – sei es beim Schwimmen im See, beim Wandern in den Bergen oder bei einem gemütlichen Grillabend mit Freunden. Im Herbst verwandeln sich die Blätter der Bäume in ein beeindruckendes Farbenspiel aus Rot, Orange und Gelb, während die Luft frischer wird und die Erntezeit beginnt. Schließlich bringt der Winter eine ganz eigene Magie mit sich: verschneite Landschaften, gemütliche Abende am Kamin und festliche Feiertage, die die Menschen zusammenbringen. Jede Jahreszeit hat ihren eigenen Charme und bietet zahlreiche Möglichkeiten, die Natur in all ihren Facetten zu genießen.`;

export const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices and select the German one
    const voices = synth.getVoices();
    const germanVoice = voices.find(voice => voice.name === "Google Deutsch" && voice.lang === "de-DE");
    
    if (germanVoice) {
        utterance.voice = germanVoice;
    } else {
        console.warn("Google Deutsch voice not found. Using default voice.");
    }
    
    utterance.lang = "de-DE";
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
}