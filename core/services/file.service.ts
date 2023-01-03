import {api, APIFileUrl} from "../api";
import {FileModel} from "../models";

export const FileService = {
	post(formData: FormData) {
		return api
			.post<FileModel[]>(
				APIFileUrl.uploadMany,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
				{
					pending: false,
					success: false,
				},
			)
			.then((result) => result.data.map((f) => new FileModel(f)));
	},
	delete(id: number) {
		return api.delete(`${APIFileUrl.delete}/${id}`).then((res) => res.data);
	},
	download(fileURL: string, name: string) {
		api.get(fileURL, {responseType: "blob"}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));

			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", name); //or any other extension
			document.body.appendChild(link);

			link.click();

			link.parentNode?.removeChild(link);
			URL.revokeObjectURL(url);
		});
	},
};
