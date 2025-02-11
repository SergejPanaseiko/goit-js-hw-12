import { fetchImages } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderGallery } from './js/render-functions.js'
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
let lightbox = new SimpleLightbox('.gallery a');

function showLoader() {
document.getElementById('loader').classList.add('show');
}
function hideLoader() {
document.getElementById('loader').classList.remove('show');
}

hideLoader();
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            title: 'Увага',
            message: 'Будь ласка, введіть пошуковий запит!',
        });
        return;
    }
    gallery.innerHTML = '';
    showLoader();
    try {
        const images = await fetchImages(query);

        if (images.length === 0) {
            iziToast.info({
                title: 'Немає результатів',
                message: 'Спробуйте інший пошуковий запит!',
            });
            return;
        }
        hideLoader();
        renderGallery(images);
        lightbox.refresh();
    } catch (error) {
        loader.style.display = "none"; 
        iziToast.error({
            title: 'Помилка',
            message: 'Щось пішло не так! Спробуйте ще раз.',
        });
    } finally {
        loader.style.display = "none";
    }
});
hideLoader();
