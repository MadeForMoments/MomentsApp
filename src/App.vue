<script setup lang="ts"></script>

<template>
  <div class="app-root">
    <RouterView />
  </div>
</template>

<style>
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} */

html, body, #app, .app-root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #000;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
