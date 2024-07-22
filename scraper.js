const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeDetik() {
    try {
        const { data } = await axios.get('https://www.detik.com/tag/peternakan');
        const $ = cheerio.load(data);
        const news = [];
        
        $('.list-content .media').each((index, element) => {
            const title = $(element).find('h3').text();
            const description = $(element).find('.desc').text();
            const url = $(element).find('a').attr('href');
            news.push({
                title,
                description,
                url: `https://www.detik.com${url}` // Menyusun URL penuh
            });
        });
        
        return news;
    } catch (error) {
        console.error('Error scraping Detik:', error);
        return [];
    }
}

module.exports = { scrapeDetik };
