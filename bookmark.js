<script type="text/javascript">
//<![CDATA[
/*
* Gyanitheme Bookmark
* Copyright (c) 2022 https://www.adatun.xyz
* No Licensed & Open source Code
* jQuery library
*/
// variable empty konten
var massgEmpty = ('Daftar Artikel Favorit Belum Ada'),
articleLabel = ('Semua konten'),
link_articleLabel = ('https://www.adatun.xyz/');
(function ($) {
"use strict";
var OptionManager = (function () {
var objToReturn = {};
var defaultOptions = {
bookmarkIcon: 'bookmarkIcon',
bookmarkBadge: 'show-bookmark',
articleQuantity: 'article-quantity',
affixBookmarkIcon: true,
showBookmarkModal: true,
clickOnAddToBookmark: function($addTobookmark) { },
clickOnbookmarkIcon: function($bookmarkIcon, konten ) { },
};
var getOptions = function (customOptions) {
var options = $.extend({}, defaultOptions);
if (typeof customOptions === 'object') {
$.extend(options, customOptions);
}
return options;
}
objToReturn.getOptions = getOptions;
return objToReturn;
}());
var articleManager = (function(){
var objToReturn = {};
localStorage.konten = localStorage.konten ? localStorage.konten : "";
var getIndexOfarticle = function(id){
var articleIndex = -1;
var konten = getAllkonten();
$.each(konten, function(index, value){
if(value.id == id){
articleIndex = index;
return;
}
});
return articleIndex;
}
var setAllkonten = function(konten){
localStorage.konten = JSON.stringify(konten);
}
var addarticle = function(id, title, link, summary, quantity, borkimage) {
var konten = getAllkonten();
konten.push({
id: id,
title: title,
link: link,
summary: summary,
quantity: quantity,
borkimage: borkimage
});
setAllkonten(konten);
}
var getAllkonten = function(){
try {
var konten = JSON.parse(localStorage.konten);
return konten;
} catch (e) {
return [];
}
}
var updatePoduct = function(id, quantity) {
var articleIndex = getIndexOfarticle(id);
if(articleIndex < 0){
return false;
}
var konten = getAllkonten();
konten[articleIndex].quantity = typeof quantity === "undefined" ? konten[articleIndex].quantity : quantity;
setAllkonten(konten);
return true;
}
var setarticle = function(id, title, link, summary, quantity, borkimage) {
if(typeof id === "undefined"){
console.error("id required")
return false;
}
if(typeof title === "undefined"){
console.error("title required")
return false;
}
if(typeof link === "undefined"){
console.error("link required")
return false;
}
if(typeof borkimage === "undefined"){
console.error("borkimage required")
return false;
}
summary = typeof summary === "undefined" ? "" : summary;
if(!updatePoduct(id)){
addarticle(id, title, link, summary, quantity, borkimage);
}
}
var cleararticle = function(){
setAllkonten([]);
}
var removearticle = function(id){
var konten = getAllkonten();
konten = $.grep(konten, function(value, index) {
return value.id != id;
});
setAllkonten(konten);
}
var getTotalQuantity = function(){
var total = 0;
var konten = getAllkonten();
$.each(konten, function(index, value){
total += value.quantity;
});
return total;
}
objToReturn.getAllkonten = getAllkonten;
objToReturn.updatePoduct = updatePoduct;
objToReturn.setarticle = setarticle;
objToReturn.cleararticle = cleararticle;
objToReturn.removearticle = removearticle;
objToReturn.getTotalQuantity = getTotalQuantity;
return objToReturn;
}());
var loadBookmarkEvent = function(userOptions){
var options = OptionManager.getOptions(userOptions);
var $bookmarkIcon = $("." + options.bookmarkIcon);
var $bookmarkBadge = $("." + options.bookmarkBadge);
var articleQuantity = options.articleQuantity;
var idBookmarkModal = 'cart-modal';
var idbookmarkTable = 'cart-table';
var idEmptyBookmarkMessage = 'cart-empty-message';
var AffixMybookmarkIcon = 'bookmarkIcon-affix';
$bookmarkBadge.text(articleManager.getTotalQuantity());
if(!$("#" + idBookmarkModal).length) {
$('body').append(
'<div class="bookmark-area" id="' + idBookmarkModal + '">' +
'<div class="bookmark-main">' +
'<div class="bookmark-popup-sec"><h2>Bookmark Posts</h2><a class="bookmark-close-btn stm-open-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(12.000000, 12.000000) rotate(-180.000000) translate(-12.000000, -12.000000) translate(5.000000, 8.500000)"><path d="M14,0 C14,0 9.856,7 7,7 C4.145,7 0,0 0,0"></path></g></svg></a></div>' +
'<div class="bookmark-body">' +
'<span class="table-responsive" id="' + idbookmarkTable + '"></span>' +
'</div>' +
'</div>' +
'</div>'
);
}
var drawTable = function(){
var $bookmarkTable = $("#" + idbookmarkTable);
$bookmarkTable.empty();
var konten = articleManager.getAllkonten();
$.each(konten, function(){
$bookmarkTable.append(
'<table class="bookmark-table">' +
'<tbody>' +
'<tr title="' + this.summary + '" data-id="' + this.id + '">' +
'<td class="bookmark-image-cont"><img src="' + this.borkimage + '"/></td>' +
'<td class="bookmark-title"><a href="' + this.link + '" class="btn-remove">' + this.title + '</a></td>' +
'<td class="bookmark-item-remove" title="Remove favorit" class="text-center" style="width: 30px;"><a id="remove-fav" class="bookmark-btn-remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(3.500000, 2.000000)"><path d="M15.3891429,7.55409524 C15.3891429,15.5731429 16.5434286,19.1979048 8.77961905,19.1979048 C1.01485714,19.1979048 2.19295238,15.5731429 2.19295238,7.55409524"></path><line x1="16.8651429" y1="4.47980952" x2="0.714666667" y2="4.47980952"></line><path d="M12.2148571,4.47980952 C12.2148571,4.47980952 12.7434286,0.714095238 8.78914286,0.714095238 C4.83580952,0.714095238 5.36438095,4.47980952 5.36438095,4.47980952"></path></g></svg></a></td>' +
'</tr>' +
'</tbody>' +
'</table>'
);
});
$bookmarkTable.append(konten.length ? '':
'<div role="alert" id="' + idEmptyBookmarkMessage + '"><div class="bookmark-empty-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M104.10836,259.25648a5.81417,5.81417,0,0,0-8.34755-1.41453.97717.97717,0,0,1-1.17546,0,5.81416,5.81416,0,0,0-8.34752,1.4145,6.84387,6.84387,0,0,0,.137,7.53223c1.93424,2.97966,5.59943,7.87617,8.79824,7.87617s6.864-4.89654,8.79823-7.87618A6.84388,6.84388,0,0,0,104.10836,259.25648Z" transform="translate(-83.17308 -253.66485)"></path></g></svg><p class="bookmark-empty-info">' + massgEmpty + '</p><div class="bookmark-empty-btn-cont"><a class="bookmark-empty-btn" href="' + link_articleLabel + '">' + articleLabel + '</a></div></div></div>'
);
}
var showModal = function(){
drawTable();
}
/*
EVENT ADD TO BOOKMARK LIST
*/
if(options.affixBookmarkIcon) {
var bookmarkIconBottom = $bookmarkIcon.offset().top * 1 + $bookmarkIcon.css("height").match(/\d+/) * 1;
$(window).scroll(function () {
$(window).scrollTop() >= bookmarkIconBottom ? $bookmarkIcon.addClass(AffixMybookmarkIcon) : $bookmarkIcon.removeClass(AffixMybookmarkIcon);
});
}
$bookmarkIcon.click(function(){
options.showBookmarkModal ? showModal() : options.clickOnbookmarkIcon($bookmarkIcon, articleManager.getAllkonten());
});
$(document).on('keypress', "." + articleQuantity, function(evt){
if(evt.keyCode == 38 || evt.keyCode == 40){
return ;
}
evt.preventDefault();
});
$(document).on({
click: function() {
var $tr = $(this).closest("tr");
var id = $tr.data("id");
$tr.hide(500, function(){
articleManager.removearticle(id);
drawTable();
$bookmarkBadge.text(articleManager.getTotalQuantity());
});
}}, '.bookmark-btn-remove');
}
$(document).on({
click: function() {
$('.bookmark-area').toggleClass('open');
return false;
}}, '.stm-open-close');
$(function () {
var goTohartomyBookmark = function($addTobookmarkBtn){
}
$('.stm-bookmark-btn').hartomyBookmark({
    'bookmarkIcon': 'stm-open-close',
    'affixBookmarkIcon': !0x0,
    'clickOnAddToBookmark': function (a) {
        goTohartomyBookmark(a)
    },
    'afterAddOnBookmark': function (a) {
        console.log('afterAddOnBookmark', a)
    },
    'clickOnAddToBookmark': function (a) {
        goTohartomyBookmark(a)
    }
})});
var MyBookmark = function (target, userOptions) {
/*
PRIVATE
*/
var $target = $(target);
var options = OptionManager.getOptions(userOptions);
var $bookmarkBadge = $("." + options.bookmarkBadge);
/*
EVENT TARGET ADD TO BOOKMARK
*/
$target.click(function(){
options.clickOnAddToBookmark($target);
var id = $target.data('id');
var title = $target.data('title');
var link = $target.data('link');
var summary = $target.data('summary');
var quantity = $target.data('quantity');
var borkimage = $target.data('borkimage');
articleManager.setarticle(id, title, link, summary, quantity, borkimage);
$bookmarkBadge.text(articleManager.getTotalQuantity());
});
}
$.fn.hartomyBookmark = function (userOptions) {
loadBookmarkEvent(userOptions);
return $.each(this, function () {
new MyBookmark(this, userOptions);
});
}
})(jQuery);
//]]>
</script>
