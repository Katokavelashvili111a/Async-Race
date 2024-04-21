
export function createInitialHTML() {
    const body = document.querySelector('.body-wrapper');

    const header = document.createElement('header');

    const nav = document.createElement('nav');

    const ul = document.createElement('ul');
    ul.classList.add('pages-nav');

    const garageLi = document.createElement('li');
    garageLi.classList.add('garage', 'active');
    const garageImg = document.createElement('img');
    garageImg.src = '../public/garage.png';
    garageImg.alt = 'garage icon';
    garageLi.appendChild(garageImg);
    ul.appendChild(garageLi);

    const trophyLi = document.createElement('li');
    trophyLi.classList.add('tropy');
    const trophyImg = document.createElement('img');
    trophyImg.src = '../public/tropy.png';
    trophyImg.alt = 'trophy icon';
    trophyLi.appendChild(trophyImg);
    ul.appendChild(trophyLi);

    nav.appendChild(ul);
    header.appendChild(nav);

    const headerGroups = [
        `<div class="header-group update-delete">
            <h3>Update | Delete car</h3>
            <div class="inputs">
              <input
                type="text"
                disabled
                class="update-name-input"
                id="update-name"
              />
              <input
                type="color"
                disabled
                class="update-color-input"
                id="update-color"
              />
            </div>
            <div class="buttons">
              <button class="update" id="update">Update</button>
              <button class="delete" id="delete">Delete</button>
            </div>
        </div>`,
        `<div class="header-group create-car">
            <h3>Create car</h3>
            <div class="inputs">
              <input type="text" required />
              <input
                type="color"
                id="colorInput"
                name="color"
                value="#ffffff"
                required
                pattern="#[0-9A-Fa-f]{6}"
              />
            </div>
            <div class="buttons">
              <button id="create">Create</button>
              <button id="generate">Generate Cars</button>
            </div>
        </div>`,
        `<div class="header-group race-car">
            <h3>Race cars</h3>
            <div class="start-resume-buttons">
              <button class="start-button" id="start-button">
                <img src="../public/start.png" /><span>Start</span>
              </button>
              <button class="resume-button">
                <span><img src="../public/resume.png" /><span>Resume</span></span>
              </button>
            </div>
        </div>`
    ];

    headerGroups.forEach(group => {
        const div = document.createElement('div');
        div.innerHTML = group;
        header.appendChild(div.firstChild);
    });

    body.appendChild(header);

    const main = document.createElement('main');

    const mainContent = `
      <div class="race-header">
        <div class="note">
          <h2>Note:</h2>
          <p>1. To update and delete a car, click on the car.</p>
          <p class="start-note">2. To start engine click "A" and to stop click "B".</p>
        </div>
        <div class="page-controler">
          <button class="prev-button"><</button>
          <h2>
            <span id="current-page">1 </span>of <span id="total-pages">1</span>
          </h2>
          <button class="next-button">></button>
        </div>
        <div class="winers-page-controler">
          <button class="winers-prev-button"><</button>
          <h2>
            <span id="winers-current-page">1 </span>of <span id="total-pages">1</span>
          </h2>
          <button class="winers-next-button">></button>
        </div>
      </div>
      <div class="race-winer-wrapper">
        <section class="race-wrapper active">
          <div class="tracks-wrapper" id="tracks"></div>
          <div class="finish-line start-finish"></div>
          <div class="finish-line end-finish"></div>
        </section>
        <section class="winner-group">
          <div class="winners-wrapper">
            <div class="track-header" id="">
              <h2 class="title car-header-image">Car</h2>
              <h2 class="title car-header-title">Name</h2>
              <h2 class="title car-header-place">Wins</h2>
              <h2 class="title car-header-speed">Best Time</h2>
            </div>
            <div class="winner-wrapper" id="winner-wrapper">
            </div>
            <div class="line first"></div>
            <div class="line second"></div>
            <div class="line third"></div>
          </div>
        </section>
      </div>
    `;

    main.innerHTML = mainContent;

    body.appendChild(main);
}
