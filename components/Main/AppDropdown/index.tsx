import React, {DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";
import cn from "classnames";
import autoAnimate from "@formkit/auto-animate";
import {AppButton} from "../AppButton";

import styles from "./styles.module.scss";
import {useAppSelector, useOnClickOutside} from "../../../core/hooks";

interface IDropdownItem {
	title: string;
	value: string | number;
}

interface AppDropdownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	list: IDropdownItem[];
	position: "left" | "right";
	textAlign?: "start" | "end" | "center";
	changeCb: (param: IDropdownItem) => void;
	header?: ReactNode;
}

export const AppDropdown = ({list, position, textAlign, header, changeCb, children, className}: AppDropdownProps) => {
	const isDarkMode = useAppSelector(({global}) => global.isDarkMode);
	// react hooks
	const [isOpen, setIsOpen] = useState(false);
	const parentRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (parentRef.current) {
			autoAnimate(parentRef.current);
		}
	}, [parentRef]);

	// custom hooks
	useOnClickOutside(parentRef, () => setIsOpen(false));

	const onSelect = (item: IDropdownItem) => () => {
		setIsOpen(false);
		changeCb(item);
	};

	const onToggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const renderList = () => {
		return list.map((item, i) => (
			<li onClick={onSelect(item)} key={i}>
				<AppButton className="btn-md" type="button">
					{item.title}
				</AppButton>
			</li>
		));
	};

	return (
		<div ref={parentRef} className={className}>
			<div className={cn("h-100", styles.parentOfChildren)} onClick={onToggleDropdown}>
				{children}
			</div>

			{isOpen && (
				<ul
					className={cn("text-main-regular rounded", styles.list, {
						[styles.left]: position === "left",
						[styles.right]: position === "right",
						[styles[`text-${textAlign}`]]: textAlign,
						[styles.darkTheme]: isDarkMode,
					})}
				>
					{header && <li className={cn("text-main-bold", styles.listHeader)}>{header}</li>}
					{renderList()}
				</ul>
			)}
		</div>
	);
};
