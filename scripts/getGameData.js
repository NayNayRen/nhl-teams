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
            dropdown.innerHTML = `
                <div class='game-dropdown-container'>
                    <p>Game Data Dropdown Is Under Construction...</p>
                    <div class='game-dropdown-button' aria-label="Game Details Button">
                        <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
                    </div>
                </div>
            `;
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
            dropdown.classList.add('game-details-dropdown');
            div.classList.add('league-game-card');
            div.appendChild(dropdown);
            li.appendChild(div);
            scheduleContainer.appendChild(li);
            // div.addEventListener('click', () => {
            //     div.children[4].classList.toggle('game-dropdown-toggle');
            // });
            // $(document).on('click', '.game-dropdown-button', function () {
            //     $(this)[0].lastElementChild.classList.toggle('rotate');
            //     $(this)[0].parentElement.parentElement.classList.toggle('game-dropdown-toggle');
            // });
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
        // console.log(preSeason[i]);
        dropdown.innerHTML = `
            <div class='game-dropdown-container'>
                <p>Game Data Dropdown Is Under Construction...</p>
                <div class='game-dropdown-button' aria-label="Game Details Button">
                    <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
                </div>
            </div>
        `;
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
        span.classList.add('game-home-team-indicator');
        if (regularSeason[i].teams.home.team.name === team) {
            span.style.display = 'block';
        }
        dropdown.classList.add('game-details-dropdown');
        div.classList.add('team-regular-season-card');
        div.appendChild(dropdown);
        div.appendChild(span);
        li.appendChild(div);
        rsContainer.appendChild(li);
        // div.addEventListener('click', () => {
        //     div.children[4].classList.toggle('game-dropdown-toggle');
        // });
    }
    // preseason schedule
    for (let x = 0; x < preSeason.length; x++) {
        const li = document.createElement('li');
        const dropdown = document.createElement('div');
        const span = document.createElement('span');
        const formattedDate = new Date(preSeason[x].gameDate);
        const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        dropdown.innerHTML = `
            <div class='game-dropdown-container'>
                <p>Game Data Dropdown Is Under Construction...</p>
                <div class='game-dropdown-button' aria-label="Game Details Button">
                    <i class="fa-solid fa-caret-up" aria-hidden="false"></i>
                </div>
            </div>
        `;
        li.innerHTML = `
            <div class='game-date-location'>
                <p class='game-date'>${formattedDate.toDateString()}</p>
                <p class='game-time'>${formattedTime}</p>
                <p class='game-location'>${preSeason[x].venue.name}</p>
            </div>
            <div>
                <div class='team-game-card-bottom-half'></div>
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
        span.classList.add('game-home-team-indicator');
        if (preSeason[x].teams.home.team.name === team) {
            span.style.display = 'block';
        }
        dropdown.classList.add('game-details-dropdown');
        li.classList.add('team-preseason-card');
        li.appendChild(dropdown);
        li.appendChild(span);
        psContainer.appendChild(li);
        // li.addEventListener('click', () => {
        //     li.children[4].classList.toggle('game-dropdown-toggle');
        // });
    }
}