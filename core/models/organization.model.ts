// TODO: when you start config multi-translate, make class and pass title dynamically by current language
import {ITranslate} from "./user.model";

export interface IShortOrganizationInfo {
	id: number;
	paternalId: number;
	title: ITranslate;
}

export interface IOrganizationCreateParams {
	title: ITranslate;
	address: string;
	itn: string;
	vatId: string;
	mfi: string;
	ccea: string;
	rcbo: string;
	mainrs: string;
	paternalId?: number;
}

export interface IOrganizationGetParams {
	skip: number;
	take: number;
}

export class OrganizationModel {
	id: number;
	title: ITranslate;
	address: string;
	itn: string;
	vatId: string;
	mfi: string;
	ccea: string;
	mainrs: string;
	rcbo: string;
	paternal: IShortOrganizationInfo;
	organizations: IShortOrganizationInfo[];

	constructor(organization: OrganizationModel) {
		this.id = organization.id;
		this.title = organization.title;
		this.address = organization.address;
		this.itn = organization.itn;
		this.vatId = organization.vatId;
		this.mfi = organization.mfi;
		this.mainrs = organization.mainrs;
		this.ccea = organization.ccea;
		this.rcbo = organization.rcbo;
		this.paternal = organization.paternal;
		this.organizations = organization.organizations;
	}
}
