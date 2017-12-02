const pOne11 = document.getElementById("pOne11"), pOne12 = document.getElementById("pOne12");
const pOne21 = document.getElementById("pOne21"), pOne22 = document.getElementById("pOne22");
const pOne31 = document.getElementById("pOne31"), pOne32 = document.getElementById("pOne32");
const pOne41 = document.getElementById("pOne41"), pOne42 = document.getElementById("pOne42");
const pOne51 = document.getElementById("pOne51"), pOne52 = document.getElementById("pOne52");
const pOne61 = document.getElementById("pOne61"), pOne62 = document.getElementById("pOne62");


const pTwo11 = document.getElementById("pTwo11"), pTwo12 = document.getElementById("pTwo12");
const pTwo21 = document.getElementById("pTwo12"), pTwo22 = document.getElementById("pTwo22");
const pTwo31 = document.getElementById("pTwo31"), pTwo32 = document.getElementById("pTwo32");
const pTwo41 = document.getElementById("pTwo41"), pTwo42 = document.getElementById("pTwo42");
const pTwo51 = document.getElementById("pTwo51"), pTwo52 = document.getElementById("pTwo52");
const pTwo61 = document.getElementById("pTwo61"), pTwo62 = document.getElementById("pTwo62");


/* const pos11 = document.getElementById("pos11"), pos12 = document.getElementById("pos12"), pos13 = document.getElementById("pos13"), pos14 = document.getElementById("pos14"), pos15 = document.getElementById("pos15"), pos16 = document.getElementById("pos16");
const pos21 = document.getElementById("pos21"), pos22 = document.getElementById("pos22"), pos23 = document.getElementById("pos23"), pos24 = document.getElementById("pos24"), pos25 = document.getElementById("pos25"), pos26 = document.getElementById("pos26");
const pos31 = document.getElementById("pos31"), pos32 = document.getElementById("pos32"), pos33 = document.getElementById("pos33"), pos34 = document.getElementById("pos34"), pos35 = document.getElementById("pos35"), pos36 = document.getElementById("pos36");
const pos41 = document.getElementById("pos41"), pos42 = document.getElementById("pos42"), pos43 = document.getElementById("pos43"), pos44 = document.getElementById("pos44"), pos45 = document.getElementById("pos45"), pos46 = document.getElementById("pos46");
const pos51 = document.getElementById("pos51"), pos52 = document.getElementById("pos52"), pos53 = document.getElementById("pos53"), pos54 = document.getElementById("pos54"), pos55 = document.getElementById("pos55"), pos56 = document.getElementById("pos56");
*/


/* kolmeste ridade kombinatsioonide loomine */
let threeInRowCombinationsArray = [];
let threeInRowCombinationsObject = {};
let bluePieces = {
    horizontal: { pos1X: [], pos2X: [], pos3X: [], pos4X: [], pos5X: []},
    vertical: { posX1: [], posX2: [], posX3: [], posX4: [], posX5: [], posX6: []}
}
let redPieces = {
    horizontal: { pos1X: [], pos2X: [], pos3X: [], pos4X: [], pos5X: []},
    vertical: { posX1: [], posX2: [], posX3: [], posX4: [], posX5: [], posX6: []}
}

for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        threeInRowCombinationsObject["pos" + i + j] = [];
    }
}

for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        let threeInRow = [];
        for(let k = 0; k < 3; k++) {
            if(j <= 4) {
                threeInRow.push("pos" + i + (j+k));
            }
        }
        threeInRow.forEach(position => threeInRowCombinationsObject[position].push(threeInRow));
        if(j <= 4) {
            threeInRowCombinationsArray.push(threeInRow);
        }
    }
}

for(let j = 1; j <= 6; j++) {
    for(let i = 1; i <= 5; i++) {
        let threeInRow = [];
        for(let k = 0; k < 3; k++) {
            if(i <= 3) {
                threeInRow.push("pos" + (i+k) + j);
            }
        }
        threeInRow.forEach(position => threeInRowCombinationsObject[position].push(threeInRow));
        if(i <= 3) {
            threeInRowCombinationsArray.push(threeInRow);
        }
    }
}


let jsonstring = JSON.stringify(threeInRowCombinationsObject);
let duplicateCombinationsObject = JSON.parse(jsonstring);
let duplicateCombinationsObject2 = JSON.parse(jsonstring);

console.log(duplicateCombinationsObject);
console.log(duplicateCombinationsObject2);


/* mängulauale klikkides vahetab mängija korda */
const pOnePieces = document.querySelectorAll("#playerOne > tbody > tr > td");
const pTwoPieces = document.querySelectorAll("#playerTwo > tbody > tr > td");
const pOneTurn = document.getElementById("playerOneTurn");
const pTwoTurn = document.getElementById("playerTwoTurn");
let count = 0;
let player = "blue";
let changeTurn = true;

pOneTurn.innerHTML = "sinise kord"
pOnePieces.forEach(piece => piece.style.backgroundColor = "#0074D9");

