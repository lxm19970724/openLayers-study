<template>
  <a-config-provider :getPopupContainer="getPopupContainer">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
const getPopupContainer = (el: Element, dialogContext?: any) => {
  console.log("🚀 ~ getPopupContainer ~ el:", el)
  if (dialogContext) {
    return dialogContext.getDialogWrap();
  } else {
    return document.body;
  }
}
</script>
