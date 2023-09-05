
// gets players single season stats
async function getPlayerSeasonStats(api, id, season) {
    const response = await fetch(`${api}/people/${id}/stats?stats=statsSingleSeason&season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

// get players regular season career stats
async function getPlayerCareerRegularSeasonStats(api, id) {
    const response = await fetch(`${api}/people/${id}/stats?stats=careerRegularSeason`);
    const data = await response.json();
    // console.log(data);
    return data;
}

// get players season playoff stats
async function getPlayerPlayoffStats(api, id, season) {
    const response = await fetch(`${api}/people/${id}/stats?stats=statsSingleSeasonPlayoffs&season=${season}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

// get players career playoff stats
async function getPlayerCareerPlayoffStats(api, id) {
    const response = await fetch(`${api}/people/${id}/stats?stats=careerPlayoffs`);
    const data = await response.json();
    // console.log(data);
    return data;
}

async function getPlayerTeamHistory(api, id) {
    const response = await fetch(`${api}/people/${id}/stats?stats=yearByYear`);
    const data = await response.json();
    // console.log(data);
    return data;
}

// goalie stats table build
function buildGoalieTableHeading(heading) {
    heading.innerHTML = `
        <h4>Season</h4>
        <h4 title="Games Played">GP</h4>
        <h4 title="Games Started">GS</h4>
        <h4 title="Wins">W</h4>
        <h4 title="Losses">L</h4>
        <h4 title="Ties">T</h4>
        <h4 title="Shut Outs">SO</h4>
        <h4 title="Overtime">OT</h4>
        <h4 title="Shots Against">SA</h4>
        <h4 title="Saves">SV</h4>
        <h4 title="Save %">SV%</h4>
        <h4 title="Goals Allowed">GA</h4>
        <h4 title="Goals Against Average">GAA</h4>
        <h4 title="Time on Ice">TOI</h4>
        <h4 title="Total TOI">TTOI</h4>
    `;
}

// goalie single season
function buildGoalieSS(row, firstHalf, secondHalf, singleS) {
    row.replaceChildren();
    for (key in singleS.stats[0].splits[0].stat) {
        // console.log(seasonPO.stats[0].splits[0].stat[key]);
        if (singleS.stats[0].splits[0].stat[key] === 'undefined' || singleS.stats[0].splits[0].stat[key] === 'NaN' || singleS.stats[0].splits[0].stat[key] === null) {
            singleS.stats[0].splits[0].stat[key] = '--';
        }
    }
    row.innerHTML = `
        <p title="Current Season">${firstHalf}/${secondHalf}</p>
        <p>${singleS.stats[0].splits[0].stat.games}</p>
        <p>${singleS.stats[0].splits[0].stat.gamesStarted}</p>
        <p>${singleS.stats[0].splits[0].stat.wins}</p>
        <p>${singleS.stats[0].splits[0].stat.losses}</p>
        <p>${singleS.stats[0].splits[0].stat.ties}</p>
        <p>${singleS.stats[0].splits[0].stat.shutouts}</p>
        <p>${singleS.stats[0].splits[0].stat.ot}</p>
        <p>${singleS.stats[0].splits[0].stat.shotsAgainst}</p>
        <p>${singleS.stats[0].splits[0].stat.saves}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.savePercentage * 100) / 100}</p>
        <p>${singleS.stats[0].splits[0].stat.goalsAgainst}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</p>
        <p>${singleS.stats[0].splits[0].stat.timeOnIcePerGame}</p>
        <p>${singleS.stats[0].splits[0].stat.timeOnIce}</p>
    `;
}

// goalie career regular season
function buildGoalieCRS(row, careerRS) {
    row.replaceChildren();
    for (key in careerRS.stats[0].splits[0].stat) {
        // console.log(seasonPO.stats[0].splits[0].stat[key]);
        if (careerRS.stats[0].splits[0].stat[key] === 'undefined' || careerRS.stats[0].splits[0].stat[key] === 'NaN' || careerRS.stats[0].splits[0].stat[key] === null) {
            careerRS.stats[0].splits[0].stat[key] = '--';
        }
    }
    row.innerHTML = `
        <p title="Career Regular Season">Career RS</p>
        <p>${careerRS.stats[0].splits[0].stat.games}</p>
        <p>${careerRS.stats[0].splits[0].stat.gamesStarted}</p>
        <p>${careerRS.stats[0].splits[0].stat.wins}</p>
        <p>${careerRS.stats[0].splits[0].stat.losses}</p>
        <p>--</p>
        <p>${careerRS.stats[0].splits[0].stat.shutouts}</p>
        <p>${careerRS.stats[0].splits[0].stat.ot}</p>
        <p>${careerRS.stats[0].splits[0].stat.shotsAgainst}</p>
        <p>${careerRS.stats[0].splits[0].stat.saves}</p>
        <p>${Math.round(careerRS.stats[0].splits[0].stat.savePercentage * 100) / 100}</p>
        <p>${careerRS.stats[0].splits[0].stat.goalsAgainst}</p>
        <p>${Math.round(careerRS.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</p>
        <p>${careerRS.stats[0].splits[0].stat.timeOnIcePerGame}</p>
        <p>${careerRS.stats[0].splits[0].stat.timeOnIce}</p>
    `;
}

// goalie season playoffs
function buildGoalieSPO(row, firstHalf, secondHalf, seasonPO) {
    row.replaceChildren();
    for (key in seasonPO.stats[0].splits[0].stat) {
        // console.log(seasonPO.stats[0].splits[0].stat[key]);
        if (seasonPO.stats[0].splits[0].stat[key] === 'undefined' || seasonPO.stats[0].splits[0].stat[key] === 'NaN' || seasonPO.stats[0].splits[0].stat[key] === null) {
            seasonPO.stats[0].splits[0].stat[key] = '--';
        }
    }
    row.innerHTML = `
        <p title="Season Playoffs">${firstHalf}/${secondHalf} PO</p>
        <p>${seasonPO.stats[0].splits[0].stat.games}</p>
        <p>${seasonPO.stats[0].splits[0].stat.gamesStarted}</p>
        <p>${seasonPO.stats[0].splits[0].stat.wins}</p>
        <p>${seasonPO.stats[0].splits[0].stat.losses}</p>
        <p>--</p>
        <p>${seasonPO.stats[0].splits[0].stat.shutouts}</p>
        <p>${seasonPO.stats[0].splits[0].stat.ot}</p>
        <p>${seasonPO.stats[0].splits[0].stat.shotsAgainst}</p>
        <p>${seasonPO.stats[0].splits[0].stat.saves}</p>
        <p>${Math.round(seasonPO.stats[0].splits[0].stat.savePercentage * 100) / 100}</p>
        <p>${seasonPO.stats[0].splits[0].stat.goalsAgainst}</p>
        <p>${Math.round(seasonPO.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</p>
        <p>${seasonPO.stats[0].splits[0].stat.timeOnIcePerGame}</p>
        <p>${seasonPO.stats[0].splits[0].stat.timeOnIce}</p>
    `;
}

// goalie career playoffs
function buildGoalieCPO(row, careerPO) {
    row.replaceChildren();
    for (key in careerPO.stats[0].splits[0].stat) {
        // console.log(careerPO.stats[0].splits[0].stat[key]);
        if (careerPO.stats[0].splits[0].stat[key] === 'undefined' || careerPO.stats[0].splits[0].stat[key] === 'NaN' || careerPO.stats[0].splits[0].stat[key] === null) {
            careerPO.stats[0].splits[0].stat[key] = '--';
        }
    }
    row.innerHTML = `
        <p title="Career Playoffs">Career PO</p>
        <p>${careerPO.stats[0].splits[0].stat.games}</p>
        <p>${careerPO.stats[0].splits[0].stat.gamesStarted}</p>
        <p>${careerPO.stats[0].splits[0].stat.wins}</p>
        <p>${careerPO.stats[0].splits[0].stat.losses}</p>
        <p>--</p>
        <p>${careerPO.stats[0].splits[0].stat.shutouts}</p>
        <p>${careerPO.stats[0].splits[0].stat.ot}</p>
        <p>${careerPO.stats[0].splits[0].stat.shotsAgainst}</p>
        <p>${careerPO.stats[0].splits[0].stat.saves}</p>
        <p>${Math.round(careerPO.stats[0].splits[0].stat.savePercentage * 100) / 100}</p>
        <p>${careerPO.stats[0].splits[0].stat.goalsAgainst}</p>
        <p>${Math.round(careerPO.stats[0].splits[0].stat.goalAgainstAverage * 100) / 100}</p>
        <p>${careerPO.stats[0].splits[0].stat.timeOnIcePerGame}</p>
        <p>${careerPO.stats[0].splits[0].stat.timeOnIce}</p>
    `;
}

// builds goalie team history table
function buildGoalieTH(table, heading, teamHistory) {
    table.replaceChildren();
    heading.innerHTML = `
        <h4>League</h4>
        <h4>Season</h4>
        <h4 title="Team">Team</h4>
        <h4 title="Games Played">GP</h4>
        <h4 title="Games Started">GS</h4>
        <h4 title="Wins">W</h4>
        <h4 title="Losses">L</h4>
        <h4 title="Ties">T</h4>
        <h4 title="Shut Outs">SO</h4>
        <h4 title="Overtime">OT</h4>
        <h4 title="Shots Against">SA</h4>
        <h4 title="Saves">SV</h4>
        <h4 title="Save %">SV%</h4>
        <h4 title="Goals Allowed">GA</h4>
        <h4 title="Goals Against Average">GAA</h4>
        <h4 title="Total TOI">TTOI</h4>
    `;
    table.appendChild(heading);
    for (let i = 0; i < teamHistory.stats[0].splits.length; i++) {
        const li = document.createElement('li');
        // console.log(table.children[i].children);
        const firstHalfSeason = teamHistory.stats[0].splits[i].season.slice(0, 4);
        const secondHalfSeason = teamHistory.stats[0].splits[i].season.slice(4);
        for (let x = 0; x < table.children[i].children.length; x++) {
            if (table.children[i].children[x].innerText === 'undefined' || table.children[i].children[x].innerText === 'NaN') {
                table.children[i].children[x].innerText = '--';
            }
            if (table.children[i].children[x].innerText === 'National Hockey League') {
                table.children[i].children[x].innerText = 'NHL';
            }
        }
        li.innerHTML = `
            <p title="League">${teamHistory.stats[0].splits[i].league.name}</p>
            <p>${firstHalfSeason}/${secondHalfSeason}</p>
            <p>${teamHistory.stats[0].splits[i].team.name}</p>
            <p>${teamHistory.stats[0].splits[i].stat.games}</p>
            <p>${teamHistory.stats[0].splits[i].stat.gamesStarted}</p>
            <p>${teamHistory.stats[0].splits[i].stat.wins}</p>
            <p>${teamHistory.stats[0].splits[i].stat.losses}</p>
            <p>--</p>
            <p>${teamHistory.stats[0].splits[i].stat.shutouts}</p>
            <p>${teamHistory.stats[0].splits[i].stat.ot}</p>
            <p>${teamHistory.stats[0].splits[i].stat.shotsAgainst}</p>
            <p>${teamHistory.stats[0].splits[i].stat.saves}</p>
            <p>${Math.round(teamHistory.stats[0].splits[i].stat.savePercentage * 100) / 100}</p>
            <p>${teamHistory.stats[0].splits[i].stat.goalsAgainst}</p>
            <p>${Math.round(teamHistory.stats[0].splits[i].stat.goalAgainstAverage * 100) / 100}</p>
            <p>${teamHistory.stats[0].splits[i].stat.timeOnIce}</p>
        `;
        table.appendChild(li);
    }
}

// skater stats table build
function buildSkaterTableHeading(heading) {
    heading.innerHTML = `
        <h4>Season</h4>
        <h4 title="Games Played">GP</h4>
        <h4 title="Goals">G</h4>
        <h4 title="Assists">A</h4>
        <h4 title="Points">P</h4>
        <h4 title="Plus Minus">+/-</h4>
        <h4 title="Penalty Minutes">PIM</h4>
        <h4 title="Power Play Goals">PPG</h4>
        <h4 title="Power Play Points">PPP</h4>
        <h4 title="Short Handed Goals">SHG</h4>
        <h4 title="Game Winning Goals">GWG</h4>
        <h4 title="Over Time Goals">OTG</h4>
        <h4 title="Shots">S</h4>
        <h4 title="Shot %">S%</h4>
        <h4 title="Time on Ice">TOI</h4>
        <h4 title="Total TOI">TTOI</h4>
    `;
}

// skater single season
function buildSkaterSS(row, firstHalf, secondHalf, singleS) {
    row.replaceChildren();
    for (key in singleS.stats[0].splits[0].stat) {
        // console.log(seasonPO.stats[0].splits[0].stat[key]);
        if (singleS.stats[0].splits[0].stat[key] === 'undefined' || singleS.stats[0].splits[0].stat[key] === 'NaN' || singleS.stats[0].splits[0].stat[key] === null) {
            singleS.stats[0].splits[0].stat[key] = '--';
        }
    }
    row.innerHTML = `
        <p title="Regular Season">${firstHalf}/${secondHalf}</p>
        <p>${singleS.stats[0].splits[0].stat.games}</p>
        <p>${singleS.stats[0].splits[0].stat.goals}</p>
        <p>${singleS.stats[0].splits[0].stat.assists}</p>
        <p>${singleS.stats[0].splits[0].stat.points}</p>
        <p>${singleS.stats[0].splits[0].stat.plusMinus}</p>
        <p>${singleS.stats[0].splits[0].stat.pim}</p>
        <p>${singleS.stats[0].splits[0].stat.powerPlayGoals}</p>
        <p>${singleS.stats[0].splits[0].stat.powerPlayPoints}</p>
        <p>${singleS.stats[0].splits[0].stat.shortHandedGoals}</p>
        <p>${singleS.stats[0].splits[0].stat.gameWinningGoals}</p>
        <p>${singleS.stats[0].splits[0].stat.overTimeGoals}</p>
        <p>${singleS.stats[0].splits[0].stat.shots}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.shotPct * 100) / 100}</p>
        <p>${singleS.stats[0].splits[0].stat.timeOnIcePerGame}</p>
        <p>${singleS.stats[0].splits[0].stat.timeOnIce}</p>
    `;
}

// skater career regular season
function buildSkaterCRS(row, careerRS) {
    row.replaceChildren();
    for (key in careerRS.stats[0].splits[0].stat) {
        // console.log(seasonPO.stats[0].splits[0].stat[key]);
        if (careerRS.stats[0].splits[0].stat[key] === 'undefined' || careerRS.stats[0].splits[0].stat[key] === 'NaN' || careerRS.stats[0].splits[0].stat[key] === null) {
            careerRS.stats[0].splits[0].stat[key] = '--';
        }
    }
    row.innerHTML = `
        <p title="Career Regular Season">Career RS</p>
        <p>${careerRS.stats[0].splits[0].stat.games}</p>
        <p>${careerRS.stats[0].splits[0].stat.goals}</p>
        <p>${careerRS.stats[0].splits[0].stat.assists}</p>
        <p>${careerRS.stats[0].splits[0].stat.points}</p>
        <p>${careerRS.stats[0].splits[0].stat.plusMinus}</p>
        <p>${careerRS.stats[0].splits[0].stat.pim}</p>
        <p>${careerRS.stats[0].splits[0].stat.powerPlayGoals}</p>
        <p>${careerRS.stats[0].splits[0].stat.powerPlayPoints}</p>
        <p>${careerRS.stats[0].splits[0].stat.shortHandedGoals}</p>
        <p>${careerRS.stats[0].splits[0].stat.gameWinningGoals}</p>
        <p>${careerRS.stats[0].splits[0].stat.overTimeGoals}</p>
        <p>${careerRS.stats[0].splits[0].stat.shots}</p>
        <p>${Math.round(careerRS.stats[0].splits[0].stat.shotPct * 100) / 100}</p>
        <p>${careerRS.stats[0].splits[0].stat.timeOnIcePerGame}</p>
        <p>${careerRS.stats[0].splits[0].stat.timeOnIce}</p>
    `;
}

// skater season playoffs
function buildSkaterSPO(row, firstHalf, secondHalf, seasonPO) {
    row.replaceChildren();
    for (key in seasonPO.stats[0].splits[0].stat) {
        // console.log(seasonPO.stats[0].splits[0].stat[key]);
        if (seasonPO.stats[0].splits[0].stat[key] === 'undefined' || seasonPO.stats[0].splits[0].stat[key] === 'NaN' || seasonPO.stats[0].splits[0].stat[key] === null) {
            seasonPO.stats[0].splits[0].stat[key] = '--';
        }
    }
    row.innerHTML = `
        <p title="Season Playoffs">${firstHalf}/${secondHalf} PO</p>
        <p>${seasonPO.stats[0].splits[0].stat.games}</p>
        <p>${seasonPO.stats[0].splits[0].stat.goals}</p>
        <p>${seasonPO.stats[0].splits[0].stat.assists}</p>
        <p>${seasonPO.stats[0].splits[0].stat.points}</p>
        <p>${seasonPO.stats[0].splits[0].stat.plusMinus}</p>
        <p>${seasonPO.stats[0].splits[0].stat.pim}</p>
        <p>${seasonPO.stats[0].splits[0].stat.powerPlayGoals}</p>
        <p>${seasonPO.stats[0].splits[0].stat.powerPlayPoints}</p>
        <p>${seasonPO.stats[0].splits[0].stat.shortHandedGoals}</p>
        <p>${seasonPO.stats[0].splits[0].stat.gameWinningGoals}</p>
        <p>${seasonPO.stats[0].splits[0].stat.overTimeGoals}</p>
        <p>${seasonPO.stats[0].splits[0].stat.shots}</p>
        <p>${Math.round(seasonPO.stats[0].splits[0].stat.shotPct * 100) / 100}</p>
        <p>${seasonPO.stats[0].splits[0].stat.timeOnIcePerGame}</p>
        <p>${seasonPO.stats[0].splits[0].stat.timeOnIce}</p>
    `;
}

// skater career playoffs
function buildSkaterCPO(row, careerPO) {
    row.replaceChildren();
    for (key in careerPO.stats[0].splits[0].stat) {
        if (careerPO.stats[0].splits[0].stat[key] === 'undefined' || careerPO.stats[0].splits[0].stat[key] === 'NaN' || careerPO.stats[0].splits[0].stat[key] === null) {
            careerPO.stats[0].splits[0].stat[key] = '--';
        }
    }
    row.innerHTML = `
        <p title="Career Playoffs">Career PO</p>
        <p>${careerPO.stats[0].splits[0].stat.games}</p>
        <p>${careerPO.stats[0].splits[0].stat.goals}</p>
        <p>${careerPO.stats[0].splits[0].stat.assists}</p>
        <p>${careerPO.stats[0].splits[0].stat.points}</p>
        <p>${careerPO.stats[0].splits[0].stat.plusMinus}</p>
        <p>${careerPO.stats[0].splits[0].stat.pim}</p>
        <p>${careerPO.stats[0].splits[0].stat.powerPlayGoals}</p>
        <p>${careerPO.stats[0].splits[0].stat.powerPlayPoints}</p>
        <p>${careerPO.stats[0].splits[0].stat.shortHandedGoals}</p>
        <p>${careerPO.stats[0].splits[0].stat.gameWinningGoals}</p>
        <p>${careerPO.stats[0].splits[0].stat.overTimeGoals}</p>
        <p>${careerPO.stats[0].splits[0].stat.shots}</p>
        <p>${Math.round(careerPO.stats[0].splits[0].stat.shotPct * 100) / 100}</p>
        <p>${careerPO.stats[0].splits[0].stat.timeOnIcePerGame}</p>
        <p>${careerPO.stats[0].splits[0].stat.timeOnIce}</p>
    `;
}

// builds skater team history table
function buildSkaterTH(table, heading, teamHistory) {
    table.replaceChildren();
    heading.innerHTML = `
        <h4>League</h4>
        <h4>Season</h4>
        <h4 title="Team">Team</h4>
        <h4 title="Games Played">GP</h4>
        <h4 title="Goals">G</h4>
        <h4 title="Assists">A</h4>
        <h4 title="Points">P</h4>
        <h4 title="Plus Minus">+/-</h4>
        <h4 title="Penalty Minutes">PIM</h4>
        <h4 title="Power Play Goals">PPG</h4>
        <h4 title="Power Play Points">PPP</h4>
        <h4 title="Short Handed Goals">SHG</h4>
        <h4 title="Game Winning Goals">GWG</h4>
        <h4 title="Over Time Goals">OTG</h4>
        <h4 title="Shots">S</h4>
        <h4 title="Shot %">S%</h4>
        <h4 title="Total TOI">TTOI</h4>
    `;
    table.appendChild(heading);
    for (let i = 0; i < teamHistory.stats[0].splits.length; i++) {
        const li = document.createElement('li');
        const firstHalfSeason = teamHistory.stats[0].splits[i].season.slice(0, 4);
        const secondHalfSeason = teamHistory.stats[0].splits[i].season.slice(4);
        for (let x = 0; x < table.children[i].children.length; x++) {
            if (table.children[i].children[x].innerText === 'undefined' || table.children[i].children[x].innerText === 'NaN') {
                table.children[i].children[x].innerText = '--';
            }
            if (table.children[i].children[x].innerText === 'National Hockey League') {
                table.children[i].children[x].innerText = 'NHL';
            }
        }
        li.innerHTML = `
            <p>${teamHistory.stats[0].splits[i].league.name}</p>
            <p>${firstHalfSeason}/${secondHalfSeason}</p>
            <p>${teamHistory.stats[0].splits[i].team.name}</p>
            <p>${teamHistory.stats[0].splits[i].stat.games}</p>
            <p>${teamHistory.stats[0].splits[i].stat.goals}</p>
            <p>${teamHistory.stats[0].splits[i].stat.assists}</p>
            <p>${teamHistory.stats[0].splits[i].stat.points}</p>
            <p>${teamHistory.stats[0].splits[i].stat.plusMinus}</p>
            <p>${teamHistory.stats[0].splits[i].stat.pim}</p>
            <p>${teamHistory.stats[0].splits[i].stat.powerPlayGoals}</p>
            <p>${teamHistory.stats[0].splits[i].stat.powerPlayPoints}</p>
            <p>${teamHistory.stats[0].splits[i].stat.shortHandedGoals}</p>
            <p>${teamHistory.stats[0].splits[i].stat.gameWinningGoals}</p>
            <p>${teamHistory.stats[0].splits[i].stat.overTimeGoals}</p>
            <p>${teamHistory.stats[0].splits[i].stat.shots}</p>
            <p>${Math.round(teamHistory.stats[0].splits[i].stat.shotPct * 100) / 100}</p>
            <p>${teamHistory.stats[0].splits[i].stat.timeOnIce}</p>
        `;
        table.appendChild(li);
    }
}