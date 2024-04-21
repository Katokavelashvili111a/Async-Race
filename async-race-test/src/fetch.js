import { apiUrl, endpoint } from "./data.js";
import { startCarAnimation, stopCarAnimation } from "./animationHelpers.js";
import { getRandomCarName, getRandomColor } from "./utilities.js";
import {
  carId,
  updateTotalPages,
  renderCurrentPage,
  addTrackEventListeners,
  createWinnerTracks
} from "./render.js";

let totalObjects = 0;
const objectsPerPage = 7;
let fetchedObjects = [];
let fetchedWinners = [];

export async function fetchData() {
  try {
    const response = await fetch(apiUrl + endpoint);

    if (!response.ok) {
      throw new Error("Failed to fetch data. Status: " + response.status);
    }

    const data = await response.json();
    totalObjects = data.length;
    fetchedObjects = data;

    await fetchWinnersAndCombine();
    updateTotalPages(objectsPerPage, totalObjects);
    renderCurrentPage(data, objectsPerPage, totalObjects);
    addTrackEventListeners(fetchedObjects);
    createWinnerTracks(fetchedWinners)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchWinnersAndCombine() {
  try {
    const response = await fetch(apiUrl + "/winners");
    if (!response.ok) {
      throw new Error("Failed to fetch winners. Status: " + response.status);
    }
    const winners = await response.json();
    fetchedWinners = winners.map((winner) => ({
      ...winner,
      car: fetchedObjects.find((obj) => obj.id === winner.id) || null,
    }));

  } catch (error) {
    console.error("Error fetching winners and combining data:", error);
  }
}

export async function generateRandomObjects(amount) {
  try {
    for (let i = 0; i < amount; i++) {
      const name = getRandomCarName();
      const color = getRandomColor();

      const response = await fetch(apiUrl + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, color }),
      });

      if (!response.ok) {
        throw new Error("Failed to create car. Status: " + response.status);
      }
    }

    await fetchData(objectsPerPage);
  } catch (error) {
    console.error("Error generating cars:", error);
  }
}

export async function updateCar(nameInput, colorInput) {
  try {
    const name = nameInput.value;
    const color = colorInput.value;
    const response = await fetch(`${apiUrl}/garage/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });

    if (!response.ok) {
      throw new Error("Failed to update car. Status: " + response.status);
    }
    const updatedCar = await response.json();
    fetchData();
  } catch (error) {
    console.error("Error updating car:", error);
  }
}

export async function deleteCar(nameInput, colorInput) {
  try {
    const response = await fetch(`${apiUrl}/garage/${carId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete car. Status: " + response.status);
    }

    nameInput.setAttribute("disabled", "disabled");
    colorInput.setAttribute("disabled", "disabled");
    nameInput.value = "";
    colorInput.value = "#000000";

    fetchData();
  } catch (error) {
    console.error("Error deleting car:", error);
  }
}

export async function toggleEngineForTrack(trackId, status, velocity) {
  try {
    const response = await fetch(
      `${apiUrl}/engine?id=${trackId}&status=${status}`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle engine. Status: " + response.status);
    }

    const responseData = await response.json();
    const fetchedVelocity = responseData.velocity;

    if (status === "started") {
      const trackDiv = document.getElementById(`car-${trackId}`);
      const carDiv = trackDiv.querySelector(".car");
      startCarAnimation(carDiv, fetchedVelocity);
    } else if (status === "stopped") {
      const trackDiv = document.getElementById(`car-${trackId}`);
      const carDiv = trackDiv.querySelector(".car");
      stopCarAnimation(carDiv);
    }
  } catch (error) {
    console.error("Error toggling engine:", error);
  }
}

export async function fetchVelocity(trackId) {
  try {
    const response = await fetch(
      `${apiUrl}/engine?id=${trackId}&status=started`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch velocity data. Status: " + response.status
      );
    }

    const responseData = await response.json();
    return responseData.velocity;
  } catch (error) {
    console.error("Error fetching velocity data:", error);
    return undefined;
  }
}

export { totalObjects, objectsPerPage, fetchedObjects };
