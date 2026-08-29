const EXCALIDRAW_VERSION = '0.18.0';
const REACT_VERSION = '19.0.0';

const REACT_URL = `https://esm.sh/react@${REACT_VERSION}`;
const REACT_JSX_RUNTIME_URL = `https://esm.sh/react@${REACT_VERSION}/jsx-runtime`;
const REACT_DOM_URL = `https://esm.sh/react-dom@${REACT_VERSION}`;
const REACT_DOM_CLIENT_URL = `https://esm.sh/react-dom@${REACT_VERSION}/client`;
const EXCALIDRAW_ASSET_PATH = `https://esm.sh/@excalidraw/excalidraw@${EXCALIDRAW_VERSION}/dist/prod/`;
const EXCALIDRAW_JS_URL = `${EXCALIDRAW_ASSET_PATH}index.js?external=react,react-dom`;
const EXCALIDRAW_CSS_URL = `${EXCALIDRAW_ASSET_PATH}index.css`;

export interface LoadedExcalidraw {
	React: any;
	createRoot: (container: Element) => { render: (node: any) => void; unmount: () => void };
	ExcalidrawLib: any;
}

let loadPromise: Promise<LoadedExcalidraw> | null = null;

function ensureImportMap() {
	// Excalidraw's browser build imports "react" and "react-dom" as bare specifiers.
	// An import map is the only way to resolve those without a bundler.
	if (document.querySelector('script[type="importmap"]')) return;

	const script = document.createElement('script');
	script.type = 'importmap';
	script.textContent = JSON.stringify({
		imports: {
			react: REACT_URL,
			'react/jsx-runtime': REACT_JSX_RUNTIME_URL,
			'react-dom': REACT_DOM_URL,
			'react-dom/client': REACT_DOM_CLIENT_URL
		}
	});
	document.head.appendChild(script);
}

function ensureStylesheet() {
	if (document.querySelector(`link[href="${EXCALIDRAW_CSS_URL}"]`)) return;

	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = EXCALIDRAW_CSS_URL;
	document.head.appendChild(link);
}

/**
 * Loads Excalidraw directly in the browser, on demand, with no installed dependency.
 * See https://docs.excalidraw.com/docs/@excalidraw/excalidraw/integration#browser
 */
export function loadExcalidraw(): Promise<LoadedExcalidraw> {
	if (loadPromise) return loadPromise;

	(window as any).EXCALIDRAW_ASSET_PATH = EXCALIDRAW_ASSET_PATH;

	ensureImportMap();
	ensureStylesheet();

	loadPromise = Promise.all([
		import(/* @vite-ignore */ REACT_URL),
		import(/* @vite-ignore */ REACT_DOM_CLIENT_URL),
		import(/* @vite-ignore */ EXCALIDRAW_JS_URL)
	]).then(([ReactModule, ReactDOMClientModule, ExcalidrawLib]) => ({
		React: ReactModule.default ?? ReactModule,
		createRoot: ReactDOMClientModule.createRoot,
		ExcalidrawLib
	}));

	return loadPromise;
}
