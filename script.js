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
let fourInRowCombinationsArray = [];
let threeInRowCombinationsObject = {};
let fourInRowCombinationsObject = {};
let movePiecesCombinationsObject = {};

/* tekitan iga nupu jaoks objekti tühja array */
for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        threeInRowCombinationsObject["pos" + i + j] = [];
        movePiecesCombinationsObject["pos" + i + j] = [];
        fourInRowCombinationsObject["pos" + i + j] = [];
    }
}

/* tekitan kolmeste kombinatsioonide massiivid ja panen need objekti */
/* horisontaalsed kombinatsioonid */
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
/* vertikaalsed kombinatsioonid */
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

/* tekitan neljaste kombinatsioonide massiivid ja panen need objekti */
/* horisontaalsed kombinatsioonid */
for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        let fourInRow = [];
        for(let k = 0; k < 4; k++) {
            if(j <= 3) {
                fourInRow.push("pos" + i + (j+k));
            }
        }
        fourInRow.forEach(position => fourInRowCombinationsObject[position].push(fourInRow));
        if(j <= 3) {
            fourInRowCombinationsArray.push(fourInRow);
        }
    }
}
/* vertikaalsed kombinatsioonid */
for(let j = 1; j <= 6; j++) {
    for(let i = 1; i <= 5; i++) {
        let fourInRow = [];
        for(let k = 0; k < 4; k++) {
            if(i <= 2) {
                fourInRow.push("pos" + (i+k) + j);
            }
        }
        fourInRow.forEach(position => fourInRowCombinationsObject[position].push(fourInRow));
        if(i <= 2) {
            fourInRowCombinationsArray.push(fourInRow);
        }
    }
}

/* duplikaatobjektid kolmeste ridade lisamise jaoks */
let jsonstring = JSON.stringify(threeInRowCombinationsObject);
let duplicateCombinationsObject = JSON.parse(jsonstring);
let duplicateCombinationsObject2 = JSON.parse(jsonstring);

/* duplikaatobjektid neljaste ridade jaoks */
let jsonstring2 = JSON.stringify(fourInRowCombinationsObject);
//let fourInRowDuplicateObject = JSON.parse(jsonstring2);
//let fourInRowDuplicateObject2 = JSON.parse(jsonstring2);


/* mängulauale klikkides vahetab mängija korda */
const pOnePieces = document.querySelectorAll("#playerOne > tbody > tr > td");
const pTwoPieces = document.querySelectorAll("#playerTwo > tbody > tr > td");
const pOneTurn = document.getElementById("playerOneTurn");
const pTwoTurn = document.getElementById("playerTwoTurn");
let count = 0;
let player = "blue";
let changeTurn = true;

/* algväärtustan mängu alguse */
pOneTurn.innerHTML = "sinise kord"
pOnePieces.forEach(piece => piece.style.backgroundColor = "#0074D9");

