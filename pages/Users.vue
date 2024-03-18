<script setup>
const { authUser } = await useAuth();
const { flag_placeholderUrl } = useImg();
const users = ref(null);
const usersParams = ref({
    currentPage: 1,
    pageSize: 20,
    totalRecords: 1
});
const loading1 = ref(true);
definePageMeta({
    middleware: ['admin-only']
});

watch(authUser, () => {
    goToSignInPage();
});

const onUsersPage = (event) => {
    usersParams.value.currentPage = event.page + 1;
    getUsersForPage();
};

const getUsersForPage = async () => {
    if (authUser.value) {
        const data = await $fetch('/api/user/users', {
            headers: useRequestHeaders(['cookie'])
        });
        users.value = data.users;
        loading1.value = false;
    }
};

onMounted(() => {
    getUsersForPage();
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-if="!loading1"> Users </h5>
                <DataTable
                    :value="users"
                    lazy 
                    paginator
                    :first="((usersParams.currentPage - 1) * usersParams.pageSize) + 1"
                    :rows="usersParams.pageSize"
                    :totalRecords="usersParams.totalRecords"
                    showGridlines
                    dataKey="userId"
                    filterDisplay="menu"
                    :loading="loading1"
                    :currentPage="usersParams.currentPage - 1"
                    @page="onUsersPage($event)"
                >
                    <template #empty v-if="!loading1"> No data found. </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column field="userId">
                        <template #header v-if="!loading1"> ID </template>
                        <template #body="{ data }">
                            {{ data.userId }}
                        </template>
                    </Column>
                    <Column field="password">
                        <template #header v-if="!loading1"> Password </template>
                        <template #body="{ data }">
                            {{ shortenStr(data.password) }}
                        </template>
                    </Column>
                    <Column field="name">
                        <template #header v-if="!loading1"> Name </template>
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                    </Column>
                    <Column field="phone">
                        <template #header v-if="!loading1"> Phone </template>
                        <template #body="{ data }">
                            {{ getFormattedPhoneNumber(data.phone) }}
                        </template>
                    </Column>
                    <Column field="country">
                        <template #header v-if="!loading1"> Country </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <img alt="flag" :src="flag_placeholderUrl" :class="`flag flag-${getCountryCodeByPhoneCode(data.phone.country)}`" style="width: 24px" />
                            </div>
                        </template>
                    </Column>
                    <Column field="userFg" filterField="userFg">
                        <template #header v-if="!loading1"> User Flag</template>
                        <template #body="{ data }">
                            {{ getUserFgName(data.userFg) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}

:deep(.p-datatable-loading-overlay) {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>