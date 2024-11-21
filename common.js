// -----ヘッダー-----
let lastScrollTop = 0; // 最後のスクロール位置を保持

window.addEventListener('scroll', function() {
  const scrollButtons = document.querySelector('.scroll-buttons');
  const scrollPosition = window.scrollY; // 現在のスクロール位置

  // スクロールが上方向に行われているかを判定
  if (scrollPosition < lastScrollTop && window.innerWidth <= 768) {
    // 上にスクロールしている場合にボタンを表示
    scrollButtons.classList.add('visible');
    scrollButtons.classList.remove('hidden'); // 非表示用クラスを削除
  } else {
    // 下にスクロールしている場合にボタンを非表示にする
    scrollButtons.classList.add('hidden'); // 非表示用クラスを追加
    setTimeout(function() {
      scrollButtons.classList.remove('visible'); // 非表示のアニメーションが終わった後にvisibleクラスを削除
    }, 500); // アニメーションの時間と一致させる
  }

  // 現在のスクロール位置を次回の比較用に保存
  lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // ページの最上部ではlastScrollTopを0にリセット
});

// ウィンドウサイズが変更されたときにボタン表示をリセット
window.addEventListener('resize', function() {
  const scrollButtons = document.querySelector('.scroll-buttons');

  // 768pxを超えた場合、スクロールボタンを非表示にする
  if (window.innerWidth > 768) {
    // 非表示にする際にアニメーションを適用する
    scrollButtons.style.transition = 'none'; // 一時的にアニメーションを無効化
    scrollButtons.classList.add('hidden'); // 非表示用クラスを追加
    scrollButtons.classList.remove('visible');
    // アニメーション後にスタイルを元に戻す
    setTimeout(function() {
      scrollButtons.style.transition = 'transform 0.5s ease, opacity 0.5s ease, height 0.5s ease';
    }, 500); // 500ms後にアニメーションを有効に戻す
  }
});

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

          // ボタンの表示制御を更新
          this.updateButtonVisibility();
      },
      prevPopup: function () {
          this.currentIndex = (this.currentIndex - 1 + 5) % 5; // 最大インデックスを 4 に設定
          const content = document.getElementById(`second-item${this.currentIndex}`).innerHTML;
          document.getElementById("second-popupText").innerHTML = content;

          // クラスを更新
          this.updatePopupStyle();

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
  });
});