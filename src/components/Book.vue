<script setup lang="ts"></script>

<template>
  <div class="book-wrapper">
    <div class="book">
      <div class="side leather front"></div>
      <div class="side leather back"></div>
      <div class="side leather left"></div>
      <div class="side right"></div>
      <div class="side top"></div>
      <div class="side bottom"></div>
    </div>
  </div>
</template>

<style scoped>
.book-wrapper {
  position: relative;
  transform-style: preserve-3d;

  animation: rotate 10s infinite linear;
}

@keyframes rotate {
  to {
    transform: rotateY(360deg);
  }
}

.book {
  position: absolute;

  top: 250px;
  left: -200px;

  height: 500px;
  width: 350px;

  transform-style: preserve-3d;
}

.side {
  position: absolute;
  box-shadow: 0 0 5px black inset;
}

.leather {
  background-image: url(src/assets/images/leather_cover.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.front,
.back {
  width: 100%;
  height: 100%;
}

.front {
  transform: translateZ(60px);
}

.back {
  transform: rotateY(180deg) translateZ(60px);
}

.left,
.right {
  height: 100%;
  width: 120px;
}

.right {
  transform: rotateY(90deg) translateZ(280px);

  background-color: #ffffff;
  background-image: linear-gradient(
    90deg,
    transparent 50%,
    rgba(0, 0, 0, 0.306) 50%
  );
  background-size: 3.5px 3.5px;
}

.left {
  transform: rotateY(270deg) translateZ(60px);
}

.top,
.bottom {
  width: 340px;
  height: 120px;

  background-color: #ffffff;
  background-image: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.306) 50%);
  background-size: 3.5px 3.5px;
}

.top {
  transform: translateY(-50%) rotateX(90deg);
}

.bottom {
  bottom: 0;

  transform: translateY(50%) rotateX(90deg);
}
</style>
