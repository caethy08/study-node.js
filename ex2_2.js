const {odd, even} = require('./ex2_1');

function checkEvent(num){
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = checkEvent;