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
  const playerStats = document.querySelector('.player-stats');
  // center data containers
  const mainHeader = document.querySelector('.main-header');
  // default api
  const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
  };

  // very helpful for getting types of stats
  // async function getStatTypes() {
  //   const response = await fetch(`${api.baseUrl}/statTypes`);
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // }
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
          // singleTeamHeader.classList.add('single-team-header-toggle');
          rosterDropdownList.classList.add('dropdown-list-toggle');
          rosterContainer.children[0].classList.add('rotate');
        }, 250);
      }
    }
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
        rosterContainer.children[0].classList.remove('rotate');
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
    getPlayerSingleSeasonStats(data.people[0].id, '20222023');
    setTimeout(() => {
      playerContainer.classList.add('player-container-toggle');
    }, 250);
  }

  // get players stats for a single season
  async function getPlayerSingleSeasonStats(id, season) {
    const response = await fetch(`${api.baseUrl}/people/${id}/stats?stats=statsSingleSeason&season=${season}`);
    const data = await response.json();
    // used to get goalie position
    const playerResponse = await fetch(`${api.baseUrl}/people/${id}`);
    const playerData = await playerResponse.json();
    const careerRegularSeason = await getPlayerCareerRegularSeasonStats(id);
    // console.log(careerRegularSeason);
    // starts at(0) and goes no further(4)
    const firstHalfSeason = season.slice(0, 4);
    const secondHalfSeason = season.slice(4);
    if (data.stats[0].splits[0] === undefined) {
      playerStats.innerHTML = `
    <tr>
      <th>There are no stats to diplay.</th>
    </tr>
    `;
    }
    // stats for goalies
    else if (playerData.people[0].primaryPosition.name === 'Goalie') {
      playerStats.innerHTML = `
      <tr>
        <th>Season</th>
        <th title="Games Played">GP</th>
        <th title="Games Started">GS</th>
        <th title="Wins">W</th>
        <th title="Losses">L</th>
        <th title="Ties">T</th>
        <th title="Shoot Outs">SO</th>
        <th title="Overtime">OT</th>
        <th title="Shots Against">SA</th>
        <th title="Saves">SV</th>
        <th title="Save %">SV%</th>
        <th title="Goals Allowed">GA</th>
        <th title="Goals Against Average">GAA</th>
        <th title="Time on Ice">TOI</th>
        <th title="Total TOI">TTOI</th>
      </tr>
      <tr>
        <td title="Regular Season">${firstHalfSeason}/${secondHalfSeason}</td>
        <td>${data.stats[0].splits[0].stat.games}</td>
        <td>${data.stats[0].splits[0].stat.gamesStarted}</td>
        <td>${data.stats[0].splits[0].stat.wins}</td>
        <td>${data.stats[0].splits[0].stat.losses}</td>
        <td>${data.stats[0].splits[0].stat.ties}</td>
        <td>${data.stats[0].splits[0].stat.shutouts}</td>
        <td>${data.stats[0].splits[0].stat.ot}</td>
        <td>${data.stats[0].splits[0].stat.shotsAgainst}</td>
        <td>${data.stats[0].splits[0].stat.saves}</td>
        <td>${Math.round(data.stats[0].splits[0].stat.savePercentage * 100) / 100}</td>
        <td>${data.stats[0].splits[0].stat.goalsAgainst}</td>
        <td>${Math.round(data.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</td>
        <td>${data.stats[0].splits[0].stat.timeOnIcePerGame}</td>
        <td>${data.stats[0].splits[0].stat.timeOnIce}
      </tr>
      <tr>
        <td title="Career Regular Season">Career R.S.</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.games}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.gamesStarted}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.wins}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.losses}</td>
        <td>n/a</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.shutouts}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.ot}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.shotsAgainst}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.saves}</td>
        <td>${Math.round(careerRegularSeason.stats[0].splits[0].stat.savePercentage * 100) / 100}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.goalsAgainst}</td>
        <td>${Math.round(careerRegularSeason.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.timeOnIcePerGame}</td>
        <td>${careerRegularSeason.stats[0].splits[0].stat.timeOnIce}
      </tr>
       `;
    }
    // stats for skaters
    else {
      playerStats.innerHTML = `
    <tr>
      <th>Season</th>
      <th class="Games Played">GP</th>
      <th class="Goals">G</th>
      <th class="Assists">A</th>
      <th class="Points">P</th>
      <th class="Plus Minus">+/-</th>
      <th class="Penalty Minutes">PIM</th>
      <th class="Power Play Goals">PPG</th>
      <th class="Power Play Points">PPP</th>
      <th class="Short Handed Goals">SHG</th>
      <th class="Game Winning Goals">GWG</th>
      <th class="Over Time Goals">OTG</th>
      <th class="Shots">S</th>
      <th class="Shot %">S%</th>
      <th title="Time on Ice">TOI</th>
      <th title="Total TOI">TTOI</th>
    </tr>
    <tr>
      <td>${firstHalfSeason}/${secondHalfSeason}</td>
      <td>${data.stats[0].splits[0].stat.games}</td>
      <td>${data.stats[0].splits[0].stat.goals}</td>
      <td>${data.stats[0].splits[0].stat.assists}</td>
      <td>${data.stats[0].splits[0].stat.points}</td>
      <td>${data.stats[0].splits[0].stat.plusMinus}</td>
      <td>${data.stats[0].splits[0].stat.pim}</td>
      <td>${data.stats[0].splits[0].stat.powerPlayGoals}</td>
      <td>${data.stats[0].splits[0].stat.powerPlayPoints}</td>
      <td>${data.stats[0].splits[0].stat.shortHandedGoals}</td>
      <td>${data.stats[0].splits[0].stat.gameWinningGoals}</td>
      <td>${data.stats[0].splits[0].stat.overTimeGoals}</td>
      <td>${data.stats[0].splits[0].stat.shots}</td>
      <td>${Math.round(data.stats[0].splits[0].stat.shotPct * 100) / 100}</td>
      <td>${data.stats[0].splits[0].stat.timeOnIcePerGame}</td>
      <td>${data.stats[0].splits[0].stat.timeOnIce}
    </tr>
    <tr>
      <td title="Career Regular Season">Career R.S.</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.games}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.goals}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.assists}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.points}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.plusMinus}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.pim}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.powerPlayGoals}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.powerPlayPoints}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.shortHandedGoals}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.gameWinningGoals}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.overTimeGoals}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.shots}</td>
      <td>${Math.round(careerRegularSeason.stats[0].splits[0].stat.shotPct * 100) / 100}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.timeOnIcePerGame}</td>
      <td>${careerRegularSeason.stats[0].splits[0].stat.timeOnIce}
    </tr>
     `;
    }
  }

  // get players regular season career stats
  async function getPlayerCareerRegularSeasonStats(id) {
    const response = await fetch(`${api.baseUrl}/people/${id}/stats?stats=careerRegularSeason`);
    const data = await response.json();
    // console.log(data);
    return data;
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
