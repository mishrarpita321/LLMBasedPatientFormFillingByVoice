import React, { useState } from 'react';
import styles from './DataExtractor.module.css';
import { extractDataFromLLM, extractDataWithRegex } from './testMethods';

const DataExtractor: React.FC = () => {
    const [transcribedTextLLM, setTranscribedTextLLM] = useState('');
    const [jsonLLM, setJsonLLM] = useState('');
    const [extractionTimeLLM, setExtractionTimeLLM] = useState('');
    const [loading, setLoading] = useState(false);

    const [transcribedTextRegex, setTranscribedTextRegex] = useState('');
    const [jsonRegex, setJsonRegex] = useState('');
    const [extractionTimeRegex, setExtractionTimeRegex] = useState('');


    const handleExtractLLM = async () => {
        setLoading(true); // Show loader

        try {
            const startExtractionTime = performance.now();
            const json = await extractDataFromLLM(transcribedTextLLM);
            const endExtractionTime = performance.now();
            setJsonLLM(json);
            const time = `${endExtractionTime - startExtractionTime}ms`;
            setExtractionTimeLLM(time);
        } catch (error) {
            console.error("Extraction failed:", error);
        } finally {
            setLoading(false); // Hide loader after extraction completes
        }
    };

    const handleExtractRegex = () => {
        const startExtractionTime = performance.now();
        const json = extractDataWithRegex(transcribedTextRegex); // Placeholder for Regex implementation
        const endExtractionTime = performance.now();
        const time = `${endExtractionTime - startExtractionTime}ms`;
        setJsonRegex(json);
        setExtractionTimeRegex(time);
    };

    const clearData = () => {
        setTranscribedTextLLM('');
        setJsonLLM('');
        setExtractionTimeLLM('');

        setTranscribedTextRegex('');
        setJsonRegex('');
        setExtractionTimeRegex('');
    };

    return (
        <>
            <div className={styles.dataExtractorContainer}>
                <div className={styles.dataExtractorColumn}>
                    <h2>Using LLM</h2>
                    <label>Transcribed Text:</label>
                    <textarea
                        value={transcribedTextLLM}
                        rows={4}
                        onChange={(e) => setTranscribedTextLLM(e.target.value)}
                    ></textarea>


                    {jsonLLM && (
                        <>
                            <label>Json:</label>
                            <textarea
                                value={jsonLLM}
                                readOnly
                                rows={11}
                                className={styles.dataExtractorHidden}
                            ></textarea>
                        </>
                    )}

                    {extractionTimeLLM && (
                        <>
                            <label>Extraction Time:</label>
                            <input
                                type="text"
                                value={extractionTimeLLM}
                                readOnly
                                className={styles.dataExtractorHidden}
                            />
                        </>
                    )}

                    <button
                        onClick={handleExtractLLM}
                        disabled={loading}
                        className={`${styles.extractButton} ${loading ? styles.loadingButton : ''}`}
                    >
                        {loading ? <span className={styles.loadingText}>Extracting<span className={styles.dots}>. . . . .</span></span> : 'Extract Data'}
                    </button>
                </div>

                <div className={styles.dataExtractorColumn}>
                    <h2>Using Traditional Regex Method</h2>
                    <label>Transcribed Text:</label>
                    <textarea
                        value={transcribedTextRegex}
                        onChange={(e) => setTranscribedTextRegex(e.target.value)}
                        rows={4}
                    ></textarea>

                    {jsonRegex && (
                        <>
                            <label>Json:</label>
                            <textarea
                                value={jsonRegex}
                                rows={11}
                                readOnly
                                className={styles.dataExtractorHidden}
                            ></textarea>
                        </>
                    )}

                    {extractionTimeRegex && (
                        <>
                            <label>Extraction Time:</label>
                            <input
                                type="text"
                                value={extractionTimeRegex}
                                readOnly
                                className={styles.dataExtractorHidden}
                            />
                        </>
                    )}

                    <button onClick={handleExtractRegex}>Extract Data</button>
                </div>
            </div>
            <div className={styles.clearDataContainer}>
                <button onClick={clearData} className={styles.clearDataButton}>
                    Clear Data
                </button>
            </div>
        </>
    );
};

export default DataExtractor;
