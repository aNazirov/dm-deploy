import React, {useEffect, useState} from "react";
import Head from "next/head";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import cn from "classnames";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import PlusIcon from "../../../assets/images/icons/filled/plus.svg";
import {ReactSelect} from "../../../components/External";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useFieldArray, useForm} from "react-hook-form";
import {ePlace, IReportTelemedicineCreateParams, TelemedicineReportModel} from "../../../core/models";
import {
	getTelemedicineReportByIdThunk,
	updateTelemedicineReportThunk,
} from "../../../core/store/report/telemedicine/telemedicine.thunks";
import {countryOptions} from "../../../core/models/appendix/countries";
import {setTelemedicineReportByIdAction} from "../../../core/store/report/telemedicine/telemedicine.slices";

const fieldOptions = {
	required: true,
	valueAsNumber: true,
};

const TelemedicineReportCreatePage = () => {
	const router = useRouter();

	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();

	const [deletingPartsIds, setDeletingPartsIds] = useState<number[]>([]);

	useEffect(() => {
		if (reportId) {
			const promise = dispatch(getTelemedicineReportByIdThunk(+reportId));
			promise.then((res) => {
				if (res.payload) {
					const fields = res.payload as TelemedicineReportModel;
					if (fields.telemedicineParts?.length) {
						reset({telemedicineParts: fields.telemedicineParts});
					} else {
						reset({
							telemedicineParts: [
								{
									consultations: undefined,
									place: undefined,
									symposiums: undefined,
									seminars: undefined,
									demonstrationOperations: undefined,
									councils: undefined,
									note: undefined,
								},
							],
						});
					}
				}
			});

			return () => {
				promise.abort();
				dispatch(setTelemedicineReportByIdAction(null));
			};
		}
	}, [reportId]);

	const {register, control, handleSubmit, reset, getValues, setValue} = useForm<IReportTelemedicineCreateParams>({
		defaultValues: {
			telemedicineParts: [
				{
					consultations: undefined,
					place: undefined,
					demonstrationOperations: undefined,
					seminars: undefined,
					symposiums: undefined,
					councils: undefined,
				},
			],
		},
	});

	const {fields, append, remove} = useFieldArray({
		control,
		name: "telemedicineParts",
	});

	const onAppend = () => {
		// TODO: set undefined
		append({
			consultations: 0,
			councils: 0,
			demonstrationOperations: 0,
			seminars: 0,
			symposiums: 0,
			place: ePlace.International,
		});
	};

	const onRemove = (index: number, id?: number) => () => {
		if (id) {
			setDeletingPartsIds((prev) => [...prev, id]);
			remove(index);
		}
	};

	const onSelect = (index: number) => (option: unknown) => {
		const field = option as {label: string; value: ePlace};
		setValue(`telemedicineParts.${index}.place`, field.value);
	};

	const onSubmit = async (fieldsArr: IReportTelemedicineCreateParams) => {
		const action = await dispatch(updateTelemedicineReportThunk({id: +reportId, deletingPartsIds, body: fieldsArr}));

		const id = action.payload as number;

		if (id) {
			void router.push(`/reports/telemedicine/${id}`);
		}
	};

	const renderFieldRows = () => {
		return fields.map((field, index) => (
			<div className={cn("gap-1", styles.labelDeskGrid2)} key={field.id}>
				<div className={cn("gap-1", styles.labelDeskGrid6)}>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<ReactSelect
								onChange={onSelect(index)}
								defaultValue={countryOptions.filter(
									(option) => option.value === getValues().telemedicineParts[index].place,
								)}
								options={countryOptions.filter((_, i) => i !== 0)}
								placeholder="???????????????? ????????????????????"
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`telemedicineParts.${index}.consultations`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`telemedicineParts.${index}.councils`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`telemedicineParts.${index}.demonstrationOperations`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`telemedicineParts.${index}.seminars`, fieldOptions)}
							/>
						</div>
					</label>

					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="number"
								placeholder="-"
								{...register(`telemedicineParts.${index}.symposiums`, fieldOptions)}
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
							onClick={onRemove(index, getValues().telemedicineParts[index].id)}
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
				<title>????????????????????????</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">????????????????????????</h1>

			<AppDivider className="my-1.25" />

			<div className={styles.filters}>
				<label className={styles.filterLabel}>
					<span className="text-main-bold">????????</span>
					<AppInput type="date" />
				</label>

				<label className={styles.filterLabel}>
					<span className="text-main-bold">??????????:</span>
					<AppButton variant="main" size="square">
						80
					</AppButton>
				</label>
			</div>

			<AppCard>
				<AppCard.Header>???????????????? ????????????</AppCard.Header>
				<AppCard.Body className="flex-col">
					<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
						<div className={cn("gap-1", styles.labelDeskGrid6)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????????????? ?? ?????? ???????? ?????????????????? ????????????????????????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????????????? ????????????????????????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????????????? ??????????????????????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????????????? ?????????????????????????? ????????????????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????????????? ??????????????????, ???????????? ?????????????? ?? ??.??.:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????????????? ??????????????????????, ?????????????????????? ?? ??.??.:</span>
							</label>
						</div>

						<div className={styles.cardBodyLabel}>
							<span className="text-main-bold">????????????????:</span>
						</div>
					</div>

					<div className="flex-col gap-2.5">{renderFieldRows()}</div>
				</AppCard.Body>
			</AppCard>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href={`/reports/telemedicine/${reportId}`} size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					??????????
				</AppButton>
				<AppButton onClick={handleSubmit(onSubmit)} size="lg" variant="success" withIcon>
					<SuccessIcon width="24px" height="24px" />
					<span>??????????????????</span>
				</AppButton>
			</div>
		</>
	);
};

export default TelemedicineReportCreatePage;
