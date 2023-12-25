/*
    Here only one optimize solution is possible with 
    Time complexity: O(m log m + n log n)
    Space complexity: O(1) 

    Other approach like using hash map gives time complexity less i.e. O(m+n) but it fails for some corner cases like
    Input: arr1=[1,1] ,arr2=[1,1,1] it gives output [1,1,1] with hash map technique which is incorrect
    So hash map approach is not cover all corner cases

*/

function findCommonElements(arr1, arr2) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  var commonArray = [];
  var pointer1 = 0;
  var pointer2 = 0;

  while (pointer1 < arr1.length && pointer2 < arr2.length) {
    if (arr1[pointer1] === arr2[pointer2]) {
      commonArray.push(arr1[pointer1]);
      pointer1++;
      pointer2++;
    } else if (arr1[pointer1] < arr2[pointer2]) {
      pointer1++;
    } else {
      pointer2++;
    }
  }

  return commonArray;
}

// Here testing function with example:
var array1 = [9, 1, 2, 3, 8];
var array2 = [3, 4, 5, 6, 8, 9];
var resultArray = findCommonElements(array1, array2);
console.log("Common Elements among both arrays are: ", resultArray);

// Output is [3, 8, 9]
