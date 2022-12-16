import React from "react";
import Head from "next/head";
import {AppBadge, AppButton, AppDivider, AppPagination, AppTable} from "../../components/Main";
import styles from "../../styles/reports.module.scss";

import FilterIcon from "../../assets/images/icons/filled/filter.svg";

const AppealsListPage = () => {
	return (
		<>
			<Head>
				<title>Обращения физических и юридических лиц</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Обращения физических и юридических лиц</h1>

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
			</div>

			<AppTable>
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
				<AppTable.TBody>
					<tr>
						<td>6344</td>
						<td>77</td>
						<td>14.11.2022</td>
						<td>Республика суд-тиббий экспертиза илмий-амалий маркази (201122919)</td>
						<td>Комментарий</td>
						<td>
							<AppBadge className="mx-auto" variant="warning">
								Отправлен
							</AppBadge>
						</td>
					</tr>
					<tr>
						<td>6344</td>
						<td>77</td>
						<td>14.11.2022</td>
						<td>Республиканский специализированный научно-практический медицинский центр кардиологии (204514063)</td>
						<td>Комментарий</td>
						<td>
							<AppBadge className="mx-auto" variant="warning">
								Отправлен
							</AppBadge>
						</td>
					</tr>
					<tr>
						<td>6344</td>
						<td>77</td>
						<td>14.11.2022</td>
						<td>
							Respublika Ixtisoslashtirilgan Travmatologiya va Ortopediya Ilmiy-Amaliy Tibbiyot Markazi DM (200555332)
						</td>
						<td>Комментарий</td>
						<td>
							<AppBadge className="mx-auto" variant="warning">
								Отправлен
							</AppBadge>
						</td>
					</tr>
					<tr>
						<td>6344</td>
						<td>77</td>
						<td>14.11.2022</td>
						<td>Республика Ихтисослаштирилган Педиатирия Илмий Амалий Тиббиёт Маркази (200845880)</td>
						<td>Комментарий</td>
						<td>
							<AppBadge className="mx-auto" variant="warning">
								Отправлен
							</AppBadge>
						</td>
					</tr>
				</AppTable.TBody>
			</AppTable>

			<div className="mt-auto">
				<AppDivider className="my-1.25" />
				<AppPagination />
			</div>
		</>
	);
};

export default AppealsListPage;
