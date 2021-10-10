/*
Задание 1.

Вам дана заготовка и результат, который вы должны получить.
Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

    xml

<list>
<student>
<name lang="en">
    <first>Ivan</first>
<second>Ivanov</second>
</name>
<age>35</age>
<prof>teacher</prof>
</student>
<student>
    <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
</student>
</list>

result

{
    list: [
        { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
        { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
    ]
}
*/

const xmlData = `
                <list>
                  <student>
                    <name lang="en">
                      <first>Ivan</first>
                      <second>Ivanov</second>
                    </name>
                    <age>35</age>
                    <prof>teacher</prof>
                  </student>
                  <student>
                    <name lang="ru">
                      <first>Петр</first>
                      <second>Петров</second>
                    </name>
                    <age>58</age>
                    <prof>driver</prof>
                  </student>
                </list>
                `

function xmlParser(xmlString) {

    const parser = new DOMParser();
    const xmlDomEl =  parser.parseFromString(xmlString, 'text/xml');
    return  xmlDomEl.querySelectorAll('student');

}


function getObject(xmlDom) {

    let name = xmlDom.querySelector('name');
    let lang = name.getAttribute('lang');
    let firstName = name.querySelector('first').textContent;
    let secondName = name.querySelector('second').textContent;
    let age = xmlDom.querySelector('age').textContent;
    let prof = xmlDom.querySelector('prof').textContent;

    return {
        name: `${firstName} ${secondName}`,
        age: age,
        prof: prof,
        lang: lang,
    };
}

function arrayOfObjects(domEl,objCreator) {

    let array = []

    for (let i = 0; i < domEl.length; i++) {
        array.push(objCreator(domEl[i]));
    }
    return array;

}


function listOfXml(xmlString) {

    let students = xmlParser(xmlString);
    let list = {};
    list.list = arrayOfObjects(students,getObject);

    console.log(list);

}

listOfXml(xmlData);

