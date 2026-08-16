const slider = document.getElementById("myRange");
const slider2 = document.getElementById("myRange2");
const dropDownValue = document.getElementById("dropDownValue");
const stopButton = document.getElementById("stopButton");
const sliderValue = document.getElementById("sliderValue");
const sliderValue2 = document.getElementById("sliderValue2");
const algoName = document.getElementById("algoName");
const algoComplexity = document.getElementById("algoComplexity");
const sortStatus = document.getElementById("sortStatus");
var audio = new Audio("")
let size = 0;
let speed =100;
const ul = document.getElementById('ArrayBars')
let myArray = []
let audioCtx=null
let mul = 4
const MAX_BAR_HEIGHT_PERCENT = 92
let cancelRequested = false
const SORT_CANCELLED_ERROR = "SORT_CANCELLED"

const algorithmInfo = {
  "1": { name: "Bubble Sort", complexity: "Time: O(n^2) | Space: O(1)" },
  "2": { name: "Selection Sort", complexity: "Time: O(n^2) | Space: O(1)" },
  "3": { name: "Insertion Sort", complexity: "Time: O(n^2) avg | Space: O(1)" },
  "4": { name: "Quick Sort", complexity: "Time: O(n log n) avg | Space: O(log n)" },
  "5": { name: "Shell Sort", complexity: "Time: depends on gap seq | Space: O(1)" },
  "6": { name: "Merge Sort", complexity: "Time: O(n log n) | Space: O(n)" },
  "7": { name: "Heap Sort", complexity: "Time: O(n log n) | Space: O(1)" }
};

function refreshAlgorithmMeta() {
  const selected = algorithmInfo[dropDownValue.value] || algorithmInfo["1"];
  algoName.textContent = selected.name;
  algoComplexity.textContent = selected.complexity;
}

function setSortingUIState(isSorting) {
  document.getElementById("myRange").disabled = isSorting;
  document.getElementById("GenerateNewRandomArray").disabled = isSorting;
  document.getElementById("sortButton").disabled = isSorting;
  document.getElementById("dropDownValue").disabled = isSorting;
  stopButton.disabled = !isSorting;
}

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

const myArrayOrginal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
let myArrayRandom = []

//to draw the bars, visualize the sorting
function updateBars(Array, comparing1= -1, comparing2 = -1) {
  ul.innerHTML = " ";
  for (var i=0; i<Array.length; i++){
    var li = document.createElement('li');

    if (i === comparing1 || i === comparing2){
      li.style.border = "1px solid White";
    }

    // Normalize values so 100 maps to a capped in-chart height.
    const value = Math.max(0, Math.min(Array[i], 100));
    li.style.height = (value / 100) * MAX_BAR_HEIGHT_PERCENT + "%";
    ul.appendChild(li)
  }
}
//to slow down the the sorting to be able to see it
async function pause(ms){
  if (cancelRequested) {
    throw new Error(SORT_CANCELLED_ERROR);
  }
  await new Promise(resolve => setTimeout(resolve, ms));
  if (cancelRequested) {
    throw new Error(SORT_CANCELLED_ERROR);
  }
}

//Assigning the number to arrayNumbers
document.getElementById("ArrayNumbers").innerHTML = myArray.join(" ");
refreshAlgorithmMeta();

dropDownValue.addEventListener("change", function() {
  refreshAlgorithmMeta();
  sortStatus.textContent = "Ready";
});

stopButton.addEventListener("click", function() {
  cancelRequested = true;
  sortStatus.textContent = "Stopping...";
});

//to be able to grab the value of the size slider
slider.addEventListener("input", function() {
  sliderValue.innerHTML = slider.value;
  const sliderValueInt = parseInt(slider.value);

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
  sortStatus.textContent = "Ready";
})



//when button clicked sorting commence
document.getElementById("sortButton").addEventListener("click", async function(){

  if (myArrayRandom.length === 0){
    sortStatus.textContent = "Generate an array first";
    return;
  }

  cancelRequested = false;
  setSortingUIState(true);
  sortStatus.textContent = "Sorting...";

  try {
    if (dropDownValue.value== "1"){
      myArrayRandom = await BubbleSort(myArrayRandom)
    }

    if (dropDownValue.value== "2"){
      myArrayRandom = await SelectionSort(myArrayRandom)
    }


    if (dropDownValue.value== "3"){
      myArrayRandom = await InsertionSort(myArrayRandom)
    }

    if (dropDownValue.value== "4"){
      myArrayRandom = await QuickSort(myArrayRandom)
    }


    if (dropDownValue.value== "5"){
      myArrayRandom = await ShellSort(myArrayRandom)
    }

    if (dropDownValue.value== "6"){
      myArrayRandom = await MergeSort(myArrayRandom)
    }

    if (dropDownValue.value== "7"){
      myArrayRandom = await HeapSort(myArrayRandom)
    }

    sortStatus.textContent = "Done";
  }
  catch (error) {
    if (error && error.message === SORT_CANCELLED_ERROR) {
      sortStatus.textContent = "Stopped";
    }
    else {
      sortStatus.textContent = "Error";
      console.error(error);
    }
  }
  finally {
    document.getElementById("ArrayNumbers").innerHTML = myArrayRandom.join(" ");
    setSortingUIState(false);
    cancelRequested = false;
  }


})