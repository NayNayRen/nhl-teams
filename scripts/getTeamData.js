
async function getTeamSeasonStats(api, id, season) {
    const response = await fetch(`${api}/teams/${id}/stats?stats=statsSingleSeason&season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

async function getTeamSchedules(api) {
    const response = await fetch(`${api}/schedule?season=20232024`);
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

function buildTeamSchedule(schedule, team, container) {
    const games = [];
    container.replaceChildren();
    for (let i = 0; i < schedule.dates.length; i++) {
        // console.log(schedule.dates[i].games);
        for (let x = 0; x < schedule.dates[i].games.length; x++) {
            if (schedule.dates[i].games[x].teams.away.team.name === team || schedule.dates[i].games[x].teams.home.team.name === team) {
                // console.log(schedule.dates[i].games[x]);
                games.push(schedule.dates[i].games[x]);
            }
        }
    }
    for (let i = 0; i < games.length; i++) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const formattedDate = new Date(games[i].gameDate);
        // console.log(formattedDate.toDateString());
        // console.log(games[i]);
        div.innerHTML = `
            <p class='game-date'>${formattedDate.toDateString()}</p>
            <div class='game-team-container'>
                <p>Away:</p>
                <p class='game-away-team-name'>
                    ${games[i].teams.away.team.name}
                </p>
           </div>
            <div class='game-team-container'>
                <p>Home:</p>
                <p class='game-home-team-name'>
                   ${games[i].teams.home.team.name}
                </p>
            </div>
            <span class='game-number'>${i + 1} of ${games.length}</span>
        `;
        div.classList.add('card');
        li.appendChild(div);
        li.classList.add('glide__slide');
        container.appendChild(li);
    }
}