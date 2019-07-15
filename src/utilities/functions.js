export const setDefaultPropertyValues = object => {
    for (let property in object) {
        if (object[property] === null) {
            let value;
            switch (property) {
                case 'slot':
                    value = 0;
                    break;
                case 'city':
                    value = 'None';
                    break;
                case 'velocity':
                    value = '0.00';
                    break;
                default:
                    break;
            }
            object[property] = value;
        }
    }
    return object;
}