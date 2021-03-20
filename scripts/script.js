document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.send();

        request.addEventListener("readystatechange", () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                callback(response);
            } else {
                console.error(new Error("Ошибка: " + request.status));
            }
        });
    };

    const tabs = () => {
        const cardDetailChangeElems = document.querySelectorAll(
            ".card-detail__change"
        );
        const cardDetailsTitleElem = document.querySelector(
            ".card-details__title"
        );

        // const cardImageElems = document.querySelectorAll(".card__image");

        // const hideAll = () => {
        //     for (let i = 0; i < cardDetailChangeElems.length; i++) {
        //         cardDetailChangeElems[i].classList.remove("active");
        //         cardDetailsTitleElems[i].classList.remove("active");
        //         cardImageElems[i].classList.remove("active");
        //     }
        // };

        // for (let i = 0; i < cardDetailChangeElems.length; i++) {
        //     cardDetailChangeElems[i].addEventListener("click", () => {
        //         hideAll();
        //         cardDetailChangeElems[i].classList.add("active");
        //         cardDetailsTitleElems[i].classList.add("active");
        //         cardImageElems[i].classList.add("active");
        //     });
        // }

        const cardImageItemElem = document.querySelector(".card__image_item");
        const cardDetailsPriceElem = document.querySelector(
            ".card-details__price"
        );
        const descriptionMemoryElem = document.querySelector(
            ".description__memory"
        );

        const data = [
            {
                name: "Смартфон Apple iPhone 12 Pro 128GB Graphite",
                img: "img/iPhone-graphite.png",
                price: "95990",
                memoryROM: 128,
            },
            {
                name: "Смартфон Apple iPhone 12 Pro 256GB Silver",
                img: "img/iPhone-silver.png",
                price: "120990",
                memoryROM: 256,
            },
            {
                name: "Смартфон Apple iPhone 12 Pro 128GB Pacific Blue",
                img: "img/iPhone-blue.png",
                price: "99990",
                memoryROM: 128,
            },
        ];

        const deactive = () => {
            cardDetailChangeElems.forEach(btn =>
                btn.classList.remove("active")
            );
        };

        cardDetailChangeElems.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                if (!btn.classList.contains("active")) {
                    deactive();
                    btn.classList.add("active");
                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItemElem.src = data[i].img;
                    cardImageItemElem.alt = data[i].name;
                    cardDetailsPriceElem.textContent = data[i].price + "₽";
                    descriptionMemoryElem.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
                }
            });
        });
    };

    const accordion = () => {
        // const characteristicsTitle = document.querySelectorAll('.characteristics__title');
        // const characteristicsDescription = document.querySelectorAll('.characteristics__description');

        // characteristicsTitle.forEach((elem, i) => {
        //     elem.addEventListener("click", () => {
        //         elem.classList.toggle("active");
        //         characteristicsDescription[i].classList.toggle("active");
        //     });
        // });

        const characteristicsListElem = document.querySelector(
            ".characteristics__list"
        );
        const characteristicsItemElems = document.querySelectorAll(
            ".characteristics__item"
        );

        const open = (button, dropDown) => {
            closeAllDrops();
            dropDown.style.height = `${dropDown.scrollHeight}px`;
            button.classList.add("active");
            dropDown.classList.add("active");
        };

        const close = (button, dropDown) => {
            button.classList.remove("active");
            dropDown.classList.remove("active");
            dropDown.style.height = "";
        };

        const closeAllDrops = (button, dropDown) => {
            characteristicsItemElems.forEach(elem => {
                if (
                    elem.children[0] !== button &&
                    elem.children[1] !== dropDown
                ) {
                    close(elem.children[0], elem.children[1]);
                }
            });
        };

        characteristicsListElem.addEventListener("click", event => {
            const target = event.target;
            if (target.classList.contains("characteristics__title")) {
                const parent = target.closest(".characteristics__item");
                const description = parent.querySelector(
                    ".characteristics__description"
                );
                description.classList.contains("active")
                    ? close(target, description)
                    : open(target, description);
            }
        });

        document.body.addEventListener("click", event => {
            if (!event.target.closest(".characteristics__list")) {
                closeAllDrops();
            }
        });
    };

    const modal = () => {
        const cardDetailButtonBuyElem = document.querySelector(
            ".card-details__button_buy"
        );
        const cardDetailsButtonDeliveryElem = document.querySelector(
            ".card-details__button_delivery"
        );
        const modalElem = document.querySelector(".modal");
        const cardDetailsTitleElem = document.querySelector(
            ".card-details__title"
        );
        const modalTitleElem = modalElem.querySelector(".modal__title");
        const modalSubtitleElem = modalElem.querySelector(".modal__subtitle");

        const escapeHandler = event => {
            if (event.code === "Escape") {
                closeModal();
            }
        };
        const openModal = event => {
            const target = event.target;
            modalElem.classList.add("open");
            document.addEventListener("keydown", escapeHandler);
            modalTitleElem.textContent = cardDetailsTitleElem.textContent;
            modalSubtitleElem.textContent = target.dataset.buttonBuy;
        };
        const closeModal = () => {
            modalElem.classList.remove("open");
            document.removeEventListener("keydown", escapeHandler);
        };

        cardDetailButtonBuyElem.addEventListener("click", openModal);
        cardDetailsButtonDeliveryElem.addEventListener("click", openModal);

        modalElem.addEventListener("click", event => {
            if (
                event.target.classList.contains("modal__close") ||
                event.target === modalElem
            ) {
                closeModal();
            }
        });
    };

    const renderCrossSell = () => {
        const crossSellListElem = document.querySelector(".cross-sell__list");

        const createCrossSellItem = (good) => {
            const liItem = document.createElement("li");
            liItem.innerHTML = `
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src=${good.photo} alt="${good.name}">
                    <h3 class="cross-sell__title">${good.name}</h3>
                    <p class="cross-sell__price">${good.price}₽</p>
                    <div class="button button_buy cross-sell__button">Купить</div>
                </article>
            `;
            return liItem;
        };

        const createCrossSellList = (goods) => {
            goods.forEach(item => {
                crossSellListElem.append(createCrossSellItem(item));
            })
        };

        getData("cross-sell-dbase/dbase.json", createCrossSellList);
    }

    tabs();
    accordion();
    modal();
    renderCrossSell();
});
