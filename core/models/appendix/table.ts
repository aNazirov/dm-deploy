import {eTable, eTablePermission} from "../table.model";

export const tableList = [
	{label: "Пользователь", value: eTable.User},
	{label: "Организация", value: eTable.Organization},
	{label: "Финансовые расходы центра", value: eTable.FinancialExpensesReport},
	{label: "Ежедневный отчёт", value: eTable.DailyReport},
	{label: "Повышение квалификации", value: eTable.TrainingReport},
	{label: "Телемедицина", value: eTable.TelemedicineReport},
	{label: "Визит иностранных специалистов", value: eTable.VisitsOfForeignSpecialistsReport},
	{label: "Медиа отчёт", value: eTable.MediaReport},
	{label: "Научные проекты", value: eTable.ScienceReport},
	{label: "Научные защиты", value: eTable.ScientificEventsReport},
	{label: "Научные статьи, патенты и др.", value: eTable.ScientificWorksReport},
	{label: "Отчёты по ГФМС", value: eTable.InsuranceReport},
	{label: "Внедрения", value: eTable.ImplementationReport},
	{label: "Обращение физических и юридических лиц", value: eTable.AppealsReport},
	{label: "Проделанная работа в регионах", value: eTable.DepartureReport},
];

export const tablePermissionsList = [
	{label: "Создание", value: eTablePermission.Create},
	{label: "Просмотр", value: eTablePermission.Read},
	{label: "Редактирование", value: eTablePermission.Update},
	{label: "Удаление", value: eTablePermission.Delete},
	{label: "Изменение статуса", value: eTablePermission.Status},
	{label: "Свод отчётов", value: eTablePermission.SetOfReports},
];
