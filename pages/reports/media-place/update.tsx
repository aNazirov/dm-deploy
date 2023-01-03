import React, {ChangeEvent, useEffect, useState} from "react";
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
import {eMediaPlace, IFile, IReportMediaPlaceCreateParams, MediaPlaceReportModel} from "../../../core/models";
import {
	getMediaPlaceReportByIdThunk,
	updateMediaPlaceReportThunk,
} from "../../../core/store/report/mediaPlace/mediaPlace.thunks";
import {setMediaPlaceReportByIdAction} from "../../../core/store/report/mediaPlace/mediaPlace.slices";
import {downloadFileThunk} from "../../../core/store/file/file.thunks";
import moment from "moment";
import {placeOptions} from "../../../core/models/appendix/places";

const fieldOptions = {
	required: true,
};

const MediaPlaceReportUpdatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const reportId = router.query["reportId"] as string;

	useEffect(() => {
		if (reportId) {
			const promise = dispatch(getMediaPlaceReportByIdThunk(+reportId));
			promise.then((res) => {
				if (res.payload) {
					const fields = res.payload as MediaPlaceReportModel;

					reset({
						mediaParts: fields.mediaParts?.map(({file, ...p}) => ({
							...p,
							fileId: file.id,
							date: moment(p.date).format("yyyy-MM-DD") as unknown as Date,
						})),
					});

					if (fields.mediaParts) {
						setExistingFiles(fields.mediaParts?.map((p) => p.file));
					}
				}
			});

			return () => {
				promise.abort();
				dispatch(setMediaPlaceReportByIdAction(null));
			};
		}
	}, [reportId]);

	const [files, setFiles] = useState<File[]>([]);
	const [errText, setErrText] = useState("");
	const [existingFiles, setExistingFiles] = useState<IFile[]>([]);
	const [deletingPartsIds, setDeletingPartsIds] = useState<number[]>([]);

	const {register, control, handleSubmit, setValue, reset, getValues} = useForm<{
		mediaParts: {title: string; place: eMediaPlace; date: Date; fileId: number; id?: number}[];
		note?: string;
	}>({
		defaultValues: {
			mediaParts: [
				{
					date: undefined,
					place: undefined,
					title: undefined,
				},
			],
		},
	});
	const {fields, append, remove} = useFieldArray({
		control,
		name: "mediaParts",
	});

	const onAppend = () => {
		append({
			place: undefined as unknown as eMediaPlace,
			title: undefined as unknown as string,
			date: undefined as unknown as Date,
			fileId: undefined as unknown as number,
		});
	};

	const onSelect = (index: number) => (option: unknown) => {
		const field = option as {label: string; value: eMediaPlace};
		setValue(`mediaParts.${index}.place`, field.value);
	};

	const onSubmit = async (fieldsArr: IReportMediaPlaceCreateParams) => {
		if (fieldsArr.mediaParts.length === files.length + (existingFiles?.length ?? 0)) {
			setErrText("");

			const formData = new FormData();

			files.forEach((f) => formData.append("files", f));

			const action = await dispatch(
				updateMediaPlaceReportThunk({
					payload: {id: +reportId, deletingPartsIds, body: fieldsArr},
					formData,
				}),
			);
			const id = action.payload as number;

			if (id) {
				void router.push(`/reports/media-place/${id}`);
			}
		} else {
			setErrText(`Количество специалистов должно совпадать с количеством привязанных документов.`);
		}
	};

	// TODO: make a component
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

	const onRemove = (index: number, partId?: number) => () => {
		if (partId) {
			onFileDelete(getValues().mediaParts[index].fileId);

			setDeletingPartsIds((prev) => [...prev, partId]);
		}
		remove(index);
	};

	const onFileDelete = (id: number) => {
		setExistingFiles((prev) => prev?.filter((f) => f.id !== id));
	};

	const downloadFile =
		(url: string, name = "file") =>
		() => {
			dispatch(downloadFileThunk({url, name}));
		};

	const renderReceivedFiles = () => {
		return existingFiles?.map((f) => (
			<AppButton
				key={f.id}
				variant="print"
				size="lg"
				onClick={downloadFile(f.url, f.name)}
				className="text-center"
				type="button"
			>
				{f.name}
			</AppButton>
		));
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
				<div className={cn("gap-1", styles.labelDeskGrid3)}>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput
								className="text-center"
								type="text"
								placeholder="-"
								{...register(`mediaParts.${index}.title`, fieldOptions)}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<ReactSelect
								onChange={onSelect(index)}
								defaultValue={placeOptions.filter((option) => option.value === getValues().mediaParts[index].place)}
								options={placeOptions}
								placeholder="Выберите площадку"
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppInput type="date" {...register(`mediaParts.${index}.date`, fieldOptions)} />
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
							onClick={onRemove(index, getValues().mediaParts[index].id)}
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
				<title>Медиа отчёт</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">Медиа отчёт</h1>

			<AppDivider className="my-1.25" />

			<div className={styles.filters}>
				<label className={styles.filterLabel}>
					<span className="text-main-bold">Дата:</span>
					<AppInput type="date" />
				</label>

				<label className={styles.filterLabel}>
					<span className="text-main-bold">Номер:</span>
					<AppButton variant="main" size="square">
						80
					</AppButton>
				</label>
			</div>

			<AppCard className="mb-2.5">
				<AppCard.Header>Основные данные</AppCard.Header>
				<AppCard.Body className="flex-col">
					<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
						<div className={cn("gap-1", styles.labelDeskGrid3)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Тема:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Место публикации:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">Дата:</span>
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
							{renderReceivedFiles()}
							{renderFiles()}
							{errText}
						</AppCard.Body>
					</AppCard>
				</div>
			</div>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href={`/reports/media-place/${reportId}`} size="lg" variant="dark" withIcon>
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

export default MediaPlaceReportUpdatePage;
