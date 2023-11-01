async function getTeamSchedules(api) {
  const response = await fetch(`${api}/schedule?expand=schedule.broadcasts&expand=schedule.linescore&season=20232024`);
  const data = await response.json();
  // console.log(data);
  return data;
}

async function getGameBoxscore(api, id) {
  const response = await fetch(`${api}/game/${id}/boxscore`);
  const data = await response.json();
  // console.log(data);
  return data;
}

function convertSecondstoTime(timeInSeconds) {
  let dateObj = new Date(timeInSeconds * 1000);
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();
  const timeRemaining = minutes.toString().padStart(2, '0')
    + ':' + seconds.toString().padStart(2, '0');

  return timeRemaining;
}

function buildLeagueSchedules(api, schedule, scheduleContainer, date) {
  scheduleContainer.replaceChildren();
  const regularSeason = [];
  const preSeason = [];
  let dailyGames = [];
  for (let i = 0; i < schedule.dates.length; i++) {
    // console.log(schedule.dates[i]);
    for (let x = 0; x < schedule.dates[i].games.length; x++) {
      // console.log(schedule.dates[i].games[x]);
      if (schedule.dates[i].games[x].gameType === 'PR') {
        preSeason.push(schedule.dates[i].games[x]);
      } else if (schedule.dates[i].games[x].gameType === 'R') {
        regularSeason.push(schedule.dates[i].games[x]);
      }
    }
  }
  // console.log(regularSeason);
  // console.log(preSeason);
  // console.log(date);
  for (let i = 0; i < regularSeason.length; i++) {
    const formattedDate = new Date(regularSeason[i].gameDate);
    if (date === formattedDate.toDateString()) {
      dailyGames.push(regularSeason[i]);
    }
  }
  if (dailyGames.length === 0) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.innerHTML = `
      <div class='game-date-location'>
        <p class='game-date'>${date}</p>
      </div>
      <div class='game-team-container'>
        <p>No games scheduled...</p>
      </div>
    `;
    div.classList.add('league-game-card');
    li.appendChild(div);
    scheduleContainer.appendChild(li);
  } else {

    // console.log(dailyGames);
    for (let i = 0; i < dailyGames.length; i++) {
      const li = document.createElement('li');
      const gameCard = document.createElement('div');
      const dropdown = document.createElement('div');
      const slideOut = document.createElement('div');
      const gameDate = new Date(dailyGames[i].gameDate);
      const formattedTime = gameDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      gameCard.innerHTML = `
        <div class='game-date-location'>
          <p class='game-date'>${gameDate.toDateString()}</p>
          <p class='game-time'>${formattedTime}</p>
          <p class='game-location'>${dailyGames[i].venue.name}</p>
        </div>
        <div>
          <div class='game-team-container'>
            <p>Away :</p>
            <p class='game-away-team-name'>
              ${dailyGames[i].teams.away.team.name}
              <span class="game-away-team-logo">
                <img src='img/${dailyGames[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.away.team.name} Logo" width="100" height="100">
              </span>
            </p>
            <p class='game-away-team-record'>
              ${dailyGames[i].teams.away.leagueRecord.wins} - 
              ${dailyGames[i].teams.away.leagueRecord.losses} - 
              ${dailyGames[i].teams.away.leagueRecord.ot}
            </p>
          </div>
          <div class='game-team-container'>
            <p>Home :</p>
            <p class='game-home-team-name'>
              ${dailyGames[i].teams.home.team.name}
              <span class="game-home-team-logo">
                <img src='img/${dailyGames[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.home.team.name} Logo" width="100" height="100">
              </span>
            </p>
            <p class='game-home-team-record'>
              ${dailyGames[i].teams.home.leagueRecord.wins} - 
              ${dailyGames[i].teams.home.leagueRecord.losses} - 
              ${dailyGames[i].teams.home.leagueRecord.ot}
            </p>
          </div>
        </div>
        <span class='game-number'>${i + 1} of ${dailyGames.length}</span>
        <div class='game-finished-date'>
          <p>${gameDate.toDateString()}</p>
        </div>
        <div class='game-dropdown-button' role='button' aria-label="Game Details Button">
          <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
        </div>
      `;
      dropdown.innerHTML = `
        <ul class='game-dropdown-container'>
          <li class='game-dropdown-header'>
            <div class="game-dropdown-team-logo">
              <img src='img/${dailyGames[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.away.team.name} Logo" width="100" height="100">
            </div>
            <div>
              <h3>${dailyGames[i].linescore.currentPeriodOrdinal}</h3>
              <span>${dailyGames[i].linescore.currentPeriodTimeRemaining}</span>
            </div>
            <div class="game-dropdown-team-logo">
              <img src='img/${dailyGames[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.home.team.name} Logo" width="100" height="100">
            </div>
          </li>
          <li class='game-dropdown-goals'>
            <div>
              <p>${dailyGames[i].linescore.teams.away.goals}</p>
              <h3>Goals</h3>
              <p>${dailyGames[i].linescore.teams.home.goals}</p>
            </div>
          </li>
          <li class='game-dropdown-shots'>
            <div>
              <p>${dailyGames[i].linescore.teams.away.shotsOnGoal}</p>
              <h3>Shots</h3>
              <p>${dailyGames[i].linescore.teams.home.shotsOnGoal}</p>
            </div>
          </li>
          <button type='button' class='game-slideout-show-button'>
            Box Score <i class='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </ul>
      `;
      dropdown.classList.add('game-details-dropdown');
      // console.log(dropdown.childNodes[1].childNodes);
      let boxScores;
      fetch(`${api}/game/${dailyGames[i].gamePk}/boxscore`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          boxScores = data;
          // console.log(boxScores);
          slideOut.innerHTML = `
            <ul class='game-slideout-container'>
              <div class='game-lineup-container'>
                <div class='game-lineup-away-container'>
                  <i class="fa-solid fa-caret-up" aria-hidden="true"></i>
                  <input type='button' class='game-lineup-away-button' value='Lineup' />
                  <ul class='game-lineup-away-list'></ul>
                </div>
                <div class='game-lineup-home-container'>
                  <i class="fa-solid fa-caret-up" aria-hidden="true"></i>
                  <input type='button' class='game-lineup-home-button' value='Lineup' />
                  <ul class='game-lineup-home-list'></ul>
                </div>
              </div>
              <li class='game-slideout-header'>
                <div class="game-dropdown-team-logo">
                  <img src='img/${boxScores.teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.away.team.name} Logo" width="100" height="100">
                </div>
                <div></div>
                <div class="game-dropdown-team-logo">
                  <img src='img/${boxScores.teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.home.team.name} Logo" width="100" height="100">
                </div>
              </li>
              <li class='game-slideout-power-play'>
                <div>
                  <p>
                    ${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayGoals}
                    /
                    ${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities}
                  </p>
                  <h3>PP</h3>
                  <p>
                    ${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayGoals}
                    /
                    ${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities}
                  </p>
                </div>
              </li>
              <li class='game-slideout-pp-percent'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayPercentage}%</p>
                  <h3>PP%</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayPercentage}%</p>
                </div>
              </li>
              <li class='game-slideout-pp-minutes'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.pim}</p>
                  <h3>PIM</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.pim}</p>
                </div>
              </li>
              <li class='game-slideout-hits'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.hits}</p>
                  <h3>Hits</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.hits}</p>
                </div>
              </li>
              <li class='game-slideout-blocked-shots'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.blocked}</p>
                  <h3>Blocked</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.blocked}</p>
                </div>
              </li>
              <li class='game-slideout-fo-percent'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                  <h3>FO%</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                </div>
              </li>
              <li class='game-slideout-officials'>
                <div>
                  <p>Referees</p>
                  <h3>Officials</h3>
                  <p>Linesmen</p>
                </div>
                <div>
                  <h4>Officials not listed yet...</h4>
                </div>
              </li>
              <button type='button' class='game-slideout-hide-button'>
              <i class='fa fa-arrow-left' aria-hidden='true'></i> Close
              </button>
            </ul>
          `;
          // console.log(slideOut.childNodes[1]);
          if (boxScores.officials.length > 0) {
            slideOut.childNodes[1].childNodes[17].innerHTML = `
              <div>
                <p>Referees</p>
                <h3>Officials</h3>
                <p>Linesmen</p>
              </div>
              <div>
                <p>
                  <span>- ${boxScores.officials[0].official.fullName}</span>
                  <span>- ${boxScores.officials[1].official.fullName}</span>
                </p>
                <p>
                  <span>- ${boxScores.officials[2].official.fullName}</span>
                  <span>- ${boxScores.officials[3].official.fullName}</span>
                </p>
              </div>
            `;
          }

          // head coaches
          // let awayCoach = document.createElement('p');
          // let homeCoach = document.createElement('p');
          // awayCoach.innerHTML = `HC ${boxScores.teams.away.coaches[0].person.fullName}`;
          // homeCoach.innerHTML = `HC ${boxScores.teams.home.coaches[0].person.fullName}`;
          // awayCoach.classList.add('game-head-coach');
          // homeCoach.classList.add('game-head-coach');
          // gameCard.childNodes[3].childNodes[1].appendChild(awayCoach);
          // gameCard.childNodes[3].childNodes[3].appendChild(homeCoach);

          // away lineup
          if (boxScores.teams.away.skaters.length === 0) {
            let li = document.createElement('li');
            li.innerHTML = `No lineup yet...`;
            slideOut.childNodes[1].childNodes[1].childNodes[1].childNodes[5].appendChild(li);
          } else {
            let goalie = document.createElement('li');
            let awayGoalie;
            fetch(`${api}/people/${boxScores.teams.away.goalies[0]}`)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                awayGoalie = data;
                // console.log(awayGoalie);
                goalie.innerHTML = `
                  <p>
                    <span>${awayGoalie.people[0].primaryNumber}</span>
                    ${awayGoalie.people[0].lastName}
                  </p>
                  <p>${awayGoalie.people[0].primaryPosition.type.charAt(0)}</p>
                `;
              });
            slideOut.childNodes[1].childNodes[1].childNodes[1].childNodes[5].appendChild(goalie);
            for (let x = 0; x < boxScores.teams.away.skaters.length; x++) {
              let li = document.createElement('li');
              let awayLineup;
              fetch(`${api}/people/${boxScores.teams.away.skaters[x]}`)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  awayLineup = data;
                  // console.log(awayLineup);
                  li.innerHTML = `
                    <p>
                      <span>${awayLineup.people[0].primaryNumber}</span>
                      ${awayLineup.people[0].lastName}
                    </p>
                    <p>${awayLineup.people[0].primaryPosition.type.charAt(0)}</p>
                  `;
                });
              slideOut.childNodes[1].childNodes[1].childNodes[1].childNodes[5].appendChild(li);
            }
          }
          // home lineup
          if (boxScores.teams.home.skaters.length === 0) {
            let li = document.createElement('li');
            li.innerHTML = `No lineup yet...`;
            slideOut.childNodes[1].childNodes[1].childNodes[3].childNodes[5].appendChild(li);
          } else {
            let goalie = document.createElement('li');
            let homeGoalie;
            fetch(`${api}/people/${boxScores.teams.home.goalies[0]}`)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                homeGoalie = data;
                // console.log(homeGoalie);
                goalie.innerHTML = `
                  <p>
                    <span>${homeGoalie.people[0].primaryNumber}</span>
                    ${homeGoalie.people[0].lastName}
                  </p>
                  <p>${homeGoalie.people[0].primaryPosition.type.charAt(0)}</p>
                `;
              });
            slideOut.childNodes[1].childNodes[1].childNodes[3].childNodes[5].appendChild(goalie);
            for (let x = 0; x < boxScores.teams.home.skaters.length; x++) {
              let li = document.createElement('li');
              let homeLineup;
              fetch(`${api}/people/${boxScores.teams.home.skaters[x]}`)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  homeLineup = data;
                  // console.log(homeLineup);
                  li.innerHTML = `
                    <p>
                      <span>${homeLineup.people[0].primaryNumber}</span>
                      ${homeLineup.people[0].lastName}
                    </p>
                    <p>${homeLineup.people[0].primaryPosition.type.charAt(0)}</p>
                  `;
                });
              slideOut.childNodes[1].childNodes[1].childNodes[3].childNodes[5].appendChild(li);
            }
          }
          slideOut.classList.add('game-slideout-details');
          gameCard.appendChild(slideOut);
        });
      // broadcasts
      if (dailyGames[i].broadcasts === undefined) {
        const p = document.createElement('p');
        const span = document.createElement('span');
        p.innerHTML = '<span>Watch :</span>';
        span.innerText = 'Check local listing...';
        p.classList.add('game-broadcast');
        p.appendChild(span);
        gameCard.appendChild(p);
      }
      if (dailyGames[i].broadcasts != undefined) {
        const p = document.createElement('p');
        p.innerHTML = '<span>Watch :</span>';
        for (let x = 0; x < dailyGames[i].broadcasts.length; x++) {
          const span = document.createElement('span');
          span.innerText = `${dailyGames[i].broadcasts[x].name}`;
          p.classList.add('game-broadcast');
          p.appendChild(span);
          gameCard.appendChild(p);
        }
      }
      // powerplay data
      if (dailyGames[i].linescore.teams.away.powerPlay === true) {
        const li = document.createElement('li');
        li.innerHTML = `
          <div>
            <p>
              ${dailyGames[i].linescore.teams.away.numSkaters} on ${dailyGames[i].linescore.teams.home.numSkaters}
            </p>
          </div>
        `;
        li.classList.add('game-dropdown-powerplay-away');
        dropdown.childNodes[1].childNodes[1].appendChild(li);
      }
      if (dailyGames[i].linescore.teams.home.powerPlay === true) {
        const li = document.createElement('li');
        li.innerHTML = `
          <div>
            <p>
              ${dailyGames[i].linescore.teams.home.numSkaters} on ${dailyGames[i].linescore.teams.away.numSkaters}
            </p>
          </div>
        `;
        li.classList.add('game-dropdown-powerplay-home');
        dropdown.childNodes[1].childNodes[1].appendChild(li);
      }
      // intermission data
      if (dailyGames[i].linescore.intermissionInfo.inIntermission === true) {
        const div = document.createElement('div');
        div.innerHTML = `
          <span>
            Int. ${convertSecondstoTime(dailyGames[i].linescore.intermissionInfo.intermissionTimeRemaining)}
          </span>
        `;
        div.classList.add('game-dropdown-intermission');
        dropdown.childNodes[1].childNodes[1].appendChild(div);
      }
      // current period data
      if (dailyGames[i].linescore.currentPeriodOrdinal === undefined) {
        dropdown.childNodes[1].childNodes[1].childNodes[3].innerHTML = `
          <h3>1st</h3>
          <span>0:00</span>
        `;
      }
      // shows dropdown for games in progress
      if (dailyGames[i].status.detailedState === 'In Progress' || dailyGames[i].status.detailedState === 'In Progress - Critical') {
        dropdown.classList.add('game-dropdown-toggle');
        gameCard.childNodes[9].childNodes[1].classList.add('rotate');
      }
      // shows dropdown for finished games
      if (dailyGames[i].status.detailedState === 'Final') {
        gameCard.childNodes[7].style.display = 'inline';
        dropdown.classList.add('game-dropdown-toggle');
        gameCard.childNodes[9].childNodes[1].classList.add('rotate');
        // console.log(div);
        if (dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.innerText > dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.innerText) {
          dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.style.backgroundColor = '#1e90ff';
          dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.style.color = '#fff';
        }
        if (dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.innerText < dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.innerText) {
          dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.style.backgroundColor = '#1e90ff';
          dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.style.color = '#fff';
        }
      }
      // goals and shots per period
      if (dailyGames[i].linescore.periods.length > 0) {
        for (let x = 0; x < dailyGames[i].linescore.periods.length; x++) {
          const goals = document.createElement('div');
          const shots = document.createElement('div');
          goals.innerHTML = `
            <p>${dailyGames[i].linescore.periods[x].away.goals}</p>
            <span>${dailyGames[i].linescore.periods[x].ordinalNum}</span>
            <p>${dailyGames[i].linescore.periods[x].home.goals}</p>
          `;
          shots.innerHTML = `
            <p>${dailyGames[i].linescore.periods[x].away.shotsOnGoal}</p>
            <span>${dailyGames[i].linescore.periods[x].ordinalNum}</span>
            <p>${dailyGames[i].linescore.periods[x].home.shotsOnGoal}</p>
          `;
          dropdown.childNodes[1].childNodes[3].appendChild(goals);
          dropdown.childNodes[1].childNodes[5].appendChild(shots);
        }
      }
      // shootout data
      if (dailyGames[i].linescore.hasShootout === true) {
        const shootoutScores = document.createElement('div');
        const shootoutAttempts = document.createElement('div');
        shootoutScores.innerHTML = `
          <p>${dailyGames[i].linescore.shootoutInfo.away.scores}</p>
          <span>SO</span>
          <p>${dailyGames[i].linescore.shootoutInfo.home.scores}</p>
        `;
        shootoutAttempts.innerHTML = `
          <p>${dailyGames[i].linescore.shootoutInfo.away.attempts}</p>
          <span>SOA</span>
          <p>${dailyGames[i].linescore.shootoutInfo.home.attempts}</p>
        `;
        dropdown.childNodes[1].childNodes[3].appendChild(shootoutScores);
        // dropdown.childNodes[1].childNodes[5].appendChild(shootoutAttempts);
      }
      gameCard.classList.add('league-game-card');
      gameCard.appendChild(dropdown);
      li.appendChild(gameCard);
      scheduleContainer.appendChild(li);
    }
  }
}

