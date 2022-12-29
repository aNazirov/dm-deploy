import {api, APIFileUrl} from "../api";
import {FileModel} from "../models";

export const FileService = {
	post(formData: FormData) {
		return api
			.post<FileModel[]>(APIFileUrl.uploadMany, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((result) => result.data.map((f) => new FileModel(f)));
	},
};
