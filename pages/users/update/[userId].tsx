import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {useFieldArray, useForm} from "react-hook-form";
import {eScope, eTable, eTablePermission, IUserCreateParams, PermissionModel, UserModel} from "../../../core/models";
import Head from "next/head";
import {AppButton, AppCard, AppInput, AppSpecialitySelect} from "../../../components/Main";
import styles from "../../../styles/reports.module.scss";
import cn from "classnames";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../../assets/images/icons/filled/checked.svg";
import {AppOrganizationSelect} from "../../../components/Main/AppOrganizationSelect";
import {createUserThunk, getUsersByIdThunk, updateUserThunk} from "../../../core/store/user/user.thunks";
import {ReactSelect} from "../../../components/External";
import PlusIcon from "../../../assets/images/icons/filled/plus.svg";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import {tableList, tablePermissionsList} from "../../../core/models/appendix/table";
import {scopeList} from "../../../core/models/appendix/scope";
import moment from "moment";
import {AppPositionSelect} from "../../../components/Main/AppPositionSelect";

const fieldOptions = {required: true};

const UserUpdatePage = () => {
	const router = useRouter();

	const userId = router.query["userId"] as string;

	const dispatch = useAppDispatch();
	const me = useAppSelector(({user}) => user.current);

	const [user, setUser] = useState<UserModel>();
	const [options, setOptions] = useState({table: tableList, scope: scopeList, tablePermission: tablePermissionsList});
	const [paternalId, setPaternalId] = useState<number>();
	const [organizationId, setOrganizationId] = useState<number>();
	const [deletingPermissionsIds, setDeletingPermissionsIds] = useState<number[]>([]);

	useEffect(() => {
		if (userId) {
			const promise = dispatch(getUsersByIdThunk(+userId));

			promise.then((res) => {
				const user = res.payload as UserModel;
				if (user) {
					setUser(user);

					reset({
						firstName: user.firstName,
						lastName: user.lastName,
						secondName: user.secondName,
						birthDate: moment(user.birthDate).format("yyyy-MM-DD"),
						positionId: user.position.id,
						position: user.position,
						specialityId: user.speciality.id,
						speciality: user.speciality,
						phone: user.contact.phone,
						organizationId: user.organization.id,
						organization: user.organization,
						permissions: user.permissions?.map((p) => ({...p, pId: p.id})),
					});
				}
			});

			return () => {
				promise.abort();
			};
		}
	}, [userId]);

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
		reset,
		setError,
		formState: {errors},
	} = useForm<
		Omit<IUserCreateParams, "permissions"> & {
			permissions: (PermissionModel & {pId?: number})[];
			checkPassword: IUserCreateParams["password"];
			position: UserModel["position"];
			speciality: UserModel["speciality"];
			organization: UserModel["organization"];
		}
	>({
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

	if (!user) return null;

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

	const onRemove = (index: number, permissionId?: number) => () => {
		if (permissionId) {
			setDeletingPermissionsIds((prev) => [...prev, permissionId]);
		}
		remove(index);
	};

	const onSubmit = async ({
		checkPassword,
		speciality,
		position,
		organization,
		...fields
	}: IUserCreateParams & {
		checkPassword: IUserCreateParams["password"];
		position: UserModel["position"];
		speciality: UserModel["speciality"];
		organization: UserModel["organization"];
	}) => {
		if (checkPassword === fields.password) {
			const action = await dispatch(updateUserThunk({id: +userId, body: fields, deletingPermissionsIds}));
			const id = action.payload as number;

			if (id) {
				void router.push(`/users/${id}`);
			}
		} else {
			setError("password", {message: "Пароли не совпадают."});
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
								defaultValue={tableList.filter((option) => option.value === getValues().permissions[index].table)}
								onChange={onSelect("table", index)}
								options={tableList}
								placeholder="Выберите..."
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
								defaultValue={tablePermissionsList.filter((option) =>
									getValues().permissions[index].permissions.includes(option.value),
								)}
								onChange={onSelect("tablePermission", index)}
								options={tablePermissionsList}
								placeholder="Права"
							/>
						</div>
					</label>
					<label>
						<div className="w-100">
							{/*	scope only for same level (1,2,3,4)*/}
							<ReactSelect
								menuPlacement="auto"
								defaultValue={scopeList.filter((option) => option.value === getValues().permissions[index].scope)}
								onChange={onSelect("scope", index)}
								options={scopeList}
								placeholder="Уровень"
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
						<AppButton onClick={onRemove(index, field.pId)} type="button" variant="danger" size="square" withIcon>
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
				<title>Редактирование пользователя</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex-col gap-1.25">
				<h1 className="h1">Редактирование пользователя</h1>

				<AppCard>
					<AppCard.Header className="text-start">Данные</AppCard.Header>
					<AppCard.Body>
						<div className={cn("gap-1.25 mb-1.25", styles.labelDeskGrid3)}>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Имя:</span>
								<AppInput placeholder="Имя" className="w-100" type="text" {...register("firstName", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Фамилия:</span>
								<AppInput placeholder="Фамилия" className="w-100" type="text" {...register("lastName", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Отчество:</span>
								<AppInput
									placeholder="Отчество"
									className="w-100"
									type="text"
									{...register("secondName", fieldOptions)}
								/>
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Дата рождения:</span>
								<AppInput className="w-100" type="date" {...register("birthDate", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Должность:</span>
								{getValues().positionId && (
									<AppPositionSelect
										defaultValue={{label: getValues().position.title.ru, value: getValues().position.id}}
										onChange={onSingleSelect("positionId")}
									/>
								)}
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Специальность:</span>
								<AppSpecialitySelect
									defaultValue={{label: getValues().speciality.title.ru, value: getValues().speciality.id}}
									onChange={onSingleSelect("specialityId")}
								/>
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Номер телефона:</span>
								<AppInput placeholder="Телефон" className="w-100" type="tel" {...register("phone", fieldOptions)} />
							</label>
							<label style={{gridColumn: "2/4"}}>
								<span className="text-main-bold mb-0.5 d-inline-block">Название организации:</span>
								<AppOrganizationSelect
									organizationId={organizationId}
									paternalId={paternalId}
									defaultValue={{label: getValues().organization.title.ru, value: getValues().organization.id}}
									onChange={onSingleSelect("organizationId")}
								/>
							</label>
						</div>
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header className="text-start">Пароль</AppCard.Header>
					<AppCard.Body>
						<div className={cn("gap-1.25", styles.labelDeskGridDivided2)}>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Придумайте пароль:</span>
								<AppInput className="w-100" type="password" {...register("password", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Повторите пароль:</span>
								<AppInput className="w-100" type="password" {...register("checkPassword", fieldOptions)} />
							</label>
						</div>
						{errors.password && <p className="text-danger">{errors.password.message}</p>}
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header className="text-start">Права доступа</AppCard.Header>
					<AppCard.Body>
						<div className="flex-col gap-1.25">{renderFieldRows()}</div>
					</AppCard.Body>
				</AppCard>
			</div>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href={`/users/${userId}`} size="lg" variant="dark" withIcon>
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

export default UserUpdatePage;
