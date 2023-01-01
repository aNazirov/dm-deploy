import {eScienceType} from "../reports";
import {ePlace} from "../table.model";
import {ITranslate} from "../user.model";

export interface ISetOfReportsParams {
	take: number;
	skip: number;
	start: Date | string;
	end: Date | string;
	organizations: number[];
	allOrganizations?: boolean;
	places?: ePlace[];
	types?: eScienceType[];
	specialityId?: number;
	countryId?: number;
}

export interface ISetOfReportsAppeals {
	_sum: {
		complaints: number;
		questions: number;
	};
	createdAt: Date;
}

export interface ISetOfReportsDaily {
	_sum: {
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
	};
	createdAt: Date;
}

export interface ISetOfReportsMedia {
	id: number;
	title: string;
	place: ePlace;
	date: Date;
}

export interface ISetOfReportsInsurance {
	_sum: {
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
	};
	createdAt: Date;
}

export interface ISetOfReportsImplementation {
	_sum: {
		diagnosticMethodsRegion: number;
		diagnosticMethodsDistrict: number;
		treatmentsRegion: number;
		treatmentsDistrict: number;
	};
	place: ePlace;
}

export interface ISetOfReportsFinancialExpenses {
	_sum: {
		businessTrips: number;
		salaries: number;
		repairs: number;
		sponsorships: number;
		innovations: number;
		education: number;
		materials: number;
		inventory: number;
		socialPayments: number;
		communalPayments: number;
		outsource: number;
		otherExpenses: number;
		total: number;
	};
	createdAt: Date;
}

export interface ISetOfReportsDeparture {
	_sum: {
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
	};
	createdAt: Date;
	place: ePlace;
}

export interface ISetOfReportsVisitsOfForeignSpecialists {
	id: number;
	displayName: string;
	startDate: Date;
	endDate: Date;
	organization: string;
	country: {
		id: number;
		title: ITranslate;
	};
	speciality: {
		id: number;
		title: ITranslate;
	};
}

export interface ISetOfReportsTelemedicine {
	_sum: {
		consultations: number;
		councils: number;
		demonstrationOperations: number;
		seminars: number;
		symposiums: number;
	};
	createdAt: Date;
	place: ePlace;
}

export interface ISetOfReportsScientificEvents {
	_sum: {
		protectionDSc: number;
		protectionPhD: number;
		countDoctoralStudentsDSc: number;
		countDoctoralStudentsPhD: number;
		countFreeApplicantsDSc: number;
		countFreeApplicantsPhD: number;
		localConferencesOnline: number;
		localConferencesOffline: number;
		internationalConferencesOnline: number;
		internationalConferencesOffline: number;
		localWithForeignSpecialistsConferencesOnline: number;
		localWithForeignSpecialistsConferencesOffline: number;
	};
	createdAt: Date;
}

export interface ISetOfReportsScientificWorks {
	_sum: {
		localArticles: number;
		foreignArticles: number;
		cisArticles: number;
		scopusArticles: number;
		wosArticles: number;
		otherArticles: number;
		localLectures: number;
		foreignLectures: number;
		cisLectures: number;
		monographs: number;
		patents: number;
		benefits: number;
		recommendations: number;
	};
	createdAt: Date;
}

export interface ISetOfReportsScience {
	id: number;
	title: string;
	type: eScienceType;
	startDate: Date;
	endDate: Date;
	amount: number;
}

export interface ISetOfReportsTraining {
	_sum: {
		confNational: number;
		confInternational: number;
		learnNationalShort: number;
		learnInternationalShort: number;
		learnNationalMid: number;
		learnInternationalMid: number;
		learnNationalLong: number;
		learnInternationalLong: number;
	};
	createdAt: Date;
}
