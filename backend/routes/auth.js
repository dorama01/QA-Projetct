const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === '1234') {
    res.status(200).json({ token: 'mock-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
