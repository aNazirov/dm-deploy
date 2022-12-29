import {IShortOrganizationInfo, IStatus} from "../report.model";
import {IUserShortInfo} from "../user.model";

export class InsuranceReportModel {
	id: number;
	annualAmount: number;
	fundedAmount: number;
	patients: number;

	acts: number;
	amountOfActs: number;

	approvedActs: number;
	amountOfApprovedActs: number;

	rejectedActs: number;
	amountOfRejectedActs: number;
	amountOfSentApprovedInvoices: number;

	residualAmount: number;
	note?: string;
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: InsuranceReportModel) {
		this.id = report.id;
		this.annualAmount = report.annualAmount;
		this.fundedAmount = report.fundedAmount;
		this.patients = report.patients;
		this.acts = report.acts;
		this.amountOfActs = report.amountOfActs;
		this.approvedActs = report.approvedActs;
		this.amountOfApprovedActs = report.amountOfApprovedActs;
		this.rejectedActs = report.rejectedActs;
		this.amountOfRejectedActs = report.amountOfRejectedActs;
		this.residualAmount = report.residualAmount;
		this.amountOfSentApprovedInvoices = report.amountOfSentApprovedInvoices;
		this.status = report.status;
		this.organization = report.organization;

		if (report.note) {
			this.note = report.note;
		}

		if (report.user) {
			this.user = report.user;
		}

		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);
	}
}

// TODO: URGENT add note all create interfaces
export interface IReportInsuranceCreateParams {
	annualAmount: number;
	acts: number;
	amountOfActs: number;
	approvedActs: number;
	amountOfApprovedActs: number;
	rejectedActs: number;
	amountOfRejectedActs: number;
	amountOfSentApprovedInvoices: number;
	note?: string;
}
