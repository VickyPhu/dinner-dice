"use client";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";

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
		<Dialog open={open} onClose={onClose} autoFocus={true}>
			<DialogTitle>{title}</DialogTitle>
			{description && <DialogContent>{description}</DialogContent>}
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onConfirm}>{confirmText}</Button>
			</DialogActions>
		</Dialog>
	);
}
