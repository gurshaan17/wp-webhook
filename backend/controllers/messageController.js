const axios = require('axios');
require('dotenv').config();

exports.sendMessage = async (req, res) => {
  const { message, phoneNumber } = req.body;

  // Validate input
  if (!message || !phoneNumber) {
    return res.status(400).json({ error: 'Message and phone number are required.' });
  }

  try {
    const response = await axios.post(
      `${process.env.WHATSAPP_API_URL}/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: 'No response received from WhatsApp API.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};