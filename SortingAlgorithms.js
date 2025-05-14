
//bubbleSort
async function BubbleSort(Array){
  let sorting = true

  while(sorting==true){
    sorting = false;
    for (var i=0; i<Array.length-1; i++) {
      if (Array[i] > Array[i + 1]) {
        sorting = true
        updateBars(Array, i,i+1);
        playSound(Array[i]*mul);
        await pause(speed)
        let temp = Array[i]
        Array[i] = Array[i + 1]
        Array[i + 1] = temp
        updateBars(Array, i ,i+1);
        playSound(Array[i]*mul);
        await pause(speed)
      }
      else{
        updateBars(Array, i ,i+1);
        playSound(Array[i]*mul);
        await pause(speed)
      }
    }
  }
  updateBars(Array);

  document.getElementById("myRange").disabled = false;
  document.getElementById("GenerateNewRandomArray").disabled = false;
  document.getElementById("sortButton").disabled = false;
  document.getElementById("dropDownValue").disabled = false;
  return Array;
}

//selection algorithm
async function SelectionSort(Array){
  for (var i=0; i<Array.length; i++) {
    let index = i
    let currentMin = Array[i]

    updateBars(Array, i);
    playSound(Array[i]*mul);
    await pause(speed);

    for (var j=i+1; j<Array.length; j++){
      updateBars(Array, i, j);
      playSound(Array[i]*mul);
      await pause(speed);
      if (currentMin>Array[j]){
        currentMin = Array[j]
        index = j
        updateBars(Array, i, index);
        playSound(Array[i]*mul);
        await pause(speed);
      }
    }
    let temp = Array[i]
    Array[i] = currentMin
    Array[index] = temp
    updateBars(Array, i,index);
    playSound(Array[i]*mul);
    await pause(speed)
  }
  updateBars(Array);
  document.getElementById("myRange").disabled = false;
  document.getElementById("GenerateNewRandomArray").disabled = false;
  document.getElementById("sortButton").disabled = false;
  document.getElementById("dropDownValue").disabled = false;
  return Array;
}

//insertion algorithm
async function InsertionSort(Array){
  for (var i=1; i<Array.length; i++) {
    let index = i
    updateBars(Array, index);
    playSound(Array[i]*mul);
    await pause(speed);
    for (let j=i-1; j>-1; j--){
      if (Array[index] < Array[j]){
        let temp = Array[index]
        Array[index] = Array[j]
        Array[j] = temp
        index = j
        updateBars(Array, j, index);
        playSound(Array[i]*mul);
        await pause(speed);
      }
      else{
        break;
      }
    }
    updateBars(Array, index);
    playSound(Array[i]*mul);
    await pause(speed);
  }
  updateBars(Array);
  document.getElementById("myRange").disabled = false;
  document.getElementById("GenerateNewRandomArray").disabled = false;
  document.getElementById("sortButton").disabled = false;
  document.getElementById("dropDownValue").disabled = false;
  return Array;
}

//QuickSort algorithm
async function QuickSort(Array,start = 0, fullArray=myArrayRandom){
  if(Array.length<2){
    return Array
  }
  let middle = Math.floor(Array.length/2)
  let medianOfthreeArray = [Array[0], Array[middle],Array[Array.length-1]]
  medianOfthreeArray.sort((a, b) => a - b);

  Array[0] = medianOfthreeArray[0]
  Array[middle] = medianOfthreeArray[1]
  Array[Array.length-1] = medianOfthreeArray[2]

  let pivot = medianOfthreeArray[1];

  let left = []
  let right = []
  let pivots = []

  for (let i=0; i<Array.length; i++) {
    if (Array[i] < pivot){
      left.push(Array[i]);
    }
    else if (Array[i] > pivot){
      right.push(Array[i]);
    }
    else{
      pivots.push(Array[i]);
    }
  }
  let leftSide = await QuickSort(left,start, fullArray);
  let rightSide = await QuickSort(right, start+leftSide.length+pivots.length, fullArray);
  Array = [...leftSide, ...pivots, ...rightSide]

  for (let i=0; i<Array.length; i++){
    fullArray[start + i] = Array[i];
    updateBars(fullArray,start+i);
    playSound(Array[i]*mul);
    await pause(speed);
  }
  updateBars(Array);
  document.getElementById("myRange").disabled = false;
  document.getElementById("GenerateNewRandomArray").disabled = false;
  document.getElementById("sortButton").disabled = false;
  document.getElementById("dropDownValue").disabled = false;
  return Array;
}

//shellSort algorithm
async function ShellSort(Array){
  let Gap = Math.floor(Array.length/2)
  while(Gap>0){
    for (var i=Gap; i<Array.length; i++) {
      let index = i
      updateBars(Array, index);
      playSound(Array[i]*mul);
      await pause(speed);

      for (let j=i-Gap; j>-1; j-=Gap){
        if (Array[index] < Array[j]){
          let temp = Array[index]
          Array[index] = Array[j]
          Array[j] = temp
          index = j
          updateBars(Array, j, index);
          playSound(Array[i]*mul);
          await pause(speed);
        }
        else{
          break;
        }
      }
      updateBars(Array, index);
      playSound(Array[i]*mul);
      await pause(speed);
    }

    Gap = Math.floor(Gap/2);
  }
  updateBars(Array);
  document.getElementById("myRange").disabled = false;
  document.getElementById("GenerateNewRandomArray").disabled = false;
  document.getElementById("sortButton").disabled = false;
  document.getElementById("dropDownValue").disabled = false;
  return Array;
}