// TABS

window.addEventListener("DOMContentLoaded", () => {
  const tabsHeader = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsHeaderParent = document.querySelector(".tabheader__items");

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add("hidden");
      item.classList.remove("show", "fade");
    });
    tabsHeader.forEach((item) => {
      item.classList.remove("tabheader__item--active");
    });
  };

  const showTabContent = (i = 0) => {       // i в данном случае это первый элемент массива
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hidden");
    tabsHeader[i].classList.add("tabheader__item--active");
  };

  hideTabContent();
  showTabContent();

  tabsHeaderParent.addEventListener("click", (evt) => {
    const target = evt.target;
    if (target && target.classList.contains("tabheader__item")) {
        tabsHeader.forEach((item, i) => {      // i это номер элемента, который совпал
        if (target === item) {
            hideTabContent();
            showTabContent(i);       
        }
      });
    }
   });

// TIMER

   const deadline = '2021-07-31';   // конечная дата

const getRemainingTime = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()); // конечная дата минус текущая дата
    const days = Math.floor( (t/(1000*60*60*24)) );  
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60) % 24) );

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

const getZero = (num) => {  // проверяем число и добавляем 0, если меньше 10
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
      return num;
  }
};

const setClock = (selector, endtime) => {    // сюда передаем два аргумента,в том числе конучную дату

    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");  // выбираем по id раздел
    const  hours = timer.querySelector('#hours'); // выбираем по id раздел
    const  minutes = timer.querySelector('#minutes'); // выбираем по id раздел
    const  seconds = timer.querySelector('#seconds'); // выбираем по id раздел
    timeInterval = setInterval(updateClock, 1000);  // функция обновления значения каждую секунду
    updateClock();
    function updateClock()  {
        const t = getRemainingTime(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
     }
 };

setClock('.timer', deadline);

// MODAL

const openModalButtons = document.querySelectorAll(".btn_open_modal");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal__close");

const modalEscPressHandler = (evt) => {
  if (evt.key === "Escape") {
    hideModalWindow();
    evt.preventDefault();
  }
};

const windowClickHandler = (evt) => {
  if (evt.target === modal) {
    hideModalWindow();
  }
};

const openModalWindow = () => {
  modal.classList.add("show");
  document.addEventListener("keydown", modalEscPressHandler);
  modal.addEventListener("click", windowClickHandler);
  modalCloseButton.addEventListener("click", hideModalWindow);
  document.body.style.overflow = "hidden";
  clearInterval(modalTimerId);  // если модальное окно уже было открыто, то обнуляем setTimeout 
};

const hideModalWindow = () => {
  modal.classList.remove("show");
  document.removeEventListener("keydown", modalEscPressHandler);
  modal.removeEventListener("click", windowClickHandler);
  modalCloseButton.removeEventListener("click", hideModalWindow);
  document.body.style.overflow = "visible";
};

openModalButtons.forEach((item) => {
  item.addEventListener("click", openModalWindow);
});

const modalTimerId = setTimeout(openModalWindow, 50000); // запускаем модалку через 5 секунд

const showModalByScroll = () => {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){   // пользователь докрутил до конца страницы (сравниваем видимый контент на странице + сколько уже прокручено со всей высотой скролла)
    openModalWindow(); 
    window.removeEventListener("scroll", showModalByScroll);
   }
};
// {once: true} это заставляет обработчик сработать один раз, но в данном случае не подходит
// сдвинуть колд вправо tab
// сдвинуть код влево shift+tab
window.addEventListener("scroll", showModalByScroll); 

// CLASSES FOR CARDS AND CARD CREATION (WITHOUT CLASSES LOOK FOR THE SERVER PART BELOW) 

class MenuCard {
  constructor (img, alt, title, text, price, parentSelector, ...classes) {
    this.img = img;
    this.alt = alt;
    this.title = title;
    this.text = text;
    this.price = price;
    this.classes = classes;
    this.parent = document.querySelector(parentSelector);
    this.currency = 75;
    this.changeToRub();
  }

  changeToRub() {
    this.price = this.price * this.currency;
  }

