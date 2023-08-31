
async function getTeamSeasonStats(api, id, season) {
    const response = await fetch(`${api}/teams/${id}/stats?stats=statsSingleSeason&season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

function buildTeamSingleSeasonHeading(heading) {
    heading.innerHTML = `
        <th>Season</th>
        <th title="Games Played">GP</th>
        <th title="Wins">W</th>
        <th title="Losses">L</th>
        <th title="Overtime">OT</th>
        <th title="Ties">T</th>
        <th title="Shut Outs">SO</th>
        <th title="Shots Against">SA</th>
        <th title="Saves">SV</th>
        <th title="Save %">SV%</th>
        <th title="Goals Allowed">GA</th>
        <th title="Goals Against Average">GAA</th>
        <th title="Time on Ice">TOI</th>
        <th title="Total TOI">TTOI</th>
    `;
}

// function buildTeamSS(row, firstHalf, secondHalf, singleS){
//     row.replaceChildren();
//     row.innerHTML = `
//     <td title="Current Season">${firstHalf}/${secondHalf}</td>
//     <td>${singleS.stats[0].splits[0].stat.games}</td>
//     <td>${singleS.stats[0].splits[0].stat.gamesStarted}</td>
//     <td>${singleS.stats[0].splits[0].stat.wins}</td>
//     <td>${singleS.stats[0].splits[0].stat.losses}</td>
//     <td>${singleS.stats[0].splits[0].stat.ties}</td>
//     <td>${singleS.stats[0].splits[0].stat.shutouts}</td>
//     <td>${singleS.stats[0].splits[0].stat.ot}</td>
//     <td>${singleS.stats[0].splits[0].stat.shotsAgainst}</td>
//     <td>${singleS.stats[0].splits[0].stat.saves}</td>
//     <td>${Math.round(singleS.stats[0].splits[0].stat.savePercentage * 100) / 100}</td>
//     <td>${singleS.stats[0].splits[0].stat.goalsAgainst}</td>
//     <td>${Math.round(singleS.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</td>
//     <td>${singleS.stats[0].splits[0].stat.timeOnIcePerGame}</td>
//     <td>${singleS.stats[0].splits[0].stat.timeOnIce}</td>
// `;
// }