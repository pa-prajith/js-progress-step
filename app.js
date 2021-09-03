(function () {
  const progress = document.querySelector("#progress");
  const prev = document.querySelector("#prev");
  const next = document.querySelector("#next");
  let activeCircleCount = 1;
  const totalSteps = 4;

  function enableButton(btn) {
    btn.removeAttribute("disabled");
  }

  function disableButton(btn) {
    btn.setAttribute("disabled", true);
  }

  function targetCircle(stepNo) {
    const cnt = stepNo - 1;
    return document.querySelectorAll(`.circle`)[cnt];
  }

  function inActivateStep(stepNo) {
    const circle = targetCircle(stepNo);
    circle.classList.remove("active");
  }

  function activateStep(stepNo) {
    const circle = targetCircle(stepNo);
    circle.classList.add("active");
  }

  function updateCircleCount(val) {
    activeCircleCount += val;
  }

  function circleCountCheck(val) {
    return activeCircleCount === val;
  }

  function progressUpdate() {
    const width = (100 / (totalSteps - 1)) * (activeCircleCount - 1);
    progress.style.width = width + "%";
  }

  function prevStepAnimation(stepNo) {
    const circle = targetCircle(stepNo);
    circle.style.transition = "border 0.5s ease-in";
    progress.style.transition = "width 0.5s ease-in 0.5s";
  }

  function nextStepAnimation(stepNo) {
    const circle = targetCircle(stepNo);
    circle.style.transition = "border 0.5s ease-in 0.5s";
    progress.style.transition = "width 0.5s ease-in";
  }

  function prevStep() {
    if (circleCountCheck(1)) {
      return false;
    }
    if (circleCountCheck(totalSteps)) {
      enableButton(next);
    }
    inActivateStep(activeCircleCount);
    prevStepAnimation(activeCircleCount);
    updateCircleCount(-1);
    if (circleCountCheck(1)) {
      disableButton(prev);
    }
    progressUpdate();
  }

  function nextStep() {
    if (circleCountCheck(totalSteps)) {
      return false;
    }
    if (circleCountCheck(1)) {
      enableButton(prev);
    }
    updateCircleCount(1);
    activateStep(activeCircleCount);
    nextStepAnimation(activeCircleCount);
    if (circleCountCheck(totalSteps)) {
      disableButton(next);
    }
    progressUpdate();
  }

  function addListener() {
    prev.addEventListener("click", prevStep);
    next.addEventListener("click", nextStep);
  }

  addListener();
})();
