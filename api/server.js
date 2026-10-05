const express = require('express');
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

const sessions = new Map();

function readDatabase() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function createToken() {
  return crypto.randomBytes(32).toString('hex');
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.substring(7);
}

function authenticate(req, res, next) {
  const token = getTokenFromRequest(req);

  if (!token || !sessions.has(token)) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  req.userId = sessions.get(token);

  next();
}


// GET /
app.get('/', (req, res) => {
  res.json({
    message: 'Student Service Portal API',
    status: 'running'
  });
});


// POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  const db = readDatabase();

  const user = db.users.find(
    item =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password.'
    });
  }

  const token = createToken();

  sessions.set(token, user.id);

  res.json({
    access_token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});


// GET /students
app.get('/students', authenticate, (req, res) => {
  const db = readDatabase();

  res.json({
    students: db.students
  });
});


// GET /students/:id
app.get('/students/:id', authenticate, (req, res) => {
  const db = readDatabase();

  const studentId = Number(req.params.id);

  const student = db.students.find(
    item => item.id === studentId
  );

  if (!student) {
    return res.status(404).json({
      message: 'Student not found.'
    });
  }

  res.json({
    student
  });
});


// GET /profile
app.get('/profile', authenticate, (req, res) => {
  const db = readDatabase();

  const user = db.users.find(
    item => item.id === req.userId
  );

  if (!user) {
    return res.status(404).json({
      message: 'User profile not found.'
    });
  }

  const student = db.students.find(
    item => item.email === user.email
  );

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      course: student?.course ?? null,
      year: student?.year ?? null,
      section: student?.section ?? null
    }
  });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Student Service API running on http://localhost:${PORT}`);
});