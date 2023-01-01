import React, {useEffect, useState} from "react";
import Head from "next/head";
import {AppDivider, AppInput, AppPagination, AppSetOfReportsFilter, AppTable} from "../../../components/Main";
import {useAppDispatch} from "../../../core/hooks";
import {getSetOfReportsThunks} from "../../../core/store/setOfReports/setOfReports.thunks";
import {ISetOfReportsScience, ISetOfReportsParams} from "../../../core/models";
import moment from "moment/moment";
import Moment from "react-moment";
import {scienceWorkType} from "../../../core/models/appendix/scienceTypes";
import styles from "../../../styles/reports.module.scss";

const ScienceSetOfReportsPage = () => {
	const dispatch = useAppDispatch();

	const [results, setResults] = useState<{count: number; data: ISetOfReportsScience[]}>();
	const [filters, setFilters] = useState<ISetOfReportsParams>({
		take: 20,
		skip: 0,
		start: moment().subtract(1, "months").startOf("month").format("yyyy-MM-DD"),
		end: moment().endOf("month").format("yyyy-MM-DD"),
		organizations: [],
	});

	useEffect(() => {
		const promise = dispatch(
			getSetOfReportsThunks({
				url: "science",
				params: filters,
			}),
		);

		promise.then((action) =>
			setResults((prev) => {
				const result = action.payload as typeof results;
				if (result) {
					if (prev?.data.length) {
						const ids = new Set(result.data.map((r) => r.id));
						return {
							count: result.count,
							data: prev.data.filter((old) => !ids.has(old.id)).concat(result.data),
						};
					} else {
						return result;
					}
				}

				return prev;
			}),
		);

		return () => {
			promise.abort();
		};
	}, [filters]);

	const onFilterSubmit = (params: ISetOfReportsParams) => {
		setFilters((prev) => ({...prev, ...params}));
	};

	const onPagination = (pagination: {take: number; skip: number}) => {
		setFilters((prev) => ({...prev, ...pagination}));
	};

	const renderRow = () => {
		return results?.data.map((r, i) => (
			<tr key={r.id}>
				<td>{r.id}</td>
				<td>{r.title}</td>
				<td>{r.amount}</td>
				<td>
					<Moment format="DD.MM.YYYY">{r.startDate}</Moment>
				</td>
				<td>
					<Moment format="DD.MM.YYYY">{r.endDate}</Moment>
				</td>
			</tr>
		));
	};

	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>Научные проекты (ОЦ)</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Научные проекты (ОЦ)</h1>

			<AppDivider className="my-1.25" />

			<div className="pe-2.5">
				<AppSetOfReportsFilter exportUrl="science" onFilterSubmit={onFilterSubmit} />
			</div>

			{(results?.data?.length || -1) > 0 ? (
				<AppTable wrapperClassName="mb-1.5">
					<AppTable.THead extended>
						<tr>
							<th rowSpan={2}>№</th>
							<th rowSpan={2}>Название проекта</th>
							<th colSpan={2}>Срок проекта</th>
							<th rowSpan={2}>Сумма проекта (сум)</th>
						</tr>
						<tr>
							<th>Начало проекта</th>
							<th>Конец проекта</th>
						</tr>
					</AppTable.THead>
					<AppTable.TBody>{renderRow()}</AppTable.TBody>
				</AppTable>
			) : (
				"Список отчётов пуст."
			)}
			<div className="mt-auto pe-2.5">
				<AppDivider className="my-1.25" />
				<AppPagination totalCount={results?.count} cb={onPagination} />
			</div>
		</div>
	);
};

export default ScienceSetOfReportsPage;
