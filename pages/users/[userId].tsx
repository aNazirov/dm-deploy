import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../core/hooks";
import {deleteUserThunk, getUsersByIdThunk} from "../../core/store/user/user.thunks";
import {UserModel} from "../../core/models";
import Head from "next/head";
import {AppButton, AppCard} from "../../components/Main";
import styles from "../../styles/reports.module.scss";
import ChevronIcon from "../../assets/images/icons/filled/arrows/chevron-left.svg";
import TrashIcon from "../../assets/images/icons/filled/trash.svg";
import Moment from "react-moment";
import cn from "classnames";
import EditIcon from "../../assets/images/icons/filled/pencil.svg";

const UserInfoPage = () => {
	const router = useRouter();

	const userId = router.query["userId"] as string;

	const dispatch = useAppDispatch();
	const me = useAppSelector(({user}) => user.current);

	const [user, setUser] = useState<UserModel>();

	useEffect(() => {
		if (userId) {
			const promise = dispatch(getUsersByIdThunk(+userId));

			promise.then((res) => {
				if (res.payload) {
					setUser(res.payload as UserModel);
				}
			});

			return () => {
				promise.abort();
			};
		}
	}, [userId]);

	if (!user) return null;

	const onDelete = async () => {
		const action = await dispatch(deleteUserThunk(user.id));
		if (action.payload) {
			void router.push("/users");
		}
	};

	const onEditing = () => {
		void router.push(`update/${userId}`);
	};

	return (
		<>
			<Head>
				<title>{user.displayName.ru}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex-col gap-1.25">
				<h1 className="h1">{user.displayName.ru}</h1>

				<AppCard>
					<AppCard.Header className="text-start">Данные</AppCard.Header>
					<AppCard.Body>
						<div className={cn("gap-1.25", styles.labelDeskGridDivided2)}>
							<div>
								<p className="text-main-bold mb-0.5 d-inline-block">Имя:</p>
								<p>{user.firstName}</p>
							</div>

							<div>
								<p className="text-main-bold mb-0.5 d-inline-block">Фамилия:</p>
								<p>{user.lastName}</p>
							</div>

							<div>
								<p className="text-main-bold mb-0.5 d-inline-block">Отчество:</p>
								<p>{user.secondName}</p>
							</div>
							<div>
								<p className="text-main-bold mb-0.5 d-inline-block">Номер телефона:</p>
								<p>{user.contact.phone}</p>
							</div>
							<div>
								<p className="text-main-bold mb-0.5 d-inline-block">Должность:</p>
								<p>{user.position.title.ru}</p>
							</div>
							<div>
								<p className="text-main-bold mb-0.5 d-inline-block">Специальность:</p>
								<p>{user.speciality.title.ru}</p>
							</div>
							<div>
								<p className="text-main-bold mb-0.5 d-inline-block">Дата рождения:</p>
								<p>
									<Moment format="DD.MM.YYYY">{user.birthDate}</Moment>
								</p>
							</div>
							<div>
								<p className="text-main-bold mb-0.5 d-inline-block">Название организации:</p>
								<p>{user.organization.title.ru}</p>
							</div>
						</div>
					</AppCard.Body>
				</AppCard>
			</div>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/users" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<div className="d-flex gap-1.25">
					<AppButton onClick={onEditing} size="lg" variant="print" withIcon>
						<EditIcon width="24px" height="24px" />
						<span>Редактировать</span>
					</AppButton>
					{user.id !== me?.id && (
						<AppButton onClick={onDelete} size="lg" variant="danger" withIcon>
							<TrashIcon width="24px" height="24px" />
							<span>Удалить</span>
						</AppButton>
					)}
				</div>
			</div>
		</>
	);
};

export default UserInfoPage;
