<script setup>
import { ref, computed } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
const { authUser, updateName } = await useAuth()
const { flag_placeholderUrl } = useImg();

const editedName = ref(null);
const isEditingName = ref(false);

const editName = () => {
    isEditingName.value = true;
    editedName.value = authUser.value.name;
}

const saveName = () => {
    updateName(editedName.value);
    isEditingName.value = false;
}

const cancelEdit = () => {

    isEditingName.value = false;
}

definePageMeta({
    middleware: ['user-only']
});

watch(authUser, () => {
    if (authUser.userId == '') goToSignInPage();
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card mb-0">
                <div class="text-700 text-center">
                    <Avatar :label="authUser?.name?.charAt(0)" class="mr-2 mb-3" size="xlarge" shape="circle"></Avatar>

                    <div class="text-900 font-bold text-2xl mb-3">Hi, {{ authUser?.name }}!</div>
                    <div class="text-700 text-2xl mb-5"></div>
                </div>
                <div class="card border-none">
                    <div class="surface-section">
                        <div class="font-medium text-3xl text-900 mb-3">Edit Profile</div>
                        <div class="text-500 mb-5">Some info may be visible to other people using services.</div>
                        <ul class="list-none p-0 m-0">
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">Name</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <template v-if="isEditingName">
                                        <InputText v-model="editedName" />
                                    </template>
                                    <template v-else>
                                        {{ authUser.name }}
                                    </template>
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <template v-if="!isEditingName">
                                        <Button label="Edit" icon="pi pi-pencil" class="p-button-text" @click="editName" />
                                    </template>
                                    <template v-else>
                                        <Button label="Save" icon="pi pi-check" @click="saveName" />
                                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="cancelEdit" />
                                    </template>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">Password</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                                    •••••••• </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">Phone</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{ getFormattedPhoneNumber(authUser?.phone) }}</div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button disabled class="p-button-text" ></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">Country</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <img alt="flag" :src="flag_placeholderUrl" :class="`flag flag-${getCountryCodeByPhoneCode(authUser?.phone.country)}`" style="width: 24px" />
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button disabled class="p-button-text" ></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">User Flag</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <Chip :label="getUserFgName(authUser?.userFg)" class="mr-2"></Chip>
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button disabled class="p-button-text" ></Button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
</style>
