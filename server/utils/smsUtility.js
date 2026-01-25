/**
 * Send SMS using a provider (Placeholder)
 * Use local SMS links for fallback in the SOS strategy.
 */
const sendSMS = async (to, message) => {
    console.log(`[SMS-STUB] Sending to ${to}: ${message}`);
    // In production, integrate with Twilio / Fast2SMS / Msg91
    // e.g., await api.send({ to, message });
    return true;
};

/**
 * Generate SOS Link for Client
 * @param {string} phone - Emergency Number
 * @param {string} message - Body text
 */
const generateSOSLink = (phone, message) => {
    return `sms:${phone}?body=${encodeURIComponent(message)}`;
};

export { sendSMS, generateSOSLink };
