import { toRefs, reactive, computed } from 'vue';

const layoutConfig = reactive({
    ripple: true,
    darkTheme: false,
    language: {
        code: 'ENG', 
        name: 'English',
    },
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'aura-light-green',
    scale: 14,
    activeMenuItem: null,
    isLoading: true
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});


export const useLayout = () => {
    const saveLayoutConfigToLocalStorage = (config) => {
        const runtimeConfig = useRuntimeConfig();
        if (layoutConfig.isLoading !== true) {
            localStorage.setItem(runtimeConfig.layoutConfigKey, JSON.stringify(config));
        }
    };

    const setLoaded = () => {
        layoutConfig.isLoading = false;
        saveLayoutConfigToLocalStorage(layoutConfig);
    }

    const changeThemeSettings = (theme, darkTheme) => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
        saveLayoutConfigToLocalStorage(layoutConfig);
    };

    const changeLanguageSettings = (language) => {
        layoutConfig.language = language;
        saveLayoutConfigToLocalStorage(layoutConfig);
    };

    const setScale = (scale) => {
        layoutConfig.scale = scale;
        saveLayoutConfigToLocalStorage(layoutConfig);
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
        saveLayoutConfigToLocalStorage(layoutConfig);
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return {
        layoutConfig: toRefs(layoutConfig),
        layoutState: toRefs(layoutState),
        changeThemeSettings,
        changeLanguageSettings,
        setScale,
        onMenuToggle,
        isSidebarActive,
        isDarkTheme,
        setActiveMenuItem,
        setLoaded,
    };
}