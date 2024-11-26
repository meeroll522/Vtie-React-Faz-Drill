import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;

const app = express(); // Initialize Express app
const PORT = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fazdrill',
    password: 'ftsb@123',
    port: 5432,
});

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// POST route to create a user
app.post('/api/create-user', async (req, res) => {
    const { full_name, email, password, role, status, role_id, company_id } = req.body;

    try {
        const query = `
            INSERT INTO tbl_user (full_name, email, password, role, status, role_id, company_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [full_name, email, password, role, status, role_id, company_id];

        await pool.query(query, values);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

// POST route for login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = `
            SELECT * FROM tbl_user 
            WHERE email = $1 AND password = $2
        `;
        const values = [email, password];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Login successful', user: result.rows[0] });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
