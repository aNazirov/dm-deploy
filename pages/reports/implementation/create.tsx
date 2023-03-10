import React from "react";
import Head from "next/head";
import cn from "classnames";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useFieldArray, useForm} from "react-hook-form";
import {ePlace, IReportImplementationCreateParams} from "../../../core/models";
import {createImplementationReportThunk} from "../../../core/store/report/implementation/implementation-report.thunks";
import {ReactSelect} from "../../../components/External";
import {countryOptions} from "../../../core/models/appendix/countries";
import PlusIcon from "../../../assets/images/icons/filled/plus.svg";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";

const fieldOptions = {
	required: true,
	valueAsNumber: true,
};

const ImplementationReportCreatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const {register, control, handleSubmit, setValue} = useForm<IReportImplementationCreateParams>({
		defaultValues: {
			implementationParts: [
				{
					diagnosticMethodsDistrict: undefined,
					place: undefined,
					diagnosticMethodsRegion: undefined,
					treatmentsDistrict: undefined,
					treatmentsRegion: undefined,
				},
			],
		},
	});

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
			place: undefined as unknown as Exclude<ePlace, ePlace.International>,
		});
	};

	const onRemove = (index: number) => () => {
		remove(index);
	};

	const onSelect = (index: number) => (option: unknown) => {
		const field = option as {label: string; value: Exclude<ePlace, ePlace.International>};
		setValue(`implementationParts.${index}.place`, field.value);
	};

	const onSubmit = async (fieldsArr: IReportImplementationCreateParams) => {
		const action = await dispatch(createImplementationReportThunk(fieldsArr));

		const id = action.payload as number;

		if (id) {
			void router.push(`/reports/implementation/${id}`);
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
						<AppButton onClick={onRemove(index)} type="button" variant="danger" size="square" withIcon>
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
				<title>??????????????????</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">??????????????????</h1>

			<AppDivider className="my-1.25" />

			{/*TODO: make a filter component*/}
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
						<div className={cn("gap-1", styles.labelDeskGrid5)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">?????????? ??????????????????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????? ?????????????????????? (???? ?????????????? ??????????????):</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????? ?????????????????????? (???? ?????????????? ????????????):</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????? ?????????????? (???? ?????????????? ??????????????):</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????? ?????????????? (???? ?????????????? ????????????):</span>
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
				<AppButton useAs="link" href="/reports/implementation" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					??????????
				</AppButton>
				<AppButton onClick={handleSubmit(onSubmit)} size="lg" variant="success" withIcon>
					<SuccessIcon width="24px" height="24px" />
					<span>?????????????? ??????????</span>
				</AppButton>
			</div>
		</>
	);
};
export default ImplementationReportCreatePage;
