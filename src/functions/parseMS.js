//a function needed by the progressbar creater
function parseMS(milliseconds) {

    if (isNaN(milliseconds)) milliseconds = 0;
    const round = milliseconds > 0 ? Math.floor : Math.ceil;

    return {
        days: round(milliseconds / 86400000),
        hours: round(milliseconds / 3600000) % 24,
        minutes: round(milliseconds / 60000) % 60,
        seconds: round(milliseconds / 1000) % 60
    }
}
module.exports = parseMS