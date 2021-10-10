/*
Задание 3.
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число.
При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10,
где get-параметр limit — это введённое число.
Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.

Подсказка: получение данных из input.

const value = document.querySelector('input').value;
При возникновении проблем по ходу решения вы всегда можете обратиться к ментору в Slack.

Удачи!
 */


(function render() {
    const root = document.querySelector('body');
    const input = document.createElement('input');
    input.classList.add('limit');
    input.placeholder = 'Введите любое число от 1 до 10';
    input.setAttribute('style', 'box-sizing: border-box; margin: 20px; width: 200px');
    root.appendChild(input);
    const button = document.createElement('button');
    button.addEventListener('click',sendRequest);
    button.textContent = 'Отправить запрос';
    root.appendChild(button)
    const span =document.createElement('span');
    span.classList.add('message')
    span.setAttribute('style', 'display: block; margin-left: 20px');
    root.appendChild(span);
    const gallery = document.createElement('div');
    gallery.classList.add('gallery');
    gallery.setAttribute('style', 'display: flex; flex-wrap: wrap; justify-content: center; margin-top: 20px; width: 610px');
    root.appendChild(gallery);
})()

const limit = function () {

    return document.querySelector('.limit').value
}

function request(url,numberOfImages) {
    let xhr =new XMLHttpRequest();
    let urlToSend = `${url}/?limit=${numberOfImages}`;
    let result;


    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            result = JSON.parse(xhr.response);
            renderGallery(result);
        } else {

        }
    }

    xhr.open('get',urlToSend,true);

    xhr.onerror = function () {
        console.log(`Error: ${xhr.response}`);
    }

    xhr.send();

}

function renderGallery(data){
    console.log(data);
    let gallery = '';
    let height = 0;
    let width = 0;
    data.forEach(element => {
        if (element.width > 4000){
            height = element.height / 20
            width = element.width / 20;
        }else {
            height = element.height / 14;
            width = element.width / 14;
        }
        gallery += `
                    <div class="gallery__item" style="display: flex; flex-direction: column; margin: 10px; align-items: center;">
                        <img src="${element.download_url}" style="margin: 0" alt="" height="${height}" width="${width}">
                        <span>${element.author}</span>
                    </div>
                    `
    })
    let galleryROOT = document.querySelector('.gallery');
    galleryROOT.innerHTML = gallery;
}

function sendRequest () {
    const requestURL = 'https://picsum.photos/v2/list';
    let numberOfImages = limit();
    const messageField= document.querySelector('.message');
    if (numberOfImages > 10|| numberOfImages < 1) {
        messageField.textContent = '«число вне диапазона от 1 до 10»';
        return 0;
    } else {
        messageField.textContent = '';
    }
    request(requestURL,numberOfImages);
}

