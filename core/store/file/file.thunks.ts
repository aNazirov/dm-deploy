import {createAsyncThunk} from "@reduxjs/toolkit";

import {FileService} from "../../services";

export const deleteFileThunk = createAsyncThunk("file/deleteFileThunk", async (id: number) => {
	return await FileService.delete(id);
});

export const downloadFileThunk = createAsyncThunk(
	"file/downloadFileThunk",
	async (payload: {url: string; name: string}) => {
		await FileService.download(payload.url, payload.name);
	},
);
