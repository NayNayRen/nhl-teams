// async function getLeagueStandings(api, season) {
//     const response = await fetch(`${api}/standings?season=${season}`);
//     const data = await response.json();
//     // console.log(data);
//     return data;
// }

function buildLeagueStandings(heading, table, standings) {
  table.replaceChildren();
  heading.innerHTML = `
        <h3 title="Team">Team</h3>
        <h3 title="Games Played">GP</h3>
        <h3 title="Wins">W</h3>
        <h3 title="Losses">L</h3>
        <h3 title="Overtime">OT</h3>
        <h3 title="Regulation Wins">RW</h3>
        <h3 title="Points">PTS</h3>
        <h3 title="Point %">PT%</h3>
        <h3 title="Goals For">GF</h3>
        <h3 title="Goals Against">GA</h3>
        <h3 title="Power Play League Rank">PPLR</h3>
        <h3 title="Power Play Conference Rank">PPCR</h3>
        <h3 title="Power Play Division Rank">PPDR</h3>
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
        <h3 title="Team">Team</h3>
        <h3 title="Games Played">GP</h3>
        <h3 title="Wins">W</h3>
        <h3 title="Losses">L</h3>
        <h3 title="Overtime">OT</h3>
        <h3 title="Regulation Wins">RW</h3>
        <h3 title="Points">PTS</h3>
        <h3 title="Point %">PT%</h3>
        <h3 title="Goals For">GF</h3>
        <h3 title="Goals Against">GA</h3>
        <h3 title="Power Play League Rank">PPLR</h3>
        <h3 title="Power Play Conference Rank">PPCR</h3>
        <h3 title="Power Play Division Rank">PPDR</h3>
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
        <h3 title="Team">Team</h3>
        <h3 title="Games Played">GP</h3>
        <h3 title="Wins">W</h3>
        <h3 title="Losses">L</h3>
        <h3 title="Overtime">OT</h3>
        <h3 title="Regulation Wins">RW</h3>
        <h3 title="Points">PTS</h3>
        <h3 title="Point %">PT%</h3>
        <h3 title="Goals For">GF</h3>
        <h3 title="Goals Against">GA</h3>
        <h3 title="Power Play League Rank">PPLR</h3>
        <h3 title="Power Play Conference Rank">PPCR</h3>
        <h3 title="Power Play Division Rank">PPDR</h3>
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