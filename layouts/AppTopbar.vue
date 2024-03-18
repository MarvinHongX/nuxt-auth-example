<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
const { onMenuToggle } = useLayout();
const { authUser, signOut } = await useAuth()
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const authOverlayOption = ref(null);
const { logoUrl } = useImg();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const toggleAuthOverlay = (event) => {
    authOverlayOption.value.toggle(event);
}

const onSignOutClick = () => {
    const ok = signOut();
    if (ok) {
        console.log('The user has been signed out.');
    }
};

const onEditProfileClick = () => {
    authOverlayOption.value.toggle();
    goToProfilePage();
};

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};


const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;
    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>nuxt-auth-example</span>
        </router-link>
        
        <div>
            <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
        </div>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button class="p-link layout-topbar-button layout-topbar-button" @click="toggleAuthOverlay">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <OverlayPanel class="card mb-0" ref="authOverlayOption" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 320px">
                <div class="text-700 text-center">
                    <Avatar :label="authUser?.name?.charAt(0)" class="mr-2" size="xlarge" shape="circle"></Avatar>

                    <div class="text-900 font-bold text-2xl mb-3">Hi, {{ authUser?.name }}!</div>
                    <div class="text-700 text-2xl mb-5"></div>
                    <Button @click="onEditProfileClick()" label="Manage Account" class="mr-3 font-bold px-2 py-3 p-button-raised p-button-rounded white-space-nowrap"></Button>
                    <Button @click="onSignOutClick()" label="Sign Out" severity="secondary" icon="pi pi-sign-out" class="px-2 py-3 p-button-raised p-button-rounded white-space-nowrap"></Button>
                </div>
            </OverlayPanel>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
