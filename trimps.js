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
    shield: {
        2: {
            20: 73500
        }
    },
    dagger: {
        2: {
            20: 73500
        }
    },
    boots: {
        1: {
        },
        2: {
            12: 23500,
            15: 40600
        }
    },
    mace: {
        2: {
            9: 19800,
            13: 41000
        }
    },
    helmet: {
        2: {
            8: 20600,
            12: 42700
        }
    },
    polearm: {
        2: {
            6: 20000,
            10: 41.600
        },
        3: {
            metal: 361
        }
    },
    pants: {
        2: {
            metal: 7700
        },
        3: 413000
    },
    battleaxe: {
        2: {
            3: 19100,
            4: 22900,
            7: 39500
        }
    },
    shoulderguards: {
        2: {
            3: 22800,
            6: 39400
        }
    },
    greatsword: {
        2: {
            1: 21600,
            5: 44700
        },
        3: 967000
    },
    breastplate: {
        2: {
            4: 41300
        },
        3: 1070000
    },
    helium: {
        agility: [4, 6, 8, 11, 14, 18],
        bait: [],
        trumps: [],
        pheromones: [],
        packrat: [],
        motivation: [],
        power: [],
        toughness: [],
        looting: []
    }
}

const convertNumber = field => {
    console.log(field);
    let valueNumber = parseFloat(field);
    console.log(`value number: ${valueNumber}`);
    let suffix = field[field.length-1];
    console.log(`suffix: ${suffix}`);
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
//var traps = parseInt(trapReady);
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

var bootsLevel = $('#DaggerNumeral').text();
var boota = roman[bootsLevel];


var worldName = $('#worldName').text();
var worldNumber = parseInt($('#worldNumber').text());
var mapToken = $('#mapsBtnText').text();
var mapsNumber= parseInt(mapToken.replace(/[Maps ()]/g, ''));
var mapBonus = parseInt($('#mapBonus').text());

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
    console.log(`food: ${foodOwned}/${foodMax} wood: ${woodOwned}/${woodMax} metal: ${metalOwned}/${metalMax} science: ${scienceOwned} fragments: ${fragmentsOwned} gems: ${gemsOwned}`);
    console.log(`working: ${working} zone: ${zone} traps: ${traps} battle: ${battle}`);
    console.log(`trimps: ${trimpsOwned} max: ${trimpsMax} employed: ${trimpsEmployed} max: ${maxEmployed}`);
    console.log(`farmers: ${farmers} lumberjacks: ${lumberjacks} miners: ${miners} scientists: ${scientists} trainers: ${trainers} explorers: ${explorers}`);
    console.log(`bootsLevel: ${bootsLevel} boota: ${boota}`);
    //console.log(`Shoulderguards: ${shoulderguardsOwned}`);
    console.log(`World: ${worldNumber} mapBonus: ${mapBonus}`);
    console.log(`Gyms: ${gymOwned}`);

    if(trimpsMax >= 15) {
        console.log('AREA 2');
        if(trimpsOwned === trimpsMax) {
            attack();
        }
        if(heliumOwned > 100) { checkHelium(); }
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
    if(trimpsOwned < 25) {
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
    } else if (trimpsOwned < 500) {
        if($('#Trainer').length) {
            $('#Trainer').click();
        }
        if($('#Explorer').length && explorers < 2) {
            console.log('get explorers');
            $('#Explorer').click();
        }
        else if($('#Scientist').length && scientists < 2) $('#Scientist').click();
        else if (miners < 10) {
            $('#Miner').click();
        } else if (farmers <= lumberjacks) {
            $('#FarmerOwned').click();
        } else {
            $('#Lumberjack').click();
        }
    } else {
        if($('#Trainer').length) {
            $('#Trainer').click();
        }
        if($('#Explorer').length && explorers < 2) {
            console.log('get explorers');
            $('#Explorer').click();
        }
        else if($('#Scientist').length && scientists < 2) {
            $('#Scientist').click();
        } else if ( miners < lumberjacks) {
            $('#Miner').click();
        } else if (farmers <= lumberjacks) {
            $('#FarmerOwned').click();
        } else {
            $('#Lumberjack').click();
        }
    }
}

const attack = () => {
    console.log('attack');
//     if($('#pauseFight').length) {
//         console.log('should unpause');
//         $('#pauseFight').click();
//     }
    if(newMap == true) {
        createMap();
    } else if (mapBonus == 200 && $('#preMaps')[0].style.display == 'block') {
        console.log('heading out');
        $('#mapsBtnText').click();
    } else if (mapBonus == 200 && $('#preMaps')[0].style.display == 'none') {
        $('#fightBtn').click();
    } else if (worldName != 'Zone') {
        console.log('stuck in map land');
        $('#fightBtn').click();
        if(mapBonus == 200) {
            if($('#mapsBtnText').text() != 'Abandon Soldiers') {
                console.log('get outta here');
                $('#mapsBtnText').click();
            } else {

            }
        }
    } else if((worldNumber >= 8 && worldNumber <= 20) || worldNumber > 20) {
        console.log('world between 8 and 20');
        if(worldNumber % 2 == 0 && mapBonus < 200 || (worldNumber >= 20 && mapBonus < 200)) {
            //Map mode
            //let currentMaps = $('#mapsHere div').children('span')[0].children('.mapLevel');


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
            console.log('special map');
            console.log(specialMap);
            if(specialMap) {
                console.log(`special map: ${specialMap}`);
                $('#'+specialMap).click();
                $('#selectMapBtn').click();
            }
            else if($('#mapsBtnText').text() == 'Maps') {
                $('#mapsBtnText').click();
            } else if(maxLevel < worldNumber) {
                createMap();
            } else {
                console.log(`waiting to go to map: ${mapIndex}`);
                let map = $('#mapsHere div.mapThing')[mapIndex];
                console.log(map);
                $('#' + $(map).attr('id')).click();
                $('#selectMapBtn').click();
            }
        } else {
            console.log('odd world');
            $('#fightBtn').click();
        }
    } else {
        console.log('I said attack!');
        $('#fightBtn').click();
    }
}

const createMap = () => {
    console.log('in createMap');
    let mapLoot = parseInt($('#lootAdvMapsRange').val());
    let mapSize = parseInt($('#sizeAdvMapsRange').val());
    let mapDifficulty = parseInt($('#difficultyAdvMapsRange').val());
    let mapCost = convertNumber($('#mapCostFragmentCost').html());
    console.log(`mapCost: ${mapCost}`);
    let mapCreatorLevel = parseInt($('#mapLevelInput').val());
    console.log(mapCreatorLevel);

    if(mapCreatorLevel < worldNumber) {
        console.log('increase map level');
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
        console.log('map ready!');
        $('#mapCreateBtn').click();
        newMap = false;

    }
    $(document).ready(() => {updateMapNumbers()});
}

const checkEquipment = () => {
    if('#Shield') {
        if(shieldOwned < 20 && woodOwned/4 > Math.floor(40*Math.pow(1.2, shieldOwned))) {
            $('#Shield').click();
        }
    }
    if('#Dagger') {
        if(daggerOwned < 20 && metalOwned/4 > Math.floor(40*Math.pow(1.2, daggerOwned))) {
            $('#Dagger').click();
        }
    }
    if('#Boots') {
        if(bootsOwned < 20 && metalOwned/4 > Math.floor(55*Math.pow(1.2, bootsOwned))) {
            $('#Boots').click();
        }
    }
    if('#Mace') {
        if(maceOwned < 20 && metalOwned/4 > Math.floor(80*Math.pow(1.2, maceOwned))) {
            $('#Mace').click();
        }
    }
    if('#Helmet') {
        if(helmetOwned < 20 && metalOwned/4 > Math.floor(100*Math.pow(1.2, helmetOwned))) {
            $('#Helmet').click();
        }
    }
    if('#Polearm') {
        if(polearmOwned < 20 && metalOwned/4 > Math.floor(140*Math.pow(1.2, polearmOwned))) {
            $('#Polearm').click();
        }
    }
    if('#Pants') {
        if(pantsOwned < 20 && metalOwned/4 > Math.floor(160*Math.pow(1.2, pantsOwned))) {
            $('#Pants').click();
        }
    }
    if('#Battleaxe') {
        if(battleaxeOwned < 20 && metalOwned/4 > Math.floor(230*Math.pow(1.2, battleaxeOwned))) {
            $('#Battleaxe').click();
        }
    }
    if('#Shoulderguards') {
        if(shoulderguardsOwned < 20 && metalOwned/4 > Math.floor(275*Math.pow(1.2, shoulderguardsOwned))) {
            $('#Shoulderguards').click();
        }
    }
    if('#Greatsword') {
        if(greatswordOwned < 20 && metalOwned/4 > Math.floor(375*Math.pow(1.2, greatswordOwned))) {
            $('#Greatsword').click();
        }
    }
    if('#Breastplate') {
        if(breastplateOwned < 20 && metalOwned/4 > Math.floor(415*Math.pow(1.2, breastplateOwned))) {
            $('#Breastplate').click();
        }
    }
}

const checkHelium = () => {
    $('#portalBtn').click();
    let totalHeliumSpent = $
    if(heliumOwned > 100) {
        console.log('buy stuff');
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
        console.log(availableResearch);
        $('#' + availableResearch).click();
    }

}

const checkResources = () => {
    if(foodOwned === foodMax) {
        console.log('barn!');
        $('#BarnOwned').click();
    }
    if(woodOwned === woodMax) {
        console.log('shed!');
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

const getStats = () => {
    //Resources
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
    //var traps = parseInt(trapReady);
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

    //world
    worldName = $('#worldName').text();
    worldNumber = parseInt($('#worldNumber').text());
    mapToken = $('#mapsBtnText').text();
    mapsNumber= parseInt(mapToken.replace(/[Maps ()]/g, ''));
    mapBonus = parseInt($('#mapBonus').text());
    if(isNaN(mapBonus)) {
        mapBonus = 0;
    }

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