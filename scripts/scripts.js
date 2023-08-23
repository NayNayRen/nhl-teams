function loadScript() {

  const allTeamsDropdownButton = document.querySelector('.all-teams-dropdown-button');
  const allTeamsDropdownList = document.querySelector('.all-teams-dropdown-list');
  const teamRosterDropdownButton = document.querySelector('.team-roster-dropdown-button');
  const teamRosterDropdownList = document.querySelector('.team-roster-dropdown-list');
  const singleTeamContainer = document.querySelector('.single-team-container');
  // single team data containers
  const team = document.querySelector('.team');
  const teamConference = document.querySelector('.team-conference');
  const teamDivision = document.querySelector('.team-division');
  const teamVenue = document.querySelector('.team-venue');
  const teamSite = document.querySelector('.team-site');
  const teamLogo = document.querySelector('.team-logo');

  const playerStatsContainer = document.querySelector('.player-stats-container');
  const playerName = document.querySelector('.player-name');
  const playerHeight = document.querySelector('.player-height');
  const playerWeight = document.querySelector('.player-weight');
  const playerAge = document.querySelector('.player-age');
  const playerDOB = document.querySelector('.player-dob');
  const playerBirthplace = document.querySelector('.player-birthplace');
  // default api
  const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
  };

  // gets all teams
  async function getAllTeams() {
    const res = await fetch(`${api.baseUrl}/teams`);
    const data = await res.json();
    return data;
  }

  // populates all teams dropdown
  async function populateTeamSelection() {
    const data = await getAllTeams();
    allTeamsDropdownList.innerHTML = data.teams.map(team => `
    <li class='team-dropdown-name'>${team.name}</li>
  `).sort().join('');
    let teamDropdownName = document.querySelectorAll('.team-dropdown-name');
    teamDropdownName.forEach((teamName) => {
      teamName.addEventListener('click', (e) => {
        showSingleTeam(e.target.innerText);
        setTimeout(() => {
          playerStatsContainer.classList.remove('single-team-container-toggle');
        }, 250);
      });
    });
  }

  // gets single team data
  async function showSingleTeam(teamDropdownSelection) {
    const data = await getAllTeams();
    const selectedTeam = teamDropdownSelection;
    for (let i = 0; i < data.teams.length; i++) {
      if (selectedTeam === data.teams[i].name) {
        team.innerText = data.teams[i].name;
        teamConference.innerText = data.teams[i].conference.name;
        teamDivision.innerText = data.teams[i].division.name;
        teamVenue.innerText = data.teams[i].venue.name;
        teamSite.innerHTML = `<a href='${data.teams[i].officialSiteUrl}' target='_blank'><span>${data.teams[i].officialSiteUrl}</span></a>`;
        teamLogo.innerHTML = `<img src='img/${data.teams[i].name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}.png'>`;
        populateTeamRoster(data.teams[i].id);
        setTimeout(() => {
          teamRosterDropdownList.classList.add('dropdown-list-toggle');
          singleTeamContainer.classList.add('single-team-container-toggle');
        }, 250);
      }
    }
  }

  // populates team roster dropdown
  async function populateTeamRoster(teamID) {
    const res = await fetch(`${api.baseUrl}/teams/${teamID}/roster`);
    const data = await res.json();
    teamRosterDropdownList.innerHTML = data.roster.map(players => `
    <li id='${players.person.id}' class='roster-dropdown-name'>${players.person.fullName}</li>
    `).sort().join('');
    let rosterDropdownName = document.querySelectorAll('.roster-dropdown-name');
    rosterDropdownName.forEach((rosterName) => {
      rosterName.addEventListener('click', (e) => {
        getPlayer(e.target.getAttribute('id'));
        // teamRosterDropdownList.classList.remove('dropdown-list-toggle');
      });
    });
  }

  // gets single player data
  async function getPlayer(id) {
    const response = await fetch(`${api.baseUrl}/people/${id}`);
    const data = await response.json();
    playerName.innerText = data.people[0].fullName;
    playerHeight.innerText = data.people[0].height;
    playerWeight.innerText = `${data.people[0].weight} lbs`;
    playerAge.innerText = data.people[0].currentAge;
    playerDOB.innerText = data.people[0].birthDate;
    playerBirthplace.innerText = `${data.people[0].birthCity}, ${data.people[0].birthCountry}`;
    setTimeout(() => {
      playerStatsContainer.classList.add('single-team-container-toggle');
    }, 250);
    // console.log(data);
  }

  allTeamsDropdownButton.addEventListener('click', () => {
    allTeamsDropdownList.classList.toggle('dropdown-list-toggle');
  });
  teamRosterDropdownButton.addEventListener('click', () => {
    teamRosterDropdownList.classList.toggle('dropdown-list-toggle');
  });
  populateTeamSelection();
}

window.addEventListener('load', () => {
  loadScript();
});
