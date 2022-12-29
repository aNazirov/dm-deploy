import React from "react";
import Head from "next/head";
import cn from "classnames";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useForm} from "react-hook-form";
import {IReportScientificEventsCreateParams} from "../../../core/models";
import {createScientificEventsReportThunk} from "../../../core/store/report/scientificEvents/scientific-events-report.thunks";

const fieldOptions = {
	required: true,
	valueAsNumber: true,
};

const ScientificEventsReportCreatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const {register, handleSubmit} = useForm<IReportScientificEventsCreateParams>();

	const onSubmit = async (fields: IReportScientificEventsCreateParams) => {
		const action = await dispatch(createScientificEventsReportThunk(fields));
		const id = action.payload as number;

		if (id) {
			void router.push(`/reports/scientific-events/${id}`);
		}
	};

	return (
		<>
			<Head>
				<title>Научные защиты (ОЦ)</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">Научные защиты (ОЦ)</h1>

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

			<div className={cn(styles.cardDesk, styles.percentGrid2)}>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Количество защит</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">DSc:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("protectionDSc", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">PhD:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("protectionPhD", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Количество научных конференций</AppCard.Header>
						<AppCard.Body>
							<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid6)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Местные (оффлайн):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Местные (онлайн):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Местные с участием международных специалистов (оффлайн):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Местные с участием международных специалистов (онлайн):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Международные (оффлайн):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Международные (онлайн):</span>
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
												{...register("localConferencesOffline", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("localConferencesOnline", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("localWithForeignSpecialistsConferencesOffline", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("localWithForeignSpecialistsConferencesOnline", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("internationalConferencesOffline", fieldOptions)}
											/>
										</div>
									</label>
									<label className={styles.cardBodyLabel}>
										<div className="w-100">
											<AppInput
												className="text-center"
												type="number"
												placeholder="0"
												{...register("internationalConferencesOnline", fieldOptions)}
											/>
										</div>
									</label>
								</div>
							</div>
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			<div className={cn("mt-2.5", styles.cardDesk, styles.cardDeskGrid2)}>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Докторанты</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Количество DSc:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("countDoctoralStudentsDSc", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Шифр DSc:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("doctoralStudentsDSc", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Количество PhD:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("countDoctoralStudentsPhD", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Шифр PhD:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("doctoralStudentsPhD", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Свободные соискатели</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Количество DSc:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("countFreeApplicantsDSc", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Шифр DSc:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("freeApplicantsDSc", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Количество PhD:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("countFreeApplicantsPhD", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Шифр PhD:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("freeApplicantsPhD", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			{/* TODO: make a component to avoid duplicates */}
			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/reports/scientific-events" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>
				<AppButton onClick={handleSubmit(onSubmit)} size="lg" variant="success" withIcon>
					<SuccessIcon width="24px" height="24px" />
					<span>Отправить отчёт</span>
				</AppButton>
			</div>
		</>
	);
};

export default ScientificEventsReportCreatePage;
