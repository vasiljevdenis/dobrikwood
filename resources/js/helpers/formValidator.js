const formValidator = (order) => {
    let isValid = true;
    const errors = [];
    if (!order.name) {
        isValid = false;
        errors.push("Имя заказчика");
    }
    if (!order.lastName) {
        isValid = false;
        errors.push("Фамилия заказчика");
    }
    if (!order.phone || order.phone.replace(/[^\d+]/g, "").length !== 12) {
        isValid = false;
        errors.push("Телефон заказчика");
    }
    if (!order.email || !order.email.includes('@') || !order.email.includes('.')) {
        isValid = false;
        errors.push("Email заказчика");
    }
    if (order.type === 'other') {
        if (!order.recipient.name) {
            isValid = false;
            errors.push("Имя получателя");
        }
        if (!order.recipient.lastName) {
            isValid = false;
            errors.push("Фамилия получателя");
        }
        if (!order.recipient.phone || order.recipient.phone.replace(/[^\d+]/g, "").length !== 12) {
            isValid = false;
            errors.push("Телефон получателя");
        }
    }
    if (order.delivery) {
        if (!order.city) {
            isValid = false;
            errors.push("Город");
        }
        if (!order.street) {
            isValid = false;
            errors.push("Улица");
        }
        if (!order.house) {
            isValid = false;
            errors.push("Дом");
        }
    }
    return {
        status: isValid,
        errors: errors
    };
}
export default formValidator;