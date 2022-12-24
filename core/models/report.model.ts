import {ePlace} from "./table.model";
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
	note?: string;
}

export interface IReportTrainingCreateParams {
	confNational: number;
	confInternational: number;
	learnNationalShort: number;
	learnInternationalShort: number;
	learnNationalMid: number;
	learnInternationalMid: number;
	learnNationalLong: number;
	learnInternationalLong: number;
	note?: string;
	files?: number[];
}

export interface IReportFinancialExpensesCreateParams {
	businessTrips: number;
	salaries: number;
	repairs: number;
	sponsorships: number;
	innovations: number;
	education: number;
	materials: number;
	inventory: number;
	otherExpenses: number;
	socialPayments: number;
	communalPayments: number;
	outsource: number;
	total: number;
	note?: string;
}

export interface IReportTelemedicineCreateParams {
	telemedicineParts: Omit<TelemedicinePartModel, "id">[];
}

export interface IReportDailyGetParams {
	skip: number;
	take: number;
	organizationId?: number;
	statusId?: eReportStatusType;
	start?: string;
	end?: string;
}

export interface IReportTrainingGetParams {
	skip: number;
	take: number;
	organizationId?: number;
	statusId?: eReportStatusType;
	start?: string;
	end?: string;
}

export interface IReportFinancialExpensesGetParams {
	skip: number;
	take: number;
	organizationId?: number;
	statusId?: eReportStatusType;
	start?: string;
	end?: string;
}

export interface IReportTelemedicineGetParams {
	skip: number;
	take: number;
	organizationId?: number;
	statusId?: number;
	start?: string;
	end?: string;
}

// TODO: when you start config multi-translate, make class and pass title dynamically by current language
export interface IShortOrganizationInfo {
	id: number;
	title: ITranslate;
}

export interface IStatus {
	id: eReportStatusType;
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
	note?: string;

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

		if (report.note) this.note = report.note;
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
	note?: string;

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

		if (report.note) this.note = report.note;
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
	socialPayments: number;
	communalPayments: number;
	outsource: number;
	total: number;
	otherExpenses: number;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;
	note?: string;

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
		this.socialPayments = report.socialPayments;
		this.communalPayments = report.communalPayments;
		this.outsource = report.outsource;
		this.total = report.total;
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);

		if (report.note) this.note = report.note;
	}
}

export class TelemedicineReportModel {
	id: number;
	telemedicineParts: TelemedicinePartModel[];
	note?: string;
	user?: any;
	status: eReportStatusType;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: TelemedicineReportModel) {
		this.id = report.id;
		this.status = report.status;
		this.organization = report.organization;
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);
		this.telemedicineParts = report.telemedicineParts.map((p) => new TelemedicinePartModel(p));

		if (report.note) {
			this.note = report.note;
		}
		if (report.user) {
			console.log(report.user);
		}
	}
}

export class TelemedicinePartModel {
	id: number;
	consultations: number;
	councils: number;
	demonstrationOperations: number;
	seminars: number;
	symposiums: number;
	place: ePlace;
	note?: string;

	constructor(part: TelemedicinePartModel) {
		this.id = part.id;
		this.consultations = part.consultations;
		this.councils = part.councils;
		this.demonstrationOperations = part.demonstrationOperations;
		this.seminars = part.seminars;
		this.symposiums = part.symposiums;
		this.place = part.place;

		if (part.note) {
			this.note = part.note;
		}
	}
}
