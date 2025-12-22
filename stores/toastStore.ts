import { create } from "zustand";

export type Toast = {
	id: string;
	message: string;
	type?: "success" | "error" | "info";
};

type ToastStore = {
	toasts: Toast[];
	addToast: (toast: Omit<Toast, "id">) => void;
	removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
	toasts: [],
	addToast: ({ message, type }) =>
		set((state) => ({
			toasts: [...state.toasts, { id: crypto.randomUUID(), message, type }],
		})),
	removeToast: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((t) => t.id !== id),
		})),
}));
