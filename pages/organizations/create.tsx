import React from "react";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../core/hooks";
import {useForm} from "react-hook-form";
import {IOrganizationCreateParams} from "../../core/models";
import Head from "next/head";
import {AppButton, AppCard, AppInput} from "../../components/Main";
import styles from "../../styles/reports.module.scss";
import cn from "classnames";
import ChevronIcon from "../../assets/images/icons/filled/arrows/chevron-left.svg";
import SuccessIcon from "../../assets/images/icons/filled/checked.svg";
import {createOrganizationThunk} from "../../core/store/organization/organization.thunks";

const fieldOptions = {required: true};

const CreateOrganizationPage = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const {register, handleSubmit} = useForm<IOrganizationCreateParams>();

	const onSubmit = async (fields: IOrganizationCreateParams) => {
		const action = await dispatch(createOrganizationThunk(fields));
		const id = action.payload as number;

		if (id) {
			void router.push(`/organizations/${id}`);
		}
	};

	return (
		<>
			<Head>
				<title>Регистрация организации</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex-col gap-1.25">
				<h1 className="h1">Регистрация организации</h1>

				<AppCard>
					<AppCard.Header className="text-start">Данные клиники</AppCard.Header>
					<AppCard.Body>
						<div className={cn("gap-1.25", styles.labelDeskGrid3)}>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Наименование организации:</span>
								<AppInput placeholder="Имя" className="w-100" type="text" {...register("title.ru", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Name of the organization:</span>
								<AppInput placeholder="Фамилия" className="w-100" type="text" {...register("title.en", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Tashkilot nomi:</span>
								<AppInput placeholder="Фамилия" className="w-100" type="text" {...register("title.uz", fieldOptions)} />
							</label>
						</div>
					</AppCard.Body>
				</AppCard>

				<AppCard>
					<AppCard.Header className="text-start">Реквизиты</AppCard.Header>
					<AppCard.Body className="flex-col gap-1.25">
						<div className={cn("gap-1.25", styles.labelDeskGridDivided2)}>
							<div className={cn("gap-1.25", styles.labelDeskGridDivided2)}>
								<label>
									<span className="text-main-bold mb-0.5 d-inline-block">Осн. р/с:</span>
									<AppInput
										placeholder="20208000400451672001"
										className="w-100"
										type="text"
										{...register("mainrs", fieldOptions)}
									/>
								</label>
								<label>
									<span className="text-main-bold mb-0.5 d-inline-block">МФО:</span>
									<AppInput placeholder="МФО" className="w-100" type="text" {...register("mfi", fieldOptions)} />
								</label>
							</div>

							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Адрес банка:</span>
								<AppInput placeholder="Адрес" className="w-100" type="text" {...register("address", fieldOptions)} />
							</label>
						</div>

						<div className={cn("gap-1.25", styles.labelDeskGrid4)}>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">ИНН:</span>
								<AppInput placeholder="ИНН" className="w-100" type="text" {...register("itn", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">ОКЭД:</span>
								<AppInput placeholder="ОКЭД" className="w-100" type="text" {...register("ccea", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">ОКПО:</span>
								<AppInput placeholder="ОКПО" className="w-100" type="text" {...register("rcbo", fieldOptions)} />
							</label>
							<label>
								<span className="text-main-bold mb-0.5 d-inline-block">Регистрационный код плательщика НДС:</span>
								<AppInput
									placeholder="Код плательщика"
									className="w-100"
									type="text"
									{...register("vatId", fieldOptions)}
								/>
							</label>
						</div>
					</AppCard.Body>
				</AppCard>
			</div>

			<div className="flex-justify-between mt-auto pt-2.5">
				<AppButton useAs="link" href="/organizations" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>
				<AppButton onClick={handleSubmit(onSubmit)} size="lg" variant="success" withIcon>
					<SuccessIcon width="24px" height="24px" />
					<span>Создать</span>
				</AppButton>
			</div>
		</>
	);
};

export default CreateOrganizationPage;
