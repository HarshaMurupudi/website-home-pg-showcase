const indicators = document.querySelectorAll(".indicator");
const sections = document.querySelectorAll("section");
const arrowBtns = document.querySelectorAll(".arrow");

const resetCurrentActiveIndicator = () => {
  const activeIndicator = document.querySelector(".active");
  activeIndicator.classList.remove("active");
};

const onSectionLeavesViewport = (section) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetCurrentActiveIndicator();
          const element = entry.target;
          const indicator = document.querySelector(`a[href='#${element.id}']`);
          indicator.classList.add("active");
          return;
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.75
    }
  );
  observer.observe(section);
};

indicators.forEach((indicator) => {
  indicator.addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});


const getCurrentActiveIndicatorIndex = (indicators) => {
  let currentActiveIndicatorIndex = 0;
  [...indicators].forEach((node, index) => {
    if (node.className.split(" ").includes('active')) {
      currentActiveIndicatorIndex = index
    }
  });
  return currentActiveIndicatorIndex;
}

const getNextIndicator = (indicators, type) => {
  if (type === 'up') {
    return getCurrentActiveIndicatorIndex(indicators) === 0 ?
      indicators[indicators.length - 1] :
      indicators[getCurrentActiveIndicatorIndex(indicators) - 1]
  }

  return getCurrentActiveIndicatorIndex(indicators) === indicators.length - 1 ?
    indicators[0] :
    indicators[getCurrentActiveIndicatorIndex(indicators) + 1]
}

const arrowClickHandler = (event) => {
  const arrowType = event.target.classList[1];
  console.log(arrowType)
  const indicators = document.querySelectorAll(".indicator");

  document
    .querySelector(getNextIndicator(indicators, arrowType).getAttribute("href"))
    .scrollIntoView({ behavior: "smooth" });
}

arrowBtns.forEach((arrowBtn) => {
  arrowBtn.addEventListener('click', arrowClickHandler);
})

sections.forEach(onSectionLeavesViewport);