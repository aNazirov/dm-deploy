import {IShortOrganizationInfo} from "../organization.model";
import {IStatus} from "../report.model";
import {ePlace} from "../table.model";
import {IUserShortInfo} from "../user.model";

export class ImplementationReportModel {
	id: number;
	implementationParts?: ImplementationPartModel[];
	note?: string;
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: ImplementationReportModel) {
		this.id = report.id;
		this.status = report.status;
		this.organization = report.organization;
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);

		if (report.implementationParts) {
			this.implementationParts = report.implementationParts.map((p) => new ImplementationPartModel(p));
		}

		if (report.note) {
			this.note = report.note;
		}

		if (report.user) {
			this.user = report.user;
		}
	}
}

export class ImplementationPartModel {
	id: number;
	place: Exclude<ePlace, ePlace.International>;
	diagnosticMethodsRegion: number;
	diagnosticMethodsDistrict: number;
	treatmentsRegion: number;
	treatmentsDistrict: number;

	constructor(part: ImplementationPartModel) {
		this.id = part.id;
		this.place = part.place;
		this.diagnosticMethodsRegion = part.diagnosticMethodsRegion;
		this.diagnosticMethodsDistrict = part.diagnosticMethodsDistrict;
		this.treatmentsRegion = part.treatmentsRegion;
		this.treatmentsDistrict = part.treatmentsDistrict;
	}
}

export interface IReportImplementationPartCreateParams {
	id?: number;
	place: Exclude<ePlace, ePlace.International>;
	diagnosticMethodsRegion: number;
	diagnosticMethodsDistrict: number;
	treatmentsRegion: number;
	treatmentsDistrict: number;
}

export interface IReportImplementationCreateParams {
	implementationParts: IReportImplementationPartCreateParams[];
	note?: string;
}
