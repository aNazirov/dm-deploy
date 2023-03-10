import React, {useEffect, useState} from "react";
import Head from "next/head";
import {AppDivider, AppPagination, AppSetOfReportsFilter, AppTable, eCustomFilter} from "../../../components/Main";
import {useAppDispatch} from "../../../core/hooks";
import {getSetOfReportsThunks} from "../../../core/store/setOfReports/setOfReports.thunks";
import {ISetOfReportsDeparture, ISetOfReportsParams} from "../../../core/models";
import moment from "moment/moment";
import Moment from "react-moment";
import {countryOption} from "../../../core/models/appendix/countries";

const DepartureSetOfReportsPage = () => {
	const dispatch = useAppDispatch();

	const [results, setResults] = useState<{count: number; data: ISetOfReportsDeparture[]}>();
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
				url: "departure",
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
				<td>{countryOption[r.place]}</td>
				<td>{r._sum.departures}</td>
				<td>{r._sum.specialists}</td>
				<td>{r._sum.medicalCheckup}</td>
				<td>{r._sum.minor}</td>
				<td>{r._sum.identifiedPatients}</td>
				<td>{r._sum.outPatient}</td>
				<td>{r._sum.inPatient}</td>
				<td>{r._sum.lessons}</td>
				<td>{r._sum.seminars}</td>
				<td>{r._sum.procedures}</td>
				<td>{r._sum.operations}</td>
				<td>{r._sum.manipulations}</td>
				<td>{r._sum.diagnosticMethodsRegion}</td>
				<td>{r._sum.diagnosticMethodsDistrict}</td>
				<td>{r._sum.treatmentsRegion}</td>
				<td>{r._sum.treatmentsDistrict}</td>
				<td>{r._sum.educatedSpecialists}</td>
			</tr>
		));
	};

	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>?????????????????????? ???????????? ?? ????????????????</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">?????????????????????? ???????????? ?? ????????????????</h1>

			<AppDivider className="my-1.25" />

			<div className="pe-2.5">
				<AppSetOfReportsFilter
					disabledFilters={[eCustomFilter.countryId, eCustomFilter.specialityId, eCustomFilter.types]}
					exportUrl="departure"
					onFilterSubmit={onFilterSubmit}
				/>
			</div>
			{(results?.data?.length || -1) > 0 ? (
				<AppTable wrapperClassName="mb-1.5">
					<AppTable.THead extended>
						<tr>
							<th>????????</th>
							<th>???????????????? ?????????????? ???????? ?????? ?????????????????????? ??????????</th>
							<th>???????????????????? ?????????????? ?? ????????????</th>
							<th>???????????????????? ?????????????????? ????????????????????????</th>
							<th>???????????????????? ??????????????????, ?????????????????? ?????????????????????? ????????????</th>
							<th>?? ?????? ??????????, ???????? ???? 18 ??????</th>
							<th>???????????????????? ???????????????????? ??????????????</th>
							<th>?? ?????? ??????????, ???????????????????? ?????????????? ?????????????? ?????????????????????????? ???????????????????????? ??????????????</th>
							<th>?? ?????? ??????????, ???????????????????? ?????????????? ?????????????? ?????????????????????????? ???????????????????????? ??????????????</th>
							<th>???????????????????? ??????????????, ?????????????????????? ?? ??????????????</th>
							<th>???????????????????? ??????????????????, ?????????????????????? ?? ??????????????</th>
							<th>???????????????????? ????????????????, ?????????????????????? ?? ??????????????</th>
							<th>?? ?????? ??????????, ?????????????????????????????????????? ????????????????</th>
							<th>?? ?????? ??????????, ?????????????????????????????????????? ??????????????????????</th>
							<th>???????????????????? ???????????????????? ?????????????? ?????????????????????? ???? ?????????????????? ????????????</th>
							<th>???????????????????? ???????????????????? ?????????????? ?????????????????????? ???? ???????????????? ????????????</th>
							<th>???????????????????? ???????????????????? ?????????????? ?????????????? ???? ?????????????????? ????????????</th>
							<th>???????????????????? ???????????????????? ?????????????? ?????????????? ???? ?????????????????? ????????????</th>
							<th>???????????????????? ???????????????????????? ?????????????????? ???????????????? ???? ????????????</th>
						</tr>
					</AppTable.THead>
					<AppTable.TBody>{renderRow()}</AppTable.TBody>
				</AppTable>
			) : (
				"???????????? ?????????????? ????????."
			)}
			<div className="mt-auto pe-2.5">
				<AppDivider className="my-1.25" />
				<AppPagination totalCount={results?.count} cb={onPagination} />
			</div>
		</div>
	);
};

export default DepartureSetOfReportsPage;
