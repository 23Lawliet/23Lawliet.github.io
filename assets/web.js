document.addEventListener("DOMContentLoaded", function(event) { 
    var check = true;
    var menu_scroll = document.querySelector(".menu_scroll");
    var logo_top = document.querySelector(".logo_top");
    var item = document.querySelectorAll(".banner_top .menu .menu_items .item");
    console.log(item);
    window.addEventListener("scroll", function(){
        if(window.pageYOffset > 60){
            if(check == true){
                console.log("Yoloo");
                check = false;
                menu_scroll.classList.add("menu_scrolled");
                logo_top.classList.add("logo_scrolled");
                for(var i=0; i < item.length; i++){
                    item[i].classList.add("item_scrolled");
                }
            }
        }
        else if(window.pageYOffset <= 60){
            if(check == false){
                menu_scroll.classList.remove("menu_scrolled");
                logo_top.classList.remove("logo_scrolled");
                for(var i=0; i < item.length; i++){
                    item[i].classList.remove("item_scrolled");
                }
                check = true;
            }
        }
    })


    // button cv language
    const cvBtns = document.querySelectorAll('.myCv .button button');
    const cvList = document.querySelectorAll('.cv .image');
    
    cvBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const type = e.target.getAttribute('type-cv')

            // remove and set active fpr button
            document
                .querySelector('.button button.active')
                .classList.remove('active')
            e.target.classList.add('active')

            // filter elements
            cvList.forEach((item) => {
                if (type == 'all' || item.getAttribute('type-cv') == type)
                    item.classList.remove('hide');
                else item.classList.add('hide');
            })
        })
    })



    //click to show popup images
    var images = document.querySelectorAll('.image img');
    var image_layer = document.querySelector('.image_layer');
    var overlay = document.querySelector('.popup_layer div.overlay');
    var closeBtn = document.querySelector('.popup_layer .overlay .close');
    var vn = document.querySelector('.vn');
    var image_layers = document.querySelectorAll('.image_layer ul li');

    closeBtn.addEventListener('click', function(){
        overlay.classList.remove('show');
        image_layer.classList.remove('show');
    })

    overlay.addEventListener('click', function(){
        overlay.classList.remove('show');
        image_layer.classList.remove('show');
    })

    for(var i=0; i<images.length; i++){
        images[i].addEventListener('click', function(){
            overlay.classList.add('show');
            image_layer.classList.add('show');
            var image_clicked = this;
            if(image_clicked == vn){
                image_layers[0].classList.remove('show');
                image_layers[0].classList.add('hide');
                image_layers[1].classList.remove('hide');
                image_layers[1].classList.add('show');
            }
            else{
                image_layers[1].classList.remove('show');
                image_layers[1].classList.add('hide');
                image_layers[0].classList.remove('hide');
                image_layers[0].classList.add('show');
            }

        })
    }




});
    
const playBtn = document.querySelector('.play-inner');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-backward');
const song = document.getElementById('song');
const timerLeft = document.querySelector('.timer__left');
const timerRight = document.querySelector('.timer__right');
const playRepeat = document.querySelector('.play-repeat');
const rangeBar = document.querySelector('.range');
const playList = document.querySelector('.playlist-list');
const shuffle = document.querySelector('.shuffle-song');
const musics =[
    {
        id: 0,
        number: '01',
        file:'1 Ph??t - Andiez.mp3',
        title: '1 Ph??t',
        artist: 'Andiez',
        time: '6.15',
        active:false,

    },
    {
        id: 1,
        number: '02',
        file: 'L??? l??ng - V??.mp3',
        title: 'L??? l??ng',
        artist: 'V??',
        time: '4:21',
        active:false,

    },
    {
        id: 2,
        number: '03',
        file: 'Somebody Else - Ebony Day Cover.mp3',
        title: 'Somebody Else',
        artist: 'Ebony Day Cover',
        time: '2:41',
        active:false,

    },
    {
        id: 3,
        number: '04',
        file: 'Taylor Swift - Love Story.mp3',
        title: 'Love Story',
        artist: 'Taylor Swift',
        time: '3:56',
        active:false,

    },
    {
        id: 4,
        number: '05',
        file: 'To The Moon- hooligan.mp3',
        title: 'To The Moon',
        artist: 'hooligan',
        time: '3:19',
        active:false,

    },
];

