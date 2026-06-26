const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cropdb'
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ Connected to MySQL.');
});

function checkAuth(req, res, next) {
    if (!req.cookies.farmer_id) return res.redirect('/login.html');
    next();
}

// REGISTER route (manual if needed)
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.query(
        'INSERT INTO farmer (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (err) => {
            if (err) return res.send('❌ Registration failed.');
            res.redirect('/login.html');
        }
    );
});

// LOGIN + auto-register if user does not exist
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM farmer WHERE email = ?', [email], (err, results) => {
        if (err) return res.send('❌ Server error.');

        if (results.length > 0) {
            // Farmer exists
            if (results[0].password === password) {
                res.cookie('farmer_id', results[0].id);
                res.redirect('/index.html');
            } else {
                res.send('❌ Incorrect password.');
            }
        } else {
            // Auto-register the user
            const name = email.split('@')[0];
            db.query(
                'INSERT INTO farmer (name, email, password) VALUES (?, ?, ?)',
                [name, email, password],
                (err, result) => {
                    if (err) return res.send('❌ Failed to auto-register.');
                    res.cookie('farmer_id', result.insertId);
                    res.redirect('/index.html');
                }
            );
        }
    });
});

// LOGOUT
app.get('/logout', (req, res) => {
    res.clearCookie('farmer_id');
    res.redirect('/login.html');
});

// PREDICTION
app.post('/predict', checkAuth, (req, res) => {
    const { crop, soil_type, ph, rainfall, temperature, practice_type } = req.body;
    const farmer_id = req.cookies.farmer_id;

    const predicted_yield = (parseFloat(rainfall) * 0.5 + parseFloat(temperature) * 2 + parseFloat(ph) * 1.5).toFixed(2);

    const sql = `
        INSERT INTO prediction (farmer_id, crop_name, soil_type, ph, rainfall, temperature, practice_type, predicted_yield)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [farmer_id, crop, soil_type, ph, rainfall, temperature, practice_type, predicted_yield], (err) => {
        if (err) return res.send('❌ Prediction failed.');
        res.send("✅ Predicted yield for " + crop + " is " + predicted_yield + " tonnes per hectare.");
    });
});

// Start server
app.listen(3000, () => {
    console.log('🌾 Crop Yield Predictor running at http://localhost:3000');
});
