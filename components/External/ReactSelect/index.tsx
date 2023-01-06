import React, {RefCallback, useId} from "react";
import Select, {GroupBase, OptionsOrGroups, Props} from "react-select";
import cn from "classnames";
import styles from "./styles.module.scss";
import {IAutoCompleteResult} from "../../../core/models";
import AsyncSelect from "react-select/async";

interface ReactSelectProps extends Props {
	bg?: "colored";
	dimension?: "sm" | "lg";
	className?: string;
	isAsync?: boolean;
	autoHeight?: boolean;
	searchOptions?: (params: string) => Promise<IAutoCompleteResult["hits"] | void>;
}

const MySelect = (
	{
		bg,
		dimension,
		options,
		className,
		styles: reactStyles,
		searchOptions,
		isAsync,
		autoHeight,
		...props
	}: ReactSelectProps,
	ref: any,
) => {
	const id = useId();

	const loadOptions = (
		inputValue: string,
		callback: (options: OptionsOrGroups<unknown, GroupBase<unknown>>) => void,
	) => {
		if (searchOptions) {
			searchOptions(inputValue)?.then((result) => {
				if (result) {
					callback(
						result.map((r) => ({
							label: r.title?.ru || "",
							value: `${r.id}`,
						})),
					);
				}
			});
		}
	};

	return isAsync ? (
		<AsyncSelect
			className={cn("text-main-regular my__select", styles.mySelect, {
				...(dimension ? {[styles[dimension]]: dimension} : {[styles.sm]: true}),
				...(bg ? {[styles[bg]]: bg} : {}),
				[styles.autoHeight]: autoHeight,
				[`${className}`]: className,
			})}
			styles={{
				...reactStyles,
				indicatorSeparator: () => ({display: "none"}),
				menu: (base) => ({
					...base,
					width: "max-content !important",
					minWidth: "100% !important",
				}),
			}}
			instanceId={id}
			menuPlacement="auto"
			menuPosition="fixed"
			classNamePrefix="my"
			loadOptions={loadOptions}
			defaultOptions={options}
			ref={ref}
			{...props}
		/>
	) : (
		<Select
			className={cn("text-main-regular my__select", styles.mySelect, {
				...(dimension ? {[styles[dimension]]: dimension} : {[styles.sm]: true}),
				...(bg ? {[styles[bg]]: bg} : {}),
				[styles.autoHeight]: autoHeight,
				[`${className}`]: className,
			})}
			styles={{
				...reactStyles,
				indicatorSeparator: () => ({display: "none"}),
				placeholder: (provided) => ({
					...provided,
					position: "static",
					transform: "none",
				}),
				singleValue: (provided) => ({
					...provided,
					position: "static",
					transform: "none",
				}),
				menu: (base) => ({
					...base,
					width: "max-content !important",
					minWidth: "100% !important",
				}),
			}}
			instanceId={id}
			classNamePrefix="my"
			options={options}
			ref={ref}
			{...props}
		/>
	);
};
export const ReactSelect = React.forwardRef(MySelect);
