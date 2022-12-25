import React, {useEffect} from "react";
import Head from "next/head";
import {AppBadge, AppButton, AppDivider, AppPagination, AppTable} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";

import FilterIcon from "../../../assets/images/icons/filled/filter.svg";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {useRouter} from "next/router";
import Moment from "react-moment";
import {getAllMediaPlaceReportsThunk} from "../../../core/store/report/mediaPlace/mediaPlace.thunks";
import {setAllMediaPlaceReportsAction} from "../../../core/store/report/mediaPlace/mediaPlace.slices";

const MediaPlaceListPage = () => {
	const dispatch = useAppDispatch();
	const mediaPlaceReport = useAppSelector(({mediaPlaceReport}) => mediaPlaceReport);

	const router = useRouter();

	useEffect(() => {
		const promises = [dispatch(getAllMediaPlaceReportsThunk())];

		return () => {
			promises.forEach((p) => p.abort());
			dispatch(setAllMediaPlaceReportsAction({list: [], count: 0}));
		};
	}, []);

	const onOpenReport = (reportId: number) => () => {
		void router.push(`/reports/media-place/${reportId}`);
	};

	const renderTableBodyRow = () => {
		return mediaPlaceReport.list.map((report) => (
			<tr onClick={onOpenReport(report.id)} key={report.id}>
				<td>{report.id}</td>
				<td>{report.id}</td>
				<td>
					<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
				</td>
				<td>{report.organization.title.ru}</td>
				<td>{report.note ?? "-"}</td>
				<td>
					<AppBadge statusId={report.status.id} className="mx-auto">
						{report.status.title.ru}
					</AppBadge>
				</td>
			</tr>
		));
	};
	return (
		<>
			<Head>
				<title>Медиа отчёт</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Медиа отчёт</h1>

			<AppDivider className="my-1.25" />

			<div className={styles.filters}>
				<div className={styles.filterLabel}>
					<AppButton variant="primary-outline" size="lg" withIcon>
						<FilterIcon width="24px" height="24px" className="main-btn-text-color" />
						<span>Фильтр</span>
					</AppButton>
				</div>

				<div className={styles.filterLabel}>
					<span className="text-main-bold">Статус:</span>
					<div className="d-flex gap-0.125">
						<AppButton className="active" variant="primary-outline" size="lg">
							Все
						</AppButton>
						<AppButton variant="primary-outline" size="lg">
							Отправлен
						</AppButton>
						<AppButton variant="primary-outline" size="lg">
							Принят
						</AppButton>
						<AppButton variant="primary-outline" size="lg">
							Отказан
						</AppButton>
					</div>
				</div>

				<AppButton useAs="link" href="/reports/media-place/create" className="ms-auto" variant="main" size="lg">
					Создать
				</AppButton>
			</div>

			{mediaPlaceReport.list.length > 0 ? (
				<AppTable linked wrapperClassName="p-0">
					<AppTable.THead>
						<tr>
							<th>ID</th>
							<th>Номер</th>
							<th>Дата</th>
							<th>Организация</th>
							<th>Комментарии</th>
							<th>Статус</th>
						</tr>
					</AppTable.THead>
					<AppTable.TBody>{renderTableBodyRow()}</AppTable.TBody>
				</AppTable>
			) : (
				"Список отчётов пуст"
			)}

			<div className="mt-auto">
				<AppDivider className="my-1.25" />
				<AppPagination />
			</div>
		</>
	);
};

export default MediaPlaceListPage;
