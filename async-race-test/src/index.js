import { startAllCarAnimations } from "./animations.js";
import { addTrackEventListeners, updateTotalPages, renderCurrentPage, moveToGarage,  moveToWinners} from "./render.js";
import { updateCar, deleteCar, fetchData, fetchedObjects, totalObjects, objectsPerPage, generateRandomObjects } from "./fetch.js";
import { createInitialHTML } from "./initial.js";
createInitialHTML()

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000";
  const endpoint = "/garage";

  let currentPageIndex = 0;
  fetchData(7);

  const nameInput = document.getElementById("update-name");
  const updateColorInput = document.getElementById("update-color");
  const update = document.getElementById("update");

  const fetchButton = document.getElementById("generate");
  fetchButton.addEventListener("click", () => {
    generateRandomObjects(100); 
  });


  const prevButton = document.querySelector(".prev-button");
  prevButton.addEventListener("click", () => {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      renderCurrentPage(fetchedObjects, objectsPerPage, totalObjects, currentPageIndex);
    }
  });

  const nextButton = document.querySelector(".next-button");
  nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(totalObjects / objectsPerPage);
    if (currentPageIndex < totalPages - 1) {
      currentPageIndex++;
      renderCurrentPage(fetchedObjects, objectsPerPage, totalObjects, currentPageIndex);
    }
  });

  const createButton = document.getElementById("create");
  createButton.addEventListener("click", async () => {
    const nameInput = document.querySelector('.create-car input[type="text"]');
    const colorInput = document.getElementById("colorInput");
    

    const name = nameInput.value;
    let color = colorInput.value;

    if (name.trim() === "") {
      alert("Please enter a car name.");
      return;
    }

    if (!color) {
      alert("Please select a color.");
      return;
    }

    if (color.length === 7) {
      color += "ff";
    }

    try {
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
      fetchData()
      nameInput.value = "";
      colorInput.value = "#ffffff";
      updateTotalPages();
      renderCurrentPage();
      addTrackEventListeners();
    } catch (error) {
      console.error("Error creating car:", error);
    }
  });



  update.addEventListener("click", () => updateCar(nameInput, updateColorInput));

  const deleteButton = document.getElementById("delete");

  deleteButton.addEventListener("click", () =>
    deleteCar(nameInput, updateColorInput)
  );



  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", () =>
    startAllCarAnimations(fetchedObjects)
  );

  const resumeButton = document.querySelector(".resume-button");
  resumeButton.addEventListener("click", () => {
    const carDivs = document.querySelectorAll(".car");
    carDivs.forEach((carDiv) => {
      carDiv.style.transition = "none";
      carDiv.style.left = "70px";
    });
  });


  const trophyDiv = document.querySelector('.tropy');
  trophyDiv.addEventListener('click', moveToWinners);


  const garageDiv = document.querySelector('.garage');
  garageDiv.addEventListener('click', moveToGarage);
});
