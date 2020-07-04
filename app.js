let line1 = document.querySelector(".line1");
let line2 = document.querySelector(".line2");
let line3 = document.querySelector(".line3");
let burger = document.getElementById("burger");
let navbar = document.getElementById("navbar");

window.addEventListener("load", () => {
  anime({
    targets: [".line1 ", " .line2", ".line3"],
    height: {
      value: ["33.33%", "15%"],
      duration: 1200,
      delay: 700,
    },
    margin: {
      value: "3% 0%",
      duration: 1500,
      delay: 1900,
    },
  });
  anime({
    targets: "#burger",
    height: "40px",
    width: "45px",
    left: "2.5vw",
    top: "3vh",
    delay: 1000,
    easing: "easeInOutQuad",
  });
});

//Background sphere animation
function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1 });
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
  }
  resize();
  window.addEventListener("resize", resize);
}

var sphereAnimation = (function () {
  var sphereEl = document.querySelector(".sphere-animation");
  var spherePathEls = sphereEl.querySelectorAll(".sphere path");
  var pathLength = spherePathEls.length;
  var aimations = [];

  fitElementToParent(sphereEl);

  var breathAnimation = anime({
    begin: function () {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(
          anime({
            targets: spherePathEls[i],
            stroke: {
              value: ["rgba(27,3,163,1)", "rgba(80,80,80,.35)"],
              duration: 500,
            },
            translateX: [2, -4],
            translateY: [2, -4],
            easing: "easeOutQuad",
            autoplay: false,
          })
        );
      }
    },
    update: function (ins) {
      aimations.forEach(function (animation, i) {
        var percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false,
  });

  var introAnimation = anime
    .timeline({
      autoplay: false,
    })
    .add(
      {
        targets: spherePathEls,
        strokeDashoffset: {
          value: [anime.setDashoffset, 0],
          duration: 3900,
          easing: "easeInOutCirc",
          delay: anime.stagger(190, { direction: "reverse" }),
        },
        duration: 2000,
        delay: anime.stagger(60, { direction: "reverse" }),
        easing: "linear",
      },
      0
    );

  var shadowAnimation = anime(
    {
      targets: "#sphereGradient",
      x1: "25%",
      x2: "25%",
      y1: "0%",
      y2: "75%",
      duration: 30000,
      easing: "easeOutQuint",
      autoplay: false,
    },
    0
  );

  function init() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }

  init();
})();

//navbar appear animation

let nav = false;

burger.addEventListener("click", () => {
  nav = !nav;

  if (nav) {
    navbar.style.width = "100%";
    navbar.style.height = "100%";
    burger.style.cursor = "default";

    anime({
      targets: [".line1 ", " .line2", ".line3"],

      margin: {
        value: ["3% , 0%", "0% 0%"],
        duration: 400,
        delay: 200,
        easing: "linear",
      },
      height: {
        value: ["15%", "33.33%"],
        duration: 100,
        delay: 700,
        easing: "linear",
      },
    });
    anime({
      targets: "#burger",
      height: "100%",
      width: "100%",
      left: "0",
      top: "0",
      easing: "easeInOutQuad",
    });
    anime({
      targets: "#back",
      width: {
        value: "3.5rem",
        delay: 2000,
      },
      rotate: {
        value: 360,
        delay: 2000,
        duration: 1000,
        easing: "easeInOutSine",
      },
    });
  } else {
    anime({
      targets: "#back",
      rotate: {
        value: 0,
        duration: 1000,
        easing: "easeInOutSine",
      },
      width: {
        value: "0",
        delay: 500,
        duration: 1000,
      },
    });

    anime({
      targets: [".line1 ", " .line2", ".line3"],
      margin: {
        value: ["0% 0%", "3% 0%"],
        duration: 500,
        delay: 1000,
        easing: "linear",
      },
      height: {
        value: ["33.33%", "15%"],
        duration: 100,
        delay: 500,
        easing: "linear",
      },
    });
    burger.style.height = "40px";
    burger.style.width = "45px";
    anime({
      targets: "#burger",
      left: "2.5vw",
      top: "3vh",
      duration: "500",
      easing: "easeInOutQuad",
    });
    navbar.style.width = "0";
    navbar.style.height = "0";
    burger.style.cursor = "pointer";
  }
});