function buildTeamSchedule(api, schedule, team, rsContainer, fgContainer, psContainer) {
  rsContainer.replaceChildren();
  fgContainer.replaceChildren();
  psContainer.replaceChildren();
  const currentDate = new Date();
  const currentDateFormatted = currentDate.toDateString();
  const regularSeason = [];
  const preSeason = [];
  const finishedGames = [];
  for (let i = 0; i < schedule.dates.length; i++) {
    for (let x = 0; x < schedule.dates[i].games.length; x++) {
      if (schedule.dates[i].games[x].teams.away.team.name === team || schedule.dates[i].games[x].teams.home.team.name === team) {
        if (schedule.dates[i].games[x].gameType === 'R') {
          // console.log(schedule.dates[i].games[x]);
          if (schedule.dates[i].games[x].status.detailedState === 'Final') {
            finishedGames.push(schedule.dates[i].games[x]);
          } else {
            regularSeason.push(schedule.dates[i].games[x]);
          }
        } else if (schedule.dates[i].games[x].gameType === 'PR') {
          preSeason.push(schedule.dates[i].games[x]);
        }
      }
    }
  }

  // regular season schedule
  if (regularSeason.length === 0) {
    const li = document.createElement('li');
    const rsCard = document.createElement('div');
    rsCard.innerHTML = `
      <div class='game-date-location'>
        <p class='game-date'>${currentDateFormatted}</p>
      </div>
      <div class='game-team-container'>
        <p>No games scheduled...</p>
      </div>
    `;
    rsCard.classList.add('team-regular-season-card');
    li.appendChild(rsCard);
    rsContainer.appendChild(li);
  } else {
    buildScheduleCarousel(api, regularSeason, rsContainer, finishedGames, team);
  }

  // finished regular season schedule
  if (finishedGames.length === 0) {
    const li = document.createElement('li');
    const fgCard = document.createElement('div');
    fgCard.innerHTML = `
      <div class='game-date-location'>
        <p class='game-date'>${currentDateFormatted}</p>
      </div>
      <div class='game-team-container'>
        <p>No finished games...</p>
      </div>
    `;
    fgCard.classList.add('team-regular-season-card');
    li.appendChild(fgCard);
    fgContainer.appendChild(li);
  } else {
    finishedGames.reverse();
    buildScheduleCarousel(api, finishedGames, fgContainer, regularSeason, team);
  }

  // preseason schedule
  if (preSeason.length === 0) {
    const li = document.createElement('li');
    const psCard = document.createElement('div');
    psCard.innerHTML = `
      <div class='game-date-location'>
        <p class='game-date'>${currentDateFormatted}</p>
      </div>
      <div class='game-team-container'>
        <p>No preseason games...</p>
      </div>
    `;
    psCard.classList.add('team-preseason-card');
    li.appendChild(psCard);
    psContainer.appendChild(li);
  } else {
    for (let x = 0; x < preSeason.length; x++) {
      const psCard = document.createElement('li');
      const span = document.createElement('span');
      const dropdown = document.createElement('div');
      const slideOut = document.createElement('div');
      const formattedDate = new Date(preSeason[x].gameDate);
      const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      // console.log(preSeason[x]);
      psCard.innerHTML = `
        <div class='game-date-location'>
          <p class='game-date'>${formattedDate.toDateString()}</p>
          <p class='game-time'>${formattedTime}</p>
          <p class='game-location'>${preSeason[x].venue.name}</p>
        </div>
        <div>
          <div class='game-team-container'>
            <p>Away :</p>
            <p class='game-away-team-name'>
              ${preSeason[x].teams.away.team.name}
              <span class="game-away-team-logo">
                <img src='img/${preSeason[x].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.away.team.name} Logo" width="100" height="100">
              </span>
            </p>
            <p class='game-away-team-record'>
              ${preSeason[x].teams.away.leagueRecord.wins} - 
              ${preSeason[x].teams.away.leagueRecord.losses}
            </p>
          </div>
          <div class='game-team-container'>
            <p>Home :</p>
            <p class='game-home-team-name'>
              ${preSeason[x].teams.home.team.name}
              <span class="game-home-team-logo">
                <img src='img/${preSeason[x].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.home.team.name} Logo" width="100" height="100">
              </span>
            </p>
            <p class='game-home-team-record'>
              ${preSeason[x].teams.home.leagueRecord.wins} - 
              ${preSeason[x].teams.home.leagueRecord.losses}
            </p>
          </div>
        </div>
        <span class='game-number'>${x + 1} of ${preSeason.length}</span>
        <div class='game-finished-date'>
          <p>${formattedDate.toDateString()}</p>
        </div>
        <div class='game-dropdown-button' role='button' aria-label="Game Details Button">
          <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
        </div>
      `;
      dropdown.innerHTML = `
        <ul class='game-dropdown-container'>
          <li class='game-dropdown-header'>
            <div class="game-dropdown-team-logo">
              <img src='img/${preSeason[x].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.away.team.name} Logo" width="100" height="100">
            </div>
            <div>
              <h3>${preSeason[x].linescore.currentPeriodOrdinal}</h3>
              <span>${preSeason[x].linescore.currentPeriodTimeRemaining}</span>
            </div>
            <div class="game-dropdown-team-logo">
              <img src='img/${preSeason[x].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.home.team.name} Logo" width="100" height="100">
            </div>
          </li>
          <li class='game-dropdown-goals'>
            <div>
              <p>${preSeason[x].linescore.teams.away.goals}</p>
              <h3>Goals</h3>
              <p>${preSeason[x].linescore.teams.home.goals}</p>
            </div>
          </li>
          <li class='game-dropdown-shots'>
            <div>
              <p>${preSeason[x].linescore.teams.away.shotsOnGoal}</p>
              <h3>Shots</h3>
              <p>${preSeason[x].linescore.teams.home.shotsOnGoal}</p>
            </div>
          </li>
          <button type='button' class='game-slideout-show-button'>
            Box Score <i class='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </ul>
      `;
      dropdown.classList.add('game-details-dropdown');
      // console.log(dropdown.childNodes[1].childNodes);
      let boxScores;
      fetch(`${api}/game/${preSeason[x].gamePk}/boxscore`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          boxScores = data;
          slideOut.innerHTML = `
            <ul class='game-slideout-container'>
              <li class='game-slideout-header'>
                <div class="game-dropdown-team-logo">
                  <img src='img/${boxScores.teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.away.team.name} Logo" width="100" height="100">
                </div>
                <div></div>
                <div class="game-dropdown-team-logo">
                  <img src='img/${boxScores.teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.home.team.name} Logo" width="100" height="100">
                </div>
              </li>
              <li class='game-slideout-power-play'>
                <div>
                  <p>
                    ${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayGoals}
                      /
                    ${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities}
                  </p>
                  <h3>PP</h3>
                  <p>
                    ${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayGoals}
                      /
                    ${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities}
                  </p>
                </div>
              </li>
              <li class='game-slideout-pp-percent'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayPercentage}%</p>
                  <h3>PP%</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayPercentage}%</p>
                </div>
              </li>
              <li class='game-slideout-pp-minutes'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.pim}</p>
                  <h3>PIM</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.pim}</p>
                </div>
              </li>
              <li class='game-slideout-hits'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.hits}</p>
                  <h3>Hits</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.hits}</p>
                </div>
              </li>
              <li class='game-slideout-blocked-shots'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.blocked}</p>
                  <h3>Blocked</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.blocked}</p>
                </div>
              </li>
              <li class='game-slideout-fo-percent'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                  <h3>FO%</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                </div>
              </li>
              <li class='game-slideout-officials'>
                <div>
                  <p>Referees</p>
                  <h3>Officials</h3>
                  <p>Linesmen</p>
                </div>
                <div>
                  <h4>Officials not listed yet...</h4>
                </div>
              </li>
              <button type='button' class='game-slideout-hide-button'>
              <i class='fa fa-arrow-left' aria-hidden='true'></i> Close
              </button>
            </ul>
          `;
          // console.log(slideOut.childNodes[1]);
          if (boxScores.officials.length > 0) {
            slideOut.childNodes[1].childNodes[15].innerHTML = `
              <div>
                <p>Referees</p>
                <h3>Officials</h3>
                <p>Linesmen</p>
              </div>
              <div>
              <p>
                <span>- ${boxScores.officials[0].official.fullName}</span>
                <span>- ${boxScores.officials[1].official.fullName}</span>
              </p>
              <p>
                <span>- ${boxScores.officials[2].official.fullName}</span>
                <span>- ${boxScores.officials[3].official.fullName}</span>
              </p>
            </div>
          `;
          }

          // head coaches
          // let awayCoach = document.createElement('p');
          // let homeCoach = document.createElement('p');
          // awayCoach.innerHTML = `HC ${boxScores.teams.away.coaches[0].person.fullName}`;
          // homeCoach.innerHTML = `HC ${boxScores.teams.home.coaches[0].person.fullName}`;
          // awayCoach.classList.add('game-head-coach');
          // homeCoach.classList.add('game-head-coach');
          // psCard.childNodes[3].childNodes[1].appendChild(awayCoach);
          // psCard.childNodes[3].childNodes[3].appendChild(homeCoach);
          slideOut.classList.add('game-slideout-details');
          psCard.appendChild(slideOut);
        });

      // broadcasts
      if (preSeason[x].broadcasts === undefined) {
        const p = document.createElement('p');
        const span = document.createElement('span');
        p.innerHTML = '<span>Watch :</span>';
        span.innerText = 'Check local listing...';
        p.classList.add('game-broadcast');
        p.appendChild(span);
        psCard.appendChild(p);
      }
      if (preSeason[x].broadcasts != undefined) {
        const p = document.createElement('p');
        p.innerHTML = '<span>Watch :</span>';
        for (let y = 0; y < preSeason[x].broadcasts.length; y++) {
          const span = document.createElement('span');
          span.innerText = `${preSeason[x].broadcasts[y].name}`;
          p.classList.add('game-broadcast');
          p.appendChild(span);
          psCard.appendChild(p);
        }
      }
      // powerplay data
      if (preSeason[x].linescore.teams.away.powerPlay === true) {
        const li = document.createElement('li');
        li.innerHTML = `
        <div>
          <p>
            ${preSeason[x].linescore.teams.away.numSkaters} on ${preSeason[x].linescore.teams.home.numSkaters}
          </p>
        </div>
      `;
        li.classList.add('game-dropdown-powerplay-away');
        dropdown.childNodes[1].childNodes[1].appendChild(li);
      }
      if (preSeason[x].linescore.teams.home.powerPlay === true) {
        const li = document.createElement('li');
        li.innerHTML = `
        <div>
          <p>
            ${preSeason[x].linescore.teams.home.numSkaters} on ${preSeason[x].linescore.teams.away.numSkaters}
          </p>
        </div>
      `;
        li.classList.add('game-dropdown-powerplay-home');
        dropdown.childNodes[1].childNodes[1].appendChild(li);
      }
      // intermission data
      if (preSeason[x].linescore.intermissionInfo.inIntermission === true) {
        const div = document.createElement('div');
        div.innerHTML = `
        <span>
          Int. ${convertSecondstoTime(preSeason[x].linescore.intermissionInfo.intermissionTimeRemaining)}
        </span>
      `;
        div.classList.add('game-dropdown-intermission');
        dropdown.childNodes[1].childNodes[1].appendChild(div);
      }
      // current period data
      if (preSeason[x].linescore.currentPeriodOrdinal === undefined) {
        dropdown.childNodes[1].childNodes[1].childNodes[3].innerHTML = `
        <h3>1st</h3>
        <span>0:00</span>
      `;
      }
      // shows dropdown for games in progress
      if (preSeason[x].status.detailedState === 'In Progress' || preSeason[x].status.detailedState === 'In Progress - Critical') {
        dropdown.classList.add('game-dropdown-toggle');
        psCard.childNodes[9].childNodes[1].classList.add('rotate');
      }
      // shows dropdown for finished games
      if (preSeason[x].status.detailedState === 'Final') {
        psCard.childNodes[7].style.display = 'inline';
        dropdown.classList.add('game-dropdown-toggle');
        psCard.childNodes[9].childNodes[1].classList.add('rotate');
        // console.log(li);
        if (dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.innerText > dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.innerText) {
          dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.style.backgroundColor = '#1e90ff';
          dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.style.color = '#fff';
        }
        if (dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.innerText < dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.innerText) {
          dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.style.backgroundColor = '#1e90ff';
          dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.style.color = '#fff';
        }
      }
      // goals and shots per period
      if (preSeason[x].linescore.periods.length > 0) {
        for (let y = 0; y < preSeason[x].linescore.periods.length; y++) {
          const goals = document.createElement('div');
          const shots = document.createElement('div');
          goals.innerHTML = `
          <p>${preSeason[x].linescore.periods[y].away.goals}</p>
          <span>${preSeason[x].linescore.periods[y].ordinalNum}</span>
          <p>${preSeason[x].linescore.periods[y].home.goals}</p>
        `;
          shots.innerHTML = `
          <p>${preSeason[x].linescore.periods[y].away.shotsOnGoal}</p>
          <span>${preSeason[x].linescore.periods[y].ordinalNum}</span>
          <p>${preSeason[x].linescore.periods[y].home.shotsOnGoal}</p>
        `;
          dropdown.childNodes[1].childNodes[3].appendChild(goals);
          dropdown.childNodes[1].childNodes[5].appendChild(shots);
        }
      }
      // shootout data
      if (preSeason[x].linescore.hasShootout === true) {
        const shootoutScores = document.createElement('div');
        const shootoutAttempts = document.createElement('div');
        shootoutScores.innerHTML = `
        <p>${preSeason[x].linescore.shootoutInfo.away.scores}</p>
        <span>SO</span>
        <p>${preSeason[x].linescore.shootoutInfo.home.scores}</p>
      `;
        shootoutAttempts.innerHTML = `
        <p>${preSeason[x].linescore.shootoutInfo.away.attempts}</p>
        <span>SOA</span>
        <p>${preSeason[x].linescore.shootoutInfo.home.attempts}</p>
      `;
        dropdown.childNodes[1].childNodes[3].appendChild(shootoutScores);
        // dropdown.childNodes[1].childNodes[5].appendChild(shootoutAttempts);
      }
      span.classList.add('game-home-team-indicator');
      if (preSeason[x].teams.home.team.name === team) {
        span.style.display = 'block';
      }
      psCard.classList.add('team-preseason-card');
      psCard.appendChild(dropdown);
      psCard.appendChild(span);
      psContainer.appendChild(psCard);
    }
  }
}

