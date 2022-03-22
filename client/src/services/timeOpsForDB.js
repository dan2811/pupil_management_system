export const convertToDbTime = (timeAs24HrClockStringWithColon) => {
    const time = timeAs24HrClockStringWithColon;
    const [hours, minutes] = time.split(":");
    const hoursAsMinutesPastMidnight = parseInt(hours*60);

    return (hoursAsMinutesPastMidnight+parseInt(minutes));
};


export const convertDbTimeToLocal = (timeAsNumberOfMinutesPastMidnight) => {
    const number = timeAsNumberOfMinutesPastMidnight;
    const timeString = new Date(0,0,0, (number/60), (number%60)).toTimeString();
    const [hours, mins] = timeString.split(":");
    return (hours+":"+mins);
};
