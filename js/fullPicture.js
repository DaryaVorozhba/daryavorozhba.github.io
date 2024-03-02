// Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.
// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:
// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
// Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
// Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments.
// Описание фотографии description вставьте строкой в блок .social__caption.
// Подключите модуль в проект.

import {isEscapeKey} from './util.js';
import { simularPictures } from './pictures.js';

const bigPicture = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureBtnClose = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');

const onEskapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const openBigPicture = function() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keyup', onEskapeKey);
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const onBigPictureBtnClose = function() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keyup', onEskapeKey);
  commentCount.classList.remove('hodden');
  commentsLoader.classList.remove('hodden');
};

const fillBigPicture = function(pictureData) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = pictureData.description;
  bigPicture.querySelector('.social__comment-total-count').textContent = pictureData.comments.length;
};

const fillCommentsOnBigPicture = function(pictureData) {
  socialComments.innerHTML = '';
  const comments = pictureData.comments;
  socialComments.innerHTML = comments.map((comment) =>
    `<li class="social__comment">
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>`
  ).join('');
};

const onPicturesContainerClick = (event) => {
  const targetId = event.target.parentNode.id;
  const pictureData = simularPictures.find((element) => element.id === Number(targetId));
  const pictureData = simularPictures.find((element) => {
    window.console.log('elementId: ', element.id);
    window.console.log('targetId: ', targetId);
    return Number(element.id) === Number(targetId);
  });
  window.console.log(pictureData);
  window.console.log(simularPictures);

  if (event.target.classList[0] === 'picture__img') {
    openBigPicture();
  }

  fillBigPicture(pictureData);
  fillCommentsOnBigPicture(pictureData);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);
bigPictureBtnClose.addEventListener('click', onBigPictureBtnClose);
