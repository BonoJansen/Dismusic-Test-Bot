const getPlayerTimestamp = require('./getPlayerTimestamp')
async function createProgressBar (currentTrack, timecodes = true) {

    if(!currentTrack) return console.error('No valid currentTrack given "CreateProgressBar"')

    console.log(currentTrack)
    const length = 15;
    currentTrack.duration.milis = currentTrack.duration.raw * 1000
    const currentTimeArray = currentTrack.currentTime.split(":")

    let currentTime 
    if(currentTimeArray[2]){
        //het nummer duurt langer als een uur
        currentTime = Math.round(((currentTimeArray[0]*3600) + (currentTimeArray[1]*60) + (currentTimeArray[2]*1)) * 1000)

    } else { 
        //nummer duurt minder lang als een uur
        currentTime = Math.round(( (currentTimeArray[0] * 60) + (currentTimeArray[1] * 1) ) * 1000)
    }

    const index = Math.round((currentTime / (currentTrack.duration.milis)) * length);
    const indicator = "🔘";
    const line = "▬"

    if (index >= 1 && index <= length) {
        const bar = line.repeat(length - 1).split("");
        bar.splice(index, 0, indicator);
        if (timecodes) {
            const timestamp = await getPlayerTimestamp(queue);
            return `${timestamp.current} ┃ ${bar.join("")} ┃ ${timestamp.end}`;
        } else {
            return `${bar.join("")}`;
        }
    } else {
        if (timecodes) {
            const timestamp = await getPlayerTimestamp(queue);
            return `${timestamp.current} ┃ ${indicator}${line.repeat(length - 1)} ┃ ${timestamp.end}`;
        } else {
            return `${indicator}${line.repeat(length - 1)}`;
        }
    }
}
module.exports = createProgressBar