import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppCard, AppDivider, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {eTable} from "../../../core/models";
import {getMediaPlaceReportByIdThunk} from "../../../core/store/report/mediaPlace/mediaPlace.thunks";
import {setMediaPlaceReportByIdAction} from "../../../core/store/report/mediaPlace/mediaPlace.slices";
import Moment from "react-moment";
import {ReportPageUpdate} from "../../../components/Layout";
import {FileService} from "../../../core/services";

const MediaPlaceReportInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({mediaPlaceReport}) => mediaPlaceReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getMediaPlaceReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setMediaPlaceReportByIdAction(null));
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
		return report.mediaParts?.map((f) => (
			<div className="d-flex gap-0.5 w-max" key={f.id}>
				<AppButton
					variant="print"
					size="lg"
					onClick={downloadFile(f.file.url, f.file.name)}
					className="text-center"
					type="button"
				>
					{f.file.name}
				</AppButton>
			</div>
		));
	};

	const renderTableBodyRows = () => {
		return report.mediaParts?.map((part) => (
			<tr key={part.id}>
				<td>{part.title}</td>
				<td>{part.place}</td>
				<td>
					<Moment format="DD.MM.YYYY">{part.date}</Moment>
				</td>
			</tr>
		));
	};

	return (
		<>
			<Head>
				<title>{report.organization.title.ru}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">{report.organization.title.ru}</h1>

			<AppDivider className="my-1.25" />

			<AppCard shadow="table" className="mb-1.5">
				<AppTable wrapperClassName="p-0">
					<AppTable.THead extended>
						<tr>
							<th>Тема</th>
							<th>Место публикации</th>
							<th>Дата</th>
						</tr>
					</AppTable.THead>
					<AppTable.TBody>{renderTableBodyRows()}</AppTable.TBody>
				</AppTable>
			</AppCard>

			<div className="flex-col gap-0.5">{renderFileList()}</div>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/media-place" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<ReportPageUpdate
					reportOrganizationId={report.organization.id}
					reportCreatorId={report.user?.id}
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.MediaReport}
				/>
			</div>
		</>
	);
};

export default MediaPlaceReportInfoPage;
