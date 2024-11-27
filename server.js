import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { client } from './db.js'; // Import the client from db.js

const app = express(); // Initialize Express app
const PORT = 5000;

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

        await client.query(query, values);

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

        const result = await client.query(query, values);

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

// GET route to fetch country by ID
app.get('/api/countries', async (req, res) => {
    try {
        // Query to fetch country_name for country_id = 133 (Malaysia)
        const query = 'SELECT country_id, country_name FROM tbl_country WHERE country_id = $1';
        const values = [133]; // Malaysia

        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Return the country data as JSON
        } else {
            res.status(404).json({ message: 'Country not found' });
        }
    } catch (error) {
        console.error('Error fetching country data:', error);
        res.status(500).json({ error: 'An error occurred while fetching country data' });
    }
});

// Handle server shutdown gracefully
process.on('SIGINT', async () => {
    try {
        await client.end(); // Close database connection
        console.log('Database connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
