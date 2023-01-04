import {IShortOrganizationInfo} from "../organization.model";
import {IStatus} from "../report.model";
import {ePlace} from "../table.model";
import {IUserShortInfo} from "../user.model";

export class DepartureReportModel {
	id: number;
	note?: string;
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	place: Exclude<ePlace, ePlace.International | ePlace.Other>;
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

		this.place = report.place;
		this.departures = report.departures;
		this.specialists = report.specialists;
		this.medicalCheckup = report.medicalCheckup;
		this.minor = report.minor;
		this.identifiedPatients = report.identifiedPatients;
		this.outPatient = report.outPatient;
		this.inPatient = report.inPatient;
		this.lessons = report.lessons;
		this.seminars = report.seminars;
		this.procedures = report.procedures;
		this.operations = report.operations;
		this.manipulations = report.manipulations;
		this.diagnosticMethodsRegion = report.diagnosticMethodsRegion;
		this.diagnosticMethodsDistrict = report.diagnosticMethodsDistrict;
		this.treatmentsRegion = report.treatmentsRegion;
		this.treatmentsDistrict = report.treatmentsDistrict;
		this.educatedSpecialists = report.educatedSpecialists;

		this.createdAt = new Date(report.createdAt);
		this.updatedAt = new Date(report.updatedAt);
	}
}

export interface IReportDepartureCreateParams {
	id?: number;
	place: Exclude<ePlace, ePlace.International | ePlace.Other>;
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
