import {appealsReportService} from "./appealsReport.service";
import {dailyReportService} from "./dailyReport.service";
import {departureReportService} from "./departureReport.service";
import {financialExpensesReportService} from "./financialExpensesReport.service";
import {implementationReportService} from "./ImplementationReport.service";
import {insuranceReportService} from "./insuranceReport.service";
import {mediaPlaceReportService} from "./mediaPlaceReport.service";
import {scienceReportService} from "./scienceReport.service";
import {scientificEventsReportService} from "./scientificEventsReport.service";
import {scientificWorksReportService} from "./scientificWorksReport.service";
import {telemedicineReportService} from "./telemedicineReport.service";
import {trainingReportService} from "./trainingReport.service";
import {visitForeignSpecialistsReportService} from "./visitForeignSpecialistsReport.service";

export const ReportService = {
	daily: dailyReportService,
	training: trainingReportService,
	financialExpenses: financialExpensesReportService,
	telemedicine: telemedicineReportService,
	visitForeignSpecialists: visitForeignSpecialistsReportService,
	mediaPlace: mediaPlaceReportService,
	science: scienceReportService,
	scientificEvents: scientificEventsReportService,
	scientificWorks: scientificWorksReportService,
	insurance: insuranceReportService,
	implementation: implementationReportService,
	appeals: appealsReportService,
	departure: departureReportService,
};
