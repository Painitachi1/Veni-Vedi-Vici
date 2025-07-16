const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory database for demo purposes
const users = {}; // Format: { username: { password: "..." } }

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // to parse JSON body

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }
  if (users[username]) {
    return res.status(409).json({ message: "User already exists." });
  }
  users[username] = { password };
  res.json({ message: "Signup successful!" });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }
  if (!users[username] || users[username].password !== password) {
    return res.status(401).json({ message: "Invalid username or password." });
  }
  res.json({ message: "Login successful!" });
});

// Serve Error page for 404s
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'Errorpage.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});