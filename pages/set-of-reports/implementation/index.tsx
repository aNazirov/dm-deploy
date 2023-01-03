import React, {useEffect, useState} from "react";
import Head from "next/head";
import {AppDivider, AppPagination, AppSetOfReportsFilter, AppTable} from "../../../components/Main";
import {useAppDispatch} from "../../../core/hooks";
import {getSetOfReportsThunks} from "../../../core/store/setOfReports/setOfReports.thunks";
import {ISetOfReportsImplementation, ISetOfReportsParams} from "../../../core/models";
import moment from "moment/moment";
import {countryOption} from "../../../core/models/appendix/countries";

const ImplementationSetOfReportsPage = () => {
	const dispatch = useAppDispatch();

	const [results, setResults] = useState<{count: number; data: ISetOfReportsImplementation[]}>();
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
				url: "implementation",
				params: filters,
			}),
		);

		promise.then((action) =>
			setResults((prev) => {
				const result = action.payload as typeof results;
				if (result) {
					return {count: result.count, data: result.data};
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
			<tr key={`${r.place}-${i}`}>
				<td>{countryOption[r.place]}</td>
				<td>{r._sum.diagnosticMethodsRegion}</td>
				<td>{r._sum.diagnosticMethodsDistrict}</td>
				<td>{r._sum.treatmentsRegion}</td>
				<td>{r._sum.treatmentsDistrict}</td>
			</tr>
		));
	};

	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>Внедрения</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Внедрения</h1>

			<AppDivider className="my-1.25" />

			<div className="pe-2.5">
				<AppSetOfReportsFilter exportUrl="implementation" onFilterSubmit={onFilterSubmit} />
			</div>

			{(results?.data?.length || -1) > 0 ? (
				<AppTable wrapperClassName="mb-1.5">
					<AppTable.THead extended>
						<tr>
							<th rowSpan={2}>Место внедрения</th>
							<th colSpan={2}>Методы диагностики</th>
							<th colSpan={2}>Методы лечения</th>
						</tr>
						<tr>
							<th>На уровень области</th>
							<th>На уровень района</th>
							<th>На уровень области</th>
							<th>На уровень района</th>
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

export default ImplementationSetOfReportsPage;