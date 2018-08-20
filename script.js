const opinions = document.querySelectorAll(".carousel__opinion");


let carouselVisibleOpinionID = 0;

setInterval(() => {
  carouselMove();
}, 2000);

const VISIBLE_CLASS = 'carousel__opinion--visible';
const HIDDEN_CLASS = 'carousel__opinion--hidden';
const HIDING_CLASS = 'carousel__opinion--hiding';
const SHOWING_CLASS = 'carousel__opinion--showing';

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