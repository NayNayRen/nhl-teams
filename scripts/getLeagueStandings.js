async function getLeagueStandings(api, season) {
    const response = await fetch(`${api}/standings?season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

function buildLeagueStandings(heading, table, standings) {
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
    for (let i = 0; i < standings.records.length; i++) {
        for (let x = 0; x < standings.records[i].teamRecords.length; x++) {
            const tr = document.createElement('tr');
            // console.log(standings.records[x].teamRecords[i]);
            tr.innerHTML = `
            <td>${standings.records[i].teamRecords[x].team.name}</td>
            <td>${standings.records[i].teamRecords[x].gamesPlayed}</td>
            <td>${standings.records[i].teamRecords[x].leagueRecord.wins}</td>
            <td>${standings.records[i].teamRecords[x].leagueRecord.losses}</td>
            <td>${standings.records[i].teamRecords[x].leagueRecord.ot}</td>
            <td>${standings.records[i].teamRecords[x].points}</td>
            <td>${Math.round(standings.records[i].teamRecords[x].pointsPercentage * 100) / 100}</td>
            <td>${standings.records[i].teamRecords[x].regulationWins}</td>
            <td>${standings.records[i].teamRecords[x].goalsScored}</td>
            <td>${standings.records[i].teamRecords[x].goalsAgainst}</td>
            `;
            table.appendChild(tr);
        }
    }
}