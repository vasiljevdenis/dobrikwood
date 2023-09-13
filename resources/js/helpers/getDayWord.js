const getDayWord = (num) => {
    let word = 'день';
    if (num % 10 === 1 && num !== 11) {
        word = 'день';
    } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
        word = 'дня';
    } else {
        word = 'дней';
    }
    return word;
}
export default getDayWord;