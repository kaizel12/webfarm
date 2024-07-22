const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/news', async (req, res) => {
    try {
        const response = await axios.get('https://example.com/news'); // Ganti dengan URL situs berita peternakan
        const html = response.data;
        const $ = cheerio.load(html);
        let news = [];

        $('.news-item').each((i, elem) => {
            news.push({
                title: $(elem).find('.news-title').text(),
                link: $(elem).find('a').attr('href'),
                summary: $(elem).find('.news-summary').text()
            });
        });

        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news');
    }
});

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    // Handle form submission logic
    res.send('Pesan telah terkirim!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
