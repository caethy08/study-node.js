//예외 처리 : node에서 에러 처리는 매우 중요하다
//node는 한 개의 스레드만 사용할 수 있어서 소중히 다뤄야 한다.
//try ... catch 구문을 활용

import readline from 'readline';

const inout = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

const divide = (a, b) => {
    if(b === 0){
        throw new Error('0으로 나눌 수 없어요');
    }
    return a/b;
}

inout.question('첫번째 숫자 입력:', (num1) => {
    inout.question('두번째 숫자 입력:', (num2) => {
        try{
            const a = parseFloat(num1);
            const b = parseFloat(num2);

            if(isNaN(a) || isNaN(b)){
                throw new Error('슷자를 입력하세요');
            }
            const result = divide(a, b);
            console.log(`${a}를(을) ${b}로 나눈 결과는 ${result}`);
        }catch(error){
            console.error('오류 발생: ', error.message);
        }finally{
            inout.close();
        }
    })
})