async function getLeagueStandings(api, season) {
    const response = await fetch(`${api}/standings?season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

function buildLeagueStandings(heading, table, standings) {
    table.replaceChildren();
    heading.innerHTML = `
        <h4 title="Team">Team</h4>
        <h4 title="Games Played">GP</h4>
        <h4 title="Wins">W</h4>
        <h4 title="Losses">L</h4>
        <h4 title="Overtime">OT</h4>
        <h4 title="Regulation Wins">RW</h4>
        <h4 title="Points">PTS</h4>
        <h4 title="Point %">PT%</h4>
        <h4 title="Goals For">GF</h4>
        <h4 title="Goals Against">GA</h4>
        <h4 title="Power Play League Rank">PPLR</h4>
        <h4 title="Power Play Conference Rank">PPCR</h4>
        <h4 title="Power Play Division Rank">PPDR</h4>
    `;
    table.appendChild(heading);
    for (let i = 0; i < standings.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `
                <p><span>${i + 1}.</span>${standings[i].team.name}</p>
                <p>${standings[i].gamesPlayed}</p>
                <p>${standings[i].leagueRecord.wins}</p>
                <p>${standings[i].leagueRecord.losses}</p>
                <p>${standings[i].leagueRecord.ot}</p>
                <p>${standings[i].regulationWins}</p>
                <p>${standings[i].points}</p>
                <p>${Math.round(standings[i].pointsPercentage * 100) / 100}</p>
                <p>${standings[i].goalsScored}</p>
                <p>${standings[i].goalsAgainst}</p>
                <p>${standings[i].ppLeagueRank}</p>
                <p>${standings[i].ppConferenceRank}</p>
                <p>${standings[i].ppDivisionRank}</p>
            `;
        table.appendChild(li);
    }
}

function buildConferenceStandings(heading, table, standings) {
    table.replaceChildren();
    heading.innerHTML = `
        <h4 title="Team">Team</h4>
        <h4 title="Games Played">GP</h4>
        <h4 title="Wins">W</h4>
        <h4 title="Losses">L</h4>
        <h4 title="Overtime">OT</h4>
        <h4 title="Regulation Wins">RW</h4>
        <h4 title="Points">PTS</h4>
        <h4 title="Point %">PT%</h4>
        <h4 title="Goals For">GF</h4>
        <h4 title="Goals Against">GA</h4>
        <h4 title="Power Play League Rank">PPLR</h4>
        <h4 title="Power Play Conference Rank">PPCR</h4>
        <h4 title="Power Play Division Rank">PPDR</h4>
    `;
    table.appendChild(heading);
    for (let i = 0; i < standings.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `
                <p><span>${i + 1}.</span>${standings[i].team.name}</p>
                <p>${standings[i].gamesPlayed}</p>
                <p>${standings[i].leagueRecord.wins}</p>
                <p>${standings[i].leagueRecord.losses}</p>
                <p>${standings[i].leagueRecord.ot}</p>
                <p>${standings[i].regulationWins}</p>
                <p>${standings[i].points}</p>
                <p>${Math.round(standings[i].pointsPercentage * 100) / 100}</p>
                <p>${standings[i].goalsScored}</p>
                <p>${standings[i].goalsAgainst}</p>
                <p>${standings[i].ppLeagueRank}</p>
                <p>${standings[i].ppConferenceRank}</p>
                <p>${standings[i].ppDivisionRank}</p>
            `;
        table.appendChild(li);
    }
}

function buildDivisionStandings(heading, table, standings) {
    table.replaceChildren();
    heading.innerHTML = `
        <h4 title="Team">Team</h4>
        <h4 title="Games Played">GP</h4>
        <h4 title="Wins">W</h4>
        <h4 title="Losses">L</h4>
        <h4 title="Overtime">OT</h4>
        <h4 title="Regulation Wins">RW</h4>
        <h4 title="Points">PTS</h4>
        <h4 title="Point %">PT%</h4>
        <h4 title="Goals For">GF</h4>
        <h4 title="Goals Against">GA</h4>
        <h4 title="Power Play League Rank">PPLR</h4>
        <h4 title="Power Play Conference Rank">PPCR</h4>
        <h4 title="Power Play Division Rank">PPDR</h4>
    `;
    table.appendChild(heading);
    for (let i = 0; i < standings[0].teamRecords.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `
            <p><span>${i + 1}.</span>${standings[0].teamRecords[i].team.name}</p>
            <p>${standings[0].teamRecords[i].gamesPlayed}</p>
            <p>${standings[0].teamRecords[i].leagueRecord.wins}</p>
            <p>${standings[0].teamRecords[i].leagueRecord.losses}</p>
            <p>${standings[0].teamRecords[i].leagueRecord.ot}</p>
            <p>${standings[0].teamRecords[i].regulationWins}</p>
            <p>${standings[0].teamRecords[i].points}</p>
            <p>${Math.round(standings[0].teamRecords[i].pointsPercentage * 100) / 100}</p>
            <p>${standings[0].teamRecords[i].goalsScored}</p>
            <p>${standings[0].teamRecords[i].goalsAgainst}</p>
            <p>${standings[0].teamRecords[i].ppLeagueRank}</p>
            <p>${standings[0].teamRecords[i].ppConferenceRank}</p>
            <p>${standings[0].teamRecords[i].ppDivisionRank}</p>
        `;
        table.appendChild(li);
    }
}

function buildLeagueSchedules(schedule, scheduleContainer, date) {
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
    // const date = new Date();
    // console.log(date);
    // console.log(date.toDateString());
    // const selectedDate = new Date(regularSeason[0].gameDate);
    // console.log(selectedDate);
    for (let i = 0; i < regularSeason.length; i++) {
        const formattedDate = new Date(regularSeason[i].gameDate);
        if (date === formattedDate.toDateString()) {
            dailyGames.push(regularSeason[i]);
        }
    }
    if (dailyGames.length === 0) {
        console.log('empty');
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.innerHTML = `
            <div class='game-date-location'>
                <p class='game-date'>No games scheduled...</p>
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
            const gameDate = new Date(dailyGames[i].gameDate);
            const formattedTime = gameDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            div.innerHTML = `
                <div class='game-date-location'>
                    <p class='game-date'>${gameDate.toDateString()}</p>
                    <p class='game-time'>${formattedTime}</p>
                    <p class='game-location'>${dailyGames[i].venue.name}</p>
                </div>
                <div class='league-game-card-bottom-half'>
                    <div class='game-team-container'>
                        <p>Away :</p>
                        <p class='game-away-team-name'>
                            ${dailyGames[i].teams.away.team.name}
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
                            ${dailyGames[i].teams.home.team.name}
                        </p>
                        <p class='game-home-team-record'>
                            ${regularSeason[i].teams.home.leagueRecord.wins} - 
                            ${regularSeason[i].teams.home.leagueRecord.losses} - 
                            ${regularSeason[i].teams.home.leagueRecord.ot}
                        </p>
                    </div>
                </div>
                <span class='game-number'>Game ${i + 1} of ${dailyGames.length}</span>
            `;
            div.classList.add('league-game-card');
            li.appendChild(div);
            scheduleContainer.appendChild(li);
        }
    }
}