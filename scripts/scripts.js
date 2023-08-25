function loadScript() {
  const burgerMenu = document.querySelector(".burger-menu");
  const upArrow = document.querySelector(".up-arrow");
  // team containers
  const teamsDropdownContainer = document.querySelector('.teams-dropdown-container')
  const teamsDropdownButton = document.querySelector('.teams-dropdown-button');
  const teamsDropdownList = document.querySelector('.teams-dropdown-list');
  // roster containers
  const rosterContainer = document.querySelector('.roster-container');
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
  const playerSummaryContainer = document.querySelector('.player-summary-container');
  const playerSummaryCloseButton = document.querySelector('.player-summary-close-button');
  // const playerSummary = document.querySelector('.player-summary');
  const playerName = document.querySelector('.player-name');
  const playerHeight = document.querySelector('.player-height');
  const playerWeight = document.querySelector('.player-weight');
  const playerAge = document.querySelector('.player-age');
  const playerDOB = document.querySelector('.player-dob');
  const playerBirthplace = document.querySelector('.player-birthplace');
  const playerShoots = document.querySelector('.player-shoots');
  const playerPosition = document.querySelector('.player-position');
  const playerNumber = document.querySelector('.player-number');
  const playerStats = document.querySelector('.player-stats');
  // center data containers
  const mainHeader = document.querySelector('.main-header');
  // default api
  const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
  };

  // gets all teams
  async function getAllTeams() {
    const response = await fetch(`${api.baseUrl}/teams`);
    const data = await response.json();
    return data;
  }

  // populates all teams dropdown
  async function populateTeamDropdown() {
    const data = await getAllTeams();
    teamsDropdownList.innerHTML = data.teams.map(team => `
    <li class='team-dropdown-name'>${team.name}
      <div class="team-logo">
        <img src='img/${team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png'>
        </div>
      </li>
  `).sort().join('');
    let teamDropdownName = document.querySelectorAll('.team-dropdown-name');
    teamDropdownName.forEach((teamName) => {
      teamName.addEventListener('click', (e) => {
        getTeam(e.target.innerText);
        teamsDropdownButton.value = e.target.innerText;
        rosterDropdownButton.value = 'Roster...';
        teamsDropdownList.classList.remove('dropdown-list-toggle');
        setTimeout(() => {
          playerSummaryContainer.classList.remove('player-summary-container-toggle');
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
        rosterContainer.children[0].classList.remove('rotate');
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
        mainHeaderLogo.innerHTML = `<img src='img/${data.teams[i].name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png'>`;
        mainHeader.innerText = data.teams[i].name;
        teamsDropdownContainer.children[0].classList.remove('rotate');
        setTimeout(() => {
          populateRosterDropdown(data.teams[i].id);
          // singleTeamHeader.classList.add('single-team-header-toggle');
          rosterDropdownList.classList.add('dropdown-list-toggle');
          rosterContainer.children[0].classList.add('rotate');
        }, 250);
      }
    }
  }

  // gets single player data
  async function getPlayer(id) {
    const response = await fetch(`${api.baseUrl}/people/${id}`);
    const data = await response.json();
    // console.log(data.people[0]);
    playerName.innerText = data.people[0].fullName;
    playerHeight.innerText = data.people[0].height;
    playerWeight.innerText = `${data.people[0].weight} lbs`;
    playerAge.innerText = data.people[0].currentAge;
    playerDOB.innerText = data.people[0].birthDate;
    playerShoots.innerText = data.people[0].shootsCatches;
    playerPosition.innerText = data.people[0].primaryPosition.name;
    playerNumber.innerText = data.people[0].primaryNumber;
    playerBirthplace.innerText = `${data.people[0].birthCity}, ${data.people[0].birthCountry}`;

    getPlayerStats(data.people[0].id);
    setTimeout(() => {
      playerSummaryContainer.classList.add('player-summary-container-toggle');
    }, 250);
  }

  // get players stats
  async function getPlayerStats(id) {
    const response = await fetch(`${api.baseUrl}/people/${id}/stats?stats=statsSingleSeason&season=20222023`);
    const data = await response.json();
    // console.log(data.stats[0].splits[0].stat);
    if (data.stats[0].splits[0] === undefined) {
      playerStats.innerHTML = `
    <tr>
      <th>There are no stats to diplay.</th>
    </tr>
    `;
    } else {
      playerStats.innerHTML = `
    <tr>
      <th>Season</th>
      <th>GP</th>
      <th>G</th>
      <th>A</th>
      <th>P</th>
      <th>+/-</th>
      <th>PIM</th>
      <th>PPG</th>
      <th>PPP</th>
      <th>SHG</th>
      <th>GWG</th>
      <th>OTG</th>
      <th>S</th>
      <th>S%</th>
      <th>TOI</th>
      <th>TTOI</th>
    </tr>
    <tr>
      <td class="season">${data.stats[0].splits[0].season}</td>
      <td class="games-played">${data.stats[0].splits[0].stat.games}</td>
      <td class="goals">${data.stats[0].splits[0].stat.goals}</td>
      <td class="assists">${data.stats[0].splits[0].stat.assists}</td>
      <td class="points">${data.stats[0].splits[0].stat.points}</td>
      <td class="plus-minus">${data.stats[0].splits[0].stat.plusMinus}</td>
      <td class="pim">${data.stats[0].splits[0].stat.pim}</td>
      <td class="power-play-goals">${data.stats[0].splits[0].stat.powerPlayGoals}</td>
      <td class="power-play-points">${data.stats[0].splits[0].stat.powerPlayPoints}</td>
      <td class="ahort-handed-goals">${data.stats[0].splits[0].stat.shortHandedGoals}</td>
      <td class="game-winning-goals">${data.stats[0].splits[0].stat.gameWinningGoals}</td>
      <td class="over-time-goals">${data.stats[0].splits[0].stat.overTimeGoals}</td>
      <td class="shots">${data.stats[0].splits[0].stat.shots}</td>
      <td class="shot-pct">${data.stats[0].splits[0].stat.shotPct}</td>
      <td class="time-on-ice">${data.stats[0].splits[0].stat.timeOnIcePerGame}</td>
      <td class="total-toi">${data.stats[0].splits[0].stat.timeOnIce}
    </tr>
     `;
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
    rosterContainer.children[0].classList.toggle('rotate');
    rosterDropdownList.classList.toggle('dropdown-list-toggle');
  });
  playerSummaryCloseButton.addEventListener('click', () => {
    playerSummaryContainer.classList.remove('player-summary-container-toggle');
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
