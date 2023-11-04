function loadScript() {
  const burgerMenu = document.querySelector(".burger-menu");
  const upArrow = document.querySelector(".up-arrow");
  const nhlCopyright = document.querySelector('.nhl-copyright');
  const leagueHeaderLogo = document.querySelector('.main-header-logo');
  const currentDate = document.querySelector('.current-date');
  const currentTime = document.querySelector('.current-time');

  // team dropdown containers
  const teamsDropdownContainer = document.querySelector('.teams-dropdown-container');
  const teamsDropdownButton = document.querySelector('.teams-dropdown-button');
  const teamsDropdownList = document.querySelector('.teams-dropdown-list');

  // roster dropdown containers
  const rosterDropdownContainer = document.querySelector('.roster-dropdown-container');
  const rosterDropdownButton = document.querySelector('.roster-dropdown-button');
  const rosterDropdownList = document.querySelector('.roster-dropdown-list');

  // team summary dropdown containers
  const teamSummaryDropdownContainer = document.querySelector('.team-summary-dropdown-container');
  const teamSummaryDropdownButton = document.querySelector('.team-summary-dropdown-button');
  const teamSummaryDropdownList = document.querySelector('.team-summary-dropdown-list');

  // about dropdown containers
  const aboutDropdownContainer = document.querySelector('.about-dropdown-container');
  const aboutDropdownButton = document.querySelector('.about-dropdown-button');
  const aboutDropdownList = document.querySelector('.about-dropdown-list');

  // how to dropdown containers
  const howToDropdownContainer = document.querySelector('.how-to-dropdown-container');
  const howToDropdownButton = document.querySelector('.how-to-dropdown-button');
  const howToDropdownList = document.querySelector('.how-to-dropdown-list');

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
  const teamStatsHeading = document.querySelector('.team-stats-heading');
  const teamSingleSeasonRow = document.querySelector('.team-singleS-row');
  const teamRegularSeasonRankingRow = document.querySelector('.team-regularSR-row');
  const teamScheduleHeadingContainer = document.querySelector('.team-schedule-heading-container');
  const teamRegularSeason = document.querySelector('.team-regular-season');
  const regularSeasonFinishedGames = document.querySelector('.team-regular-season-finished-games');
  const teamPreseason = document.querySelector('.team-preseason');
  const preseasonScrollingContainer = document.querySelector('.preseason-scrolling-container');
  const teamSeasonDropdownContainer = document.querySelector('.team-season-dropdown-container');
  const teamSeasonDropdownButton = document.querySelector('.team-season-dropdown-button');
  const teamSeasonDropdownList = document.querySelector('.team-season-dropdown-list');

  // league data containers
  const dailyGamesDate = document.querySelector('.daily-games-date');
  const leagueGameDatesDropdownContainer = document.querySelector('.league-game-dates-dropdown-container');
  const leagueGameDatesDropdownButton = document.querySelector('.league-game-dates-dropdown-button');
  const leagueGameDatesDropdownList = document.querySelector('.league-game-dates-dropdown-list');
  const leagueFinishedGameDatesDropdownContainer = document.querySelector('.league-finished-game-dates-dropdown-container');
  const leagueFinishedGameDatesDropdownButton = document.querySelector('.league-finished-game-dates-dropdown-button');
  const leagueFinishedGameDatesDropdownList = document.querySelector('.league-finished-game-dates-dropdown-list');
  const leagueScheduleContainer = document.querySelector('.league-schedule-container');
  const leagueRegularSeason = document.querySelector('.league-regular-season');
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

  // league arrays
  const league = [];
  const east = [];
  const west = [];
  const metro = [];
  const atlantic = [];
  const central = [];
  const pacific = [];

  // default api
  const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
  };

  const carouselOptions = {
    loop: false,
    rewind: false,
    nav: true,
    autoplay: false,
    autoplayTimeout: 3000,
    smartSpeed: 500,
    autoplayHoverPause: false,
    dots: false,
    touchDrag: true,
    mouseDrag: true,
    navText: [
      "<div class='arrow arrow-left' aria-label='Previous Arrow'><i class='fa fa-arrow-left' aria-hidden='false'></i></div>",
      "<div class='arrow arrow-right' aria-label='Next Arrow'><i class='fa fa-arrow-right' aria-hidden='false'></i></div>",
    ],
    responsive: {
      0: {
        // < 700
        items: 1,
        slideBy: 1,
      },
      700: {
        // 700 - 1000
        items: 2,
        slideBy: 2,
      },
      1000: {
        // > 1000 - 1400
        items: 2,
        slideBy: 2,
      },
      1400: {
        // > 1400
        items: 3,
        slideBy: 3,
      },
    },
  };

  const limitedCarouselOptions = {
    center: false,
    loop: false,
    autoplay: false,
    autoplayTimeout: 3000,
    smartSpeed: 500,
    autoplayHoverPause: false,
    dots: true,
    touchDrag: false,
    mouseDrag: false,
    responsive: {
      0: {
        // < 700
        items: 1,
      },
      700: {
        // 700 - 1000
        items: 2,
      },
      1000: {
        // > 1000 - 1300
        items: 2,
      },
      1300: {
        // > 1300
        items: 3,
      },
    },
  };

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

  async function getAllTeams() {
    const response = await fetch(`${api.baseUrl}/teams`);
    const data = await response.json();
    return data;
  }

  async function getLeagueStandings(api, season) {
    const response = await fetch(`${api}/standings?season=${season}`);
    const data = await response.json();
    return data;
  }

  async function getTeamSeasonStats(api, id, season) {
    const response = await fetch(`${api}/teams/${id}/stats?stats=statsSingleSeason&season=${season}`);
    const data = await response.json();
    return data;
  }

  // shows league schedule
  async function showLeagueSchedules() {
    const currentDate = new Date();
    const currentDateFormatted = currentDate.toDateString();
    const leagueSchedule = await getTeamSchedules(api.baseUrl);
    const $leagueCarousel = $('.league-carousel');
    const regularSeasonDates = [];
    const finishedGames = [];
    dailyGamesDate.innerHTML = `
      <h2>Today : <p>${currentDateFormatted}</p></h2>
    `;
    for (let i = 0; i < leagueSchedule.dates.length; i++) {
      for (let x = 0; x < leagueSchedule.dates[i].games.length; x++) {
        if (leagueSchedule.dates[i].games[x].gameType === 'R') {
          currentDate.setHours(0, 0, 0, 0);
          if (currentDate <= new Date(leagueSchedule.dates[i].games[x].gameDate)) {
            regularSeasonDates.push(new Date(leagueSchedule.dates[i].games[x].gameDate).toDateString());
          }
          if (currentDate > new Date(leagueSchedule.dates[i].games[x].gameDate)) {
            finishedGames.push(new Date(leagueSchedule.dates[i].games[x].gameDate).toDateString());
          }
        }
      }
    }
    finishedGames.reverse();
    // current games
    let noCurrentDuplicateDates = regularSeasonDates.filter((c, index) => {
      return regularSeasonDates.indexOf(c) === index;
    });
    leagueGameDatesDropdownButton.value = noCurrentDuplicateDates[0];
    leagueGameDatesDropdownList.innerHTML =
      noCurrentDuplicateDates.map(dates => `
        <li class="league-game-dates">
          ${dates}
        </li>
    `).join('');
    let leagueGameDates = document.querySelectorAll('.league-game-dates');
    leagueGameDates.forEach((gameDate) => {
      gameDate.addEventListener('click', (e) => {
        if (e.target.innerText === regularSeasonDates[0]) {
          dailyGamesDate.innerHTML = `
          <h2>Today : <p>${e.target.innerText}</p></h2>
        `;
        } else {
          dailyGamesDate.innerHTML = `
          <h2>Upcoming : <p>${e.target.innerText}</p></h2>
          `;
        }
        leagueGameDatesDropdownButton.value = e.target.innerText;
        leagueFinishedGameDatesDropdownButton.value = finishedGames[0];
        buildLeagueSchedules(api.baseUrl, leagueSchedule, leagueRegularSeason, e.target.innerText);
        leagueGameDatesDropdownContainer.children[0].classList.remove('rotate');
        leagueGameDatesDropdownList.classList.remove('league-team-dropdown-list-toggle');
        $leagueCarousel.trigger('destroy.owl.carousel');
        $leagueCarousel.html($leagueCarousel.find('.owl-stage-outer').html()).removeClass('owl-loaded');
        $leagueCarousel.owlCarousel(limitedCarouselOptions);
        let owl = $leagueCarousel.data('owl.carousel');
        let owlDots = document.querySelectorAll('.owl-dot');
        for (let i = 0; i < owlDots.length; i++) {
          owlDots[i].setAttribute('aria-label', 'Carousel to next item.');
          owlDots[i].setAttribute('value', i + 1);
        }
        if (owl._items.length === 1) {
          owl.options.center = true;
          $leagueCarousel.trigger('refresh.owl.carousel');
        }
        if (owl._items.length === 2) {
          owl.options.responsive[1300].items = 2;
          $leagueCarousel.trigger('refresh.owl.carousel');
        }
        if (owl._items.length >= 3) {
          owl.options.responsive[1300].items = 3;
          $leagueCarousel.trigger('refresh.owl.carousel');
        }
      });
    });
    // finished games
    let noFinishedDuplicateDates = finishedGames.filter((c, index) => {
      return finishedGames.indexOf(c) === index;
    });
    leagueFinishedGameDatesDropdownButton.value = noFinishedDuplicateDates[0];
    leagueFinishedGameDatesDropdownList.innerHTML =
      noFinishedDuplicateDates.map(dates => `
        <li class="finished-game-dates">
          ${dates}
        </li>
    `).join('');
    let leagueFinishedGameDates = document.querySelectorAll('.finished-game-dates');
    leagueFinishedGameDates.forEach((gameDate) => {
      gameDate.addEventListener('click', (e) => {
        dailyGamesDate.innerHTML = `
          <h2>Previous : <p>${e.target.innerText}</p></h2>
        `;
        leagueFinishedGameDatesDropdownButton.value = e.target.innerText;
        leagueGameDatesDropdownButton.value = regularSeasonDates[0];
        buildLeagueSchedules(api.baseUrl, leagueSchedule, leagueRegularSeason, e.target.innerText);
        leagueFinishedGameDatesDropdownContainer.children[0].classList.remove('rotate');
        leagueFinishedGameDatesDropdownList.classList.remove('league-team-dropdown-list-toggle');
        $leagueCarousel.trigger('destroy.owl.carousel');
        $leagueCarousel.html($leagueCarousel.find('.owl-stage-outer').html()).removeClass('owl-loaded');
        $leagueCarousel.owlCarousel(limitedCarouselOptions);
        let owl = $leagueCarousel.data('owl.carousel');
        let owlDots = document.querySelectorAll('.owl-dot');
        for (let i = 0; i < owlDots.length; i++) {
          owlDots[i].setAttribute('aria-label', 'Carousel to next item.');
          owlDots[i].setAttribute('value', i + 1);
        }
        if (owl._items.length === 1) {
          owl.options.center = true;
          $leagueCarousel.trigger('refresh.owl.carousel');
        }
        if (owl._items.length === 2) {
          owl.options.responsive[1300].items = 2;
          $leagueCarousel.trigger('refresh.owl.carousel');
        }
        if (owl._items.length >= 3) {
          owl.options.responsive[1300].items = 3;
          $leagueCarousel.trigger('refresh.owl.carousel');
        }
      });
    });

    buildLeagueSchedules(api.baseUrl, leagueSchedule, leagueRegularSeason, currentDateFormatted);
    $leagueCarousel.owlCarousel(limitedCarouselOptions);
    leagueScheduleContainer.style.opacity = '1';
    let owl = $leagueCarousel.data('owl.carousel');
    let owlDots = document.querySelectorAll('.owl-dot');
    for (let i = 0; i < owlDots.length; i++) {
      owlDots[i].setAttribute('aria-label', 'Carousel to next item.');
      owlDots[i].setAttribute('value', i + 1);
    }
    // console.log(owl);
    if (owl._items.length === 1) {
      owl.options.center = true;
      $leagueCarousel.trigger('refresh.owl.carousel');
    }
    if (owl._items.length === 2) {
      owl.options.responsive[1300].items = 2;
      $leagueCarousel.trigger('refresh.owl.carousel');
    }
    if (owl._items.length >= 3) {
      owl.options.responsive[1300].items = 3;
      $leagueCarousel.trigger('refresh.owl.carousel');
    }
  }

  // shows league, conference, and division standings
  async function showLeagueStandings() {
    const leagueStandings = await getLeagueStandings(api.baseUrl, '20232024');
    const season = leagueStandings.records[0].season;
    const firstHalfSeason = season.slice(0, 4);
    const secondHalfSeason = season.slice(4);

    league.push(
      ...leagueStandings.records[0].teamRecords,
      ...leagueStandings.records[1].teamRecords,
      ...leagueStandings.records[2].teamRecords,
      ...leagueStandings.records[3].teamRecords
    );
    league.sort((a, b) => b.points - a.points);
    // east
    metro.push(leagueStandings.records[0]);
    atlantic.push(leagueStandings.records[1]);
    east.push(
      ...metro[0].teamRecords,
      ...atlantic[0].teamRecords
    );
    east.sort((a, b) => b.points - a.points);
    // west
    central.push(leagueStandings.records[2]);
    pacific.push(leagueStandings.records[3]);
    west.push(
      ...central[0].teamRecords,
      ...pacific[0].teamRecords
    );
    west.sort((a, b) => b.points - a.points);
    // initial table build
    buildLeagueStandings(leagueStandingsTableHeading, leagueStandingsTable, league);
    leagueStandingsHeadingContainer.innerHTML = `
      <h2>League Standings</h2>
      <p>${firstHalfSeason}/${secondHalfSeason}</p>
    `;
    // all table builds from button clicks
    leagueSelectionButtons.forEach((button) => {
      leagueButton.addEventListener('click', () => {
        loadAlternateLogo('nhl');
        buildLeagueStandings(leagueStandingsTableHeading, leagueStandingsTable, league);
        leagueStandingsHeadingContainer.innerHTML = `
          <h2>League Standings</h2>
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
      <li id='${team[1]}'>
        <span class='team-dropdown-name'>${team[0]}</span>
        <div class="team-dropdown-logo">
          <img src='img/${team[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${team[0]} Logo" width="100" height="100">
        </div>
      </li>
    `).join('');
    let teamDropdownNames = document.querySelectorAll('.team-dropdown-name');
    teamDropdownNames.forEach((teamName) => {
      teamName.addEventListener('click', (e) => {
        e.preventDefault();
        getTeam(e.target.innerText);
        showTeamSchedules(e.target.innerText);
        $(teamDropdownNames).css('color', '#000');
        e.target.style.color = '#1e90ff';
        teamsDropdownButton.style.color = '#1e90ff';
        teamsDropdownButton.value = e.target.innerText;
        rosterDropdownButton.value = 'Team Roster...';
        setTimeout(() => {
          // used as scrollIntoView for Chrome
          $('html, body').animate({
            scrollTop: $("#teams").offset().top
          });
          playerContainerTransition.classList.remove('transition-container-toggle');
          rosterDropdownList.scrollTop -= rosterDropdownList.scrollHeight;
          preseasonScrollingContainer.scrollLeft -= preseasonScrollingContainer.scrollWidth;
        }, 1000);
        setTimeout(() => {
          teamsDropdownList.classList.remove('dropdown-list-toggle');
          teamsDropdownContainer.children[0].classList.remove('rotate');
        }, 2000);
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
            <h3>First Year :</h3>
            <p>
              ${data.teams[i].firstYearOfPlay}
            </p>
          </li>
          <li>
            <h3>Conference :</h3>
            <p>
              ${data.teams[i].conference.name}
            </p>
          </li>
          <li>
            <h3>Division :</h3>
            <p>
              ${data.teams[i].division.name}
            </p>
          </li>
          <li>
            <h3>Venue :</h3>
            <p>
              ${data.teams[i].venue.name}
            </p>
          </li>
          <li class="team-site">
            <h3>Website :</h3>
            <p>
              <a href='${data.teams[i].officialSiteUrl}' title='${data.teams[i].name} Website' target='_blank' aria-label='External Website Link.'>
              ${data.teams[i].name} 
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden='false'></i>
              </a>
            </p>
          </li>
        `;
        mainHeaderNameLogo.innerHTML = `
          <h1>${data.teams[i].name}</h1>
          <div class="main-header-logo">
            <img src='img/${data.teams[i].name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data.teams[i].name} Logo" width="100" height="100">
          </div>
        `;
        populateRosterDropdown(data.teams[i].id);
        showTeamStats(data.teams[i].id, data.teams[i].firstYearOfPlay, '20232024');
        $('.roster-dropdown-names').css('color', '#000');
        rosterDropdownButton.style.color = '#000';
        mainHeaderNameLogo.style.opacity = '1';
        // setTimeout(() => {
        teamContainerTransition.classList.add('transition-container-toggle');
        // }, 250);
      }
    }
  }

  // gets single team season stats
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
        teamSeasonDropdownList.classList.remove('league-team-dropdown-list-toggle');
        showTeamStats(id, firstTeamYear, selectedSeason);
      });
    });
  }

  // get single team season schedule
  async function showTeamSchedules(teamName) {
    const teamSchedule = await getTeamSchedules(api.baseUrl);
    const season = teamSchedule.dates[0].games[0].season;
    const firstHalfSeason = season.slice(0, 4);
    const secondHalfSeason = season.slice(4);
    const $teamCarousel = $('.team-carousel');
    const $finishedGamesCarousel = $('.finished-games-carousel');
    teamScheduleHeadingContainer.innerHTML = `
      <div>
        <h2>Season Schedule</h2>
        <p class="team-schedule-season">${firstHalfSeason}/${secondHalfSeason}</p>
        <div>
          <div></div><span>Home Game</span>
        </div>
      </div>
      <div class="main-header-logo">
        <img src='img/${teamName.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${teamName} Logo" width="100" height="100">
      </div>
    `;
    buildTeamSchedule(api.baseUrl, teamSchedule, teamName, teamRegularSeason, regularSeasonFinishedGames, teamPreseason);

    $teamCarousel.trigger('destroy.owl.carousel');
    $teamCarousel.html($teamCarousel.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    $teamCarousel.owlCarousel(carouselOptions);

    $finishedGamesCarousel.trigger('destroy.owl.carousel');
    $finishedGamesCarousel.html($finishedGamesCarousel.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    $finishedGamesCarousel.owlCarousel(carouselOptions);
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
        <span class='roster-dropdown-number'>${player[2]}</span>
      </li>
    `).join('');
    let rosterDropdownNames = document.querySelectorAll('.roster-dropdown-name');
    rosterDropdownNames.forEach((rosterName) => {
      rosterName.addEventListener('click', (e) => {
        e.preventDefault();
        getPlayer(e.target.getAttribute('id'));
        $(rosterDropdownNames).css('color', '#000');
        e.target.style.color = '#1e90ff';
        rosterDropdownButton.style.color = '#1e90ff';
        rosterDropdownButton.value = e.target.innerText;
        setTimeout(() => {
          // used as scrollIntoView for Chrome
          $('html, body').animate({
            scrollTop: $("#players").offset().top
          });
          playerHistoryTransition.classList.remove('transition-container-toggle');
          playerSummaryScroll.scrollLeft -= playerSummaryScroll.scrollWidth;
          playerHistoryScroll.scrollLeft -= playerSummaryScroll.scrollWidth;
        }, 1000);
        setTimeout(() => {
          rosterDropdownList.classList.remove('dropdown-list-toggle');
          rosterDropdownContainer.children[0].classList.remove('rotate');
        }, 2000);
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
        <div>
          <p class="player-number">--</p>
          <p class="player-position">${data.people[0].primaryPosition.abbreviation}</p>
        </div>
      `;
    } else {
      playerNameNumberContainer.replaceChildren();
      playerNameNumberContainer.innerHTML = `
        <h2 class="player-name">${data.people[0].fullName}
          <div class="player-profile">
            <img src='${profileImage}' onerror="javascript:this.src='img/male-profile.png'" alt="${data.people[0].fullName}" width="168" height="168">
          </div>
        </h2>
        <div>
        <p class="player-number">${data.people[0].primaryNumber}</p>
        <p class="player-position">${data.people[0].primaryPosition.abbreviation}</p>
        </div>
      `;
    }
    showPlayerStats(data.people[0].id, '20232024');
    getPlayerTeamHistory(api.baseUrl, data.people[0].id);
    playerSummary.replaceChildren();
    playerSummary.innerHTML = `
      <li>
        <h3>Height</h3>
        <p>${data.people[0].height}</p>
      </li>
      <li>
        <h3>Weight</h3>
        <p>${data.people[0].weight} lbs</p>
      </li>
      <li>
        <h3>Age</h3>
        <p>${data.people[0].currentAge}</p>
      </li>
      <li>
        <h3>Position</h3>
        <p>${data.people[0].primaryPosition.name}</p>
      </li>
      <li>
        <h3>Shoots</h3>
        <p>${data.people[0].shootsCatches}</p>
      </li>
      <li>
        <h3>DOB</h3>
        <p>${data.people[0].birthDate}</p>
      </li>
      <li>
        <h3>Birthplace</h3>
        <p>${data.people[0].birthCity}, ${data.people[0].birthCountry}</p>
      </li>
    `;
    playerHistoryName.innerText = `${data.people[0].fullName}`;
    // setTimeout(() => {
    playerContainerTransition.classList.add('transition-container-toggle');
    // }, 250);
  }

  // get single player season stats
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
    // STATS FOR GOALIES
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
    // STATS FOR SKATERS
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

  // loads team logo when selected
  function loadAlternateLogo(image) {
    leagueHeaderLogo.innerHTML = `
      <img src="img/${image}-logo.webp" alt="${image} Logo" width="100" height="100">
    `;
  }

  // gets team season using their first year(start)
  // stopping at current year(stop), increasing by 1(step)
  const getAllTeamSeasons = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  function getCurrentDate(container) {
    const currentDate = new Date;
    const formattedDate = currentDate.toDateString();
    container.innerText = formattedDate;
  }

  function getCurrentTime(container) {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    container.innerText = `${formattedTime} EST`;
  }

  // burger menu actions
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

  // SIDE NAVIGATION DROPDOWNS
  teamsDropdownButton.addEventListener('click', () => {
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
  howToDropdownButton.addEventListener('click', () => {
    howToDropdownContainer.children[0].classList.toggle('rotate');
    howToDropdownList.classList.toggle('dropdown-list-toggle');
  });
  aboutDropdownButton.addEventListener('click', () => {
    aboutDropdownContainer.children[0].classList.toggle('rotate');
    aboutDropdownList.classList.toggle('dropdown-list-toggle');
  });
  // GAME UPCOMING DATES DROPDOWN
  leagueGameDatesDropdownButton.addEventListener('click', () => {
    leagueGameDatesDropdownContainer.children[0].classList.toggle('rotate');
    leagueGameDatesDropdownList.classList.toggle('league-team-dropdown-list-toggle');
  });
  // GAME PREVIOUS DATES DROPDOWN
  leagueFinishedGameDatesDropdownButton.addEventListener('click', () => {
    leagueFinishedGameDatesDropdownContainer.children[0].classList.toggle('rotate');
    leagueFinishedGameDatesDropdownList.classList.toggle('league-team-dropdown-list-toggle');
  });
  // TEAM SEASON DROPDOWN
  teamSeasonDropdownButton.addEventListener('click', () => {
    teamSeasonDropdownContainer.children[0].classList.toggle('rotate');
    teamSeasonDropdownList.classList.toggle('league-team-dropdown-list-toggle');
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
  showLeagueSchedules();
  populateTeamDropdown();
  showLeagueStandings();
  getCurrentDate(currentDate);
  getCurrentTime(currentTime);
  setInterval(() => {
    getCurrentTime(currentTime);
  }, 1000);
}

window.addEventListener('load', () => {
  loadScript();
  // gets toggle buttons in dropdown
  $(document).on('click', '.game-dropdown-button', function () {
    // console.log($(this)[0].parentElement.childNodes);
    $(this)[0].lastElementChild.classList.toggle('rotate');
    $(this)[0].parentElement.childNodes[12].classList.toggle('game-dropdown-toggle');
  });
  $(document).on('click', '.game-slideout-show-button', function () {
    // console.log($(this)[0].parentElement.parentElement.parentElement);
    $(this)[0].parentElement.parentElement.parentElement.lastChild.classList.add('game-slideout-toggle');
  });
  $(document).on('click', '.game-slideout-hide-button', function () {
    // console.log($(this)[0].parentElement.parentElement.parentElement);
    $(this)[0].parentElement.parentElement.parentElement.lastChild.classList.remove('game-slideout-toggle');
  });
  $(document).on('click', '.game-lineup-away-button', function () {
    // console.log($(this)[0].parentElement.childNodes);
    $(this)[0].parentElement.childNodes[1].classList.toggle('rotate');
    $(this)[0].parentElement.childNodes[5].classList.toggle('dropdown-list-toggle');
  });
  $(document).on('click', '.game-lineup-home-button', function () {
    // console.log($(this)[0].parentElement.childNodes);
    $(this)[0].parentElement.childNodes[1].classList.toggle('rotate');
    $(this)[0].parentElement.childNodes[5].classList.toggle('dropdown-list-toggle');
  });
});
