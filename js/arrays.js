const arr = [1,2,3,6,8];

arr.pop(); //удаляем последний элемент массива
arr.push(9);  //добавляем в конец массива элемент 

console.log(arr);

arr.shift();  //тоже самое, что pop и push только в начало массива
arr.unshift();

arr.split()  //строка в массив
const str = prompt("", "");
const products = str.split(", ");
console.log(products);


arr.join() //массив в строку
const str1 = prompt("", "");
const products1 = str.split(", ");
console.log(products1.join('; '));

// delete.arr[0]; //удаление элементов массива

arr.splice(index, count, elem1);  //удалить count элементов, начиная с index, и заменить на elem1
arr.slice(begin,end); // копирует часть массива с begin до end

arr.sort(fn); //сортировка массива, сортирует элементы массива как строки 
const str2 = prompt("", "");
const products2 = str.split(", ");
products2.sort();
console.log(products1.join('; '));

const compareNum = (a, b) => {  //функция для сортировки массива как чисел
  return a - b;
};
arr.sort(compareNum);

arr.reverse(); //обратный порядок элементов массива

arr.concat(item1); // создание нового массива с копированием старого


for (let i=0; i<arr.length; i++) {   //перебираем массив
    console.log(arr[i]);
}

for (let k of arr) {
    console.log(k);
}

arr.forEach((item, i, arr) => {    //метод для перебора массива (другие методы такие как map, every,some, filter, reduce для транформации массива )
  console.log(`${i}: ${item} внутри массива ${arr}`);
});

// Копируем массив (создаем новый ,не по ссылке)
const array = [1,3,5];
const newArray = array.slice();
newArray[0] = 9;

console.log(array);
console.log(newArray);

const numbers = [2,5,7];
const copyArray = (mainArray) => {
  let arrayCopy = [];
   for (let i=0; i < mainArray.length; i++) {
    arrayCopy[i] = mainArray[i];
  }
  return arrayCopy;
};

const newNumbers = copyArray(numbers);
newNumbers[0] = 11;

console.log(newNumbers);
console.log(numbers);

const moreNumbers = [2,5,7];
const moreCopyArray = (mainArray) => {
  let arrayCopy = [];
  mainArray.forEach((item) => {
    arrayCopy.push(item);
  }); 
  return arrayCopy;
};

const moreNewNumbers = moreCopyArray(moreNumbers);
moreNewNumbers[0] = 14;

console.log(moreNewNumbers);
console.log(moreNumbers);




