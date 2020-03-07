
//this is the array of product 
var items =
    ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg"
        , "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg",
        "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg"
        , "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg",
        "water-can.jpg", "wine-glass.jpg", "usb.gif"];
//collecting the source of the image by id to put the image inside it
var imageSection = document.querySelector("#imgsection");
var Litem1 = document.querySelector("#Litem-1");
var Mitem2 = document.querySelector("#Mitem-2");
var Ritem3 = document.querySelector("#Ritem-3");


// this is the random fuction that calculate the product and return an random product position
function RandomNumber(rang1, rang2) {

    return Math.floor(Math.random() * (rang1 - rang2 + 1)) + rang2;
}
// This is the constructor to make the object instances
function Item(name) {
    this.name = name;
    this.clicks = 0;
    this.views = 0;
    this.imagePath = `image/${this.name}`;
    Item.all.push(this);
}
Item.all = [];

// here it make the array of product objects
for (let i = 0; i < items.length; i++) {
    new Item(items[i]);
}

// this cal array for the names on the chart intalized to filled with names of the product ,view  and repeat imag is the same
var clc=[];
var vew=[];
var RepeatImage=[];
// the render fuction that it takes the random choosen product and give it to the variables LMR item for shown on the screen 
var Litem, Mitem, Ritem;
function render() {
    Litem = Item.all[RandomNumber(0, Item.all.length - 1)];
    
    Mitem = Item.all[RandomNumber(0, Item.all.length - 1)];
    Ritem = Item.all[RandomNumber(0, Item.all.length - 1)];
  // here we prevent repeating same product on the same round or the round after
    while(Litem === Mitem || Mitem===Ritem ||Ritem===Litem ||RepeatImage.includes(Litem.imagePath) || RepeatImage.includes(Mitem.imagePath)||RepeatImage.includes(Ritem.imagePath)){
        Litem = Item.all[RandomNumber(0, Item.all.length - 1)];
    
        Mitem = Item.all[RandomNumber(0, Item.all.length - 1)];
        Ritem = Item.all[RandomNumber(0, Item.all.length - 1)];
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
    console.log(Item.all.length);
    
    RepeatImage[0]=Litem.imagePath;
    RepeatImage[1]=Mitem.imagePath;
    RepeatImage[2]=Ritem.imagePath;      

    for (let index = 0; index < Item.all.length; index++) {
    clc[index]=Item.all[index].clicks; 
    vew[index]=Item.all[index].views;    
}
}

render();
// this is local storage set 
function updateClicks() {
   var upclicks = JSON.stringify(Item.all);
   localStorage.setItem('upclick',upclicks);
}
// this is the local storage get 
function getClicks() {
    var upclicks = localStorage.getItem('upclick');
    console.log(upclicks);
    if(upclicks) {
      Item.all = JSON.parse(upclicks);
      console.log(upclicks);
      render();
      Render2();
  
    }
  }
  getClicks();

// this is the event listener for git clicks and views 
imageSection.addEventListener('click', HandleClickOnItem);
var totalclicks = 0;

function HandleClickOnItem(event) {
    if (totalclicks < 25) {
        if (event.target.id !== 'imgsection') {
            if (event.target.id === "Litem-1") {
                Litem.clicks++;
                console.log(Litem.clicks);
                
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
            updateClicks();
        } 

    }else {
        console.log('more than 25 clicks');
        imageSection.removeEventListener('click', HandleClickOnItem);
        // Here it will showen the scrolled list  
        Render2();
        
        // when we call this fuction it will show the chart filled with the appropraite information 
        render3();
    }
}


// list function creation 
function Render2() {
    var UL1 = document.getElementById("theInformation");
    for (let i = 0; i < Item.all.length; i++) {
        var listitem = document.createElement('li');
        listitem.textContent = `${Item.all[i].name.split('.',1)} has ${Item.all[i].clicks} clicks (has been added) , it has  ${Item.all[i].views} views also`;
        UL1.appendChild(listitem);
    }
}
var itemName =[];
// here function add names for adding the names to the chart 
function Addnames() {
    for (let i =0; i < items.length ;i++) {
       var item =items[i];
       itemName.push(item); 
       
    } 
  }

Addnames();
// this is the chart with the itemname  and clc for clicks data and vew and the views for the same image
function render3(){
var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: itemName,
        datasets: [{
            label: '# of Clicks',
            data: clc,
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
                
            
            borderColor: 
                
                'rgba(54, 162, 235, 1)',
                
            borderWidth: 1
        },
        {
            label: '# of views',
            data: vew,
            backgroundColor: 
                'rgba(255, 99, 230, 0.2)',
                
            
            borderColor: 
                
                'rgba(54, 162, 235, 1)',
                
            borderWidth: 1
        }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}
