export function getCookie(name: string, cookie = "") {
	const matches = cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : "";
}

export function setCookie(name: string, value: string, options: any = {}) {
	options = {
		path: "/",
		...options,
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (const optionKey in options) {
		updatedCookie += "; " + optionKey;
		const optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
	setCookie(name, "", {
		"max-age": -1,
	});
}
