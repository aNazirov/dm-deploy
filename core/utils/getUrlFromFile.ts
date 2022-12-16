export const getURLFromFile = (file: File): Promise<string | ArrayBuffer> => {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target && e.target.result) return res(e.target.result);
		};
		reader.onerror = (e) => rej(e);
		reader.readAsDataURL(file);
	});
};
