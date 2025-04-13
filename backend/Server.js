const express = require('express');
const mysql = require('mysql2/promise'); // Use promise-based mysql2
const bodyParser = require('body-parser');
const cors = require('cors'); // Enable CORS
const nodemailer = require('nodemailer'); // For sending emails
const bcrypt = require('bcrypt'); // For password hashing
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const port = 5000;

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const secretKey = crypto.randomBytes(32).toString('hex'); 

app.use(session({
    secret: secretKey,  // Replace with a long, random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set `true` if using HTTPS
}));

app.post('/api/testQuestion', (req, res) => {
    res.json({message: "test"});
});



// MySQL Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'online_assessment',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.post('/api/addQuestion', (req, res) => {
    const { questionText, domain, type, option1, option2, option3, option4, correctAnswer } = req.body;
  
    // console.log("Values to be inserted: ", questionText, domain, type, option1, option2, option3, option4, correctAnswer);
  
    pool.query(
      'INSERT INTO questions (question_text, domain, type, option1, option2, option3, option4, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [questionText, domain, type, option1, option2, option3, option4, correctAnswer],
      (err, results) => {
        if (err) {
          console.error('MySQL error:', err);
        //   console.log("MySQL Error:", err); // Added error log
          return res.status(500).json({ error: err.message });
        }
  
        // console.log("MySQL query executed");
        // console.log("MySQL Results: ", results);
  
        res.json({ message: 'Question added successfully', id: results.insertId });
        // console.log("Backend response sent");
      }
    );
  });

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: 'arockiam1406@gmail.com',
        pass: 'wcjf ftid bjmb tzae',
    },
});

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, mobile, course, password } = req.body;
    let conn;

    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();

        const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            await conn.rollback();
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await conn.execute('INSERT INTO users (name, email, mobile, course, password) VALUES (?, ?, ?, ?, ?)',
            [name, email, mobile, course, hashedPassword]
        );
        await conn.commit();

        const mailOptions = {
            from: 'Admin <arockiam1406@gmail.com>',
            to: email,
            subject: 'Registration Confirmation',
            text: 'Thank you for registering!',
        };
        transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        if (conn) await conn.rollback();
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    } finally {
        if (conn) conn.release();
    }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
        
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.json({ message: 'Login successful', name: user.name, userId: user.id });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Fetch Questions Endpoint
app.get('/api/questions/:domain/:userId', async (req, res) => {
    const { domain } = req.params;
    // console.log('Fetching questions...');
    const domainDecoded = decodeURIComponent(domain); 
    // console.log(`Domain: ${domainDecoded}`);

    try {
        const [questions] = await pool.execute(
            `SELECT * FROM questions WHERE domain = ? ORDER BY RAND()`,
            [domainDecoded]
        );

        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Database error' });
    }
});


// Submit Responses Endpoint
// app.post('/api/submit-responses', async (req, res) => {
//     const { userId, responses } = req.body;
//     try {
//         for (const response of responses) {
//             const { question_id, answer, correct } = response;
//             const marks = correct ? 1 : 0;
//             await pool.execute(
//                 `INSERT INTO responses (user_id, question_id, answer, correct, marks) VALUES (?, ?, ?, ?, ?)`,
//                 [userId, question_id, answer || 'Unanswered', correct, marks]
//             );
//         }
//         res.json({ message: 'Assessment submitted successfully' });
//     } catch (error) {
//         console.error('Error submitting responses:', error);
//         res.status(500).json({ error: 'Failed to submit responses' });
//     }
// });

app.post('/api/submit-responses', async (req, res) => {
    const { userId, domain, responses } = req.body;
    const domainDecoded = decodeURIComponent(domain);
    // console.log(domainDecoded)
    try {
        for (const response of responses) {
            const { question_id, answer } = response;

            // Fetch the correct answer from the database
            const [rows] = await pool.execute(
                "SELECT correct_answer FROM questions WHERE id = ?",
                [question_id]
            );

            if (rows.length === 0) {
                console.error(`Question ID ${question_id} not found.`);
                continue; // Skip this response if question not found
            }

            const correctAnswer = rows[0].correct_answer;
            const isCorrect = answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
            const marks = isCorrect ? 1 : 0; // 1 mark for correct, 0 otherwise

            // Save response in database
            await pool.execute(
                `INSERT INTO responses (user_id, question_id, answer, correct, marks, timestamp, domain) 
                 VALUES (?, ?, ?, ?, ?, NOW(),?)`, 
                [userId, question_id, answer || 'Unanswered', isCorrect, marks,domainDecoded]
            );
        }

        res.json({ message: "Assessment submitted successfully" });
    } catch (error) {
        console.error("Error submitting responses:", error);
        res.status(500).json({ error: "Failed to submit responses" });
    }
});


