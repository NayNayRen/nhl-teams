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
    for (let i = 0; i < standings.records.length; i++) {
        for (let x = 0; x < standings.records[i].teamRecords.length; x++) {
            const tr = document.createElement('tr');
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

// function buildDivisionHeading(heading) {
//     heading.replaceChildren();
//     heading.innerHTML = `
//         <th title="Team">Team</th>
//         <th title="Games Played">GP</th>
//         <th title="Wins">W</th>
//         <th title="Losses">L</th>
//         <th title="Overtime">OT</th>
//         <th title="Points">PTS</th>
//         <th title="Point %">PT%</th>
//         <th title="Regulation Wins">RW</th>
//         <th title="Goals For">GF</th>
//         <th title="Goals Against">GA</th>
//     `;
// }

function buildDivisionTable(heading, table, standings) {
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