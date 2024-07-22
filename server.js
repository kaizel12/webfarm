const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    // Handle form submission logic
    res.send('Pesan telah terkirim!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