/* mängija käigukorra vahetamine */
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

    /* teise faasi jõudmine */
    if(pOnePieceCount + pTwoPieceCount === 10) {
        document.querySelector("#gamePhase > p").innerHTML = "Teine faas - liiguta nuppe kolmestesse ridadesse";
        
        /* esimese asjana eemaldan kõik eelmise faasi eventlistenerid */
        for(let i = 1; i <= 5; i++) {
            for(let j = 1; j <= 6; j++) {
                let elPos = "pos" + i + j;
                document.getElementById(elPos).removeEventListener("click", addPiecesMethodObject[elPos]);
            }
        }
        changeTurn = false;
        pOneProhibitedPositions = [];
        pTwoProhibitedPositions = [];

        if(secondPhaseEventListeners) {
            eventListenersForSecondPhase();
            secondPhaseEventListeners = false;
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
        /* loon iga lauapositsiooni objekti jaoks funktsiooni ja salvestan muutujasse, et hiljem kasutada saaks */
        addPiecesMethodObject[elPos] = function() {
            changeTurn = false;

            /* kui on sinise mängija kord, nuppe on vähem kui 12, klõpsatav lauakoht ei kuulu keelatud positsioonidesse ega omaenda positsioonidesse */
            if(player === "blue" && pOnePieceCount < 12 && !pOneProhibitedPositions.includes(elPos) && !pOnePositions.includes(elPos)) {
                
                /* paneb nupu lauale */
                document.getElementById(elPos).style.backgroundColor = "#0074D9";
                gameTableObject[elPos] = "blue";
                pOnePositions.push(elPos);
                pTwoProhibitedPositions.push(elPos);

                /*  */
                if(pOnePositions.length > 0) {
                    /* käiakse läbi kõik sinise mängija nupud laual */
                    for(let i = 0; i < pOnePositions.length; i++) {
                        /* pos on mingi positsioon sinise mängija nuppudest laual */
                        let pos = pOnePositions[i];
                        /* käiakse läbi kõik kombinatsioonid kus esineb positsioon millel laual vajutati */
                        for(let j = 0; j < duplicateCombinationsObject[pos].length; j++) {
                            for(let k = 0; k < duplicateCombinationsObject[pos][j].length; k++) {
                                /* käiakse läbi individuaalse kombinatsiooni liikmed */
                                if(duplicateCombinationsObject[pos][j][k] === pos) {
                                    /* kui vajutatud positsioon on leitud, eemaldatakse kombinatsiooni elementide seast */
                                    duplicateCombinationsObject[pos][j].splice(k, 1);
                                }
                            }
                        }
                        /* eemaldan kõik sinsed positsioonid kombinatsioonide arrayst */
                        /* saan kõikide positsioonide nimetused */
                        for(let position in duplicateCombinationsObject) {
                            /* käin läbi kõik kombinatsioonid mis vastavad klikitud positsioonile */
                            duplicateCombinationsObject[position].forEach(combination => {
                                /* iga liige on uus array, array sees on arrayd kombinatsioonidega */
                                for(let l = 0; l < combination.length; l++) {
                                    /* käin läbi individuaalse kombinatsiooniarray */
                                    if(combination[l] === pos) {
                                        /* kui kombinatsioonist leian sinise positsiooni eemaldan arrayst */
                                        combination.splice(l, 1);
                                    }
                                }
                            });
                        }
                        /* leian kõik kombinatsioonid mille pikkus on üks, ehk selle lisamisel tekiks kolmene rida, lisan selle viimase elemendi keelatud positsioonide arraysse */
                        for(let prohibited in duplicateCombinationsObject) {
                            duplicateCombinationsObject[prohibited].forEach(prohibitedPos => {
                                /* kombinatsiooniarray pikkus on 1 ja positsioon ei ole juba lisatud keelatud arraysse */
                                if(prohibitedPos.length === 1 && !pOneProhibitedPositions.includes(prohibitedPos[0])) {
                                    /* lisan positsiooni keelatud arraysse */
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



/* esimese faasi eventlistenerid pannakse lauaobjektidele külge */
for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        let elPos = "pos" + i + j;
        gameTableObject[elPos] = "empty";
        document.getElementById(elPos).addEventListener("click", addPiecesMethodObject[elPos]);
    }
}


/* tekitan teise faasi jaoks nupu liigutamise võimaluste kombinatsioonid */
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
let greenPositions = [];
let currentPos;

/* eventlistenerid teise faasi jaoks */
function eventListenersForSecondPhase() {

    for(let i = 1; i <= 5; i++) {
        for(let j = 1; j <= 6; j++) {
            let elPos = "pos" + i + j;

            /* tekitan funktsioonid, mis pannakse massiivi, et kasutada neid hiljem eventlistenerides */
            movePiecesMethodObject[elPos] = function() {
                changeTurn = false;

                /* eemaldan vanad eventlistenerid kui peaksid alles olema nuppude vahetusest, et uusi ei lisataks nende peale */
                if(greenPositions.length > 0) {
                    greenPositions.forEach(greenPosition => {
                        //console.log(greenPosition + " eemaldan eventlisteneri");
                        document.getElementById(greenPosition).removeEventListener("click", greenPositionsObject[greenPosition]);
                    });
                    greenPositions = [];
                }

                if(player === "blue" && pOnePositions.includes(elPos) && !pOneProhibitedPositions.includes(elPos)) {

                    /* neljase rea loogika */
                    
                    /* iga kord uue duplikaatobjekti neljaste ridade loogika jaoks */
                    let fourInRowDuplicateObject = JSON.parse(jsonstring2);
                    /* käiakse läbi kõik sinise mängija nupud laual */
                    for(let i = 0; i < pOnePositions.length; i++) {
                        /* pos on mingi positsioon sinise mängija nuppudest laual */
                        let pos = pOnePositions[i];
                        /* käiakse läbi kõik kombinatsioonid kus esineb positsioon millel laual vajutati */
                        for(let j = 0; j < fourInRowDuplicateObject[pos].length; j++) {
                            for(let k = 0; k < fourInRowDuplicateObject[pos][j].length; k++) {
                                /* käiakse läbi individuaalse kombinatsiooni liikmed */
                                if(fourInRowDuplicateObject[pos][j][k] === pos && fourInRowDuplicateObject[pos][j][k] !== elPos) {
                                    /* kui vajutatud positsioon on leitud, eemaldatakse kombinatsiooni elementide seast */
                                    fourInRowDuplicateObject[pos][j].splice(k, 1);
                                }
                            }
                        }
                        /* eemaldan kõik sinsed positsioonid kombinatsioonide arrayst */
                        /* saan kõikide positsioonide nimetused */
                        for(let position in fourInRowDuplicateObject) {
                            //console.log(position);
                            /* käin läbi kõik kombinatsioonid mis vastavad klikitud positsioonile */
                            fourInRowDuplicateObject[position].forEach(combination => {
                                /* iga liige on uus array, array sees on arrayd kombinatsioonidega */
                                for(let l = 0; l < combination.length; l++) {
                                    /* käin läbi individuaalse kombinatsiooniarray */
                                    if(combination[l] === pos && combination[l] !== elPos) {
                                        /* kui kombinatsioonist leian sinise positsiooni eemaldan arrayst */
                                        combination.splice(l, 1);
                                    }
                                }
                            });
                        }
                        /* leian kõik kombinatsioonid mille pikkus on üks, ehk selle lisamisel tekiks kolmene rida, lisan selle viimase elemendi keelatud positsioonide arraysse */
                        for(let prohibited in fourInRowDuplicateObject) {
                            fourInRowDuplicateObject[prohibited].forEach(prohibitedPos => {
                                /* kombinatsiooniarray pikkus on 1 ja positsioon ei ole juba lisatud keelatud arraysse */
                                if(prohibitedPos.length === 1 && !pOneProhibitedPositions.includes(prohibitedPos[0])) {
                                    /* lisan positsiooni keelatud arraysse */
                                    pOneProhibitedPositions.push(prohibitedPos[0]);
                                }
                            });
                        }
                        //console.log(pOneProhibitedPositions);
                    }
                    


                    /* kolmese rea loomise loogika */

                    let threeInRowCombinations = JSON.parse(jsonstring);

                    /* käiakse läbi kõik sinise mängija nupud laual */
                    for(let i = 0; i < pOnePositions.length; i++) {
                        /* pos on mingi positsioon sinise mängija nuppudest laual */
                        let pos = pOnePositions[i];
                        /* käiakse läbi kõik kombinatsioonid kus esineb positsioon millel laual vajutati */
                        for(let j = 0; j < fourInRowDuplicateObject[pos].length; j++) {
                            for(let k = 0; k < fourInRowDuplicateObject[pos][j].length; k++) {
                                /* käiakse läbi individuaalse kombinatsiooni liikmed */
                                if(fourInRowDuplicateObject[pos][j][k] === pos && fourInRowDuplicateObject[pos][j][k] !== elPos) {
                                    /* kui vajutatud positsioon on leitud, eemaldatakse kombinatsiooni elementide seast */
                                    fourInRowDuplicateObject[pos][j].splice(k, 1);
                                }
                            }
                        }
                        /* eemaldan kõik sinsed positsioonid kombinatsioonide arrayst */
                        /* saan kõikide positsioonide nimetused */
                        for(let position in fourInRowDuplicateObject) {
                            //console.log(position);
                            /* käin läbi kõik kombinatsioonid mis vastavad klikitud positsioonile */
                            fourInRowDuplicateObject[position].forEach(combination => {
                                /* iga liige on uus array, array sees on arrayd kombinatsioonidega */
                                for(let l = 0; l < combination.length; l++) {
                                    /* käin läbi individuaalse kombinatsiooniarray */
                                    if(combination[l] === pos && combination[l] !== elPos) {
                                        /* kui kombinatsioonist leian sinise positsiooni eemaldan arrayst */
                                        combination.splice(l, 1);
                                    }
                                }
                            });
                        }
                        /* leian kõik kombinatsioonid mille pikkus on üks, ehk selle lisamisel tekiks kolmene rida, lisan selle viimase elemendi keelatud positsioonide arraysse */
                        for(let prohibited in fourInRowDuplicateObject) {
                            fourInRowDuplicateObject[prohibited].forEach(prohibitedPos => {
                                /* kombinatsiooniarray pikkus on 1 ja positsioon ei ole juba lisatud keelatud arraysse */
                                if(prohibitedPos.length === 1 && !pOneProhibitedPositions.includes(prohibitedPos[0])) {
                                    /* lisan positsiooni keelatud arraysse */
                                    pOneProhibitedPositions.push(prohibitedPos[0]);
                                }
                            });
                        }
                        //console.log(pOneProhibitedPositions);
                    }


                    
                    


                    for(let i = 1; i <= 5; i++) {
                        for(let j = 1; j <= 6; j++) {
                            let elPos = "pos" + i + j;
                            if (gameTableObject[elPos] === "empty")
                                document.getElementById(elPos).style.backgroundColor = "white";
                            if (gameTableObject[elPos] === "blue")
                                document.getElementById(elPos).style.color = "black";
                        }
                    }
                    /* selle nupu millel vajutan teen teksti kollaseks */
                    document.getElementById(elPos).style.color = "gold";

                    /* vajutatud nupu võimalikud käidavad positsioonid tehakse roheliseks ja pannakse massiivi */
                    movePiecesCombinationsObject[elPos].forEach(movePos => {
                        if (gameTableObject[movePos] === "empty" && !pOneProhibitedPositions.includes(movePos)) {
                            document.getElementById(movePos).style.backgroundColor = "lightgreen";
                            if (!greenPositions.includes(movePos)) greenPositions.push(movePos);
                        }
                    });

                    /* tekitan funktsioonid eventlisteneri jaoks roheliste positsioonide jaoks */
                    greenPositions.forEach(greenPos => greenPositionsObject[greenPos] = function() {
                        /* sinine nupp tehakse vabaks nupuks sest liigutan sellel asuva nupu sealt ära */
                        gameTableObject[elPos] = "empty";
                        document.getElementById(elPos).style.backgroundColor = "white";
                        document.getElementById(elPos).style.color = "black";
                        
                        /* kõik rohelised nupud tehakse valgeks */
                        greenPositions.forEach(allGreenPos => {
                            document.getElementById(allGreenPos).style.backgroundColor = "white";
                        });

                        /* roheline nupp millel vajutatakse tehakse siniseks nupuks */
                        gameTableObject[greenPos] = "blue";
                        document.getElementById(greenPos).style.backgroundColor = "#0074D9";

                        /* eemaldan vana sinise nupu siniste massiivist ja panen uue asemele */
                        for(let k = 0; k < pOnePositions.length; k++) {
                            if (pOnePositions[k] === elPos) pOnePositions.splice(k, 1);
                        }
                        pOnePositions.push(greenPos);

                        /* kohandan nuppude liigutamise eventlistenerid */
                        document.getElementById(elPos).removeEventListener("click", movePiecesMethodObject[elPos]);
                        document.getElementById(greenPos).addEventListener("click", movePiecesMethodObject[greenPos]);


                        /* eemaldan käima pandud evenlistenerid */
                        greenPositions.forEach(greenPosition => {
                            document.getElementById(greenPosition).removeEventListener("click", greenPositionsObject[greenPosition]);
                        });
                        greenPositions = [];

                        /* muudan käigu korda */
                        changeTurn = true;
                    });

                    /* panen eventlistenerid külge ja käivitan eelneva funktsiooni */
                    greenPositions.forEach(greenPosition => {
                        document.getElementById(greenPosition).addEventListener("click", greenPositionsObject[greenPosition]);
                    });

                }


    
                if(player === "red" && pTwoPositions.includes(elPos)) {

                    /* neljase rea loogika */
                    
                    /* iga kord uue duplikaatobjekti neljaste ridade loogika jaoks */
                    let fourInRowDuplicateObject2 = JSON.parse(jsonstring2);
                    /* käiakse läbi kõik sinise mängija nupud laual */
                    for(let i = 0; i < pTwoPositions.length; i++) {
                        /* pos on mingi positsioon sinise mängija nuppudest laual */
                        let pos = pTwoPositions[i];
                        /* käiakse läbi kõik kombinatsioonid kus esineb positsioon millel laual vajutati */
                        for(let j = 0; j < fourInRowDuplicateObject2[pos].length; j++) {
                            for(let k = 0; k < fourInRowDuplicateObject2[pos][j].length; k++) {
                                /* käiakse läbi individuaalse kombinatsiooni liikmed */
                                if(fourInRowDuplicateObject2[pos][j][k] === pos && fourInRowDuplicateObject2[pos][j][k] !== elPos) {
                                    /* kui vajutatud positsioon on leitud, eemaldatakse kombinatsiooni elementide seast */
                                    fourInRowDuplicateObject2[pos][j].splice(k, 1);
                                }
                            }
                        }
                        /* eemaldan kõik sinsed positsioonid kombinatsioonide arrayst */
                        /* saan kõikide positsioonide nimetused */
                        for(let position in fourInRowDuplicateObject2) {
                            //console.log(position);
                            /* käin läbi kõik kombinatsioonid mis vastavad klikitud positsioonile */
                            fourInRowDuplicateObject2[position].forEach(combination => {
                                /* iga liige on uus array, array sees on arrayd kombinatsioonidega */
                                for(let l = 0; l < combination.length; l++) {
                                    /* käin läbi individuaalse kombinatsiooniarray */
                                    if(combination[l] === pos && combination[l] !== elPos) {
                                        /* kui kombinatsioonist leian sinise positsiooni eemaldan arrayst */
                                        combination.splice(l, 1);
                                    }
                                }
                            });
                        }
                        /* leian kõik kombinatsioonid mille pikkus on üks, ehk selle lisamisel tekiks kolmene rida, lisan selle viimase elemendi keelatud positsioonide arraysse */
                        for(let prohibited in fourInRowDuplicateObject2) {
                            fourInRowDuplicateObject2[prohibited].forEach(prohibitedPos => {
                                /* kombinatsiooniarray pikkus on 1 ja positsioon ei ole juba lisatud keelatud arraysse */
                                if(prohibitedPos.length === 1 && !pTwoProhibitedPositions.includes(prohibitedPos[0])) {
                                    /* lisan positsiooni keelatud arraysse */
                                    pTwoProhibitedPositions.push(prohibitedPos[0]);
                                }
                            });
                        }
                        //console.log(pTwoProhibitedPositions);
                    }


                    for(let i = 1; i <= 5; i++) {
                        for(let j = 1; j <= 6; j++) {
                            let elPos = "pos" + i + j;
                            if (gameTableObject[elPos] === "empty")
                                document.getElementById(elPos).style.backgroundColor = "white";
                            if (gameTableObject[elPos] === "red")
                                document.getElementById(elPos).style.color = "black";
                        }
                    }
                    /* selle nupu millel vajutan teen teksti kollaseks */
                    document.getElementById(elPos).style.color = "gold";

                    /* vajutatud nupu võimalikud käidavad positsioonid tehakse roheliseks ja pannakse massiivi */
                    
                    movePiecesCombinationsObject[elPos].forEach(movePos => {
                        if (gameTableObject[movePos] === "empty" && !pTwoProhibitedPositions.includes(movePos)) {
                            document.getElementById(movePos).style.backgroundColor = "lightgreen";
                            if (!greenPositions.includes(movePos)) greenPositions.push(movePos);
                        }
                    });

                    /* tekitan funktsioonid eventlisteneri jaoks roheliste positsioonide jaoks */
                    greenPositions.forEach(greenPos => greenPositionsObject[greenPos] = function() {
                        /* punane nupp tehakse vabaks nupuks sest liigutan sellel asuva nupu sealt ära */
                        gameTableObject[elPos] = "empty";
                        document.getElementById(elPos).style.backgroundColor = "white";
                        document.getElementById(elPos).style.color = "black";
                        
                        /* kõik rohelised nupud tehakse valgeks */
                        greenPositions.forEach(allGreenPos => {
                            document.getElementById(allGreenPos).style.backgroundColor = "white";
                        });

                        /* roheline nupp millel vajutatakse tehakse punaseks nupuks */
                        gameTableObject[greenPos] = "red";
                        document.getElementById(greenPos).style.backgroundColor = "#B22222";

                        /* eemaldan vana punase nupu punaste massiivist ja panen uue asemele */
                        for(let k = 0; k < pTwoPositions.length; k++) {
                            if (pTwoPositions[k] === elPos) pTwoPositions.splice(k, 1);
                        }
                        pTwoPositions.push(greenPos);

                        /* kohandan nuppude liigutamise eventlistenerid */
                        document.getElementById(elPos).removeEventListener("click", movePiecesMethodObject[elPos]);
                        document.getElementById(greenPos).addEventListener("click", movePiecesMethodObject[greenPos]);

                        /* eemaldan käima pandud evenlistenerid */
                        greenPositions.forEach(greenPosition => {
                            document.getElementById(greenPosition).removeEventListener("click", greenPositionsObject[greenPosition]);
                        });
                        greenPositions = [];

                        /* muudan käigu korda */
                        changeTurn = true;
                    });

                    greenPositions.forEach(greenPosition => {
                        document.getElementById(greenPosition).addEventListener("click", greenPositionsObject[greenPosition]);
                    });
                }
            }
        }
    }
    pOnePositions.forEach(pOnePos => {
        document.getElementById(pOnePos).addEventListener("click", movePiecesMethodObject[pOnePos]);
    });
    pTwoPositions.forEach(pTwoPos => {
        document.getElementById(pTwoPos).addEventListener("click", movePiecesMethodObject[pTwoPos]);
    });
    
}




