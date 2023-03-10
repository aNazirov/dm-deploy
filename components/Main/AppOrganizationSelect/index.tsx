import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../../core/hooks";
import {GroupBase, OptionsOrGroups, Props} from "react-select";
import {globalAutocompleteThunk} from "../../../core/store/global/global.thunks";
import {IAutoCompleteParams, IAutoCompleteResult} from "../../../core/models";
import {ReactSelect} from "../../External";

interface AppOrganizationSelectProps extends Props {
	onChange: (option: unknown) => void;
	paternalId?: number;
	organizationId?: number;
}
export const AppOrganizationSelect = ({onChange, paternalId, organizationId, ...props}: AppOrganizationSelectProps) => {
	const dispatch = useAppDispatch();
	const [options, setOptions] = useState<OptionsOrGroups<unknown, GroupBase<unknown>>>([]);

	useEffect(() => {
		const promise = dispatch(
			globalAutocompleteThunk({
				search: "",
				index: "organizations",
				...(paternalId ? {filter: [`paternalId=${paternalId}`]} : {}),
				...(organizationId ? {filter: [`id=${organizationId}`]} : {}),
			}),
		);
		promise.then((r) => {
			const options = r.payload as IAutoCompleteResult["hits"];

			if (options) {
				const validOptions = options.map((o) => ({label: o.title?.ru, value: o.id}));
				setOptions((prev) => [...prev, ...validOptions]);
			}
		});

		return () => {
			promise.abort();
			setOptions([]);
		};
	}, [paternalId, organizationId]);

	const searchOptions = (index: IAutoCompleteParams["index"]) => async (search: string) => {
		const result = await dispatch(
			globalAutocompleteThunk({
				search,
				index,
				...(paternalId ? {filter: [`paternalId=${paternalId}`]} : {}),
				...(organizationId ? {filter: [`id=${organizationId}`]} : {}),
			}),
		);

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
			searchOptions={searchOptions("organizations")}
			placeholder="Организация"
			{...props}
		/>
	);
};
