import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const imageUpload = document.getElementById('image-upload');
const uploadButton = document.getElementById('upload-button');
const cropButton = document.getElementById('crop-button');
const downloadButton = document.getElementById('download-button');
const displayedImage = document.getElementById('displayed-image');
const croppedContainer = document.querySelector('.cropped-container');
const imageCropped = document.getElementById('image-cropped');

let cropper;

// Открываем диалог выбора файла при нажатии на кнопку "Upload image"
uploadButton.addEventListener('click', () => {
    imageUpload.click();
});

// Загрузка изображения
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            displayedImage.src = event.target.result;
            initCropper();
        };
        reader.readAsDataURL(file);
    }
});

// Инициализация Cropper.js
function initCropper() {
    if (cropper) {
        cropper.destroy();
    }
    cropper = new Cropper(displayedImage, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        ready() {
            cropButton.disabled = false;
        }
    });
}

// Обрезка изображения
cropButton.addEventListener('click', () => {
    const croppedCanvas = cropper.getCroppedCanvas();
    imageCropped.src = croppedCanvas.toDataURL();
    croppedContainer.style.display = 'flex';
    downloadButton.disabled = false;
});

// Скачивание обрезанного изображения
downloadButton.addEventListener('click', () => {
    const croppedCanvas = cropper.getCroppedCanvas();
    const link = document.createElement('a');
    link.download = 'cropped-image.png';
    link.href = croppedCanvas.toDataURL();
    link.click();
});