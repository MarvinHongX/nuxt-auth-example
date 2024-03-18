<script setup>
import { ref, computed } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
const editing = ref(false);
const userId = ref('');
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const phoneNumber = ref('');
const countries = useCountries();
const country = ref({ name: '대한민국 +82', code: '+82' });

const { signUp } = await useAuth()
const { logoUrl } = useImg();

const invalidUserId = computed(() => {
    return errors.value.userId !== '' && typeof errors.value.userId === 'string';
});

const invalidPassword = computed(() => {
    return errors.value.password !== '' && typeof errors.value.password === 'string';
});

const invalidName = computed(() => {
    return errors.value.name !== '' && typeof errors.value.name === 'string';
});

const invalidCountry = computed(() => {
    return errors.value.country !== '' && typeof errors.value.country === 'string';
});

const invalidPhone = computed(() => {
    return errors.value.phone !== '' && typeof errors.value.phone === 'string';
});

const errors = ref({
    signUp: '',
    userId: '',
    password: '',
    name: '',
    phone: '',
});

definePageMeta({

});
definePageMeta({
    layout: false,
    middleware: ['signup-agree-token-only']
});


watch(userId, () => {
    errorsUserId(editing, userId, errors);
});

watch(password, () => {
    errorsPassword(editing, password, confirmPassword, errors);
});

watch(confirmPassword, () => {
    errorsPassword(editing, password, confirmPassword, errors);
});

watch(name, () => {
    errorsName(editing, name, errors);
});

watch(country, () => {
    errorsPhone(editing, country, phoneNumber, errors);
});

watch(phoneNumber, () => {
    errorsPhone(editing, country, phoneNumber, errors);
});

const handleSignUp = async () => {
    if (!editing.value) editing.value = true;

    errorsUserId(editing, userId, errors);
    errorsPassword(editing, password, confirmPassword, errors);
    errorsName(editing, name, errors);
    errorsPhone(editing, country, phoneNumber, errors);

    if (errors.value.userId !== '') return
    if (errors.value.password !== '') return
    if (errors.value.name !== '') return
    if (errors.value.phone !== '') return

    try {
        const data = await signUp({
            userId: userId.value,
            password: password.value,
            name: name.value,
            phone: {
                country: country.value.code,
                number: phoneNumber.value,
            },
        });
        if (data && data !== '') {
            goToHomePage();
            return;
        }
    } catch (error) {
        console.error(error);
        errors.value.signUp = 'Failed to sign up. Please try again.';
        return;
    }
    errors.value.signUp = 'Failed to sign up. Please try again.';
}







</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <a @click="goToSignInPage()">
                        <img :src="logoUrl" alt="logo" class="mb-5 w-6rem flex-shrink-0 cursor-pointer" />
                    </a>
                    <div class="text-900 text-3xl font-medium mb-3">Sign Up</div>
                    <form @submit.prevent="handleSignUp">
                        <div class="mb-3">
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-user"></i>
                                </InputGroupAddon>
                                <InputText id="userId1" v-model="userId" type="text" placeholder="ID" :invalid="invalidUserId" class="w-full" style="padding: 1rem" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-lock"></i>
                                </InputGroupAddon>
                                <Password id="password1" v-model="password" placeholder="Password" :invalid="invalidPassword" :toggleMask="true" class="w-full" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            </InputGroup>
                            <InputGroup class="mb-3">
                                <InputGroupAddon>
                                    <i class="pi pi-lock"></i>
                                </InputGroupAddon>
                                <Password id="confirmPassword1" v-model="confirmPassword" placeholder="Confirm Password" :invalid="invalidPassword" :toggleMask="true" class="w-full" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            </InputGroup>
                            <div>
                                <small id="phoneNumber-error" class="p-error mb-5" v-if="errors.userId !== ''">{{ errors.userId }}</small>
                            </div>
                            <div>
                                <small id="name-error" class="p-error mb-5" v-if="errors.password !== ''">{{ errors.password }}</small>
                            </div>
                        </div>
                        <div class="mb-8">
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-user"></i>
                                </InputGroupAddon>
                                <InputText id="name1" v-model="name" type="text" placeholder="Name" :invalid="invalidName" class="w-full" style="padding: 1rem" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-globe"></i>
                                </InputGroupAddon>
                                <Dropdown id="country1" v-model="country" :options="countries" optionLabel="name" :invalid="invalidCountry" class="w-full" style="padding: 0.5rem" ></Dropdown>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-mobile"></i>
                                </InputGroupAddon>
                                <InputText id="phoneNumber1" v-model="phoneNumber" type="text" placeholder="Phone Number" :invalid="invalidPhone" class="w-full" style="padding: 1rem" />
                            </InputGroup>
                            <div>
                                <small id="name-error" class="p-error mb-5" v-if="errors.name !== ''">{{ errors.name }}</small>
                            </div>
                            <div>
                                <small id="phoneNumber-error" class="p-error mb-5" v-if="errors.phone !== ''">{{ errors.phone }}</small>
                            </div>
                        </div>
                        <Button type="submit" label="Sign Up" class="w-full p-3 text-xl mb-5"></Button>
                        <div>
                            <small id="signUp-error" class="p-error mb-5" v-if="errors.signUp !== ''">{{ errors.signUp }}</small>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
</style>
