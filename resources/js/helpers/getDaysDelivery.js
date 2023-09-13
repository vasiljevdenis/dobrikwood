import getDayWord from "./getDayWord";

const getDaysDelivery = (arr) => {
    let row = '';
    if (arr.length === 1) {
        row = '(' + arr[0] + ' ' + getDayWord(arr[0]) + ')';
    } else if (arr.length === 2) {
        row = '(' + arr[0] + '-' + arr[1] + ' ' + getDayWord(arr[1]) + ')';
    }
    return row;
}
export default getDaysDelivery;