const array_size = 50; 
let array = [];
let check = 0;
let paused = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkPause() {
    while (paused) {
        await sleep(50);
    }
}

function pause_func() {
    let bttn = document.getElementById("pause");
    paused = !paused;
    if (!paused) {
        bttn.style.backgroundColor = "green";
        bttn.innerText = "pause";
    } else {
        bttn.style.backgroundColor = "red";
        bttn.innerText = "continue";
    }
}

function genrate() {
    if (check == 1) return;
    check = 1;

    let area = document.querySelector(".area");
    array = [];
    area.innerHTML = "";

    for (let i = 0; i < array_size; i++) {
        let val = Math.floor(Math.random() * 150) + 20;
        array.push(val);

        const bar = document.createElement("div");
        bar.style.height = `${val}px`;
        bar.innerText = val;
        bar.style.backgroundColor = "lightcoral";
        bar.style.display = "inline-block";
        bar.style.margin = "0 2px";
        bar.classList.add("bars");

        area.appendChild(bar);
    }
    check = 0;
}

async function BUB_SORT() {
    if (check == 1) return;
    check = 1;

    let bars = document.getElementsByClassName("bars");
    document.getElementById("b3").classList.add("press");

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "yellow";
            bars[j + 1].style.backgroundColor = "yellow";

            await checkPause();
            await sleep(100);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j].innerText = array[j];
                bars[j + 1].style.height = `${array[j + 1]}px`;
                bars[j + 1].innerText = array[j + 1];
            }

            bars[j].style.backgroundColor = "lightcoral";
            bars[j + 1].style.backgroundColor = "lightcoral";
        }
        bars[array.length - i - 1].style.backgroundColor = "lightgreen";
    }
    bars[0].style.backgroundColor = "lightgreen";

    document.getElementById("b3").classList.remove("press");
    check = 0;
}

async function SEL_SORT() {
    if (check == 1) return;
    check = 1;

    let bars = document.getElementsByClassName("bars");
    document.getElementById("b4").classList.add("press");

    for (let i = 0; i < array.length; i++) {
        let min_idx = i;
        bars[min_idx].style.backgroundColor = "green";

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = "yellow";

            await checkPause();
            await sleep(50);

            if (array[j] < array[min_idx]) {
                if (min_idx !== i) bars[min_idx].style.backgroundColor = "lightcoral";
                min_idx = j;
                bars[min_idx].style.backgroundColor = "purple";
            } else {
                bars[j].style.backgroundColor = "lightcoral";
            }
        }

        [array[i], array[min_idx]] = [array[min_idx], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[i].innerText = array[i];
        bars[min_idx].style.height = `${array[min_idx]}px`;
        bars[min_idx].innerText = array[min_idx];

        await checkPause();
        await sleep(200);

        bars[i].style.backgroundColor = "lightgreen";
        if (min_idx !== i) bars[min_idx].style.backgroundColor = "lightcoral";
    }

    document.getElementById("b4").classList.remove("press");
    check = 0;
}

async function IN_SORT() {
    if (check == 1) return;
    check = 1;

    let bars = document.getElementsByClassName("bars");
    document.getElementById("b5").classList.add("press");

    bars[0].style.backgroundColor = "green";

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = "yellow";

        await checkPause();
        await sleep(100);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            bars[j + 1].innerText = array[j + 1];

            j--;

            await checkPause();
            await sleep(100);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[j + 1].innerText = key;

        bars[i].style.backgroundColor = "green";
    }

    document.getElementById("b5").classList.remove("press");
    check = 0;
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

        await checkPause();
        await sleep(50);

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];

            bars[i].style.height = `${arr[i]}px`;
            bars[i].innerText = arr[i];
            bars[j].style.height = `${arr[j]}px`;
            bars[j].innerText = arr[j];
        }

        bars[j].style.backgroundColor = "lightcoral";
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1]}px`;
    bars[i + 1].innerText = arr[i + 1];
    bars[high].style.height = `${arr[high]}px`;
    bars[high].innerText = arr[high];

    bars[high].style.backgroundColor = "lightcoral";

    return i + 1;
}

async function MER_SORT() {
    if (check == 1) return;
    check = 1;

    let bars = document.getElementsByClassName("bars");
    document.getElementById("b2").classList.add("press");

    await mergeSort(array, 0, array.length - 1, bars);

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

    await mergeSort(arr, left, mid, bars);
    await mergeSort(arr, mid + 1, right, bars);

    await merge(arr, left, mid, right, bars);
}

async function merge(arr, left, mid, right, bars) {
    let leftArray = arr.slice(left, mid + 1);
    let rightArray = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        bars[k].style.backgroundColor = "yellow";

        await checkPause();
        await sleep(50);

        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            bars[k].style.height = `${leftArray[i]}px`;
            bars[k].innerText = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            bars[k].style.height = `${rightArray[j]}px`;
            bars[k].innerText = rightArray[j];
            j++;
        }

        bars[k].style.backgroundColor = "lightcoral";
        k++;
    }

    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        bars[k].style.height = `${leftArray[i]}px`;
        bars[k].innerText = leftArray[i];
        i++;
        k++;

        await checkPause();
        await sleep(50);
    }

    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        bars[k].style.height = `${rightArray[j]}px`;
        bars[k].innerText = rightArray[j];
        j++;
        k++;

        await checkPause();
        await sleep(50);
    }
}
