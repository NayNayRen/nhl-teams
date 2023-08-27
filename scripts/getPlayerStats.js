const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
};

// gets players single season stats
async function getPlayerSingleSeasonStats(id, season) {
    const response = await fetch(`${api.baseUrl}/people/${id}/stats?stats=statsSingleSeason&season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

// get players regular season career stats
async function getPlayerCareerRegularSeasonStats(id) {
    const response = await fetch(`${api.baseUrl}/people/${id}/stats?stats=careerRegularSeason`);
    const data = await response.json();
    // console.log(data);
    return data;
}

async function getPlayerCareerPlayoffStats(id) {
    const response = await fetch(`${api.baseUrl}/people/${id}/stats?stats=careerPlayoffs`);
    const data = await response.json();
    // console.log(data);
    return data;
}

// goalie stats table build
function buildGoalieTableHeading(heading) {
    heading.innerHTML = `
        <th>Season</th>
        <th title="Games Played">GP</th>
        <th title="Games Started">GS</th>
        <th title="Wins">W</th>
        <th title="Losses">L</th>
        <th title="Ties">T</th>
        <th title="Shoot Outs">SO</th>
        <th title="Overtime">OT</th>
        <th title="Shots Against">SA</th>
        <th title="Saves">SV</th>
        <th title="Save %">SV%</th>
        <th title="Goals Allowed">GA</th>
        <th title="Goals Against Average">GAA</th>
        <th title="Time on Ice">TOI</th>
        <th title="Total TOI">TTOI</th>
    `;
}

function buildGoalieSS(row, firstHalf, secondHalf, singleS) {
    row.innerHTML = `
        <td title="Current Season">${firstHalf}/${secondHalf}</td>
        <td>${singleS.stats[0].splits[0].stat.games}</td>
        <td>${singleS.stats[0].splits[0].stat.gamesStarted}</td>
        <td>${singleS.stats[0].splits[0].stat.wins}</td>
        <td>${singleS.stats[0].splits[0].stat.losses}</td>
        <td>${singleS.stats[0].splits[0].stat.ties}</td>
        <td>${singleS.stats[0].splits[0].stat.shutouts}</td>
        <td>${singleS.stats[0].splits[0].stat.ot}</td>
        <td>${singleS.stats[0].splits[0].stat.shotsAgainst}</td>
        <td>${singleS.stats[0].splits[0].stat.saves}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.savePercentage * 100) / 100}</td>
        <td>${singleS.stats[0].splits[0].stat.goalsAgainst}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</td>
        <td>${singleS.stats[0].splits[0].stat.timeOnIcePerGame}</td>
        <td>${singleS.stats[0].splits[0].stat.timeOnIce}</td>
    `;
}

function buildGoalieCRS(row, careerRS) {
    row.innerHTML = `
        <td title="Career Regular Season">Career RS</td>
        <td>${careerRS.stats[0].splits[0].stat.games}</td>
        <td>${careerRS.stats[0].splits[0].stat.gamesStarted}</td>
        <td>${careerRS.stats[0].splits[0].stat.wins}</td>
        <td>${careerRS.stats[0].splits[0].stat.losses}</td>
        <td>n/a</td>
        <td>${careerRS.stats[0].splits[0].stat.shutouts}</td>
        <td>${careerRS.stats[0].splits[0].stat.ot}</td>
        <td>${careerRS.stats[0].splits[0].stat.shotsAgainst}</td>
        <td>${careerRS.stats[0].splits[0].stat.saves}</td>
        <td>${Math.round(careerRS.stats[0].splits[0].stat.savePercentage * 100) / 100}</td>
        <td>${careerRS.stats[0].splits[0].stat.goalsAgainst}</td>
        <td>${Math.round(careerRS.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</td>
        <td>${careerRS.stats[0].splits[0].stat.timeOnIcePerGame}</td>
        <td>${careerRS.stats[0].splits[0].stat.timeOnIce}</td>
    `;
}

// GOALIE SEASON PLAYOFFS GO HERE

function buildGoalieCPO(row, careerPO) {
    row.innerHTML = `
        <td title="Career Playoffs">Career PO</td>
        <td>${careerPO.stats[0].splits[0].stat.games}</td>
        <td>${careerPO.stats[0].splits[0].stat.gamesStarted}</td>
        <td>${careerPO.stats[0].splits[0].stat.wins}</td>
        <td>${careerPO.stats[0].splits[0].stat.losses}</td>
        <td>n/a</td>
        <td>${careerPO.stats[0].splits[0].stat.shutouts}</td>
        <td>${careerPO.stats[0].splits[0].stat.ot}</td>
        <td>${careerPO.stats[0].splits[0].stat.shotsAgainst}</td>
        <td>${careerPO.stats[0].splits[0].stat.saves}</td>
        <td>${Math.round(careerPO.stats[0].splits[0].stat.savePercentage * 100) / 100}</td>
        <td>${careerPO.stats[0].splits[0].stat.goalsAgainst}</td>
        <td>${Math.round(careerPO.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</td>
        <td>${careerPO.stats[0].splits[0].stat.timeOnIcePerGame}</td>
        <td>${careerPO.stats[0].splits[0].stat.timeOnIce}</td>
    `;
}

// skater stats table build
function buildSkaterTableHeading(heading) {
    heading.innerHTML = `
        <th>Season</th>
        <th title="Games Played">GP</th>
        <th title="Goals">G</th>
        <th title="Assists">A</th>
        <th title="Points">P</th>
        <th title="Plus Minus">+/-</th>
        <th title="Penalty Minutes">PIM</th>
        <th title="Power Play Goals">PPG</th>
        <th title="Power Play Points">PPP</th>
        <th title="Short Handed Goals">SHG</th>
        <th title="Game Winning Goals">GWG</th>
        <th title="Over Time Goals">OTG</th>
        <th title="Shots">S</th>
        <th title="Shot %">S%</th>
        <th title="Time on Ice">TOI</th>
        <th title="Total TOI">TTOI</th>
    `;
}

function buildSkaterSS(row, firstHalf, secondHalf, singleS) {
    row.innerHTML = `
        <td title="Regular Season">${firstHalf}/${secondHalf}</td>
        <td>${singleS.stats[0].splits[0].stat.games}</td>
        <td>${singleS.stats[0].splits[0].stat.goals}</td>
        <td>${singleS.stats[0].splits[0].stat.assists}</td>
        <td>${singleS.stats[0].splits[0].stat.points}</td>
        <td>${singleS.stats[0].splits[0].stat.plusMinus}</td>
        <td>${singleS.stats[0].splits[0].stat.pim}</td>
        <td>${singleS.stats[0].splits[0].stat.powerPlayGoals}</td>
        <td>${singleS.stats[0].splits[0].stat.powerPlayPoints}</td>
        <td>${singleS.stats[0].splits[0].stat.shortHandedGoals}</td>
        <td>${singleS.stats[0].splits[0].stat.gameWinningGoals}</td>
        <td>${singleS.stats[0].splits[0].stat.overTimeGoals}</td>
        <td>${singleS.stats[0].splits[0].stat.shots}</td>
        <td>${Math.round(singleS.stats[0].splits[0].stat.shotPct * 100) / 100}</td>
        <td>${singleS.stats[0].splits[0].stat.timeOnIcePerGame}</td>
        <td>${singleS.stats[0].splits[0].stat.timeOnIce}</td>
    `;
}

function buildSkaterCRS(row, careerRS) {
    row.innerHTML = `
        <td title="Career Regular Season">Career RS</td>
        <td>${careerRS.stats[0].splits[0].stat.games}</td>
        <td>${careerRS.stats[0].splits[0].stat.goals}</td>
        <td>${careerRS.stats[0].splits[0].stat.assists}</td>
        <td>${careerRS.stats[0].splits[0].stat.points}</td>
        <td>${careerRS.stats[0].splits[0].stat.plusMinus}</td>
        <td>${careerRS.stats[0].splits[0].stat.pim}</td>
        <td>${careerRS.stats[0].splits[0].stat.powerPlayGoals}</td>
        <td>${careerRS.stats[0].splits[0].stat.powerPlayPoints}</td>
        <td>${careerRS.stats[0].splits[0].stat.shortHandedGoals}</td>
        <td>${careerRS.stats[0].splits[0].stat.gameWinningGoals}</td>
        <td>${careerRS.stats[0].splits[0].stat.overTimeGoals}</td>
        <td>${careerRS.stats[0].splits[0].stat.shots}</td>
        <td>${Math.round(careerRS.stats[0].splits[0].stat.shotPct * 100) / 100}</td>
        <td>${careerRS.stats[0].splits[0].stat.timeOnIcePerGame}</td>
        <td>${careerRS.stats[0].splits[0].stat.timeOnIce}</td>
    `;
}

// SKATER SEASON PLAYOFFS GO HERE

function buildSkaterCPO(row, careerPO) {
    row.innerHTML = `
        <td title="Career Playoffs">Career PO</td>
        <td>${careerPO.stats[0].splits[0].stat.games}</td>
        <td>${careerPO.stats[0].splits[0].stat.goals}</td>
        <td>${careerPO.stats[0].splits[0].stat.assists}</td>
        <td>${careerPO.stats[0].splits[0].stat.points}</td>
        <td>${careerPO.stats[0].splits[0].stat.plusMinus}</td>
        <td>${careerPO.stats[0].splits[0].stat.pim}</td>
        <td>${careerPO.stats[0].splits[0].stat.powerPlayGoals}</td>
        <td>${careerPO.stats[0].splits[0].stat.powerPlayPoints}</td>
        <td>${careerPO.stats[0].splits[0].stat.shortHandedGoals}</td>
        <td>${careerPO.stats[0].splits[0].stat.gameWinningGoals}</td>
        <td>${careerPO.stats[0].splits[0].stat.overTimeGoals}</td>
        <td>${careerPO.stats[0].splits[0].stat.shots}</td>
        <td>${Math.round(careerPO.stats[0].splits[0].stat.shotPct * 100) / 100}</td>
        <td>${careerPO.stats[0].splits[0].stat.timeOnIcePerGame}</td>
        <td>${careerPO.stats[0].splits[0].stat.timeOnIce}</td>
    `;
}