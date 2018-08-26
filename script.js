const opinions = document.querySelectorAll(".carousel__opinion");
const avatars = document.querySelectorAll(".carousel__avatar");
const carouselLeftButton = document.querySelector(".carousel__button--left");
const carouselRightButton = document.querySelector(".carousel__button--right");
const nav = document.querySelector(".nav");

window.addEventListener('scroll', throttle(() => {
    if(window.scrollY > 0) nav.classList.add("nav--white-bg");
    else nav.classList.remove("nav--white-bg");

}, 400))



let carouselInterval = setInterval(() => {
  carouselMove("LEFT");
}, 2000);

carouselLeftButton.addEventListener('click', () => {
  clearInterval(carouselInterval);
  carouselMove("LEFT");

  carouselInterval = setInterval(() => {
    carouselMove("LEFT");
  }, 2000);
});

carouselRightButton.addEventListener('click', () => {
  clearInterval(carouselInterval);
  carouselMove("RIGHT");

  carouselInterval = setInterval(() => {
    carouselMove("LEFT");
  }, 2000);
});


let carouselVisibleOpinionID = 1;
let avatarMainID = 1;


const VISIBLE_CLASS = 'carousel__opinion--visible';
const HIDDEN_CLASS = 'carousel__opinion--hidden';
const HIDING_CLASS = 'carousel__opinion--hiding';
const SHOWING_CLASS = 'carousel__opinion--showing';

const AVATAR_LEFT_CLASS = 'carousel__avatar--left';
const AVATAR_RIGHT_CLASS = 'carousel__avatar--right';
const AVATAR_MAIN_CLASS = 'carousel__avatar--main';

function carouselMove (direction) {
  moveAvatars(direction);
  moveOpinons(direction);
}

function moveOpinons (direction) {
  let opinionListLength = opinions.length;
  if ( direction === 'LEFT' ) {
    carouselVisibleOpinionID += 1;
    carouselVisibleOpinionID = carouselVisibleOpinionID % opinionListLength;
  } else if ( direction === 'RIGHT' ) {
    carouselVisibleOpinionID += -1;
    if ( carouselVisibleOpinionID < 0 ) carouselVisibleOpinionID = opinionListLength + carouselVisibleOpinionID;
  }

  opinions.forEach((e, id) => {
    if ( id == carouselVisibleOpinionID ) {
      showOpinion(e);
    } else {
      hideOpinion(e);
    }
  })
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

function moveAvatars (direction) {
  const length = avatars.length;

  if ( direction === 'LEFT' ) {
    avatarMainID += 1;
    avatarMainID = avatarMainID % length;
  } else if ( direction === 'RIGHT' ) {
    avatarMainID += -1;
    if ( avatarMainID < 0 ) avatarMainID = length + avatarMainID;
  }

  const centerID = avatarMainID;
  let leftID;
  let rightID;

  leftID = centerID - 1;
  if ( leftID < 0 ) leftID = length + leftID;
  rightID = (centerID + 1) % length;

  avatars.forEach( e => {
    e.classList.remove(AVATAR_LEFT_CLASS);
    e.classList.remove(AVATAR_RIGHT_CLASS);
    e.classList.remove(AVATAR_MAIN_CLASS);
  })

  avatarsList = [...avatars];

  avatarsList[leftID].classList.add(AVATAR_LEFT_CLASS);
  avatarsList[rightID].classList.add(AVATAR_RIGHT_CLASS);
  avatarsList[centerID].classList.add(AVATAR_MAIN_CLASS);

}


function throttle (fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}