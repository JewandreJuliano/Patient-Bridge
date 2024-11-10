const express = require('express');
const mysql = require('mysql2');
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
  host: '127.0.0.1',     // your MySQL host, usually 'localhost'
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

    // Define the SQL query
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
  const { practiceName, practiceAddress, suburb, city, email, password, phoneNumber, specialty } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Define the SQL query
    const query = `
        INSERT INTO doctors 
        (practiceName, practiceAddress, suburb, city, email, password, phoneNumber, specialty, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    // Execute the query
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



// API endpoint to save emergency contact
// API endpoint to save emergency contact
app.post('/api/emergency-contacts', (req, res) => {
  const { patient_id, contact_name, relationship, phone_number, email } = req.body;

  // Input validation
  if (!patient_id || !contact_name || !relationship || !phone_number || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Prepare SQL query to insert emergency contact
  const sql = 'INSERT INTO emergency_contacts (patient_id, contact_name, relationship, phone_number, email) VALUES (?, ?, ?, ?, ?)';
  const values = [patient_id, contact_name, relationship, phone_number, email];

  // Use 'connection' instead of 'db' if that’s what you’re defining
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error saving emergency contact:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Emergency contact saved successfully', contactId: results.insertId });
  });
});

// Forgot-password

app.put('/api/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Query to check if the email exists in the patients table
    const patientQuery = 'SELECT patient_id FROM patients WHERE email = ?';
    const doctorQuery = 'SELECT doctor_id FROM doctors WHERE email = ?';
    
    // First, check if email exists in the patients table
    connection.query(patientQuery, [email], (err, patientResult) => {
        if (err) {
            console.error('Error querying patients table:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (patientResult.length > 0) {
            // Email found in patients table, update password
            const updatePatientPassword = 'UPDATE patients SET password = ? WHERE email = ?';
            connection.query(updatePatientPassword, [hashedPassword, email], (err, result) => {
                if (err) {
                    console.error('Error updating patient password:', err);
                    return res.status(500).json({ error: 'Database error' });
                }
                return res.status(200).json({ message: 'Your password has been successfully reset!' });
            });
        } else {
            // Check if email exists in the doctors table
            connection.query(doctorQuery, [email], (err, doctorResult) => {
                if (err) {
                    console.error('Error querying doctors table:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (doctorResult.length > 0) {
                    // Email found in doctors table, update password
                    const updateDoctorPassword = 'UPDATE doctors SET password = ? WHERE email = ?';
                    connection.query(updateDoctorPassword, [hashedPassword, email], (err, result) => {
                        if (err) {
                            console.error('Error updating doctor password:', err);
                            return res.status(500).json({ error: 'Database error' });
                        }
                        return res.status(200).json({ message: 'Your password has been successfully reset!' });
                    });
                } else {
                    // Email not found in either table
                    return res.status(404).json({ message: 'Email not found' });
                }
            });
        }
    });
});

// Update patient profile
app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, phoneNumber } = req.body;

  let sql = 'UPDATE patients SET fullName = ?, email = ?, phoneNumber = ?';
  const values = [fullName, email, phoneNumber];

  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    sql += ', password = ?';
    values.push(hashedPassword);
  }

  sql += ' WHERE patient_id = ?';
  values.push(id);

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating patient profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

// Define a route to update a doctor's profile
app.put('/api/update-doctor-profile', async (req, res) => {
  const { practiceName, practiceAddress, suburb, city, email, password, phoneNumber, specialty, doctor_id } = req.body;

  // Hash the password if it is provided
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  // Build the query dynamically based on whether the password is being updated
  const query = `
      UPDATE doctors 
      SET 
        practiceName = ?, 
        practiceAddress = ?, 
        suburb = ?, 
        city = ?, 
        email = ?, 
        phoneNumber = ?, 
        specialty = ?
        ${hashedPassword ? ', password = ?' : ''}
      WHERE doctor_id = ?
  `;

  // Build the values array conditionally
  const values = [practiceName, practiceAddress, suburb, city, email, phoneNumber, specialty];
  if (hashedPassword) values.push(hashedPassword);
  values.push(doctor_id);

  // Execute the query
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating doctor profile:', err);
      return res.status(500).json({ error: 'Error updating doctor profile' });
    }
    res.status(200).json({ message: 'Profile updated successfully!' });
  });
});



// Assuming `connection` is your MySQL connection object
app.post('/api/add-medications', (req, res) => {
  const { patient_id, name, dosage, time } = req.body;

  console.log('Received data:', req.body); // Log the incoming data

  const query = 'INSERT INTO medications (patient_id, name, dosage, time) VALUES (?, ?, ?, ?)';
  connection.query(query, [patient_id, name, dosage, time], (err, result) => {
    if (err) {
      console.error('Error inserting medication:', err); // Log the error
      return res.status(500).send('Error adding medication'); // Simplified error message for client
    }
    res.status(201).send({ medicationId: result.insertId, name, dosage, time });
  });
});

app.put('/api/medications/:id', (req, res) => {
  const { name, dosage, time } = req.body;
  const { id } = req.params;
  const query = 'UPDATE medications SET name = ?, dosage = ?, time = ? WHERE medication_id = ?';
  connection.query(query, [name, dosage, time, id], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ id, name, dosage, time });
  });
});


app.get('/api/medications/:patient_id', (req, res) => {
  const { patient_id } = req.params;
  const query = 'SELECT medication_id, name, dosage, time FROM medications WHERE patient_id = ?';
  connection.query(query, [patient_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching medications' });
    res.json(results); // Make sure each result includes medication_id
  });
});

app.delete('/api/medications/delete/:medication_id', (req, res) => {
  const { medication_id } = req.params;
  const query = 'DELETE FROM medications WHERE medication_id = ?';

  connection.query(query, [medication_id], (err, results) => {
    if (err) {
      console.error('Error deleting medication:', err);
      return res.status(500).json({ error: 'Error deleting medication' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.json({ message: 'Medication deleted successfully' });
  });
});

app.get('/api/appointments/:doctor_id', (req, res) => {
  const { doctor_id } = req.params;
  const query = `
    SELECT 
        appointments.appointment_id,
        appointments.appointment_date,
        appointments.appointment_time,
        appointments.patient_id,
        appointments.doctor_id,
        patients.fullName
    FROM 
        appointments 
    JOIN 
        patients ON appointments.patient_id = patients.patient_id
    WHERE 
        appointments.doctor_id = ?;
  `;
  
  connection.query(query, [doctor_id], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ error: 'Error fetching appointments' });
    }
    res.json(results);
  });
});

app.post('/health-records', (req, res) => {
  const { patient_id, illness_name, diagnosis_date, treatment_details, town } = req.body;
  connection.query(
    'INSERT INTO health_records (patient_id, illness_name, diagnosis_date, treatment_details, town) VALUES (?, ?, ?, ?, ?)',
    [patient_id, illness_name, diagnosis_date, treatment_details, town],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Health record created successfully', record_id: result.insertId });
    }
  );
});

// Update health record
app.put('/health-records/:recordId', (req, res) => {
  const { illness_name, diagnosis_date, treatment_details, town } = req.body;
  const recordId = req.params.recordId;

  connection.query(
    'UPDATE health_records SET illness_name = ?, diagnosis_date = ?, treatment_details = ?, town = ? WHERE record_id = ?',
    [illness_name, diagnosis_date, treatment_details, town, recordId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Record updated successfully' });
    }
  );
});


// Patient appointment list 
app.get('/api/appointments/patient/:patient_id', (req, res) => {
  const { patient_id } = req.params;
  const query = 'SELECT appointment_id, appointment_date, appointment_time FROM appointments WHERE patient_id = ?';

  connection.query(query, [patient_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching appointments' });
    }
    res.json(results);
  });
});

app.delete('/api/appointments/delete/:appointment_id', (req, res) => {
  const { appointment_id } = req.params;
  const query = 'DELETE FROM appointments WHERE appointment_id = ?';

  connection.query(query, [appointment_id], (err, results) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ error: 'Error deleting appointment' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  });
});

// Backend API to fetch appointments for a specific doctor
app.get('/api/appointments/', (req, res) => {
  const { doctor_id } = req.params;
  const query = `
    SELECT a.appointment_date, a.appointment_time, p.name AS patient_name 
    FROM appointments a
    JOIN patients p ON a.patient_id = p.patient_id
    WHERE a.doctor_id = ?`;

  connection.query(query, [doctor_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching appointments' });
    }

    console.log('Appointments fetched:', results); // Log the fetched appointments
    res.json(results);
  });
});

// Backend API to delete an appointment from doctor side
app.delete('/api/delete-appointment/:appointment_id', (req, res) => {
  const { appointment_id } = req.params;
  
  // Delete from the appointments table
  const deleteAppointmentQuery = 'DELETE FROM appointments WHERE appointment_id = ?';
  
  connection.query(deleteAppointmentQuery, [appointment_id], (err, results) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ error: 'Error deleting appointment' });
    }

    // Respond with success
    res.status(200).json({ message: 'Appointment deleted successfully' });
  });
});

// Endpoint to get patients assigned to a doctor by doctorId
app.get('/api/patients-assigned/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;

  // Adjust the query to select fullName from the patients table
  const query = `
    SELECT p.patient_id, p.fullName
    FROM patients p
    JOIN appointments a ON p.patient_id = a.patient_id
    WHERE a.doctor_id = ?
  `;

  connection.query(query, [doctorId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'No patients assigned to this doctor' });
    }
    res.json(results); // Return the patients assigned to the doctor
  });
});


// Endpoint to add a health record for a selected patient
app.post('/api/add-health-record', (req, res) => {
  const { patient_id, illness_name, diagnosis_date, treatment_details, town } = req.body;

  const query = `
    INSERT INTO health_records (patient_id, illness_name, diagnosis_date, treatment_details, town)
    VALUES (?, ?, ?, ?, ?);
  `;

  connection.query(query, [patient_id, illness_name, diagnosis_date, treatment_details, town], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding health record' });
    }
    res.json({ message: 'Health record added successfully' });
  });
});




// Start the server
const PORT = 5432; // Port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
