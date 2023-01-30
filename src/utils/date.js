const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const daysFullName = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    const strTime = hours + ":" + minutes + " " + ampm;

    return strTime;
};

export const formatDate = (stringDate) => {
    const date = new Date(stringDate);

    const month = months[date.getMonth()];

    const day = date.getDate();

    const year = date.getFullYear();

    const dayName = days[date.getDay()];

    const time = formatTime(date);

    return `${month} ${day}, ${year} ${dayName} • ${time}`;
};
