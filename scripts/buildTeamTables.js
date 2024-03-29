
// async function getTeamSeasonStats(api, id, season) {
//     const response = await fetch(`${api}/teams/${id}/stats?stats=statsSingleSeason&season=${season}`);
//     const data = await response.json();
//     // console.log(data);
//     return data;
// }

function buildTeamSingleSeasonHeading(heading) {
  heading.innerHTML = `
        <h3 title="Games Played">GP</h3>
        <h3 title="Wins">W</h3>
        <h3 title="Losses">L</h3>
        <h3 title="Overtime">OT</h3>
        <h3 title="Points">PTS</h3>
        <h3 title="Point %">PT%</h3>
        <h3 title="Goals For">GF</h3>
        <h3 title="Goals Against">GA</h3>
        <h3 title="Save %">SV%</h3>
        <h3 title="Penalty Kill %">PK%</h3>
        <h3 title="Power Play Goals">PPG</h3>
        <h3 title="Power Play Goals Against">PPGA</h3>
        <h3 title="Power Play Opportunities">PPO</h3>
        <h3 title="Power Play %">PP%</h3>
        <h3 title="Shots Allowed">SA</h3>
        <h3 title="Shots Per Game">SPG</h3>
        <h3 title="Shooting %">SH%</h3>
    `;
}

function buildTeamSS(row, singleS) {
  if (singleS.stats[0].splits[0] === undefined) {
    row.innerHTML = `
          <p>Lockout occurred...No stats available...</p>
        `;
  } else {
    row.replaceChildren();
    row.innerHTML = `
        <p>${singleS.stats[0].splits[0].stat.gamesPlayed}</p>
        <p>${singleS.stats[0].splits[0].stat.wins}</p>
        <p>${singleS.stats[0].splits[0].stat.losses}</p>
        <p>${singleS.stats[0].splits[0].stat.ot}</p>
        <p>${singleS.stats[0].splits[0].stat.pts}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.ptPctg * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.goalsPerGame * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.goalsAgainstPerGame * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.savePctg * 100) / 100}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.penaltyKillPercentage * 10) / 10}</p>
        <p>${singleS.stats[0].splits[0].stat.powerPlayGoals}</p>
        <p>${singleS.stats[0].splits[0].stat.powerPlayGoalsAgainst}</p>
        <p>${singleS.stats[0].splits[0].stat.powerPlayOpportunities}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.powerPlayPercentage * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.shotsAllowed * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.shotsPerGame * 10) / 10}</p>
        <p>${Math.round(singleS.stats[0].splits[0].stat.shootingPctg * 10) / 10}</p>
        `;
  }
}

function buildTeamRegularSR(row, singleS) {
  if (singleS.stats[0].splits[0] === undefined) {
    row.innerHTML = `
          <p>Lockout occurred...No stats available...</p>
        `;
  } else {
    row.replaceChildren();
    row.innerHTML = `
        <p><i class="fa-solid fa-hockey-puck"
        aria-hidden="true"></i></p>
        <p>${singleS.stats[1].splits[0].stat.wins}</p>
        <p>${singleS.stats[1].splits[0].stat.losses}</p>
        <p>${singleS.stats[1].splits[0].stat.ot}</p>
        <p>${singleS.stats[1].splits[0].stat.pts}</p>
        <p>${singleS.stats[1].splits[0].stat.ptPctg}</p>
        <p>${singleS.stats[1].splits[0].stat.goalsPerGame}</p>
        <p>${singleS.stats[1].splits[0].stat.goalsAgainstPerGame}</p>
        <p>${singleS.stats[1].splits[0].stat.savePctRank}</p>
        <p>${singleS.stats[1].splits[0].stat.penaltyKillPercentage}</p>
        <p>${singleS.stats[1].splits[0].stat.powerPlayGoals}</p>
        <p>${singleS.stats[1].splits[0].stat.powerPlayGoalsAgainst}</p>
        <p>${singleS.stats[1].splits[0].stat.powerPlayOpportunities}</p>
        <p>${singleS.stats[1].splits[0].stat.powerPlayPercentage}</p>
        <p>${singleS.stats[1].splits[0].stat.shotsAllowed}</p>
        <p>${singleS.stats[1].splits[0].stat.shotsPerGame}</p>
        <p>${singleS.stats[1].splits[0].stat.shootingPctRank}</p>
        `;
  }
}