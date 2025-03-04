import { browser } from '$app/environment';
import { init, register, getLocaleFromNavigator } from 'svelte-i18n';

const defaultLocale = 'en';

register('en', () => import('./locales/en.json'));
register('it', () => import('./locales/it.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? getLocaleFromNavigator()?.split('-')[0] : defaultLocale
});
