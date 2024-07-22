const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { scrapeDetik } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/news', async (req, res) => {
    try {
        const response = await axios.get('https://www.agribusinessglobal.com/');
        const html = response.data;
        const $ = cheerio.load(html);
        let news = [];

        $('.article-teaser').each((i, elem) => {
            news.push({
                title: $(elem).find('.title').text().trim(),
                link: $(elem).find('a').attr('href'),
                summary: $(elem).find('.summary').text().trim()
            });
        });

        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news');
    }
});

app.post('/send-message', (req, res) => {
    const { name, email, message, product, quantity } = req.body;
    // Handle form submission logic here (e.g., send email or save data)
    console.log(`Order received: ${name}, ${email}, ${message}, Product: ${product}, Quantity: ${quantity}`);
    res.send('Pesanan telah dikirim!');
});

app.get('/api/news', async (req, res) => {
    try {
        const news = await scrapeDetik();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Gagal memuat berita' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