document.getElementById("gameTableContainer").addEventListener("click", () => {
    if(changeTurn) {
        count++;
        if(count % 2 === 0) {
            pOnePieces.forEach(piece => piece.style.backgroundColor = "#0074D9");
            pTwoPieces.forEach(piece => piece.style.backgroundColor = "white");
            pOneTurn.innerHTML = "sinise kord";
            pTwoTurn.innerHTML = "";
            player = "blue";
        } else {
            pOnePieces.forEach(piece => piece.style.backgroundColor = "white");
            pTwoPieces.forEach(piece => piece.style.backgroundColor = "#B22222");
            pOneTurn.innerHTML = "";
            pTwoTurn.innerHTML = "punase kord";
            player = "red";
        }
    }
});

/* eemaldab mängijate nuppe kui need lauale asetatakse */
let pOnePieceCount = 0;
let pTwoPieceCount = 0;
let gameTableObject = {};
let pOnePositions = [];
let pTwoPositions = [];
let pOneProhibitedPositions = [];
let pTwoProhibitedPositions = [];
const gameTablePieces = document.querySelectorAll("#gameTable > tbody > tr > td");

for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        gameTableObject["pos" + i + j] = "empty";
        document.getElementById("pos" + i + j).addEventListener("click", () => {
            changeTurn = false;

            if(player === "blue" && pOnePieceCount < 12 && !pOneProhibitedPositions.includes("pos"+i+j) && !pOnePositions.includes("pos"+i+j)) {
                document.getElementById("pos" + i + j).style.backgroundColor = "#0074D9";
                gameTableObject["pos" + i + j] = "blue";
                pOnePositions.push("pos" + i + j);
                pTwoProhibitedPositions.push("pos"+i+j);

                bluePieces.horizontal["pos" + i + "X"].push("pos" + i + j);
                bluePieces.vertical["pos" + "X" + j].push("pos" + i + j);

                bluePieces.horizontal["pos" + i + "X"].sort();
                bluePieces.vertical["pos" + "X" + j].sort();

                if(pOnePositions.length > 0) {
                    for(let i = 0; i < pOnePositions.length; i++) {
                        let pos = pOnePositions[i];
                        for(let j = 0; j < duplicateCombinationsObject[pos].length; j++) {
                            for(let k = 0; k < duplicateCombinationsObject[pos][j].length; k++) {
                                if(duplicateCombinationsObject[pos][j][k] === pos) {
                                    duplicateCombinationsObject[pos][j].splice(k, 1);
                                }
                            }
                        }
                        for(let position in duplicateCombinationsObject) {
                            duplicateCombinationsObject[position].forEach(combination => {
                                for(let l = 0; l < combination.length; l++) {
                                    if(combination[l] === pos) {
                                        combination.splice(l, 1);
                                    }
                                }
                            });
                        }
                        for(let prohibited in duplicateCombinationsObject) {
                            duplicateCombinationsObject[prohibited].forEach(prohibitedPos => {
                                if(prohibitedPos.length === 1 && !pOneProhibitedPositions.includes(prohibitedPos[0])) {
                                    pOneProhibitedPositions.push(prohibitedPos[0]);
                                }
                            });
                        }
                    }
                }

                pOnePieces[pOnePieceCount].style.display = "none";
                pOnePieceCount++;
                changeTurn = true;
            }

            if(player === "red" && pTwoPieceCount < 12 && !pTwoProhibitedPositions.includes("pos"+i+j) && !pTwoPositions.includes("pos"+i+j)) {
                document.getElementById("pos" + i + j).style.backgroundColor = "#B22222";
                gameTableObject["pos" + i + j] = "red";
                pTwoPositions.push("pos" + i + j);
                pOneProhibitedPositions.push("pos"+i+j);

                redPieces.horizontal["pos" + i + "X"].push("pos" + i + j);
                redPieces.vertical["pos" + "X" + j].push("pos" + i + j);

                bluePieces.horizontal["pos" + i + "X"].sort();
                bluePieces.vertical["pos" + "X" + j].sort();

                if(pTwoPositions.length > 0) {
                    for(let i = 0; i < pTwoPositions.length; i++) {
                        let pos = pTwoPositions[i];
                        for(let j = 0; j < duplicateCombinationsObject2[pos].length; j++) {
                            for(let k = 0; k < duplicateCombinationsObject2[pos][j].length; k++) {
                                if(duplicateCombinationsObject2[pos][j][k] === pos) {
                                    duplicateCombinationsObject2[pos][j].splice(k, 1);
                                }
                            }
                        }
                        for(let position in duplicateCombinationsObject2) {
                            duplicateCombinationsObject2[position].forEach(combination => {
                                for(let l = 0; l < combination.length; l++) {
                                    if(combination[l] === pos) {
                                        combination.splice(l, 1);
                                    }
                                }
                            });
                        }
                        for(let prohibited in duplicateCombinationsObject2) {
                            duplicateCombinationsObject2[prohibited].forEach(prohibitedPos => {
                                if(prohibitedPos.length === 1 && !pTwoProhibitedPositions.includes(prohibitedPos[0])) {
                                    pTwoProhibitedPositions.push(prohibitedPos[0]);
                                }
                            });
                        }
                    }
                }
                pTwoPieces[pTwoPieceCount].style.display = "none";
                pTwoPieceCount++;
                changeTurn = true;
            }
        });
    }
}
