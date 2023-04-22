const colors = ['#e71c99', '#ff602e', '#fc9b02', '#fac403', '#6fcc12', '#199bd3', '#3c34e4', '#8d01f8'];
const listGift = [
    {
        name: 'Bút bi',
        percent: 15 / 100,
        image: './assets/img/product-1.png',
    },
    {
        name: 'Sổ tay',
        percent: 15 / 100,
        image: './assets/img/product-2.png',
    },
    {
        name: 'Ba lô',
        percent: 10 / 100,
        image: './assets/img/product-3.png',
    },
    {
        name: 'Nón bảo hiểm',
        percent: 10 / 100,
        image: './assets/img/product-4.png',
    },
    {
        name: 'Bút bi',
        percent: 15 / 100,
        image: './assets/img/product-1.png',
    },
    {
        name: 'Sổ tay',
        percent: 15 / 100,
        image: './assets/img/product-2.png',
    },
    {
        name: 'Ba lô',
        percent: 10 / 100,
        image: './assets/img/product-3.png',
    },
    {
        name: 'Nón bảo hiểm',
        percent: 10 / 100,
        image: './assets/img/product-4.png',
    },
];
(() => {
    const $ = document.querySelector.bind(document);
    const wheel = $('.wheel');
    const btnSpin = $('.spin-btn');
    let timer = 7000; // Thời gian cho mỗi lần quay
    let isRotating = false; // Đang quay hay không?
    let currentRotate = 0;
    const giftSize = listGift.length;
    const rotate = 360 / giftSize;
    const skewY = 90 - rotate; // Độ nghiêng của 1 item
    const renderGift = () => {
        listGift.forEach((item, index) => {
            const itemGift = document.createElement('li');
            itemGift.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;
            itemGift.innerHTML = `
                <p class="text-item" style="
                    background-color: ${colors[index % colors.length]};
                    transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);
                ">
                    <b>${item.name}</b>
                </p>
                <img class="wheel-img" src="${item.image}"
                    style="
                        left: ${rotate / 4}px;
                        bottom: ${rotate / 2}px;
                        transform: skewY(${skewY}deg)
                    " />
            `;
            wheel.appendChild(itemGift);
        })
    }
    const rotateWheel = (currentRotate, index) => {
        wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
    }
    const getGift = (randomNumber) => {
        let currentPercent = 0;
        let list = [];
        listGift.forEach((item, index) => {
            currentPercent += item.percent;
            randomNumber <= currentPercent && list.push({
                ...item, index
            });
        });
        return list[0];
    }
    const showGift = (gift) => {
        setTimeout(() => {
            isRotating = false;
            Swal.fire({
                title: 'Chúc mừng bạn đã trúng ' + gift.name,
                imageUrl: gift.image,
                imageHeight: 200
            })
        }, timer);
    }
    const spinner = () => {
        isRotating = true;
        const gift = getGift(Math.random());
        currentRotate += 360 * 10;
        rotateWheel(currentRotate, gift.index);
        showGift(gift);
    }
    btnSpin.addEventListener('click', () => {
        !isRotating && spinner();
    });
    renderGift();
})();
function resize() {
    var width = $(window).width();
    document.documentElement.style.setProperty('--size', width > 600 ? "500px" : (width / 1.1 - 32) + "px");
}
resize();