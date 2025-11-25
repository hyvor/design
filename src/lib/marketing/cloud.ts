export function isCloud(forceProd = true) {
	if (typeof window === 'undefined') {
		return false;
	}
	const hostname = window.location.hostname;
	function isDomain(domain: string) {
		return hostname === domain || hostname.endsWith(`.${domain}`);
	}

	let domains = ['hyvor.com'];
	if (forceProd === false) {
		domains.push('hyvor.localhost');
		domains.push('hyvorstaging.com');
	}

	return domains.some(isDomain);
}
