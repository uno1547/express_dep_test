const express = require('express');
const cors = require('cors');
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

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
