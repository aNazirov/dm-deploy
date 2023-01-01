import {eScienceType} from "../reports";

export const scienceWorkType = {
	[eScienceType.Joint]: "Совместный",
	[eScienceType.Foreign]: "Зарубежный",
	[eScienceType.Practice]: "Практический",
	[eScienceType.Fundamental]: "Фундаментальный",
	[eScienceType.Innovational]: "Инновационный",
};

export const scienceTypes = [
	{value: eScienceType.Joint, label: "Совместный"},
	{value: eScienceType.Foreign, label: "Зарубежный"},
	{value: eScienceType.Practice, label: "Практический"},
	{value: eScienceType.Fundamental, label: "Фундаментальный"},
	{value: eScienceType.Innovational, label: "Инновационный"},
];
