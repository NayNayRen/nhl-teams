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
      const div = document.createElement('div');
      const dropdown = document.createElement('div');
      const slideOut = document.createElement('div');
      const awayLineupContainer = document.createElement('div');
      const homeLineupContainer = document.createElement('div');
      const gameDate = new Date(dailyGames[i].gameDate);
      const formattedTime = gameDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      div.innerHTML = `
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
                <img src='img/${dailyGames[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.away.team.name} Logo" width="300" height="308">
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
                <img src='img/${dailyGames[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.home.team.name} Logo" width="300" height="308">
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
        <div class='game-dropdown-button' aria-label="Game Details Button">
          <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
        </div>
      `;
      dropdown.innerHTML = `
        <ul class='game-dropdown-container'>
          <li class='game-dropdown-header'>
            <div class="game-dropdown-team-logo">
              <img src='img/${dailyGames[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.away.team.name} Logo" width="300" height="308">
            </div>
            <div>
              <h3>${dailyGames[i].linescore.currentPeriodOrdinal}</h3>
              <span>${dailyGames[i].linescore.currentPeriodTimeRemaining}</span>
            </div>
            <div class="game-dropdown-team-logo">
              <img src='img/${dailyGames[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.home.team.name} Logo" width="300" height="308">
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
            More <i class='fa fa-arrow-right' aria-hidden='true'></i>
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
                <div class='game-away-lineup-container'>
                  <i class="fa-solid fa-caret-up" aria-hidden="true"></i>
                  <input type='button' class='game-away-lineup-button' value='Lineup' />
                  <ul class='game-away-lineup-list'>
                    <li>Away Team</li>
                    <li>Away Team</li>
                    <li>Away Team</li>
                  </ul>
                </div>
                <div class='game-home-lineup-container'>
                  <i class="fa-solid fa-caret-up" aria-hidden="true"></i>
                  <input type='button' class='game-home-lineup-button' value='Lineup' />
                  <ul class='game-home-lineup-list'>
                    <li>Home Team</li>
                    <li>Home Team</li>
                    <li>Home Team</li>
                  </ul>
                </div>
              </div>
              <li class='game-slideout-header'>
                <div class="game-dropdown-team-logo">
                  <img src='img/${boxScores.teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.away.team.name} Logo" width="300" height="308">
                </div>
                <div></div>
                <div class="game-dropdown-team-logo">
                  <img src='img/${boxScores.teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.home.team.name} Logo" width="300" height="308">
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
              <li class='game-slideout-hits'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.hits}</p>
                  <h3>Hits</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.hits}</p>
                </div>
              </li>
              <li class='game-slideout-fo-percent'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                  <h3>FO%</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                </div>
              </li>
              <li class='game-slideout-coaches'>
                <h3>Coaches</h3>
                <div>
                  <p>${boxScores.teams.away.coaches[0].person.fullName}</p>
                  <p>${boxScores.teams.home.coaches[0].person.fullName}</p>
                </div>
              </li>
              <li class='game-slideout-officials'>
                <h3>Officials</h3>
                <div>
                  <p>Officials not listed yet...</p>
                </div>
              </li>
              <button type='button' class='game-slideout-hide-button'>
              <i class='fa fa-arrow-left' aria-hidden='true'></i> Less
              </button>
            </ul>
          `;
          // console.log(slideOut.childNodes[1].childNodes[1]);
          if (boxScores.officials.length > 0) {
            slideOut.childNodes[1].childNodes[15].innerHTML = `
              <h3>Officials</h3>
              <div>
                <p>Referees :
                  <span>${boxScores.officials[0].official.fullName}</span>
                  <span>${boxScores.officials[1].official.fullName}</span>
                </p>
                
                <p>Linesmen :
                  <span>${boxScores.officials[2].official.fullName}</span>
                  <span>${boxScores.officials[3].official.fullName}</span>
                </p>
              </div>
            `;
          }
          slideOut.classList.add('game-slideout-details');
          div.appendChild(slideOut);
        });
      if (dailyGames[i].broadcasts === undefined) {
        const p = document.createElement('p');
        const span = document.createElement('span');
        p.innerHTML = '<span>Watch :</span>';
        span.innerText = 'Check local listing...';
        p.classList.add('game-broadcast');
        p.appendChild(span);
        div.appendChild(p);
      }
      if (dailyGames[i].broadcasts != undefined) {
        const p = document.createElement('p');
        p.innerHTML = '<span>Watch :</span>';
        for (let x = 0; x < dailyGames[i].broadcasts.length; x++) {
          const span = document.createElement('span');
          span.innerText = `${dailyGames[i].broadcasts[x].name}`;
          p.classList.add('game-broadcast');
          p.appendChild(span);
          div.appendChild(p);
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
            Int. ${dailyGames[i].linescore.intermissionInfo.intermissionTimeRemaining}
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
      // shows dropdown for finished games
      if (dailyGames[i].linescore.currentPeriodTimeRemaining === 'Final') {
        div.childNodes[7].style.display = 'inline';
        dropdown.classList.add('game-dropdown-toggle');
        div.childNodes[9].childNodes[1].classList.add('rotate');
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
      div.classList.add('league-game-card');
      div.appendChild(dropdown);
      li.appendChild(div);
      scheduleContainer.appendChild(li);
    }
  }
}

