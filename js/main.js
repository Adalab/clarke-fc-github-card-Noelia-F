'use strict';
const initial = function(){
  let adalabMembers = [];
  let memberInfo = {};
  const selectUser = document.querySelector('.select__user');
  const userBox = document.querySelector('.user__box');
  const memberSince = document.querySelector('.user__since');

  fetch('https://api.github.com/orgs/adalab/public_members?per_page=68')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
      adalabMembers = json;

      for(let i = 0; i < adalabMembers.length; i++){
        let optionUser = document.createElement('option');
        optionUser.value = adalabMembers[i].login;
        optionUser.innerHTML = adalabMembers[i].login;
        selectUser.appendChild(optionUser);
      }
    });

  selectUser.addEventListener('change', () => {
    let userName = event.target.value;
    if(userName !== 'Elige una usuaria'){
      fetch(`https://api.github.com/users/${userName}`)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
          memberInfo = json;
          renderUserInfo(memberInfo);
        })
    } else {
      userBox.innerHTML = ''; 
    }
  });
  function renderUserInfo(memberInfo){
    let imageLocation = '<img class="location" src="images/location.svg" alt="location">';
    if(memberInfo.location === null){
      memberInfo.location = '';
    }
    if(memberInfo.name === null){
      memberInfo.name = '';
    }

    userBox.innerHTML = `
    <div class="member-avatar__box">
    <img class="member-avatar" src=https://avatars1.githubusercontent.com/u/${memberInfo.id} alt="memeber avatar">
    </div>
    <div class="member-info">
      <h1 class="member__user-name">@${memberInfo.login}</h1>
      <h2 class="member__name">${memberInfo.name}</h2>
      <div class="member__location-box">
        ${imageLocation}
        <p class="member__location">${memberInfo.location}</p>
      </div>
    </div>
    <div class="member-social">
      ${createMemberSection(memberInfo.public_repos, 'Repos')}
      ${createMemberSection(memberInfo.followers, 'Followers')}
      ${createMemberSection(memberInfo.following, 'Following')}
    </div>`;
    memberSince.innerHTML = `Miembro desde ${new Date(memberInfo.created_at).getFullYear()}`;
  }

  function createMemberSection(title, info){
    return `<div class="member-social__section">
      <h3 class="member-social__title">${title}</h3>
      <p class="member-social__info">${info}</p>
    </div>`;
  }
}

initial();
