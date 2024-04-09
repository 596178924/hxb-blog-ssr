<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// 防御性代码，防止被嵌入到其他网页中
if (window.top !== window.self) {
  window.top.location.href = window.self.location.href
}
</script>

<style lang="scss" scoped></style>
