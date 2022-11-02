import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const stakeKey: string | null = url.searchParams.get('stakeKey') ?? null;

	if (!stakeKey) {
		throw error(400, 'Missing parameter: stakeKey');
	}

	let response;

	try {
		response = await fetch('https://vm.adaseal.eu/api.php?action=delivered_rewards&staking_address=' + stakeKey, {
			headers: {
				Authentication: 'Bearer Token',
				'X-API-Token': '<apikey here>',
				'Content-Type': 'application/json',
				accept: 'application/json'
			}
		});
	} catch (e) {
		console.log(response);
	}

	const result = response ? await response.json() : null;

	return json({ data: result });
};
