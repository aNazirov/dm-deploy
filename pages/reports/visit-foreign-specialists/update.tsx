import React, {ChangeEvent, useEffect, useState} from "react";
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
	IFile,
	IReportVisitsOfForeignSpecialistsCreateParamsPart,
	ISpeciality,
	ITranslate,
	VisitOfForeignSpecialistModel,
	VisitsOfForeignSpecialistsModel,
} from "../../../core/models";
import {
	getVisitForeignSpecialistsReportByIdThunk,
	updateVisitForeignSpecialistsReportThunk,
} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.thunks";
import moment from "moment/moment";
import {setVisitForeignSpecialistsReportByIdAction} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.slices";
import {downloadFileThunk} from "../../../core/store/file/file.thunks";

const fieldOptions = {
	required: true,
};

const VisitForeignSpecialistsReportUpdatePage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const reportId = router.query["reportId"] as string;

	useEffect(() => {
		if (reportId) {
			const promise = dispatch(getVisitForeignSpecialistsReportByIdThunk(+reportId));
			promise.then((res) => {
				if (res.payload) {
					const fields = res.payload as VisitsOfForeignSpecialistsModel;

					reset({
						visitsOfForeignSpecialists: fields.visitsOfForeignSpecialists?.map(({file, ...p}) => ({
							...p,
							fileId: file.id,
							speciality: p.speciality,
							country: p.country,
							startDate: moment(p.startDate).format("yyyy-MM-DD"),
							endDate: moment(p.endDate).format("yyyy-MM-DD"),
						})),
					});

					if (fields.visitsOfForeignSpecialists) {
						setExistingFiles(fields.visitsOfForeignSpecialists?.map((p) => p.file));
					}
				}
			});

			return () => {
				promise.abort();
				dispatch(setVisitForeignSpecialistsReportByIdAction(null));
			};
		}
	}, [reportId]);

	const [files, setFiles] = useState<File[]>([]);
	const [errText, setErrText] = useState("");
	const [existingFiles, setExistingFiles] = useState<IFile[]>([]);
	const [deletingPartsIds, setDeletingPartsIds] = useState<number[]>([]);

	const {register, control, handleSubmit, setValue, getValues, reset} = useForm<{
		visitsOfForeignSpecialists: (IReportVisitsOfForeignSpecialistsCreateParamsPart & {
			speciality: VisitOfForeignSpecialistModel["speciality"];
			country: VisitOfForeignSpecialistModel["country"];
		})[];
		note?: string;
	}>({
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
			country: undefined as unknown as {id: number; title: ITranslate},
			speciality: undefined as unknown as ISpeciality,
			countryId: undefined as unknown as number,
			endDate: undefined as unknown as string,
			fileId: undefined as unknown as number,
			startDate: undefined as unknown as string,
			displayName: undefined as unknown as string,
			specialityId: undefined as unknown as number,
			organization: undefined as unknown as string,
		});
	};

	const onFileDelete = (id: number) => {
		setExistingFiles((prev) => prev?.filter((f) => f.id !== id));
	};

	const onRemove = (index: number, partId?: number) => () => {
		if (partId) {
			onFileDelete(getValues().visitsOfForeignSpecialists[index].fileId);

			setDeletingPartsIds((prev) => [...prev, partId]);
		}
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

	const onSubmit = async (fieldsArr: {
		visitsOfForeignSpecialists: (IReportVisitsOfForeignSpecialistsCreateParamsPart & {
			speciality: VisitOfForeignSpecialistModel["speciality"];
			country: VisitOfForeignSpecialistModel["country"];
		})[];
		note?: string;
	}) => {
		if (fieldsArr.visitsOfForeignSpecialists.length === files.length + (existingFiles?.length ?? 0)) {
			setErrText("");

			const formData = new FormData();

			files.forEach((f) => formData.append("files", f));
			const body = fieldsArr.visitsOfForeignSpecialists.map(({speciality, country, ...v}) => ({
				...v,
				...(speciality ? {specialityId: speciality.id} : {}),
				...(country ? {countryId: country.id} : {}),
			}));

			const action = await dispatch(
				updateVisitForeignSpecialistsReportThunk({
					payload: {id: +reportId, deletingPartsIds, body: {visitsOfForeignSpecialists: body}},
					formData,
				}),
			);
			const id = action.payload as number;

			if (id) {
				void router.push(`/reports/visit-foreign-specialists/${id}`);
			}
		} else {
			setErrText(`???????????????????? ???????????????????????? ???????????? ?????????????????? ?? ?????????????????????? ?????????????????????? ????????????????????.`);
		}
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
							<AppSpecialitySelect
								defaultValue={{
									label: getValues().visitsOfForeignSpecialists[index].speciality?.title.ru,
									value: getValues().visitsOfForeignSpecialists[index].speciality?.id,
								}}
								onChange={onSelect({index, type: "specialityId"})}
							/>
						</div>
					</label>
					<label className={styles.cardBodyLabel}>
						<div className="w-100">
							<AppCountrySelect
								defaultValue={{
									label: getValues().visitsOfForeignSpecialists[index].country?.title.ru,
									value: getValues().visitsOfForeignSpecialists[index].country?.id,
								}}
								onChange={onSelect({index, type: "countryId"})}
							/>
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
						<AppButton
							onClick={onRemove(index, getValues().visitsOfForeignSpecialists[index].id)}
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
				<title>?????????? ?????????????????????? ????????????????????????</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className="h1 text-center">?????????? ?????????????????????? ????????????????????????</h1>

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

			<AppCard className="mb-2">
				<AppCard.Header>???????????? ?? ????????????</AppCard.Header>
				<AppCard.Body>
					<div className={cn("gap-1 mb-0.5", styles.labelDeskGrid2)}>
						<div className={cn("gap-1", styles.labelDeskGrid6)}>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">??.??.??. ???????????????????????? ??????????????????????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">??????????????????????????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????????? ????????????????????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">?????????? ???????????????? ???????????? (????????????????????):</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????? ???????????????????? ????:</span>
							</label>
							<label className={styles.cardBodyLabel}>
								<span className="text-main-bold">???????? ???????????????????? ????:</span>
							</label>
						</div>

						<div className={styles.cardBodyLabel}>
							<span className="text-main-bold">????????????????:</span>
						</div>
					</div>

					<div className="flex-col gap-2.5">{renderFieldRows()}</div>
				</AppCard.Body>
			</AppCard>

			<div className={cn("card-desk", styles.cardDesk, styles.cardDeskGrid4, styles.bgWhite)}>
				<div className={cn("pe-2", styles.cardWrapper)}>
					<AppCard className="h-100">
						<AppCard.Header>???????????????????????????? ????????????????</AppCard.Header>
						<AppCard.Body className={cn(styles.cardBody, styles.fileCardBody)}>
							<label className={styles.cardBodyLabel}>
								<AppInput
									onChange={onFileChange}
									className="text-center"
									type="file"
									placeholder="???????????????????? ????????"
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
				<AppButton
					useAs="link"
					href={`/reports/visit-foreign-specialists/${reportId}`}
					size="lg"
					variant="dark"
					withIcon
				>
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

export default VisitForeignSpecialistsReportUpdatePage;
