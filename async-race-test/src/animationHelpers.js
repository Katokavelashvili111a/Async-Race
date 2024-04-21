export function startCarAnimation(carDiv, velocity) {
    const screenWidth = window.innerWidth;
    const carWidth = carDiv.offsetWidth;
    const animationDuration = (screenWidth + carWidth) / velocity;

    console.log("Animation Duration:", animationDuration);

    carDiv.style.transition = `left ${animationDuration}s linear`;
    carDiv.style.left = `${screenWidth - carWidth - 20}px`;
  }

  export   function stopCarAnimation(carDiv) {
    carDiv.style.transition = "none";
    carDiv.style.left = "70px";
  }