import { apiUrl } from './data.js';

export async function updateBackendWithWinner(winningCarDiv) {
    try {
      const trackId = winningCarDiv.parentElement.getAttribute("id").split("-")[1];
      const animationDuration = parseFloat(winningCarDiv.style.transitionDuration.replace("s", "")); // Extract animation duration
      const time = animationDuration; 
  
      const existingWinnerResponse = await fetch(`${apiUrl}/winners/${trackId}`);
      
      if (existingWinnerResponse.status === 200) {
        const existingWinnerData = await existingWinnerResponse.json();
        const wins = existingWinnerData.wins + 1;
        
        const response = await fetch(`${apiUrl}/winners/${trackId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: parseInt(trackId),
            wins: wins,
            time: time
          })
        });
  
        if (!response.ok) {
          throw new Error("Failed to update backend with winner information");
        }
  
        const responseData = await response.json();
        console.log("Winner information updated in backend:", responseData);
      } else {
        const response = await fetch(`${apiUrl}/winners`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: parseInt(trackId),
            wins: 1,
            time: time
          })
        });
  
        if (!response.ok) {
          throw new Error("Failed to create new winner record");
        }
  
        const responseData = await response.json();
        console.log("New winner record created in backend:", responseData);
      }
    } catch (error) {
      console.error("Error updating backend with winner information:", error);
    }
  }