import { get, writable } from 'svelte/store';

export let fileUploaderConfig = writable<null | FileUploaderConfigInternal>(null);
export let selectedFile = writable<null | SelectedFile>(null);

export type UploadType = 'image' | 'audio' | 'file';

export interface UnsplashImage {
	url: string;
	author: string;
	author_url: string;
	title: string | null;
	alt: string | null;
}

export interface MediaItem {
	id: string | number;
	url: string;
	name: string;
}

export interface FileUploaderConfig {
	/**
	 * image:
	 *  - shows unsplash and excalidraw tabs (if configured)
	 * audio:
	 *  - shows audio preview
	 * file
	 *  - allows any file type
	 *  - preview tries to detect file type (image/audio/other)
	 *  - hides the media library tab
	 */
	type: UploadType;

	// callback to upload a file to the server
	uploader: (file: Blob, name: string | null) => Promise<{ url: string }>;

	// allowed mime types
	// if not provided, ALLOWED_MIME_TYPES_IMAGE or ALLOWED_MIME_TYPES_AUDIO will be used based on `type`
	// empty array means all mime types are allowed
	allowedMimeTypes?: string[];

	// frontend max file size in MB (make sure to validate in the backend)
	maxFileSizeInMB?: number;

	// shows the "Media Library" tab, and is called to load a page of media items
	// return fewer items than requested (or an empty array) to signal there are no more
	mediaLoad?: (page: number) => Promise<MediaItem[]>;

	// shows the "Unsplash" tab (image type only), and is called to search Unsplash
	// return an empty array to signal there are no more results
	unsplashSearch?: (search: string, page: number) => Promise<UnsplashImage[]>;

	// shows the "Excalidraw" tab (image type only)
	// Excalidraw is loaded on demand directly in the browser, no dependency is installed for it
	excalidraw?: boolean;
}

const defaults: Required<Omit<FileUploaderConfig, 'mediaLoad' | 'unsplashSearch' | 'excalidraw'>> = {
	type: 'image',
	uploader: null as any,
	allowedMimeTypes: [],
	maxFileSizeInMB: 10
};

export type SelectedFileFrom = 'upload' | 'media' | 'unsplash' | 'excalidraw';
export type SelectedFileUploadType = 'paste' | 'dnd' | 'browse' | 'url' | 'excalidraw';

// a selected file, pending upload (or maybe already uploaded)
export interface SelectedFile {
	type: UploadType;
	from: SelectedFileFrom;

	// additional info by source (required for preview)

	upload?: {
		type: SelectedFileUploadType;
		blob: Blob;
		fetchedUrl?: string;
	};

	unsplash?: UnsplashImage;
	media?: MediaItem;
}

export interface UploadedFile {
	url: string;
	selectedFile: SelectedFile;
}

export type FileUploaderConfigInternal = Required<
	Omit<FileUploaderConfig, 'mediaLoad' | 'unsplashSearch' | 'excalidraw'>
> &
	Pick<FileUploaderConfig, 'mediaLoad' | 'unsplashSearch' | 'excalidraw'> & {
		onCancel: () => void;
		onUpload: (file: UploadedFile) => void;
	};

// UploadedFile is uploaded
// null means cancelled
export function uploadFile(config: FileUploaderConfig) {
	return new Promise<UploadedFile | null>((resolve, reject) => {
		const finalConfig: FileUploaderConfigInternal = {
			...defaults,
			...config,
			onCancel: () => {
				resolve(null);
			},
			onUpload: (file: UploadedFile) => {
				resolve(file);
			}
		};

		if (config.allowedMimeTypes === undefined) {
			// set based on type
			if (finalConfig.type === 'image') {
				finalConfig.allowedMimeTypes = ALLOWED_MIME_TYPES_IMAGE;
			} else if (finalConfig.type === 'audio') {
				finalConfig.allowedMimeTypes = ALLOWED_MIME_TYPES_AUDIO;
			}
		}

		fileUploaderConfig.set(finalConfig);
	});
}

// to be used internally when the modal is opened
export function getFileUploaderConfig(): FileUploaderConfigInternal {
	return get(fileUploaderConfig)!;
}

export function closeFileUploader() {
	const config = getFileUploaderConfig();
	config.onCancel();

	fileUploaderConfig.set(null);
	clearSelectedFile();
}

export function completeFileUpload(file: UploadedFile) {
	const config = getFileUploaderConfig();
	config.onUpload(file);
	closeFileUploader();
}

export function setSelectedFile(file: SelectedFile) {
	selectedFile.set(file);
}

export function clearSelectedFile() {
	selectedFile.set(null);
}

const ALLOWED_MIME_TYPES_IMAGE = [
	'image/gif',
	'image/jpeg',
	'image/png',
	'image/svg+xml',
	'image/webp',
	'image/apng',
	'image/avif'
];

const ALLOWED_MIME_TYPES_AUDIO = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/webm'];

export function validateMimeType(mimeType: string): boolean {
	const config = getFileUploaderConfig();

	if (config.allowedMimeTypes.length === 0) {
		return true; // all mime types allowed
	}

	return config.allowedMimeTypes.includes(mimeType);
}

export function getMimeNames(): string[] {
	const config = getFileUploaderConfig();

	if (config.allowedMimeTypes.length === 0) {
		return []; // all mime types allowed
	}

	return config.allowedMimeTypes.map((m) => m.split('/')[1]?.split('+')[0]);
}

export function getMimeNamesJoined(): string {
	const names = getMimeNames();
	if (names.length === 0) {
		return 'any';
	}
	return names.join(', ').toUpperCase();
}
