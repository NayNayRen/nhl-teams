
async function getTeamSeasonStats(api, id, season) {
    const response = await fetch(`${api}/teams/${id}/stats?stats=statsSingleSeason&season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

async function getTeamSchedules(api) {
    const response = await fetch(`${api}/schedule?expand=schedule.broadcasts&season=20232024`);
    const data = await response.json();
    // console.log(data);
    return data;
}

function buildTeamSingleSeasonHeading(heading) {
    heading.innerHTML = `
        <h4 title="Games Played">GP</h4>
        <h4 title="Wins">W</h4>
        <h4 title="Losses">L</h4>
        <h4 title="Overtime">OT</h4>
        <h4 title="Points">PTS</h4>
        <h4 title="Point %">PT%</h4>
        <h4 title="Goals For">GF</h4>
        <h4 title="Goals Against">GA</h4>
        <h4 title="Save %">SV%</h4>
        <h4 title="Penalty Kill %">PK%</h4>
        <h4 title="Power Play Goals">PPG</h4>
        <h4 title="Power Play Goals Against">PPGA</h4>
        <h4 title="Power Play Opportunities">PPO</h4>
        <h4 title="Power Play %">PP%</h4>
        <h4 title="Shots Allowed">SA</h4>
        <h4 title="Shots Per Game">SPG</h4>
        <h4 title="Shooting %">SH%</h4>
    `;
}

function buildTeamSS(row, singleS) {
    if (singleS.stats[0].splits[0] === undefined) {
        row.innerHTML = `
          <p>Lockout occurred...No stats available...</p>
        `;
    } else {
        row.replaceChildren();
        row.innerHTML = `
        <p>${singleS.stats[0].splits[0].stat.gamesPlayed}</p>
        <p>${singleS.stats[0].splits[0].stat.wins}</p>
        <p>${singleS.stats[0].splits[0].stat.losses}</p>
        <p>${singleS.stats[0].splits[0].stat.ot}</p>
        <p>${singleS.stats[0].splits[0].stat.pts}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.ptPctg * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.goalsPerGame * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.goalsAgainstPerGame * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.savePctg * 100) / 100}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.penaltyKillPercentage * 10) / 10}</p>
        <p>${singleS.stats[0].splits[0].stat.powerPlayGoals}</p>
        <p>${singleS.stats[0].splits[0].stat.powerPlayGoalsAgainst}</p>
        <p>${singleS.stats[0].splits[0].stat.powerPlayOpportunities}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.powerPlayPercentage * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.shotsAllowed * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.shotsPerGame * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.shootingPctg * 10) / 10}</p>
        `;
    }
}

function buildTeamRegularSR(row, singleS) {
    if (singleS.stats[0].splits[0] === undefined) {
        row.innerHTML = `
          <p>Lockout occurred...No stats available...</p>
        `;
    } else {
        row.replaceChildren();
        row.innerHTML = `
        <p><i class="fa-solid fa-hockey-puck"
        aria-hidden="true"></i></p>
        <p>${singleS.stats[1].splits[0].stat.wins}</p>
        <p>${singleS.stats[1].splits[0].stat.losses}</p>
        <p>${singleS.stats[1].splits[0].stat.ot}</p>
        <p>${singleS.stats[1].splits[0].stat.pts}</p>
        <p>${singleS.stats[1].splits[0].stat.ptPctg}</p>
        <p>${singleS.stats[1].splits[0].stat.goalsPerGame}</p>
        <p>${singleS.stats[1].splits[0].stat.goalsAgainstPerGame}</p>
        <p>${singleS.stats[1].splits[0].stat.savePctRank}</p>
        <p>${singleS.stats[1].splits[0].stat.penaltyKillPercentage}</p>
        <p>${singleS.stats[1].splits[0].stat.powerPlayGoals}</p>
        <p>${singleS.stats[1].splits[0].stat.powerPlayGoalsAgainst}</p>
        <p>${singleS.stats[1].splits[0].stat.powerPlayOpportunities}</p>
        <p>${singleS.stats[1].splits[0].stat.powerPlayPercentage}</p>
        <p>${singleS.stats[1].splits[0].stat.shotsAllowed}</p>
        <p>${singleS.stats[1].splits[0].stat.shotsPerGame}</p>
        <p>${singleS.stats[1].splits[0].stat.shootingPctRank}</p>
        `;
    }
}

function buildTeamSchedule(schedule, team, rsContainer, psContainer) {
    rsContainer.replaceChildren();
    psContainer.replaceChildren();
    const regularSeason = [];
    const preSeason = [];
    for (let i = 0; i < schedule.dates.length; i++) {
        // console.log(schedule.dates[i].games);
        for (let x = 0; x < schedule.dates[i].games.length; x++) {
            if (schedule.dates[i].games[x].teams.away.team.name === team || schedule.dates[i].games[x].teams.home.team.name === team) {
                // console.log(schedule.dates[i].games[x].gameType);
                if (schedule.dates[i].games[x].gameType === 'PR') {
                    preSeason.push(schedule.dates[i].games[x]);
                } else if (schedule.dates[i].games[x].gameType === 'R') {
                    regularSeason.push(schedule.dates[i].games[x]);
                }
            }
        }
    }
    // regular season schedule
    for (let i = 0; i < regularSeason.length; i++) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const span = document.createElement('span');
        const formattedDate = new Date(regularSeason[i].gameDate);
        const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        // console.log(regularSeason[i]);
        // console.log(preSeason[i]);
        div.innerHTML = `
            <div class='game-date-location'>
                <p class='game-date'>${formattedDate.toDateString()}</p>
                <p class='game-time'>${formattedTime}</p>
                <p class='game-location'>${regularSeason[i].venue.name}</p>
            </div>
            <div class='game-team-container'>
                <p>Away :</p>
                <p class='game-away-team-name'>
                    ${regularSeason[i].teams.away.team.name}
                    <span class="game-away-team-logo">
                        <img src='img/${regularSeason[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${regularSeason[i].teams.away.team.name} Logo" width="300" height="308">
                    </span>
                </p>
                <p class='game-away-team-record'>
                    ${regularSeason[i].teams.away.leagueRecord.wins} - 
                    ${regularSeason[i].teams.away.leagueRecord.losses} - 
                    ${regularSeason[i].teams.away.leagueRecord.ot}
                </p>
           </div>
            <div class='game-team-container'>
                <p>Home :</p>
                <p class='game-home-team-name'>
                   ${regularSeason[i].teams.home.team.name}
                   <span class="game-home-team-logo">
                        <img src='img/${regularSeason[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${regularSeason[i].teams.home.team.name} Logo" width="300" height="308">
                    </span>
                </p>
                <p class='game-home-team-record'>
                    ${regularSeason[i].teams.home.leagueRecord.wins} - 
                    ${regularSeason[i].teams.home.leagueRecord.losses} - 
                    ${regularSeason[i].teams.home.leagueRecord.ot}
                </p>
            </div>
            <span class='game-number'>Game ${i + 1} of ${regularSeason.length}</span>
        `;
        span.classList.add('game-home-team-indicator');
        if (regularSeason[i].teams.home.team.name === team) {
            span.style.display = 'block';
        }
        div.classList.add('team-regular-season-card');
        div.appendChild(span);
        // li.classList.add('glide__slide');
        li.appendChild(div);
        rsContainer.appendChild(li);
    }
    // preseason schedule
    for (let x = 0; x < preSeason.length; x++) {
        const formattedDate = new Date(preSeason[x].gameDate);
        const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.innerHTML = `
            <div class='game-date-location'>
                <p class='game-date'>${formattedDate.toDateString()}</p>
                <p class='game-time'>${formattedTime}</p>
                <p class='game-location'>${preSeason[x].venue.name}</p>
            </div>
            <div class='team-game-card-bottom-half'></div>
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
            <span class='game-number'>Game ${x + 1} of ${preSeason.length}</span>
        `;
        span.classList.add('game-home-team-indicator');
        if (preSeason[x].teams.home.team.name === team) {
            span.style.display = 'block';
        }
        li.classList.add('team-preseason-card');
        li.appendChild(span);
        psContainer.appendChild(li);
    }
}