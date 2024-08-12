import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';

import gogekRouter from './routes/gogek.mjs';
import jikwonRouter from './routes/jikwon.mjs';

const app = express();

app.use(cors()) //cors 미들웨어 등록
app.use(express.json()); // express.json 미들웨어 등록 json 파싱용
//예: 클라이언트가 json데이터를 요청(post)으로 보낼 때
//{"name":"tom","age":30} 얘를 자동으로 파싱해 requestAnimationFrame.body객체를 만듦
//req.body.name 또는 req.body.age로 접근이 가능해짐

app.set('port', process.env.PORT || 3000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//정적 파일 제동 폴더 정의
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.send('good');
// });

app.use('/', jikwonRouter);
app.use('/gogek', gogekRouter);


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트로 서버 서비스 중...');
});