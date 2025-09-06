const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = 3000;

// CORS 설정 - 모든 오리진 허용
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// 초간단 API
app.get('/api/hello', (req, res) => {
  console.log('✅ /api/hello endpoint was called');
  res.json({ message: 'Hello from API!' });
});

// DB연결 API
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 테이블 생성 API
app.get('/api/create-table', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        student_id VARCHAR(20) UNIQUE NOT NULL
      )
    `);
    res.send('users 테이블 생성 완료');
  } catch (err) {
    console.error(err);
    res.status(500).send('테이블 생성 실패');
  }
});

// 학생 데이터 삽입 API
app.get('/api/insert-users', async (req, res) => {
  try {
    const users = [
      ['김윤오', '20204161'],
      ['이동환', '20204170'],
      ['유제영', '20204169']
    ];

    for (const [name, student_id] of users) {
      await pool.query(
        'INSERT INTO users (name, student_id) VALUES ($1, $2) ON CONFLICT (student_id) DO NOTHING',
        [name, student_id]
      );
    }

    res.send('학생 데이터 삽입 완료');
  } catch (err) {
    console.error(err);
    res.status(500).send('데이터 삽입 실패');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('조회 실패');
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log('이건 로컬에서 express 서버가 잘 실행되고 있다는 뜻입니다.');
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
