import { browser } from '$app/environment';
import { init, register, getLocaleFromNavigator, waitLocale } from 'svelte-i18n';

const defaultLocale = 'en';

register('en', () => import('./locales/en.json'));
register('it', () => import('./locales/it.json'));

const initialLang = browser ? localStorage.getItem('lang') || getLocaleFromNavigator()?.split('-')[0] || defaultLocale : defaultLocale;

init({
	fallbackLocale: defaultLocale,
	initialLocale: initialLang
});

export const localeReady = browser ? waitLocale() : Promise.resolve();
