import {IShortOrganizationInfo, IStatus} from "../report.model";
import {ePlace} from "../table.model";
import {IUserShortInfo} from "../user.model";

export class DepartureReportModel {
	id: number;
	departureParts?: DeparturePartModel[];
	note?: string;
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: DepartureReportModel) {
		this.id = report.id;
		this.status = report.status;
		this.organization = report.organization;

		if (report.note) {
			this.note = report.note;
		}

		if (report.user) {
			this.user = report.user;
		}

		if (report.departureParts) {
			this.departureParts = report.departureParts.map((p) => new DeparturePartModel(p));
		}

		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);
	}
}

export class DeparturePartModel {
	id: number;
	place: Exclude<ePlace, ePlace.Intenational | ePlace.Other>;
	departures: number;
	specialists: number;
	medicalCheckup: number;
	minor: number;

	identifiedPatients: number;
	outPatient: number;
	inPatient: number;

	lessons: number;
	seminars: number;
	procedures: number;

	operations: number;
	manipulations: number;

	diagnosticMethodsRegion: number;
	diagnosticMethodsDistrict: number;

	treatmentsRegion: number;
	treatmentsDistrict: number;

	educatedSpecialists: number;

	constructor(part: DeparturePartModel) {
		this.id = part.id;
		this.place = part.place;
		this.departures = part.departures;
		this.specialists = part.specialists;
		this.medicalCheckup = part.medicalCheckup;
		this.minor = part.minor;
		this.identifiedPatients = part.identifiedPatients;
		this.outPatient = part.outPatient;
		this.inPatient = part.inPatient;
		this.lessons = part.lessons;
		this.seminars = part.seminars;
		this.procedures = part.procedures;
		this.operations = part.operations;
		this.manipulations = part.manipulations;
		this.diagnosticMethodsRegion = part.diagnosticMethodsRegion;
		this.diagnosticMethodsDistrict = part.diagnosticMethodsDistrict;
		this.treatmentsRegion = part.treatmentsRegion;
		this.treatmentsDistrict = part.treatmentsDistrict;
		this.educatedSpecialists = part.educatedSpecialists;
	}
}

export interface IReportDepartureCreateParams {
	id?: number;
	place: Exclude<ePlace, ePlace.Intenational | ePlace.Other>;
	departures: number;
	specialists: number;
	medicalCheckup: number;
	minor: number;
	identifiedPatients: number;
	outPatient: number;
	inPatient: number;
	lessons: number;
	seminars: number;
	procedures: number;
	operations: number;
	manipulations: number;
	diagnosticMethodsRegion: number;
	diagnosticMethodsDistrict: number;
	treatmentsRegion: number;
	treatmentsDistrict: number;
	educatedSpecialists: number;
	note?: string;
}
