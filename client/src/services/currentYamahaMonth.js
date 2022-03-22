export const findYamahaMonth = (AmericanFormatDate = new Date()) => {
    const yamahaMonths = [`Dec/Jan`, `Jan/Feb`, `Feb/Mar`, `Mar/Apr`, `Apr/May`, `May/Jun`, `Jun/Jul`, `Jul/Aug`, `Aug/Sep`, `Sep/Oct`, `Oct/Nov`, `Nov/Dec`];
    const today = new Date(AmericanFormatDate);
    const todayDayNum = today.getDate();
    const todayMonthNum = today.getMonth();

    if (todayDayNum <= 13) {
        return yamahaMonths[todayMonthNum];
    } else {
        return yamahaMonths[todayMonthNum + 1];
    }

};

export const generateDates = () => {
    const monthsArr = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

    const currentYamMonth = findYamahaMonth(new Date());
    const [month1, month2] = currentYamMonth.split('/');
    const month1AsNum = monthsArr.findIndex(item => item === month1);
    const month2AsNum = monthsArr.findIndex(item => item === month2);

    const startOfYamahaMonth = new Date(
        new Date(
            new Date()
            .setMonth(month1AsNum)
        ).setDate(13)
    );

    const endOfYamahaMonth = new Date(
        new Date(
            new Date()
            .setMonth(month2AsNum)
        ).setDate(13)
    );

    const numOfDaysInYamahaMonth = (endOfYamahaMonth - startOfYamahaMonth)/86400000;
    let arrayOfDaysInYamahaMonth = [];

    for(let i = 0; i < numOfDaysInYamahaMonth; i++) {
        const runningDate = startOfYamahaMonth;
        runningDate.setDate(startOfYamahaMonth.getDate() + 1);
        arrayOfDaysInYamahaMonth.push(new Date(runningDate));
    };

    
    return arrayOfDaysInYamahaMonth;
};

export const numOfWeekDayInYamahaMonth = () => {
    const arrOfDates = generateDates();
    const arrOfDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const arrOfWeekDays = arrOfDates.map(date => {
        return arrOfDays[new Date(date).getDay()];
    })
    return arrOfWeekDays;
};

