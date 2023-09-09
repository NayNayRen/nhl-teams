function loadScript() {
  const burgerMenu = document.querySelector(".burger-menu");
  const upArrow = document.querySelector(".up-arrow");
  const nhlCopyright = document.querySelector('.nhl-copyright');
  const main = document.querySelector('.main');
  const leagueHeaderLogo = document.querySelector('.main-header-logo');
  const mainContainer = document.querySelector('.main-container');

  // team dropdown containers
  const teamsDropdownContainer = document.querySelector('.teams-dropdown-container');
  const teamsDropdownButton = document.querySelector('.teams-dropdown-button');
  const teamsDropdownList = document.querySelector('.teams-dropdown-list');
  const teamSummaryDropdownContainer = document.querySelector('.team-summary-dropdown-container');
  const teamSummaryDropdownButton = document.querySelector('.team-summary-dropdown-button');
  const teamSummaryDropdownList = document.querySelector('.team-summary-dropdown-list');

  // roster dropdown containers
  const rosterDropdownContainer = document.querySelector('.roster-dropdown-container');
  const rosterDropdownButton = document.querySelector('.roster-dropdown-button');
  const rosterDropdownList = document.querySelector('.roster-dropdown-list');

  // about dropdown containers
  const aboutDropdownContainer = document.querySelector('.about-dropdown-container');
  const aboutDropdownButton = document.querySelector('.about-dropdown-button');
  const aboutDropdownList = document.querySelector('.about-dropdown-list');

  // single player data containers
  const playerContainerTransition = document.querySelector('.player-container-transition');
  const playerCloseButton = document.querySelector('.player-close-button');
  const playerNameNumberContainer = document.querySelector('.player-name-number-container');
  const playerHistoryName = document.querySelector('.player-history-name');

  // player stats containers
  const playerSummary = document.querySelector('.player-summary');
  const statsHeading = document.querySelector('.stats-heading');
  const singleSeasonRow = document.querySelector('.singleS-row');
  const careerRegularSeasonRow = document.querySelector('.careerRS-row');
  const seasonPlayoffsRow = document.querySelector('.seasonPO-row');
  const careerPlayoffRow = document.querySelector('.careerPO-row');
  const playerHistoryHeading = document.querySelector('.player-history-heading');
  const playerHistoryButton = document.querySelector('.player-history-button');
  const playerHistoryTransition = document.querySelector('.player-history-transition');
  const playerTeamHistoryTable = document.querySelector('.player-team-history');

  // center data containers
  const playerSummaryScroll = document.querySelector('#player-summary-scroll');
  const playerHistoryScroll = document.querySelector('#player-history-scroll');
  const mainHeaderNameLogo = document.querySelector('.main-header-name-logo');

  // team stats containers
  const teamContainerTransition = document.querySelector('.team-container-transition');
  const teamCloseButton = document.querySelector('.team-close-button');
  const teamStatsHeading = document.querySelector('.team-stats-heading');
  const teamSingleSeasonRow = document.querySelector('.team-singleS-row');
  const teamRegularSeasonRankingRow = document.querySelector('.team-regularSR-row');

  const teamSeasonDropdownContainer = document.querySelector('.team-season-dropdown-container');
  const teamSeasonDropdownButton = document.querySelector('.team-season-dropdown-button');
  const teamSeasonDropdownList = document.querySelector('.team-season-dropdown-list');

  // league data containers
  const leagueStandingsHeadingContainer = document.querySelector('.league-standings-heading-container');
  const leagueStandingsTableHeading = document.querySelector('.league-standings-table-heading');
  const leagueStandingsTable = document.querySelector('.league-standings-table');
  // selection buttons
  const leagueButton = document.querySelector('.league-button');
  const eastButton = document.querySelector('.east-button');
  const westButton = document.querySelector('.west-button');
  const metroButton = document.querySelector('.metro-button');
  const atlanticButton = document.querySelector('.atlantic-button');
  const centralButton = document.querySelector('.central-button');
  const pacificButton = document.querySelector('.pacific-button');
  const leagueSelectionButtons = document.querySelectorAll('div.league-standings-selection-container button');
  // division arrays
  const metro = [];
  const atlantic = [];
  const central = [];
  const pacific = [];
  const east = [];
  const west = [];
  const league = [];
  // default api
  const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
  };

  // VASY ID FOR TESTING PLAYERS
  // 8476883

  // URL FOR PLAYER HEADSHOTS
  // http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg

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

  async function showLeagueStandings() {
    const leagueStandings = await getLeagueStandings(api.baseUrl, '20222023');
    const season = leagueStandings.records[0].season;
    const firstHalfSeason = season.slice(0, 4);
    const secondHalfSeason = season.slice(4);

    league.push(...leagueStandings.records[0].teamRecords, ...leagueStandings.records[1].teamRecords, ...leagueStandings.records[2].teamRecords, ...leagueStandings.records[3].teamRecords);
    league.sort((a, b) => b.points - a.points);
    // east
    metro.push(leagueStandings.records[0]);
    atlantic.push(leagueStandings.records[1]);
    east.push(...metro[0].teamRecords, ...atlantic[0].teamRecords);
    east.sort((a, b) => b.points - a.points);
    // west
    central.push(leagueStandings.records[2]);
    pacific.push(leagueStandings.records[3]);
    west.push(...central[0].teamRecords, ...pacific[0].teamRecords);
    west.sort((a, b) => b.points - a.points);
    // initial table build
    buildLeagueStandings(leagueStandingsTableHeading, leagueStandingsTable, league);
    leagueStandingsHeadingContainer.innerHTML = `
      <h2>NHL League Standings</h2>
      <p>${firstHalfSeason}/${secondHalfSeason}</p>
    `;
    // all table builds from button clicks
    leagueSelectionButtons.forEach((button) => {
      leagueButton.addEventListener('click', () => {
        loadAlternateLogo('nhl');
        buildLeagueStandings(leagueStandingsTableHeading, leagueStandingsTable, league);
        leagueStandingsHeadingContainer.innerHTML = `
          <h2>NHL League Standings</h2>
          <p>${firstHalfSeason}/${secondHalfSeason}</p>
        `;
        if (button.classList.contains('active-standings-selection')) {
          button.classList.remove('active-standings-selection');
        }
        leagueButton.classList.add('active-standings-selection');
      });
      eastButton.addEventListener('click', () => {
        loadAlternateLogo('eastern');
        buildConferenceStandings(leagueStandingsTableHeading, leagueStandingsTable, east);
        leagueStandingsHeadingContainer.innerHTML = `
          <h2>Eastern Conference Standings</h2>
          <p>${firstHalfSeason}/${secondHalfSeason}</p>
          `;
        if (button.classList.contains('active-standings-selection')) {
          button.classList.remove('active-standings-selection');
        }
        eastButton.classList.add('active-standings-selection');
      });
      westButton.addEventListener('click', () => {
        loadAlternateLogo('western');
        buildConferenceStandings(leagueStandingsTableHeading, leagueStandingsTable, west);
        leagueStandingsHeadingContainer.innerHTML = `
          <h2>Western Conference Standings</h2>
          <p>${firstHalfSeason}/${secondHalfSeason}</p>
        `;
        if (button.classList.contains('active-standings-selection')) {
          button.classList.remove('active-standings-selection');
        }
        westButton.classList.add('active-standings-selection');
      });
      metroButton.addEventListener('click', () => {
        loadAlternateLogo('metro');
        buildDivisionStandings(leagueStandingsTableHeading, leagueStandingsTable, metro);
        leagueStandingsHeadingContainer.innerHTML = `
          <h2>Metro Division Standings</h2>
          <p>${firstHalfSeason}/${secondHalfSeason}</p>
        `;
        if (button.classList.contains('active-standings-selection')) {
          button.classList.remove('active-standings-selection');
        }
        metroButton.classList.add('active-standings-selection');
      });
      atlanticButton.addEventListener('click', () => {
        loadAlternateLogo('atlantic');
        buildDivisionStandings(leagueStandingsTableHeading, leagueStandingsTable, atlantic);
        leagueStandingsHeadingContainer.innerHTML = `
          <h2>Atlantic Division Standings</h2>
          <p>${firstHalfSeason}/${secondHalfSeason}</p>
        `;
        if (button.classList.contains('active-standings-selection')) {
          button.classList.remove('active-standings-selection');
        }
        atlanticButton.classList.add('active-standings-selection');
      });
      centralButton.addEventListener('click', () => {
        loadAlternateLogo('central');
        buildDivisionStandings(leagueStandingsTableHeading, leagueStandingsTable, central);
        leagueStandingsHeadingContainer.innerHTML = `
          <h2>Central Division Standings</h2>
          <p>${firstHalfSeason}/${secondHalfSeason}</p>
        `;
        if (button.classList.contains('active-standings-selection')) {
          button.classList.remove('active-standings-selection');
        }
        centralButton.classList.add('active-standings-selection');
      });
      pacificButton.addEventListener('click', () => {
        loadAlternateLogo('pacific');
        buildDivisionStandings(leagueStandingsTableHeading, leagueStandingsTable, pacific);
        leagueStandingsHeadingContainer.innerHTML = `
          <h2>Pacific Division Standings</h2>
          <p>${firstHalfSeason}/${secondHalfSeason}</p>
        `;
        if (button.classList.contains('active-standings-selection')) {
          button.classList.remove('active-standings-selection');
        }
        pacificButton.classList.add('active-standings-selection');
      });
    });
  }

  // populates all teams dropdown
  async function populateTeamDropdown() {
    const data = await getAllTeams();
    const teams = data.teams.map((team) => {
      return [team.name, team.id];
    }).sort();
    nhlCopyright.innerText = data.copyright;
    teamsDropdownList.innerHTML = teams.map(team => `
      <a href='#teams'>
        <li id='${team[1]}'>
          <span class='team-dropdown-name'>${team[0]}</span>
          <div class="team-dropdown-logo">
            <img src='img/${team[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${team[0]} Logo" width="300" height="308">
          </div>
        </li>
      </a>
    `).join('');
    let teamDropdownNames = document.querySelectorAll('.team-dropdown-name');
    teamDropdownNames.forEach((teamName) => {
      teamName.addEventListener('click', (e) => {
        teamsDropdownButton.value = e.target.innerText;
        rosterDropdownButton.value = 'Team Roster...';
        teamsDropdownList.classList.remove('dropdown-list-toggle');
        getTeam(e.target.innerText);
        playerHistoryTransition.classList.remove('transition-container-toggle');
        setTimeout(() => {
          // closes player container
          playerContainerTransition.classList.remove('transition-container-toggle');
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
        teamSummaryDropdownList.replaceChildren();
        teamSummaryDropdownList.innerHTML = `
        <li>
          <h4>First Year :</h4>
          <span>
            ${data.teams[i].firstYearOfPlay}
          </span>
        </li>
        <li>
          <h4>Conference :</h4>
          <span>
            ${data.teams[i].conference.name}
          </span>
        </li>
        <li>
          <h4>Division :</h4>
          <span>
            ${data.teams[i].division.name}
          </span>
        </li>
        <li>
          <h4>Venue :</h4>
          <span>
            ${data.teams[i].venue.name}
          </span>
        </li>
        <li class="team-site">
          <h4>Website :</h4>
          <span>
          <a href='${data.teams[i].officialSiteUrl}' title='${data.teams[i].name} Website' target='_blank'>${data.teams[i].name} 
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden='false'></i>
          </a>
          </span>
        </li>
        `;
        main.style.backgroundImage = `
        linear-gradient(180deg,
          rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.5)),
        url("img/${data.teams[i].name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png")`;
        mainContainer.style.backgroundImage = `
          linear-gradient(180deg,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0.75)),
          url("img/${data.teams[i].name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png")`;
        mainHeaderNameLogo.innerHTML = `
          <h1>${data.teams[i].name}</h1>
          <div class="main-header-logo">
            <img src='img/${data.teams[i].name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data.teams[i].name} Logo" width="300" height="308">
          </div>
          `;
        // console.log(typeof data.teams[i].firstYearOfPlay);
        teamsDropdownContainer.children[0].classList.remove('rotate');
        populateRosterDropdown(data.teams[i].id);
        showTeamStats(data.teams[i].id, data.teams[i].firstYearOfPlay, '20232024');
        showTeamSchedule(data.teams[i].id);
        setTimeout(() => {
          // opens roster menu
          teamContainerTransition.classList.add('transition-container-toggle');
          rosterDropdownList.classList.add('dropdown-list-toggle');
          rosterDropdownContainer.children[0].classList.add('rotate');
        }, 500);
      }
    }
  }

  // teams single season stats
  async function showTeamStats(id, firstYear, season) {
    let firstTeamYear = Number(firstYear);
    let singleSeason = await getTeamSeasonStats(api.baseUrl, id, season);
    let firstHalfSeason = season.slice(0, 4);
    let secondHalfSeason = season.slice(4);
    let teamsSeasons = getAllTeamSeasons(firstTeamYear, 2023, 1).reverse();
    // console.log(teamsSeasons);
    buildTeamSingleSeasonHeading(teamStatsHeading);
    buildTeamSS(teamSingleSeasonRow, singleSeason);
    buildTeamRegularSR(teamRegularSeasonRankingRow, singleSeason);
    teamSeasonDropdownButton.value = `${firstHalfSeason}/${secondHalfSeason}`;
    teamSeasonDropdownList.innerHTML = teamsSeasons.map(season =>
      `<li class='team-season-selection'>${season}/${season + 1}</li>`
    ).join('');
    let teamSeasonSelection = document.querySelectorAll('.team-season-selection');
    teamSeasonSelection.forEach((seasonSelection) => {
      seasonSelection.addEventListener('click', (e) => {
        firstHalfSeason = e.target.innerText.slice(0, 4);
        secondHalfSeason = e.target.innerText.slice(5);
        let selectedSeason = `${firstHalfSeason}${secondHalfSeason}`;
        teamSeasonDropdownButton.value = e.target.innerText;
        teamSeasonDropdownContainer.children[0].classList.remove('rotate');
        teamSeasonDropdownList.classList.remove('team-season-dropdown-list-toggle');
        showTeamStats(id, firstTeamYear, selectedSeason);
      });
    });
  }

  // teams season schedule
  async function showTeamSchedule(id) {
    const teamSchedule = await getTeamSchedule(api.baseUrl, id);
    // console.log(teamSchedule);
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
      <a href='#players'>
        <li>
          <span id='${player[1]}' class='roster-dropdown-name'>${player[0]}</span>
          <span class='roster-dropdown-position'>${player[3]}</span>
          <span class='roster-dropdown-number'>${player[2]}</span>
        </li>
      </a>
      `).join('');
    let rosterDropdownNames = document.querySelectorAll('.roster-dropdown-name');
    rosterDropdownNames.forEach((rosterName) => {
      rosterName.addEventListener('click', (e) => {
        getPlayer(e.target.getAttribute('id'));
        rosterDropdownButton.value = e.target.innerText;
        // closes roster after player selected
        rosterDropdownList.classList.remove('dropdown-list-toggle');
        rosterDropdownContainer.children[0].classList.remove('rotate');
        playerHistoryTransition.classList.remove('transition-container-toggle');
        setTimeout(() => {
          playerSummaryScroll.scrollLeft -= playerSummaryScroll.scrollWidth;
          playerHistoryScroll.scrollLeft -= playerSummaryScroll.scrollWidth;
        }, 500);
      });
    });
  }

  // gets single player data
  async function getPlayer(id) {
    const response = await fetch(`${api.baseUrl}/people/${id}`);
    const data = await response.json();
    const profileImage = `http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`;
    // console.log(data.people[0]);
    if (data.people[0].primaryNumber === undefined) {
      playerNameNumberContainer.replaceChildren();
      playerNameNumberContainer.innerHTML = `
      <h2 class="player-name">${data.people[0].fullName}
        <div class="player-profile">
          <img src='${profileImage}' onerror="javascript:this.src='img/male-profile.png'" alt="${data.people[0].fullName}" width="168" height="168">
        </div>
      </h2>
      <p class="player-number">--</p>
    `;
    } else {
      playerNameNumberContainer.replaceChildren();
      playerNameNumberContainer.innerHTML = `
      <h2 class="player-name">${data.people[0].fullName}
        <div class="player-profile">
          <img src='${profileImage}' onerror="javascript:this.src='img/male-profile.png'" alt="${data.people[0].fullName}" width="168" height="168">
        </div>
      </h2>
      <p class="player-number">${data.people[0].primaryNumber}</p>
      `;
    }
    showPlayerStats(data.people[0].id, '20232024');
    getPlayerTeamHistory(api.baseUrl, data.people[0].id);
    playerSummary.replaceChildren();
    playerSummary.innerHTML = `
      <li>
        <span>Height</span>
        <span class="player-height">${data.people[0].height}</span>
      </li>
      <li>
        <span>Weight</span>
        <span class="player-weight">${data.people[0].weight} lbs</span>
      </li>
      <li>
        <span>Age</span>
        <span class="player-age">${data.people[0].currentAge}</span>
      </li>
      <li>
        <span>Position</span>
        <span class="player-position">${data.people[0].primaryPosition.name}</span>
      </li>
      <li>
        <span>Shoots</span>
        <span class="player-shoots">${data.people[0].shootsCatches}</span>
      </li>
      <li>
        <span>DOB</span>
        <span class="player-dob">${data.people[0].birthDate}</span>
      </li>
      <li>
        <span>Birthplace</span>
        <span class="player-birthplace">${data.people[0].birthCity}, ${data.people[0].birthCountry}</span>
      </li>
    `;
    playerHistoryName.innerText = `${data.people[0].fullName}`;
    setTimeout(() => {
      playerContainerTransition.classList.add('transition-container-toggle');
    }, 500);
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
    const playerTeamHistory = await getPlayerTeamHistory(api.baseUrl, id);
    const firstHalfSeason = season.slice(0, 4);
    const secondHalfSeason = season.slice(4);
    // stats for goalies
    if (data.people[0].primaryPosition.name === 'Goalie') {
      buildGoalieTableHeading(statsHeading);
      // goalie single season
      if (singleSeason.stats[0].splits[0] === undefined) {
        singleSeasonRow.innerHTML = `
          <p title="Regular Season">${firstHalfSeason}/${secondHalfSeason}</p>
          <p>No stats available...</p>
        `;
      } else {
        buildGoalieSS(singleSeasonRow, firstHalfSeason, secondHalfSeason, singleSeason);
      }
      // goalie career regular season
      if (careerRegularSeason.stats[0].splits[0] === undefined) {
        careerRegularSeasonRow.innerHTML = `
          <p title="Career Regular Season">Career RS</p>
          <p>No stats available...</p>
      `;
      } else {
        buildGoalieCRS(careerRegularSeasonRow, careerRegularSeason);
      }
      // goalie season playoffs
      if (seasonPlayoffs.stats[0].splits[0] === undefined) {
        seasonPlayoffsRow.innerHTML = `
          <p title="Season Playoffs">${firstHalfSeason}/${secondHalfSeason} PO</p>
          <p>No stats available...</p>
        `;
      } else {
        buildGoalieSPO(seasonPlayoffsRow, firstHalfSeason, secondHalfSeason, seasonPlayoffs);
      }
      // goalie career playoffs
      if (careerPlayoffs.stats[0].splits[0] === undefined) {
        careerPlayoffRow.innerHTML = `
          <p title="Career Playoffs">Career PO</p>
          <p>No stats available...</p>
      `;
      } else {
        buildGoalieCPO(careerPlayoffRow, careerPlayoffs);
      }
      buildGoalieTH(playerTeamHistoryTable, playerHistoryHeading, playerTeamHistory);
    }
    // stats for skaters
    else {
      buildSkaterTableHeading(statsHeading);
      // skater single season
      if (singleSeason.stats[0].splits[0] === undefined) {
        singleSeasonRow.innerHTML = `
          <p title="Regular Season">${firstHalfSeason}/${secondHalfSeason}</p>
          <p>No stats available...</p>
        `;
      } else {
        buildSkaterSS(singleSeasonRow, firstHalfSeason, secondHalfSeason, singleSeason);
      }
      // skater career regular season
      if (careerRegularSeason.stats[0].splits[0] === undefined) {
        careerRegularSeasonRow.innerHTML = `
          <p title="Career Regular Season">Career RS</p>
          <p>No stats available...</p>
      `;
      } else {
        buildSkaterCRS(careerRegularSeasonRow, careerRegularSeason);
      }
      // skater season playoffs
      if (seasonPlayoffs.stats[0].splits[0] === undefined) {
        seasonPlayoffsRow.innerHTML = `
          <p title="Season Playoffs">${firstHalfSeason}/${secondHalfSeason} PO</p>
          <p>No stats available...</p>
        `;
      } else {
        buildSkaterSPO(seasonPlayoffsRow, firstHalfSeason, secondHalfSeason, seasonPlayoffs);
      }
      // skater career playoffs
      if (careerPlayoffs.stats[0].splits[0] === undefined) {
        careerPlayoffRow.innerHTML = `
          <p title="Career Playoffs">Career PO</p>
          <p>No stats available...</p>
      `;
      } else {
        buildSkaterCPO(careerPlayoffRow, careerPlayoffs)
      }
      buildSkaterTH(playerTeamHistoryTable, playerHistoryHeading, playerTeamHistory);
    }
  }

  // show and hide up arrow
  function activateUpArrow() {
    if (document.documentElement.scrollTop > 0) {
      upArrow.style.right = "10px";
    } else {
      upArrow.style.right = "-60px";
    }
  }

  function loadAlternateLogo(image) {
    leagueHeaderLogo.innerHTML = `
    <img src="img/${image}-logo.png" alt="${image} Logo" width="1000" height="1000">
    `;
  }

  const getAllTeamSeasons = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
  // getAllTeamSeasons(1991, 2023, 1).map((season) => {
  //   console.log(`${season}/${season + 1}`);
  // });

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

  // NAVIGATION DROPDOWNS
  teamsDropdownButton.addEventListener('click', () => {
    let teamLogos = document.querySelectorAll('.team-dropdown-logo');
    teamLogos.forEach((logo) => {
      logo.style.display = 'flex';
    });
    teamsDropdownContainer.children[0].classList.toggle('rotate');
    teamsDropdownList.classList.toggle('dropdown-list-toggle');
  });
  rosterDropdownButton.addEventListener('click', () => {
    rosterDropdownContainer.children[0].classList.toggle('rotate');
    rosterDropdownList.classList.toggle('dropdown-list-toggle');
  });
  teamSummaryDropdownButton.addEventListener('click', () => {
    teamSummaryDropdownContainer.children[0].classList.toggle('rotate');
    teamSummaryDropdownList.classList.toggle('dropdown-list-toggle');
  });
  aboutDropdownButton.addEventListener('click', () => {
    aboutDropdownContainer.children[0].classList.toggle('rotate');
    aboutDropdownList.classList.toggle('dropdown-list-toggle');
  });
  // TEAM STATS CLOSE BUTTON
  teamCloseButton.addEventListener('click', () => {
    teamContainerTransition.classList.remove('transition-container-toggle');
  });
  teamSeasonDropdownButton.addEventListener('click', () => {
    teamSeasonDropdownContainer.children[0].classList.toggle('rotate');
    teamSeasonDropdownList.classList.toggle('team-season-dropdown-list-toggle');
  });
  // PLAYER CLOSE BUTTON
  playerCloseButton.addEventListener('click', () => {
    playerContainerTransition.classList.remove('transition-container-toggle');
    playerHistoryTransition.classList.remove('transition-container-toggle');
  });
  // PLAYER HISTORY TOGGLE BUTTON
  playerHistoryButton.addEventListener('click', () => {
    playerHistoryTransition.classList.toggle('transition-container-toggle');
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
  showLeagueStandings();
}

window.addEventListener('load', () => {
  loadScript();
});
