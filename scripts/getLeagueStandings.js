async function getLeagueStandings(api, season) {
    const response = await fetch(`${api}/standings?season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

function buildLeagueStandings(heading, table, standings) {
    table.replaceChildren();
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
    table.appendChild(heading);
    for (let i = 0; i < standings.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td>${standings[i].team.name}</td>
                <td>${standings[i].gamesPlayed}</td>
                <td>${standings[i].leagueRecord.wins}</td>
                <td>${standings[i].leagueRecord.losses}</td>
                <td>${standings[i].leagueRecord.ot}</td>
                <td>${standings[i].points}</td>
                <td>${Math.round(standings[i].pointsPercentage * 100) / 100}</td>
                <td>${standings[i].regulationWins}</td>
                <td>${standings[i].goalsScored}</td>
                <td>${standings[i].goalsAgainst}</td>
            `;
        table.appendChild(tr);
    }
}

function buildConferenceStandings(heading, table, standings) {
    table.replaceChildren();
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
    table.appendChild(heading);
    for (let i = 0; i < standings.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td>${standings[i].team.name}</td>
                <td>${standings[i].gamesPlayed}</td>
                <td>${standings[i].leagueRecord.wins}</td>
                <td>${standings[i].leagueRecord.losses}</td>
                <td>${standings[i].leagueRecord.ot}</td>
                <td>${standings[i].points}</td>
                <td>${Math.round(standings[i].pointsPercentage * 100) / 100}</td>
                <td>${standings[i].regulationWins}</td>
                <td>${standings[i].goalsScored}</td>
                <td>${standings[i].goalsAgainst}</td>
            `;
        table.appendChild(tr);
    }
}

function buildDivisionStandings(heading, table, standings) {
    table.replaceChildren();
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
    table.appendChild(heading);
    for (let i = 0; i < standings[0].teamRecords.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${standings[0].teamRecords[i].team.name}</td>
            <td>${standings[0].teamRecords[i].gamesPlayed}</td>
            <td>${standings[0].teamRecords[i].leagueRecord.wins}</td>
            <td>${standings[0].teamRecords[i].leagueRecord.losses}</td>
            <td>${standings[0].teamRecords[i].leagueRecord.ot}</td>
            <td>${standings[0].teamRecords[i].points}</td>
            <td>${Math.round(standings[0].teamRecords[i].pointsPercentage * 100) / 100}</td>
            <td>${standings[0].teamRecords[i].regulationWins}</td>
            <td>${standings[0].teamRecords[i].goalsScored}</td>
            <td>${standings[0].teamRecords[i].goalsAgainst}</td>
        `;
        table.appendChild(tr);
    }
}