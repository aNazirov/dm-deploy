import {IFile} from "./file.model";
import {IAutoCompleteResult} from "./global.model";
import {ePlace} from "./table.model";
import {ISpeciality, ITranslate, IUserShortInfo} from "./user.model";

export enum eReportStatusType {
	Sent = 1,
	Approved,
	Rejected,
}

export enum eMediaPlace {
	Radio = "Radio",
	TV = "TV",
	Socials = "Socials",
	Magazine = "Magazine",
	Newspaper = "Newspaper",
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
	note?: string;
}
// TODO: URGENT add what about field id here?
export interface IReportVisitsOfForeignSpecialistsCreateParamsPart {
	id?: number;
	displayName: string;
	startDate: string;
	endDate: string;
	organization: string;
	countryId: number;
	specialityId: number;
	fileId: number;
	note?: string;
}

export interface IReportVisitsOfForeignSpecialistsCreateParams {
	visitsOfForeignSpecialists: IReportVisitsOfForeignSpecialistsCreateParamsPart[];
	note?: string;
}

export interface IReportMediaPlaceCreateParams {
	mediaParts: Omit<MediaPartModel, "id">[];
	note?: string;
}

export interface IReportGetParams {
	skip: number;
	take: number;
	organizationId?: number;
	statusId?: eReportStatusType;
	start?: Date;
	end?: Date;
}

// TODO: when you start config multi-translate, make class and pass title dynamically by current language
export interface IShortOrganizationInfo {
	id: number;
	paternalId: number;
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
	files?: IFile[];
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

		if (report.files) {
			this.files = report.files;
		}
		if (report.note) {
			this.note = report.note;
		}
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
	telemedicineParts?: TelemedicinePartModel[];
	note?: string;
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: TelemedicineReportModel) {
		this.id = report.id;
		this.status = report.status;
		this.organization = report.organization;
		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);

		if (report.telemedicineParts) {
			this.telemedicineParts = report.telemedicineParts.map((p) => new TelemedicinePartModel(p));
		}

		if (report.note) {
			this.note = report.note;
		}
		if (report.user) {
			this.user = report.user;
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

export class VisitsOfForeignSpecialistsModel {
	id: number;
	visitsOfForeignSpecialists?: VisitOfForeignSpecialistModel[];
	note?: string;
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(visit: VisitsOfForeignSpecialistsModel) {
		this.id = visit.id;
		this.status = visit.status;
		this.organization = visit.organization;
		this.createdAt = new Date(visit.createdAt);
		this.updatedAt = new Date(visit.updatedAt);

		if (visit.visitsOfForeignSpecialists) {
			this.visitsOfForeignSpecialists = visit.visitsOfForeignSpecialists.map(
				(v) => new VisitOfForeignSpecialistModel(v),
			);
		}

		if (visit.user) {
			this.user = visit.user;
		}

		if (visit.note) {
			this.note = visit.note;
		}
	}
}

export class VisitOfForeignSpecialistModel {
	id: number;
	displayName: string;
	startDate: string;
	endDate: string;
	organization: string;
	country: {id: number; title: ITranslate};
	speciality: ISpeciality;
	file: IFile;

	constructor(visit: VisitOfForeignSpecialistModel) {
		this.id = visit.id;
		this.displayName = visit.displayName;
		this.startDate = visit.startDate;
		this.endDate = visit.endDate;
		this.organization = visit.organization;
		this.country = visit.country;
		this.speciality = visit.speciality;
		this.file = visit.file;
	}
}

export class MediaPlaceReportModel {
	id: number;
	mediaParts?: MediaPartModel[];
	status: IStatus;
	organization: IShortOrganizationInfo;
	note?: string;
	user?: IUserShortInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(media: MediaPlaceReportModel) {
		this.id = media.id;
		this.status = media.status;
		this.organization = media.organization;
		this.createdAt = new Date(media.createdAt);
		this.updatedAt = new Date(media.updatedAt);

		if (media.mediaParts) {
			this.mediaParts = media.mediaParts.map((p) => new MediaPartModel(p));
		}

		if (media.note) {
			this.note = media.note;
		}

		if (media.user) {
			this.user = media.user;
		}
	}
}

// TODO: type of date,endDate and startDate set as Date everywhere
export class MediaPartModel {
	id: number;
	title: string;
	place: eMediaPlace;
	date: Date;
	file: IFile;

	constructor(part: MediaPartModel) {
		this.id = part.id;
		this.title = part.title;
		this.place = part.place;
		this.file = part.file;
		this.date = new Date(part.date);
	}
}
