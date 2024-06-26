// definition
const listStyleChangeStartY = 373;
const listStyleChangeEndY = 1585;

const listItems = document.querySelectorAll(".list-item");
const division =
  (listStyleChangeEndY - listStyleChangeStartY) / listItems.length;

const panel1Img = document.getElementById("panel1-img");
const flyingSantaImage = document.getElementById("flying-santa-image");

const videoPlayBack = 500;
const videoElement = document.getElementById("video");
const videoSection = document.getElementById("video-section");

const fixedWrapper = document.getElementById("fixed-wrapper");
const fixedDescription = document.getElementById("fixed-description");

// 스크롤이 변하더라도 위치를 중앙에 맞추는 함수
function centerElement(elementId, video) {
  const element = document.getElementById(elementId);
  const parent = element?.parentElement;
  if (element === null || parent === null) {
    return;
  }

  const elementCenterY =
    (document.documentElement.clientHeight - element.offsetHeight) / 2;
  if (window.scrollY > parent.offsetTop - elementCenterY) {
    element.style.position = "fixed";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";

    // scroll에 따라 video 재생
    if (video) {
      video.currentTime =
        (window.scrollY - videoSection.offsetTop) / videoPlayBack;
    }
  } else {
    // initial로 초기화
    element.style.position = "relative";
    element.style.top = "initial";
    element.style.left = "initial";
    element.style.transform = "initial";
  }
}

// video duration에 따라 video-section의 높이를 조정
videoElement.addEventListener("loadedmetadata", () => {
  console.log("video loaded metadata");
  document.getElementById("video-section").style.height =
    videoElement.duration * videoPlayBack + "px";
});

const fixedDescriptionAppearTiming = 3470;
const fixedDescriptionAppearEnds = 3800;

// scroll event listener (main logic)
window.addEventListener("scroll", () => {
  if (document.getElementById("on")) {
    document.getElementById("on").removeAttribute("id");
  }

  // scroll에 따른 list item style 변경
  if (
    window.scrollY > listStyleChangeStartY &&
    window.scrollY < listStyleChangeEndY
  ) {
    const targetIndex = Math.floor(
      (window.scrollY - listStyleChangeStartY) / division
    );
    listItems[targetIndex].id = "on";
  }

  // scroll에 따른 flying santa image style 변경
  const scrollYBottom = window.scrollY + document.documentElement.clientHeight; // 현재 스크롤의 꼭대기 지점 + 화면 높이
  if (
    scrollYBottom > panel1Img.offsetTop &&
    scrollYBottom < panel1Img.offsetTop + panel1Img.offsetHeight + 100
  ) {
    const translateX =
      80 -
      (80 * 1.3 * (scrollYBottom - panel1Img.offsetTop)) /
        (panel1Img.offsetHeight + 100);
    const translateY =
      -13 +
      (13 * (scrollYBottom - panel1Img.offsetTop)) /
        (panel1Img.offsetHeight + 100);

    const rotationDegree =
      23 -
      (23 * 1.7 * (scrollYBottom - panel1Img.offsetTop)) /
        (panel1Img.offsetHeight + 100);

    flyingSantaImage.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationDegree}deg)`;
  }

  centerElement("fixed-wrapper", videoElement);

  // scroll이 video section에 도달하면 video를 원래 위치로 돌려놓기
  if (
    window.scrollY >
    videoSection.offsetTop +
      videoSection.offsetHeight -
      (fixedWrapper.offsetHeight +
        (document.documentElement.clientHeight - fixedWrapper.offsetHeight) / 2)
  ) {
    fixedWrapper.style.position = "relative";
    fixedWrapper.style.top = "initial";
    fixedWrapper.style.left = "initial";
    fixedWrapper.style.transform = `translateY(${
      videoSection.offsetHeight - fixedWrapper.offsetHeight
    }px)`;
  }

  // scroll에 따른 fixed description style 변경
  if (
    window.scrollY > fixedDescriptionAppearTiming &&
    window.scrollY < fixedDescriptionAppearEnds
  ) {
    fixedDescription.style.transform = `translateY(${
      fixedDescriptionAppearEnds - window.scrollY
    }px)`;
    fixedDescription.style.opacity =
      (window.scrollY - fixedDescriptionAppearTiming) / 300;
  } else if (window.scrollY > fixedDescriptionAppearEnds) {
    fixedDescription.style.transform = `translateY(0px)`;
    fixedDescription.style.opacity = 1;
  } else {
    fixedDescription.style.transform = `translateY(100px)`;
    fixedDescription.style.opacity = 0;
  }

  centerElement("bank-beyond");
  // 다시 올라가는 경우는 처리하지 않음. (계속 중앙 고정)
});

let currentImage = 0;
const sliderImages = document.querySelectorAll(".slider-image");
const sliderIndex = document.getElementById("slider-index");

// slider button click event listener
const handleSlideChange = (step) => {
  currentImage += step;

  if (currentImage < 0) {
    currentImage = sliderImages.length - 1;
  } else if (currentImage >= sliderImages.length) {
    currentImage = 0;
  }

  sliderContentWrapper.scrollLeft = sliderImages[currentImage].offsetLeft;
};

document.getElementById("left-button").addEventListener("click", () => {
  handleSlideChange(-1);
});
document.getElementById("right-button").addEventListener("click", () => {
  handleSlideChange(1);
});

const sliderContentWrapper = document.getElementById("slider-content-wrapper");

sliderContentWrapper.addEventListener("scroll", () => {
  const imageWidth = document.querySelectorAll(".slider-image")[0].offsetWidth;

  currentImage = Math.round(sliderContentWrapper.scrollLeft / imageWidth);
  sliderIndex.innerText = `${currentImage + 1}/${sliderImages.length}`;
});
