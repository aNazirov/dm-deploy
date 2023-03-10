import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {getImplementationReportByIdThunk} from "../../../core/store/report/implementation/implementation-report.thunks";
import {eTable} from "../../../core/models";
import Moment from "react-moment";
import {setImplementationReportByIdAction} from "../../../core/store/report/implementation/implementation-report.slices";
import {ReportPageUpdate} from "../../../components/Layout";
import {countryOption} from "../../../core/models/appendix/countries";

const ImplementationReportInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({implementationReport}) => implementationReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getImplementationReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setImplementationReportByIdAction(null));
				};
			}
		}
	}, [reportId]);

	if (!report) return null;

	const renderTableBodyRows = () => {
		return report.implementationParts?.map((part) => (
			<tr key={part.id}>
				<td>
					<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
				</td>
				<td>{countryOption[part.place]}</td>
				<td>{part.diagnosticMethodsRegion}</td>
				<td>{part.diagnosticMethodsDistrict}</td>
				<td>{part.treatmentsRegion}</td>
				<td>{part.treatmentsDistrict}</td>
			</tr>
		));
	};
	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>{report.organization.title.ru}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">{report.organization.title.ru}</h1>

			<AppDivider className="my-1.25" />

			<AppTable>
				<AppTable.THead extended>
					<tr>
						<th rowSpan={2}>????????</th>
						<th rowSpan={2}>?????????? ??????????????????</th>
						<th colSpan={2}>???????????? ??????????????????????</th>
						<th colSpan={2}>???????????? ??????????????</th>
					</tr>
					<tr>
						<th>???? ?????????????? ??????????????</th>
						<th>???? ?????????????? ????????????</th>
						<th>???? ?????????????? ??????????????</th>
						<th>???? ?????????????? ????????????</th>
					</tr>
				</AppTable.THead>
				<AppTable.TBody>{renderTableBodyRows()}</AppTable.TBody>
			</AppTable>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/implementation" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					??????????
				</AppButton>

				<ReportPageUpdate
					reportOrganizationId={report.organization.id}
					reportCreatorId={report.user?.id}
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.ImplementationReport}
				/>
			</div>
		</div>
	);
};

export default ImplementationReportInfoPage;
