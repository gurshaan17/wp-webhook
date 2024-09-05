const axios = require('axios');
require('dotenv').config();

exports.sendMessage = async (req, res) => {
  const { message, phoneNumber } = req.body;

  // Validate input
  if (!message || !phoneNumber) {
    return res.status(400).json({ error: 'Message and phone number are required.' });
  }

  try {
    // Construct the request to the WhatsApp Cloud API
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
          'Content-Type': 'application/json', // Ensure the content type is JSON
        }
      }
    );

    // Send a success response with the WhatsApp API response data
    res.status(200).json(response.data);
  } catch (error) {
    // Check for Axios error details
    if (error.response) {
      // The request was made, but the server responded with a status code outside of the 2xx range
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // The request was made, but no response was received
      res.status(500).json({ error: 'No response received from WhatsApp API.' });
    } else {
      // Something else happened in setting up the request
      res.status(500).json({ error: error.message });
    }
  }
};