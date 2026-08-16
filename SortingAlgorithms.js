
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
  return Array;
}

//QuickSort algorithm
async function QuickSort(Array,start = 0, fullArray=myArrayRandom, isTopLevel = true){
  if(Array.length<2){
    if (isTopLevel){
      updateBars(fullArray);
    }
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
  let leftSide = await QuickSort(left,start, fullArray, false);
  let rightSide = await QuickSort(right, start+leftSide.length+pivots.length, fullArray, false);
  Array = [...leftSide, ...pivots, ...rightSide]

  for (let i=0; i<Array.length; i++){
    fullArray[start + i] = Array[i];
    updateBars(fullArray,start+i);
    playSound(Array[i]*mul);
    await pause(speed);
  }
  if (isTopLevel){
    updateBars(fullArray);
  }
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
  return Array;
}

//mergeSort algorithm
async function MergeSort(Array){
  if (Array.length < 2){
    updateBars(Array);
    return Array;
  }

  const temp = new Array(Array.length);

  async function merge(low, mid, high){
    let i = low;
    let j = mid + 1;
    let k = low;

    while (i <= mid && j <= high){
      updateBars(Array, i, j);
      playSound(Array[i]*mul);
      await pause(speed);

      if (Array[i] <= Array[j]){
        temp[k] = Array[i];
        i++;
      }
      else{
        temp[k] = Array[j];
        j++;
      }
      k++;
    }

    while (i <= mid){
      temp[k] = Array[i];
      i++;
      k++;
    }

    while (j <= high){
      temp[k] = Array[j];
      j++;
      k++;
    }

    for (let p = low; p <= high; p++){
      Array[p] = temp[p];
      updateBars(Array, p);
      playSound(Array[p]*mul);
      await pause(speed);
    }
  }

  async function mergeSortRec(low, high){
    if (low >= high){
      return;
    }
    const mid = Math.floor((low + high) / 2);
    await mergeSortRec(low, mid);
    await mergeSortRec(mid + 1, high);
    await merge(low, mid, high);
  }

  await mergeSortRec(0, Array.length - 1);
  updateBars(Array);
  return Array;
}

//heapSort algorithm
async function HeapSort(Array){
  async function heapify(n, i){
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n){
      updateBars(Array, largest, left);
      playSound(Array[left]*mul);
      await pause(speed);
      if (Array[left] > Array[largest]){
        largest = left;
      }
    }

    if (right < n){
      updateBars(Array, largest, right);
      playSound(Array[right]*mul);
      await pause(speed);
      if (Array[right] > Array[largest]){
        largest = right;
      }
    }

    if (largest != i){
      let temp = Array[i];
      Array[i] = Array[largest];
      Array[largest] = temp;

      updateBars(Array, i, largest);
      playSound(Array[i]*mul);
      await pause(speed);

      await heapify(n, largest);
    }
  }

  for (let i = Math.floor(Array.length / 2) - 1; i >= 0; i--){
    await heapify(Array.length, i);
  }

  for (let i = Array.length - 1; i > 0; i--){
    let temp = Array[0];
    Array[0] = Array[i];
    Array[i] = temp;

    updateBars(Array, 0, i);
    playSound(Array[i]*mul);
    await pause(speed);

    await heapify(i, 0);
  }

  updateBars(Array);
  return Array;
}