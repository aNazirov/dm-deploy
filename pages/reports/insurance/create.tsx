import React from "react";
import Head from "next/head";
import cn from "classnames";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useForm} from "react-hook-form";
import {IReportInsuranceCreateParams} from "../../../core/models";
import {createInsuranceReportThunk} from "../../../core/store/report/insurance/insurance-report.thunks";

const fieldOptions = {
	required: true,
	valueAsNumber: true,
};

const InsuranceReportCreatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const {register, handleSubmit} = useForm<IReportInsuranceCreateParams>();

	const onSubmit = async (fields: IReportInsuranceCreateParams) => {
		const action = await dispatch(createInsuranceReportThunk(fields));
		const id = action.payload as number;

		if (id) {
			void router.push(`/reports/insurance/${id}`);
		}
	};

	return (
		<>
			<Head>
				<title>
					Информация о размере финансирования из государственного фонда медицинского страхования (название центра)
				</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">
				Информация о размере финансирования из государственного фонда медицинского страхования (название центра)
			</h1>

			<AppDivider className="my-1.25" />

			{/*TODO: make a filter component*/}
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

			<div className={cn("card-desk", styles.cardDesk, styles.cardDeskGrid3)}>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Акты, поданные на рассмотренеие в ГФМС</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Количество:</span>
								<AppInput className="text-center" type="number" placeholder="0" {...register("acts", fieldOptions)} />
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Сумма:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("amountOfActs", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Рассмотренные и одобренные акты ГФМС</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Количество:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("approvedActs", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Сумма:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("amountOfApprovedActs", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Рассмотренные и неодобренные акты ГФМС</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody, styles.grid2)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Количество:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("rejectedActs", fieldOptions)}
								/>
							</label>

							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Сумма:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("amountOfRejectedActs", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			<div className={cn("mt-2.5 card-desk", styles.cardDesk, styles.percentGrid2)}>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Итоговый годовой контракт</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody, styles.grid2)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Сумма:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("annualAmount", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Header>Расмотренные, одобренные акты и отправленные счет-фактуры</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Сумма:</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("amountOfSentApprovedInvoices", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/reports/insurance" size="lg" variant="dark" withIcon>
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
export default InsuranceReportCreatePage;
