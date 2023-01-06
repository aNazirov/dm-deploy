import React, {useEffect} from "react";
import {AppButton} from "../AppButton";
import MoonIcon from "../../../assets/images/icons/filled/moon.svg";
import {useAppDispatch} from "../../../core/hooks";
import {setIsDarkMode} from "../../../core/store/global/global.slices";

export const ThemeButton = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localStorage.getItem("theme")) {
			dispatch(setIsDarkMode(localStorage.getItem("theme") === "dark"));
		}
	}, []);

	const onClick = () => {
		const theme = localStorage.getItem("theme");
		dispatch(setIsDarkMode(theme !== "dark"));
	};

	return (
		<AppButton onClick={onClick} size="square" type="button">
			<MoonIcon width="24px" height="24px" className="main-btn-text-color" />
		</AppButton>
	);
};
