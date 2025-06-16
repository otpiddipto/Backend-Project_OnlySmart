require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
// const lessonRoutes = require('./routes/lessonsRoutes');
// const enrollmentRoutes = require('./routes/enrollmentRoutes');
// const transactionRoutes = require('./routes/transactionRoutes');
// const progressRoutes = require('./routes/lessonProgressRoutes');

const app = express();
app.use(cors());

app.use(express.json());


app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
// app.use('/api/lessons', lessonRoutes);
// app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/transactions', transactionRoutes);
// app.use('/api/progress', progressRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'OnlySmarts-API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
