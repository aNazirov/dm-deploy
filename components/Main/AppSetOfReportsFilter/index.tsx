import React from "react";
import {AppButton} from "../AppButton";
import PrintIcon from "../../../assets/images/icons/filled/documents/print-current-color.svg";
import SearchIcon from "../../../assets/images/icons/filled/search.svg";
import {useForm} from "react-hook-form";
import {AppInput} from "../AppInput";
import {AppOrganizationSelect} from "../AppOrganizationSelect";
import {ISetOfReportsParams} from "../../../core/models";
import {ReactSelect} from "../../External";
import {countryOptions} from "../../../core/models/appendix/countries";
import {scienceTypes} from "../../../core/models/appendix/scienceTypes";
import moment from "moment";
import {AppSpecialitySelect} from "../AppSpecialitySelect";
import {AppCountrySelect} from "../AppCountrySelect";
import {setOfReportsService} from "../../../core/services";
import {APISetOfReportsUrl} from "../../../core/api";

// custom enum to hide filters conditionally
export enum eCustomFilter {
	start = 1,
	end,
	organizations,
	allOrganizations,
	places,
	types,
	specialityId,
	countryId,
}

interface AppSetOfReportsFilterProps {
	onFilterSubmit: (field: ISetOfReportsParams) => void;
	exportUrl: keyof typeof APISetOfReportsUrl;
	disabledFilters: eCustomFilter[];
}
export const AppSetOfReportsFilter = ({onFilterSubmit, exportUrl, disabledFilters}: AppSetOfReportsFilterProps) => {
	const {setValue, register, handleSubmit, getValues} = useForm<ISetOfReportsParams>({
		defaultValues: {
			start: moment().subtract(1, "months").startOf("month").format("yyyy-MM-DD"),
			end: moment().endOf("month").format("yyyy-MM-DD"),
		},
	});

	const onSelect = (name: keyof ISetOfReportsParams) => (option: unknown) => {
		const field = option as {label: string; value: number}[] | {label: string; value: number};

		if (Array.isArray(field)) {
			setValue(
				name,
				field.map((f) => f.value),
			);
		} else {
			if (name === "organizations") {
				setValue(name, [field.value]);
			} else {
				setValue(name, field.value);
			}
		}
	};

	const onSubmit = (fields: ISetOfReportsParams) => {
		onFilterSubmit(fields);
	};

	const onExport = () => {
		void setOfReportsService.export({url: exportUrl, params: getValues()});
	};

	return (
		<form className="flex-col gap-0.5 mb-2.5" onSubmit={handleSubmit(onSubmit)}>
			<label className="flex-align-center gap-0.5 w-max">
				<AppInput type="checkbox" {...register("allOrganizations")} />
				<span>Все организации</span>
			</label>

			<div className="d-flex flex-wrap gap-0.75">
				{!disabledFilters.includes(eCustomFilter.start) && <AppInput type="date" {...register("start")} />}
				{!disabledFilters.includes(eCustomFilter.end) && <AppInput type="date" {...register("end")} />}
				{!disabledFilters.includes(eCustomFilter.organizations) && (
					<AppOrganizationSelect
						className="min-w-10"
						isMulti={!["financialExpenses", "insurance"].includes(exportUrl)}
						onChange={onSelect("organizations")}
					/>
				)}
				{!disabledFilters.includes(eCustomFilter.specialityId) && (
					<AppSpecialitySelect className="min-w-10" onChange={onSelect("specialityId")} />
				)}
				{!disabledFilters.includes(eCustomFilter.countryId) && (
					<AppCountrySelect className="min-w-10" onChange={onSelect("countryId")} />
				)}
				{!disabledFilters.includes(eCustomFilter.places) && (
					<ReactSelect
						className="min-w-10"
						isMulti
						options={countryOptions}
						onChange={onSelect("places")}
						placeholder="Регион"
					/>
				)}
				{!disabledFilters.includes(eCustomFilter.types) && (
					<ReactSelect
						className="min-w-10"
						isMulti
						options={scienceTypes}
						onChange={onSelect("types")}
						placeholder="Проект"
					/>
				)}
				<AppButton variant="primary-outline" size="square">
					<SearchIcon width="24px" height="24px" className="main-btn-text-color" />
				</AppButton>
				<AppButton type="button" onClick={onExport} variant="print" withIcon size="lg">
					<PrintIcon width="24px" height="24px" />
					<span>Печать</span>
				</AppButton>
			</div>
		</form>
	);
};
