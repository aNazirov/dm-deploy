import React, {useState} from "react";
import Head from "next/head";
import cn from "classnames";
import {AppButton, AppCard, AppDivider, AppInput} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import PlusIcon from "../../../assets/images/icons/filled/plus.svg";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useFieldArray, useForm} from "react-hook-form";
import {eScienceType, IReportScienceCreateParams} from "../../../core/models";
import {createScienceReportThunk} from "../../../core/store/report/science/science.thunks";

const ScienceCreatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const {control, handleSubmit, register, setValue, getValues} = useForm<IReportScienceCreateParams>({
		defaultValues: {
			scienceParts: [
				{
					type: eScienceType.Fundamental,
					title: "",
					fileId: 0,
					fileName: "",
					amount: 0,
					endDate: new Date().toISOString().slice(0, 10) as unknown as Date,
					startDate: new Date().toISOString().slice(0, 10) as unknown as Date,
				},
				{
					type: eScienceType.Practice,
					title: "",

					fileName: "",
					amount: 0,
					endDate: new Date().toISOString().slice(0, 10) as unknown as Date,
					startDate: new Date().toISOString().slice(0, 10) as unknown as Date,
				},
				{
					type: eScienceType.Innovational,
					title: "",

					fileName: "",
					amount: 0,
					endDate: new Date().toISOString().slice(0, 10) as unknown as Date,
					startDate: new Date().toISOString().slice(0, 10) as unknown as Date,
				},
				{
					type: eScienceType.Foreign,
					title: "",

					fileName: "",
					amount: 0,
					endDate: new Date().toISOString().slice(0, 10) as unknown as Date,
					startDate: new Date().toISOString().slice(0, 10) as unknown as Date,
				},
				{
					type: eScienceType.Joint,
					title: "",

					fileName: "",
					amount: 0,
					endDate: new Date().toISOString().slice(0, 10) as unknown as Date,
					startDate: new Date().toISOString().slice(0, 10) as unknown as Date,
				},
			],
		},
	});

	const {fields, append, remove} = useFieldArray({
		control,
		name: "scienceParts",
	});

	const [files, setFiles] = useState<File[]>([]);

	const onAppend = (type: eScienceType) => () => {
		append({
			title: "",
			type,
			fileName: "",
			fileId: 0,
			amount: 0,
			endDate: new Date().toISOString().slice(0, 10) as unknown as Date,
			startDate: new Date().toISOString().slice(0, 10) as unknown as Date,
		});
	};

	const onRemove = (index: number) => () => {
		remove(index);
	};

	const onSubmit = async (fieldsArr: IReportScienceCreateParams) => {
		const formData = new FormData();

		files.forEach((f) => formData.append("files", f));
		const action = await dispatch(createScienceReportThunk({payload: fieldsArr, formData}));

		const id = action.payload as number;

		if (id) {
			void router.push(`/reports/science/${id}`);
		}
	};

	const onFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			for (const key in e.target.files) {
				const file = e.target.files[key];

				if (file instanceof File) {
					if (!files.some((f) => f.name === file.name)) {
						setValue(`scienceParts.${index}.fileName`, file.name);
						setFiles((prev) => [...prev, file]);
					}
				}
			}
		}
	};

	const renderFieldRows = (type: eScienceType) => {
		return fields
			.filter((f) => f.type === type)
			.map((field, i, currFields) => {
				const fieldIndex = fields.findIndex((f) => f.id === field.id);
				return (
					<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)} key={field.id}>
						<div className={cn("gap-1", styles.labelDeskGrid5)}>
							<label className={styles.cardBodyLabel}>
								<div className="w-100">
									<AppInput
										className="text-center"
										type="text"
										placeholder="-"
										{...register(`scienceParts.${fieldIndex}.title`)}
									/>
								</div>
							</label>

							<label className={styles.cardBodyLabel}>
								<div className="w-100">
									<AppInput type="date" {...register(`scienceParts.${fieldIndex}.startDate`)} />
								</div>
							</label>

							<label className={styles.cardBodyLabel}>
								<div className="w-100">
									<AppInput type="date" {...register(`scienceParts.${fieldIndex}.endDate`)} />
								</div>
							</label>

							<label className={styles.cardBodyLabel}>
								<div className="w-100">
									<AppInput
										className="text-center"
										type="number"
										placeholder="0"
										{...register(`scienceParts.${fieldIndex}.amount`, {valueAsNumber: true})}
									/>
								</div>
							</label>
							<label className={styles.cardBodyLabel}>
								<div className="w-100">
									<AppInput
										className="text-center"
										type="file"
										placeholder={getValues().scienceParts[fieldIndex]?.fileName || "Прикрепить файл"}
										onChange={onFileChange(fieldIndex)}
									/>
								</div>
							</label>
						</div>
						<div className={cn("flex-justify-center gap-0.5")}>
							{i === currFields.length - 1 && (
								<AppButton onClick={onAppend(type)} type="button" variant="dark" size="square" withIcon>
									<PlusIcon width="24px" height="24px" />
								</AppButton>
							)}
							{currFields.length !== 1 && (
								<AppButton onClick={onRemove(fieldIndex)} type="button" variant="danger" size="square" withIcon>
									<TrashIcon width="24px" height="24px" />
								</AppButton>
							)}
						</div>
					</div>
				);
			});
	};

	return (
		<>
			<Head>
				<title>Научные проекты</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">Научные проекты</h1>

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

			<div className="flex-col gap-2.5">
				<AppCard>
					<AppCard.Header>Фундаментальный</AppCard.Header>
					<AppCard.Body className="flex-col">
						<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
							<div className={cn("gap-1", styles.labelDeskGrid5)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Название:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Начало:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Конец:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Сумма (сум):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Подтверждающий документ:</span>
								</label>
							</div>

							<div className={styles.cardBodyLabel}>
								<span className="text-main-bold">Действие:</span>
							</div>
						</div>

						<div className="flex-col gap-2.5">{renderFieldRows(eScienceType.Fundamental)}</div>
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header>Практический</AppCard.Header>
					<AppCard.Body className="flex-col">
						<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
							<div className={cn("gap-1", styles.labelDeskGrid5)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Название:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Начало:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Конец:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Сумма (сум):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Подтверждающий документ:</span>
								</label>
							</div>

							<div className={styles.cardBodyLabel}>
								<span className="text-main-bold">Действие:</span>
							</div>
						</div>

						<div className="flex-col gap-2.5">{renderFieldRows(eScienceType.Practice)}</div>
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header>Инновационный</AppCard.Header>
					<AppCard.Body className="flex-col">
						<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
							<div className={cn("gap-1", styles.labelDeskGrid5)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Название:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Начало:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Конец:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Сумма (сум):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Подтверждающий документ:</span>
								</label>
							</div>

							<div className={styles.cardBodyLabel}>
								<span className="text-main-bold">Действие:</span>
							</div>
						</div>

						<div className="flex-col gap-2.5">{renderFieldRows(eScienceType.Innovational)}</div>
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header>Зарубежный</AppCard.Header>
					<AppCard.Body className="flex-col">
						<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
							<div className={cn("gap-1", styles.labelDeskGrid5)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Название:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Начало:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Конец:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Сумма (сум):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Подтверждающий документ:</span>
								</label>
							</div>

							<div className={styles.cardBodyLabel}>
								<span className="text-main-bold">Действие:</span>
							</div>
						</div>

						<div className="flex-col gap-2.5">{renderFieldRows(eScienceType.Foreign)}</div>
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header>Совместный</AppCard.Header>
					<AppCard.Body className="flex-col">
						<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
							<div className={cn("gap-1", styles.labelDeskGrid5)}>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Название:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Начало:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Конец:</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Сумма (сум):</span>
								</label>
								<label className={styles.cardBodyLabel}>
									<span className="text-main-bold">Подтверждающий документ:</span>
								</label>
							</div>

							<div className={styles.cardBodyLabel}>
								<span className="text-main-bold">Действие:</span>
							</div>
						</div>

						<div className="flex-col gap-2.5">{renderFieldRows(eScienceType.Joint)}</div>
					</AppCard.Body>
				</AppCard>
			</div>

			{/* TODO: make a component to avoid duplicates */}
			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/reports/science" size="lg" variant="dark" withIcon>
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

export default ScienceCreatePage;
