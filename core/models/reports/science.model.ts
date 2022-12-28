import {IFile} from "../file.model";
import {IShortOrganizationInfo, IStatus} from "../report.model";
import {IUserShortInfo} from "../user.model";

export enum eScienceType {
	Fundamental = "Fundamental",
	Practice = "Practice",
	Innovational = "Innovational",
	Foreign = "Foreign",
	Joint = "Joint",
}

export class SciencePartModel {
	id: number;
	title: string;
	type: eScienceType;
	amount: number;
	startDate: Date;
	endDate: Date;
	file: IFile;

	constructor(part: SciencePartModel) {
		this.id = part.id;
		this.title = part.title;
		this.type = part.type;
		this.amount = part.amount;
		this.file = part.file;
		this.startDate = new Date(part.startDate);
		this.endDate = new Date(part.endDate);
	}
}

export class ScienceReportModel {
	id: number;
	scienceParts: SciencePartModel[] = [];
	note?: string;
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: ScienceReportModel) {
		this.id = report.id;
		this.organization = report.organization;
		this.status = report.status;
		this.scienceParts = report.scienceParts?.map((p) => new SciencePartModel(p)) ?? [];
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);

		if (report.note) {
			this.note = report.note;
		}

		if (report.user) {
			this.user = report.user;
		}
	}
}

export interface IReportScienceCreateParams {
	scienceParts: {
		title: string;
		type: eScienceType;
		amount: number;
		startDate: Date;
		endDate: Date;
		fileId: number;
		// custom field:
		fileName?: string;
	}[];
}
