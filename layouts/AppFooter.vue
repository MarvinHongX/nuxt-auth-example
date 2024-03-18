<script setup>
const { logoUrl } = useImg();
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
        by
        <span class="font-medium ml-2">nuxt-auth-example</span>
    </div>
</template>
<style lang="scss" scoped></style>
