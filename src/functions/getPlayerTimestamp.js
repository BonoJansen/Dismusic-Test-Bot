//a function needed to make the nowplaying command embed
const parseMS = require('./parseMS')
const buildTimeCode = require('./BuildTimeCode')

async function getPlayerTimestamp (currentTrack) {

    if(!currentTrack) return console.error('No valid currentTrack given "getPlayerTimestamp"')

    const currentTimeArray = currentTrack.currentTime.split(":")

        let currentTimeSeconds
        if(currentTimeArray[2]){
            //het nummer duurt langer als een uur
            currentTimeSeconds = Math.round((currentTimeArray[0]*3600) + (currentTimeArray[1]*60) + (currentTimeArray[2]*1))
    
        } else { 
            //nummer duurt minder lang als een uur
            currentTimeSeconds = Math.round((currentTimeArray[0] * 60) + (currentTimeArray[1] * 1))
        }
    const currentStreamTimeMS =  currentTimeSeconds * 1000;
    const totalTime =  currentTrack.duration.raw * 1000;

    const currentTimecode = buildTimeCode(parseMS(currentStreamTimeMS));
    const endTimecode = buildTimeCode(parseMS(totalTime));

    return {
        current: currentTimecode,
        end: endTimecode,
        progress: Math.round((currentStreamTimeMS / totalTime) * 100)
    };
}
module.exports = getPlayerTimestamp