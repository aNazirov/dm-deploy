import React, {useEffect, useState} from "react";
import Head from "next/head";
import {AppDivider, AppPagination, AppSetOfReportsFilter, AppTable} from "../../../components/Main";
import {useAppDispatch} from "../../../core/hooks";
import {getSetOfReportsThunks} from "../../../core/store/setOfReports/setOfReports.thunks";
import {ISetOfReportsTraining, ISetOfReportsParams} from "../../../core/models";
import moment from "moment/moment";
import Moment from "react-moment";

const TrainingSetOfReportsPage = () => {
	const dispatch = useAppDispatch();

	const [results, setResults] = useState<{count: number; data: ISetOfReportsTraining[]}>();
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
				url: "training",
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
			<tr key={`${r.createdAt.toString()}-${i}`}>
				<td>
					<Moment format="DD.MM.YYYY">{r.createdAt}</Moment>
				</td>
				<td>{r._sum.confNational}</td>
				<td>{r._sum.confInternational}</td>
				<td>{r._sum.learnNationalShort}</td>
				<td>{r._sum.learnInternationalShort}</td>
				<td>{r._sum.learnNationalMid}</td>
				<td>{r._sum.learnInternationalMid}</td>
				<td>{r._sum.learnNationalLong}</td>
				<td>{r._sum.learnInternationalLong}</td>
			</tr>
		));
	};

	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>Повышение квалификации (ОЦ)</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Повышение квалификации (ОЦ)</h1>

			<AppDivider className="my-1.25" />

			<div className="pe-2.5">
				<AppSetOfReportsFilter exportUrl="training" onFilterSubmit={onFilterSubmit} />
			</div>

			{(results?.data?.length || -1) > 0 ? (
				<AppTable wrapperClassName="mb-1.5">
					<AppTable.THead extended>
						<tr>
							<th rowSpan={2}>Дата</th>
							<th colSpan={2}>Конференция, симпозиум ва х.к</th>
							<th colSpan={2}>Учеба/повышение квалификации до 10 дней</th>
							<th colSpan={2}>Учеба/повышение квалификации от 10 до 30 дней</th>
							<th colSpan={2}>Учеба/повышение квалификации более 30 дней</th>
						</tr>
						<tr>
							<th>Местные</th>
							<th>Mеждународные</th>
							<th>Местные</th>
							<th>Mеждународные</th>
							<th>Местные</th>
							<th>Mеждународные</th>
							<th>Местные</th>
							<th>Mеждународные</th>
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

export default TrainingSetOfReportsPage;
