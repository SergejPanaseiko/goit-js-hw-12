import axios from 'axios';

const API_KEY = '48662828-d5228b65b3bd2a50381de04cd';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 9
        },
    });

    return response.data.hits;
}
