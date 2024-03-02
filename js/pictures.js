import { objects } from './data';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const simularPictures = objects();

const simularPicturesFragment = document.createDocumentFragment();

simularPictures.forEach(({id, url, description, likes, comments}) => {
  const pictureElement = picturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.setAttribute('id', id);

  simularPicturesFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(simularPicturesFragment);

export {simularPictures};

