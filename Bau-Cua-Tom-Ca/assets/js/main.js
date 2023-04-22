const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnStart = $(".btn__start");
const dicesItem = $$(".figure:not(.figure--small) .figure__item");
const dices = $$(".figure--small .figure__item");
var figures = [
    {
        index: 0,
        image: './assets/img/deer.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 1,
        image: './assets/img/calabash.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 2,
        image: './assets/img/chicken.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 3,
        image: './assets/img/fish.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 4,
        image: './assets/img/crab.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 5,
        image: './assets/img/shrimp.png',
        percent: 16.6666,
        coin: 0,
    },
];
// Khởi tạo trò chơi
var user = {
    avatar: './assets/img/user.png',
    coin: 10,
    betTable: 2
}
function updateData() {
    var headerAvatar = $('.header__avatar img');
    var headerBet = $('.header__bet');
    var headerMoney = $('.header__money');
    headerAvatar.src = user.avatar;
    headerBet.innerHTML = 'Bàn cược: ' + user.betTable + ' đ';
    headerMoney.innerHTML = 'Tiền: ' + user.coin + ' đ';
    dicesItem.forEach((e, index) => {
        var img = e.querySelector('.figure__item--group img');
        var labelCoin = e.querySelector('.figure__item--group label');
        img.src = figures[index].image;
        labelCoin.innerHTML = figures[index].coin;
    });
}
updateData();
// Lấy ngẫu nhiên một phần tử trong danh sách figures theo tỉ lệ
var randomFigure = () => {
    var value = Math.random() * 100;
    var sum = 0;
    var element;
    for (var i = 0; i < figures.length; i++) {
        sum += figures[i].percent;
        if (sum > value) {
            element = figures[i];
            break;
        }
    }
    return element;
}
// Xử lý lắc xúc sắc
btnStart.onclick = () => {
    // Kiểm tra người chơi đã đặt cược chưa?
    var flag = false;
    for (var i = 0; i < figures.length; i++)
        if (figures[i].coin > 0) {
            flag = true;
            break;
        }
    if (!flag)
        return;
    var wins = [];
    var t = 0;
    var timer = setInterval(() => {
        t += 100;
        if (t >= 500) {
            clearInterval(timer);
            winOfLose(wins);
        } else {
            wins = [randomFigure(), randomFigure(), randomFigure()];
            dices[0].querySelector('img').src = wins[0].image;
            dices[1].querySelector('img').src = wins[1].image;
            dices[2].querySelector('img').src = wins[2].image;
        }
    }, 100);
}
// Đặt tiền
dicesItem.forEach((e) => {
    e.onclick = (e) => {
        if (user.coin >= user.betTable) {
            var item = e.target.parentElement.parentElement;
            user.coin -= user.betTable;
            figures[item.dataset.id].coin += user.betTable;
            updateData();
        }
    }
})
// Xử lý thắng thua
function winOfLose(wins) {
    var winCoin = 0;
    for (var i = 0; i < wins.length; i++) {
        for (var j = 0; j < figures.length; j++) {
            if (wins[i].index == figures[j].index) {
                winCoin += wins[i].coin * 2;
            }
        }
    }
    for (var j = 0; j < figures.length; j++) {
        figures[j].coin = 0;
    }
    user.coin += winCoin;
    updateData();
    if (winCoin > 0)
        alert("Bạn thắng " + winCoin + " đồng");
}