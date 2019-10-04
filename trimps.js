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

const million = 1000000;
const billion = 1000000000;

const roman = {
    "II": 2,
    "III": 3,
    "IV": 4,
    "V": 5,
    "VI": 6,
    "VII": 7,
    "VIII": 8,
    "IX": 9,
    "X": 10
}

const itemCost = {
    trainer: {
        food: 750,
        interval: 1.1
    },
    tribute: {
        food: 10000,
        interval: 1.05
    },
    nursery: {
        gems: 400000,
        wood: 1000000,
        metal: 500000,
        interval: 1.06
    },
    shield:         [0, 40,  2301,  85833,  2183000, 55300000, 1400*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    dagger:         [0, 40,  2301,  85833,  2183000, 55300000, 1400*million, 'test', Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    boots:          [0, 55,  3164,  118000, 3000000, 76000000, 1930*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    mace:           [0, 80,  4602,  172000, 4360000, 111*million, 2800*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    helmet:         [0, 100, 5752,  215000, 5450000, 138*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    polearm:        [0, 140, 8054,  301000, 7630000, 193*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    pants:          [0, 160, 9205,  344000, 8720000, 221*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    battleaxe:      [0, 230, 13200, 494000, Number.MAX_VALUE, 318*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    shoulderguards: [0, 275, 13200, 591000, Number.MAX_VALUE, 380*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    greatsword:     [0, 375, 18000, 806000, Number.MAX_VALUE, 518*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    breastplate:    [0, 415, 19900, 892000, Number.MAX_VALUE, 573*million, Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max(), Math.max()],
    helium: {
        agility: [4, 6, 8, 11, 14, 18, 23, 29, 37, 47, 61],
        bait: [4, 6, 8, 11, 14, 18, 23, 29, 37, 47, 61],
        trumps: [3, 5, 7, 9, 11, 14, 18, 23, 29, 37, 47, 60],
        pheromones: [3, 5, 7, 9, 11, 14, 18, 23, 29, 37, 47, 60],
        packrat: [3, 5, 7, 9, 11, 14, 18, 23, 29, 37, 47, 60],
        motivation: [3, 5, 7, 9, 11, 14, 18, 23, 29, 37, 47, 60],
        power: [],
        toughness: [],
        looting: []
    }
}

const convertNumber = field => {
    let valueNumber = parseFloat(field);
    let suffix = field[field.length-1];
    let returnNumber = Math.max();
    switch(suffix) {
        case 'K':
            returnNumber = (valueNumber * 1000);
            return Math.floor(returnNumber);;
        case 'M':
            returnNumber = (valueNumber * 1000000);
            return Math.floor(returnNumber);
        case 'B':
            returnNumber = (valueNumber * 1000000000);
            return Math.floor(returnNumber);
        default:
            return(valueNumber);
    }
}






var $ = window.jQuery;




const FOOD = 'FOOD';
const WOOD = 'WOOD';
const SCIENCE = 'SCIENCE';
const BUILDING = 'BUILDING';
const TRIMPS = 'TRIMPS';

const BATTLE = 'BATTLE';


var working = false;

//Resources
let foodOwned = convertNumber($('#foodOwned').text());
var foodMax = convertNumber($('#foodMax').text());
var woodOwned = convertNumber($('#woodOwned').text());
var woodMax = convertNumber($('#woodMax').text());
var metalOwned = convertNumber($('#metalOwned').text());
var metalMax = convertNumber($('#metalMax').text());
var scienceOwned = convertNumber($('#scienceOwned').text());
var fragmentsOwned = convertNumber($('#fragmentsOwned').text());
var gemsOwned = convertNumber($('#gemsOwned').text());
var heliumOwned = convertNumber($('#heliumOwned').text());
var bonesTokens = $('#boneBtnText').text().split(' ');
var bones = parseInt(bonesTokens[1]);

//Infrastructure
var huts = parseInt($('#HutOwned').text());
var gymOwned = parseInt($('#GymOwned').text());
var tributeOwned = parseInt($('#TributeOwned').text());
var nurseryOwned = parseInt($('#NurseryOwned').text());


//Trimps
var trimpsOwned = parseInt($('#trimpsOwned').text());
var trimpsMax = parseInt($('#trimpsMax').text());
var trimpsEmployed = parseInt($('#trimpsEmployed').text());
var maxEmployed = parseInt($('#maxEmployed').text());

//JOBS
var farmers = $('#FarmerOwned').length == 0 ? 0 : parseInt($('#FarmerOwned').text());
var lumberjacks = $('#LumberjackOwned').length == 0 ? 0 : parseInt($('#LumberjackOwned').text());
var miners = $('#MinerOwned').length == 0 ? 0 : parseInt($('#MinerOwned').text());
var scientists = $('#ScientistOwned').length == 0 ? 0 : parseInt($('#ScientistOwned').text());
var trainers = $('#TrainerOwned').length == 0 ? 0 : parseInt($('#TrainerOwned').text());
var explorers = $('#ExplorerOwned').length == 0 ? 0 : parseInt($('#ExplorerOwned').text());

var queue0 = $('#queueItem0').text();
var traps = $('#trimpsCollectBtn').text().replace(/[^0-9\.]/g, '');
var inQueue = $('#queueItem0').length;
var zone = $('#worldNumber').text();
var buildingQueue = $('#queueItemsHere div').length;


var researched = [];


var battle = $('#BattleOwned').text();
var fighting = $('#trimpsFighting').text();
var battleContainer = $('#battleContainer').css('visibility');

//Equipment
var shieldOwned = parseInt($('#ShieldOwned').text());
var daggerOwned = parseInt($('#DaggerOwned').text());
var bootsOwned = parseInt($('#BootsOwned').text());
var maceOwned = parseInt($('#MaceOwned').text());
var helmetOwned = parseInt($('#HelmetOwned').text());
var polearmOwned = parseInt($('#PolearmOwned').text());
var pantsOwned = parseInt($('#PantsOwned').text());
var battleaxeOwned = parseInt($('#BattleaxeOwned').text());
var shoulderguardsOwned = parseInt($('#ShoulderguardsOwned').text());
var greatswordOwned = parseInt($('#GreatswordOwned').text());
var breastplateOwned = parseInt($('#BreastplateOwned').text());

var shieldUpgrade = roman[$('#ShieldNumeral').text()];
var daggerUpgrade = roman[$('#DaggerNumeral').text()];
var bootsUpgrade = roman[$('#DaggerNumeral').text()];
var maceUpgrade = roman[$('#MaceNumeral').text()];
var helmetUpgrade = roman[$('#HelmetNumeral').text()];
var polearmUpgrade = roman[$('#PolearmNumeral').text()];
var pantsUpgrade = roman[$('#PantsNumeral').text()];
var battleaxeUpgrade = roman[$('#BattleaxeNumeral').text()];
var shoulderguardsUpgrade = roman[$('#ShoulderguardsNumeral').text()];
var greatswordUpgrade = roman[$('#GreatswordNumeral').text()];
var breastplateUpgrade = roman[$('#BreastplateNumeral').text()];


var worldName = $('#worldName').text();
var worldNumber = parseInt($('#worldNumber').text());
var mapToken = $('#mapsBtnText').text();
var mapsNumber= parseInt(mapToken.replace(/[Maps ()]/g, ''));
var mapBonus = parseInt($('#mapBonus').text());
var portals = parseInt($('#totalPortals').text());


var newMap = false;
var AUTOMATE = true;


(function() {
    'use strict';

    if(AUTOMATE) {
    setInterval(
        () => { loop() } ,1000);
    }
})();



const loop = () => {

    getStats();

    console.log(`--------------------`);
    console.log(`food: ${foodOwned}/${foodMax} wood: ${woodOwned}/${woodMax} metal: ${metalOwned}/${metalMax} science: ${scienceOwned} fragments: ${fragmentsOwned} gems: ${gemsOwned} helium: ${heliumOwned} bones: ${bones}`);
    console.log(`working: ${working} zone: ${zone} traps: ${traps} battle: ${battle}`);
    console.log(`trimps: ${trimpsOwned} max: ${trimpsMax} employed: ${trimpsEmployed} max: ${maxEmployed}`);
    console.log(`farmers: ${farmers} lumberjacks: ${lumberjacks} miners: ${miners} scientists: ${scientists} trainers: ${trainers} explorers: ${explorers}`);
    console.log(`Shield: ${shieldUpgrade}:${shieldOwned} dagger: ${daggerUpgrade}:${daggerOwned} boots: ${bootsUpgrade}:${bootsOwned} mace: ${maceUpgrade}:${maceOwned} helmet: ${helmetUpgrade}:${helmetOwned} polearm: ${polearmUpgrade}:${polearmOwned}`);
    console.log(`pants: ${pantsUpgrade}:${pantsOwned} battleaxe: ${battleaxeUpgrade}:${battleaxeOwned} shoulderguards: ${shoulderguardsUpgrade}:${shoulderguardsOwned} greatsword: ${greatswordUpgrade}:${greatswordOwned} breastplate: ${breastplateUpgrade}:${breastplateOwned}`);
    console.log(`World: ${worldNumber} mapBonus: ${mapBonus} portals: ${portals}`);
    console.log(`Gyms: ${gymOwned}`);

    if(trimpsMax >= 15) {
        if(trimpsOwned === trimpsMax) {
            attack();
        }
        if(heliumOwned > (portals*20 + 100)) { checkHelium(); }
        if($('#autoTrapBtn').length && $('#autoTrapBtn').text() == 'AutoTraps Off') $('#autoTrapBtn').click()
        checkBones();
        checkResources();
        checkInfrastructure();
        assignJobs();
        checkResearch();
        checkEquipment();
        doWork();
    }
    else {
        if(trimpsOwned < trimpsMax) {
            assignJobs();
            if(traps > 0) {
                harvest(TRIMPS);
            } else if(buildingQueue > 0) {
                harvest(BUILDING);
            } else if(foodOwned >= 10 && woodOwned >= 10) {
                $('#TrapOwned').click();
            } else if(foodOwned < 10) {
                harvest(FOOD);
            } else if (woodOwned < 10) {
                harvest(WOOD);
            } else if (queue0 != '') {
                harvest(TRIMPS);
            } else {
                harvest(TRIMPS);
            }
        } else {
            if(battleContainer == 'visible') {
                attack();
            } else if(trimpsEmployed < maxEmployed) {
                assignJobs();
            } else {
                $('#BattleOwned').click();
                harvest(SCIENCE);
            }
        }
    }
}

const assignJobs = () => {
    let maxScientists = 2;
    let maxExplorers = 0;
    let maxMiners = 10;

    if(trimpsMax > 1500) {
        maxMiners = 1000000;
        maxScientists = 50;
        maxExplorers = 10;
    } else if ( trimpsMax > 500) {
        maxMiners = 1000000;
        maxScientists = 20;
        maxExplorers = 2;
    } else {
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

    if($('#Trainer').length) {
        $('#Trainer').click();
    }
    if($('#Explorer').length && explorers < maxExplorers) {
        $('#Explorer').click();
    }
    else if($('#Scientist').length && scientists < maxScientists) {
        $('#Scientist').click();
    } else if ( miners < lumberjacks && miners < maxMiners) {
        $('#Miner').click();
    } else if (farmers <= lumberjacks) {
        $('#FarmerOwned').click();
    } else {
        $('#Lumberjack').click();
    }
}


const attack = () => {
    if(newMap == true) {
        createMap();
    } else if (mapBonus == 200 && $('#preMaps')[0].style.display == 'block') {
        $('#mapsBtnText').click();
    } else if (mapBonus == 200 && $('#preMaps')[0].style.display == 'none') {
        $('#fightBtn').click();
    } else if (worldName != 'Zone') {
        $('#fightBtn').click();
        if(mapBonus == 200) {
            if($('#mapsBtnText').text() != 'Abandon Soldiers') {
                $('#mapsBtnText').click();
            } else {

            }
        }
    } else if((worldNumber >= 8 && worldNumber <= 20) || worldNumber > 20) {
        if(worldNumber % 2 == 0 && mapBonus < 200 || (worldNumber >= 20 && mapBonus < 200)) {

            let mapTokens = [];
            let maxLevel = 0;
            let mapIndex = 0;
            mapTokens = $('#mapsHere div').find('span.thingOwned.mapLevel').text().split('Level ');
            let currentMaps = mapTokens.map(x => parseInt(x, 10));
            currentMaps.shift();
            for(let x = 0; x < currentMaps.length; x++) {
                if(maxLevel < currentMaps[x]){
                    maxLevel = currentMaps[x];
                    mapIndex = x;
                }
            }
            let specialMap = $('#mapsHere div.noRecycle').attr('id');
            if(specialMap) {
                $('#'+specialMap).click();
                $('#selectMapBtn').click();
            }
            else if($('#mapsBtnText').text() == 'Maps') {
                $('#mapsBtnText').click();
            } else if(maxLevel < worldNumber) {
                createMap();
            } else {
                let map = $('#mapsHere div.mapThing')[mapIndex];
                $('#' + $(map).attr('id')).click();
                $('#selectMapBtn').click();
            }
        } else {
            $('#fightBtn').click();
        }
    } else {
        $('#fightBtn').click();
    }
}

const createMap = () => {
    let mapLoot = parseInt($('#lootAdvMapsRange').val());
    let mapSize = parseInt($('#sizeAdvMapsRange').val());
    let mapDifficulty = parseInt($('#difficultyAdvMapsRange').val());
    let mapCost = convertNumber($('#mapCostFragmentCost').html());
    let mapCreatorLevel = parseInt($('#mapLevelInput').val());

    if(mapCreatorLevel < worldNumber) {
        incrementMapLevel(worldNumber-mapCreatorLevel);
    }
    console.log(`-Map- loot: ${mapLoot} size: ${mapSize} difficulty: ${mapDifficulty} cost: ${mapCost} fragments: ${fragmentsOwned}`);

    if(newMap == false) {
        $('#difficultyAdvMapsRange').val(9);
        $('#lootAdvMapsRange').val(9);
        $('#sizeAdvMapsRange').val(9);
        newMap = true
    } else


    if(mapCost > fragmentsOwned) {
        if(mapSize > 0) {
            $('#sizeAdvMapsRange').val(mapSize-1);
        } else if(mapLoot > 0) {
            $('#lootAdvMapsRange').val(mapLoot-1);
        } else if(mapDifficulty > 0) {
            $('#difficultyAdvMapsRange').val(mapDifficulty-1)
        }
    } else if ((mapSize == 0 && mapLoot == 0 && mapDifficulty == 0) && mapCost > fragmentsOwned) {
        newMap = false;
    } else {
        $('#mapCreateBtn').click();
        newMap = false;

    }
    $(document).ready(() => {updateMapNumbers()});
}

const checkBones = () => {
    if(bones > 50) {
        $('#boneBtnMain').click();

        if($('#Goblimp.importOwned').length === 0) $('#Goblimp').click();
        else if($('#Jestimp.importOwned').length === 0) $('#Jestimp').click();
        else if($('#Chrono.importOwned').length === 0) $('#Jestimp').click();
        else if($('#Titimp.importOwned').length === 0) $('#Jestimp').click();
        else if($('#Flutimp.importOwned').length === 0) $('#Flutimp').click();
        
        $('#importPurchaseBtn').click();
        $('#confirmTooltipBtn').click();
        $(document).ready(() => hideBones());
    }
}

const checkEquipment = () => {
    if('#Shield') {
        if(shieldOwned < 20 && woodOwned/4 > (Math.floor(itemCost.shield[shieldUpgrade]*Math.pow(1.2, shieldOwned))) && (woodOwned * 2 < itemCost.shield[shieldUpgrade+1])) $('#Shield').click();
    }
    if('#Dagger') {
        if(daggerOwned < 20 && metalOwned/4 > (Math.floor(itemCost.dagger[daggerUpgrade]*Math.pow(1.2, daggerOwned))) && (metalOwned * 2 < itemCost.dagger[daggerUpgrade+1])) $('#Dagger').click();
    }
    if('#Boots') {
        if(bootsOwned < 20 && metalOwned/4 > (Math.floor(itemCost.boots[bootsUpgrade]*Math.pow(1.2, bootsOwned))) && (metalOwned * 2 < itemCost.boots[bootsUpgrade+1])) $('#Boots').click();
    }
    if('#Mace') {
        if(maceOwned < 20 && metalOwned/4 > (Math.floor(itemCost.mace[maceUpgrade]*Math.pow(1.2, maceOwned))) && (metalOwned * 2 < itemCost.mace[maceUpgrade+1])) $('#Mace').click();
    }
    if('#Helmet') {
        if(helmetOwned < 20 && metalOwned/4 > (Math.floor(itemCost.helmet[helmetUpgrade]*Math.pow(1.2, helmetOwned))) && (metalOwned * 2 < itemCost.helmet[helmetUpgrade+1])) $('#Helmet').click();
    }
    if('#Polearm') {
        if(polearmOwned < 20 && metalOwned/4 > (Math.floor(itemCost.polearm[polearmUpgrade]*Math.pow(1.2, polearmOwned))) && (metalOwned * 2 < itemCost.polearm[polearmUpgrade+1])) $('#Polearm').click();
    }
    if('#Pants') {
        if(pantsOwned < 20 && metalOwned/4 > (Math.floor(itemCost.pants[pantsUpgrade]*Math.pow(1.2, pantsOwned))) && (metalOwned * 2 < itemCost.helmet[pantsUpgrade+1])) $('#Pants').click();
    }
    if('#Battleaxe') {
        if(battleaxeOwned < 20 && metalOwned/4 > (Math.floor(itemCost.battleaxe[battleaxeUpgrade]*Math.pow(1.2, battleaxeOwned))) && (metalOwned * 2 < itemCost.battleaxe[battleaxeUpgrade+1])) $('#Battleaxe').click();
    }
    if('#Shoulderguards') {
        if(shoulderguardsOwned < 20 && metalOwned/4 > (Math.floor(itemCost.shoulderguards[shoulderguardsUpgrade]*Math.pow(1.2, shoulderguardsOwned))) && (metalOwned * 2 < itemCost.shoulderguards[shoulderguardsUpgrade+1])) $('#Shoulderguards').click();
    }
    if('#Greatsword') {
        if(greatswordOwned < 20 && metalOwned/4 > (Math.floor(itemCost.greatsword[greatswordUpgrade]*Math.pow(1.2, greatswordOwned))) && (metalOwned * 2 < itemCost.greatsword[greatswordUpgrade+1])) $('#Greatsword').click();
    }
    if('#Breastplate') {
        if(breastplateOwned < 20 && metalOwned/4 > (Math.floor(itemCost.breastplate[breastplateUpgrade]*Math.pow(1.2, breastplateOwned))) && (metalOwned * 2 < itemCost.breastplate[breastplateUpgrade+1])) $('#Breastplate').click();
    }
}

const checkHelium = () => {
    $('#portalBtn').click();
    let totalHeliumSpent = $
    if(heliumOwned > (portals*20 + 100)) {
        $('#Agility').click();
        $('#Agility').click();
        $('#Agility').click();
        $('#Bait').click();
        $('#Bait').click();
        $('#Trumps').click();
        $('#Trumps').click();
        $('#Pheromones').click();
        $('#Packrat').click();
        $('#Motivation').click();
        $('#Motivation').click();
        $('#Motivation').click();
        $('#Power').click();
        $('#Power').click();
        $('#Power').click();
        $('#Power').click();
        $('#Power').click();
        $('#Toughness').click();
        $('#Toughness').click();
        $('#Toughness').click();
        $('#Toughness').click();
        $('#Toughness').click();
        $('#Looting').click();
        $('#Looting').click();
        $('#Looting').click();
        $('#Looting').click();
        $('#Looting').click();
        $('#activatePortalBtn').click();
        $('#tipCost').children('.btn-info').click();
    }
}

const checkInfrastructure = () => {
    if('#Hut .thingColorCanAfford') $('#Hut').click();
    if('#House .thingColorCanAfford') $('#House').click();
    if('#Mansion .thingColorCanAfford') $('#Mansion').click();
    if('#Hotel .thingColorCanAfford') $('#Hotel').click();
    if('#Resort .thingColorCanAfford') $('#Resort').click();
    if('#Gateway .thingColorCanAfford') $('#Gateway').click();
    if($('#Gym').length && (woodOwned/2 > Math.floor(400*Math.pow(1.185, gymOwned)))) {
        $('#Gym').click();
    }
    if($('#Tribute').length && (foodOwned/10 > Math.floor(itemCost.tribute.food*Math.pow(itemCost.tribute.interval, tributeOwned)))) $('#Tribute').click();
    if($('#Nursery').length
      && (gemsOwned/2 > Math.floor(itemCost.nursery.gems*Math.pow(itemCost.nursery.interval, nurseryOwned)))
      && (woodOwned/2 > Math.floor(itemCost.nursery.wood*Math.pow(itemCost.nursery.interval, nurseryOwned)))
      && (metalOwned/2 > Math.floor(itemCost.nursery.metal*Math.pow(itemCost.nursery.interval, nurseryOwned)))
      ) $('#Nursery').click();
}

const checkResearch = () => {
    var availableResearch = $('#upgradesHere').children('.thingColorCanAfford').attr('id');
    if(availableResearch) {
        if(availableResearch == 'Shieldblock') {
            $('#ShieldblockAlert').click();
            $('#confirmTooltipBtn').click();
        }
        $('#' + availableResearch).click();
    }

}

const checkResources = () => {
    if(foodOwned === foodMax) {
        $('#BarnOwned').click();
    }
    if(woodOwned === woodMax) {
        $('#ShedOwned').click();
    }
    if(metalOwned === metalMax) {
        $('#Forge').click();
    }
}

const checkWorkQueue = () => {
    if(queue0 != '') {
        harvest(BUILDING);
    }
}

const doWork = () => {
    if(traps > 0 && trimpsOwned < trimpsMax) {
        harvest(TRIMPS);
    } else if(buildingQueue > 0) {
        harvest(BUILDING);
    } else if(trimpsOwned / trimpsMax < .75) {
        $('#TrapOwned').click();
    } else {
        harvest(SCIENCE);
    }
}

const getStats = () => { //Resources
    foodOwned = convertNumber($('#foodOwned').text());
    foodMax = convertNumber($('#foodMax').text());
    woodOwned = convertNumber($('#woodOwned').text());
    woodMax = convertNumber($('#woodMax').text());
    metalOwned = convertNumber($('#metalOwned').text());
    metalMax = convertNumber($('#metalMax').text());
    scienceOwned = convertNumber($('#scienceOwned').text());
    fragmentsOwned = convertNumber($('#fragmentsOwned').text());
    gemsOwned = convertNumber($('#gemsOwned').text());
    heliumOwned = convertNumber($('#heliumOwned').text());
    bonesTokens = $('#boneBtnText').text().split(' ');
    bones = parseInt(bonesTokens[1]);


    //Infrastructure
    gymOwned = parseInt($('#GymOwned').text());
    tributeOwned = parseInt($('#TributeOwned').text());

    //trimps
    trimpsOwned = parseInt($('#trimpsOwned').text());
    trimpsMax = parseInt($('#trimpsMax').text());
    trimpsEmployed = parseInt($('#trimpsEmployed').text());
    maxEmployed = parseInt($('#maxEmployed').text());

    //JOBS
    farmers = $('#FarmerOwned').length == 0 ? 0 : parseInt($('#FarmerOwned').text());
    lumberjacks = $('#LumberjackOwned').length == 0 ? 0 : parseInt($('#LumberjackOwned').text());
    miners = $('#MinerOwned').length == 0 ? 0 : parseInt($('#MinerOwned').text());
    scientists = $('#ScientistOwned').length == 0 ? 0 : parseInt($('#ScientistOwned').text());
    trainers = $('#TrainerOwned').length == 0 ? 0 : parseInt($('#TrainerOwned').text());
    explorers = $('#ExplorerOwned').length == 0 ? 0 : parseInt($('#ExplorerOwned').text());

    queue0 = $('#queueItem0').text();
    traps = $('#trimpsCollectBtn').text().replace(/[^0-9\.]/g, '');
    inQueue = $('#queueItem0').length;
    zone = $('#worldNumber').text();
    buildingQueue = $('#queueItemsHere div').length;

    battleContainer = $('#battleContainer').css('visibility');

    //Equipment
    shieldOwned = parseInt($('#ShieldOwned').text());
    daggerOwned = parseInt($('#DaggerOwned').text());
    bootsOwned = parseInt($('#BootsOwned').text());
    maceOwned = parseInt($('#MaceOwned').text());
    helmetOwned = parseInt($('#HelmetOwned').text());
    polearmOwned = parseInt($('#PolearmOwned').text());
    pantsOwned = parseInt($('#PantsOwned').text());
    battleaxeOwned = parseInt($('#BattleaxeOwned').text());
    shoulderguardsOwned = parseInt($('#ShoulderguardsOwned').text());
    greatswordOwned = parseInt($('#GreatswordOwned').text());
    breastplateOwned = parseInt($('#BreastplateOwned').text());

    shieldUpgrade = roman[$('#ShieldNumeral').text()];
    daggerUpgrade = roman[$('#DaggerNumeral').text()];
    bootsUpgrade = roman[$('#DaggerNumeral').text()];
    maceUpgrade = roman[$('#MaceNumeral').text()];
    helmetUpgrade = roman[$('#HelmetNumeral').text()];
    polearmUpgrade = roman[$('#PolearmNumeral').text()];
    pantsUpgrade = roman[$('#PantsNumeral').text()];
    battleaxeUpgrade = roman[$('#BattleaxeNumeral').text()];
    shoulderguardsUpgrade = roman[$('#ShoulderguardsNumeral').text()];
    greatswordUpgrade = roman[$('#GreatswordNumeral').text()];
    breastplateUpgrade = roman[$('#BreastplateNumeral').text()];


    //world
    worldName = $('#worldName').text();
    worldNumber = parseInt($('#worldNumber').text());
    mapToken = $('#mapsBtnText').text();
    mapsNumber= parseInt(mapToken.replace(/[Maps ()]/g, ''));
    mapBonus = parseInt($('#mapBonus').text());
    if(isNaN(mapBonus)) {
        mapBonus = 0;
    }
    portals = parseInt($('#totalPortals').text());

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