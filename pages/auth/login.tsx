import React from "react";
import Head from "next/head";
import Image from "next/image";
import {useForm} from "react-hook-form";
import cn from "classnames";
import {AppButton, AppInput} from "../../components/Main";
import {useAppDispatch} from "../../core/hooks";
import {userLoginThunk} from "../../core/store/user/user.thunks";
import {ILogin} from "../../core/models";
import LogoImage from "../../assets/images/logo/dm-logo.png";
import UserAvatarImage from "../../assets/images/icons/filled/users/user.svg";
import LockImage from "../../assets/images/icons/filled/lock.svg";
import styles from "../../styles/auth.module.scss";
import {useRouter} from "next/router";

const LoginPage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const {register, handleSubmit} = useForm<ILogin>({
		defaultValues: {
			phone: "+998908380334",
			password: "k5Hx1Tl9e1G$",
		},
	});

	const onSubmit = async (fields: ILogin) => {
		const action = await dispatch(userLoginThunk(fields));
		if (action.payload) {
			void router.push("/");
		}
	};

	return (
		<div className={cn("flex-center", styles.authPage)}>
			<Head>
				<title>Логин</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				<div className="flex-center">
					<Image className={styles.logo} src={LogoImage} alt="" />
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
					<h1 className="h1">Вход</h1>
					<AppInput
						bg="colored"
						Icon={UserAvatarImage}
						type="tel"
						placeholder="Телефон"
						{...register("phone", {required: true})}
					/>
					<AppInput
						bg="colored"
						Icon={LockImage}
						type="password"
						placeholder="Пароль"
						{...register("password", {required: true})}
					/>
					<AppButton size="xl" variant="main">
						Войти
					</AppButton>
					{/*<p>
						<span>Нет аккаунта? </span>
						<Link className={cn("text-main-bold", styles.signupLink)} href="/auth/signup">
							Зарегистрироваться
						</Link>
					</p>*/}
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
