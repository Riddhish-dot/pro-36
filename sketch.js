//Create variables here
var dog
var happyDog
var database
var foodS
var foodStock
var dogImage,dogImage2
var feed
var getFood
var feedTime
var lastFed
var foodObj

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png")
  dogImage2 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  dog = createSprite(250,250,0,0)
  dog.addImage("a",dogImage)
  dog.scale = 0.25
  foodObj = new Food()
  feed = createButton("Feed the dog")
  feed.position(680,110)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(780,110)
  addFood.mousePressed(addFood)
}


function draw() {  
background(46,139,87)
//if (keyWentUp){
//  writeStock(foodS)
//  dog.addImage("dog",dogImage2)
//}
feedTime = database.ref('FeedTime')
feedTime.on("value",function(data){
  lastFed = data.val()
})
  drawSprites();
  foodObj.display()
  textSize(20)
  fill("red")
  stroke("blue")
  text(foodStock,width/2,50)
  fill(255,255,255)
  textSize(15)
  if (lastFed>=12){
    text("Last Feed : " + lastFed%12 + "PM",350,30)
  }
  else if (lastFed==0){
    text("Last Feed : 12 AM",350,30)
  }
  else {
    text("Last Feed : " + lastFed + "AM",350,30)
  }
  //add styles here
}
function readStock(data){
  foodS = data.val()
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage("a",dogImage2)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
