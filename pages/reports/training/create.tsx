import Head from "next/head";
import React, {ChangeEvent, useState} from "react";
import cn from "classnames";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import {useAppDispatch} from "../../../core/hooks";
import {IReportTrainingCreateParams} from "../../../core/models";
import {createTrainingReportThunk} from "../../../core/store/report/training/training-report.thunks";

const fieldOptions = {
	required: true,
	valueAsNumber: true,
};

const TrainingReportCreatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const {register, handleSubmit, getValues} = useForm<IReportTrainingCreateParams>();

	const [files, setFiles] = useState<File[]>([]);
	const [errText, setErrText] = useState("");

	const onSubmit = async (fields: IReportTrainingCreateParams) => {
		const numberValues: number[] = Object.values(getValues());

		if (numberValues.length) {
			const sum = numberValues.reduce((accumulator, currentValue) => {
				if (!isNaN(currentValue)) {
					return accumulator + currentValue;
				} else {
					return accumulator;
				}
			}, 0);

			if (sum === files.length) {
				setErrText("");
				const formData = new FormData();
				files.forEach((f) => formData.append("files", f));

				const action = await dispatch(createTrainingReportThunk({payload: fields, formData}));
				const id = action.payload as number;

				if (id) {
					void router.push(`/reports/training/${id}`);
				}
			} else {
				setErrText(`Количество людей должно совпадать с количеством привязанных документов.`);
			}
		}
	};

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			for (const key in e.target.files) {
				const file = e.target.files[key];

				if (file instanceof File) {
					if (!files.some((f) => f.name === file.name)) {
						setFiles((prev) => [...prev, file]);
					}
				}
			}
		}
	};

	const onFileRemove = (fileName: string) => () => {
		const index = files.findIndex((f) => f.name === fileName);
		setFiles((prev) => prev.filter((f, i) => i !== index));
	};

	const renderFiles = () => {
		return files.map((file) => (
			<div className="flex-center gap-0.5" key={file.name}>
				<label className={styles.cardBodyLabel}>
					<AppInput className="text-center" type="file" disabled readOnly placeholder={file.name} />
				</label>

				<AppButton onClick={onFileRemove(file.name)} variant="danger" size="square">
					<TrashIcon width="24px" height="24px" />
				</AppButton>
			</div>
		));
	};

	return (
		<>
			<Head>
				<title>Повышение квалификации</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">Повышение квалификации</h1>

			<AppDivider className="my-1.25" />

			<div className={styles.filters}>
				<label className={styles.filterLabel}>
					<span className="text-main-bold">Дата</span>

					<AppInput type="date" />
				</label>

				<label className={styles.filterLabel}>
					<span className="text-main-bold">Номер:</span>
					<AppButton variant="main" size="square">
						80
					</AppButton>
				</label>
			</div>

			<div className={cn("card-desk", styles.cardDesk, styles.cardDeskGrid4, styles.marginBottom)}>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Конференция, симпозиум и т.п.</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Местные:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("confNational", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Mеждународные:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("confInternational", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Учеба/повышение квалификации до 10 дней</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Местные:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("learnNationalShort", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Mеждународные:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("learnInternationalShort", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Учеба/повышение квалификации от 10 до 30 дней</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Местные:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("learnNationalMid", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Mеждународные:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("learnInternationalMid", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Учеба/повышение квалификации более 30 дней</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Местные:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("learnNationalLong", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Mеждународные:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("learnInternationalLong", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			<div className={cn("card-desk", styles.cardDesk, styles.cardDeskGrid4, styles.bgWhite)}>
				<div className={cn("pe-2", styles.cardWrapper)}>
					<AppCard className="h-100">
						<AppCard.Header>Подтверждающий документ</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody, styles.fileCardBody)}>
							<label className={styles.cardBodyLabel}>
								<AppInput
									onChange={onFileChange}
									className="text-center"
									type="file"
									placeholder="Прикрепить файл"
									multiple
								/>
							</label>

							<AppDivider className="my-0.75" />

							{renderFiles()}
							{errText}
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/reports/training" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>
				<AppButton onClick={handleSubmit(onSubmit)} size="lg" variant="success" withIcon>
					<SuccessIcon width="24px" height="24px" />
					<span>Создать отчёт</span>
				</AppButton>
			</div>
		</>
	);
};

export default TrainingReportCreatePage;
