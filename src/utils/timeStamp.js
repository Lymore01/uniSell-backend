function parseDate(val){
    return (val<10)?"0"+val:val;
}

export const timeStamp = () =>{
    const dateString  = new Date().toLocaleString("en-us", {timeZone: "Africa/Nairobi"})
    const dateObject = new Date(dateString);
    const month  = parseDate(dateObject.getMonth() + 1);
    const day  = parseDate(dateObject.getDate());
    const hour = parseDate(dateObject.getHours());
    const minute = parseDate(dateObject.getMinutes());
    const second = parseDate(dateObject.getSeconds());
    return dateObject.getFullYear() + "" + month + "" + day + "" +
        hour + "" + minute + "" + second;
}

// we will use this time stamp utility to generate unique password every time a user initiates an stkpush.