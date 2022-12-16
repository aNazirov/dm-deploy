import {ITranslate} from "./user.model";

export enum eReportStatusType {
	Sent = 1,
	Approved,
	Rejected,
}
export interface IReportDailyCreateParams {
	freeBeds: number;
	occupiedBeds: number;
	totalBeds: number;
	outPatients: number;
	inPatients: number;
	outPatientsRes: number;
	inPatientsRes: number;
	otherPatientsRes: number;
	polyclinicCash: number;
	polyclinicReceiptsCash: number;
	hospitalCash: number;
	hospitalReceiptsCash: number;
	gfms: number;
	otherReceipts: number;
}
export interface IReportDailyGetParams {
	skip: number;
	take: number;
	organizationId?: number;
	statusId?: number;
	start?: string;
	end?: string;
}

export interface IShortOrganizationInfo {
	id: number;
	title: ITranslate;
}

export interface IStatus {
	id: number;
	title: ITranslate;
}

export class DailyReportModel {
	id: number;
	freeBeds: number;
	occupiedBeds: number;
	totalBeds: number;
	outPatients: number;
	inPatients: number;
	outPatientsRes: number;
	inPatientsRes: number;
	otherPatientsRes: number;
	polyclinicCash: number;
	polyclinicReceiptsCash: number;
	hospitalCash: number;
	hospitalReceiptsCash: number;
	gfms: number;
	otherReceipts: number;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;
	notes?: string;

	constructor(report: DailyReportModel) {
		this.id = report.id;
		this.freeBeds = report.freeBeds;
		this.occupiedBeds = report.occupiedBeds;
		this.totalBeds = report.totalBeds;
		this.outPatients = report.outPatients;
		this.inPatients = report.inPatients;
		this.outPatientsRes = report.outPatientsRes;
		this.inPatientsRes = report.inPatientsRes;
		this.otherPatientsRes = report.otherPatientsRes;
		this.polyclinicCash = report.polyclinicCash;
		this.polyclinicReceiptsCash = report.polyclinicReceiptsCash;
		this.hospitalCash = report.hospitalCash;
		this.hospitalReceiptsCash = report.hospitalReceiptsCash;
		this.gfms = report.gfms;
		this.otherReceipts = report.otherReceipts;
		this.status = report.status;
		this.organization = report.organization;
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);

		if (report.notes) this.notes = report.notes;
	}
}

export class TrainingReportModel {
	id: number;
	confNational: number;
	confInternational: number;
	learnNationalShort: number;
	learnInternationalShort: number;
	learnNationalMid: number;
	learnInternationalMid: number;
	learnNationalLong: number;
	learnInternationalLong: number;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;
	notes?: string;

	constructor(report: TrainingReportModel) {
		this.id = report.id;
		this.confNational = report.confNational;
		this.confInternational = report.confInternational;
		this.learnNationalShort = report.learnNationalShort;
		this.learnInternationalShort = report.learnInternationalShort;
		this.learnNationalMid = report.learnNationalMid;
		this.learnInternationalMid = report.learnInternationalMid;
		this.learnNationalLong = report.learnNationalLong;
		this.learnInternationalLong = report.learnInternationalLong;
		this.status = report.status;
		this.organization = report.organization;
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);

		if (report.notes) this.notes = report.notes;
	}
}

export class FinancialExpensesReportModel {
	id: number;
	businessTrips: number;
	salaries: number;
	repairs: number;
	sponsorships: number;
	innovations: number;
	education: number;
	materials: number;
	inventory: number;
	expenses: number;
	otherExpenses: number;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;
	notes?: string;

	constructor(report: FinancialExpensesReportModel) {
		this.id = report.id;
		this.businessTrips = report.businessTrips;
		this.salaries = report.salaries;
		this.repairs = report.repairs;
		this.sponsorships = report.sponsorships;
		this.innovations = report.innovations;
		this.education = report.education;
		this.materials = report.materials;
		this.inventory = report.inventory;
		this.expenses = report.expenses;
		this.otherExpenses = report.otherExpenses;
		this.status = report.status;
		this.organization = report.organization;
		this.id = report.id;
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);

		if (report.notes) this.notes = report.notes;
	}
}
