<script setup lang="ts">
defineProps<{
  title: string
  icon: string
}>()
</script>

<template>
  <div class="action-item">
    <div class="action-item-title">{{ title }}</div>
    <div class="action-item-icon" :class="icon"></div>
  </div>
</template>

<style scoped>
.action-item {
  width: 100%;
  height: 75px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(75px);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.action-item-title {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 17.5px;
  line-height: 25px;
  color: #f2f1f4;
}
.action-item-icon {
  display: flex;
  align-items: center;
  width: 35px;
  height: 35px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.icon-right {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADASURBVHgB3ZTRDYMwDESdTsAIGYER2IRuUDYgG7QblI0YISPQDVwjghSsfOQS1Eqc5M97CPsBMfOLtzgqCR/jCI2UngrSExopTQrSIf0V0MjMEWCRsQhjh/gI4ksgNgFpUEgbXmHPXALp1FLfhEZKdz7BkfEMyMVEW7QjN4AxyMQ+TMaYT1ZTnjSoHYyUmyqpePs2DlqjZa+WZn9Srrt5wroWKTtVftSUoVv/SZQA8FwiSgKQf2sFWKXpGf3zhnwB/34kAbiUhvsAAAAASUVORK5CYII=);
  background-position: 55% 50%;
  background-size: 25%;
}
.icon-link {
  background-color: #ffffff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH0SURBVHgB7VZLTsMwEB3bqHQZAYtILCgLUMWG9gbhBIgbwA3gBJQTADeAEyBOQG5A2dJKhEXViE/lZWlrD04h6S9JndSs6JNaO/bE73nG4wzAfwcBg7A3yg4glNJshBD1d96oGxewae1VBB08ahlLeeDzpht0KRiCWOlZ2saMboXdFTAE/6Ppblo7VcHI/vg4kXCKBCpJ78UKsK1yCRg4kAIpJKfQq/vc88Kx1k9so/jaa7u1NPIZAZZVsops9Q5QBocpFXQYvIKn/rbj5gNy1ZyHz4hYJ4TMiJk4A0VauFSWDugiQeQ0uTp0NULZdZxt5IGh20Ee/y7sKWk1mIOu7N3rkKsTf2Gvl48hTQBhsoLhjhS5//l8CxmRRJ72ThQCBKqfRobIJwT8OTkZeNG0GGXKwgJ0dx7cE0xiVc07b/z5KRxf6CLK6vbW2DcgRG4P5I35NHJ5QId8mNZUPgR9la5Vzj0et1ZmD+juPEhr1ZSCX5EVDpPWyxMCLbfrpnVmAQTwShURHCWe5on5NDKfgXancaaaMzAEYwXJUsBSQBpQEJ40N8oCAW4kB6GmCojFSnaU0X1B4OspyWyCxF7feQAkDhgF3vidxknS7GRNKPpHqrkBY9zodmU/9c6IdXPwIaGA+5Jh7iqJiL7b5i+vsMQcfAOmpOYpoHMTyAAAAABJRU5ErkJggg==);
  background-size: 50%;
}
</style>
