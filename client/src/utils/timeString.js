const timeString = (time) => {
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const timer = new Date(time);

    const now = new Date();

    const day = timer.getDate();
    const month = timer.getMonth();
    const year = timer.getFullYear();

    if( (day - now.getDate()) || (month - now.getMonth()) || (year - now.getFullYear) ) {
        return `${monthArr[month]} ${day}`;
    }
    
    return 'Today';
}

export default  timeString;