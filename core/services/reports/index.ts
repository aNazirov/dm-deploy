import {dailyReportService} from "./dailyReport.service";
import {financialExpensesReportService} from "./financialExpensesReport.service";
import {mediaPlaceReportService} from "./mediaPlaceReport.service";
import {scienceReportService} from "./scienceReport.service";
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
};
