const sun = document.getElementById("sun");

const grayClouds = document.getElementById("gray-clouds");
const whiteClouds = document.getElementById("white-clouds");

const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const bird3 = document.getElementById("bird3");

const mountain0 = document.getElementById("mountain0");
const mountain1 = document.getElementById("mountain1");
const mountain2 = document.getElementById("mountain2");
const mountain3 = document.getElementById("mountain3");
const mountain4 = document.getElementById("mountain4");
const mountain5 = document.getElementById("mountain5");
const mountain6 = document.getElementById("mountain6");
const mountain7 = document.getElementById("mountain7");

let clientWidth = document.documentElement.clientWidth;

window.addEventListener("scroll", () => {
  if (clientWidth > 800) {
    const scrollY = window.scrollY;

    sun.style.transform = `translateY(${scrollY * 1.05}px)`;

    grayClouds.style.transform = `translate(${scrollY * 0.125}px, ${scrollY * 0.90}px)`;
    whiteClouds.style.transform = `translate(${scrollY * -0.125}px, ${scrollY * 0.80}px)`;

    bird1.style.transform = `translateX(${scrollY}px)`;
    bird2.style.transform = `translateX(-${scrollY * 3.5}px)`;
    bird3.style.transform = `translateX(-${scrollY * 0.5}px)`;

    mountain0.style.transform = `translateY(${scrollY * 0.95}px)`;
    mountain1.style.transform = `translateY(${scrollY * 0.93}px)`;
    mountain2.style.transform = `translateY(${scrollY * 0.9}px)`;
    mountain3.style.transform = `translateY(${scrollY * 0.8}px)`;
    mountain4.style.transform = `translateY(${scrollY * 0.7}px)`;
    mountain5.style.transform = `translateY(${scrollY * 0.6}px)`;
    mountain6.style.transform = `translateY(${scrollY * 0.3}px)`;
    mountain7.style.transform = `translateY(${scrollY * 0.1}px)`;
  }
});

document
  .querySelectorAll("#right-buttons .button-in-header")
  .forEach((element) => {
    element.addEventListener("click", (event) => {
      document.getElementById("active-menu").removeAttribute("id");

      element.setAttribute("id", "active-menu");
    });
  });

const link = document.querySelector('a[href="#document-title"]');

link.addEventListener("click", () => {
  event.preventDefault();

  document.querySelector("#main-content-wrapper").scrollIntoView({
    behavior: "smooth",
  });
});

window.addEventListener("resize", () => {
  clientWidth = document.documentElement.clientWidth;

  if (clientWidth < 800) {
    sun.style.transform = `translateY(0px)`;

    grayClouds.style.transform = `translateX(0px)`;
    whiteClouds.style.transform = `translateX(0px)`;

    bird1.style.transform = `translateX(0px)`;
    bird2.style.transform = `translateX(0px)`;
    bird3.style.transform = `translateX(0px)`;

    mountain0.style.transform = `translateY(0px)`;
    mountain1.style.transform = `translateY(0px)`;
    mountain2.style.transform = `translateY(0px)`;
    mountain3.style.transform = `translateY(0px)`;
    mountain4.style.transform = `translateY(0px)`;
    mountain5.style.transform = `translateY(0px)`;
    mountain6.style.transform = `translateY(0px)`;
    mountain7.style.transform = `translateY(0px)`;
  }
});