  render() {
    const newElement = document.createElement("div");
    if(this.classes.length === 0) {
      this.newElement = "menu__item";  // задаем дефолтный класс, если никаких классов в rest операторе нет
      newElement.classList.add(this.newElement);
    } else {
      this.classes.forEach((item) => {
        newElement.classList.add(item);
      });
    }
     newElement.innerHTML = 
    `<img src=${this.img} alt=${this.alt}>
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.text}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    </div>`;
  this.parent.append(newElement);
  }
}

// SERVER GET/POST FETCH API JSON

const getData = async (url) => {          // внутри функции будет асинхронный код, async и await всегда используются в паре, в данной строке получаем информацию
  const result = await fetch(url);

  if (!result.ok)           {             // проверяем прошел ли запрос
     throw new Error (`Could not fetch ${url}, status: ${result.status}`);                  // выкидываем ошибку
  }              
  return await result.json ()
}

getData("http://localhost:3000/menu")                            // запрос к серверу
  .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {       // деструктуризация объекта 
      new MenuCard(img, altimg, title, descr, price, ".menu .container").render()   // создание карточек на основе шаблона в классах (один из вариантов создания карточек)
    });
  });

/*axios.get("http://localhost:3000/menu")                        // AXIOS служит для обращения к серверу (GEt\POST) без создания дополнительных функций
.then(data => {
  data.data.forEach(({img, altimg, title, descr, price}) => {       
    new MenuCard(img, altimg, title, descr, price, ".menu .container").render()   
  });
});*/

