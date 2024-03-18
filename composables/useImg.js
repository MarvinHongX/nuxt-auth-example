const { layoutConfig } = useLayout();

export const useImg = () => {
    
    const logoUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-light' : 'logo-dark'}.svg`;
    });

    const darkModeUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'dark-mode-light' : 'dark-mode'}.svg`;
    });

    const lightModeUrl = computed(() => {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'light-mode-light' : 'light-mode'}.svg`;
    });

    const mainUrl = computed(() => {
        return `/layout/images/main.jpg`;
    });

    const flag_placeholderUrl = computed(() => {
        return `/layout/images/flag/flag_placeholder.png`;
    });

    return {
        logoUrl,
        darkModeUrl,
        lightModeUrl,
        mainUrl,
        flag_placeholderUrl,
    };
};