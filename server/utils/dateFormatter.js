/**
 * Format a date object to Indian Standard Time (IST)
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string in IST
 */
const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
};

/**
 * Get current time in IST
 * @returns {Date} - Current time adjusted for IST
 */
const nowIST = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 5.5)); // +5.5 hours
};

export { formatDateIST, nowIST };
