"use client";

import { useToastStore } from "@/stores/toastStore";
import { Alert, Snackbar } from "@mui/material";

export default function ToastContainer() {
	const { toasts, removeToast } = useToastStore();

	return (
		<>
			{toasts.map((toast) => (
				<Snackbar
					key={toast.id}
					open={true}
					autoHideDuration={6000}
					onClose={() => removeToast(toast.id)}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				>
					<Alert
						onClose={() => removeToast(toast.id)}
						severity={toast.type || "info"}
						variant="filled"
						sx={{ width: "100%" }}
					>
						{toast.message}
					</Alert>
				</Snackbar>
			))}
		</>
	);
}
