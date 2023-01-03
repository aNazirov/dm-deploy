import React, {useEffect, useState} from "react";
import Head from "next/head";
import {AppDivider, AppPagination, AppSetOfReportsFilter, AppTable} from "../../../components/Main";
import {useAppDispatch} from "../../../core/hooks";
import {getSetOfReportsThunks} from "../../../core/store/setOfReports/setOfReports.thunks";
import {ISetOfReportsScientificEvents, ISetOfReportsParams} from "../../../core/models";
import moment from "moment/moment";
import Moment from "react-moment";

const ScientificEventsSetOfReportsPage = () => {
	const dispatch = useAppDispatch();

	const [results, setResults] = useState<{count: number; data: ISetOfReportsScientificEvents[]}>();
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
				url: "scientificEvents",
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
				<td>{r._sum.protectionDSc}</td>
				<td>{r._sum.protectionPhD}</td>
				<td>{r._sum.countDoctoralStudentsDSc}</td>
				<td>{r._sum.countDoctoralStudentsPhD}</td>
				<td>{r._sum.countFreeApplicantsDSc}</td>
				<td>{r._sum.countFreeApplicantsPhD}</td>
				<td>{r._sum.localConferencesOffline}</td>
				<td>{r._sum.localConferencesOnline}</td>
				<td>{r._sum.localWithForeignSpecialistsConferencesOffline}</td>
				<td>{r._sum.localWithForeignSpecialistsConferencesOnline}</td>
				<td>{r._sum.internationalConferencesOffline}</td>
				<td>{r._sum.internationalConferencesOnline}</td>
			</tr>
		));
	};

	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>Научные защиты</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Научные защиты</h1>

			<AppDivider className="my-1.25" />

			<div className="pe-2.5">
				<AppSetOfReportsFilter exportUrl="scientificEvents" onFilterSubmit={onFilterSubmit} />
			</div>

			{(results?.data?.length || -1) > 0 ? (
				<AppTable wrapperClassName="mb-1.5">
					<AppTable.THead extended>
						<tr>
							<th rowSpan={3}>Дата</th>
							<th colSpan={2}>Защиты</th>
							<th colSpan={2}>Докторанты</th>
							<th colSpan={2}>Свободные соискатели</th>
							<th colSpan={8}>Научные коференции (количество)</th>
						</tr>
						<tr>
							<th colSpan={2}>Количество</th>
							<th colSpan={2}>Количество</th>
							<th colSpan={2}>Количество</th>
							<th colSpan={2}>Местные</th>
							<th colSpan={2}>Местные с участием международных специалистов</th>
							<th colSpan={2}>Международные</th>
						</tr>
						<tr>
							<th>DSc</th>
							<th>PhD</th>
							<th>DSc</th>
							<th>PhD</th>
							<th>DSc</th>
							<th>PhD</th>
							<th>Оффлайн</th>
							<th>Онлайн</th>
							<th>Оффлайн</th>
							<th>Онлайн</th>
							<th>Оффлайн</th>
							<th>Онлайн</th>
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

export default ScientificEventsSetOfReportsPage;
