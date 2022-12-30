import React, {useId} from "react";
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
	searchOptions?: (params: string) => Promise<IAutoCompleteResult["hits"] | void>;
}

export const ReactSelect = ({
	bg,
	dimension,
	options,
	className,
	styles: reactStyles,
	searchOptions,
	isAsync,
	...props
}: ReactSelectProps) => {
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
			classNamePrefix="my"
			loadOptions={loadOptions}
			defaultOptions={options}
			styles={{
				...reactStyles,
				indicatorSeparator: () => ({display: "none"}),
			}}
			{...props}
		/>
	) : (
		<Select
			className={cn("text-main-regular", styles.mySelect, {
				...(dimension ? {[styles[dimension]]: dimension} : {[styles.sm]: true}),
				...(bg ? {[styles[bg]]: bg} : {}),
				[`${className}`]: className,
			})}
			styles={{
				...reactStyles,
				indicatorSeparator: () => ({display: "none"}),
			}}
			instanceId={id}
			classNamePrefix="my"
			options={options}
			{...props}
		/>
	);
};
