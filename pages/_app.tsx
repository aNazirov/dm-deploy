import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import "react-toastify/dist/ReactToastify.css";

import {wrapper} from "../core/store";
import {Header, Sidebar} from "../components/Layout";
import styles from "../styles/layout.module.scss";
import "../styles/globals.scss";
import {useEffect} from "react";

const App = ({Component, ...rest}: AppProps) => {
	const {store, props} = wrapper.useWrappedStore(rest);
	const router = useRouter();
	const currentPath: string = router.pathname;

	useEffect(() => {
		if (localStorage.getItem("jwt")) {
			if (currentPath?.includes("/auth")) {
				void router.push("/reports/daily");
			}
		} else if (!currentPath?.includes("/auth")) {
			void router.push("/auth");
		}
	}, [currentPath]);

	return (
		<Provider store={store}>
			<ToastContainer />
			<NextNProgress />
			{currentPath?.includes("/auth") ? (
				<Component {...props.pageProps} />
			) : (
				<div className={styles.layout}>
					<Header className={styles.header} />
					{currentPath.includes("reports") && <Sidebar className={styles.sidebar} />}
					<main className={styles.main}>
						<Component {...props.pageProps} />
					</main>
				</div>
			)}
		</Provider>
	);
};

export default App;
