import { building } from '$app/environment';
import { loadData } from '$lib/utils';

export const load = ({ fetch }) => {
	if (!building) {
		const data = loadData(fetch);
		return data;
	}
};
