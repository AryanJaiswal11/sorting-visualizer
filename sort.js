const array_size = 50; // Number of bars
let array = [];
let check = 0;
let paused = false;

async function checkPause() {
    while (paused) {
        await sleep(50); 
    }
}


function pause_func(){
   let bttn = document.getElementById("pause");
   paused = !paused;
   if(!paused){
    bttn.style.backgroundColor="green";
    bttn.innerText="pause";
   }
   else{
    bttn.style.backgroundColor="red";
    bttn.innerText="continue";
   }
}




function genrate(){
    if(check == 1) return;
    check = 1;

    let area = document.querySelector(".area");
    array = []; //clearing array
    area.innerHTML = ""; //clearing area

    for(let i = 0; i<array_size; i++){
        let val = Math.floor(Math.random() * 150) + 20;
        array.push(val);

        //create a bar using div
        const bar = document.createElement("div");
        bar.style.height = `${val}px`;
        bar.innerText=val;
        bar.style.backgroundColor = `white`;
        bar.style.display = "inline-block";
        bar.style.margin = "0 2px"; 
        bar.style.backgroundColor = "lightcoral";
        bar.classList.add("bars");

        area.appendChild(bar);
    }
    check = 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function BUB_SORT() {
    if(check == 1) return;
    check = 1;
    
    let bars = document.getElementsByClassName("bars");
    document.getElementById("b3").classList.add("press");
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        bars[j].style.backgroundColor = "yellow";
        bars[j + 1].style.backgroundColor = "yellow";
  
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          bars[j].style.height = `${array[j]}px`;
          bars[j].innerHTML=`${array[j]}px`;
          
          bars[j + 1].style.height = `${array[j + 1]}px`;
          bars[j + 1].innerHTML = `${array[j + 1]}px`;

        }
        await checkPause();
        await sleep(300);
        bars[j].style.backgroundColor = "lightcoral";
        bars[j + 1].style.backgroundColor = "lightcoral";
      }
      bars[array.length - i - 1].style.backgroundColor = "lightgreen"; // Sorted
    }
    bars[0].style.backgroundColor = "lightgreen";
    document.getElementById("b3").classList.remove("press");
    check = 0;
}
async function SEL_SORT(){
    if(check == 1) return;
    check = 1;
    let bars = document.getElementsByClassName("bars");
    document.getElementById("b4").classList.add("press");

    for(let i = 0; i<array.length; i++){
        min_idx = i;
        bars[min_idx].style.backgroundColor="green";

        for(let j = i+1; j<array.length; j++){
            bars[j].style.backgroundColor = "yellow";
            await sleep(10);
            if(array[min_idx] > array[j]){
                if (min_idx !== i) {
                    bars[min_idx].style.backgroundColor = "lightcoral";
                }
                
                min_idx = j;
                bars[min_idx].style.backgroundColor="purple";
            }
            else{
                bars[j].style.backgroundColor = "lightcoral";
            }
        }
        [array[i], array[min_idx]] = [array[min_idx], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[min_idx].style.height=`${array[min_idx]}px`;

        await checkPause();
        await sleep(300);

        bars[i].style.backgroundColor = "lightgreen";
        if (min_idx !== i) {
            bars[min_idx].style.backgroundColor = "lightcoral";
        }
    }

    document.getElementById("b4").classList.remove("press");
    check = 0;
}

async function IN_SORT(){
    if(check == 1) return;
    check = 1;
    let bars = document.getElementsByClassName("bars");
    document.getElementById("b5").classList.add("press");

    bars[0].style.backgroundColor="green";
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = "yellow";

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            j--;
            await checkPause();
            await sleep(300);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[i].style.backgroundColor = "green";
    }

    document.getElementById("b5").classList.remove("press");
    check = 0;
}
async function QK_SORT() {
  await quickSort(0, array.length - 1);
}

async function quickSort(low, high) {
  if (low < high) {
    let pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  let pivot = array[high];
  let bars = document.getElementsByClassName("bars");
  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = "yellow";
    await sleep(30);

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
    }

    bars[j].style.backgroundColor = "lightcoral";
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1]}px`;
  bars[high].style.height = `${array[high]}px`;

  return i + 1;
}
async function QK_SORT() {
    if (check == 1) return;
    check = 1;

    let bars = document.getElementsByClassName("bars");
    document.getElementById("b1").classList.add("press");

    await quickSort(array, 0, array.length - 1, bars);

    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "lightgreen";
    }

    document.getElementById("b1").classList.remove("press");
    check = 0;
}
async function quickSort(arr, low, high, bars) {
    if (low < high) {
        let pi = await partition(arr, low, high, bars);

        await quickSort(arr, low, pi - 1, bars);
        await quickSort(arr, pi + 1, high, bars);
    }
}

async function partition(arr, low, high, bars) {
    let pivot = arr[high];
    bars[high].style.backgroundColor = "blue";

    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        bars[j].style.backgroundColor = "yellow";
        await sleep(30);

        if (arr[j] < pivot) {
            i++;
            bars[i].style.backgroundColor="purple";
            [arr[i], arr[j]] = [arr[j], arr[i]];

            bars[i].style.height = `${arr[i]}px`;
            bars[j].style.height = `${arr[j]}px`;
            await sleep(50);
            bars[i].style.backgroundColor = "lightcoral";
        }

        bars[j].style.backgroundColor = "lightcoral";
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    bars[i + 1].style.height = `${arr[i + 1]}px`;
    bars[high].style.height = `${arr[high]}px`;

    bars[high].style.backgroundColor = "lightcoral";

    return i + 1;
}
async function MER_SORT() {
    if (check == 1) return;
    check = 1;
    let bars = document.getElementsByClassName("bars");
    document.getElementById("b2").classList.add("press");

    await mergeSort(array, 0, array.length - 1, bars);

    // Mark all bars as sorted (green)
    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = "lightgreen";
        await sleep(10);
    }

    document.getElementById("b2").classList.remove("press");
    check = 0;
}
async function mergeSort(arr, left, right, bars) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);

    // Sort first half
    await mergeSort(arr, left, mid, bars);

    // Sort second half
    await mergeSort(arr, mid + 1, right, bars);

    // Merge sorted halves
    await merge(arr, left, mid, right, bars);
}

async function merge(arr, left, mid, right, bars) {
    let leftArray = arr.slice(left, mid + 1);
    let rightArray = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;
    bars[mid].style.backgroundColor="purple";
    await checkPause();
    await sleep(200);
    bars[right].style.backgroundColor="white";
    await checkPause();
    await sleep(200);
    while (i < leftArray.length && j < rightArray.length) {
        bars[k].style.backgroundColor = "yellow";  // Highlight comparison
        await sleep(50);

        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            bars[k].style.height = `${leftArray[i]}px`;
            i++;
        } else {
            arr[k] = rightArray[j];
            bars[k].style.height = `${rightArray[j]}px`;
            j++;
        }
        await checkPause();
        bars[k].style.backgroundColor = "lightcoral";  // Reset after update
        k++;
    }

    // Copy remaining elements of leftArray
    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        bars[k].style.backgroundColor = "yellow";
        bars[k].style.height = `${leftArray[i]}px`;
        await checkPause();
        await sleep(300);
        bars[k].style.backgroundColor = "lightcoral";
        i++;
        k++;
    }

    // Copy remaining elements of rightArray
    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        bars[k].style.backgroundColor = "yellow";
        bars[k].style.height = `${rightArray[j]}px`;
        await checkPause();
        await sleep(300);
        bars[k].style.backgroundColor = "lightcoral";
        j++;
        k++;
    }
}

