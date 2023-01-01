import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppInput, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import styles from "../../../styles/reports.module.scss";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {getAppealsReportByIdThunk} from "../../../core/store/report/appeals/appeals-report.thunks";
import {setAppealsReportByIdAction} from "../../../core/store/report/appeals/appeals-report.slices";
import {eTable} from "../../../core/models";
import Moment from "react-moment";
import {ReportPageUpdate} from "../../../components/Layout";
import {FileService} from "../../../core/services";

const AppealsReportInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({appealsReport}) => appealsReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getAppealsReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setAppealsReportByIdAction(null));
				};
			}
		}
	}, [reportId]);

	if (!report) return null;

	const downloadFile =
		(url: string, name = "file") =>
		() => {
			FileService.download(url, name);
		};

	const renderFileList = () => {
		return report.files?.map((f) => (
			<div className="d-flex gap-0.5 w-max" key={f.id}>
				<AppButton
					variant="print"
					size="lg"
					onClick={downloadFile(f.url, f.name)}
					className="text-center"
					type="button"
				>
					{f.name}
				</AppButton>
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
						<th>Дата</th>
						<th>Жалобы</th>
						<th>Задачи по другим темам</th>
					</tr>
				</AppTable.THead>
				<AppTable.TBody>
					<tr>
						<td>
							<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
						</td>
						<td>{report.complaints}</td>
						<td>{report.questions}</td>
					</tr>
				</AppTable.TBody>
			</AppTable>

			<div className="flex-col gap-0.5">{renderFileList()}</div>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/appeals" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<ReportPageUpdate
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.AppealsReport}
				/>
			</div>
		</div>
	);
};

export default AppealsReportInfoPage;
