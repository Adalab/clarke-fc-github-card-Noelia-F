'use strict';
const initial = function(){
  let adalabUsers = [];
  let adalabInfo = {};
  const selectUser = document.querySelectorById('select__user');
  const userBox = document.querySelector('.user__box');
  const memberSince = document.querySelector('.user__since');

  fetch('https://api.github.com/org/adalab/public_members?per_page=68')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
      adalabMembers = json;

      for(let i=0; i<adalabMembers.length; i++){
        let optionUser = document.createElement('option');
        optionUser.value = adalabMembers[i].login;
        optionUser.innerHtml = adalabUsers[i].login;
        selectUser.appendChild(optionUser);
      }
    });
}
