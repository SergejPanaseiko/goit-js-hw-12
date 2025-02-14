import { fetchImages } from './js/pixabay-api';
import { totalHit } from './js/pixabay-api';
import { renderGallery } from './js/render-functions.js'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const button_footer=document.querySelector('.butn-footer');
let lightbox = new SimpleLightbox('.gallery a');

let page=0;
let limit = 40;
let totalElements = 1;
let maxPage;
let query;

function showLoader() {
    document.getElementById('loader').classList.add('show');    
}
function hideLoader() {
document.getElementById('loader').classList.remove('show');
}

hideLoader();
//======= Натискаэмо на кнопку
form.addEventListener('submit', async (event) => {    //Кнопка 1 --------------------------------
    page = 0;
    query = input.value.trim();
    getTotalHits();
    event.preventDefault();
// ======= Перевіряємо заповненість input
    if (!query) {
        iziToast.warning({
            title: 'Увага',
            message: 'Будь ласка, введіть пошуковий запит!',
        });
        return;
    }
//====== Перевіряємо, чи не перевищили необхідну кількість завантажень
   
    gallery.innerHTML = '';
    showLoader();
    //Завантажуємо картинки
    try {        
        const images = await fetchImages(query);//----------------------------------------------
        if (images.length === 0) {
            iziToast.info({
                title: 'Немає результатів',
                message: 'Спробуйте інший пошуковий запит!',
            });
            return;
        }
        getTotalHits();
        hideLoader();
        renderGallery(images);//додаємо картинки
        lightbox.refresh();//
        button_footer.style.display = 'block';        
        button_footer.disabled = false;        
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
const totalPages = Math.ceil(totalElements / limit);

const continuationButton = document.getElementById('search-forms-two');

continuationButton.addEventListener('submit', async (event) => {// Кнопка нижня -------------------------
    event.preventDefault();
    getTotalHits();
    const images = await fetchImages(query, page);
    renderGallery(images);
    window.scrollBy({ top: window.innerHeight-100, behavior: 'smooth' });
    lightbox.refresh();    
    });

async function getTotalHits() {
    try {
        const hits = await totalHit(query); // Виклик функції із запитом
        counter(hits);
        } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function counter(hits) {
    maxPage = Math.ceil(hits / limit);
    page += 1;
    if (maxPage < page) {
        button_footer.style.display = 'none';
        page = 0;
    return iziToast.error({
        position: 'bottomCenter',
        message: "We're sorry, there are no more posts to load"
    });        
    }
}
