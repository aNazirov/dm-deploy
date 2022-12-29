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
import {eTable, eTablePermission} from "../../../core/models";
import {useAppSelector} from "../../../core/hooks";

type SidebarProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Sidebar = ({className}: SidebarProps) => {
	const permissions = useAppSelector(({user}) => user.user?.permissions);
	// react hooks
	const [isCollapsed, setIsCollapsed] = useState(false);

	const onSidebarCollapse = () => {
		setIsCollapsed((prev) => !prev);
	};

	const filteredOrganizationsReportLinks = organizationsReportLinks.filter((link) => {
		const current = permissions?.find((p) => p.table === link.table);
		return current?.permissions.includes(eTablePermission.Read);
	});

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
					{filteredOrganizationsReportLinks.length > 0 ? (
						<CollapsableList linksList={filteredOrganizationsReportLinks} title="Отчёт учреждений" />
					) : null}
					<CollapsableList linksList={[]} title="Свод отчётов" />
					<CollapsableList linksList={[]} title="Отчёты" />
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
	linksList: {title: string; url: string; table: eTable}[];
}

// TODO: onClick to collapse btn, hide all opened submenus
const CollapsableList = ({title, linksList}: CollapsableListProps) => {
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

	const onToggle = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		setIsOpened((prev) => !prev);
	};

	const isCurrentPath = (path: string) => router.pathname.includes(path);

	const renderList = () => {
		return linksList.map((link, i) => (
			<li key={i}>
				<Link className={cn("list-item rounded-md", {active: isCurrentPath(link.url)})} href={link.url}>
					{isCurrentPath(link.url) ? (
						<FilledCircleIcon width="24px" height="24px" className="main-btn-text-color" />
					) : (
						<CircleIcon width="24px" height="24px" className="main-btn-text-color" />
					)}
					<span>{link.title}</span>
				</Link>
			</li>
		));
	};

	return (
		<li ref={menuRef}>
			<Link href="#" onClick={onToggle} className={cn("rounded w-100", styles.asideLink, {[styles.active]: isOpened})}>
				<ListIcon width="24px" height="24px" className="main-btn-text-color" />
				<span>{title}</span>
				<ChevronDownIcon width="18px" height="18px" className={cn("main-btn-text-color ms-auto", styles.chevronIcon)} />
			</Link>
			{isOpened && (
				<ul className={styles.asideSubList}>
					{renderList()}
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
				</ul>
			)}
		</li>
	);
};

const organizationsReportLinks = [
	{title: "Ежедневный отчёт", url: "/reports/daily", table: eTable.DailyReport},
	{title: "Повышение квалификации", url: "/reports/training", table: eTable.TrainingReport},
	{title: "Финансовые расходы центра (ОЦ)", url: "/reports/financial-expenses", table: eTable.FinancialExpensesReport},
	{
		title: "Визит иностранных специалистов (ОЦ)",
		url: "/reports/visit-foreign-specialists",
		table: eTable.VisitsOfForeignSpecialistsReport,
	},
	{title: "Телемедицина (ОЦ)", url: "/reports/telemedicine", table: eTable.TelemedicineReport},
	{title: "Медиа отчёт", url: "/reports/media-place", table: eTable.MediaReport},
	{title: "Научные проекты (ОЦ)", url: "/reports/science", table: eTable.ScienceReport},
	{title: "Научные защиты (ОЦ)", url: "/reports/scientific-events", table: eTable.ScientificEventsReport},
	{title: "Научные статьи, патенты и др.", url: "/reports/scientific-works", table: eTable.ScientificWorksReport},
	{title: "Страховые отчёты", url: "/reports/insurance", table: eTable.InsuranceReport},
	{title: "Внедрения", url: "/reports/implementation", table: eTable.ImplementationReport},
	{title: "Обращение физических и юридических лиц", url: "/reports/appeals", table: eTable.AppealsReport},
];
