function followCursor(event) {
	var pointer = event.currentTarget.closest(".swiper-slide").querySelector('.pointer'),
		index = event.currentTarget.dataset.index,
		sizeIcon = (80 * index) - 50 ;
	pointer.style.transform = `translateX(${sizeIcon}px)`;
}

var icon = document.querySelectorAll('.icon-social');

icon.forEach(function (el) {
	el.addEventListener("mouseenter", followCursor);
});

var btnShow = document.querySelectorAll('.more');

btnShow.forEach(function (el) {
	el.addEventListener('click', showMore);
});

function showMore(event) {
	console.log("poos")
	var card = event.target.closest(".swiper-slide");

	if (card.classList.contains('show-more')) {
		card.classList.remove('show-more');
	} else {
		card.classList.add('show-more')
	}

}