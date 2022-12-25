import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import {AppCard} from "../AppCard";
import styles from "./styles.module.scss";
import {AppButton} from "../AppButton";
import cn from "classnames";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	list: {title: string; subtitle: string; url: string}[];
}

export const LinksCardDesk = ({list, className, ...props}: IProps) => {
	const renderList = () => {
		return list.map((item) => (
			<AppCard rounded="lg" key={`${item.title}_${item.url}`}>
				<AppButton
					variant="outline-success"
					rounded="lg"
					useAs="link"
					href={item.url}
					className="flex-col flex-center gap-0.75 py-2 px-1.25 h-100 border-w-0"
				>
					<h3 className="h3">{item.title}</h3>
					<p className="text-main-regular">{item.subtitle}</p>
				</AppButton>
			</AppCard>
		));
	};
	return (
		<div className={cn(styles.cardDeskGrid3, className)} {...props}>
			{renderList()}
		</div>
	);
};
