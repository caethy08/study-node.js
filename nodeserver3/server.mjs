import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import pool from './db.mjs';

const __filename = fileURLToPath(import.meta.url); //import.meta.url : 현재 파일의 경로
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send('요청을 시작 /sangdata, /sangdata/2')
});

// read all 
app.get("/sangdata/:code", async (req, res) => {
  const {code} = req.params;
    try {
      // MariadDB 커넥션 풀에서 DB 와 연결하는 비동기 함수
      const conn = await pool.getConnection();

      const rows = await conn.query("SELECT * FROM sangdata where code=?", [code]);
      conn.release(); // 연결 해제

      if(rows.length === 0){
        return res.status(404).json({error: '그런 자료는 없어요'});
      }
      console.log(rows);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //insert(create)
app.post("/sangdata", async (req, res) => {
  const {code} = req.params;
  const {sang, su, dan} = req.body;
    try {
      // MariadDB 커넥션 풀에서 DB 와 연결하는 비동기 함수
      const conn = await pool.getConnection();

      const rows = await conn.query("update sangdata set sang=?, su=?, dan=? where code=?)", [sang, su, dan, code]);
      conn.release(); // 연결 해제

      if(rows.affectedRows === 0){
        res.status(404).json({ error: '수정 대상 자료가 없어요'});
      }
      res.json({code, sang, su, dan});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


    //update
app.post("/sangdata/:code", async (req, res) => {
  const {code, sang, su, dan} = req.body;
    try {
      // MariadDB 커넥션 풀에서 DB 와 연결하는 비동기 함수
      const conn = await pool.getConnection();

      const rows = await conn.query("insert into sangdata values(?,?,?,?)", [code, sang, su, dan]);
      conn.release(); // 연결 해제

      res.status(201).json({code, sang, su, dan});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

    //delete
app.delete("/sangdata/:code", async (req, res) => {
  const {code} = req.params;
    try {
      // MariadDB 커넥션 풀에서 DB 와 연결하는 비동기 함수
      const conn = await pool.getConnection();

      const rows = await conn.query("delete from sangdata where code=?", [code]);
      conn.release(); // 연결 해제

      if(rows.affectedRows===0){
        res.status(404).json({error:'삭제 대상 자료가 없어요'})
      }
      res.json({message:'delete success'});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 서버 서비스 시작중");
});