import axios from 'axios';

const API_KEY = '48662828-d5228b65b3bd2a50381de04cd';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page_q) {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
            page: page_q,
        },
    });
    return response.data.hits;
}

export async function totalHit(query) {
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`;
    try {
        const response = await fetch(URL);       // Очікуємо відповідь
        const data = await response.json();      // Очікуємо перетворення в JSON
        return data.totalHits;                   // Повертаємо значення
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;                             // Прокидуємо помилку
    }
};

