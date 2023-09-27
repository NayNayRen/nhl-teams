async function getTeamSchedules(api) {
    const response = await fetch(`${api}/schedule?expand=schedule.broadcasts&expand=schedule.linescore&season=20232024`);
    const data = await response.json();
    // console.log(data);
    return data;
}

function buildLeagueSchedules(schedule, scheduleContainer, date) {
    scheduleContainer.replaceChildren();
    const regularSeason = [];
    const preSeason = [];
    let dailyGames = [];
    for (let i = 0; i < schedule.dates.length; i++) {
        // console.log(schedule.dates[i]);
        for (let x = 0; x < schedule.dates[i].games.length; x++) {
            // console.log(schedule.dates[i].games[x]);
            if (schedule.dates[i].games[x].gameType === 'PR') {
                preSeason.push(schedule.dates[i].games[x]);
            } else if (schedule.dates[i].games[x].gameType === 'R') {
                regularSeason.push(schedule.dates[i].games[x]);
            }
        }
    }
    // const date = new Date();
    // const selectedDate = new Date(regularSeason[0].gameDate);
    // console.log(regularSeason);
    // console.log(preSeason);
    // console.log(date);
    // console.log(date.toDateString());
    // console.log(selectedDate);
    for (let i = 0; i < regularSeason.length; i++) {
        const formattedDate = new Date(regularSeason[i].gameDate);
        if (date === formattedDate.toDateString()) {
            dailyGames.push(regularSeason[i]);
        }
    }
    if (dailyGames.length === 0) {
        // console.log('empty');
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.innerHTML = `
            <div class='game-date-location'>
                <p class='game-date'>${date.toDateString()}</p>
            </div>
            <div class='game-team-container'>
                <p>No games scheduled...</p>
            </div>
        `;
        div.classList.add('league-game-card');
        li.appendChild(div);
        scheduleContainer.appendChild(li);
    } else {
        // console.log(dailyGames);
        for (let i = 0; i < dailyGames.length; i++) {
            const li = document.createElement('li');
            const div = document.createElement('div');
            const dropdown = document.createElement('div');
            const gameDate = new Date(dailyGames[i].gameDate);
            const formattedTime = gameDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            div.innerHTML = `
                <div class='game-date-location'>
                    <p class='game-date'>${gameDate.toDateString()}</p>
                    <p class='game-time'>${formattedTime}</p>
                    <p class='game-location'>${dailyGames[i].venue.name}</p>
                </div>
                <div>
                    <div class='game-team-container'>
                        <p>Away :</p>
                        <p class='game-away-team-name'>
                            ${dailyGames[i].teams.away.team.name}
                            <span class="game-away-team-logo">
                                <img src='img/${dailyGames[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.away.team.name} Logo" width="300" height="308">
                            </span>
                        </p>
                        <p class='game-away-team-record'>
                            ${dailyGames[i].teams.away.leagueRecord.wins} - 
                            ${dailyGames[i].teams.away.leagueRecord.losses} - 
                            ${dailyGames[i].teams.away.leagueRecord.ot}
                        </p>
                    </div>
                    <div class='game-team-container'>
                        <p>Home :</p>
                        <p class='game-home-team-name'>
                            ${dailyGames[i].teams.home.team.name}
                            <span class="game-home-team-logo">
                                <img src='img/${dailyGames[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.home.team.name} Logo" width="300" height="308">
                            </span>
                        </p>
                        <p class='game-home-team-record'>
                            ${dailyGames[i].teams.home.leagueRecord.wins} - 
                            ${dailyGames[i].teams.home.leagueRecord.losses} - 
                            ${dailyGames[i].teams.home.leagueRecord.ot}
                        </p>
                    </div>
                </div>
                <span class='game-number'>Game ${i + 1} of ${dailyGames.length}</span>
                `;
            dropdown.innerHTML = `
                <ul class='game-dropdown-container'>
                    <li class='game-dropdown-header'>
                        <div class="game-dropdown-team-logo">
                            <img src='img/${dailyGames[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.away.team.name} Logo" width="300" height="308">
                        </div>
                        <div>
                            <h3>${dailyGames[i].linescore.currentPeriodOrdinal}</h3>
                            <span>${dailyGames[i].linescore.currentPeriodTimeRemaining}</span>
                        </div>
                        <div class="game-dropdown-team-logo">
                            <img src='img/${dailyGames[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${dailyGames[i].teams.home.team.name} Logo" width="300" height="308">
                        </div>
                    </li>
                    <li class='game-dropdown-goals'>
                        <div>
                            <p>${dailyGames[i].linescore.teams.away.goals}</p>
                            <h3>Goals</h3>
                            <p>${dailyGames[i].linescore.teams.home.goals}</p>
                        </div>
                    </li>
                    <li class='game-dropdown-shots'>
                        <div>
                            <p>${dailyGames[i].linescore.teams.away.shotsOnGoal}</p>
                            <h3>SOG</h3>
                            <p>${dailyGames[i].linescore.teams.home.shotsOnGoal}</p>
                        </div>
                    </li>
                    <div class='game-dropdown-button' aria-label="Game Details Button">
                        <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
                    </div>
                </ul>
            `;
            dropdown.classList.add('game-details-dropdown');
            // console.log(dropdown.childNodes[1].childNodes);
            if (dailyGames[i].linescore.currentPeriodOrdinal === undefined) {
                dropdown.childNodes[1].childNodes[1].childNodes[3].innerHTML = `
                    <h3>1st</h3>
                    <span>0:00</span>
                `;
            }
            if (dailyGames[i].linescore.periods.length > 0) {
                for (let x = 0; x < dailyGames[i].linescore.periods.length; x++) {
                    const goals = document.createElement('div');
                    const shots = document.createElement('div');
                    goals.innerHTML = `
                        <p>${dailyGames[i].linescore.periods[y].away.goals}</p>
                        <span>${dailyGames[i].linescore.periods[y].num}</span>
                        <p>${dailyGames[i].linescore.periods[y].home.goals}</p>
                    `;
                    shots.innerHTML = `
                        <p>${dailyGames[i].linescore.periods[x].away.shotsOnGoal}</p>
                        <span>${dailyGames[i].linescore.periods[x].num}</span>
                        <p>${dailyGames[i].linescore.periods[x].home.shotsOnGoal}</p>
                    `;
                    dropdown.childNodes[1].childNodes[3].appendChild(goals);
                    dropdown.childNodes[1].childNodes[5].appendChild(shots);
                }
            }
            if (dailyGames[i].broadcasts === undefined) {
                const p = document.createElement('p');
                const span = document.createElement('span');
                p.innerHTML = '<span>Watch :</span>';
                span.innerText = 'Check local listing...';
                p.classList.add('game-broadcast');
                p.appendChild(span);
                div.appendChild(p);
            }
            if (dailyGames[i].broadcasts != undefined) {
                const p = document.createElement('p');
                p.innerHTML = '<span>Watch :</span>';
                for (let x = 0; x < dailyGames[i].broadcasts.length; x++) {
                    const span = document.createElement('span');
                    span.innerText = `${dailyGames[i].broadcasts[x].name}`;
                    p.classList.add('game-broadcast');
                    p.appendChild(span);
                    div.appendChild(p);
                }
            }
            if (dailyGames[i].linescore.intermissionInfo.inIntermission === true) {
                const div = document.createElement('div');
                div.innerHTML = `
                    <span>Int. ${dailyGames[i].linescore.intermissionInfo.intermissionTimeRemaining}</span>
                `;
                div.classList.add('game-dropdown-intermission');
                dropdown.childNodes[1].childNodes[1].appendChild(div);
            }
            if (dailyGames[i].linescore.teams.away.powerPlay === true || dailyGames[i].linescore.teams.home.powerPlay === true) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <p>${dailyGames[i].linescore.teams.away.numSkaters}</p>
                    </div>
                    <div>
                        <span>PP</span>
                        <span>on</span>
                    </div>
                    <div>
                        <p>${dailyGames[i].linescore.teams.home.numSkaters}</p>
                    </div>
                `;
                li.classList.add('game-dropdown-powerplay');
                dropdown.childNodes[1].appendChild(li);
            }
            div.classList.add('league-game-card');
            div.appendChild(dropdown);
            li.appendChild(div);
            scheduleContainer.appendChild(li);
        }
    }
}

function buildTeamSchedule(schedule, team, rsContainer, psContainer) {
    rsContainer.replaceChildren();
    psContainer.replaceChildren();
    const regularSeason = [];
    const preSeason = [];
    for (let i = 0; i < schedule.dates.length; i++) {
        // console.log(schedule.dates[i].games);
        for (let x = 0; x < schedule.dates[i].games.length; x++) {
            if (schedule.dates[i].games[x].teams.away.team.name === team || schedule.dates[i].games[x].teams.home.team.name === team) {
                // console.log(schedule.dates[i].games[x].gameType);
                if (schedule.dates[i].games[x].gameType === 'PR') {
                    preSeason.push(schedule.dates[i].games[x]);
                } else if (schedule.dates[i].games[x].gameType === 'R') {
                    regularSeason.push(schedule.dates[i].games[x]);
                }
            }
        }
    }
    // regular season schedule
    for (let i = 0; i < regularSeason.length; i++) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const dropdown = document.createElement('div');
        const span = document.createElement('span');
        const formattedDate = new Date(regularSeason[i].gameDate);
        const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        // console.log(regularSeason[i]);
        div.innerHTML = `
            <div class='game-date-location'>
                <p class='game-date'>${formattedDate.toDateString()}</p>
                <p class='game-time'>${formattedTime}</p>
                <p class='game-location'>${regularSeason[i].venue.name}</p>
            </div>
            <div>
                <div class='game-team-container'>
                    <p>Away :</p>
                    <p class='game-away-team-name'>
                        ${regularSeason[i].teams.away.team.name}
                        <span class="game-away-team-logo">
                            <img src='img/${regularSeason[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${regularSeason[i].teams.away.team.name} Logo" width="300" height="308">
                        </span>
                    </p>
                    <p class='game-away-team-record'>
                        ${regularSeason[i].teams.away.leagueRecord.wins} - 
                        ${regularSeason[i].teams.away.leagueRecord.losses} - 
                        ${regularSeason[i].teams.away.leagueRecord.ot}
                    </p>
                </div>
                <div class='game-team-container'>
                    <p>Home :</p>
                    <p class='game-home-team-name'>
                        ${regularSeason[i].teams.home.team.name}
                        <span class="game-home-team-logo">
                            <img src='img/${regularSeason[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${regularSeason[i].teams.home.team.name} Logo" width="300" height="308">
                        </span>
                    </p>
                    <p class='game-home-team-record'>
                        ${regularSeason[i].teams.home.leagueRecord.wins} - 
                        ${regularSeason[i].teams.home.leagueRecord.losses} - 
                        ${regularSeason[i].teams.home.leagueRecord.ot}
                    </p>
                </div>
            </div>
            <span class='game-number'>Game ${i + 1} of ${regularSeason.length}</span>
        `;
        dropdown.innerHTML = `
            <ul class='game-dropdown-container'>
                <li class='game-dropdown-header'>
                    <div class="game-dropdown-team-logo">
                        <img src='img/${regularSeason[i].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${regularSeason[i].teams.away.team.name} Logo" width="300" height="308">
                    </div>
                    <div>
                        <h3>${regularSeason[i].linescore.currentPeriodOrdinal}</h3>
                        <span>${regularSeason[i].linescore.currentPeriodTimeRemaining}</span>
                    </div>
                    <div class="game-dropdown-team-logo">
                        <img src='img/${regularSeason[i].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${regularSeason[i].teams.home.team.name} Logo" width="300" height="308">
                    </div>
                </li>
                <li class='game-dropdown-goals'>
                    <div>
                        <p>${regularSeason[i].linescore.teams.away.goals}</p>
                        <h3>Goals</h3>
                        <p>${regularSeason[i].linescore.teams.home.goals}</p>
                    </div>
                </li>
                <li class='game-dropdown-shots'>
                    <div>
                        <p>${regularSeason[i].linescore.teams.away.shotsOnGoal}</p>
                        <h3>SOG</h3>
                        <p>${regularSeason[i].linescore.teams.home.shotsOnGoal}</p>
                    </div>
                </li>
                <div class='game-dropdown-button' aria-label="Game Details Button">
                    <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
                </div>
            </ul>
        `;
        dropdown.classList.add('game-details-dropdown');
        // console.log(dropdown.childNodes[1].childNodes);
        if (regularSeason[i].linescore.currentPeriodOrdinal === undefined) {
            dropdown.childNodes[1].childNodes[1].childNodes[3].innerHTML = `
                <h3>1st</h3>
                <span>0:00</span>
            `;
        }
        if (regularSeason[i].linescore.periods.length > 0) {
            for (let x = 0; x < regularSeason[i].linescore.periods.length; x++) {
                const goals = document.createElement('div');
                const shots = document.createElement('div');
                goals.innerHTML = `
                    <p>${regularSeason[i].linescore.periods[y].away.goals}</p>
                    <span>${regularSeason[i].linescore.periods[y].num}</span>
                    <p>${regularSeason[i].linescore.periods[y].home.goals}</p>
                `;
                shots.innerHTML = `
                    <p>${regularSeason[i].linescore.periods[x].away.shotsOnGoal}</p>
                    <span>${regularSeason[i].linescore.periods[x].num}</span>
                    <p>${regularSeason[i].linescore.periods[x].home.shotsOnGoal}</p>
                `;
                dropdown.childNodes[1].childNodes[3].appendChild(goals);
                dropdown.childNodes[1].childNodes[5].appendChild(shots);
            }
        }
        if (regularSeason[i].broadcasts === undefined) {
            const p = document.createElement('p');
            const span = document.createElement('span');
            p.innerHTML = '<span>Watch :</span>';
            span.innerText = 'Check local listing...';
            p.classList.add('game-broadcast');
            p.appendChild(span);
            div.appendChild(p);
        }
        if (regularSeason[i].broadcasts != undefined) {
            const p = document.createElement('p');
            p.innerHTML = '<span>Watch :</span>';
            for (let x = 0; x < regularSeason[i].broadcasts.length; x++) {
                const span = document.createElement('span');
                span.innerText = `${regularSeason[i].broadcasts[x].name}`;
                p.classList.add('game-broadcast');
                p.appendChild(span);
                div.appendChild(p);
            }
        }
        if (regularSeason[i].linescore.intermissionInfo.inIntermission === true) {
            const div = document.createElement('div');
            div.innerHTML = `
                <span>Int. ${regularSeason[i].linescore.intermissionInfo.intermissionTimeRemaining}</span>
            `;
            div.classList.add('game-dropdown-intermission');
            dropdown.childNodes[1].childNodes[1].appendChild(div);
        }
        if (regularSeason[i].linescore.teams.away.powerPlay === true || regularSeason[i].linescore.teams.home.powerPlay === true) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <p>${regularSeason[i].linescore.teams.away.numSkaters}</p>
                </div>
                <div>
                    <span>PP</span>
                    <span>on</span>
                </div>
                <div>
                    <p>${regularSeason[i].linescore.teams.home.numSkaters}</p>
                </div>
            `;
            li.classList.add('game-dropdown-powerplay');
            dropdown.childNodes[1].appendChild(li);
        }
        span.classList.add('game-home-team-indicator');
        if (regularSeason[i].teams.home.team.name === team) {
            span.style.display = 'block';
        }
        div.classList.add('league-game-card');
        div.appendChild(dropdown);
        li.appendChild(div);
        div.appendChild(span);
        rsContainer.appendChild(li);
    }
    // preseason schedule
    for (let x = 0; x < preSeason.length; x++) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const dropdown = document.createElement('div');
        const formattedDate = new Date(preSeason[x].gameDate);
        const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        // console.log(preSeason[x]);
        li.innerHTML = `
            <div class='game-date-location'>
                <p class='game-date'>${formattedDate.toDateString()}</p>
                <p class='game-time'>${formattedTime}</p>
                <p class='game-location'>${preSeason[x].venue.name}</p>
            </div>
            <div>
                <div class='game-team-container'>
                    <p>Away :</p>
                    <p class='game-away-team-name'>
                        ${preSeason[x].teams.away.team.name}
                        <span class="game-away-team-logo">
                            <img src='img/${preSeason[x].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.away.team.name} Logo" width="300" height="308">
                        </span>
                    </p>
                    <p class='game-away-team-record'>
                        ${preSeason[x].teams.away.leagueRecord.wins} - 
                        ${preSeason[x].teams.away.leagueRecord.losses}
                    </p>
                </div>
                <div class='game-team-container'>
                    <p>Home :</p>
                    <p class='game-home-team-name'>
                        ${preSeason[x].teams.home.team.name}
                        <span class="game-home-team-logo">
                            <img src='img/${preSeason[x].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.home.team.name} Logo" width="300" height="308">
                        </span>
                    </p>
                    <p class='game-home-team-record'>
                        ${preSeason[x].teams.home.leagueRecord.wins} - 
                        ${preSeason[x].teams.home.leagueRecord.losses}
                    </p>
                </div>
            </div>
            <span class='game-number'>Game ${x + 1} of ${preSeason.length}</span>
        `;
        dropdown.innerHTML = `
            <ul class='game-dropdown-container'>
                <li class='game-dropdown-header'>
                    <div class="game-dropdown-team-logo">
                        <img src='img/${preSeason[x].teams.away.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.away.team.name} Logo" width="300" height="308">
                    </div>
                    <div>
                        <h3>${preSeason[x].linescore.currentPeriodOrdinal}</h3>
                        <span>${preSeason[x].linescore.currentPeriodTimeRemaining}</span>
                    </div>
                    <div class="game-dropdown-team-logo">
                        <img src='img/${preSeason[x].teams.home.team.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png' alt="${preSeason[x].teams.home.team.name} Logo" width="300" height="308">
                    </div>
                </li>
                <li class='game-dropdown-goals'>
                    <div>
                        <p>${preSeason[x].linescore.teams.away.goals}</p>
                        <h3>Goals</h3>
                        <p>${preSeason[x].linescore.teams.home.goals}</p>
                    </div>
                </li>
                <li class='game-dropdown-shots'>
                    <div>
                        <p>${preSeason[x].linescore.teams.away.shotsOnGoal}</p>
                        <h3>SOG</h3>
                        <p>${preSeason[x].linescore.teams.home.shotsOnGoal}</p>
                    </div>
                </li>
                <div class='game-dropdown-button' aria-label="Game Details Button">
                    <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
                </div>
            </ul>
        `;
        dropdown.classList.add('game-details-dropdown');
        // console.log(dropdown.childNodes[1].childNodes);
        if (preSeason[x].linescore.currentPeriodOrdinal === undefined) {
            dropdown.childNodes[1].childNodes[1].childNodes[3].innerHTML = `
                <h3>1st</h3>
                <span>0:00</span>
            `;
        }
        if (preSeason[x].linescore.periods.length > 0) {
            for (let y = 0; y < preSeason[x].linescore.periods.length; y++) {
                const goals = document.createElement('div');
                const shots = document.createElement('div');
                goals.innerHTML = `
                    <p>${preSeason[x].linescore.periods[y].away.goals}</p>
                    <span>${preSeason[x].linescore.periods[y].num}</span>
                    <p>${preSeason[x].linescore.periods[y].home.goals}</p>
                `;
                shots.innerHTML = `
                    <p>${preSeason[x].linescore.periods[y].away.shotsOnGoal}</p>
                    <span>${preSeason[x].linescore.periods[y].num}</span>
                    <p>${preSeason[x].linescore.periods[y].home.shotsOnGoal}</p>
                `;
                dropdown.childNodes[1].childNodes[3].appendChild(goals);
                dropdown.childNodes[1].childNodes[5].appendChild(shots);
            }
        }
        if (preSeason[x].broadcasts === undefined) {
            const p = document.createElement('p');
            const span = document.createElement('span');
            p.innerHTML = '<span>Watch :</span>';
            span.innerText = 'Check local listing...';
            p.classList.add('game-broadcast');
            p.appendChild(span);
            li.appendChild(p);
        }
        if (preSeason[x].broadcasts != undefined) {
            const p = document.createElement('p');
            p.innerHTML = '<span>Watch :</span>';
            for (let y = 0; y < preSeason[x].broadcasts.length; y++) {
                const span = document.createElement('span');
                span.innerText = `${preSeason[x].broadcasts[y].name}`;
                p.classList.add('game-broadcast');
                p.appendChild(span);
                li.appendChild(p);
            }
        }
        if (preSeason[x].linescore.intermissionInfo.inIntermission === true) {
            const div = document.createElement('div');
            div.innerHTML = `
                <span>Int. ${preSeason[x].linescore.intermissionInfo.intermissionTimeRemaining}</span>
            `;
            div.classList.add('game-dropdown-intermission');
            dropdown.childNodes[1].childNodes[1].appendChild(div);
        }
        if (preSeason[x].linescore.teams.away.powerPlay === true || preSeason[x].linescore.teams.home.powerPlay === true) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <p>${preSeason[x].linescore.teams.away.numSkaters}</p>
                </div>
                <div>
                    <span>PP</span>
                    <span>on</span>
                </div>
                <div>
                    <p>${preSeason[x].linescore.teams.home.numSkaters}</p>
                </div>
            `;
            li.classList.add('game-dropdown-powerplay');
            dropdown.childNodes[1].appendChild(li);
        }
        span.classList.add('game-home-team-indicator');
        if (preSeason[x].teams.home.team.name === team) {
            span.style.display = 'block';
        }
        li.classList.add('team-preseason-card');
        li.appendChild(dropdown);
        li.appendChild(span);
        psContainer.appendChild(li);
    }
}