const formValidator = (order) => {
    let isValid = true;
    if (!order.name) {
        isValid = false;
    }
    if (!order.lastName) {
        isValid = false;
    }
    if (!order.phone) {
        isValid = false;
    }
    if (!order.email || !order.email.includes('@') || !order.email.includes('.')) {
        isValid = false;
    }
    if (order.type === 'other') {
        if (!order.recipient.name) {
            isValid = false;
        }
        if (!order.recipient.lastName) {
            isValid = false;
        }
        if (!order.recipient.phone) {
            isValid = false;
        }
    }
    if (order.delivery) {
        if (!order.city) {
            isValid = false;
        }
        if (!order.street) {
            isValid = false;
        }
        if (!order.house) {
            isValid = false;
        }
    }
    return isValid;
}
export default formValidator;