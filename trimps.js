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
const BUILDING = 'BUILDING';
const TRIMPS = 'TRIMPS';

const BATTLE = 'BATTLE';


var working = false;

//Resources
var foodOwned = parseInt($('#foodOwned').text());
var foodMax = parseInt($('#foodMax').text());
var woodOwned = parseInt($('#woodOwned').text());
var woodMax = parseInt($('#woodMax').text());


//Infrastructure
var huts = parseInt($('#HutOwned').text());

var trimpsOwned = parseInt($('#trimpsOwned').text());
var trimpsMax = parseInt($('#trimpsMax').text());
var trimpsEmployed = parseInt($('#trimpsEmployed').text());
var maxEmployed = parseInt($('#maxEmployed').text());

//JOBS
var farmers = $('#FarmerOwned').length == 0 ? 0 : parseInt($('#FarmerOwned').text());
var lumberjacks = $('#LumberjackOwned').length == 0 ? 0 : parseInt($('#LumberjackOwned').text());
var scientists = $('#Scientist').length == 0 ? 0 : parseInt($('#Scientist').text());

var queue0 = $('#queueItem0').text();
var traps = $('#trimpsCollectBtn').text().replace(/[^0-9\.]/g, '');
//var traps = parseInt(trapReady);
var inQueue = $('#queueItem0').length;
var zone = $('#worldNumber').text();
var science = $('#scienceOwned').text();
var buildingQueue = $('#queueItemsHere div').length;


var researched = [];


var battle = $('#BattleOwned').text();
var fighting = $('#trimpsFighting').text();
var battleContainer = $('#battleContainer').css('visibility');

(function() {
    'use strict';
    setInterval(
        () => { loop() } ,1000);
})();



const loop = () => {

    getStats();

    console.log(`--------------------`);
    console.log(`food: ${foodOwned} wood: ${woodOwned} science: ${science}`);
    console.log(`working: ${working} zone: ${zone} traps: ${traps} battle: ${battle}`);
    console.log(`trimps: ${trimpsOwned} max: ${trimpsMax} employed: ${trimpsEmployed} max: ${maxEmployed}`);
    console.log(`farmers: ${farmers} lumberjacks: ${lumberjacks}`);

    

    if(trimpsMax >= 15) {
        console.log('AREA 2');
        attack();
        checkResources();
        checkHousing();
        assignJobs();
        doWork();
    }
    else {
        if(trimpsOwned < trimpsMax) {
            assignJobs();
            if(traps > 0) {
                harvest(TRIMPS);
            } else if(buildingQueue > 0) {
                harvest(BUILDING)
            } else if(foodOwned >= 10 && woodOwned >= 10) {
                $('#TrapOwned').click();
            } else if(foodOwned < 10) {
                harvest(FOOD);
            } else if (woodOwned < 10) {
                harvest(WOOD);
            } else if (queue0 != '') {
                harvest(TRIMPS);
            }
        } else {
            if(battleContainer == 'visible') {
                attack();
            } else {
                $('#BattleOwned').click();
                harvest(SCIENCE);
            }
        }
    }
}

const assignJobs = () => {
    if(trimpsOwned < 50) {
        if(farmers == 0 || farmers <= lumberjacks) {
            if(foodOwned < 5) {
                harvest(FOOD);
            } else {
                $('#FarmerOwned').click();
            }
        } else {
            if(foodOwned < 5) {
                harvest(FOOD);
            } else {
                $('#Lumberjack').click();
            }
        }
    }
}

const attack = () => {
    $('#fightBtn').click();
}


const checkHousing = () => {
    var nextHutFood = Math.floor(125*Math.pow(1.24, huts));
    var nextHutWood = Math.floor(75*Math.pow(1.24, huts));
    if(foodOwned >= nextHutFood && woodOwned >= nextHutWood) {
        $('#Hut').click();
    }
}

const checkResources = () => {
    if(foodOwned == foodMax) {
        console.log('barn!');
        $('#BarnOwned').click();
    }
    if(woodOwned == woodMax) {
        console.log('shed!');
        $('#ShedOwned').click();
    }
    if(foodOwned == foodMax) {
        console.log('barn!');
        $('#BarnOwned').click();
    }
}

const checkWorkQueue = () => {
    if(queue0 != '') {
        harvest(BUILDING);
    }
}

const doWork = () => {
    if(traps > 0 && trimpsOwned < trimpsMax) {
        console.log('trimps');
        harvest(TRIMPS);
    } else if(buildingQueue > 0) {
        harvest(BUILDING);
    } else if(trimpsOwned / trimpsMax < .75) {
        $('#TrapOwned').click();
    } else {
        harvest(SCIENCE);
    }
}

const getStats = () => {
    //Resources
    foodOwned = parseInt($('#foodOwned').text());
    foodMax = parseInt($('#foodMax').text());
    woodOwned = parseInt($('#woodOwned').text());
    woodMax = parseInt($('#woodMax').text());
    science = $('#scienceOwned').text();


    //Infrastructure
    huts = parseInt($('#HutOwned').text());

    trimpsOwned = parseInt($('#trimpsOwned').text());
    trimpsMax = parseInt($('#trimpsMax').text());
    trimpsEmployed = parseInt($('#trimpsEmployed').text());
    maxEmployed = parseInt($('#maxEmployed').text());

    //JOBS
    farmers = $('#FarmerOwned').length == 0 ? 0 : parseInt($('#FarmerOwned').text());
    lumberjacks = $('#LumberjackOwned').length == 0 ? 0 : parseInt($('#LumberjackOwned').text());
    //var scientists = parseInt($('#

    queue0 = $('#queueItem0').text();
    traps = $('#trimpsCollectBtn').text().replace(/[^0-9\.]/g, '');
    //var traps = parseInt(trapReady);
    inQueue = $('#queueItem0').length;
    zone = $('#worldNumber').text();
    buildingQueue = $('#queueItemsHere div').length;

    battleContainer = $('#battleContainer').css('visibility');
}

const harvest = (resource) => {
    switch(resource) {
        case FOOD:
            $('#foodCollectBtn').click();
            break;
        case WOOD:
            $('#woodCollectBtn').click();
            break;
        case SCIENCE:
            $('#scienceCollectBtn').click();
            break;
        case BUILDING:
            $('#buildingsCollectBtn').click();
            break;
        case TRIMPS:
            $('#trimpsCollectBtn').click();
            break;
        default:
            break;
    }
}

const research = (research) => {
    switch(research) {
        case BATTLE:
            $('#Battle').click();
            if(researched.includes(BATTLE)) {
               researched.push(BATTLE);
               }
            
    }
}