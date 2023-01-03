import {AxiosError} from "axios";
import {Id, toast, TypeOptions} from "react-toastify";

class ToastClass {
	options = undefined;

	info(info: string) {
		toast.info(info, this.options);
	}

	success(message: string) {
		toast.success(message, this.options);
	}

	error(error: AxiosError<{message?: string} | undefined>) {
		if (error.message !== "canceled") {
			let message = error.response?.data?.message || error.message || "Server Side Error";

			if (error.response?.data instanceof Blob) {
				const fr = new FileReader();

				fr.onload = function () {
					if (typeof this.result === "string") {
						const e = JSON.parse(this.result);
						message = e.message;
					}

					toast.error(message);
				};

				return fr.readAsText(error.response?.data);
			}

			if (Array.isArray(message)) {
				message = message.join(", ");
			}

			toast.error(message, this.options);
		}
	}

	warning(warning: string) {
		toast.warn(warning, this.options);
	}

	promise(func: Promise<any>, {pending, success}: {pending: string | false; success: string | false}) {
		return toast.promise(func, {
			...(pending ? {pending} : {}),
			...(success ? {success} : {}),
			error: {
				render({data}) {
					const typedData = data as any;
					let message = typedData.response?.data?.message || typedData.message || "Server Side Error";

					if (typedData.response?.data instanceof Blob) {
						const fr = new FileReader();

						fr.onload = function () {
							if (typeof this.result === "string") {
								const e = JSON.parse(this.result);
								message = e.message;
							}

							toast.error(message);
						};

						return fr.readAsText(typedData.response?.data);
					}

					if (Array.isArray(message)) {
						message = message.join(", ");
					}
					// When the promise reject, data will contains the error
					return message;
				},
			},
		});
	}

	loading(message: string): Id {
		return toast.loading(message, this.options);
	}

	update(
		id: Id,
		data: {
			render: string;
			type: TypeOptions;
			isLoading?: boolean;
		},
	) {
		toast.update(id, data);
	}
}

export const Toast = new ToastClass();
