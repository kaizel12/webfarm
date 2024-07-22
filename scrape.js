const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeDetik() {
    try {
        const { data } = await axios.get('https://www.detik.com/tag/peternakan');
        const $ = cheerio.load(data);
        const news = [];

        // Seleksi elemen yang tepat untuk berita
        $('.media__title').each((index, element) => {
            const title = $(element).text().trim();
            const url = $(element).closest('a').attr('href');
            const description = $(element).next('.media__desc').text().trim(); // Mengambil deskripsi

            if (title && url) {
                news.push({
                    title,
                    description,
                    url: `https://www.detik.com${url}` // Menyusun URL penuh
                });
            }
        });

        return news;
    } catch (error) {
        console.error('Error scraping Detik:', error);
        return [];
    }
}

scrapeDetik().then(news => {
    console.log(news);
});
