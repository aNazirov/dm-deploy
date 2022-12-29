import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppInput, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import styles from "../../../styles/reports.module.scss";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {getTrainingReportByIdThunk} from "../../../core/store/report/training/training-report.thunks";
import {setDailyReportByIdAction} from "../../../core/store/report/daily/daily-report.slices";
import {eTable} from "../../../core/models";
import Moment from "react-moment";
import {ReportPageUpdate} from "../../../components/Layout";

const TrainingListInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({trainingReport}) => trainingReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getTrainingReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setDailyReportByIdAction(null));
				};
			}
		}
	}, [reportId]);

	if (!report) return null;

	const renderFileList = () => {
		return report.files?.map((f) => (
			<div className="flex-center gap-0.5 w-max" key={f.id}>
				<label className={styles.cardBodyLabel}>
					<a href={f.url} download>
						<AppInput className="text-center" type="file" placeholder={`${f.url}`} />
					</a>
				</label>
				<AppButton variant="danger" size="square">
					<TrashIcon width="24px" height="24px" />
				</AppButton>
			</div>
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
						<th rowSpan={2}>Дата</th>
						<th colSpan={2}>Конференция, симпозиум ва х.к</th>
						<th colSpan={2}>Учеба/повышение квалификации до 10 дней</th>
						<th colSpan={2}>Учеба/повышение квалификации от 10 до 30 дней</th>
						<th colSpan={2}>Учеба/повышение квалификации более 30 дней</th>
					</tr>
					<tr>
						<th>Местные</th>
						<th>Mеждународные</th>
						<th>Местные</th>
						<th>Mеждународные</th>
						<th>Местные</th>
						<th>Mеждународные</th>
						<th>Местные</th>
						<th>Mеждународные</th>
					</tr>
				</AppTable.THead>
				<AppTable.TBody>
					<tr>
						<td>
							<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
						</td>
						<td>{report.confNational}</td>
						<td>{report.confInternational}</td>
						<td>{report.learnNationalShort}</td>
						<td>{report.learnInternationalShort}</td>
						<td>{report.learnNationalMid}</td>
						<td>{report.learnInternationalMid}</td>
						<td>{report.learnNationalLong}</td>
						<td>{report.learnInternationalLong}</td>
					</tr>
				</AppTable.TBody>
			</AppTable>

			<div className="flex-col gap-0.5">{renderFileList()}</div>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/training" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<ReportPageUpdate
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.TrainingReport}
				/>
			</div>
		</div>
	);
};

export default TrainingListInfoPage;
