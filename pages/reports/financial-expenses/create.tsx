import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import cn from "classnames";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useForm} from "react-hook-form";
import {IReportFinancialExpensesCreateParams} from "../../../core/models";
import {createFinancialExpensesReportThunk} from "../../../core/store/report/financialExpenses/financial-expenses-report.thunks";

const fieldOptions = {
	required: true,
	valueAsNumber: true,
};

const CenterFinancialExpensesReportCreatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();
	const {register, handleSubmit, watch, setValue, getValues} =
		useForm<Omit<IReportFinancialExpensesCreateParams, "note">>();

	useEffect(() => {
		const subscription = watch((data, {name}) => {
			if (name !== "total") {
				const {total: _, ...values} = getValues();
				const numberValues: number[] = Object.values(values);

				if (numberValues.length) {
					const sum = numberValues.reduce((accumulator, currentValue) => {
						if (!isNaN(currentValue)) {
							return accumulator + currentValue;
						} else {
							return accumulator;
						}
					}, 0);

					setValue("total", sum);
				}
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const onSubmit = async (fields: IReportFinancialExpensesCreateParams) => {
		const action = await dispatch(createFinancialExpensesReportThunk(fields));
		const id = action.payload as number;

		if (id) {
			void router.push(`/reports/financial-expenses/${id}`);
		}
	};
	return (
		<>
			<Head>
				<title>Финансовые расходы центра</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">Финансовые расходы центра</h1>

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

			<div className={cn("card-desk", styles.cardDesk, styles.cardDeskGrid2)}>
				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Body className={cn("gap-0.5", styles.cardRows)}>
							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>
									Kомандировки (бюджет, внебюджет)
								</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("businessTrips", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>
									Зарплата и премии (внебюджет)
								</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("salaries", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>
									Капитальный и частичный ремонт
								</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("repairs", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>Спонсорство</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("sponsorships", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>
									Наука (гранд, инноватция и тд)
								</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("innovations", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>
									Коммунальные расходы
								</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("communalPayments", fieldOptions)}
								/>
							</label>
							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>Социальные расходы</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("socialPayments", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>

				<div className={styles.cardWrapper}>
					<AppCard className="h-100">
						<AppCard.Body className={cn("gap-0.5", styles.cardRows)}>
							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>Аутсорс</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("outsource", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>
									Учеба и повышение квалификации
								</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("education", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>
									На лекарства и расходные материалы
								</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("materials", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>
									Медицинский инвентарь
								</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("inventory", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>Прочие расходы</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									{...register("otherExpenses", fieldOptions)}
								/>
							</label>

							<label className={cn("flex-justify-between gap-1", styles.cardRow)}>
								<span className={cn("rounded text-main-bold flex-fill", styles.cardRowLabel)}>Итого</span>
								<AppInput
									className="text-center"
									type="number"
									placeholder="0"
									readOnly
									{...register("total", fieldOptions)}
								/>
							</label>
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/reports/financial-expenses" size="lg" variant="dark" withIcon>
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

export default CenterFinancialExpensesReportCreatePage;
