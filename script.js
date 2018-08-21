const opinions = document.querySelectorAll(".carousel__opinion");
const avatars = document.querySelectorAll(".carousel__avatar");
const carouselLeftButton = document.querySelector(".carousel__button--left");
const carouselRightButton = document.querySelector(".carousel__button--right");


carouselLeftButton.addEventListener('click', () => {
    avatarsMove(); 
    carouselMove();
  }
);


let carouselVisibleOpinionID = 0;
let avatarMainID = 1;

setInterval(() => {
  carouselMove();
  avatarsMove();
}, 2000);

const VISIBLE_CLASS = 'carousel__opinion--visible';
const HIDDEN_CLASS = 'carousel__opinion--hidden';
const HIDING_CLASS = 'carousel__opinion--hiding';
const SHOWING_CLASS = 'carousel__opinion--showing';

const AVATAR_LEFT_CLASS = 'carousel__avatar--left';
const AVATAR_RIGHT_CLASS = 'carousel__avatar--right';
const AVATAR_MAIN_CLASS = 'carousel__avatar--main';

function carouselMove () {
  let opinionListLength = opinions.length;

  opinions.forEach((e, id) => {
    if ( id == carouselVisibleOpinionID ) {
      showOpinion(e);
    } else {
      hideOpinion(e);
    }
  })
  
  carouselVisibleOpinionID += 1;
  carouselVisibleOpinionID = carouselVisibleOpinionID % opinionListLength;
}


function showOpinion (opinion) {
  opinion.classList.remove(HIDDEN_CLASS);
  opinion.classList.add(SHOWING_CLASS);
  setTimeout(() => {
    opinion.classList.remove(SHOWING_CLASS);
    opinion.classList.add(VISIBLE_CLASS);
  }, 100);
}

function hideOpinion (opinion) {
  opinion.classList.remove(VISIBLE_CLASS);
  opinion.classList.add(HIDDEN_CLASS);
}

function avatarsMove () {
  const length = avatars.length;
  let centerID = avatarMainID;
  let leftID = null, rightID = null;
  if ( avatarMainID - 1 < 0) {
    leftID = length - 1;
  } else {
    leftID = avatarMainID - 1;
  }

  if( avatarMainID + 1 >= length) {
    rightID = 0;
  } else {
    rightID = avatarMainID +1;
  }

  avatars.forEach( e => {
    e.classList.remove(AVATAR_LEFT_CLASS);
    e.classList.remove(AVATAR_RIGHT_CLASS);
    e.classList.remove(AVATAR_MAIN_CLASS);
  })

  avatarsList = [...avatars];

  
  avatarsList[leftID].classList.add(AVATAR_LEFT_CLASS);
  avatarsList[rightID].classList.add(AVATAR_RIGHT_CLASS);
  avatarsList[centerID].classList.add(AVATAR_MAIN_CLASS);

  avatarMainID += 1;
  avatarMainID = avatarMainID % length;
}