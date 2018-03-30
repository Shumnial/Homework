$(function() {
let contactsForm = $('.c-contacts-form');
let contactsList = $('.c-contacts-list');
let persons = [{'name': 'Андрей', 'lastname': 'Андреевич'}, {'name': 'Борис', 'lastname': 'Борисович'}, {'name': 'Виктор', 'lastname': 'Викторович'}];

let userStore = [];
getInitial();

function onDeleteButtonClick () {
		console.log(this);
		const contact = $(this).closest('.c-contact');
		const id = +$(contact).attr('data-id');
		const element = userStore.findIndex((el, idx)=> {
			return el.id === id;
		});

		userStore.splice(element, 1);
		saveToLocal();
		contact.remove();
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
	
function makeList () {
	const node = contactsList;

	let nodes = userStore.map((el) => {
		return `<li class="c-contact" data-id="${el.id}"><div class="c-contact__lastname">Фамилия: ${el.lastname}</div>
		<div class="c-contact__name">Имя: ${el.name}</div>
		<div class="c-contact__name">Тел. ${el.tel}</div>
		<button class="c-contact__delete-btn">Delete</button></li>`
	});

	node.html(nodes);
};

function getInitial () {
	const data = localStorage.getItem('users');
	if(!data) return;
	userStore = JSON.parse(data);
};
	
function saveToLocal () {
	localStorage.setItem('users', JSON.stringify(userStore));
} 

function handleSubmit(evt) {
	evt.preventDefault();
	const result = $(this).serializeArray();
	const obj = {};

	result.forEach((el) => {
		obj[el.name] = el.value;
	});
	obj.id = Date.now();
	userStore.push(obj);
	saveToLocal()
	makeList()
};

contactsForm.on('submit', handleSubmit)
console.log(userStore);

if(userStore.length) {
	makeList();
}
$(document).on('click', '.c-contact__delete-btn', onDeleteButtonClick);
});