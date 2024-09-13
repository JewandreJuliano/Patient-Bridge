const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // to handle JSON request bodies

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',     // your MySQL host, usually 'localhost'
  user: 'root',          // your MySQL username
  password: 'Witbooi7!',  // your MySQL password
  database: 'patient_bridge',  // the database you're connecting to
  port: 3306             // default MySQL port
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define a route to add a new patient
app.post('/api/register', async (req, res) => {
    const { fullName, email, password, phoneNumber } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Define the SQL query with the correct column names
        const query = 'INSERT INTO patients (full_name, email, password, phone_number, created_at) VALUES (?, ?, ?, ?, NOW())';

        // Execute the query
        connection.query(query, [fullName, email, hashedPassword, phoneNumber], (err, results) => {
            if (err) {
                console.error('Database query error:', err); // Log the error
                return res.status(500).json({ error: 'Error saving user to the database' });
            }
            console.log('Query results:', results); // Log the results
            res.status(201).json({ message: 'User registered successfully!' });
        });
    } catch (error) {
        console.error('Error processing registration:', error); // Log the error
        res.status(500).json({ error: 'Error processing registration' });
    }
});
// Define a route to fetch patients
app.get('/api/patients', (req, res) => {
    // SQL query to select all patients from the `patients` table
    const query = 'SELECT * FROM patients';

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching patients:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);  // Send the retrieved data as JSON
    });
});

  
// Start the server on port 5432
app.listen(5432, () => {
  console.log('Server is running on port 5432');
});
