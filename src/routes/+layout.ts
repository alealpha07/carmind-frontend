import { browser } from '$app/environment';
import '$lib/i18n';
import { locale, waitLocale, getLocaleFromNavigator } from 'svelte-i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	if (browser) {
		locale.set(getLocaleFromNavigator()?.split('-')[0]);
	}
	await waitLocale();
};
