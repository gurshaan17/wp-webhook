const express = require('express');
const connectDB = require('./config/db')
const messageRoutes = require('./routes/message');
const webhookRoutes = require('./routes/webhook');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/webhook', webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));