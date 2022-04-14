const express = require('express');
const webpush = require('web-push');
const path = require('path');
require('dotenv').config();

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const app = express();
const PORT = 3000;

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

// Body parser
app.use(express.json());

// Subscribe route
app.post('/subscribe', (req, res) => {
  // Get push subscription object
  const { subscription } = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push test' });

  // Send object through notification
  webpush.sendNotification(subscription, payload).catch(console.error);
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`));
