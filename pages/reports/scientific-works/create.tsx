import React, {ChangeEvent, useState} from "react";
import Head from "next/head";
import cn from "classnames";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useForm} from "react-hook-form";
import {createScientificWorksReportThunk} from "../../../core/store/report/scientificWorks/scientific-works-report.thunks";
import {IReportCreateScientificWorksParams} from "../../../core/models";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";

const fieldOptions = {
	required: true,
	valueAsNumber: true,
};

const ScientificWorksReportCreatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [files, setFiles] = useState<File[]>([]);
	const [errText, setErrText] = useState("");

	const {register, handleSubmit} = useForm<IReportCreateScientificWorksParams>();

	const onSubmit = async (fields: IReportCreateScientificWorksParams) => {
		if (files.length) {
			setErrText("");
			const formData = new FormData();
			files.forEach((f) => formData.append("files", f));

			const action = await dispatch(createScientificWorksReportThunk({payload: fields, formData}));
			const id = action.payload as number;

			if (id) {
				void router.push(`/reports/scientific-works/${id}`);
			}
		} else {
			setErrText("Пожалуйста, прикрепите файлы.");
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
				<title>Научные статьи, патенты и др.</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">Научные статьи, патенты и др.</h1>

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

			<div className={cn("card-desk", styles.cardDesk)}>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Количество статей</AppCard.Header>
						<AppCard.Body>
							<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid6)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Местные:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Зарубежные:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">СНГ:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Scopus:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">WoS:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Другие:</span>
								</label>
							</div>

							<div className="flex-col gap-2.5">
								<div className={cn("gap-1", styles.labelDeskGrid6)}>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("localArticles", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("foreignArticles", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("cisArticles", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("scopusArticles", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("wosArticles", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("otherArticles", fieldOptions)}
											/>
										</div>
									</label>
								</div>
							</div>
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			<div className={cn("mt-2.5 card-desk", styles.cardDesk, styles.cardDeskGrid2, styles.marginBottom)}>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Количество лекций</AppCard.Header>
						<AppCard.Body>
							<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid3)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Местные:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Зарубежные:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">СНГ:</span>
								</label>
							</div>

							<div className="flex-col gap-2.5">
								<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid3)}>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("localLectures", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("foreignLectures", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("cisLectures", fieldOptions)}
											/>
										</div>
									</label>
								</div>
							</div>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Другие</AppCard.Header>
						<AppCard.Body>
							<div className={cn("gap-1", styles.labelDeskGrid4)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Монографии:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Патенты:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Методические пособия:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Методические рекомендации:</span>
								</label>
							</div>

							<div className="flex-col gap-2.5">
								<div className={cn("gap-1", styles.labelDeskGrid4)}>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("monographs", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("patents", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("benefits", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("recommendations", fieldOptions)}
											/>
										</div>
									</label>
								</div>
							</div>
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

			{/* TODO: make a component to avoid duplicates */}
			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/reports/scientific-works" size="lg" variant="dark" withIcon>
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

export default ScientificWorksReportCreatePage;
