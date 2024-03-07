import {isEscapeKey} from './util.js';
import { simularPictures } from './pictures.js';

const bigPicture = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureBtnClose = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const commentsTotalCount = document.querySelector('.social__comment-total-count');

let showCommentsCounter = 0;
let pictureData;

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
  commentCount.classList.remove('hidden');
};

const onBigPictureBtnClose = function() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keyup', onEskapeKey);
  commentCount.classList.add('hidden');
};

const fillBigPicture = function(data) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = data.description;
  bigPicture.querySelector('.social__comment-total-count').textContent = data.comments.length;
};

const showMoreComments = function(data) {
  showCommentsCounter += 5;
  const arrayComments = data.comments;
  const showComments = [];

  for (let i = 0; i < showCommentsCounter; i++) {
    showComments.push(arrayComments[i]);

    if (showCommentsCounter >= arrayComments.length) {
      commentsLoader.classList.add('hidden');
      showCommentsCounter = arrayComments.length;
    } else {
      commentsLoader.classList.remove('hidden');
    }
  }

  socialComments.innerHTML = '';
  socialComments.innerHTML = showComments.map((comment) =>
    `<li class="social__comment">
         <img
           class="social__picture"
           src="${comment.avatar}"
           alt="${comment.name}"
           width="35" height="35">
         <p class="social__text">${comment.message}</p>
       </li>`
  ).join('');

  commentsShownCount.textContent = showCommentsCounter;
  commentsTotalCount.textContent = arrayComments.length;
};

const onCommentsLoaderClick = () => showMoreComments(pictureData);

const onPicturesContainerClick = (event) => {
  showCommentsCounter = 0;
  const targetId = event.target.parentNode.id;
  pictureData = simularPictures.find((element) => element.id === Number(targetId));

  if (event.target.classList[0] === 'picture__img') {
    openBigPicture();
  }

  fillBigPicture(pictureData);
  showMoreComments(pictureData);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);
bigPictureBtnClose.addEventListener('click', onBigPictureBtnClose);
commentsLoader.addEventListener('click', onCommentsLoaderClick);
