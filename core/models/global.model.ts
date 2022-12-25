import {ITranslate} from "./user.model";

export class GlobalListItemModel {
	id: number;
	title: ITranslate;
	createdAt: Date;
	updatedAt: Date;

	constructor(item: GlobalListItemModel) {
		this.id = item.id;
		this.title = item.title;
		this.createdAt = new Date(item.createdAt);
		this.updatedAt = new Date(item.updatedAt);
	}
}

export interface IGlobalListItem {
	title: ITranslate;
	id: number;
}
