function loadScript() {
  const burgerMenu = document.querySelector(".burger-menu");
  const upArrow = document.querySelector(".up-arrow");
  // team dropdown containers
  const teamsDropdownContainer = document.querySelector('.teams-dropdown-container')
  const teamsDropdownButton = document.querySelector('.teams-dropdown-button');
  const teamsDropdownList = document.querySelector('.teams-dropdown-list');
  // roster dropdown containers
  const rosterDropdownContainer = document.querySelector('.roster-dropdown-container');
  const rosterDropdownButton = document.querySelector('.roster-dropdown-button');
  const rosterDropdownList = document.querySelector('.roster-dropdown-list');
  // single team data containers
  const mainHeaderLogo = document.querySelector('.main-header-logo');
  const singleTeamHeader = document.querySelector('.single-team-header');
  const teamConference = document.querySelector('.team-conference');
  const teamDivision = document.querySelector('.team-division');
  const teamVenue = document.querySelector('.team-venue');
  const teamSite = document.querySelector('.team-site');
  // single player data containers
  const playerContainer = document.querySelector('.player-container');
  const playerCloseButton = document.querySelector('.player-close-button');
  const playerNameNumberContainer = document.querySelector('.player-name-number-container');
  const playerHeight = document.querySelector('.player-height');
  const playerWeight = document.querySelector('.player-weight');
  const playerAge = document.querySelector('.player-age');
  const playerDOB = document.querySelector('.player-dob');
  const playerBirthplace = document.querySelector('.player-birthplace');
  const playerShoots = document.querySelector('.player-shoots');
  const playerPosition = document.querySelector('.player-position');
  const playerNumber = document.querySelector('.player-number');
  const statsHeading = document.querySelector('.stats-heading');
  const singleSeasonRow = document.querySelector('.singleS-row');
  const careerRegularSeasonRow = document.querySelector('.careerRS-row');
  const careerPlayoffRow = document.querySelector('.careerPO-row');
  // center data containers
  const mainHeader = document.querySelector('.main-header');
  // default api
  const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
  };

  // very helpful for getting types of stats
  async function getStatTypes() {
    const response = await fetch(`${api.baseUrl}/statTypes`);
    const data = await response.json();
    console.log(data);
    return data;
  }
  // getStatTypes();

  // gets all teams
  async function getAllTeams() {
    const response = await fetch(`${api.baseUrl}/teams`);
    const data = await response.json();
    return data;
  }

  // gets single team data
  async function getTeam(teamDropdownSelection) {
    const data = await getAllTeams();
    const selectedTeam = teamDropdownSelection;
    for (let i = 0; i < data.teams.length; i++) {
      if (selectedTeam === data.teams[i].name) {
        // teamConference.innerText = data.teams[i].conference.name;
        // teamDivision.innerText = data.teams[i].division.name;
        // teamVenue.innerText = data.teams[i].venue.name;
        // teamSite.innerHTML = `<a href='${data.teams[i].officialSiteUrl}' target='_blank'>${data.teams[i].name} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
        mainHeaderLogo.innerHTML = `
          <img src='img/${data.teams[i].name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png'>`;
        mainHeader.innerText = data.teams[i].name;
        teamsDropdownContainer.children[0].classList.remove('rotate');
        setTimeout(() => {
          populateRosterDropdown(data.teams[i].id);
          rosterDropdownList.classList.add('dropdown-list-toggle');
          rosterDropdownContainer.children[0].classList.add('rotate');
        }, 250);
      }
    }
  }

  // populates all teams dropdown
  async function populateTeamDropdown() {
    const data = await getAllTeams();
    teamsDropdownList.innerHTML = data.teams.map(team => `
    <li class='team-dropdown-name'>${team.name}
      <div class="team-dropdown-logo">
        <img src='img/${team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png'>
        </div>
      </li>
  `).sort().join('');
    let teamDropdownLogos = document.querySelectorAll('.team-dropdown-logo');
    let teamDropdownNames = document.querySelectorAll('.team-dropdown-name');
    teamDropdownLogos.forEach((teamLogo) => {
      teamLogo.style.display = 'flex';
    });
    teamDropdownNames.forEach((teamName) => {
      teamName.addEventListener('click', (e) => {
        getTeam(e.target.innerText);
        teamsDropdownButton.value = e.target.innerText;
        rosterDropdownButton.value = 'Roster...';
        teamsDropdownList.classList.remove('dropdown-list-toggle');
        setTimeout(() => {
          playerContainer.classList.remove('player-container-toggle');
        }, 250);
      });
    });
  }

  // populates team roster dropdown
  async function populateRosterDropdown(teamID) {
    const response = await fetch(`${api.baseUrl}/teams/${teamID}/roster`);
    const data = await response.json();
    const players = data.roster.map(player => {
      return [player.person.fullName, player.person.id];
    }).sort();
    rosterDropdownList.innerHTML = players.map(player => `
      <li id='${player[1]}' class='roster-dropdown-name'>${player[0]}</li>
      `).join('');
    let rosterDropdownName = document.querySelectorAll('.roster-dropdown-name');
    rosterDropdownName.forEach((rosterName) => {
      rosterName.addEventListener('click', (e) => {
        getPlayer(e.target.getAttribute('id'));
        rosterDropdownButton.value = e.target.innerText;
        rosterDropdownList.classList.remove('dropdown-list-toggle');
        rosterDropdownContainer.children[0].classList.remove('rotate');
      });
    });
  }

  // gets single player data
  async function getPlayer(id) {
    const response = await fetch(`${api.baseUrl}/people/${id}`);
    const data = await response.json();
    // console.log(data.people[0]);
    if (data.people[0].primaryNumber === undefined) {
      playerNameNumberContainer.innerHTML = `
      <h2 class="player-name">${data.people[0].fullName}</h2>
      <p class="player-number">n/a</p>
    `;
    } else {
      playerNameNumberContainer.innerHTML = `
      <h2 class="player-name">${data.people[0].fullName}</h2>
      <p class="player-number">#${data.people[0].primaryNumber}</p>
      `;
    }
    playerHeight.innerText = data.people[0].height;
    playerWeight.innerText = `${data.people[0].weight} lbs`;
    playerAge.innerText = data.people[0].currentAge;
    playerDOB.innerText = data.people[0].birthDate;
    playerShoots.innerText = data.people[0].shootsCatches;
    playerPosition.innerText = data.people[0].primaryPosition.name;
    playerBirthplace.innerText = `${data.people[0].birthCity}, ${data.people[0].birthCountry}`;
    showPlayerStats(data.people[0].id, '20222023');
    setTimeout(() => {
      playerContainer.classList.add('player-container-toggle');
    }, 250);
  }

  // get players stats for a single season
  async function showPlayerStats(id, season) {
    const playerResponse = await fetch(`${api.baseUrl}/people/${id}`);
    const playerData = await playerResponse.json();
    const singleSeason = await getPlayerSingleSeasonStats(id, season);
    const careerRegularSeason = await getPlayerCareerRegularSeasonStats(id);
    const careerPlayoffs = await getPlayerCareerPlayoffStats(id);
    // console.log(careerPlayoffs);
    const firstHalfSeason = season.slice(0, 4);
    const secondHalfSeason = season.slice(4);
    // stats for goalies
    if (playerData.people[0].primaryPosition.name === 'Goalie') {
      buildGoalieTableHeading(statsHeading);
      if (singleSeason.stats[0].splits[0] === undefined) {
        singleSeasonRow.innerHTML = `
          <td colspan="15">There are no single season stats.</td>
        `;
      } else {
        buildGoalieSS(singleSeasonRow, firstHalfSeason, secondHalfSeason, singleSeason);
      }
      if (careerRegularSeason.stats[0].splits[0] === undefined) {
        careerRegularSeasonRow.innerHTML = `
          <td colspan="15">There are no career regular season stats.</td>
      `;
      } else {
        buildGoalieCRS(careerRegularSeasonRow, careerRegularSeason);
      }
      if (careerPlayoffs.stats[0].splits[0] === undefined) {
        careerPlayoffRow.innerHTML = `
          <td colspan="15">There are no career playoff stats.</td>
      `;
      } else {
        buildGoalieCPO(careerPlayoffRow, careerPlayoffs);
      }
    }
    // stats for skaters
    else {
      buildSkaterTableHeading(statsHeading);
      if (singleSeason.stats[0].splits[0] === undefined) {
        singleSeasonRow.innerHTML = `
          <td colspan="16">There are no single season stats.</td>
        `;
      } else {
        buildSkaterSS(singleSeasonRow, firstHalfSeason, secondHalfSeason, singleSeason);
      }
      if (careerRegularSeason.stats[0].splits[0] === undefined) {
        careerRegularSeasonRow.innerHTML = `
          <td colspan="16">There are no career regular season stats.</td>
      `;
      } else {
        buildSkaterCRS(careerRegularSeasonRow, careerRegularSeason);
      }
      if (careerPlayoffs.stats[0].splits[0] === undefined) {
        careerPlayoffRow.innerHTML = `
          <td colspan="16">There are no career playoff stats.</td>
      `;
      } else {
        buildSkaterCPO(careerPlayoffRow, careerPlayoffs)
      }
    }
  }

  // show and hide up arrow
  function activateUpArrow() {
    if (document.documentElement.scrollTop > 0) {
      upArrow.style.right = "15px";
    } else {
      upArrow.style.right = "-60px";
    }
  }

  // mobile burger menu actions
  burgerMenu.addEventListener("click", () => {
    document
      .querySelector("#burger-overlay")
      .classList.toggle("burger-overlay-dim");
    document
      .querySelector(".header-nav")
      .classList.toggle("navigation-links-toggle");
    document
      .querySelector("#burger-bars-1")
      .classList.toggle("burger-bars-remove");
    document
      .querySelector("#burger-bars-2")
      .classList.toggle("burger-bars-rotate-clockwise");
    document
      .querySelector("#burger-bars-3")
      .classList.toggle("burger-bars-rotate-counter-clockwise");
  });
  // toggles team dropdown
  teamsDropdownButton.addEventListener('click', () => {
    teamsDropdownContainer.children[0].classList.toggle('rotate');
    teamsDropdownList.classList.toggle('dropdown-list-toggle');
  });
  // toggles roster dropdown
  rosterDropdownButton.addEventListener('click', () => {
    rosterDropdownContainer.children[0].classList.toggle('rotate');
    rosterDropdownList.classList.toggle('dropdown-list-toggle');
  });
  playerCloseButton.addEventListener('click', () => {
    playerContainer.classList.remove('player-container-toggle');
  });
  // scroll
  window.addEventListener("scroll", () => {
    activateUpArrow();
  });
  // resize
  window.addEventListener("resize", () => {
    activateUpArrow();
  });
  // load
  activateUpArrow();
  populateTeamDropdown();
}

window.addEventListener('load', () => {
  loadScript();
});
