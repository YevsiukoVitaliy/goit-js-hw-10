// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import "simplelightbox/dist/simple-lightbox.min.css"
import SimpleLightbox from "simplelightbox";

const galleryEl = document.querySelector(".gallery")
const galleryMarkup = galleryItems.map(({ preview, original, description }) =>
    `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`).join("")
galleryEl.insertAdjacentHTML("beforeend", galleryMarkup)
const lightboxOptions = {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
}
const lightboxGallery = new SimpleLightbox(".gallery a", lightboxOptions);
console.log(galleryItems);
