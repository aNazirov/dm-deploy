export class FileModel {
	id: number;
	mimeType: string;
	name: string;
	originalName: string;
	path: string;
	size: number;
	url: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(file: FileModel) {
		this.id = file.id;
		this.mimeType = file.mimeType;
		this.name = file.name;
		this.originalName = file.originalName;
		this.path = file.path;
		this.size = file.size;
		this.url = file.url;
		this.createdAt = new Date(file.createdAt);
		this.updatedAt = new Date(file.updatedAt);
	}
}
