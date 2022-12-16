import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState} from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import cn from "classnames";
import autoAnimate from "@formkit/auto-animate";
import HomeIcon from "../../../assets/images/icons/filled/home.svg";
import ListIcon from "../../../assets/images/icons/filled/bag-list.svg";
import CircleIcon from "../../../assets/images/icons/filled/radio.svg";
import FilledCircleIcon from "../../../assets/images/icons/filled/checked-radio.svg";
import ChevronDownIcon from "../../../assets/images/icons/filled/arrows/chevron-down.svg";
import ExchangeIcon from "../../../assets/images/icons/filled/arrows/exchange.svg";
import {AppButton} from "../../Main";
import {useRouter} from "next/router";

type SidebarProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Sidebar = ({className}: SidebarProps) => {
	// react hooks
	const [isCollapsed, setIsCollapsed] = useState(false);

	const onSidebarCollapse = () => {
		setIsCollapsed((prev) => !prev);
	};

	return (
		<aside className={cn(styles.aside, className, {[styles.collapsed]: isCollapsed})}>
			<div className={cn("rounded", styles.asideListWrapper)}>
				<ul className={styles.asideList}>
					<li>
						<Link className={cn("rounded", styles.asideLink)} href="/">
							<HomeIcon width="24px" height="24px" className="main-btn-text-color" />
							<span>Главная</span>
						</Link>
					</li>
					<CollapsableList title="Отчёт учреждений" />
					<CollapsableList title="Свод отчётов" />
					<CollapsableList title="Отчёты" />
				</ul>
			</div>
			<AppButton onClick={onSidebarCollapse} className={cn("flex-center mt-auto", styles.collapseBtn)}>
				<ExchangeIcon width="32px" height="32px" className="main-btn-text-color" />
			</AppButton>
		</aside>
	);
};

// TODO: move to separate file
interface CollapsableListProps {
	title: string;
}

// TODO: onClick to collapse btn, hide all opened submenus
const CollapsableList = ({title}: CollapsableListProps) => {
	// next hooks
	const router = useRouter();

	// react hooks
	const [isOpened, setIsOpened] = useState(false);

	const menuRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (menuRef.current) {
			autoAnimate(menuRef.current);
		}
	}, [menuRef]);

	const onToggle = (e: Event) => {
		e.preventDefault();
		setIsOpened((prev) => !prev);
	};

	const isCurrentPath = (path: string) => router.pathname === path;

	return (
		<li ref={menuRef}>
			<Link className={cn("rounded", styles.asideLink, {[styles.active]: isOpened})} href="/">
				<ListIcon width="24px" height="24px" className="main-btn-text-color" />
				<span>{title}</span>

				<ChevronDownIcon
					onClick={onToggle}
					width="18px"
					height="18px"
					className={cn("main-btn-text-color ms-auto", styles.chevronIcon)}
				/>
			</Link>
			{isOpened && (
				<ul className={styles.asideSubList}>
					{/* TODO: add routes array mapping  */}
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/daily")})}
							href="/reports/daily"
						>
							{isCurrentPath("/reports/daily") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Ежедневный отчёт</span>
						</Link>
					</li>

					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/training")})}
							href="/reports/training"
						>
							{isCurrentPath("/reports/training") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Повышение квалификации</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/training-list")})}
							href="/reports/training-list"
						>
							{isCurrentPath("/reports/training-list") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}

							<span>Повышение квалификации (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/training-list-info")})}
							href="/reports/training-list-info"
						>
							{isCurrentPath("/reports/training-list-info") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Повышение квалификации (детали)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/regions-work-done")})}
							href="/reports/regions-work-done"
						>
							{isCurrentPath("/reports/regions-work-done") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Проделанная работа в регионах (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/regions-work-done-list")})}
							href="/reports/regions-work-done-list"
						>
							{isCurrentPath("/reports/regions-work-done-list") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Проделанная работа в регионах (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/regions-work-done-list-info")})}
							href="/reports/regions-work-done-list-info"
						>
							{isCurrentPath("/reports/regions-work-done-list-info") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Проделанная работа в регионах (детали)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/center-financial-expenses")})}
							href="/reports/center-financial-expenses"
						>
							{isCurrentPath("/reports/center-financial-expenses") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Финансовые расходы центра (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/center-financial-expenses-list")})}
							href="/reports/center-financial-expenses-list"
						>
							{isCurrentPath("/reports/center-financial-expenses-list") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Финансовые расходы центра (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {
								active: isCurrentPath("/reports/center-financial-expenses-list-info"),
							})}
							href="/reports/center-financial-expenses-list-info"
						>
							{isCurrentPath("/reports/center-financial-expenses-list-info") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Финансовые расходы центра (детали)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/appeals")})}
							href="/reports/appeals"
						>
							{isCurrentPath("/reports/appeals") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Обращения физических и юридических лиц</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/appeals-list")})}
							href="/reports/appeals-list"
						>
							{isCurrentPath("/reports/appeals-list") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Обращения физических и юридических лиц (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/appeals-list-info")})}
							href="/reports/appeals-list-info"
						>
							{isCurrentPath("/reports/appeals-list-info") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Обращения физических и юридических лиц (детали)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/science")})}
							href="/reports/science"
						>
							{isCurrentPath("/reports/science") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Наука (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/science-list")})}
							href="/reports/science-list"
						>
							{isCurrentPath("/reports/science-list") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Наука (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/science-list-info")})}
							href="/reports/science-list-info"
						>
							{isCurrentPath("/reports/science-list-info") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Наука (детали)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/visit-foreign-specialists")})}
							href="/reports/visit-foreign-specialists"
						>
							{isCurrentPath("/reports/visit-foreign-specialists") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Визит иностранных специалистов</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/visit-foreign-specialists-list")})}
							href="/reports/visit-foreign-specialists-list"
						>
							{isCurrentPath("/reports/visit-foreign-specialists-list") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Визит иностранных специалистов (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/telemedicine")})}
							href="/reports/telemedicine"
						>
							{isCurrentPath("/reports/telemedicine") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Телемедицина (ОЦ)</span>
						</Link>
					</li>
					<li>
						<Link
							className={cn("list-item rounded-md", {active: isCurrentPath("/reports/telemedicine-list")})}
							href="/reports/telemedicine-list"
						>
							{isCurrentPath("/reports/telemedicine-list") ? (
								<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
							) : (
								<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
							)}
							<span>Телемедицина (ОЦ)</span>
						</Link>
					</li>
				</ul>
			)}
		</li>
	);
};
