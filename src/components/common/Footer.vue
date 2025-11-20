<script setup></script>

<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <router-link to="/" class="nav-item">
        <div class="icon icon-game"></div>
        <div class="name">Game</div>
      </router-link>
      <router-link to="/account" class="nav-item">
        <div class="icon icon-account"></div>
        <div class="name">Account</div>
      </router-link>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(@/assets/footer_bg.webp);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  width: 100%;
  height: 72px;
  z-index: 5;
  border: 1px solid rgba(255, 255, 255, 0.09);
  overflow: hidden;
}
.footer-wrapper {
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  mix-blend-mode: lighten;
  background: rgba(137, 137, 137, 0.12);
  backdrop-filter: blur(25px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-item {
  flex: 1;
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  outline: none;
}
.nav-item.router-link-active {
  background: rgba(0, 0, 0, 0.2);
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 30px;
}
.name {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #b9b2c4;
}
.icon {
  width: 20px;
  height: 20px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.icon-game {
  background-image: url(data:image/png;base64,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);
}
.icon-account {
  background-image: url(data:image/png;base64,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);
}
</style>
