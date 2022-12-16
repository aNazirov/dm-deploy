import React from "react";
import {AppButton} from "../AppButton";
import MoonIcon from "../../../assets/images/icons/filled/moon.svg";

export const ThemeButton = () => {
	return (
		<AppButton size="square" type="button">
			<MoonIcon width="24px" height="24px" className="main-btn-text-color" />
		</AppButton>
	);
};
