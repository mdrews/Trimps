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
var farmers = parseInt($('#FarmerOwned').text());
var lumberjacks = parseInt($('#LumberjackOwned').text());
//var scientists = parseInt($('#

var queue0 = $('#queueItem0').text();
var traps = $('#trimpsCollectBtn').text().replace(/[^0-9\.]/g, '');
//var traps = parseInt(trapReady);
var inQueue = queue0 == '' ? false : true;
var zone = $('#worldNumber').text();
var science = $('#scienceOwned').text();


var researched = [];

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

    console.log(`food: ${foodOwned} wood: ${woodOwned} working: ${working} zone: ${zone} traps: ${traps} inqueue: ${inQueue} queue0: ${queue0} `);
    console.log(`trimps: ${trimpsOwned} max: ${trimpsMax} employed: ${trimpsEmployed} max: ${maxEmployed}`);
    console.log(`farmers: ${farmers} lumberjacks: ${lumberjacks}`);
    console.log(researched);

    getStats();

    if(trimpsMax >= 15) {
        console.log('AREA 2');
        attack();
        checkResources();
        checkHousing();
        assignJobs();
        doWork();
    }
    else {
        console.log('starting');
        if(trimpsEmployed < maxEmployed) {
            if(traps > 0) {
                harvest(TRIMPS);
            } else if(queue0 != '') {
                harvest(BUILDING)
            } else if(foodOwned < 10) {
                harvest(FOOD);
            } else if (woodOwned < 10) {
                harvest(WOOD);
            } else if (queue0 != '') {
                harvest(TRIMPS);
            }
        } else {
            if($('#Battle').length != 0) {
                research(BATTLE);
            } else if(trimpsOwned >= 10 && researched.includes(BATTLE)) {
                attack();
            } else if (science <= 10 && trimpsOwned >= 10) {
                harvest(SCIENCE);
            }
        }
    }
}

const assignJobs = () => {
    if(queue0 != '') {
        $('#buildingsCollectBtn').click();
    }
    else {
        harvest(SCIENCE);
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

}

const getStats = () => {
    foodOwned = parseInt($('#foodOwned').text());

    foodMax = parseInt($('#foodMax').text());
    woodOwned = parseInt($('#woodOwned').text());
    woodMax = parseInt($('#woodMax').text());

    trimpsOwned = parseInt($('#trimpsOwned').text());
    trimpsMax = parseInt($('#trimpsMax').text());
    trimpsEmployed = $('#trimpsEmployed').text();
    maxEmployed = $('#maxEmployed').text();
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
            console.log('collecting');
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
            researched.push(BATTLE);
    }
}