async function getLeagueStandings(api, season) {
    const response = await fetch(`${api}/standings?season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

function buildLeagueStandingsHeading(heading) {
    heading.innerHTML = `
        <th title="Team">Team</th>
        <th title="Games Played">GP</th>
        <th title="Wins">W</th>
        <th title="Losses">L</th>
        <th title="Overtime">OT</th>
        <th title="Points">PTS</th>
        <th title="Point %">PT%</th>
        <th title="Regulation Wins">RW</th>
        <th title="Goals For">GF</th>
        <th title="Goals Against">GA</th>
    `;
}

function buildLeagueStandings(row, standings) {
    row.innerHTML = `
        <td>${standings.records[0].teamRecords[0].team.name}</td>
        <td>${standings.records[0].teamRecords[0].gamesPlayed}</td>
        <td>${standings.records[0].teamRecords[0].leagueRecord.wins}</td>
        <td>${standings.records[0].teamRecords[0].leagueRecord.losses}</td>
        <td>${standings.records[0].teamRecords[0].leagueRecord.ot}</td>
        <td>${standings.records[0].teamRecords[0].points}</td>
        <td>${Math.round(standings.records[0].teamRecords[0].pointsPercentage * 100) / 100}</td>
        <td>${standings.records[0].teamRecords[0].regulationWins}</td>
        <td>${standings.records[0].teamRecords[0].goalsScored}</td>
        <td>${standings.records[0].teamRecords[0].goalsAgainst}</td>
    `;
}