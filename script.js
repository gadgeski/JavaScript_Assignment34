const carouselSlides = document.querySelector(".carousel-slides");
const images = document.querySelectorAll(".carousel-slides img");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const dotsContainer = document.querySelector(".carousel-dots");
const carouselContainer = document.querySelector(".carousel-container"); // マウスイベント用

let currentIndex = 0;
const totalImages = images.length;
const slideWidth = images[0].clientWidth; // 1枚の画像幅（カルーセル幅に合わせる）

let autoPlayInterval; // 自動再生のインターバルID
const autoPlayDuration = 3000; // 3秒ごとに切り替え

// ドットナビゲーションを生成
function createDots() {
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.index = i; // インデックスをデータ属性として保存
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
      resetAutoPlay(); // 手動操作後、自動再生をリセット
    });
    dotsContainer.appendChild(dot);
  }
}

// カルーセルの表示を更新する関数
function updateCarousel() {
  carouselSlides.style.transform = `translateX(${
    -currentIndex * slideWidth
  }px)`;

  // ドットのアクティブ状態を更新
  document.querySelectorAll(".dot").forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// 次のスライドへ
function goToNextSlide() {
  currentIndex++;
  if (currentIndex >= totalImages) {
    currentIndex = 0; // 最後の画像に達したら最初に戻る
  }
  updateCarousel();
}

// 前のスライドへ
function goToPrevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalImages - 1; // 最初の画像で「前へ」を押したら最後に戻る
  }
  updateCarousel();
}

// 自動再生を開始する
function startAutoPlay() {
  autoPlayInterval = setInterval(goToNextSlide, autoPlayDuration);
}

// 自動再生を停止する
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// 自動再生をリセット（停止してから再開）
function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// イベントリスナーを設定
nextButton.addEventListener("click", () => {
  goToNextSlide();
  resetAutoPlay(); // 手動操作後、自動再生をリセット
});

prevButton.addEventListener("click", () => {
  goToPrevSlide();
  resetAutoPlay(); // 手動操作後、自動再生をリセット
});

// マウスがカルーセルに乗ったら自動再生を停止、離れたら再開
carouselContainer.addEventListener("mouseover", stopAutoPlay);
carouselContainer.addEventListener("mouseout", startAutoPlay);

// 初期化
createDots();
updateCarousel(); // 最初のスライドとドットのアクティブ状態を設定
startAutoPlay(); // 自動再生を開始