/*getData("http://localhost:3000/menu")                       // СОЗДАНИЕ КАРТОЧЕК БЕЗ ШАБЛОНИЗАЦИИ ПО КЛАССАМ
.then(data => createCard(data));

const createCard = (data) => {
   data.forEach(({img, altimg, title, descr, price}) => {
      const element = document.createElement("div");
      element.classList.add("menu__item");
      element.innerHTML = `
      <img src=${img} alt=${altimg}>
    <h3 class="menu__item-subtitle">${title}</h3>
    <div class="menu__item-descr">${descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${price}</span> руб/день</div>
    </div>
      `
      document.querySelector(".menu .container").append(element);
   })
}*/

  const forms = document.querySelectorAll("form");
  const  message = {                         // создаем объект с текстовыми сообщениями
    loading: "img/spinner.svg",
    success: "Спасибо и до свидания",
    error: "Ошибка"
  }
                     
  const postData = async (url, data) => {          // внутри функции будет асинхронный код, async и await всегда используются в паре
    const result = await fetch(url, {              // здесь дожидаеся ответа await 
      method: "POST",                          // отправляем информацию
        headers: {
          "Content-type": "application/json "       //заголовки нужны для отправки JSON
        },
        body: data                                  // фукнцию postData можно испольоваться как универсальную с различными аргументами
    });

    return await result.json()
  }

  const bindPostData = (form) => {
    const formSendingHandler = (evt) => {
      evt.preventDefault();
     
      const statusMessage = document.createElement("img");    // создаем новый элемент с текстовым сообщением и добавляем его на страницу
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `  
        margin: 0 auto;
        display: block;         
      `;                                                                   // CSS стили пропишем inline
      form.insertAdjacentElement("afterEnd", statusMessage);              // вставляем элемент после формы
      
      const formData = new FormData(form);   // собираем данные из формы, которые будем отправлять, как аргумент передается форма с которой собираем данные
                                             // !!! в html всегда обязательно указывать артрибут name="name" для интерактивных полей (input, textarea и т.д.) иначе FormData не найдет его !!!

      /*const object = {};                        
        formData.forEach(function(value, key) {  // ДЛЯ JSON  перебираем formData и формируем новый объект, так как JSON не примет formData другим образом
          object[key] = value;
      })*/                                        // заменили на способ ниже

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // превращаем formData в массив массивов, затем в классический объект и затем в json

      //  Object.entries(obj) преобразует объект в массив массивов [key, value]
      //  Object.fromEntries(array); преобразует массив в объект

      /*fetch("server.php", {                     // обращаемся к серверу, вынесли это в отдельную функцию PostData
        method: "POST",                          // отправляем информацию
        headers: {
          "Content-type": "application/json "       //заголовки нужны для отправки JSON
        },
        body: json                             // сюда передаем json
      })*/
      postData("http://localhost:3000/requests", json)  // ДЛЯ JSON подготтавливаем данные для сервера
      .then(data => {                             // с сервера вернется какая-то информация
        console.log(data);
        showThanksModal(message.success);                                       
        statusMessage.remove();                      // удаляем сообщение через 2 секунды
      }).catch(() => {
        showThanksModal(message.error);                // если внутри fetch promise попадает на ошибку (404, 502 и т.д.), то reject не будет и promise выполниться, ошибка сработает только при отсутствии интернета
      }).finally(() => {
        form.reset();                              // очистка формы, также можно взять инпуты и сделать их value === "";
      })   
    }
    form.addEventListener("submit", formSendingHandler)
    form.addEventListener("submit", hideModalWindow)
  }

  forms.forEach((item) => {   // для каждой формы запускаем функцию postData и передаем в нее как аргумент форму
    bindPostData(item);
  });
 
  const showThanksModal = (message) => {                                    // сюда передаем как аргумент сообщение пользователю из объекта message
    const thanksModal = document.createElement("div");                      // создаем новую начинку модального окна для сообщения пользователю
    thanksModal.classList.add("modal__message");           
    thanksModal.innerHTML = `
    <div class="modal__dialog">
      <div class="modal__content">
        <div class="modal__close" data-close>×
        </div>
        <div class="modal__title">${message}</div>
      </div>
    <div>
    `; 
    document.querySelector(".page").append(thanksModal);            // добавляем в модальное окно новое наполнение
    setTimeout(() => {                                               // через определенное время удаляем сообщение пользователю и возвращаем обратно возможность вызвать и отправить форму
      thanksModal.remove();
    }, 4000)
    const modalMessage = document.querySelector(".modal__message");
    const modalClose = modalMessage.querySelector(".modal__close");
    const closeThanksModal = () => {
      thanksModal.remove();
    }
    modalClose.addEventListener("click", closeThanksModal);
  }      

  fetch("db.json")
    .then(data => data.json())
    .then(result => console.log(result))

  // SLIDER

  const slides = document.querySelectorAll(".offer__slide");
  const previousSlideButton = document.querySelector(".offer__slider-prev");
  const nextSlideButton = document.querySelector(".offer__slider-next");
  const total = document.querySelector("#total");
  const current = document.querySelector("#current");
  let currentSlide = 1;

  const showCurrentSlide = () => {                // устанавливаем значение текущего слайда и вызываем эту функцию в showSlide
    if (slides.length < 10) {
      current.textContent = `0${currentSlide}`;
    } else {
      current.textContent = currentSlide;
    }
  }

  const showSlidesQuantity = () => {                       // устанавливаем значение общего количества слайдов
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
    } else {
      total.textContent = slides.length;
    }
  }

  const showSlides = (numberOfSlide) => {            // функция принимает n куда будет приходит номер текущего слайда
    if (numberOfSlide > slides.length) {
      currentSlide = 1;                      // если n больше количества слайдов, то идет возврат на первый слайд
    }
    if (numberOfSlide < 1) {
      currentSlide = slides.length;          // если n меньше количества слайдов, то идет возврат на последний слайд
    }

    slides.forEach((item) => {               // скрываем все слайды
      item.style.display = "none"
    })

    slides[currentSlide - 1].style.display = "block"     // показываем только первый, так как массив начинается с 0, то указываем - 1;
    showCurrentSlide()
  }

  showSlides(currentSlide);
  showSlidesQuantity();

  const changeSlides = (numberOfSlide) => {
    showSlides(currentSlide = currentSlide + numberOfSlide);
  }

  previousSlideButton.addEventListener("click", () => {
    changeSlides(-1);
  })

  nextSlideButton.addEventListener("click", () => {
    changeSlides(+1);
  })

 });