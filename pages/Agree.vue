<script setup>
import { ref } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
// const agreeAll = ref(false);
// const agrees = ref([]);
const agreeAll = ref(true);
const agrees = ref(["agree1", "agree2"]);
const { signUpAgree } = await useAuth()
const { logoUrl } = useImg();


const agreeButtonEnabled = computed(() => {
    return agrees.value.includes("agree1") && agrees.value.includes("agree2");
});

definePageMeta({
    layout: false,
    middleware: ['signed-in']
});

const onClickAgreeAll = (checked) => {
    if (checked) {
        agrees.value = ["agree1", "agree2"];        
    } else {
        agrees.value = [];
    }
}

const onClickAgree1 = (checked) => {
    agreeAll.value = (checked && agrees.value.includes("agree2"));
}

const onClickAgree2 = (checked) => {
    agreeAll.value = (agrees.value.includes("agree1") && checked);
}


const handleAgree = async () => {
    try {
        const data = await signUpAgree({
            agrees: agrees.value,
        });
        if (data && data.token && data.token !== '') {
            goToSignUpPage(data.token);
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}






</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="agree flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <a @click="goToSignInPage()">
                        <img :src="logoUrl" alt="logo" class="mb-5 w-6rem flex-shrink-0 cursor-pointer" />
                    </a>
                    <form @submit.prevent="handleAgree">
                        <div class="mb-8">
                            <div class="flex align-items-center text-900 text-2xl font-medium">
                                <Checkbox v-model="agreeAll" inputId="agreeAll" name="agreeAll" binary @click="onClickAgreeAll($event.target.checked)"/>
                                <label for="agreeAll" class="ml-2"> Agree with all terms and conditions </label>
                            </div>
                            <div class="card border-none mb-4 flex align-items-center">
                                <ScrollPanel>
                                    <p>
                                        Agree to all of the following terms and conditions of NUXT-AUTH-EXAMPLE: 
                                        Terms of Service; Privacy Policy.
                                    </p>
                                </ScrollPanel>
                            </div> 
                            <div class="flex align-items-center text-900 text-xl font-medium mb-3">
                                <Checkbox v-model="agrees" inputId="agree1" name="agree1" value="agree1" @click="onClickAgree1($event.target.checked)" />
                                <label for="agree1" class="ml-2">[Required] Terms of Service </label>
                            </div>
                            <div class="term card flex align-items-center mb-4">
                                <ScrollPanel>
                                    <p>
                                        <h6>Welcome to nuxt-auth-example!</h6>
Thank you for using our services and products (“nuxt-auth-example Service(s)” or “Service(s)”). These nuxt-auth-example Terms of Service define the relationship between nuxt-auth-example Corporation (“nuxt-auth-example”), which provides nuxt-auth-example Services, and members of nuxt-auth-example (“Member(s)”) or non-members, who use such Services, with regard to the use of various nuxt-auth-example Services, and contain useful information which may help you use nuxt-auth-example Services. By using our Services, you aCre deemed to have been notified of nuxt-auth-example Terms of Service, and by signing up as a Member, you are deemed to agree to be bound by these nuxt-auth-example Terms of Service and additional relevant operation policies. Please take a moment to read these nuxt-auth-example Terms of Service carefully.

By using our Services, you are deemed to have been notified of nuxt-auth-example Terms of Service, and by signing up as a Member, you are deemed to agree to be bound by these nuxt-auth-example Terms of Service and additional relevant operation policies. Please take a moment to read these nuxt-auth-example Terms of Service carefully.
                                    </p>
                                </ScrollPanel>
                            </div>
                            <div class="flex align-items-center text-900 text-xl font-medium mb-3">
                                <Checkbox v-model="agrees" inputId="agree2" name="agree2" value="agree2" @click="onClickAgree2($event.target.checked)" />
                                <label for="agree2" class="ml-2">[Required] Privacy Policy </label>
                            </div>
                            <div class="term card flex align-items-center mb-4">
                                <ScrollPanel>
                                    <p>
                                       <h6>1. What Privacy Policy Means for Our Users</h6>
                                       <h6>2. Personal Information Collected</h6>
                                       <h6>3. Use of Collected Personal Information</h6>
                                       <h6>4. Provision & Entrustment of Personal Information</h6>
                                       <h6>5. Destruction of Personal Information</h6>
                                       <h6>6. Rights of Users & Legal Representatives and Exercising Those Rights</h6>
                                       <h6>7. Actions Taken to Protect Personal Information</h6>
                                       <h6>8. Chief Privacy Officer & Responsible Personnel</h6>
                                       <h6>9. Processing personal location information</h6>
                                       <h6>10. Application of this Privacy Policy</h6>
                                       <h6>11. Obligation to Notify Prior to Amendment</h6>
                                    </p>
                                </ScrollPanel>
                            </div> 
                        </div>
                        <Button type="submit" label="Agree" class="w-full p-3 text-xl mb-5" :disabled="!agreeButtonEnabled"></Button>
                    </form> 
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped lang="scss">
:deep(.agree) {
    width: 40rem;
}

:deep(.card .p-scrollpanel) {
    width: 100%;
    height: 100%;
}

:deep(.card) {
    height: 9rem;
}

:deep(.term) {
    height: 20rem;
}

</style>
