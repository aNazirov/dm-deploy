import React, {useState} from "react";
import {ReactSelect} from "../../External";
import {AppButton} from "../AppButton";
import ArrowToPrevIcon from "../../../assets/images/icons/filled/arrows/arrow-to-prev.svg";
import ChevronPrevIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import ChevronNextIcon from "../../../assets/images/icons/filled/arrows/chevron-right.svg";
import ArrowToNextIcon from "../../../assets/images/icons/filled/arrows/arrow-to-next.svg";
import cn from "classnames";

interface IProps {
	cb?: (params: {skip: number; take: number}) => void;
	totalCount?: number;
	take?: number;
	skip?: number;
}

export const AppPagination = ({cb, take = 20, skip = 0, totalCount = 0}: IProps) => {
	const [pagination, setPagination] = useState({skip, take});

	const onTake = (option: unknown) => {
		const field = option as {label: string; value: number};
		setPagination((prev) => ({...prev, take: field.value, skip: 0}));
		cb?.({...pagination, take: field.value, skip: 0});
	};

	const onSkip =
		(skip = 0) =>
		() => {
			const skipVal = skip < 0 ? 0 : skip;

			setPagination((prev) => ({...prev, skip: skipVal}));
			cb?.({...pagination, skip: skipVal});
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
				<AppButton onClick={onSkip(0)} size="square" variant="primary-outline">
					<ArrowToPrevIcon width="16px" height="16px" className="main-btn-text-color" />
				</AppButton>
				<AppButton onClick={onSkip(pagination.skip - pagination.take)} size="square" variant="primary-outline">
					<ChevronPrevIcon width="16px" height="16px" className="main-btn-text-color" />
				</AppButton>
				{Array.from({length: Math.ceil(totalCount / pagination.take)}).map((b, i) => (
					<AppButton
						className={cn({
							active: Math.ceil(pagination.skip / pagination.take) === i,
						})}
						size="square"
						variant="primary-outline"
						key={`pagination_${i}`}
						onClick={onSkip(i * pagination.take)}
					>
						<span>{i + 1}</span>
					</AppButton>
				))}
				<AppButton onClick={onSkip(pagination.skip + pagination.take)} size="square" variant="primary-outline">
					<ChevronNextIcon width="16px" height="16px" className="main-btn-text-color" />
				</AppButton>
				<AppButton onClick={onSkip(Math.ceil(totalCount / pagination.take))} size="square" variant="primary-outline">
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
