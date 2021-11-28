function indexOfArray(element, arr) {
       for (let i = 0; i < arr.length; i++) {
           if (JSON.stringify(element) == JSON.stringify(arr[i])) {
               return i;
           }
       }
       return -1;
}

function isInArray(a, b) {
       a = JSON.stringify(a);
       b = JSON.stringify(b);
       if (b.indexOf(a) == -1) {
           return false;
       } else {
           return true;
       }
}

export {isInArray, indexOfArray}