//set m???c ?????nh b??i 1 ph??t ?????u
let indexSong = 0;
song.setAttribute('src', `./assets/mp3/${musics[indexSong].file}`); 
//==============================================
//                  TH??M B??I H??T 
//==============================================
for (var i = 0 ;i< musics.length; i++) {
    playList.insertAdjacentHTML( 'beforeend',
       `<div class="playlist playlist--hover ${i === indexSong ? 'active' : ''}" data-index=${musics[i].id}>
            <p class=" playlist__number">${i === indexSong? '<i class="fas fa-volume-up"></i>' : `${musics[i].number}`}</p>
            <p class=" playlist__title">${musics[i].title}</p>
            <p class=" playlist__artist">${musics[i].artist}</p>
            <p class=" playlist__time">${musics[i].time}</p>
        </div>`)
}
//==============================================
//          RESET L???I KHI CH???N B??I H??T
//==============================================
function resetSong(dir) {
    dir = Number (dir);
    playList.innerHTML =`
    <div class="playlist playlist-list__title">
        <p class="playlist__number">#</p>
        <p class="playlist__title">TITLE</p>
        <p class="playlist__artist">ARTIST</p>
        <p class="playlist__time">TIME</p>
    </div>`;
    for (var j = 0 ;j< musics.length; j++) {
        playList.insertAdjacentHTML( 'beforeend',
       `<div class="playlist playlist--hover ${j === dir ? 'active' : ''}" data-index=${musics[j].id}>
            <p class=" playlist__number">${j === dir? '<i class="fas fa-volume-up"></i>' : `${musics[j].number}`}</p>
            <p class=" playlist__title">${musics[j].title}</p>
            <p class=" playlist__artist">${musics[j].artist}</p>
            <p class=" playlist__time">${musics[j].time}</p>
        </div>`)
    }
}
//==============================================
//                  Ph??t-d???ng b??i h??t
//==============================================
let isPlaying = true;
playBtn.addEventListener('click', playPause)
function playPause() {
    if (isPlaying) {
        playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
        song.play();
        isPlaying = false;
    } else{
        playBtn.innerHTML = `<i class="fas fa-play-circle play-icon main-icon main-icon--big"></i>`;
        song.pause();
        isPlaying = true;
    }
}
//==============================================
//                  Ph??t l???i b??i h??t
//==============================================
var isRepeat = false;
playRepeat.addEventListener('click',  function() {
    if(isRepeat == false) {
        isRepeat = true;
        playRepeat.style.color = '#F17B78';
        playRepeat.style.webkitTransform = 'rotate(360deg)';
    }else {
        isRepeat = false;
        playRepeat.style.color = '#3220007c';
        playRepeat.style.webkitTransform = 'rotate(0)';
    }
});

//==============================================
//                  ?????i b??i h??t
//==============================================
nextBtn.addEventListener('click',function() {
    if (isShuffle == true) changeSong(3);
    else changeSong(1);
});
prevBtn.addEventListener('click', function() {
    if (isShuffle == true) changeSong(3);
    else changeSong(-1);
});

