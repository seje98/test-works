'use strict';

document.addEventListener('DOMContentLoaded', () => {

    let mapMarker = document.querySelectorAll('.js-map-marker');
    let paginationSlide = document.querySelectorAll('.js-pagination-slide');
    let swiperImg = document.querySelectorAll('.js-swiper-img');
    let popup = document.querySelector('.js-popup-photo');
    let popupClose = document.querySelector('.js-popup-photo-close');
    let popupImg = document.querySelector('.js-popup-photo-img');
    let wrapper = document.querySelector('.js-wrapper');

    let form = document.querySelector('.js-form');
    let formName = document.querySelector('.js-input-name');
    let formPhone = document.querySelector('.js-input-phone');
    let formEmail = document.querySelector('.js-input-email');
    let labelName = document.querySelector('.js-label-name');
    let labelPhone = document.querySelector('.js-label-phone');
    let labelEmail = document.querySelector('.js-label-email');
    let formBtn = document.querySelector('.js-form-btn');
    let input = document.querySelectorAll('.js-input');
    let checkbox = document.querySelector('.js-checkbox');

    let anchor = document.querySelector('.js-anchor');
    let btnToForm = document.querySelector('.js-btn-to-form');

    let menu = document.querySelector('.js-menu');
    let showMenu = document.querySelector('.js-show-menu');
    let menuBlock = document.querySelectorAll('.js-menu-block');
    let menuClose = document.querySelector('.js-menu-close');

    let arrIcon = [
        {
            classIcon: 'page-map-wrap-marker__icon--shop',
            label: 'Магазины',
            coordinates: [44.989938, 38.925527]
        },
        {
            classIcon: 'page-map-wrap-marker__icon--pin',
            label: 'ЖК “Яблоновский”',
            coordinates: [44.991043, 38.927432]
        },
        {
            classIcon: 'page-map-wrap-marker__icon--toys',
            label: 'Детский сад',
            coordinates: [44.989116, 38.930695]
        },
        {
            classIcon: 'page-map-wrap-marker__icon--gas',
            label: 'АЗС',
            coordinates: [44.989118, 38.925379]
        },
        {
            classIcon: 'page-map-wrap-marker__icon--hospital',
            label: 'Поликлинника',
            coordinates: [44.986356, 38.927092]
        }
    ];
    let arrDisabledIcon = [
        {
            classContainer: 'page-map-wrap-marker--swimming',
            classIcon: 'page-map-wrap-marker__icon--swimming',
            coordinates: [44.995012, 38.926473]
        },
        {
            classContainer: 'page-map-wrap-marker--bank',
            classIcon: 'page-map-wrap-marker__icon--bank',
            coordinates: [44.993012, 38.931006]
        },
        {
            classContainer: 'page-map-wrap-marker--shop-white',
            classIcon: 'page-map-wrap-marker__icon--shop-white',
            coordinates: [44.991636, 38.931494]
        },
        {
            classContainer: 'page-map-wrap-marker--bank-white',
            classIcon: 'page-map-wrap-marker__icon--bank-white',
            coordinates: [44.990106, 38.932958]
        },
        {
            classContainer: 'page-map-wrap-marker--coffee',
            classIcon: 'page-map-wrap-marker__icon--coffee',
            coordinates: [44.9887, 38.93282]
        }
    ];
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let width = document.documentElement.clientWidth;
    let map;
    let centerMap;
    let icon;

    // sliders

    let swiper = new Swiper(".js-swiper", {
        spaceBetween: 30,
        navigation: {
            nextEl: ".page-description-swiper-button-next",
            prevEl: ".page-description-swiper-button-prev",
        },
        on: {
            slideChange: () => {
                let paginationIndex = document.querySelector(`.js-pagination-slide[data-id="${swiper.activeIndex}"]`);
                paginationSlide.forEach(item =>
                    item.classList.remove('page-description-pagination-item-block--active'));
                paginationIndex.classList.add('page-description-pagination-item-block--active');
            }
        },
    });

    let advantagesSwiper = new Swiper(".js-advantages-swiper", {
        slidesPerView: 4,
        spaceBetween: 36,
        allowTouchMove: false,
        breakpoints: {
            1050: {
                slidesPerView: 3.5,
                allowTouchMove: true
            },
            930: {
                slidesPerView: 3.1,
                allowTouchMove: true
            },
            820: {
                slidesPerView: 2.5,
                allowTouchMove: true
            },
            660: {
                slidesPerView: 1.7,
                allowTouchMove: true
            },
            450: {
                slidesPerView: 1.5,
                allowTouchMove: true
            },
            385: {
                slidesPerView: 1.2,
                allowTouchMove: true
            },
        }
    });

    let complexSwiper = new Swiper(".js-page-complex-container-swiper", {
        slidesPerView: 4,
        allowTouchMove: false,
        pagination: {
            el: '.swiper-pagination'
        },
        breakpoints: {
            1240: {
                slidesPerView: 3,
                spaceBetween: 30,
                allowTouchMove: true
            },
            920: {
                slidesPerView: 2,
                spaceBetween: 30,
                allowTouchMove: true
            },
            620: {
                slidesPerView: 1,
                spaceBetween: 30,
                allowTouchMove: true
            },
        }
    });

    //header menu logic
    showMenu.addEventListener('click', () => menu.classList.add('header-menu--show'));

    menuClose.addEventListener('click', () => menu.classList.remove('header-menu--show'));

    window.addEventListener('resize', () => {
        width = document.documentElement.clientWidth;
        if (width > 800) {
            if (menu.classList.contains('header-menu--show')) {
                menu.classList.remove('header-menu--show');
            }
        }
    });

    menuBlock.forEach(item => item.addEventListener("click", () => {
        let currentList = document.querySelector(`.js-menu-block-list[data-id='${item.dataset.id}']`);
        item.classList.toggle('header-menu-container-block__title--active');
        currentList.classList.toggle("hide");
    }));

    // logic form

    formPhone && createMask();

    btnToForm.addEventListener('click', () =>
        anchor.scrollIntoView({block: "center", behavior: "smooth"}));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    formBtn.addEventListener('click', () => {
        if (formName.value.length < 2) showLabelError(labelName, formName)
        if (formPhone.value.length < 16) showLabelError(labelPhone, formPhone)
        if (!formEmail.value.match(regexEmail)) showLabelError(labelEmail, formEmail)
        if (!checkbox.checked) {
            checkbox.classList.add('page-contact-container-form-bottom__input--error');
            setTimeout(() =>
                checkbox.classList.remove('page-contact-container-form-bottom__input--error'), 3 * 1000);
        }

        if ((formName.value.length < 2) || (formPhone.value.length < 16) || (!formEmail.value.match(regexEmail)) || !checkbox.checked) {
            return;
        }

        formBtn.classList.add('disabled');

        let data = {
            name: formName.value,
            phone: formPhone.value,
            email: formEmail.value,
        };

        axios({
            method: 'get',
            url: window.urlApiSendForm,
            data,
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
            .then((resp) => {
                // if (!resp.data === 'ok') {
                //     return alert('Oops! Something went wrong… try again later.');
                // }

                // request imitation

                setTimeout(() => {
                    formBtn.classList.remove('disabled');
                }, 1000);

                setTimeout(() => {
                    formBtn.classList.add('page-contact-container-form-block-item__btn--send');
                    formBtn.innerHTML = 'Отправлено';
                    input.forEach(item => item.value = '');
                }, 2 * 1000);

                setTimeout(() => {
                    formBtn.classList.remove('page-contact-container-form-block-item__btn--send');
                    formBtn.innerHTML = 'Отправить заявку';
                }, 4 * 1000);
            })
            .catch(() => {
                return alert('Oops! Something went wrong… try again later.');
            });

    });

    //residential complex slider

    paginationSlide.forEach(item => item.addEventListener('click', () => {
        if (item.classList.contains('page-description-pagination-item-block--active')) {
            return;
        }
        paginationSlide.forEach(item =>
            item.classList.remove('page-description-pagination-item-block--active'));
        item.classList.add('page-description-pagination-item-block--active');
        swiper.slideTo(item.dataset.id);
    }));

    //logic to open photo

    swiperImg.forEach(item => item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('js-swiper-img')) return;
        popupImg.src = item.dataset.src;
        popup.classList.add('popup-photo--show');
        wrapper.classList.add('compensate-for-scrollbar');
        document.body.style.overflow = 'hidden';
    }));

    popupClose.addEventListener('click', () => hidePopupPhoto());

    document.addEventListener('click', (e) => {
        if (e.target === popup) hidePopupPhoto();
    });

    //logic for map

    if (width <= 700) {
        centerMap = [44.991630, 38.926551];
    } else if (width <= 990) {
        centerMap = [44.988630, 38.931999];
    } else {
        centerMap = [44.990630, 38.929699];
    }

    DG.then(function () {
        map = DG.map('map', {
            center: centerMap,
            zoom: 16,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            zoomControl: false,
            fullscreenControl: false,
            keyboard: false
        });

        for (let i = 0; i < arrIcon.length; i++) {
            addMarker(arrIcon[i].classIcon, arrIcon[i].label, i+1);
            DG.marker(arrIcon[i].coordinates, {icon}).addTo(map);
        }

        for (let i = 0; i < arrDisabledIcon.length; i++) {
            addDisabledMarker(arrDisabledIcon[i].classContainer, arrDisabledIcon[i].classIcon);
            DG.marker(arrDisabledIcon[i].coordinates, {icon}).addTo(map);
        }

        mapMarker.forEach(item =>
            item.addEventListener('mouseover', () => changeMarker('add', item)));

        mapMarker.forEach(item =>
            item.addEventListener('mouseout', () => changeMarker('remove', item)));
    });

    //functions

    function createMask() {
        let elements = document.getElementsByClassName('js-input-phone');
        for (let i = 0; i < elements.length; i++) {
            new IMask(elements[i], {
                mask: '+7(000)000-00-00',
            });
        }
    }

    function showLabelError(label, input) {
        label.classList.add('page-contact-container-form-block-item__label--show');
        input.classList.add('page-contact-container-form-block-item__input--error');
        input.parentNode.classList.add('page-contact-container-form-block-item--error');
        setTimeout(() => {
            label.classList.remove('page-contact-container-form-block-item__label--show');
            input.classList.remove('page-contact-container-form-block-item__input--error');
            input.parentNode.classList.remove('page-contact-container-form-block-item--error');
        }, 3 * 1000);
    }

    function hidePopupPhoto() {
        popup.classList.remove('popup-photo--show');
        setTimeout(() => {
            wrapper.classList.remove('compensate-for-scrollbar');
            document.body.style.overflow = 'initial'
        }, 150);
    }

    function addMarker(classIcon, label, number) {
        icon = DG.divIcon({
            iconSize: [46, 46],
            className: 'page-map-wrap-marker',
            html: `
                <div class="page-map-wrap-marker__icon js-map-icon ${classIcon}" data-id="${number}"></div>
                <div class="page-map-wrap-marker__label js-map-label" data-id="${number}">${label}</div>
            `
        });
    }

    function addDisabledMarker(classContainer, classIcon) {
        icon = DG.divIcon({
            iconSize: [46, 46],
            className: `page-map-wrap-marker ${classContainer}`,
            html: `<div class="page-map-wrap-marker__icon ${classIcon}"></div>`
        });
    }

    function changeMarker(change, item) {
        let mapLabel = document.querySelector(`.js-map-label[data-id="${item.dataset.id}"]`);
        let mapIcon = document.querySelector(`.js-map-icon[data-id="${item.dataset.id}"]`);

        if (change === 'add') {
            if (!mapLabel.classList.contains('page-map-wrap-marker__label--active')) mapLabel.classList.add('page-map-wrap-marker__label--active');
            if (!mapIcon.classList.contains('page-map-wrap-marker__icon--active')) mapIcon.classList.add('page-map-wrap-marker__icon--active');
            if (!mapIcon.parentElement.classList.contains('page-map-wrap-marker--active')) mapIcon.parentElement.classList.add('page-map-wrap-marker--active');
        } else {
            if (mapLabel.classList.contains('page-map-wrap-marker__label--active')) mapLabel.classList.remove('page-map-wrap-marker__label--active');
            if (mapIcon.classList.contains('page-map-wrap-marker__icon--active')) mapIcon.classList.remove('page-map-wrap-marker__icon--active');
            if (mapIcon.parentElement.classList.contains('page-map-wrap-marker--active')) mapIcon.parentElement.classList.remove('page-map-wrap-marker--active');
        }
    }

});