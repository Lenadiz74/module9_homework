/*
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст
«Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст
«Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит
 вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10,
где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного
запроса (использовать localStorage).
 */


(function () {
    const root = document.createElement('div');
    const wrapper = document.createElement('div');
    const inputEl1 = document.createElement('input');
    const labelEl1 = document.createElement('label');
    const inputEl2 = document.createElement('input');
    const labelEl2 = document.createElement('label');
    const submitButton = document.createElement('button');
    const resultEl = document.createElement('div');
    const messageEl = document.createElement('p');

    root.setAttribute('id', 'root');

    wrapper.setAttribute('style', 'display: flex; flex-direction: column; align-items: center; margin: 20px auto; height: 200px; width: 500px;');

    inputEl1.placeholder = 'введите число от 1 до 10 ';
    inputEl1.setAttribute('style', 'margin: 15px');
    inputEl1.setAttribute('id', 'first');

    labelEl1.innerHTML = '«номер страницы»';
    labelEl1.setAttribute('for', '#first');

    inputEl2.placeholder = 'введите число от 1 до 10';
    inputEl2.setAttribute('style', 'margin: 15px');
    inputEl2.setAttribute('id', 'second');

    labelEl2.innerHTML = '«лимит»'
    labelEl2.setAttribute('for', '#second');

    submitButton.innerText = 'запрос';
    submitButton.setAttribute('style', 'width: 65px');
    submitButton.onclick = showImg;

    resultEl.setAttribute('id', 'gallery');
    resultEl.setAttribute('style', 'display: flex; flex-wrap: wrap; justify-content: center;margin: 50px auto;');

    wrapper.appendChild(labelEl1);
    wrapper.appendChild(inputEl1);
    wrapper.appendChild(labelEl2);
    wrapper.appendChild(inputEl2);
    wrapper.appendChild(submitButton);
    wrapper.appendChild(messageEl);

    document.querySelector('body').appendChild(root);
    document.querySelector('#root').appendChild(wrapper);
    document.querySelector('body').appendChild(resultEl);

})();

function renderImages () {
    let gallery = '';
    let height = 0;
    let width = 0;
    let data = localStorage.array;
    data = JSON.parse(data);
    console.log(data);


    data.forEach(element => {
        if (element.width > 4000){
            height = element.height / 20
            width = element.width / 20;
        }else {
            height = element.height / 14;
            width = element.width / 14;
        }
        gallery += `
                    <div class="gallery__item" style="display: flex; flex-direction: column; margin: 10px; align-items: center; width: 10%" >
                        <img src="${element.download_url}" style="margin: 0; height: auto; width: 100%" alt="" height="${height}" width="${width}">
                        <span style="margin-top: 10px">${element.author}</span>
                    </div>
                    `
    })
    const galleryROOT = document.querySelector('#gallery');
    galleryROOT.innerHTML = gallery;
}

function sendRequest(url){
    return fetch(url).then((response)=>{return response});
}

function showImg() {
    let string = [];
    const firstInputValue = Number(document.querySelector('#first').value);
    const secondInputVale = Number(document.querySelector('#second').value);
    const messageEl = document.querySelector('#root p');

    if ((firstInputValue < 1 || firstInputValue > 10) && (secondInputVale < 1 || secondInputVale > 10)) {
        messageEl.innerHTML = '«Номер страницы и лимит вне диапазона от 1 до 10»'
    } else if (firstInputValue < 1 || firstInputValue > 10) {
        messageEl.innerHTML = '«Номер страницы вне диапазона от 1 до 10»';
    } else if (secondInputVale < 1 || secondInputVale > 10) {
        messageEl.innerHTML = '«Лимит вне диапазона от 1 до 10»';
    } else {
        messageEl.innerHTML = '';
        const url = `https://picsum.photos/v2/list?page=${firstInputValue}&limit=${secondInputVale}`;
        const promise = sendRequest(url);
        promise.then((response) => {
            return response.json();
        }).then((response)=>{
            string = JSON.stringify(response);
            localStorage.array = string;
        }).then(()=>{
            renderImages();
        }).catch(() => {
            console.log('error');
        });
    }
}

window.onload= renderImages;
