document.addEventListener("DOMContentLoaded", async () => {
	let mediaItem = document.querySelectorAll(".js-media-item");
	let mediaContainer = document.querySelectorAll(".js-media-container");

	let menu = document.querySelector(".js-menu");
	let menuOpen = document.querySelector(".js-menu-open");
	let menuClose = document.querySelector(".js-menu-close");
	let openSubmenu = document.querySelectorAll(".js-open-submenu");

	let formContact = document.querySelector(".js-form-contact");
	let formName = document.querySelector(".js-form-name");
	let formPhone = document.querySelector(".js-form-phone");
	let formEmail = document.querySelector(".js-form-email");
	let formBtn = document.querySelector(".js-form-btn");

	let langContainer = document.querySelectorAll(".js-lang-container");
	let langItem = document.querySelectorAll(".js-land-item");

	let mediaNav = document.querySelector(".js-media-nav");

	let scrollToForm = document.querySelectorAll(".js-scroll-to-form");

	let footerList = document.querySelectorAll(".js-footer-list");

	let width = document.documentElement.clientWidth;

	//scroll
	scrollToForm.forEach((item) =>
		item.addEventListener("click", () => {
			formContact.scrollIntoView({ block: "center", behavior: "smooth" });
		})
	);

	// menu
	menuOpen.addEventListener("click", () => {
		menu.classList.add("menu-active");
	});

	menuClose.addEventListener("click", () => {
		menu.classList.remove("menu-active");
	});

	openSubmenu.forEach((item) => {
		item.addEventListener("click", () => {
			item.children[1].classList.toggle("header-top-item-ul__arrow-active");
			item.parentNode.children[1].classList.toggle("menu-container-ul-submenu-active");
		});
	});

	window.addEventListener("resize", () => {
		width = document.documentElement.clientWidth;
		if (width >= 890) {
			menu.classList.remove("menu-active");
		}
	});

	// change language
	langContainer.forEach((item) => {
		item.addEventListener("click", () => {
			item.classList.toggle("header-top-item-lang-container-active");
			item.parentNode.children[1].classList.toggle("header-top-item-lang-hide-active");
		});
	});

	langItem.forEach((item) =>
		item.addEventListener("click", () => {
			let currentContainer = item.parentNode.parentNode.children[0];
			let currentFlag = item.children[0].dataset.id;
			let prevFlag = currentContainer.children[0].dataset.id;

			item.parentNode.parentNode.children[0].classList.remove("header-top-item-lang-container-active");
			item.parentNode.classList.remove("header-top-item-lang-hide-active");

			currentContainer.children[1].innerText = currentFlag;
			currentContainer.children[0].dataset.id = currentFlag;

			item.children[0].dataset.id = prevFlag;
			item.children[1].innerText = prevFlag;
		})
	);

	// media slides
	mediaItem.forEach((item, index) =>
		item.addEventListener("click", () => {
			mediaItem.forEach((item) => {
				item.classList.remove("page-media-nav__item-active");
			});
			item.classList.add("page-media-nav__item-active");

			mediaContainer.forEach((item) => {
				item.classList.add("page-media-container-action--hide");
			});
			mediaContainer[index].classList.remove("page-media-container-action--hide");
		})
	);

	if (width <= 500) {
		mediaNav.addEventListener("click", () => {
			mediaNav.classList.toggle("page-media-nav-active");
		});
	}

	// form logic
	formContact.addEventListener("submit", (e) => {
		e.preventDefault();
	});

	formBtn.addEventListener("click", async () => {
		checkAndChangeInput(formName, !formName.value);
		checkAndChangeInput(formPhone, !formPhone.value || !validatePhone(formPhone.value));
		checkAndChangeInput(formEmail, !formEmail.value || !validateEmail(formEmail.value));

		if (
			formName.value &&
			formPhone.value &&
			validatePhone(formPhone.value) &&
			formEmail.value &&
			validateEmail(formEmail.value)
		) {
			let response = await fetch(window.apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify({
					name: formName.value,
					phone: formPhone.value,
					email: formEmail.value,
				}),
			});
			if (response.ok) {
				formName.value = "";
				formPhone.value = "";
				formEmail.value = "";
			}
		}
	});

	//sliders
	let swiperTop = new Swiper(".js-swiper-top", {
		slidesPerView: 1.1,
		spaceBetween: 8,
		loop: true,
		navigation: {
			nextEl: ".js-swiper-top-button-next",
			prevEl: ".js-swiper-top-button-prev",
		},
		breakpoints: {
			550: {
				slidesPerView: 1.6,
			},
			690: {
				slidesPerView: 2.1,
			},
			820: {
				slidesPerView: 2.4,
			},
			950: {
				slidesPerView: 2.7,
			},
			1160: {
				slidesPerView: 3,
			},
		},
	});

	let swiperBottom = new Swiper(".js-swiper-bottom", {
		slidesPerView: 1.1,
		spaceBetween: 8,
		loop: true,
		navigation: {
			nextEl: ".js-swiper-bottom-button-next",
			prevEl: ".js-swiper-bottom-button-prev",
		},
		breakpoints: {
			550: {
				slidesPerView: 1.6,
			},
			690: {
				slidesPerView: 2.1,
			},
			900: {
				slidesPerView: 2.9,
			},
			1050: {
				slidesPerView: 3.3,
			},
			1230: {
				slidesPerView: 4,
			},
		},
	});

	let swiperServices = new Swiper(".js-swiper-services", {
		slidesPerView: 1.1,
		spaceBetween: 8,
		breakpoints: {
			550: {
				slidesPerView: 1.2,
			},
			640: {
				slidesPerView: 1.4,
			},
			740: {
				slidesPerView: 1.6,
			},
			830: {
				slidesPerView: 1.8,
			},
			930: {
				slidesPerView: 2,
			},
		},
	});

	for (let i = 1; i <= mediaContainer.length; i++) {
		new Swiper(`.js-swiper-media-${i}`, {
			slidesPerView: 1.1,
			spaceBetween: 9,
			breakpoints: {
				500: {
					slidesPerView: 1.4,
				},
				630: {
					slidesPerView: 1.8,
				},
				740: {
					slidesPerView: 2.1,
				},
				850: {
					slidesPerView: 2.4,
				},
				1000: {
					slidesPerView: 2.7,
				},
				1090: {
					slidesPerView: 3,
				},
			},
		});
	}

	let swiperAchievementsOne = new Swiper(".js-swiper-achievements-1", {
		slidesPerView: 1.2,
		spaceBetween: 16,
		breakpoints: {
			500: {
				slidesPerView: 2.6,
				spaceBetween: 70,
			},
			690: {
				slidesPerView: 3.7,
			},
			880: {
				slidesPerView: 4,
				spaceBetween: 104,
			},
		},
	});

	let swiperAchievementsTwo = new Swiper(".js-swiper-achievements-2", {
		slidesPerView: 1.2,
		spaceBetween: 16,
		breakpoints: {
			630: {
				slidesPerView: 2.1,
			},
			1000: {
				slidesPerView: 3.7,
				spaceBetween: 16,
			},
			1090: {
				slidesPerView: 4,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 104,
			},
		},
	});

	// open footer links
	footerList.forEach((item) =>
		item.addEventListener("click", () => {
			item.classList.toggle("footer-center-item--list-active");
		})
	);

	// functions
	function checkAndChangeInput(inputElement, condition) {
		if (condition) {
			changeInputError(inputElement);
		}
	}

	function validateEmail(email) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	function validatePhone(phone) {
		const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
		return re.test(String(phone).toLowerCase());
	}

	function changeInputError(input) {
		input.classList.add("page-contact-form__input--error");
		input.parentNode
			.querySelector(".page-contact-form-container__label")
			.classList.add("page-contact-form-container__label-active");

		setTimeout(() => {
			input.classList.remove("page-contact-form__input--error");
			input.parentNode
				.querySelector(".page-contact-form-container__label")
				.classList.remove("page-contact-form-container__label-active");
		}, 3000);
	}
});