app.get('/api/check-attempt/:userId/:domain', async (req, res) => {
    const { userId, domain } = req.params;
    const domainDecoded = decodeURIComponent(domain);
    // console.log('Attempt Checking');
    // console.log('Userid: ',userId);
    // console.log('Domain: ',domainDecoded);
    
    try {
        const [checkAttempt] = await pool.execute(
            `SELECT COUNT(*) as attempt_count FROM responses 
             WHERE user_id = ? AND domain = ? AND DATE(timestamp) = CURDATE()`, 
            [userId, domainDecoded]
        );

        if (checkAttempt[0].attempt_count > 0) {
            res.json({ attempted: true });
        } else {
            res.json({ attempted: false });
        }
    } catch (error) {
        console.error("Error checking assessment attempt:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// New Endpoint: Fetch User Assessment Score
app.get('/api/user-score/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [scoreData] = await pool.execute(
            `SELECT SUM(marks) as total_score FROM responses WHERE user_id = ? AND DATE(timestamp) = CURDATE()`,
            [userId]
        );
        res.json({ userId, score: scoreData[0].total_score || 0 });
    } catch (error) {
        console.error('Error fetching user score:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// **Admin Registration Endpoint**
app.post('/api/admin/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if admin already exists
        const [existingAdmin] = await pool.execute("SELECT * FROM admin WHERE email = ?", [email]);
        if (existingAdmin.length > 0) {
            return res.status(400).json({ success: false, message: "Admin already exists." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin
        await pool.execute("INSERT INTO admin (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        res.status(201).json({ success: true, message: "Admin registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
});


// **2. Admin Login**
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // console.log("Login attempt:", email); // Log email

        const [rows] = await pool.execute("SELECT * FROM admin WHERE email = ?", [email]);

        if (rows.length === 0) {
            // console.log("No user found");
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const admin = rows[0];
        // console.log("Admin found:", admin);

        // Check if password exists
        if (!admin.password) {
            // console.log("Password is missing in DB record");
            return res.status(500).json({ success: false, message: "Server error. Try again later." });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            // console.log("Password does not match");
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        if (!req.session) {
            console.error("Session is undefined!");
            return res.status(500).json({ success: false, message: "Session error. Try again." });
        }

        // Store admin ID in session
        req.session.adminId = admin.id;
        req.session.adminName = admin.name;

        res.json({ success: true, message: "Login successful" });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ success: false, message: "Error logging in. Please try again." });
    }
});

app.get("/api/domains", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT DISTINCT domain FROM responses");
      const domains = rows.map((row) => row.domain);
      res.json(domains);
    } catch (err) {
      console.error("Error fetching domains:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/results", async (req, res) => {
    const { domain, date } = req.query;
  
    try {
      let query = `
        SELECT u.name AS user_name, SUM(r.marks) AS total_score
        FROM responses r
        JOIN users u ON r.user_id = u.id
      `;
      const params = [];
  
      if (domain && date) {
        query += " WHERE r.domain = ? AND DATE(r.timestamp) = ?";
        params.push(domain, date);
      } else if (domain) {
        query += " WHERE r.domain = ?";
        params.push(domain);
      } else if (date) {
        query += " WHERE DATE(r.timestamp) = ?";
        params.push(date);
      }
  
      query += " GROUP BY r.user_id";
  
      const [rows] = await pool.query(query, params);
      res.json(rows);
    } catch (err) {
      console.error("Error fetching results:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT id, name, email, mobile, course FROM users");
      res.json(rows);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: err.message });
    }
  });


  app.post('/api/logout', (req, res) => {
    console.log('Logout endpoint reached')
    // Example using express-session:
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      console.log('successful')
      res.status(200).json({ message: 'Logout successful' });
    });
  
    // Example using JWT:
    // (You might invalidate the token on the client-side or use a blacklist on the server)
    // res.clearCookie('jwt'); // Clear the JWT cookie
    // res.status(200).json({ message: 'Logout successful' });
  });

  module.exports = router;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
