<script setup>
import { ref, computed } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
const editing = ref(false);
const verifying = ref(false);
const userId = ref('');
const phoneNumber = ref('');
const hCode = ref('');

const countries = useCountries();
const country = ref({ name: '대한민국 +82', code: '+82' });

const { help, helpCode } = await useAuth()
const { logoUrl } = useImg();

const invalidHelp = computed(() => {
    return errors.value.help !== '' && typeof errors.value.help === 'string';
});

const invalidHelpCode = computed(() => {
    return errors.value.helpCode !== '' && typeof errors.value.helpCode === 'string';
});

const errors = ref({
    help: '',
    helpCode: '',
});

definePageMeta({
    layout: false
});

const handleHelp = async () => {
    if (!editing.value) editing.value = true;

    errorsHelp(editing, userId, country, phoneNumber, errors);

    if (errors.value.help !== '') return

    try {
        const data = await help({
            userId: userId.value,
            phone: {
                country: country.value.code,
                number: phoneNumber.value,
            },
        });
        console.log('data', data.help);
        
        if (data.help) {
            errors.value.help = '';
            verifying.value = true;
            errors.value.verification = 'Please enter the verification code.';
            return;
        }
    } catch (error) {
        console.error(error);
        errors.value.help = 'Failed to send verification code. Please try again.';
        return;
    }
    errors.value.help = 'Failed to send verification code. Please try again.';
}

const handleHelpCode = async () => {
    try {
        const data = await helpCode({
            userId: userId.value,
            phone: {
                country: country.value.code,
                number: phoneNumber.value,
            },
            helpCode: hCode.value,
        });
        if (data.verified) {
            console.log('Verification success');
        } else {
            console.log('Verification failed');
        }
    } catch (error) {
        console.error('Verification error:', error);
    }
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
                    <div class="text-900 text-3xl font-medium mb-3">Forgot Password?</div>
                    <form @submit.prevent="handleHelp">
                        <div>
                            <div class="mb-5">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <i class="pi pi-user"></i>
                                    </InputGroupAddon>
                                    <InputText id="userId1" v-model="userId" type="text" placeholder="ID" :invalid="invalidHelp" :disabled="verifying" class="w-full" style="padding: 1rem" />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <i class="pi pi-globe"></i>
                                    </InputGroupAddon>
                                    <Dropdown id="country1" v-model="country" :options="countries" optionLabel="name" :invalid="invalidHelp" :disabled="verifying"  class="w-full" style="padding: 0.5rem" ></Dropdown>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <i class="pi pi-mobile"></i>
                                    </InputGroupAddon>
                                    <InputText id="phoneNumber1" v-model="phoneNumber" type="text" placeholder="Phone Number" :invalid="invalidHelp" :disabled="verifying" class="w-full" style="padding: 1rem" />
                                </InputGroup>
                                <InputGroup v-if="verifying">
                                    <InputGroupAddon>
                                        <i class="pi pi-lock"></i>
                                    </InputGroupAddon>
                                    <InputText id="helpCode1" v-model="hCode" type="text" placeholder="Enter Verification Code" :invalid="invalidHelpCode"  class="w-full" style="padding: 1rem" />
                                </InputGroup>
                                <div>
                                    <small id="help-error" class="p-error mb-5" v-if="errors.help !== ''">{{ errors.help }}</small>
                                </div>
                                <div>
                                    <small id="help-error" class="p-error mb-5" v-if="errors.helpCode !== ''">{{ errors.helpCode }}</small>
                                </div>
                            </div>
                            <Button v-if="!verifying" type="submit" label="Send" class="w-full p-3 text-xl mb-5"></Button>
                            <Button v-if="verifying" type="button" label="Next" class="w-full p-3 text-xl mb-5" @click="handleHelpCode"></Button>
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
