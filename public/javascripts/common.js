"use strict";$(function(){function t(){console.log(this);var t=$(this).closest(".c-contact"),n=+$(t).attr("data-id"),c=s.findIndex(function(t,c){return t.id===n});s.splice(c,1),a(),t.remove()}function n(){var t=i,n=s.map(function(t){return'<li class="c-contact" data-id="'+t.id+'"><div class="c-contact__lastname">Фамилия: '+t.lastname+'</div>\n\t\t<div class="c-contact__name">Имя: '+t.name+'</div>\n\t\t<div class="c-contact__name">Тел. '+t.tel+'</div>\n\t\t<button class="c-contact__delete-btn">Delete</button></li>'});t.html(n)}function c(){var t=localStorage.getItem("users");t&&(s=JSON.parse(t))}function a(){localStorage.setItem("users",JSON.stringify(s))}function e(t){t.preventDefault();var c=$(this).serializeArray(),e={};c.forEach(function(t){e[t.name]=t.value}),e.id=Date.now(),s.push(e),a(),n()}var o=$(".c-contacts-form"),i=$(".c-contacts-list"),s=[];c(),o.on("submit",e),console.log(s),s.length&&n(),$(document).on("click",".c-contact__delete-btn",t)});
//# sourceMappingURL=../javascripts/common.js.map
