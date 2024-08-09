//http 모듈을 이용해 웹 서버 구축 가능
import http from 'http';  //웹 관련 모듈

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write('<h1>노드 서버에 오신 것을 환영</h1>');
    res.write('반가워요');
    res.end('<p>Hello</p>');  //응답 종료
    //res.write('방가방가');  
})
.listen(8080, () => {
    console.log('서버 서비스중')
})