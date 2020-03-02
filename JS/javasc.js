
var items =
    ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg"
        , "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg",
        "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg"
        , "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg",
        "water-can.jpg", "wine-glass.jpg", "usb.gif"];

var imageSection = document.querySelector("#imgsection");
var Litem1 = document.querySelector("#Litem-1");
var Mitem2 = document.querySelector("#Mitem-2");
var Ritem3 = document.querySelector("#Ritem-3");



function RandomNumber(rang1, rang2) {

    return Math.floor(Math.random() * (rang1 - rang2 + 1)) + rang2;
}
function Item(name) {
    this.name = name;
    this.clicks = 0;
    this.views = 0;
    this.imagePath = `image/${this.name}`;
    Item.all.push(this);
}
Item.all = [];

for (let i = 0; i < items.length; i++) {
    new Item(items[i]);
}

var Litem, Mitem, Ritem;
function render() {
    Litem = Item.all[RandomNumber(0, Item.all.length - 1)];
    console.log(Litem);
    Mitem = Item.all[RandomNumber(0, Item.all.length - 1)];
    Ritem = Item.all[RandomNumber(0, Item.all.length - 1)];
    while(Litem === Mitem || Mitem===Ritem ||Ritem===Litem){
        render();
    }
    Litem1.setAttribute('src', Litem.imagePath);
    Litem1.setAttribute('alt', Litem.name);
    Litem1.setAttribute('title', Litem.name);
    Mitem2.setAttribute('src', Mitem.imagePath);
    Mitem2.setAttribute('alt', Mitem.name);
    Mitem2.setAttribute('title', Mitem.name);
    Ritem3.setAttribute('src', Ritem.imagePath);
    Ritem3.setAttribute('alt', Ritem.name);
    Ritem3.setAttribute('title', Ritem.name);
   

}
render();


imageSection.addEventListener('click', HandleClickOnItem);
var totalclicks = 0;

function HandleClickOnItem(event) {
    if (totalclicks < 25) {
        if (event.target.id !== 'imgsection') {
            if (event.target.id === "Litem-1") {
                Litem.clicks++;
                
            } else if (event.target.id === "Mitem-2") {
                Mitem.clicks++;

            } else if (event.target.id === "Ritem-3") {
                Ritem.clicks++;

            }
            totalclicks++;
            Litem.views++;
            Mitem.views++;
            Ritem.views++;
            render();

        } 

    }else {
        console.log('more than 25 clicks');
        imageSection.removeEventListener('click', HandleClickOnItem);
        Render2();
    }
}

function Render2() {
    var UL1 = document.getElementById("theInformation");
    for (let i = 0; i < Item.all.length; i++) {
        var listitem = document.createElement('li');
        listitem.textContent = `${Item.all[i].name} has ${Item.all[i].clicks} clicks and ${Item.all[i].views} views`;
        UL1.appendChild(listitem);
    }
}
