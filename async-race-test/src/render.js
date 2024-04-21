import { toggleEngineForTrack } from "./fetch.js";
import { rgbToHex } from "./utilities.js";

export function renderCurrentPage(
  fetchedObjects,
  objectsPerPage,
  totalObjects,
  currentPageIndex = 0
) {
  setTimeout(() => {
    const startIndex = currentPageIndex * objectsPerPage;
    const endIndex = Math.min(startIndex + objectsPerPage, totalObjects);
    const currentObjects = fetchedObjects?.slice(startIndex, endIndex);

    const container = document.querySelector(".tracks-wrapper");
    container.innerHTML = "";

    currentObjects?.forEach((obj, index) => {
      createTrack(obj, index, container);
    });

    updateCurrentPage(currentPageIndex);
    addTrackEventListeners();
  }, 100);
}

export function createTrack(obj, index, container) {
  const trackDiv = document.createElement("div");
  trackDiv.classList.add("track");
  trackDiv.setAttribute("id", `car-${obj.id}`);

  const startButton = document.createElement("button");
  startButton.classList.add("start-car");
  startButton.textContent = "A";

  const endButton = document.createElement("button");
  endButton.classList.add("stop-car");
  endButton.textContent = "B";

  const carTitle = document.createElement("p");
  carTitle.classList.add("track-car-title");
  carTitle.textContent = `#${obj.id}-${obj.name}`;

  const trackMessage = document.createElement("p");
  trackMessage.classList.add("track-message");
  trackMessage.textContent = "";

  const carDiv = document.createElement("div");
  carDiv.classList.add("car");
  carDiv.style.fill = obj.color;

  const svgIndex = (index % 6) + 1;
  const svgPath = `../public/car${svgIndex}.svg`;

  fetch(svgPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load SVG. Status: " + response.status);
      }
      return response.text();
    })
    .then((svgContent) => {
      carDiv.innerHTML = svgContent;
    })
    .catch((error) => {
      console.error("Error loading SVG:", error);
    });
  trackDiv.appendChild(startButton);
  trackDiv.appendChild(endButton);
  trackDiv.appendChild(carTitle);
  trackDiv.appendChild(trackMessage);
  trackDiv.appendChild(carDiv);

  container.appendChild(trackDiv);
}

export function updateTotalPages(objectsPerPage, totalObjects) {
  const totalPagesElement = document.getElementById("total-pages");
  const totalPages = Math.ceil(totalObjects / objectsPerPage);
  totalPagesElement.textContent = totalPages;
}

export function updateCurrentPage(currentPageIndex) {
  const currentPageElement = document.getElementById("current-page");
  const currentPage = currentPageIndex + 1;
  currentPageElement.textContent = currentPage;
}

let carId = "";

export function addTrackEventListeners(fetchedObjects) {
  setTimeout(() => {
    const trackDivs = document.querySelectorAll(".track");
    trackDivs.forEach((trackDiv) => {
      const startButton = trackDiv.querySelector(".start-car");
      const stopButton = trackDiv.querySelector(".stop-car");
      const trackId = trackDiv.getAttribute("id").split("-")[1];
      const velocity = fetchedObjects?.find(
        (obj) => obj.id === parseInt(trackId)
      ).velocity;

      startButton.addEventListener("click", () => {
        toggleEngineForTrack(trackId, "started", velocity);
      });

      stopButton.addEventListener("click", () => {
        toggleEngineForTrack(trackId, "stopped");
      });
    });

    const trackCarTitles = document.querySelectorAll(".car");
    trackCarTitles.forEach((title) => {
      title.addEventListener("click", () => {
        const parentId = title.parentElement.id;
        const nameInput = document.getElementById("update-name");
        const colorInput = document.getElementById("update-color");
        
        if (nameInput && colorInput) {
          nameInput.removeAttribute("disabled");
          nameInput.value = title.parentElement.children[2].textContent.split("-")[1];

          colorInput.removeAttribute("disabled");
          colorInput.value = rgbToHex(
            title.parentElement.lastElementChild.style.fill
          );
          carId = parentId.split("-")[1];
        } else {
          console.error("nameInput or colorInput not found in DOM");
        }
      });
    });
  }, 1000);
}

export function createWinnerTracks(winners) {
  const winnerTracksContainer = document.getElementById("winner-wrapper");

  winners.forEach((winner) => {
    const trackDiv = document.createElement("div");
    trackDiv.classList.add("winer-track");
    trackDiv.style.backgroundColor = winner.color;

    const nameHeading = document.createElement("h2");
    nameHeading.classList.add("winner-name");
    nameHeading.textContent = `#${winner.id}-${winner.car.name}`;

    const winsHeading = document.createElement("h2");
    winsHeading.classList.add("wins");
    winsHeading.textContent = winner.wins;

    const bestTimeHeading = document.createElement("h2");
    bestTimeHeading.classList.add("best-time");
    bestTimeHeading.textContent = winner.time;

    const carDiv = document.createElement("div");
    carDiv.classList.add("winer-car");
    carDiv.style.fill = winner.car.color;

    const svgPath = `../public/car1.svg`;

    fetch(svgPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load SVG. Status: " + response.status);
        }
        return response.text();
      })
      .then((svgContent) => {
        carDiv.innerHTML = svgContent;
      })
      .catch((error) => {
        console.error("Error loading SVG:", error);
      });
    trackDiv.appendChild(carDiv);
    trackDiv.appendChild(nameHeading);
    trackDiv.appendChild(winsHeading);
    trackDiv.appendChild(bestTimeHeading);

    winnerTracksContainer.appendChild(trackDiv);
  });
}

// Function to move to winners
export function moveToWinners() {
  const divsToActivate = document.querySelectorAll(
    ".winner-group, .create-car, .race-car, .start-note, .page-controler, .tropy, .winers-page-controler"
  );
  const pageControl = document.querySelector('.page-controler')
  pageControl.classList.remove('active')
  const raceWrapper = document.querySelector('.race-wrapper')
  raceWrapper.classList.remove('active')
  const garage = document.querySelector('.garage')
  garage.classList.remove('active')
  divsToActivate.forEach((div) => {
    div.classList.add("active");
  });
}

// Function to move to garage
export function moveToGarage() {
  const divsToDeactivate = document.querySelectorAll(
    ".winner-group, .create-car, .race-car, .start-note, .page-controler, .tropy, .winers-page-controler"
  );
  const raceWrapper = document.querySelector('.race-wrapper')
  raceWrapper.classList.add('active')
  const pageControl = document.querySelector('.page-controler')
  pageControl.classList.add('active')
  const garage = document.querySelector('.garage')
  garage.classList.add('active')
  divsToDeactivate.forEach((div) => {
    div.classList.remove("active");
  });
}

export { carId };