function changeSong(dir) {
    if (dir === 1) { //next
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
    } else if (dir === -1) { //prev
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length-1;
        }
    } else if(dir === 3) {
        indexSong = Math.floor(Math.random() * 5);  
    }
    resetSong(indexSong);
    playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
    song.setAttribute('src', `./assets/mp3/${musics[indexSong].file}`); 
    song.play();
}
//==============================================
//              SET TH???I GIAN PHAT NH???C
//==============================================
function displayTimer() {
    // alert(song.duration); th???i gian b???n nh???c
    // alert(song.currentTime); th???i gian ch???y dc
    const { duration, currentTime } = song;
    timerRight.textContent = formatTimer(duration);
    timerLeft.textContent = formatTimer(currentTime);
    rangeBar.max = duration;
    rangeBar.value = currentTime;
}
//==============================================
//        FORMAT L???I FORM TH???I GIAN CH???Y
//==============================================
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    if (seconds < 10) return `${minutes}:0${seconds}`;
    else return `${minutes}:${seconds}`;
}
//==============================================
//  Thay ?????i kh??c nh???c khi click ch???n rangeBar
//==============================================
rangeBar.addEventListener('change',changeBar);
function changeBar() {
    song.currentTime = rangeBar.value; 
}
//==============================================
//       T??? PH??T B??I TI???P KHI K???T TH??C
//==============================================
song.addEventListener('ended', function() {
    if (isRepeat == true) { // Ph??t l???i b??i h??t
        isPlaying = true;
        playPause();
    } else changeSong(1); // Ph??t ti???p
});
//==============================================
//        CH???N B??I H??T TRONG DANH S??CH
//==============================================
playList.onclick = function(e) {
    
    const songNote = e.target.closest('.playlist--hover:not(.active)'); 
    let songNoteindex = songNote.getAttribute('data-index'); // l???y data-index
    indexSong = songNoteindex ;
    isPlaying = false;
    
    playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
    song.setAttribute('src', `./assets/mp3/${musics[indexSong].file}`); 
    song.play();
    resetSong(songNoteindex);

};
//==============================================
//              X??O B??I H??T
//==============================================
shuffle.addEventListener('click', shuffleSong);
var isShuffle = false;
function shuffleSong() {
    if (isShuffle == false) {
        isShuffle = true;
        shuffle.style.color = '#F17B78';
        changeSong(3);
    }
    else{
        isShuffle = false;
        shuffle.style.color = '#3220007c';

    }
}
//==============================================
//                  HI???U ???NG TIM
//==============================================
const heartBtn = document.getElementById('heart');
heartBtn.addEventListener('click', function() {
    if (heartBtn.className == 'far fa-heart') {
        heartBtn.className = 'fas fa-heart';
        heartBtn.style.color = '#F17B78';
    } else {
        heartBtn.className = 'far fa-heart';
        heartBtn.style.color = '#3220007c';
    }
})


displayTimer();
rangeBar.value = 0;
setInterval(displayTimer , 200); // c???p nh???t l???i th???i gian

//==============================================
//                  DARK THEME
//==============================================
const ball = document.querySelector('.ball');
const blackThemeBtn = document.querySelector('.check');
const blackThemeCanvas = document.getElementById('container');
blackThemeBtn.addEventListener('click', function() {
    if (blackThemeCanvas.classList.contains('dark-theme')) {
        blackThemeCanvas.classList.remove('dark-theme');
        ball.style.left = '2px';
    }
    else  {
        blackThemeCanvas.classList.add('dark-theme');
        ball.style.left = '22px'
    }
});

//==============================================
//                  MOBILE JS
//==============================================

const barLeft = document.querySelector('.bars-left');
const barRight = document.querySelector('.bars-right');
const sideBar = document.querySelector('#sidebar');
const navBar = document.querySelector('#navbar');
const hideNavBar = document.querySelector('.js-hide-navbar');
const hideSideBar = document.querySelector('.js-hide-sidebar');

barLeft.addEventListener('click', function() {
    navBar.classList.add('active');
    if (sideBar.classList.contains('active')) {
        sideBar.classList.remove('active');
    }
})
hideNavBar.addEventListener('click', function() {
    navBar.classList.remove('active')
})
barRight.addEventListener('click', function() {
    sideBar.classList.add('active');
    if (navBar.classList.contains('active')) {
        navBar.classList.remove('active');
    }
})
hideSideBar.addEventListener('click', function() {
    sideBar.classList.remove('active');
})




