export function renderGallery(images) {
    const gallery = document.querySelector('.gallery'); // Переконуємося, що елемент галереї доступний

    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<a href="${largeImageURL}" class="gallery-item">
                    <img src="${webformatURL}" alt="${tags}">
                    <div class="info">
                        <p class="text">Likes<br> <span>${likes}</span></p>
                        <p class="text">Views<br> <span>${views}</span></p>
                        <p class="text">Comments<br> <span>${comments}</span></p>
                        <p class="text">Downloads<br> <span>${downloads}</span></p>
                    </div>
                </a>`
        )
        .join('');
    
    gallery.innerHTML = markup;
}
