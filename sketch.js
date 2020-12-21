var dog,happDog,database,foodS,foodStock;
var Food=0;
function preload()
{
dog1=loadImage("images/dog1.png")
dog2=loadImage("images/dog2.png")
}

function setup() {
  createCanvas(1000,400);
  foodobj=new Food()

  dog=createSprite(800,200,150,150)
  dog.addImage(dog1)
  dog.scale=0.5
  database = firebase.database()
  foodStock=database.ref("Food")
 foodStock.on("value",readStock)
 feed = createButton("feed the dog")
 feed.position(700,95)
 feed.mousePressed(feedDog)
 addfood = createButton("add food")
 addfood.position(800,95)
 addfood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87)
foodobj.display();
fedTime=database.ref("feedTime")
fedTime.on("value",function(data){
  lastFed=data.val()
})


  
  textSize(13)
  fill(255,254,255)
  if(lastFed>=12){
    text("lastFed"+lastFed%12+"pm",350,30)
  }else if(lastFed==0){
    text("lastFed : 12 am",350,30)
  } else{
    text("lastFed : "+lastFed+"am",350,30)
  }
  //add styles here
  drawSprites();
}

function readStock(data){
  foodS=data.val()
  foodobj.updateFoodStock(foodS)
}
function feedDog(){
dog.addImage(dog1)
foodobj.updateFoodStock(foodobj.getFoodStock()-1)
database.ref("/").update({
  Food:foodobj.getFoodStock(),
  feedTime:hour()
})
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:x
  })
}
 