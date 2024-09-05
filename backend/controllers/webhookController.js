const { Message } = require('../models/Message');
const { User } = require('../models/User')

exports.receiveMessage = async (req, res) => {
  const { entry } = req.body;
  try {
    // Process message (this depends on WhatsApp API structure)
    entry.forEach(async (entryItem) => {
      const { changes } = entryItem;
      changes.forEach(async (change) => {
        const { value } = change;
        const { messages, metadata } = value;

        if (messages) {
          for (let message of messages) {
            const phoneNumber = metadata.phone_number_id;
            const user = await User.findOne({ phoneNumber }) || new User({ phoneNumber });
            const newMessage = new Message({
              sender: message.from,
              content: message.text.body,
            });
            user.messages.push(newMessage);
            await user.save();
            await newMessage.save();
          }
        }
      });
    });
    res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};