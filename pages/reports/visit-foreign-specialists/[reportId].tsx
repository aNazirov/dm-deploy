import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppInput, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import styles from "../../../styles/reports.module.scss";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {eReportStatusType, eTable} from "../../../core/models";
import Moment from "react-moment";
import {getVisitForeignSpecialistsReportByIdThunk} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.thunks";
import {setVisitForeignSpecialistsReportByIdAction} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.slices";
import {ReportPageUpdate} from "../../../components/Layout";

const VisitForeignSpecialistsListInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({visitForeignSpecialistsReport}) => visitForeignSpecialistsReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getVisitForeignSpecialistsReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setVisitForeignSpecialistsReportByIdAction(null));
				};
			}
		}
	}, [reportId]);

	if (!report) return null;

	const renderFileList = () => {
		return report.visitsOfForeignSpecialists?.map((v) => (
			<div className="flex-center gap-0.5 w-max" key={v.file.id}>
				<label className={styles.cardBodyLabel}>
					<a href={v.file.url} download>
						<AppInput className="text-center" type="file" placeholder={`${v.file.url}`} />
					</a>
				</label>
				<AppButton variant="danger" size="square">
					<TrashIcon width="24px" height="24px" />
				</AppButton>
			</div>
		));
	};

	const renderTableRow = () => {
		return report.visitsOfForeignSpecialists?.map((v) => (
			<tr key={v.id}>
				<td>{v.displayName}</td>
				<td>{v.speciality.title.ru}</td>
				<td>{v.country.title.ru}</td>
				<td>{v.organization}</td>
				<td>{<Moment format="DD.MM.YYYY">{v.startDate}</Moment>}</td>
				<td>{<Moment format="DD.MM.YYYY">{v.endDate}</Moment>}</td>
			</tr>
		));
	};

	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>{report.organization.title.ru}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">{report.organization.title.ru}</h1>

			<AppDivider className="my-1.25" />

			<AppTable wrapperClassName="mb-1.5">
				<AppTable.THead extended>
					<tr>
						<th>Ф.И.О. пребывающего специалиста</th>
						<th>Специальность</th>
						<th>Страна пребывания</th>
						<th>Место основной работы (учреждение)</th>
						<th>Срок пребывания до:</th>
						<th>Срок пребывания от:</th>
					</tr>
				</AppTable.THead>
				<AppTable.TBody>{renderTableRow()}</AppTable.TBody>
			</AppTable>

			<div className="flex-col gap-0.5">{renderFileList()}</div>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/visit-foreign-specialists" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<ReportPageUpdate
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.VisitsOfForeignSpecialistsReport}
				/>
			</div>
		</div>
	);
};

export default VisitForeignSpecialistsListInfoPage;
