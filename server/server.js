const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'patient_bridge_helper';
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
app.post('/api/patient-register', async (req, res) => {
    const { fullName, email, password, phoneNumber } = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Define the SQL query with the correct column names
        const query = 'INSERT INTO patients (fullName, email, password, phoneNumber, created_at) VALUES (?, ?, ?, ?, NOW())';

        // Execute the query
        connection.query(query, [fullName, email, hashedPassword, phoneNumber], (err, results) => {
            if (err) {
                console.error('Database query error:', err); // Log the error
                return res.status(500).json({ error: 'Error saving patient to the database' });
            }
            console.log('Query results:', results); // Log the results
            res.status(201).json({ message: 'Patient registered successfully!' });
        });
    } catch (error) {
        console.error('Error processing registration:', error); // Log the error
        res.status(500).json({ error: 'Error processing registration' });
    }
});

// Define a route to add a new doctor
app.post('/api/doctor-register', async (req, res) => {
    const { practiceName, practiceAddress, suburb, city, email, password, phoneNumber, specialty } = req.body; // Include suburb and city

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Define the SQL query with the correct column names
        const query = `
            INSERT INTO doctors 
            (practiceName, practiceAddress, suburb, city, email, password, phoneNumber, specialty, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

        // Execute the query with the updated values
        connection.query(query, [practiceName, practiceAddress, suburb, city, email, hashedPassword, phoneNumber, specialty], (err, results) => {
            if (err) {
                console.error('Database query error:', err); // Log the error
                return res.status(500).json({ error: 'Error saving doctor to the database' });
            }
            console.log('Query results:', results); // Log the results
            res.status(201).json({ message: 'Doctor registered successfully!' });
        });
    } catch (error) {
        console.error('Error processing registration:', error); // Log the error
        res.status(500).json({ error: 'Error processing registration' });
    }
});


// Define a route to handle login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Query to check if the user exists in the patients table
    const patientQuery = 'SELECT * FROM patients WHERE email = ?';
    connection.query(patientQuery, [email], async (err, patientResults) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Check if user is a patient
        if (patientResults.length > 0) {
            const patient = patientResults[0];
            const isMatch = await bcrypt.compare(password, patient.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate a token for the patient
            const token = jwt.sign({ id: patient.patient_id, role: patient.role }, secretKey, {
                expiresIn: '30m' // Token expiration time
            });

            // Successfully logged in as a patient
            return res.status(200).json({ 
                message: 'Login successful', 
                userType: 'patient', 
                user: patient,
                token // Include the token in the response
            });
        }

        // If not a patient, check if the user exists in the doctors table
        const doctorQuery = 'SELECT * FROM doctors WHERE email = ?';
        connection.query(doctorQuery, [email], async (err, doctorResults) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            // Check if user is a doctor
            if (doctorResults.length > 0) {
                const doctor = doctorResults[0];
                const isMatch = await bcrypt.compare(password, doctor.password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                // Generate a token for the doctor
                const token = jwt.sign({ id: doctor.doctor_id, role: doctor.role }, secretKey, {
                    expiresIn: '30m' // Token expiration time
                });

                // Successfully logged in as a doctor
                return res.status(200).json({ 
                    message: 'Login successful', 
                    userType: 'doctor', 
                    user: doctor,
                    token // Include the token in the response
                });
            }

            // User not found in both tables
            return res.status(401).json({ error: 'Invalid email or password' });
        });
    });
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


// Define a route to fetch doctors based on specialty
app.get('/api/doctors', (req, res) => {
    const specialty = req.query.specialty?.toLowerCase(); // Get specialty from query

    // SQL query to select doctors from the `doctors` table
    let query = 'SELECT * FROM doctors';
    const queryParams = [];

    // Filter by specialty if provided
    if (specialty) {
        query += ' WHERE LOWER(specialty) LIKE ?';
        queryParams.push(`%${specialty}%`);
    }

    // Execute the query
    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            return res.status(500).json({ error: 'Error fetching doctors' });
        }
        res.json(results); // Send the retrieved data as JSON
    });
});

// Define a route to create a new appointment
app.post('/api/book-appointment', (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

    // Define the SQL query to insert the appointment
    const query = `
        INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) 
        VALUES (?, ?, ?, ?)
    `;

    // Execute the query
    connection.query(query, [patient_id, doctor_id, appointment_date, appointment_time], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Error saving appointment to the database' });
        }
        res.status(201).json({ message: 'Appointment booked successfully!', appointmentId: results.insertId });
    });
});


// Start the server on port 5432
app.listen(5432, () => {
  console.log('Server is running on port 5432');
});
