import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppCard, AppDivider, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {eReportStatusType} from "../../../core/models";
import {
	changeStatusOfMediaPlaceReportThunk,
	getMediaPlaceReportByIdThunk,
} from "../../../core/store/report/mediaPlace/mediaPlace.thunks";
import {setMediaPlaceReportByIdAction} from "../../../core/store/report/mediaPlace/mediaPlace.slices";
import Moment from "react-moment";

const MediaPlaceListPageListInfoPage = () => {
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

	const onClick = (statusTypeId: eReportStatusType) => () => {
		dispatch(changeStatusOfMediaPlaceReportThunk({id: +reportId, statusId: statusTypeId}));
	};

	if (!report) return null;
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

			<AppCard shadow="table">
				<AppTable wrapperClassName="p-0">
					<AppTable.THead extended>
						<tr>
							<th>Название:</th>
							<th>Площадка:</th>
							<th>Дата:</th>
						</tr>
					</AppTable.THead>
					<AppTable.TBody>{renderTableBodyRows()}</AppTable.TBody>
				</AppTable>
			</AppCard>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/media-place" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				{report.status.id === eReportStatusType.Sent && (
					<div className="d-flex gap-0.5">
						<AppButton onClick={onClick(eReportStatusType.Rejected)} size="lg" variant="danger">
							Отказать
						</AppButton>
						<AppButton onClick={onClick(eReportStatusType.Approved)} size="lg" variant="success">
							Принять
						</AppButton>
					</div>
				)}
			</div>
		</>
	);
};

export default MediaPlaceListPageListInfoPage;
