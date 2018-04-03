$(function() {
let contactsForm = $('.c-contacts-form');
let contactsList = $('.c-contacts-list');
let persons = [{'name': 'Андрей', 'lastname': 'Андреевич'}, {'name': 'Борис', 'lastname': 'Борисович'}, {'name': 'Виктор', 'lastname': 'Викторович'}];
let formName = $('.c-contacts-form__name');
let formLastname = $('.c-contacts-form__lastname');
let formTel = $('.c-contacts-form__tel');
function makeMask () {
	formTel.mask('+7(999) 999-9999');
}
makeMask();

let userStore = [];
getInitial();

function onDeleteButtonClick () {
		const contact = $(this).closest('.c-contact');
		const id = +$(contact).attr('data-id');
		const element = userStore.findIndex((el)=> {
			return el.id === id;
		});

		userStore.splice(element, 1);
		saveToLocal();
		contact.addClass('c-contact--slide-right');
		setTimeout(function () {
			contact.remove();
		}, 500)
};

function User (data) {
	const self = this;
	this.name = data.name;
	this.lastname = data.lastname;

	this.getFullName = function() {
		console.log(self.name + ' ' + self.lastname)
		return self.name + self.lastname;
	}
};

function makeList (newId) {
	const node = contactsList;
	let nodes = userStore.map((el) => {
		let addClass = newId === el.id ? 'c-contact--slide-default' : '';
		return `<li class="c-contact ${addClass}" data-id="${el.id}"><div class="c-contact__lastname">Фамилия: ${el.lastname}</div>
		<div class="c-contact__name">Имя: ${el.name}</div>
		<div class="c-contacts__address">Улица: ${el.address}</div>
		<div class="c-contact__tel">Тел: ${el.tel}</div>
		<button class="c-contact__delete-btn">DELETE</button></li>`
	});
	node.html(nodes);
};

// Проверяет localStorage на наличие списка контактов
function getInitial () {
	const data = localStorage.getItem('users');
	if(!data) return;
	userStore = JSON.parse(data);
};
// Сохраняет объект контактов в localStorage
function saveToLocal () {
	localStorage.setItem('users', JSON.stringify(userStore));
} ;
// Сортирует контакты по фамилии
function sortContacts () {
  userStore.sort(function (a, b) {
    if (a.lastname < b.lastname) {
      return -1;
    }
    if (a.lastname > b.lastname) {
      return 1;
    }
    return 0;
  });
};

function handleSubmit(evt) {
	evt.preventDefault();
	let formValue = $('.c-contacts-form__tel').val();
	let match = userStore.find(el=> el.tel === formValue);

	if(match) {
		formTel.addClass('c-contacts-form__tel--invalid');
		return;
	} else {
		formTel.removeClass('c-contacts-form__tel--invalid');
	};
	const result = $(this).serializeArray();
	const obj = {};
	result.forEach((el) => {
		obj[el.name] = el.value;
	});
	obj.id = Date.now();
	window.map.getCoords(obj.address);
	userStore.push(obj);
	sortContacts();
	saveToLocal();
	makeList(obj.id);
};

makeList();

contactsForm.on('submit', handleSubmit);
$(document).on('click', '.c-contact__delete-btn', onDeleteButtonClick);
});