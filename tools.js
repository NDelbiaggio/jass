module.exports.getRndInteger = function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};