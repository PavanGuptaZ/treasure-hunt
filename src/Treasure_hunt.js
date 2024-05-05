const coins = document.getElementById("coindrag");
const bomb = document.getElementById("bombdrag");
const box = document.querySelectorAll(".box");
const gamebutton = document.getElementById("gamestart");
const newgame = document.getElementById("new-game");
const player = document.getElementById("player");
const helpbox = document.getElementById("helper");
const Paragraph = document.getElementById("Paragraph");
var objecttype;
var gameupdate = false;
var coindrop = false;
var bombdrop = false;
var coinsboxdiv;
var bombboxdiv;
var opnedboxs = [];
chances = 3;
coins.addEventListener("dragstart", dragstart01);
coins.addEventListener("dragend", dragend01);
function dragstart01() {
    objecttype = "coins";
    console.log("Drag01 start");
}
function dragend01() {
    objecttype = "";
}
bomb.addEventListener("dragstart", dragstart02);
bomb.addEventListener("dragend", dragend02);
function dragstart02() {
    objecttype = "bomb";
    console.log("Drag02 start");
}
function dragend02() {
    objecttype = "";
}

for (const chest of box) {
    chest.addEventListener("dragover", dragOver);
    chest.addEventListener("dragenter", dragEnter);
    chest.addEventListener("dragleave", dragLeave);
    chest.addEventListener("drop", dragDrop);
    chest.addEventListener("DOMNodeRemoved", childremoved);

    // if (objecttype === "" || gameupdate === true) {

    // } else {
    //     chest.addEventListener("dragstart", dragstart03);
    // }
};

function dragOver(e) {
    e.preventDefault();
    // console.log("over");
}
function dragEnter(e) {
    e.preventDefault();
    this.classList.add("hovered");
}
function dragLeave(e) {
    e.preventDefault();
    this.classList.remove("hovered");
}
function dragDrop(e) {
    this.classList.remove("hovered");
    let answer = this.hasChildNodes();
    if (answer === false) {
        if (objecttype === "coins") {
            this.append(coins);
            this.classList.add("coin-box");
            coinsboxdiv = this;
            coindrop = true;
        } else if (objecttype === "bomb") {
            this.classList.add("bomb-box");
            this.append(bomb);
            bombboxdiv = this;
            bombdrop = true;

        }
    } else {
        helpbox.style.visibility = "visible";
        Paragraph.innerHTML = "Same Box is not Allowed";
    }

}
// function dragstart03() {
//     if (objecttype === "coins") {
//         this.classList.remove("coin-box");
//     } else if (objecttype === "bomb") {
//         this.classList.remove("bomb-box");
//     }
// }
function childremoved() {
    this.className = "box";
    console.log("working");
}

gamebutton.addEventListener("click", () => {
    if (coindrop === true && bombdrop === true) {
        gameupdate = true;
        console.log(`game update ${gameupdate}`);
        helpbox.style.visibility = "visible";
        Paragraph.innerHTML = `Seeker has ${chances} chances`;
        player.innerHTML = "Seeker Turn";
        coins.style.cursor = "pointer";
        bomb.style.cursor = "pointer";

        // removing all event listeners
        for (const chest of box) {
            chest.removeEventListener("dragover", dragOver);
            chest.removeEventListener("dragenter", dragEnter);
            chest.removeEventListener("dragleave", dragLeave);
            chest.removeEventListener("drop", dragDrop);
            chest.removeEventListener("DOMNodeRemoved", childremoved);

        }
        bomb.removeEventListener("dragstart", dragstart02);
        bomb.removeEventListener("dragend", dragend02);
        //untill here
        coins.setAttribute("draggable", "false");
        bomb.setAttribute("draggable", "false");

        box.forEach(element => {
            element.classList.remove("coin-box");
            element.classList.remove("bomb-box");
        });
        box.forEach(element => {
            element.classList.add("in-game");
        });
        for (const chest of box) {

            chest.addEventListener("click", results);
        }
    } else {
        helpbox.style.visibility = "visible";
        Paragraph.innerHTML = "First Hide Treasure and Bomb and start the game";
    }

});
function results() {
    let child = this.firstChild;
    if (child) {
        let id = child.id
        if (id === "coindrag") {
            this.classList.add("coin-box");
            for (const chest of box) {

                chest.removeEventListener("click", results);
                chest.classList.remove("in-game");
            }
            Winfunction();
        } else if (id === "bombdrag") {
            this.classList.add("bomb-box");
            for (const chest of box) {

                chest.removeEventListener("click", results);
                chest.classList.remove("in-game");
            }
            Loosefunction();
        }
    } else {
        console.log("no");
        this.classList.add("opened");
        chances--;
        opnedboxs.push(this);
        Paragraph.innerHTML = `Seeker has ${chances} chances`;
    }
    if (chances === 0) {
        for (const chest of box) {

            chest.removeEventListener("click", results);
            chest.classList.remove("in-game");
        }
        Loosefunction();
    }
}
function Loosefunction() {
    gamebutton.style.display = "none";
    newgame.style.display = "block";
    Paragraph.innerHTML = `Hider Won the game`;
    newgame.addEventListener("click", () => {
        location.reload(true);
    })
    console.log("loose");
    openall();

}
function Winfunction() {
    gamebutton.style.display = "none";
    newgame.style.display = "block";
    Paragraph.innerHTML = `Seeker Won the game`;
    newgame.addEventListener("click", () => {
        location.reload(true);
    })
    console.log("win");
    openall();

}
function openall(){
    // console.log(bombboxdiv , coinsboxdiv,opnedboxs);
    for (const chest of box) {
        chest.classList.add("open");
    }
    coinsboxdiv.classList.add("coin-box");
    bombboxdiv.classList.add("bomb-box");
    coinsboxdiv.classList.remove("open");
    bombboxdiv.classList.remove("open");
    for (const chest of opnedboxs) {
        chest.classList.remove("open");
    }
}