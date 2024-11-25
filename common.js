// -----popup-----
let currentIndex = 0;

function openPopup(index) {
  currentIndex = index;
  const content = document.getElementById(`item${currentIndex}`).innerHTML;
  document.getElementById("popupText").innerHTML = content;

  const popup = document.getElementById("popup");
  popup.style.display = "flex"; // ポップアップを表示
  popup.style.opacity = "0";  // 初期状態で透明にする
  setTimeout(() => {
    popup.classList.add("show"); // フェードイン
    popup.style.opacity = "1";  // 表示時にopacityを1にする
  }, 10); // 少し遅らせてクラスを追加

  // ボタンの表示/非表示を切り替え
  toggleNavigationButtons();
}

// ポップアップを閉じる関数
function closePopup(event) {
  if (event.target !== document.querySelector('.popup-content') && !event.target.closest('.nav')) {
    const popup = document.getElementById("popup");
    popup.style.opacity = "0";  // フェードアウト開始
    setTimeout(() => {
      popup.classList.remove("show"); // showクラスを削除
      popup.style.display = "none";  // 非表示にする
    }, 600); // アニメーションの時間と一致させる
  }
}

function nextPopup() {
  currentIndex = (currentIndex + 1) % 7; // 7つに変更
  const content = document.getElementById(`item${currentIndex}`).innerHTML;
  document.getElementById("popupText").innerHTML = content;

  // ボタンの表示/非表示を切り替え
  toggleNavigationButtons();
}

function prevPopup() {
  currentIndex = (currentIndex - 1 + 7) % 7; // 7つに変更
  const content = document.getElementById(`item${currentIndex}`).innerHTML;
  document.getElementById("popupText").innerHTML = content;

  // ボタンの表示/非表示を切り替え
  toggleNavigationButtons();
}

// 「prev」と「next」ボタンの表示・非表示を切り替える関数
function toggleNavigationButtons() {
  const nextButton = document.querySelector('.nav.next');
  const prevButton = document.querySelector('.nav.prev');

  // 最初のアイテム（index 0）の場合は「prev」ボタンを非表示
  if (currentIndex === 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "block";
  }

  // 最後のアイテム（index 6）の場合は「next」ボタンを非表示
  if (currentIndex === 6) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "block";
  }
}



// -----popup 2-----
(function () {
  window.SecondNamespace = {
      currentIndex: 0,
      openPopup: function (index) {
          this.currentIndex = index;
          const content = document.getElementById(`second-item${this.currentIndex}`).innerHTML;
          document.getElementById("second-popupText").innerHTML = content;

          // ポップアップの表示
          const popup = document.getElementById("second-popup");
          popup.style.display = "flex";
          popup.style.opacity = "0";

          // レスポンシブ用クラス .sp-90 を追加または削除
          if (this.currentIndex === 3 || this.currentIndex === 4) {
              popup.classList.add('sp-90');
          } else {
              popup.classList.remove('sp-90');
          }

          // .pop-700 を追加または削除
          if (this.currentIndex === 4) {
              popup.classList.add('pop-700');
          } else {
              popup.classList.remove('pop-700');
          }

          setTimeout(() => {
              popup.classList.add("show");
              popup.style.opacity = "1";
          }, 10);

          // ポップアップのスクロール位置を最上部に戻す
          const popupContent = document.querySelector(".second-popup-content");
          popupContent.scrollTop = 0;

          // ボタンの表示制御を更新
          this.updateButtonVisibility();
      },
      closePopup: function (event) {
          if (event.target !== document.querySelector('.second-popup-content') && !event.target.closest('.second-nav')) {
              const popup = document.getElementById("second-popup");
              popup.style.opacity = "0";
              setTimeout(() => {
                  popup.classList.remove("show");
                  popup.style.display = "none";
              }, 600);
          }
      },
      nextPopup: function () {
          this.currentIndex = (this.currentIndex + 1) % 5; // 最大インデックスを 4 に設定
          const content = document.getElementById(`second-item${this.currentIndex}`).innerHTML;
          document.getElementById("second-popupText").innerHTML = content;

          // クラスを更新
          this.updatePopupStyle();

          // ポップアップのスクロール位置を最上部に戻す
          const popupContent = document.querySelector(".second-popup-content");
          popupContent.scrollTop = 0;

          // ボタンの表示制御を更新
          this.updateButtonVisibility();
      },
      prevPopup: function () {
          this.currentIndex = (this.currentIndex - 1 + 5) % 5; // 最大インデックスを 4 に設定
          const content = document.getElementById(`second-item${this.currentIndex}`).innerHTML;
          document.getElementById("second-popupText").innerHTML = content;

          // クラスを更新
          this.updatePopupStyle();

          // ポップアップのスクロール位置を最上部に戻す
          const popupContent = document.querySelector(".second-popup-content");
          popupContent.scrollTop = 0;

          // ボタンの表示制御を更新
          this.updateButtonVisibility();
      },
      updatePopupStyle: function () {
          const popup = document.getElementById("second-popup");

          // .sp-90 の適用
          if (this.currentIndex === 3 || this.currentIndex === 4) {
              popup.classList.add('sp-90');
          } else {
              popup.classList.remove('sp-90');
          }

          // .pop-700 の適用
          if (this.currentIndex === 4) {
              popup.classList.add('pop-700');
          } else {
              popup.classList.remove('pop-700');
          }
      },
      updateButtonVisibility: function () {
          // prevボタンの表示/非表示制御
          const prevButton = document.querySelector('.second-prev');
          // nextボタンの表示/非表示制御
          const nextButton = document.querySelector('.second-next');

          if (this.currentIndex === 0) {
              prevButton.style.display = "none";
              nextButton.style.display = "block";
          } else if (this.currentIndex === 2) {
              prevButton.style.display = "block";
              nextButton.style.display = "none";
          } else if (this.currentIndex === 3 || this.currentIndex === 4) {
              prevButton.style.display = "none";
              nextButton.style.display = "none";
          } else {
              prevButton.style.display = "block";
              nextButton.style.display = "block";
          }
      }
  };
})();

// アコーディオン
$(function(){
  //.accordion_oneの中の.accordion_headerがクリックされたら
  $('.s_01 .accordion_one .accordion_header').click(function(){
    //クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerが開いたり閉じたりする。
    $(this).next('.accordion_inner').slideToggle();
    $(this).toggleClass("open");
  });
});

$(function () {
  var headerHight = 100; //ヘッダーの高さ
  $('a[href^="#"]').click(function () {
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? "html" : href);
  var position = target.offset().top - headerHight;
  $("html, body").animate({
  scrollTop: position
  }, 500, "swing");
  return false;
  });
});

// アコーディオン area9
$(function() {
  $('.accordion_header-9').click(function() {
    $(this).prev('.accordion_inner-9').slideToggle(); // 直前の要素を選択して開閉
    $(this).toggleClass("open");
    $(this).hide(); // クリック後に自分自身を非表示にする
  });
});

// scroll hint TOP
new ScrollHint('.js-scrollable', {
  remainingTime: 5000,
  suggestiveShadow: true, //スクロール可能な要素右端に影を付ける
  i18n: {
    scrollable: 'スクロールできます' //表示するテキスト
  }
});