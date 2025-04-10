
import { moneyProblem } from "../scripts/utils1.js";


console.log('Money problem tests:')

console.log('It works with normal numbers like (2042, 25023, 65139424 ...)');
if(moneyProblem(2095) === '20.95') {
    console.log('Passed');
} else {
    console.log('Failed');
};

console.log('it works 0');
if(moneyProblem(0) === '0.00') {
    console.log('Passed');
} else {
    console.log('Failed');
};

console.log('It works unNormal numbrs like (205.425, 5043.05 ...)');
if(moneyProblem(2000.5) === '20.01') {
    console.log('Passed');
} else {
    console.log('Failed');
};