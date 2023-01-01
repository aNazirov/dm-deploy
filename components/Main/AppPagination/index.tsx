import React, {useState} from "react";
import {ReactSelect} from "../../External";
import {AppButton} from "../AppButton";
import ArrowToPrevIcon from "../../../assets/images/icons/filled/arrows/arrow-to-prev.svg";
import ChevronPrevIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import ChevronNextIcon from "../../../assets/images/icons/filled/arrows/chevron-right.svg";
import ArrowToNextIcon from "../../../assets/images/icons/filled/arrows/arrow-to-next.svg";

interface IProps {
	cb?: (params: {skip: number; take: number}) => void;
	totalCount?: number;
}

export const AppPagination = ({cb, totalCount = 0}: IProps) => {
	const [pagination, setPagination] = useState({skip: 0, take: 20});

	const onTake = (option: unknown) => {
		const field = option as {label: string; value: number};
		setPagination((prev) => ({...prev, take: field.value}));
		cb?.({...pagination, take: field.value});
	};

	const onSkip = (skip: number) => () => {
		setPagination((prev) => ({...prev, skip}));
		cb?.({...pagination, skip});
	};

	return (
		<div className="flex-justify-between">
			<div className="text-main-regular flex-center gap-0.75">
				<span className="text-muted">
					Записи с {pagination.skip || 1} по{" "}
					{totalCount < pagination.skip + pagination.take ? totalCount : pagination.skip + pagination.take} из{" "}
					{totalCount}
				</span>
				<ReactSelect onChange={onTake} menuPlacement="auto" options={paginationPages} />
				<span className="text-muted">записей на страницу</span>
			</div>

			<div className="flex-center gap-0.25">
				<AppButton size="square" variant="primary-outline">
					<ArrowToPrevIcon width="16px" height="16px" className="main-btn-text-color" />
				</AppButton>
				<AppButton size="square" variant="primary-outline">
					<ChevronPrevIcon width="16px" height="16px" className="main-btn-text-color" />
				</AppButton>
				<AppButton onClick={onSkip(1)} className="active" size="square" variant="primary-outline">
					<span>1</span>
				</AppButton>
				<AppButton size="square" variant="primary-outline">
					<ChevronNextIcon width="16px" height="16px" className="main-btn-text-color" />
				</AppButton>
				<AppButton size="square" variant="primary-outline">
					<ArrowToNextIcon width="16px" height="16px" className="main-btn-text-color" />
				</AppButton>
			</div>
		</div>
	);
};

const paginationPages = [
	{label: "20", value: 20},
	{label: "50", value: 50},
	{label: "100", value: 100},
];
