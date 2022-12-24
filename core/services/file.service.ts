import api from "../api";
import {FileModel} from "../models";
const url = process.env.NEXT_PUBLIC_FILE_API_URL;

export const FileService = {
	post(formData: FormData) {
		return api
			.post<FileModel[]>(`${url}/file/upload-many`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((result) => result.data.map((f) => new FileModel(f)));
	},
};
