import React, {useEffect, useState} from "react";
import {ReactSelect} from "../../External";
import {IAutoCompleteParams, IAutoCompleteResult} from "../../../core/models";
import {globalAutocompleteThunk} from "../../../core/store/global/global.thunks";
import {useAppDispatch} from "../../../core/hooks";
import {GroupBase, OptionsOrGroups, Props} from "react-select";

interface AppCountrySelectProps extends Props {
	onChange: (option: unknown) => void;
}

export const AppCountrySelect = ({onChange, ...props}: AppCountrySelectProps) => {
	const dispatch = useAppDispatch();
	const [options, setOptions] = useState<OptionsOrGroups<unknown, GroupBase<unknown>>>([]);

	useEffect(() => {
		const promise = dispatch(globalAutocompleteThunk({search: "", index: "countries"}));
		promise.then((r) => {
			const options = r.payload as IAutoCompleteResult["hits"];

			if (options) {
				const validOptions = options.map((o) => ({label: o.title?.ru, value: o.id}));
				setOptions((prev) => [...prev, ...validOptions]);
			}
		});

		return () => {
			promise.abort();
		};
	}, []);

	const searchOptions = (index: IAutoCompleteParams["index"]) => async (search: string) => {
		const result = await dispatch(globalAutocompleteThunk({search, index}));

		if (result) {
			return result.payload as IAutoCompleteResult["hits"];
		}
	};
	return (
		<ReactSelect
			isAsync
			isSearchable
			onChange={onChange}
			options={options}
			searchOptions={searchOptions("countries")}
			placeholder="Страна"
			{...props}
		/>
	);
};
