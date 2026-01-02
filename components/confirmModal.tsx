"use client";

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import PrimaryButton from "./buttons/primaryButton";
import SecondaryButton from "./buttons/secondaryButton";

interface Props {
	open: boolean;
	title: string;
	description: string;
	confirmText: string;
	onConfirm: () => void;
	onClose: () => void;
}

export default function ConfirmModal({
	open,
	title,
	description,
	confirmText,
	onConfirm,
	onClose,
}: Props) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			autoFocus={true}
			PaperProps={{
				sx: {
					backgroundColor: "var(--card-bg)",
					borderRadius: "var(--card-radius)",
					color: "var(--text)",
				},
			}}
		>
			<DialogTitle>{title}</DialogTitle>
			{description && <DialogContent>{description}</DialogContent>}
			<DialogActions sx={{padding: 2, gap: 1}}>
				<SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
				<PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>
			</DialogActions>
		</Dialog>
	);
}
