function loadScript() {
  const burgerMenu = document.querySelector(".burger-menu");
  const upArrow = document.querySelector(".up-arrow");
  const nhlCopyright = document.querySelector('.nhl-copyright')
  // team dropdown containers
  const teamsDropdownContainer = document.querySelector('.teams-dropdown-container')
  const teamsDropdownButton = document.querySelector('.teams-dropdown-button');
  const teamsDropdownList = document.querySelector('.teams-dropdown-list');
  // roster dropdown containers
  const rosterDropdownContainer = document.querySelector('.roster-dropdown-container');
  const rosterDropdownButton = document.querySelector('.roster-dropdown-button');
  const rosterDropdownList = document.querySelector('.roster-dropdown-list');
  // single team data containers
  const mainHeaderLogo = document.querySelector('.main-center-logo');
  const singleTeamHeader = document.querySelector('.single-team-header');
  const teamConference = document.querySelector('.team-conference');
  const teamDivision = document.querySelector('.team-division');
  const teamVenue = document.querySelector('.team-venue');
  const teamSite = document.querySelector('.team-site');
  // single player data containers
  const transitionHeightContainer = document.querySelector('.transition-height-container');
  const playerCloseButton = document.querySelector('.player-close-button');
  const playerNameNumberContainer = document.querySelector('.player-name-number-container');
  // player summary containers
  const playerHeight = document.querySelector('.player-height');
  const playerWeight = document.querySelector('.player-weight');
  const playerAge = document.querySelector('.player-age');
  const playerDOB = document.querySelector('.player-dob');
  const playerBirthplace = document.querySelector('.player-birthplace');
  const playerShoots = document.querySelector('.player-shoots');
  const playerPosition = document.querySelector('.player-position');
  // player stats containers
  const statsHeading = document.querySelector('.stats-heading');
  const singleSeasonRow = document.querySelector('.singleS-row');
  const careerRegularSeasonRow = document.querySelector('.careerRS-row');
  const seasonPlayoffsRow = document.querySelector('.seasonPO-row');
  const careerPlayoffRow = document.querySelector('.careerPO-row');
  // center data containers
  const mainHeader = document.querySelector('.main-header');
  // default api
  const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
  };

  // VASY ID FOR TESTING PLAYERS
  // 8476883

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

  // populates all teams dropdown
  async function populateTeamDropdown() {
    const data = await getAllTeams();
    const teams = data.teams.map((team) => {
      return [team.name, team.id];
    }).sort();
    nhlCopyright.innerText = data.copyright;
    teamsDropdownList.innerHTML = teams.map(team => `
      <li id='${team[1]}' class='team-dropdown-name'>${team[0]}
        <div class="team-dropdown-logo">
          <img src='img/${team[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png'>
          </div>
        </li>
    `).join('');
    let teamDropdownNames = document.querySelectorAll('.team-dropdown-name');
    teamDropdownNames.forEach((teamName) => {
      teamName.addEventListener('click', (e) => {
        getTeam(e.target.innerText);
        teamsDropdownButton.value = e.target.innerText;
        rosterDropdownButton.value = 'Roster...';
        teamsDropdownList.classList.remove('dropdown-list-toggle');
        setTimeout(() => {
          transitionHeightContainer.classList.remove('transition-container-toggle');
        }, 250);
      });
    });
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
          showTeamStats(data.teams[i].id, '20222023');
          populateRosterDropdown(data.teams[i].id);
          rosterDropdownList.classList.add('dropdown-list-toggle');
          rosterDropdownContainer.children[0].classList.add('rotate');
        }, 250);
      }
    }
  }

  async function showTeamStats(id, season) {
    const singleSeason = await getTeamSeasonStats(api.baseUrl, id, season);
    // console.log(singleSeason);
  }

  // populates team roster dropdown
  async function populateRosterDropdown(teamID) {
    const response = await fetch(`${api.baseUrl}/teams/${teamID}/roster`);
    const data = await response.json();
    const players = data.roster.map(player => {
      if (player.jerseyNumber === undefined) {
        player.jerseyNumber = '--';
      }
      return [player.person.fullName, player.person.id, player.jerseyNumber, player.position.abbreviation];
    }).sort();
    rosterDropdownList.innerHTML = players.map(player => `
      <li>
        <span id='${player[1]}' class='roster-dropdown-name'>${player[0]}</span>
        <span class='roster-dropdown-position'>${player[3]}</span>
        <span class='roster-dropdown-number'>#${player[2]}</span>
      </li>
      `).join('');
    let rosterDropdownNames = document.querySelectorAll('.roster-dropdown-name');
    rosterDropdownNames.forEach((rosterName) => {
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
      <p class="player-number">--</p>
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
      transitionHeightContainer.classList.add('transition-container-toggle');
    }, 250);
  }

  // get players stats for a single season
  async function showPlayerStats(id, season) {
    // used to get player type
    const response = await fetch(`${api.baseUrl}/people/${id}`);
    const data = await response.json();
    const singleSeason = await getPlayerSeasonStats(api.baseUrl, id, season);
    const careerRegularSeason = await getPlayerCareerRegularSeasonStats(api.baseUrl, id);
    const seasonPlayoffs = await getPlayerPlayoffStats(api.baseUrl, id, season);
    const careerPlayoffs = await getPlayerCareerPlayoffStats(api.baseUrl, id);
    // console.log(careerPlayoffs);
    const firstHalfSeason = season.slice(0, 4);
    const secondHalfSeason = season.slice(4);
    // stats for goalies
    if (data.people[0].primaryPosition.name === 'Goalie') {
      buildGoalieTableHeading(statsHeading);
      // goalie single season
      if (singleSeason.stats[0].splits[0] === undefined) {
        singleSeasonRow.innerHTML = `
          <td title="Regular Season">${firstHalfSeason}/${secondHalfSeason}</td>
          <td colspan="3">N/A</td>
        `;
      } else {
        buildGoalieSS(singleSeasonRow, firstHalfSeason, secondHalfSeason, singleSeason);
      }
      // goalie career regular season
      if (careerRegularSeason.stats[0].splits[0] === undefined) {
        careerRegularSeasonRow.innerHTML = `
          <td title="Career Regular Season">Career RS</td>
          <td colspan="3">N/A</td>
      `;
      } else {
        buildGoalieCRS(careerRegularSeasonRow, careerRegularSeason);
      }
      // goalie season playoffs
      if (seasonPlayoffs.stats[0].splits[0] === undefined) {
        seasonPlayoffsRow.innerHTML = `
          <td title="Season Playoffs">${firstHalfSeason}/${secondHalfSeason} PO</td>
          <td colspan="3">N/A</td>
        `;
      } else {
        buildGoalieSPO(seasonPlayoffsRow, firstHalfSeason, secondHalfSeason, seasonPlayoffs);
      }
      // goalie career playoffs
      if (careerPlayoffs.stats[0].splits[0] === undefined) {
        careerPlayoffRow.innerHTML = `
          <td title="Career Playoffs">Career PO</td>
          <td colspan="3">N/A</td>
      `;
      } else {
        buildGoalieCPO(careerPlayoffRow, careerPlayoffs);
      }
    }
    // stats for skaters
    else {
      buildSkaterTableHeading(statsHeading);
      // skater single season
      if (singleSeason.stats[0].splits[0] === undefined) {
        singleSeasonRow.innerHTML = `
          <td title="Regular Season">${firstHalfSeason}/${secondHalfSeason}</td>
          <td colspan="3">N/A</td>
        `;
      } else {
        buildSkaterSS(singleSeasonRow, firstHalfSeason, secondHalfSeason, singleSeason);
      }
      // skater career regular season
      if (careerRegularSeason.stats[0].splits[0] === undefined) {
        careerRegularSeasonRow.innerHTML = `
          <td title="Career Regular Season">Career RS</td>
          <td colspan="3">N/A</td>
      `;
      } else {
        buildSkaterCRS(careerRegularSeasonRow, careerRegularSeason);
      }
      // skater season playoffs
      if (seasonPlayoffs.stats[0].splits[0] === undefined) {
        seasonPlayoffsRow.innerHTML = `
          <td title="Season Playoffs">${firstHalfSeason}/${secondHalfSeason} PO</td>
          <td colspan="3">N/A</td>
        `;
      } else {
        buildSkaterSPO(seasonPlayoffsRow, firstHalfSeason, secondHalfSeason, seasonPlayoffs);
      }
      // skater career playoffs
      if (careerPlayoffs.stats[0].splits[0] === undefined) {
        careerPlayoffRow.innerHTML = `
          <td title="Career Playoffs">Career PO</td>
          <td colspan="3">N/A</td>
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
    transitionHeightContainer.classList.remove('transition-container-toggle');
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
