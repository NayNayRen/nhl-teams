
async function getTeamSeasonStats(api, id, season) {
    const response = await fetch(`${api}/teams/${id}/stats?stats=statsSingleSeason&season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

function buildTeamSingleSeasonHeading(heading) {
    heading.innerHTML = `
        <th title="Games Played">GP</th>
        <th title="Wins">W</th>
        <th title="Losses">L</th>
        <th title="Overtime">OT</th>
        <th title="Points">PTS</th>
        <th title="Point %">PT%</th>
        <th title="Goals For">GF</th>
        <th title="Goals Against">GA</th>
        <th title="Save %">SV%</th>
        <th title="Penalty Kill %">PK%</th>
        <th title="Power Play Goals">PPG</th>
        <th title="Power Play Goals Against">PPGA</th>
        <th title="Power Play Opportunities">PPO</th>
        <th title="Power Play %">PP%</th>
        <th title="Shots Allowed">SA</th>
        <th title="Shots Per Game">SPG</th>
        <th title="Shooting %">SH%</th>
    `;
}

function buildTeamSS(row, singleS) {
    row.replaceChildren();
    row.innerHTML = `
        <td>${singleS.stats[0].splits[0].stat.gamesPlayed}</td>
        <td>${singleS.stats[0].splits[0].stat.wins}</td>
        <td>${singleS.stats[0].splits[0].stat.losses}</td>
        <td>${singleS.stats[0].splits[0].stat.ot}</td>
        <td>${singleS.stats[0].splits[0].stat.pts}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.ptPctg * 10) / 10}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.goalsPerGame * 10) / 10}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.goalsAgainstPerGame * 10) / 10}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.savePctg * 100) / 100}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.penaltyKillPercentage * 10) / 10}</td>
        <td>${singleS.stats[0].splits[0].stat.powerPlayGoals}</td>
        <td>${singleS.stats[0].splits[0].stat.powerPlayGoalsAgainst}</td>
        <td>${singleS.stats[0].splits[0].stat.powerPlayOpportunities}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.powerPlayPercentage * 10) / 10}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.shotsAllowed * 10) / 10}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.shotsPerGame * 10) / 10}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.shootingPctg * 10) / 10}</td>
    `;
}

function buildTeamRegularSR(row, singleS) {
    row.replaceChildren();
    row.innerHTML = `
        <td>--</td>
        <td>${singleS.stats[1].splits[0].stat.wins}</td>
        <td>${singleS.stats[1].splits[0].stat.losses}</td>
        <td>${singleS.stats[1].splits[0].stat.ot}</td>
        <td>${singleS.stats[1].splits[0].stat.pts}</td>
        <td>${singleS.stats[1].splits[0].stat.ptPctg}</td>
        <td>${singleS.stats[1].splits[0].stat.goalsPerGame}</td>
        <td>${singleS.stats[1].splits[0].stat.goalsAgainstPerGame}</td>
        <td>${singleS.stats[1].splits[0].stat.savePctRank}</td>
        <td>${singleS.stats[1].splits[0].stat.penaltyKillPercentage}</td>
        <td>${singleS.stats[1].splits[0].stat.powerPlayGoals}</td>
        <td>${singleS.stats[1].splits[0].stat.powerPlayGoalsAgainst}</td>
        <td>${singleS.stats[1].splits[0].stat.powerPlayOpportunities}</td>
        <td>${singleS.stats[1].splits[0].stat.powerPlayPercentage}</td>
        <td>${singleS.stats[1].splits[0].stat.shotsAllowed}</td>
        <td>${singleS.stats[1].splits[0].stat.shotsPerGame}</td>
        <td>${singleS.stats[1].splits[0].stat.shootingPctRank}</td>
    `;
}