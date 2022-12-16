import React from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppInput, AppTable} from "../../components/Main";
import ChevronIcon from "../../assets/images/icons/filled/arrows/chevron-left.svg";
import styles from "../../styles/reports.module.scss";
import TrashIcon from "../../assets/images/icons/filled/trash.svg";

const TrainingListInfoPage = () => {
	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>
					Республика ихтисослаштирилган кўз микрохирургияси илмий-амалий тиббиёт маркази tibbiyot markazining 16.11.2022
					- sanadagi
				</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">
				Республика ихтисослаштирилган кўз микрохирургияси илмий-амалий тиббиёт маркази tibbiyot markazining 16.11.2022 -
				sanadagi
			</h1>

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
						<td>16.11.2022</td>
						<td>0</td>
						<td>0</td>
						<td>2</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
					</tr>
				</AppTable.TBody>
			</AppTable>

			<div className="flex-col gap-0.5">
				<div className="flex-center gap-0.5 w-max">
					<label className={styles.cardBodyLabel}>
						<AppInput className="text-center" type="file" placeholder="Название документа" />
					</label>

					<AppButton variant="danger" size="square">
						<TrashIcon width="24px" height="24px" />
					</AppButton>
				</div>

				<div className="flex-center gap-0.5 w-max">
					<label className={styles.cardBodyLabel}>
						<AppInput className="text-center" type="file" placeholder="Название документа" />
					</label>

					<AppButton variant="danger" size="square">
						<TrashIcon width="24px" height="24px" />
					</AppButton>
				</div>
			</div>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>
				<div className="d-flex gap-0.5">
					<AppButton size="lg" variant="danger">
						Отказать
					</AppButton>
					<AppButton size="lg" variant="success">
						Принять
					</AppButton>
				</div>
			</div>
		</div>
	);
};

export default TrainingListInfoPage;
