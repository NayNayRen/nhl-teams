function loadScript() {

  const singleTeam = document.querySelector('.single-team');
  const singleTeamList = document.querySelector('.single-team-list');
  const rosterSelectBox = document.getElementById('roster-select-box');
  const teamRosterContainer = document.querySelector('.team-roster-container');
  const playerStats = document.querySelector('.player-stats');

  const allTeamsDropdownButton = document.querySelector('.all-teams-dropdown-button');
  const allTeamsDropdownList = document.querySelector('.all-teams-dropdown-list');
  const teamRosterDropdownButton = document.querySelector('.team-roster-dropdown-button');
  const teamRosterDropdownList = document.querySelector('.team-roster-dropdown-list');
  const singleTeamContainer = document.querySelector('.single-team-container');
  // single team data containers
  const team = document.querySelector('.team');
  const teamConference = document.querySelector('.team-conference');
  const teamDivision = document.querySelector('.team-division');
  const teamArena = document.querySelector('.team-arena');
  const teamSite = document.querySelector('.team-site');
  const teamLogo = document.querySelector('.team-logo');
  // default api
  const api = {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1'
  };
  // gets all data
  async function getAllTeams() {
    const res = await fetch(`${api.baseUrl}/teams`);
    const data = await res.json();
    return data;
  }
  // gets all teams for dropdown
  async function populateTeamSelection() {
    const data = await getAllTeams();
    allTeamsDropdownList.innerHTML = data.teams.map(team => `
    <li class='team-dropdown-name'>${team.name}</li>
  `).sort().join('');
    let teamDropdownName = document.querySelectorAll('.team-dropdown-name');
    teamDropdownName.forEach((teamName) => {
      teamName.addEventListener('click', (e) => {
        showSingleTeam(e.target.innerText);
        // console.log(e.target.innerText);
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
        teamArena.innerText = data.teams[i].venue.name;
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
  // gets team roster data
  async function populateTeamRoster(teamID) {
    const res = await fetch(`${api.baseUrl}/teams/${teamID}/roster`);
    const data = await res.json();
    teamRosterDropdownList.innerHTML = data.roster.map(players => `
    <li class='roster-dropdown-name'>${players.person.fullName}</li>
    `).sort().join('');
    let rosterDropdownName = document.querySelectorAll('.roster-dropdown-name');
    rosterDropdownName.forEach((rosterName) => {
      rosterName.addEventListener('click', (e) => {
        getPlayer(e.target.innerText);
      });
    });
  }
  // gets single player data
  async function getPlayer(rosterDropdownSelection) {
    const selectedPlayer = rosterDropdownSelection;
    console.log(selectedPlayer);
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
