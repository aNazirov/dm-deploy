import {IShortOrganizationInfo} from "../organization.model";
import {IStatus} from "../report.model";
import {IUserShortInfo} from "../user.model";

export class ScientificEventsReportModel {
	id: number;
	protectionDSc: number;
	protectionPhD: number;
	doctoralStudentsDSc: number;
	doctoralStudentsPhD: number;
	countDoctoralStudentsDSc: number;
	countDoctoralStudentsPhD: number;
	freeApplicantsDSc: number;
	freeApplicantsPhD: number;
	countFreeApplicantsDSc: number;
	countFreeApplicantsPhD: number;
	localConferencesOnline: number;
	localConferencesOffline: number;
	internationalConferencesOffline: number;
	internationalConferencesOnline: number;
	localWithForeignSpecialistsConferencesOffline: number;
	localWithForeignSpecialistsConferencesOnline: number;
	status: IStatus;
	organization: IShortOrganizationInfo;
	note?: string;
	user?: IUserShortInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: ScientificEventsReportModel) {
		this.id = report.id;
		this.protectionDSc = report.protectionDSc;
		this.protectionPhD = report.protectionPhD;
		this.doctoralStudentsDSc = report.doctoralStudentsDSc;
		this.doctoralStudentsPhD = report.doctoralStudentsPhD;
		this.countDoctoralStudentsDSc = report.countDoctoralStudentsDSc;
		this.countDoctoralStudentsPhD = report.countDoctoralStudentsPhD;
		this.freeApplicantsDSc = report.freeApplicantsDSc;
		this.freeApplicantsPhD = report.freeApplicantsPhD;
		this.countFreeApplicantsDSc = report.countFreeApplicantsDSc;
		this.countFreeApplicantsPhD = report.countFreeApplicantsPhD;
		this.localConferencesOnline = report.localConferencesOnline;
		this.localConferencesOffline = report.localConferencesOffline;
		this.internationalConferencesOffline = report.internationalConferencesOffline;
		this.internationalConferencesOnline = report.internationalConferencesOnline;
		this.localWithForeignSpecialistsConferencesOffline = report.localWithForeignSpecialistsConferencesOffline;
		this.localWithForeignSpecialistsConferencesOnline = report.localWithForeignSpecialistsConferencesOnline;
		this.status = report.status;
		this.organization = report.organization;
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

export interface IReportScientificEventsCreateParams {
	protectionDSc: number;
	protectionPhD: number;
	doctoralStudentsDSc: number;
	doctoralStudentsPhD: number;
	countDoctoralStudentsDSc: number;
	countDoctoralStudentsPhD: number;
	freeApplicantsDSc: number;
	freeApplicantsPhD: number;
	countFreeApplicantsDSc: number;
	countFreeApplicantsPhD: number;
	localConferencesOnline: number;
	localConferencesOffline: number;
	localWithForeignSpecialistsConferencesOffline: number;
	localWithForeignSpecialistsConferencesOnline: number;
	internationalConferencesOffline: number;
	internationalConferencesOnline: number;
	note?: string;
}
