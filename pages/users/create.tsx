import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../core/hooks";
import {useFieldArray, useForm} from "react-hook-form";
import {eScope, eTable, eTablePermission, IUserCreateParams} from "../../core/models";
import Head from "next/head";
import {AppButton, AppCard, AppInput, AppSpecialitySelect} from "../../components/Main";
import styles from "../../styles/reports.module.scss";
import cn from "classnames";
import ChevronIcon from "../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../assets/images/icons/filled/checked.svg";
import {AppOrganizationSelect} from "../../components/Main/AppOrganizationSelect";
import {createUserThunk} from "../../core/store/user/user.thunks";
import {ReactSelect} from "../../components/External";
import PlusIcon from "../../assets/images/icons/filled/plus.svg";
import TrashIcon from "../../assets/images/icons/filled/trash.svg";
import {tableList, tablePermissionsList} from "../../core/models/appendix/table";
import {scopeList} from "../../core/models/appendix/scope";
import {AppPositionSelect} from "../../components/Main/AppPositionSelect";

const fieldOptions = {required: true};

const CreateUserPage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();
	const me = useAppSelector(({user}) => user.current);

	const [options, setOptions] = useState({table: tableList, scope: scopeList, tablePermission: tablePermissionsList});
	const [paternalId, setPaternalId] = useState<number>();
	const [organizationId, setOrganizationId] = useState<number>();

	useEffect(() => {
		if (me) {
			const organizationPermission = me?.permissions?.find((p) => p.table === eTable.Organization);
			if (organizationPermission?.scope === eScope.Level_4) {
				setPaternalId(undefined);
			} else if (organizationPermission?.scope === eScope.Level_3) {
				setPaternalId(me.organization.id);
			} else {
				setOrganizationId(me.organization.id);
			}
		}
	}, [me]);

	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		getValues,
		setError,
		formState: {errors},
	} = useForm<IUserCreateParams & {checkPassword: IUserCreateParams["password"]}>({
		defaultValues: {
			permissions: [
				{
					table: undefined,
					permissions: [],
					scope: eScope.Level_1,
				},
			],
		},
	});
	const {fields, append, remove} = useFieldArray({
		control,
		name: "permissions",
	});

	const onSelect = (type: keyof typeof options, index: number) => (option: unknown) => {
		if (type === "table") {
			const field = option as {label: string; value: eTable};

			setValue(`permissions.${index}.table`, field.value);
		} else if (type === "tablePermission") {
			const field = option as {label: string; value: eTablePermission}[];

			setValue(
				`permissions.${index}.permissions`,
				field.map((f) => f.value),
			);
		} else if (type === "scope") {
			const field = option as {label: string; value: eScope};

			setValue(`permissions.${index}.scope`, field.value);
		}
	};

	const onSingleSelect = (key: "specialityId" | "organizationId" | "positionId") => (option: unknown) => {
		const field = option as {label: string; value: string};
		setValue(key, +field.value);
	};

	const onAppend = () => {
		append({
			table: undefined as unknown as eTable,
			permissions: [],
			scope: eScope.Level_1,
		});
	};

	const onRemove = (index: number) => () => {
		remove(index);
	};

	const onSubmit = async ({
		checkPassword,
		...fields
	}: IUserCreateParams & {checkPassword: IUserCreateParams["password"]}) => {
		if (checkPassword === fields.password) {
			const action = await dispatch(createUserThunk(fields));
			const id = action.payload as number;

			if (id) {
				void router.push(`/users/${id}`);
			}
		} else {
			setError("password", {message: "???????????? ???? ??????????????????."});
		}
	};

	const renderFieldRows = () => {
		return fields.map((field, index) => (
			<div className={cn("gap-1", styles.labelDeskGrid2)} key={field.id}>
				<div className={cn("gap-1", styles.labelDeskGrid3)}>
					<label>
						<div className="w-100">
							<ReactSelect
								menuPlacement="auto"
								onChange={onSelect("table", index)}
								options={tableList}
								placeholder="????????????????..."
							/>
						</div>
					</label>
					<label>
						<div className="w-100">
							{/* (status set of reports only if owner has these permissions)*/}
							<ReactSelect
								menuPlacement="auto"
								isMulti
								autoHeight
								onChange={onSelect("tablePermission", index)}
								options={tablePermissionsList}
								placeholder="??????????"
							/>
						</div>
					</label>
					<label>
						<div className="w-100">
							{/*	scope only for same level (1,2,3,4)*/}
							<ReactSelect
								menuPlacement="auto"
								onChange={onSelect("scope", index)}
								options={scopeList}
								placeholder="??????????????"
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
				<title>?????????????????????? ????????????????????????</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex-col gap-1.25">
				<h1 className="h1">?????????????????????? ????????????????????????</h1>

				<AppCard>
					<AppCard.Header className="text-start">????????????</AppCard.Header>
					<AppCard.Body>
						<div className={cn("gap-1.25 mb-1.25", styles.labelDeskGrid3)}>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">??????:</span>
								<AppInput placeholder="??????" className="w-100" type="text" {...register("firstName", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">??????????????:</span>
								<AppInput placeholder="??????????????" className="w-100" type="text" {...register("lastName", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">????????????????:</span>
								<AppInput
									placeholder="????????????????"
									className="w-100"
									type="text"
									{...register("secondName", fieldOptions)}
								/>
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">???????? ????????????????:</span>
								<AppInput className="w-100" type="date" {...register("birthDate", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">??????????????????:</span>
								<AppPositionSelect onChange={onSingleSelect("positionId")} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">??????????????????????????:</span>
								<AppSpecialitySelect onChange={onSingleSelect("specialityId")} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">?????????? ????????????????:</span>
								<AppInput placeholder="??????????????" className="w-100" type="tel" {...register("phone", fieldOptions)} />
							</label>
							<label style={{gridColumn: "2/4"}}>
								<span className="text-main-bold mb-0.5 d-inline-block">???????????????? ??????????????????????:</span>
								<AppOrganizationSelect
									organizationId={organizationId}
									paternalId={paternalId}
									onChange={onSingleSelect("organizationId")}
								/>
							</label>
						</div>
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header className="text-start">????????????</AppCard.Header>
					<AppCard.Body>
						<div className={cn("gap-1.25", styles.labelDeskGridDivided2)}>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">???????????????????? ????????????:</span>
								<AppInput className="w-100" type="password" {...register("password", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">?????????????????? ????????????:</span>
								<AppInput className="w-100" type="password" {...register("checkPassword", fieldOptions)} />
							</label>
						</div>
						{errors.password && <p className="text-danger">{errors.password.message}</p>}
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header className="text-start">?????????? ??????????????</AppCard.Header>
					<AppCard.Body>
						<div className="flex-col gap-1.25">{renderFieldRows()}</div>
					</AppCard.Body>
				</AppCard>
			</div>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/users" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					??????????
				</AppButton>
				<AppButton onClick={handleSubmit(onSubmit)} size="lg" variant="success" withIcon>
					<SuccessIcon width="24px" height="24px" />
					<span>??????????????</span>
				</AppButton>
			</div>
		</>
	);
};

export default CreateUserPage;
