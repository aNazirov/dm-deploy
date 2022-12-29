import {IShortOrganizationInfo, IStatus} from "../report.model";
import {IUserShortInfo} from "../user.model";

export class ScientificWorksReportModel {
	id: number;
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
	note?: string;
	user?: IUserShortInfo;
	status: IStatus;
	organization: IShortOrganizationInfo;
	createdAt: Date;
	updatedAt: Date;

	constructor(report: ScientificWorksReportModel) {
		this.id = report.id;
		this.localArticles = report.localArticles;
		this.foreignArticles = report.foreignArticles;
		this.cisArticles = report.cisArticles;
		this.scopusArticles = report.scopusArticles;
		this.wosArticles = report.wosArticles;
		this.otherArticles = report.otherArticles;
		this.localLectures = report.localLectures;
		this.foreignLectures = report.foreignLectures;
		this.cisLectures = report.cisLectures;
		this.monographs = report.monographs;
		this.patents = report.patents;
		this.benefits = report.benefits;
		this.recommendations = report.recommendations;
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

export interface IReportCreateScientificWorksParams {
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
	note?: string;
}