function buildTeamSchedule(api, schedule, team, rsContainer, fgContainer, psContainer) {
  const currentDate = new Date();
  const currentDateFormatted = currentDate.toDateString();
  rsContainer.replaceChildren();
  fgContainer.replaceChildren();
  psContainer.replaceChildren();
  const regularSeason = [];
  const preSeason = [];
  const finishedGames = [];
  for (let i = 0; i < schedule.dates.length; i++) {
    for (let x = 0; x < schedule.dates[i].games.length; x++) {
      if (schedule.dates[i].games[x].teams.away.team.name === team || schedule.dates[i].games[x].teams.home.team.name === team) {
        if (schedule.dates[i].games[x].gameType === 'R') {
          // console.log(schedule.dates[i].games[x]);
          if (schedule.dates[i].games[x].linescore.currentPeriodTimeRemaining === 'Final') {
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
    const div = document.createElement('div');
    div.innerHTML = `
      <div class='game-date-location'>
        <p class='game-date'>${currentDateFormatted}</p>
      </div>
      <div class='game-team-container'>
        <p>No games scheduled...</p>
      </div>
    `;
    div.classList.add('team-regular-season-card');
    li.appendChild(div);
    rsContainer.appendChild(li);
  } else {
    buildScheduleCarousel(api, regularSeason, rsContainer, finishedGames, team);
  }

  // finished regular season schedule
  if (finishedGames.length === 0) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.innerHTML = `
      <div class='game-date-location'>
        <p class='game-date'>${currentDateFormatted}</p>
      </div>
      <div class='game-team-container'>
        <p>No finished games...</p>
      </div>
    `;
    div.classList.add('team-regular-season-card');
    li.appendChild(div);
    fgContainer.appendChild(li);
  } else {
    finishedGames.reverse();
    buildScheduleCarousel(api, finishedGames, fgContainer, regularSeason, team);
  }

  // preseason schedule
  if (preSeason.length === 0) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.innerHTML = `
      <div class='game-date-location'>
        <p class='game-date'>${currentDateFormatted}</p>
      </div>
      <div class='game-team-container'>
        <p>No preseason games...</p>
      </div>
    `;
    div.classList.add('team-preseason-card');
    li.appendChild(div);
    psContainer.appendChild(li);
  } else {
    for (let x = 0; x < preSeason.length; x++) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      const dropdown = document.createElement('div');
      const slideOut = document.createElement('div');
      const formattedDate = new Date(preSeason[x].gameDate);
      const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      // console.log(preSeason[x]);
      li.innerHTML = `
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
                <img src='img/${preSeason[x].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.away.team.name} Logo" width="300" height="308">
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
                <img src='img/${preSeason[x].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.home.team.name} Logo" width="300" height="308">
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
        <div class='game-dropdown-button' aria-label="Game Details Button">
          <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
        </div>
      `;
      dropdown.innerHTML = `
        <ul class='game-dropdown-container'>
          <li class='game-dropdown-header'>
            <div class="game-dropdown-team-logo">
              <img src='img/${preSeason[x].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.away.team.name} Logo" width="300" height="308">
            </div>
            <div>
              <h3>${preSeason[x].linescore.currentPeriodOrdinal}</h3>
              <span>${preSeason[x].linescore.currentPeriodTimeRemaining}</span>
            </div>
            <div class="game-dropdown-team-logo">
              <img src='img/${preSeason[x].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.home.team.name} Logo" width="300" height="308">
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
            More <i class='fa fa-arrow-right' aria-hidden='true'></i>
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
                  <img src='img/${boxScores.teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.away.team.name} Logo" width="300" height="308">
                </div>
                <div></div>
                <div class="game-dropdown-team-logo">
                  <img src='img/${boxScores.teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.home.team.name} Logo" width="300" height="308">
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
              <li class='game-slideout-hits'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.hits}</p>
                  <h3>Hits</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.hits}</p>
                </div>
              </li>
              <li class='game-slideout-fo-percent'>
                <div>
                  <p>${boxScores.teams.away.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                  <h3>FO%</h3>
                  <p>${boxScores.teams.home.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                </div>
              </li>
              <li class='game-slideout-coaches'>
                <h3>Coaches</h3>
                <div>
                  <p>${boxScores.teams.away.coaches[0].person.fullName}</p>
                  <p>${boxScores.teams.home.coaches[0].person.fullName}</p>
                </div>
              </li>
              <li class='game-slideout-officials'>
                <h3>Officials</h3>
                <div>
                  <p>Officials not listed yet...</p>
                </div>
              </li>
              <button type='button' class='game-slideout-hide-button'>
              <i class='fa fa-arrow-left' aria-hidden='true'></i> Less
              </button>
            </ul>
          `;
          // console.log(slideOut.childNodes[1]);
          if (boxScores.officials.length > 0) {
            slideOut.childNodes[1].childNodes[13].innerHTML = `
            <h3>Officials</h3>
            <div>
              <p>Referees :
                <span>${boxScores.officials[0].official.fullName}</span>
                <span>${boxScores.officials[1].official.fullName}</span>
              </p>
              
              <p>Linesmen :
                <span>${boxScores.officials[2].official.fullName}</span>
                <span>${boxScores.officials[3].official.fullName}</span>
              </p>
            </div>
          `;
          }
          slideOut.classList.add('game-slideout-details');
          li.appendChild(slideOut);
        });
      if (preSeason[x].broadcasts === undefined) {
        const p = document.createElement('p');
        const span = document.createElement('span');
        p.innerHTML = '<span>Watch :</span>';
        span.innerText = 'Check local listing...';
        p.classList.add('game-broadcast');
        p.appendChild(span);
        li.appendChild(p);
      }
      if (preSeason[x].broadcasts != undefined) {
        const p = document.createElement('p');
        p.innerHTML = '<span>Watch :</span>';
        for (let y = 0; y < preSeason[x].broadcasts.length; y++) {
          const span = document.createElement('span');
          span.innerText = `${preSeason[x].broadcasts[y].name}`;
          p.classList.add('game-broadcast');
          p.appendChild(span);
          li.appendChild(p);
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
          Int. ${preSeason[x].linescore.intermissionInfo.intermissionTimeRemaining}
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
      // shows dropdown for finished games
      if (preSeason[x].linescore.currentPeriodTimeRemaining === 'Final') {
        li.childNodes[7].style.display = 'inline';
        dropdown.classList.add('game-dropdown-toggle');
        li.childNodes[9].childNodes[1].classList.add('rotate');
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
      li.classList.add('team-preseason-card');
      li.appendChild(dropdown);
      li.appendChild(span);
      psContainer.appendChild(li);
    }
  }
}

function buildScheduleCarousel(api, data, container, altData, team) {
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const dropdown = document.createElement('div');
    const slideOut = document.createElement('div');
    const span = document.createElement('span');
    const formattedDate = new Date(data[i].gameDate);
    const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    div.innerHTML = `
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
              <img src='img/${data[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data[i].teams.away.team.name} Logo" width="300" height="308">
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
              <img src='img/${data[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data[i].teams.home.team.name} Logo" width="300" height="308">
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
      <div class='game-dropdown-button' aria-label="Game Details Button">
        <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
      </div>
    `;
    dropdown.innerHTML = `
      <ul class='game-dropdown-container'>
        <li class='game-dropdown-header'>
          <div class="game-dropdown-team-logo">
            <img src='img/${data[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data[i].teams.away.team.name} Logo" width="300" height="308">
          </div>
          <div>
            <h3>${data[i].linescore.currentPeriodOrdinal}</h3>
            <span>${data[i].linescore.currentPeriodTimeRemaining}</span>
          </div>
          <div class="game-dropdown-team-logo">
            <img src='img/${data[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${data[i].teams.home.team.name} Logo" width="300" height="308">
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
          More <i class='fa fa-arrow-right' aria-hidden='true'></i>
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
            <li class='game-slideout-header'>
              <div class="game-dropdown-team-logo">
                <img src='img/${boxScores.teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.away.team.name} Logo" width="300" height="308">
              </div>
              <div></div>
              <div class="game-dropdown-team-logo">
                <img src='img/${boxScores.teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${boxScores.teams.home.team.name} Logo" width="300" height="308">
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
            <li class='game-slideout-hits'>
              <div>
                <p>${boxScores.teams.away.teamStats.teamSkaterStats.hits}</p>
                <h3>Hits</h3>
                <p>${boxScores.teams.home.teamStats.teamSkaterStats.hits}</p>
              </div>
            </li>
            <li class='game-slideout-fo-percent'>
              <div>
                <p>${boxScores.teams.away.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
                <h3>FO%</h3>
                <p>${boxScores.teams.home.teamStats.teamSkaterStats.faceOffWinPercentage}%</p>
              </div>
            </li>
            <li class='game-slideout-coaches'>
              <h3>Coaches</h3>
              <div>
                <p>${boxScores.teams.away.coaches[0].person.fullName}</p>
                <p>${boxScores.teams.home.coaches[0].person.fullName}</p>
              </div>
            </li>
            <li class='game-slideout-officials'>
              <h3>Officials</h3>
              <div>
                <p>Officials not listed yet...</p>
              </div>
            </li>
            <button type='button' class='game-slideout-hide-button'>
            <i class='fa fa-arrow-left' aria-hidden='true'></i> Less
            </button>
          </ul>
        `;
        // console.log(slideOut.childNodes[1]);
        if (boxScores.officials.length > 0) {
          slideOut.childNodes[1].childNodes[13].innerHTML = `
          <h3>Officials</h3>
          <div>
            <p>Referees :
              <span>${boxScores.officials[0].official.fullName}</span>
              <span>${boxScores.officials[1].official.fullName}</span>
            </p>

            <p>Linesmen :
              <span>${boxScores.officials[2].official.fullName}</span>
              <span>${boxScores.officials[3].official.fullName}</span>
            </p> 
          </div>
        `;
        }
        slideOut.classList.add('game-slideout-details');
        div.appendChild(slideOut);
      });
    if (data[i].broadcasts === undefined) {
      const p = document.createElement('p');
      const span = document.createElement('span');
      p.innerHTML = '<span>Watch :</span>';
      span.innerText = 'Check local listing...';
      p.classList.add('game-broadcast');
      p.appendChild(span);
      div.appendChild(p);
    }
    if (data[i].broadcasts != undefined) {
      const p = document.createElement('p');
      p.innerHTML = '<span>Watch :</span>';
      for (let x = 0; x < data[i].broadcasts.length; x++) {
        const span = document.createElement('span');
        span.innerText = `${data[i].broadcasts[x].name}`;
        p.classList.add('game-broadcast');
        p.appendChild(span);
        div.appendChild(p);
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
        Int. ${data[i].linescore.intermissionInfo.intermissionTimeRemaining}
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
    // shows dropdown for finished games
    if (data[i].linescore.currentPeriodTimeRemaining === 'Final') {
      dropdown.classList.add('game-dropdown-toggle');
      div.childNodes[7].style.display = 'inline';
      div.childNodes[9].childNodes[1].classList.add('rotate');
      div.childNodes[5].innerText = `${data.length - i} of ${altData.length + data.length}`;
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
    div.classList.add('team-regular-season-card');
    div.appendChild(dropdown);
    li.appendChild(div);
    div.appendChild(span);
    container.appendChild(li);
  }
}