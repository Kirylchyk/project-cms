const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

let value;
let array;

try {
    const lines = fileContent.trim().split('\n');
    value = parseInt(lines[0]);
    array = lines[1].split(' ').map(Number);

    console.log('Value:', value);
    console.log('Array:', array);
} catch (error) {
    console.error(error);
}

function swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function sorting(value, array) {
    for (let j = 0; j < value - 1; j++) {
        for (let i = 0; i < value - 1 - j; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
            }
        }
    }

    const output_array = array.join(' ');
    fs.writeFileSync('output.txt', output_array);
    console.log('Sorted array:', array);
}


sorting(value, array);

