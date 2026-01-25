import natural from 'natural';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load bot responses
const responsesPath = path.join(__dirname, '../data/botResponses.json');
const responses = JSON.parse(fs.readFileSync(responsesPath, 'utf-8'));

// Initialize Natural NLP
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Add documents for basic classification (Simplified)
// In a real app, this would be a trained model.
const intents = ['greeting', 'anxiety', 'depression', 'emergency'];
tfidf.addDocument('hello hi hey salam namaste'); // greeting
tfidf.addDocument('anxiety worried panic stressed nervous scared'); // anxiety
tfidf.addDocument('sad depressed hopeless cry lonely'); // depression
tfidf.addDocument('suicide kill die hurt end life'); // emergency

/**
 * Check for high-risk keywords (Sentinel)
 * @param {string} message
 * @returns {boolean}
 */
const isHighRisk = (message) => {
    const riskKeywords = [
        'suicide', 'kill myself', 'end my life', 'hurt myself', 'die',
        'khudkushi', 'mrun' // Urdu/Kashmiri
    ];
    const lowerMsg = message.toLowerCase();
    return riskKeywords.some(keyword => lowerMsg.includes(keyword));
};

/**
 * Classify User Intent
 * @param {string} message 
 * @returns {string} Intent key
 */
const classifyIntent = (message) => {
    if (isHighRisk(message)) return 'emergency';

    let maxScore = 0;
    let detectedIntent = 'default';

    tfidf.tfidfs(message, function (i, measure) {
        if (measure > maxScore) {
            maxScore = measure;
            detectedIntent = intents[i];
        }
    });

    // If score is too low, fallback to default
    if (maxScore < 0.5) return 'default';
    return detectedIntent;
};

/**
 * Generate Bot Response
 * @param {string} message 
 * @param {string} lang 
 * @returns {string}
 */
const getBotResponse = (message, lang = 'en') => {
    const intent = classifyIntent(message);
    const langResponses = responses[lang] || responses['en'];
    return langResponses[intent] || langResponses['default'];
};

/**
 * Analyze Sentiment
 * @param {string} message 
 * @returns {string} Positive/Negative/Neutral
 */
const analyzeSentiment = (message) => {
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");
    const score = analyzer.getSentiment(tokenizer.tokenize(message));

    if (score > 0.2) return 'Positive';
    if (score < -0.2) return 'Negative';
    return 'Neutral';
};

export { getBotResponse, analyzeSentiment, classifyIntent };
