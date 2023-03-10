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
import React, {useEffect} from "react";
import cn from "classnames";
import {useAppSelector} from "../core/hooks";

const AppContent = ({children, currentPath}: {currentPath: string; children: React.ReactNode}) => {
	const isDarkMode = useAppSelector(({global}) => global.isDarkMode);

	return (
		<div className={cn(styles.layout, {[styles.darkTheme]: isDarkMode, "dark-theme": isDarkMode})}>
			<Header className={styles.header} />
			{(currentPath.includes("reports") || currentPath.includes("users") || currentPath.includes("organizations")) && (
				<Sidebar className={styles.sidebar} />
			)}
			<main className={styles.main}>{children}</main>
		</div>
	);
};

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
				<AppContent currentPath={currentPath}>
					<Component {...props.pageProps} />
				</AppContent>
			)}
		</Provider>
	);
};

export default App;
