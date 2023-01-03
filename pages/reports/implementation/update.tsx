import React, {useEffect, useState} from "react";
import Head from "next/head";
import cn from "classnames";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useFieldArray, useForm} from "react-hook-form";
import {ePlace, ImplementationReportModel, IReportImplementationCreateParams} from "../../../core/models";
import {
	getImplementationReportByIdThunk,
	updateImplementationReportThunk,
} from "../../../core/store/report/implementation/implementation-report.thunks";
import {ReactSelect} from "../../../components/External";
import {countryOptions} from "../../../core/models/appendix/countries";
import PlusIcon from "../../../assets/images/icons/filled/plus.svg";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import {setImplementationReportByIdAction} from "../../../core/store/report/implementation/implementation-report.slices";

const fieldOptions = {
	required: true,
	valueAsNumber: true,
};

const ImplementationReportUpdatePage = () => {
	const router = useRouter();

	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();

	const [deletingPartsIds, setDeletingPartsIds] = useState<number[]>([]);

	useEffect(() => {
		if (reportId) {
			const promise = dispatch(getImplementationReportByIdThunk(+reportId));
			promise.then((res) => {
				if (res.payload) {
					const fields = res.payload as ImplementationReportModel;
					if (fields.implementationParts?.length) {
						reset({implementationParts: fields.implementationParts});
					} else {
						reset({
							implementationParts: [
								{
									diagnosticMethodsDistrict: undefined,
									place: undefined,
									diagnosticMethodsRegion: undefined,
									treatmentsDistrict: undefined,
									treatmentsRegion: undefined,
								},
							],
						});
					}
				}
			});

			return () => {
				promise.abort();
				dispatch(setImplementationReportByIdAction(null));
			};
		}
	}, [reportId]);

	const {register, control, handleSubmit, getValues, setValue, reset} = useForm<IReportImplementationCreateParams>();

	const {fields, append, remove} = useFieldArray({
		control,
		name: "implementationParts",
	});

	const onAppend = () => {
		append({
			diagnosticMethodsDistrict: undefined as unknown as number,
			diagnosticMethodsRegion: undefined as unknown as number,
			treatmentsDistrict: undefined as unknown as number,
			treatmentsRegion: undefined as unknown as number,
			place: undefined as unknown as Exclude<ePlace, ePlace.Intenational>,
		});
	};

	const onRemove = (index: number, id?: number) => () => {
		if (id) {
			setDeletingPartsIds((prev) => [...prev, id]);
			remove(index);
		}
	};

	const onSelect = (index: number) => (option: unknown) => {
		const field = option as {label: string; value: Exclude<ePlace, ePlace.Intenational>};
		setValue(`implementationParts.${index}.place`, field.value);
	};

	const onSubmit = async (fieldsArr: IReportImplementationCreateParams) => {
		console.log(deletingPartsIds);
		const action = await dispatch(updateImplementationReportThunk({id: +reportId, body: fieldsArr, deletingPartsIds}));

		const report = action.payload as ImplementationReportModel;

		if (report) {
			void router.push(`/reports/implementation/${reportId}`);
		}
	};

	const renderFieldRows = () => {
		return fields.map((field, index) => (
			<div className={cn("gap-1", styles.labelDeskGrid2)} key={field.id}>
				<div className={cn("gap-1", styles.labelDeskGrid5)}>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<ReactSelect
								onChange={onSelect(index)}
								defaultValue={countryOptions.filter(
									(option) => option.value === getValues().implementationParts[index].place,
								)}
								options={countryOptions.filter((_, i) => i !== 0)}
								placeholder="Выберите учреждение"
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`implementationParts.${index}.diagnosticMethodsRegion`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`implementationParts.${index}.diagnosticMethodsDistrict`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`implementationParts.${index}.treatmentsRegion`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`implementationParts.${index}.treatmentsDistrict`, fieldOptions)}
							/>
						</div>
					</label>
				</div>

				<div className={cn("flex-justify-center gap-0.5")}>
					{index === fields.length - 1 && (
						<AppButton onClick={onAppend} type="button" variant="dark" size="square" withIcon>
							<PlusIcon width="24px" height="24px" />
						</AppButton>
					)}
					{fields.length !== 1 && (
						<AppButton
							onClick={onRemove(index, getValues().implementationParts[index].id)}
							type="button"
							variant="danger"
							size="square"
							withIcon
						>
							<TrashIcon width="24px" height="24px" />
						</AppButton>
					)}
				</div>
			</div>
		));
	};

	return (
		<>
			<Head>
				<title>Внедрения</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Внедрения</h1>

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

			<AppCard>
				<AppCard.Header>Основные данные</AppCard.Header>
				<AppCard.Body className="flex-col">
					<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
						<div className={cn("gap-1", styles.labelDeskGrid5)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Место внедрения:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Методы диагностики (На уровень области):</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Методы диагностики (На уровень района):</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Методы лечения (На уровень области):</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Методы лечения (На уровень района):</span>
							</label>
						</div>

						<div className={styles.cardBodyLabel}>
							<span className="text-main-bold">Действие:</span>
						</div>
					</div>

					<div className="flex-col gap-2.5">{renderFieldRows()}</div>
				</AppCard.Body>
			</AppCard>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href={`/reports/implementation/${reportId}`} size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>
				<AppButton onClick={handleSubmit(onSubmit)} size="lg" variant="success" withIcon>
					<SuccessIcon width="24px" height="24px" />
					<span>Сохранить</span>
				</AppButton>
			</div>
		</>
	);
};
export default ImplementationReportUpdatePage;
