import { updateBackendWithWinner } from "./updateBackend.js";
import { fetchData, fetchVelocity } from "./fetch.js";

export async function startAllCarAnimations(fetchedObjects) {
  try {
    if (fetchedObjects.length === 0) {
      await fetchData();
    }

    const carDivs = document.querySelectorAll(".car");
    const velocityPromises = [];

    const animationDurations = [];

    for (const carDiv of carDivs) {
      const trackId = carDiv.parentElement.getAttribute("id").split("-")[1];

      const promise = fetchVelocity(trackId)
        .then((velocity) => {
          return { velocity, carDiv };
        })
        .catch((error) => {
          console.error(
            "Error fetching velocity data for car with ID:",
            trackId,
            error
          );
          return undefined;
        });

      velocityPromises.push(promise);
    }

    const velocityResults = await Promise.all(velocityPromises);

    velocityResults.forEach(({ velocity, carDiv }) => {
      if (velocity !== undefined) {
        const screenWidth = window.innerWidth;
        const carWidth = carDiv.offsetWidth;
        const animationDuration = (screenWidth + carWidth) / velocity;

        animationDurations.push({ animationDuration, carDiv });
        carDiv.style.transition = "left linear";
        carDiv.style.transitionDuration = `${animationDuration}s`;
        carDiv.style.left = `${screenWidth - carWidth - 20}px`;
      } else {
        console.error("Velocity is undefined for car:", carDiv);
      }
    });

    const fastestCar = animationDurations.reduce((prev, curr) => {
      return prev.animationDuration < curr.animationDuration ? prev : curr;
    });
    const initialMessage = document.querySelectorAll('.track-message')
    initialMessage.forEach(item => {
      item.textContent =''
    })

    setTimeout(() => {
      const screenWidth = window.innerWidth;
      const carWidth = fastestCar.carDiv.offsetWidth;
      const endPosition = screenWidth - carWidth - 20;
      if (parseInt(fastestCar.carDiv.style.left) >= endPosition) {
        const trackDiv = fastestCar.carDiv.parentElement;
        const trackMessage = trackDiv.querySelector(".track-message");
        const animationDuration = fastestCar.animationDuration.toFixed(2);
        trackMessage.textContent = `You won! Duration: ${animationDuration}`;

        updateBackendWithWinner(fastestCar.carDiv);
      }
    }, fastestCar.animationDuration * 1000);
  } catch (error) {
    console.error("Error starting all car animations:", error);
  }
}
