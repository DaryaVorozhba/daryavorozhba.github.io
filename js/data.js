import {getRandomArrayElement, getSerialNumber, getRandomInteger} from './util.js';

const NAMES = [
  'Бакусик',
  'Тамчик',
  'Пушистик',
  'Рыжик',
  'Серик',
  'Кукусик',
  'Хару',
  'Мурзик',
  'Доня',
];

const DESCRIPTIONS = [
  'Поймала дзен.',
  'Когтеточка сегодня - диван.',
  'Хозяин положил мне еду.',
  'Планы на сегодня: тыгыдык, еда, сон.',
  'Лучший тренажер - штора',
  'Коробка - лучшая постель',
  'Я уронил камеру.',
  'Красивый закат.',
  'Мой хозяин отдыхает.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const GENERATED_PHOTO_COUNT = 25;

const MAX_COMMENTS_COUNT = 30;

const getRandomMessages = () => getRandomArrayElement(MESSAGES);

const incrementedIdObject = getSerialNumber();
const incrementedUrl = getSerialNumber();
const incrementedIdComment = getSerialNumber();

const createComments = () => ({
  id: incrementedIdComment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: Array.from({ length: getRandomInteger(1, 2) }, getRandomMessages),
  name: getRandomArrayElement(NAMES),
});

const createObject = () => ({
  id: incrementedIdObject(),
  url: `photos/${incrementedUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from(
    { length: getRandomInteger(0, MAX_COMMENTS_COUNT) },
    createComments
  )
});

const objects = Array.from({ length: GENERATED_PHOTO_COUNT }, createObject);

export {objects};
