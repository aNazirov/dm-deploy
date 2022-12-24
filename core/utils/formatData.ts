export const formatData = (formdata: Record<string, any>) => {
	const postData = new FormData();
	const formatData: Record<string, any> = {
		...formdata,
	};

	Object.keys(formatData).forEach((key) => {
		if (![undefined, null, "undefined"].includes(formatData[key])) {
			if (Array.isArray(formatData[key])) {
				formatData[key].forEach((data: any) => {
					postData.append(key, data);
				});

				return;
			}

			if (formatData[key] instanceof Object) {
				if (Object.keys(formatData[key]).length) {
					Object.keys(formatData[key]).forEach((key2) => {
						postData.append(`${key}`, formatData[key][key2]);
					});

					return;
				} else {
					postData.append(key, formatData[key]);
				}
			} else {
				postData.append(key, formatData[key]);
			}
		}
	});

	return postData;
};
