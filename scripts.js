// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    fetch('/news')
        .then(response => response.json())
        .then(news => {
            const newsContent = document.getElementById('news-content');
            newsContent.innerHTML = '';

            news.forEach(item => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');

                const newsTitle = document.createElement('h3');
                newsTitle.textContent = item.title;

                const newsSummary = document.createElement('p');
                newsSummary.textContent = item.summary;

                const newsLink = document.createElement('a');
                newsLink.href = item.link;
                newsLink.textContent = 'Baca selengkapnya';

                newsItem.appendChild(newsTitle);
                newsItem.appendChild(newsSummary);
                newsItem.appendChild(newsLink);

                newsContent.appendChild(newsItem);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            const newsContent = document.getElementById('news-content');
            newsContent.textContent = 'Gagal memuat informasi terbaru.';
        });
});
