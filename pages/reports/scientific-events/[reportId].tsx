import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {ReportPageUpdate} from "../../../components/Layout";
import {getScientificEventsReportByIdThunk} from "../../../core/store/report/scientificEvents/scientific-events-report.thunks";
import {setScientificEventsReportByIdAction} from "../../../core/store/report/scientificEvents/scientific-events-report.slices";
import {eTable} from "../../../core/models";
import {FileService} from "../../../core/services";

const ScientificEventsReportPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({scientificEventsReport}) => scientificEventsReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getScientificEventsReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setScientificEventsReportByIdAction(null));
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
						<th colSpan={2}>Защиты</th>
						<th colSpan={4}>Докторанты</th>
						<th colSpan={4}>Свободные соискатели</th>
						<th colSpan={8}>Научные коференции (количество)</th>
					</tr>
					<tr>
						<th colSpan={2}>Количество</th>
						<th colSpan={2}>Количество</th>
						<th colSpan={2}>Шифр</th>
						<th colSpan={2}>Количество</th>
						<th colSpan={2}>Шифр</th>
						<th colSpan={2}>Местные</th>
						<th colSpan={2}>Местные с участием международных специалистов</th>
						<th colSpan={2}>Международные</th>
					</tr>
					<tr>
						<th>DSc</th>
						<th>PhD</th>
						<th>DSc</th>
						<th>PhD</th>
						<th>DSc</th>
						<th>PhD</th>
						<th>DSc</th>
						<th>PhD</th>
						<th>DSc</th>
						<th>PhD</th>
						<th>Оффлайн</th>
						<th>Онлайн</th>
						<th>Оффлайн</th>
						<th>Онлайн</th>
						<th>Оффлайн</th>
						<th>Онлайн</th>
					</tr>
				</AppTable.THead>
				<AppTable.TBody>
					<tr>
						<td>{report.protectionDSc}</td>
						<td>{report.protectionPhD}</td>
						<td>{report.countDoctoralStudentsDSc}</td>
						<td>{report.doctoralStudentsDSc}</td>
						<td>{report.countDoctoralStudentsPhD}</td>
						<td>{report.doctoralStudentsPhD}</td>
						<td>{report.countFreeApplicantsDSc}</td>
						<td>{report.freeApplicantsDSc}</td>
						<td>{report.countFreeApplicantsPhD}</td>
						<td>{report.freeApplicantsPhD}</td>
						<td>{report.localConferencesOffline}</td>
						<td>{report.localConferencesOnline}</td>
						<td>{report.localWithForeignSpecialistsConferencesOffline}</td>
						<td>{report.localWithForeignSpecialistsConferencesOnline}</td>
						<td>{report.internationalConferencesOffline}</td>
						<td>{report.internationalConferencesOnline}</td>
					</tr>
				</AppTable.TBody>
			</AppTable>

			<div className="flex-col gap-0.5 mb-2.5">{renderFileList()}</div>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/scientific-events" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<ReportPageUpdate
					reportOrganizationId={report.organization.id}
					reportCreatorId={report.user?.id}
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.ScientificEventsReport}
				/>
			</div>
		</div>
	);
};

export default ScientificEventsReportPage;
