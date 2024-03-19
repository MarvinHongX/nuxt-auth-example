<script setup>
const { authUser } = await useAuth()
const { mainUrl } = useImg();
definePageMeta({
    middleware: ['user-only']
});

watch(authUser, () => {
    if (authUser.userId == '') goToSignInPage();
});

</script>

<template>
    <div>
        {{ users }}
    </div>
    <div class="grid grid-nogutter surface-section text-800">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
                <span class="block text-6xl font-bold mb-1">Create the screens your</span>
                <div class="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
                <p class="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                <Button label="Learn More" type="button" class="mr-3 p-button-raised"></Button>
                <Button label="Live Demo" type="button" class="p-button-outlined"></Button>
            </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);">
            <img :src="mainUrl" alt="main image" class="md:ml-auto block md:h-full" style="max-width: 100%; max-height: 100%;">
        </div>

    </div>

    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
        <div class="text-900 font-bold text-6xl mb-4 text-center">Pricing Plans</div>
        <div class="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>

        <div class="grid">
            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">Basic</div>
                        <div class="text-600">Plan description</div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <div class="flex align-items-center">
                            <span class="font-bold text-2xl text-900">$9</span>
                            <span class="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <ul class="list-none p-0 m-0 flex-grow-1">
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Arcu vitae elementum</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Dui faucibus in ornare</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Morbi tincidunt augue</span>
                            </li>
                        </ul>
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                        <Button label="Buy Now" class="p-3 w-full mt-auto"></Button>
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">Premium</div>
                        <div class="text-600">Plan description</div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <div class="flex align-items-center">
                            <span class="font-bold text-2xl text-900">$29</span>
                            <span class="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <ul class="list-none p-0 m-0 flex-grow-1">
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Arcu vitae elementum</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Dui faucibus in ornare</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Morbi tincidunt augue</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Duis ultricies lacus sed</span>
                            </li>
                        </ul>
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
                        <Button label="Buy Now" class="p-3 w-full"></Button>
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">Enterprise</div>
                        <div class="text-600">Plan description</div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <div class="flex align-items-center">
                            <span class="font-bold text-2xl text-900">$49</span>
                            <span class="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <ul class="list-none p-0 m-0 flex-grow-1">
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Arcu vitae elementum</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Dui faucibus in ornare</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Morbi tincidunt augue</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Duis ultricies lacus sed</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Imperdiet proin</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Nisi scelerisque</span>
                            </li>
                        </ul>
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
                        <Button label="Buy Now" class="p-3 w-full p-button-outlined"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
