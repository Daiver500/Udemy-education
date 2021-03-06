"use strict"
// AJAX нужен для отправки http запросов и получения информации с сервера. Асинхронное действие без перезагрузки страницы
// AJAX запросы по умолчанию асинхронные 

// Старая информация 

const inputRub = document.querySelector("#rub");
const inputUsd = document.querySelector("#usd");

const serverRequest = () => {
  const request = new XMLHttpRequest();  // новый запрос http
  request.open("GET", "js/current.json");  
  // request.open(method, url, async, login, password);
  // open собирает настройки для запроса, method - что мы делаем (GET - получаем, POST - отправляем и т.д.)
  // далее url это путь к информации (может быть ссылка, файл и т.д.)
  // далее async отвечает за асинхронность операции (можно поставить false)
  // некоторые запросы можно делать только если у нас есть логин и пароль
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  // при отправке запрос нужно сказать серверу, что мы отправляем, что за информация
  // как она закодирована, чтобы сервер понимал, что он принимает в себя
  // http заголовки
  request.send();
  const checkStateReadiness = () => {
   if (request.status === 200) { // смотри значения кодов в википедии
     console.log(request.response)
     const data = JSON.parse(request.response) // получаем объект JS, который мы можем использовать
     inputUsd.value = (inputRub.value / data.current.usd).toFixed(2); // округляем до двух чисел после запятой
   } else {
     inputUsd.value = "Не так что-то"; 
   }
  }
  request.addEventListener("load", checkStateReadiness)
  // отправляем информацию, в зависимости от метода GET или POST заполняется по разному 
  // status ответ от сервера в виде кода (200, 404 и т.д.)
  // statusText текст который приписывается к коду ответа
  // response ответ от сервера в виде кода от backend
  // readyState текущее состояние нашего запроса
  // readystatechange отслеживает статус готовности нашего запроса в текущий момент времени
  // load срабатывает когда наш запрос полностью загрузился и мы получили какой-то результат
  // ответ от сервера
}

inputRub.addEventListener("input", serverRequest)

// запросы GET и POST работают только на сервере!!! 