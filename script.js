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
let movePiecesCombinationsObject = {};

for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        threeInRowCombinationsObject["pos" + i + j] = [];
        movePiecesCombinationsObject["pos" + i + j] = [];
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

    if(pOnePieceCount + pTwoPieceCount === 4) {
        document.querySelector("#gamePhase > p").innerHTML = "Teine faas - liiguta nuppe kolmestesse ridadesse";
        
        for(let i = 1; i <= 5; i++) {
            for(let j = 1; j <= 6; j++) {
                let elPos = "pos" + i + j;
                document.getElementById(elPos).removeEventListener("click", addPiecesMethodObject[elPos]);
            }
        }

        changeTurn = false;

        if(secondPhaseEventListeners) {
            eventListenersForSecondPhase();
            secondPhaseEventListeners = false;
        } else {
            removeSecondPhaseEventListeners();
        }
    }
});


let secondPhaseEventListeners = true;


/* eemaldab mängijate nuppe kui need lauale asetatakse */
let pOnePieceCount = 0;
let pTwoPieceCount = 0;
let gameTableObject = {};
let pOnePositions = [];
let pTwoPositions = [];
let pOneProhibitedPositions = [];
let pTwoProhibitedPositions = [];
let addPiecesMethodObject = {};
let movePiecesMethodObject = {};


/* eventlistenerid esimese faasi jaoks */
for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        let elPos = "pos" + i + j;
        addPiecesMethodObject[elPos] = function() {
            changeTurn = false;
            if(player === "blue" && pOnePieceCount < 12 && !pOneProhibitedPositions.includes(elPos) && !pOnePositions.includes(elPos)) {
                document.getElementById(elPos).style.backgroundColor = "#0074D9";
                gameTableObject[elPos] = "blue";
                pOnePositions.push(elPos);
                pTwoProhibitedPositions.push(elPos);

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

            if(player === "red" && pTwoPieceCount < 12 && !pTwoProhibitedPositions.includes(elPos) && !pTwoPositions.includes(elPos)) {
                document.getElementById(elPos).style.backgroundColor = "#B22222";
                gameTableObject[elPos] = "red";
                pTwoPositions.push(elPos);
                pOneProhibitedPositions.push(elPos);

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
        }
    }
}



/* eventlistenerid pannakse lauaobjektidele külge */
for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        let elPos = "pos" + i + j;
        gameTableObject[elPos] = "empty";
        document.getElementById(elPos).addEventListener("click", addPiecesMethodObject[elPos]);
    }
}



for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        let elPos = "pos" + i + j;
        for(let k = 0; k < 4; k++) {
            let up = i - 1, down = i + 1, left = j - 1, right = j + 1;
            if (up >= 1 && !movePiecesCombinationsObject[elPos].includes("pos" + up + j)) 
                movePiecesCombinationsObject[elPos].push("pos" + up + j);
            if (left >= 1 && !movePiecesCombinationsObject[elPos].includes("pos" + i + left)) 
                movePiecesCombinationsObject[elPos].push("pos" + i + left);
            if (right <= 6 && !movePiecesCombinationsObject[elPos].includes("pos" + i + right)) 
                movePiecesCombinationsObject[elPos].push("pos" + i + right);
            if (down <= 5 && !movePiecesCombinationsObject[elPos].includes("pos" + down + j)) 
                movePiecesCombinationsObject[elPos].push("pos" + down + j);
        }
    }
}


let greenPositionsObject = {};
let globalGreenPositions = [];
let greenPositions = [];

/* eventlistenerid teise faasi jaoks */
function eventListenersForSecondPhase() {

    for(let i = 1; i <= 5; i++) {
        for(let j = 1; j <= 6; j++) {

            let elPos = "pos" + i + j;
            movePiecesMethodObject[elPos] = function() {
                
                changeTurn = false;

                if(player === "blue" && pOnePositions.includes(elPos)) {

                    for(let i = 1; i <= 5; i++) {
                        for(let j = 1; j <= 6; j++) {
                            let elPos = "pos" + i + j;
                            if (gameTableObject[elPos] === "empty") {
                                document.getElementById(elPos).style.backgroundColor = "white";
                            }
                            if (gameTableObject[elPos] === "blue") {
                                document.getElementById(elPos).style.color = "black";
                            }
                        }
                    }
                    greenPositions = [];
                    movePiecesCombinationsObject[elPos].forEach(movePos => {
                        if (gameTableObject[movePos] === "empty") {
                            document.getElementById(elPos).style.color = "gold";
                            document.getElementById(movePos).style.backgroundColor = "lightgreen";
                            if (!greenPositions.includes(movePos)) greenPositions.push(movePos);
                        }
                    });
                    console.log(greenPositions);

                    greenPositions.forEach(greenPos => greenPositionsObject[greenPos] = function() {
                        gameTableObject[elPos] === "empty";
                        gameTableObject[greenPos] === "blue";
                        document.getElementById(elPos).style.backgroundColor = "white";
                        document.getElementById(elPos).style.color = "black";
                        
                        greenPositions.forEach(allGreenPos => {
                            document.getElementById(allGreenPos).style.backgroundColor = "white";
                        });

                        document.getElementById(greenPos).style.backgroundColor = "#0074D9";

                        for(let k = 0; k < pOnePositions.length; k++) {
                            if (pOnePositions[k] === elPos) pOnePositions.splice(k, 1);
                        }
                        pOnePositions.push(greenPos);
                        changeTurn = true;
                        globalGreenPositions = greenPositions.slice();
                    });

                    console.log(greenPositions);
                    greenPositions.forEach(greenPosition => {
                        console.log(greenPosition + "saab eventlisteneri");
                        document.getElementById(greenPosition).addEventListener("click", greenPositionsObject[greenPosition]);
                    });

                    
                    
                }


    
                if(player === "red" && pTwoPositions.includes(elPos)) {
                    movePiecesCombinationsObject[elPos].forEach(movePos => {
                        if (gameTableObject[movePos] === "empty")
                            document.getElementById(movePos).backgroundColor = "green";
                    });

                    //changeTurn = true;

                    
                }
            }
        }
    }



    pOnePositions.forEach(pOnePos => {
        console.log(pOnePos + "saab eventlisteneri");
        document.getElementById(pOnePos).addEventListener("click", movePiecesMethodObject[pOnePos]);
    });
}




function removeSecondPhaseEventListeners() {
    globalGreenPositions.forEach(greenPosition => {
        document.getElementById(greenPosition).removeEventListener("click", greenPositionsObject[greenPosition]);
    });
    globalGreenPositions = [];
}