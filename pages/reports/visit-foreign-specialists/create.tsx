import React, {ChangeEvent, useState} from "react";
import Head from "next/head";
import {
	AppButton,
	AppCard,
	AppCountrySelect,
	AppDivider,
	AppInput,
	AppSpecialitySelect,
} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import cn from "classnames";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import PlusIcon from "../../../assets/images/icons/filled/plus.svg";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../core/hooks";
import {useFieldArray, useForm} from "react-hook-form";
import {
	IAutoCompleteParams,
	IAutoCompleteResult,
	IReportVisitsOfForeignSpecialistsCreateParams,
} from "../../../core/models";
import {createVisitForeignSpecialistsReportThunk} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.thunks";
import {globalAutocompleteThunk} from "../../../core/store/global/global.thunks";

const fieldOptions = {
	required: true,
};

const VisitForeignSpecialistsReportCreatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [files, setFiles] = useState<File[]>([]);
	const [errText, setErrText] = useState("");

	const {register, control, handleSubmit, setValue} = useForm<IReportVisitsOfForeignSpecialistsCreateParams>({
		defaultValues: {
			visitsOfForeignSpecialists: [
				{
					countryId: undefined,
					endDate: undefined,
					fileId: undefined,
					startDate: undefined,
					displayName: undefined,
					specialityId: undefined,
					organization: undefined,
				},
			],
		},
	});
	const {fields, append, remove} = useFieldArray({
		control,
		name: "visitsOfForeignSpecialists",
	});

	const onAppend = () => {
		append({
			countryId: undefined as unknown as number,
			endDate: undefined as unknown as string,
			fileId: undefined as unknown as number,
			startDate: undefined as unknown as string,
			displayName: undefined as unknown as string,
			specialityId: undefined as unknown as number,
			organization: undefined as unknown as string,
		});
	};

	const onRemove = (index: number) => () => {
		remove(index);
	};

	const onSelect =
		({type, index}: {type: "specialityId" | "countryId"; index: number}) =>
		(option: unknown) => {
			const field = option as {label: string; value: number};
			setValue(`visitsOfForeignSpecialists.${index}.${type}`, +field.value);
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

	const onSubmit = async (fieldsArr: IReportVisitsOfForeignSpecialistsCreateParams) => {
		if (fieldsArr.visitsOfForeignSpecialists.length === files.length) {
			setErrText("");

			const formData = new FormData();

			files.forEach((f) => formData.append("files", f));

			const action = await dispatch(createVisitForeignSpecialistsReportThunk({payload: fieldsArr, formData}));
			const id = action.payload as number;

			if (id) {
				void router.push(`/reports/visit-foreign-specialists/${id}`);
			}
		} else {
			setErrText(`Количество специалистов должно совпадать с количеством привязанных документов.`);
		}
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

	const renderFieldRows = () => {
		return fields.map((field, index) => (
			<div className={cn("gap-1", styles.labelDeskGrid2)} key={field.id}>
				<div className={cn("gap-1", styles.labelDeskGrid6)}>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="text"
								placeholder="-"
								{...register(`visitsOfForeignSpecialists.${index}.displayName`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppSpecialitySelect onChange={onSelect({index, type: "specialityId"})} />
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppCountrySelect onChange={onSelect({index, type: "countryId"})} />
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="text"
								placeholder="-"
								{...register(`visitsOfForeignSpecialists.${index}.organization`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput type="date" {...register(`visitsOfForeignSpecialists.${index}.startDate`, fieldOptions)} />
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput type="date" {...register(`visitsOfForeignSpecialists.${index}.endDate`, fieldOptions)} />
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
				<title>Визит иностранных специалистов</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">Визит иностранных специалистов</h1>

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

			<AppCard className="mb-2">
				<AppCard.Header>Данные о визите</AppCard.Header>
				<AppCard.Body>
					<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
						<div className={cn("gap-1", styles.labelDeskGrid6)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Ф.И.О. пребывающего специалиста:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Специальность:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Страна пребывания:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Место основной работы (учреждение):</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Срок пребывания от:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Срок пребывания до:</span>
							</label>
						</div>

						<div className={styles.cardBodyLabel}>
							<span className="text-main-bold">Действие:</span>
						</div>
					</div>

					<div className="flex-col gap-2.5">{renderFieldRows()}</div>
				</AppCard.Body>
			</AppCard>

			<div className={cn(styles.cardDesk, styles.cardDeskGrid4, styles.bgWhite)}>
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
				<AppButton useAs="link" href="/reports/visit-foreign-specialists" size="lg" variant="dark" withIcon>
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

export default VisitForeignSpecialistsReportCreatePage;
