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

// 데이터 반환 API
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log('이건 로컬에서 express 서버가 잘 실행되고 있다는 뜻입니다.');
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
