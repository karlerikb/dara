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

const pOnePieces = document.querySelectorAll("#playerOne > tbody > tr > td");
const pTwoPieces = document.querySelectorAll("#playerTwo > tbody > tr > td");


/* mängulauale klikkides vahetab mängija korda */
const pOneTurn = document.getElementById("playerOneTurn");
const pTwoTurn = document.getElementById("playerTwoTurn");
let count = 0;
let player = "blue";

pOneTurn.innerHTML = "sinise kord"
pOnePieces.forEach(piece => piece.style.backgroundColor = "#0074D9");

document.getElementById("gameTableContainer").addEventListener("click", function() {
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
});

/* eemaldab mängijate nuppe kui need lauale asetatakse */
let pOnePieceCount = 0;
let pTwoPieceCount = 0;
const gameTablePieces = document.querySelectorAll("#gameTable > tbody > tr > td");

for(let i = 1; i <= 5; i++) {
    for(let j = 1; j <= 6; j++) {
        document.getElementById("pos" + i + j).addEventListener("click", function() {
            if(player === "blue" && pOnePieceCount < 12) {
                document.getElementById("pos" + i + j).style.backgroundColor = "#0074D9";
                pOnePieces[pOnePieceCount].style.display = "none";
                pOnePieceCount++;
            }
            if(player === "red" && pTwoPieceCount < 12) {
                document.getElementById("pos" + i + j).style.backgroundColor = "#B22222";
                pTwoPieces[pTwoPieceCount].style.display = "none";
                pTwoPieceCount++;
            }
        })
    }
}

