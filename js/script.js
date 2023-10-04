"use strict"

/*||| CHECKING DEVICE TYPE |||/ */

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

/* IF MOBILE SHOW ARROW IN THE MENU */

if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu-arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

} else {
	document.body.classList.add('_pc');
}

/*||| BURGER MENU |||*/

const iconMenu = document.querySelector('.menu-icon');
const menuBody = document.querySelector('.menu-body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


/*||| ACTIVE LINKS |||*/

document.addEventListener('DOMContentLoaded', () => {
    // Get current page url
    let currentUrl = window.location.href;

    // Get links fom upper menu
    let menuLinks = document.querySelectorAll('.upper-menu a');

    // Add class active to current page's link
    menuLinks.forEach((link) => {
        if (link.href === currentUrl || currentUrl.includes(link.dataset.category)) {
            link.classList.add('active');
        }
    });

    // If we have current category we highlight the link
    let currentCategory = document.querySelector('.article-link').dataset.category;
    if (currentCategory) {
        let activeMenuLink = document.querySelector(`.menu-link[data-category="${currentCategory}"]`);
        if (activeMenuLink) {
            activeMenuLink.classList.add('active');
        }
    }
});


/*||| MODAL WINDOWS FOR IMAGES ||| */


let modal = document.getElementById("myModal");
let modalImage = document.getElementById("modalImage");
let images = document.querySelectorAll(".image-full");

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    modalImage.src = this.src;
  });
}

let span = document.querySelector('.close');
if (span) {
    span.addEventListener("click", function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});


