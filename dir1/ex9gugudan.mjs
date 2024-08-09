//키보드로 단을 받아 구구단 출력
import { EventEmitter } from "events";
import readline from 'readline';

const myEvent = new EventEmitter();

const inout = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

const printGugudan = (dan) => {
    console.log(`\n구구단 ${dan} 출력 :`)
    for (let index = 1; index <=9; index++){
        console.log(`${dan} x ${index} = ${dan*index}`);
    }
};

myEvent.on('gugudan', (dan) => {
    printGugudan(dan);
    inout.close();
})

//question(query, callback)
inout.question('출력할 단 입력: ', (input) => {
    const dan = parseInt(input, 10);
    if(!isNaN(dan)){
        myEvent.emit('gugudan', dan);
    }else{
        console.log('단은 숫자로 입력!');
        inout.close();
    }
});