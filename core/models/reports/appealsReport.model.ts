import {IFile} from "../file.model";
import {IShortOrganizationInfo, IStatus} from "../report.model";
import {IUserShortInfo} from "../user.model";

export class AppealsReportModel {
	id: number;
	complaints: number;
	questions: number;
	note?: string;
	files: IFile[];
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: AppealsReportModel) {
		this.id = report.id;
		this.complaints = report.complaints;
		this.questions = report.questions;
		this.files = report.files;
		this.status = report.status;

		if (report.note) {
			this.note = report.note;
		}

		if (report.user) {
			this.user = report.user;
		}

		this.organization = report.organization;
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);
	}
}

export interface IReportAppealsCreateParams {
	complaints: number;
	questions: number;
	files: number[];
	note?: string;
}
