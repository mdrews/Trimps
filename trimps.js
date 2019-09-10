// ==UserScript==
// @name         Trimps
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://trimps.github.io/
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==
var $ = window.jQuery;

const FOOD = 'FOOD';
const WOOD = 'WOOD';
const SCIENCE = 'SCIENCE';

const BATTLE = 'BATTLE';


(function() {

    'use strict';

    setInterval(
        () => {
            loop()
        }
        ,1000);

    // Your code here...
})();

const loop = () => {

    var working = false;

    var foodOwned = $('#foodOwned').text();
    var woodOwned = $('#woodOwned').text();

    var trimpsOwned = $('#trimpsOwned').text();
    var trimpsMax = $('#trimpsMax').text();
    var trimpsEmployed = $('#trimpsEmployed').text();
    var maxEmployed = $('#maxEmployed').text();

    //JOBS
    var farmers = $('#FarmerOwned').text();
    var lumberjacks = $('#LumberjackOwned').text();

    var queue0 = $('#queueItem0').text();
    var traps = $('#trimpsCollectBtn').text().replace(/[^0-9\.]/g, '');
    //var traps = parseInt(trapReady);
    var inQueue = queue0 == '' ? false : true;
    var science = $('#scienceOwned').text();

    console.log(`food: ${foodOwned} wood: ${woodOwned} working: ${working} queue0: ${queue0} `);
    console.log(`farmers: ${farmers} lumberjacks: ${lumberjacks}`);


    if(inQueue == false) {
        if($('#fightBtn').length != 0) {
            $('#flightBtn').click;
            if($('#Battle').length != 0){
                research(BATTLE);
            }
            if(trimpsEmployed < maxEmployed) {
                if(foodOwned < 5) {
                    harvest(WOOD);
                } else if(farmers == 0 || farmers <= lumberjacks) {
                    $('#Farmer').click();
                } else {
                    $('#Lumberjack').click();
                }
            }
            if(trimpsOwned < 10 && traps > 0) {
                console.log('getting trimps');
                $('#trimpsCollectBtn').click();
            }
            else if(foodOwned < 10) {
                console.log('getting food');
                harvest(FOOD);
            }
            else if(woodOwned < 10) {
                console.log('getting wood');
                harvest(WOOD);
            }
            else if((woodOwned >= 10 && foodOwned >= 10) && (trimpsOwned < trimpsMax)) {
                console.log('trap');
                $('#Trap').click();
                $('#buildingsCollectBtn').click();
            }
            else if (science <= 10) {
                harvest(SCIENCE);
            }
        }
    }
}

const research = (research) => {
    switch(research) {
        case BATTLE:
            $('#Battle').click();
            $('#fightBtn').click();
    }
}

const harvest = (resource) => {
    switch(resource) {
        case FOOD:
            $('#foodCollectBtn').click();
            break;
        case WOOD:
            console.log('really getting wood');
            $('#woodCollectBtn').click();
            break;
        case SCIENCE:
            console.log('getting science');
            $('#scienceCollectBtn').click();
            break;
        default:
            break;
    }
}