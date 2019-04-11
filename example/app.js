const math = require('./math');

const doAdd = (a, b) => math.add(a, b);
const doSubtract = (a, b) => math.subtract(a, b);
const doMultiply = (a, b) => math.multiply(a, b);
const doDivide = (a, b) => math.divide(a, b);


module.exports = {
    doAdd,
    doSubtract,
    doMultiply,
    doDivide
};