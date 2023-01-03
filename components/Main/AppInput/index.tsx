import React, {ChangeEvent, DetailedHTMLProps, ForwardedRef, InputHTMLAttributes} from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import UploadIcon from "../../../assets/images/icons/filled/arrows/upload.svg";

interface AppInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	Icon?: React.ElementType;
	bg?: "colored";
	dimension?: "sm" | "lg";
}
const Input = ({Icon, className, bg, dimension, ...props}: AppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const preventNegativeValues = (e: React.KeyboardEvent<HTMLInputElement>) =>
		["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		props.onChange?.(e);

		if (props.type === "number") {
			const num = +e.target.value;

			if (isNaN(num) || num < 0) {
				e.target.value = "0";
			}
		}
	};

	return (
		<div className={styles.inputWrapper}>
			{Icon && (
				<div className={cn("rounded-start", styles.iconWrapper)}>
					<Icon width="29px" height="29px" fill="white" />
				</div>
			)}

			{props.type === "file" && (
				<div className={cn(styles.fileWrapper, "rounded", "text-main-regular")}>
					<UploadIcon width="24px" height="24px" fill="white" />
					{props.placeholder && (
						<span className="text-truncate w-max-20">{props.placeholder ?? "Прикрепить файл"}</span>
					)}
				</div>
			)}

			<input
				className={cn("text-main-regular", styles.input, {
					...(dimension ? {[styles[dimension]]: dimension} : {[styles.sm]: true}),
					...(bg ? {[styles[bg]]: bg} : {}),
					[styles.file]: props.type === "file",
					[`${className}`]: className,
					"rounded-end": Icon,
					rounded: !Icon,
				})}
				onKeyDown={props.type === "number" ? preventNegativeValues : undefined}
				{...props}
				onChange={onChange}
				ref={ref}
			/>
		</div>
	);
};

export const AppInput = React.forwardRef(Input);
