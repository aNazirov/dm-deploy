import {api, APISetOfReportsExportUrl, APISetOfReportsUrl} from "../../api";
import {ISetOfReportsParams} from "../../models";

export const setOfReportsService = {
	get<R>({url, params}: {url: keyof typeof APISetOfReportsUrl; params: ISetOfReportsParams}): Promise<R> {
		return api.get(APISetOfReportsUrl[url], {params: {params: JSON.stringify(params)}}).then((res) => res.data);
	},
	export({url, params}: {url: keyof typeof APISetOfReportsUrl; params: ISetOfReportsParams}) {
		return api.post(APISetOfReportsExportUrl[url], params, {responseType: "blob"}).then((res) => {
			const url = window.URL.createObjectURL(new Blob([res.data]));

			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${params.start}-${params.end}.xlsx`); //or any other extension
			document.body.appendChild(link);

			link.click();

			link.parentNode?.removeChild(link);
			URL.revokeObjectURL(url);
			return res.data;
		});
	},
};