function buildScheduleCarousel(api, data, container, altData, team) {
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement('li');
    const gameCard = document.createElement('div');
    const dropdown = document.createElement('div');
    const slideOut = document.createElement('div');
    const span = document.createElement('span');
    const formattedDate = new Date(data[i].gameDate);
    const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    gameCard.innerHTML = `
      <div class='game-date-location'>
        <p class='game-date'>${formattedDate.toDateString()}</p>
        <p class='game-time'>${formattedTime}</p>
        <p class='game-location'>${data[i].venue.name}</p>
      </div>
      <div>
        <div class='game-team-container'>
          <p>Away :</p>
          <p class='game-away-team-name'>
            ${data[i].teams.away.team.name}
            <span class="game-away-team-logo">
              <img src='img/${data[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data[i].teams.away.team.name} Logo" width="100" height="100">
            </span>
          </p>
          <p class='game-away-team-record'>
            ${data[i].teams.away.leagueRecord.wins} - 
            ${data[i].teams.away.leagueRecord.losses} - 
            ${data[i].teams.away.leagueRecord.ot}
          </p>
        </div>
        <div class='game-team-container'>
          <p>Home :</p>
          <p class='game-home-team-name'>
            ${data[i].teams.home.team.name}
            <span class="game-home-team-logo">
              <img src='img/${data[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data[i].teams.home.team.name} Logo" width="100" height="100">
            </span>
          </p>
          <p class='game-home-team-record'>
            ${data[i].teams.home.leagueRecord.wins} - 
            ${data[i].teams.home.leagueRecord.losses} - 
            ${data[i].teams.home.leagueRecord.ot}
          </p>
        </div>
      </div>
      <span class='game-number'>${i + (altData.length + 1)} of ${altData.length + data.length}</span>
      <div class='game-finished-date'>
          <p>${formattedDate.toDateString()}</p>
        </div>
      <div class='game-dropdown-button' role='button' aria-label="Game Details Button">
        <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
      </div>
    `;
    dropdown.innerHTML = `
      <ul class='game-dropdown-container'>
        <li class='game-dropdown-header'>
          <div class="game-dropdown-team-logo">
            <img src='img/${data[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data[i].teams.away.team.name} Logo" width="100" height="100">
          </div>
          <div>
            <h3>${data[i].linescore.currentPeriodOrdinal}</h3>
            <span>${data[i].linescore.currentPeriodTimeRemaining}</span>
          </div>
          <div class="game-dropdown-team-logo">
            <img src='img/${data[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data[i].teams.home.team.name} Logo" width="100" height="100">
          </div>
        </li>
        <li class='game-dropdown-goals'>
          <div>
            <p>${data[i].linescore.teams.away.goals}</p>
            <h3>Goals</h3>
            <p>${data[i].linescore.teams.home.goals}</p>
          </div>
        </li>
        <li class='game-dropdown-shots'>
          <div>
            <p>${data[i].linescore.teams.away.shotsOnGoal}</p>
            <h3>Shots</h3>
            <p>${data[i].linescore.teams.home.shotsOnGoal}</p>
          </div>
        </li>
        <button type='button' class='game-slideout-show-button'>
          Box Score <i class='fa fa-arrow-right' aria-hidden='true'></i>
        </button>
      </ul>
    `;
    dropdown.classList.add('game-details-dropdown');
    // console.log(dropdown.childNodes[1].childNodes);
    let boxScores;
    fetch(`${api}/game/${data[i].gamePk}/boxscore`)
      .then((response) => {
        return response.json();
      })
      .then((boxScoreData) => {
        boxScores = boxScoreData;
        slideOut.innerHTML = `
          <ul class='game-slideout-container'>
            <div class='game-lineup-container'>
                <div class='game-lineup-away-container'>
                  <i class="fa-solid fa-caret-up" aria-hidden="true"></i>
                  <input type='button' class='game-lineup-away-button' value='Lineup' />
                  <ul class='game-lineup-away-list'></ul>
                </div>
                <div class='game-lineup-home-container'>
                  <i class="fa-solid fa-caret-up" aria-hidden="true"></i>
                  <input type='button' class='game-lineup-home-button' value='Lineup' />
                  <ul class='game-lineup-home-list'></ul>
                </div>
              </div>
            <li class='game-slideout-header'>
              <div class="game-dropdown-team-logo">
                <img src='img/${boxScores.teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.away.team.name} Logo" width="100" height="100">
              </div>
              <div></div>
              <div class="game-dropdown-team-logo">
                <img src='img/${boxScores.teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.home.team.name} Logo" width="100" height="100">
              </div>
            </li>
            <li class='game-slideout-power-play'>
              <div>
                <p>
                  ${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayGoals}
                    /
                  ${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities}
                </p>
                <h3>PP</h3>
                <p>
                  ${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayGoals}
                    /
                  ${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities}
                </p>
              </div>
            </li>
            <li class='game-slideout-pp-percent'>
              <div>
                <p>${boxScores.teams.away.teamStats.teamSkaterStats.powerPlayPercentage}%</p>
                <h3>PP%</h3>
                <p>${boxScores.teams.home.teamStats.teamSkaterStats.powerPlayPercentage}%</p>
              </div>
            </li>
            <li class='game-slideout-pp-minutes'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.pim}</p>
                  <h3>PIM</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.pim}</p>
                </div>
              </li>
            <li class='game-slideout-hits'>
              <div>
                <p>${boxScores.teams.away.teamStats.teamSkaterStats.hits}</p>
                <h3>Hits</h3>
                <p>${boxScores.teams.home.teamStats.teamSkaterStats.hits}</p>
              </div>
            </li>
            <li class='game-slideout-blocked-shots'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.blocked}</p>
                  <h3>Blocked</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.blocked}</p>
                </div>
              </li>
            <li class='game-slideout-fo-percent'>
              <div>
                <p>${boxScores.teams.away.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                <h3>FO%</h3>
                <p>${boxScores.teams.home.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
              </div>
            </li>
            <li class='game-slideout-officials'>
              <div>
                <p>Referees</p>
                <h3>Officials</h3>
                <p>Linesmen</p>
              </div>
              <div>
                <h4>Officials not listed yet...</h4>
              </div>
            </li>
            <button type='button' class='game-slideout-hide-button'>
            <i class='fa fa-arrow-left' aria-hidden='true'></i> Close
            </button>
          </ul>
        `;
        // console.log(slideOut.childNodes[1]);
        if (boxScores.officials.length > 0) {
          slideOut.childNodes[1].childNodes[17].innerHTML = `
            <div>
              <p>Referees</p>
              <h3>Officials</h3>
              <p>Linesmen</p>
            </div>
            <div>
            <p>
              <span>- ${boxScores.officials[0].official.fullName}</span>
              <span>- ${boxScores.officials[1].official.fullName}</span>
            </p>
            <p>
              <span>- ${boxScores.officials[2].official.fullName}</span>
              <span>- ${boxScores.officials[3].official.fullName}</span>
            </p> 
          </div>
        `;
        }

        // head coaches
        // let awayCoach = document.createElement('p');
        // let homeCoach = document.createElement('p');
        // awayCoach.innerHTML = `HC ${boxScores.teams.away.coaches[0].person.fullName}`;
        // homeCoach.innerHTML = `HC ${boxScores.teams.home.coaches[0].person.fullName}`;
        // awayCoach.classList.add('game-head-coach');
        // homeCoach.classList.add('game-head-coach');
        // gameCard.childNodes[3].childNodes[1].appendChild(awayCoach);
        // gameCard.childNodes[3].childNodes[3].appendChild(homeCoach);

        // away lineup
        if (boxScores.teams.away.skaters.length === 0) {
          let li = document.createElement('li');
          li.innerHTML = `No lineup yet...`;
          slideOut.childNodes[1].childNodes[1].childNodes[1].childNodes[5].appendChild(li);
        } else {
          let goalie = document.createElement('li');
          let awayGoalie;
          fetch(`${api}/people/${boxScores.teams.away.goalies[0]}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              awayGoalie = data;
              // console.log(awayGoalie);
              goalie.innerHTML = `
                <p>
                  <span>${awayGoalie.people[0].primaryNumber}</span>
                  ${awayGoalie.people[0].lastName}
                </p>
                <p>${awayGoalie.people[0].primaryPosition.type.charAt(0)}</p>
              `;
            });
          slideOut.childNodes[1].childNodes[1].childNodes[1].childNodes[5].appendChild(goalie);
          for (let x = 0; x < boxScores.teams.away.skaters.length; x++) {
            let li = document.createElement('li');
            let awayLineup;
            fetch(`${api}/people/${boxScores.teams.away.skaters[x]}`)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                awayLineup = data;
                // console.log(awayLineup);
                li.innerHTML = `
                  <p>
                    <span>${awayLineup.people[0].primaryNumber}</span>
                    ${awayLineup.people[0].lastName}
                  </p>
                  <p>${awayLineup.people[0].primaryPosition.type.charAt(0)}</p>
                `;
              });
            slideOut.childNodes[1].childNodes[1].childNodes[1].childNodes[5].appendChild(li);
          }
        }
        // home lineup
        if (boxScores.teams.home.skaters.length === 0) {
          let li = document.createElement('li');
          li.innerHTML = `No lineup yet...`;
          slideOut.childNodes[1].childNodes[1].childNodes[3].childNodes[5].appendChild(li);
        } else {
          let goalie = document.createElement('li');
          let homeGoalie;
          fetch(`${api}/people/${boxScores.teams.home.goalies[0]}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              homeGoalie = data;
              // console.log(homeGoalie);
              goalie.innerHTML = `
                <p>
                  <span>${homeGoalie.people[0].primaryNumber}</span>
                  ${homeGoalie.people[0].lastName}
                </p>
                <p>${homeGoalie.people[0].primaryPosition.type.charAt(0)}</p>
              `;
            });
          slideOut.childNodes[1].childNodes[1].childNodes[3].childNodes[5].appendChild(goalie);
          for (let x = 0; x < boxScores.teams.home.skaters.length; x++) {
            let li = document.createElement('li');
            let homeLineup;
            fetch(`${api}/people/${boxScores.teams.home.skaters[x]}`)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                homeLineup = data;
                li.innerHTML = `
                  <p>
                    <span>${homeLineup.people[0].primaryNumber}</span>
                    ${homeLineup.people[0].lastName}
                  </p>
                  <p>${homeLineup.people[0].primaryPosition.type.charAt(0)}</p>
                `;
              });
            slideOut.childNodes[1].childNodes[1].childNodes[3].childNodes[5].appendChild(li);
          }
        }
        slideOut.classList.add('game-slideout-details');
        gameCard.appendChild(slideOut);
      });
    // broadcasts
    if (data[i].broadcasts === undefined) {
      const p = document.createElement('p');
      const span = document.createElement('span');
      p.innerHTML = '<span>Watch :</span>';
      span.innerText = 'Check local listing...';
      p.classList.add('game-broadcast');
      p.appendChild(span);
      gameCard.appendChild(p);
    }
    if (data[i].broadcasts != undefined) {
      const p = document.createElement('p');
      p.innerHTML = '<span>Watch :</span>';
      for (let x = 0; x < data[i].broadcasts.length; x++) {
        const span = document.createElement('span');
        span.innerText = `${data[i].broadcasts[x].name}`;
        p.classList.add('game-broadcast');
        p.appendChild(span);
        gameCard.appendChild(p);
      }
    }
    // powerplay data
    if (data[i].linescore.teams.away.powerPlay === true) {
      const li = document.createElement('li');
      li.innerHTML = `
      <div>
        <p>
          ${data[i].linescore.teams.away.numSkaters} on ${data[i].linescore.teams.home.numSkaters}
        </p>
      </div>
    `;
      li.classList.add('game-dropdown-powerplay-away');
      dropdown.childNodes[1].childNodes[1].appendChild(li);
    }
    if (data[i].linescore.teams.home.powerPlay === true) {
      const li = document.createElement('li');
      li.innerHTML = `
      <div>
        <p>
          ${data[i].linescore.teams.home.numSkaters} on ${data[i].linescore.teams.away.numSkaters}
        </p>
      </div>
    `;
      li.classList.add('game-dropdown-powerplay-home');
      dropdown.childNodes[1].childNodes[1].appendChild(li);
    }
    // intermission data
    if (data[i].linescore.intermissionInfo.inIntermission === true) {
      const div = document.createElement('div');
      div.innerHTML = `
      <span>
        Int. ${convertSecondstoTime(data[i].linescore.intermissionInfo.intermissionTimeRemaining)}
      </span>
    `;
      div.classList.add('game-dropdown-intermission');
      dropdown.childNodes[1].childNodes[1].appendChild(div);
    }
    // current period data
    if (data[i].linescore.currentPeriodOrdinal === undefined) {
      dropdown.childNodes[1].childNodes[1].childNodes[3].innerHTML = `
      <h3>1st</h3>
      <span>0:00</span>
    `;
    }
    // shows dropdown for games in progress
    if (data[i].status.detailedState === 'In Progress' || data[i].status.detailedState === 'In Progress - Critical') {
      dropdown.classList.add('game-dropdown-toggle');
      gameCard.childNodes[9].childNodes[1].classList.add('rotate');
    }
    // shows dropdown for finished games
    if (data[i].status.detailedState === 'Final') {
      dropdown.classList.add('game-dropdown-toggle');
      gameCard.childNodes[7].style.display = 'inline';
      gameCard.childNodes[9].childNodes[1].classList.add('rotate');
      gameCard.childNodes[5].innerText = `${data.length - i} of ${altData.length + data.length}`;
      // console.log(div);
      if (dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.innerText > dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.innerText) {
        dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.style.backgroundColor = '#1e90ff';
        dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.style.color = '#fff';
      }
      if (dropdown.childNodes[1].childNodes[3].childNodes[1].firstElementChild.innerText < dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.innerText) {
        dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.style.backgroundColor = '#1e90ff';
        dropdown.childNodes[1].childNodes[3].childNodes[1].lastElementChild.style.color = '#fff';
      }
    }
    // goals and shots per period data
    if (data[i].linescore.periods.length > 0) {
      for (let x = 0; x < data[i].linescore.periods.length; x++) {
        const goals = document.createElement('div');
        const shots = document.createElement('div');
        goals.innerHTML = `
        <p>${data[i].linescore.periods[x].away.goals}</p>
        <span>${data[i].linescore.periods[x].ordinalNum}</span>
        <p>${data[i].linescore.periods[x].home.goals}</p>
      `;
        shots.innerHTML = `
        <p>${data[i].linescore.periods[x].away.shotsOnGoal}</p>
        <span>${data[i].linescore.periods[x].ordinalNum}</span>
        <p>${data[i].linescore.periods[x].home.shotsOnGoal}</p>
      `;
        dropdown.childNodes[1].childNodes[3].appendChild(goals);
        dropdown.childNodes[1].childNodes[5].appendChild(shots);
      }
    }
    // shootout data
    if (data[i].linescore.hasShootout === true) {
      const shootoutScores = document.createElement('div');
      const shootoutAttempts = document.createElement('div');
      shootoutScores.innerHTML = `
      <p>${data[i].linescore.shootoutInfo.away.scores}</p>
      <span>SO</span>
      <p>${data[i].linescore.shootoutInfo.home.scores}</p>
    `;
      shootoutAttempts.innerHTML = `
      <p>${data[i].linescore.shootoutInfo.away.attempts}</p>
      <span>SOA</span>
      <p>${data[i].linescore.shootoutInfo.home.attempts}</p>
    `;
      dropdown.childNodes[1].childNodes[3].appendChild(shootoutScores);
      // dropdown.childNodes[1].childNodes[5].appendChild(shootoutAttempts);
    }
    span.classList.add('game-home-team-indicator');
    if (data[i].teams.home.team.name === team) {
      span.style.display = 'block';
    }
    gameCard.classList.add('team-regular-season-card');
    gameCard.appendChild(dropdown);
    li.appendChild(gameCard);
    gameCard.appendChild(span);
    container.appendChild(li);
  }
}