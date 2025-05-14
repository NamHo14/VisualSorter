const slider = document.getElementById("myRange");
const slider2 = document.getElementById("myRange2");
const sliderValue = document.getElementById("sliderValue");
const sliderValue2 = document.getElementById("sliderValue2");
var audio = new Audio("")
let size = 0;
let speed =100;
ul = document.getElementById('ArrayBars')
myArray = []
let audioCtx=null
let mul = 4

function playSound(frequency) {
  if (audioCtx == null) {
    audioCtx=new(
      AudioContext || webkitAudioContext || window.webkitAudioContext)();
  }
  const dur = 0.1
  const osc=audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.frequency.value = frequency;
  gainNode.gain.value = 0.008
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime+dur);
}

myArrayOrginal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
myArrayRandom = []

//to draw the bars, visualize the sorting
function updateBars(Array, comparing1= -1, comparing2 = -1) {
  ul.innerHTML = " ";
  for (var i=0; i<Array.length; i++){
    var li = document.createElement('li');

    if (i === comparing1 || i === comparing2){
      li.style.border = "1px solid White";
    }

    li.style.height = (Array[i]*30)/100 + "vw";
    ul.appendChild(li)
  }
}
//to slow down the the sorting to be able to see it
async function pause(ms){
  await new Promise(resolve => setTimeout(resolve, ms));
}

//Assigning the number to arrayNumbers
document.getElementById("ArrayNumbers").innerHTML = myArray.join(" ");

//to be able to grab the value of the size slider
slider.addEventListener("input", function() {
  sliderValue.innerHTML = slider.value;
  sliderValueInt = parseInt(slider.value);

  myArray = []
  for(var i=0; i<sliderValueInt; i++){
    myArray.push(myArrayOrginal[i]);
  }

  document.getElementById("ArrayNumbers").innerHTML = myArray.join(" ");
  updateBars(myArray);
  size = myArray.length;
})

//to be able to grab the value of the speed slider
slider2.addEventListener("input", function() {
  sliderValue2.innerHTML = slider2.value;
  speed = (101-parseInt(slider2.value))*2
})


//generate a random array when button click
document.getElementById("GenerateNewRandomArray").addEventListener("click", function(){
  myArrayRandom=[]
  for(var i=0; i<size; i++){
    myArrayRandom.push(Math.floor(Math.random() * 100)+1);
  }
  document.getElementById("ArrayNumbers").innerHTML = myArrayRandom.join(" ");
  updateBars(myArrayRandom);
})



//when button clicked sorting commence
document.getElementById("sortButton").addEventListener("click", async function(){

  document.getElementById("myRange").disabled = true;
  document.getElementById("GenerateNewRandomArray").disabled = true;
  document.getElementById("sortButton").disabled = true;
  document.getElementById("dropDownValue").disabled = true;

  if (document.getElementById("dropDownValue").value== "1"){
    myArrayRandom = await BubbleSort(myArrayRandom)
    document.getElementById("ArrayNumbers").innerHTML = myArrayRandom.join(" ");
  }

  if (document.getElementById("dropDownValue").value== "2"){
    myArrayRandom = await SelectionSort(myArrayRandom)
    document.getElementById("ArrayNumbers").innerHTML = myArrayRandom.join(" ");
  }


  if (document.getElementById("dropDownValue").value== "3"){
    myArrayRandom = await InsertionSort(myArrayRandom)
    document.getElementById("ArrayNumbers").innerHTML = myArrayRandom.join(" ");
  }

  if (document.getElementById("dropDownValue").value== "4"){
    myArrayRandom = await QuickSort(myArrayRandom)
    document.getElementById("ArrayNumbers").innerHTML = myArrayRandom.join(" ");
  }


  if (document.getElementById("dropDownValue").value== "5"){
    myArrayRandom = await ShellSort(myArrayRandom)
    document.getElementById("ArrayNumbers").innerHTML = myArrayRandom.join(" ");
  }


})