import React, {DetailedHTMLProps, HTMLAttributes, useEffect} from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import LogoImage from "../../../assets/images/logo/dm-logo.png";
import NotificationImage from "../../../assets/images/icons/filled/notification.svg";
import UserSettingsIcon from "../../../assets/images/icons/filled/users/user-settings.svg";
import {AppButton, AppDropdown, ThemeButton} from "../../Main";

import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {autoLoginThunk, userLogoutThunk} from "../../../core/store/user/user.thunks";
import {setCurrentUserAction} from "../../../core/store/user/user.slices";

type HeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Header = ({className}: HeaderProps) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(({user}) => user.current);

	useEffect(() => {
		const promises = [dispatch(autoLoginThunk())];

		return () => {
			promises.forEach((p) => p.abort());
			dispatch(setCurrentUserAction(null));
		};
	}, []);

	const onLogout = () => {
		dispatch(userLogoutThunk());
	};

	const onMenuChange = (option: {title: string; value: string | number}) => {
		if (option.value === "logout") {
			dispatch(onLogout);
		}
	};

	const onLanguageChange = (lang: {title: string; value: string | number}) => {
		console.log(lang);
	};

	return (
		<header className={cn(styles.header, className)}>
			<div className={styles.headerStart}>
				<Link href="/">
					<Image width={80} height={80} src={LogoImage} alt="" />
				</Link>
				<div>
					<p className="mb-0.625">
						<span className="text-main-bold me-0.75">Организация :</span>
						<span className="text-main-regular">{user?.organization?.title.ru}</span>
					</p>
					<p>
						<span className="text-main-bold me-0.75">Имя пользователя :</span>
						<span className="text-main-regular">{user?.displayName?.ru}</span>
					</p>
				</div>
			</div>
			<div className={styles.headerEnd}>
				<AppDropdown
					className={styles.headerEngLangSelect}
					textAlign="center"
					position="right"
					changeCb={onLanguageChange}
					list={languages}
				>
					<AppButton size="lg" variant="main">
						Русский
					</AppButton>
				</AppDropdown>

				<ThemeButton />

				<AppDropdown textAlign="start" position="right" changeCb={onLanguageChange} list={notifications}>
					<AppButton size="square" type="button">
						<NotificationImage className="main-btn-text-color" />
					</AppButton>
				</AppDropdown>

				<AppDropdown header="Принимающий" textAlign="end" position="right" changeCb={onMenuChange} list={menu}>
					<AppButton size="square" variant="main" type="button">
						<UserSettingsIcon />
					</AppButton>
				</AppDropdown>
			</div>
		</header>
	);
};

const languages = [
	{title: "O’zbek", value: "uz"},
	{title: "English", value: "en"},
];

const notifications = [
	{title: "Пункт списка", value: "test"},
	{title: "Пункт списка 1", value: "test1"},
	{title: "Пункт списка 2", value: "test2"},
];

const menu = [
	{title: "Аккаунт", value: "account"},
	{title: "Изменить пароль", value: "password"},
	{title: "Выйти", value: "logout"},
];
