export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export function calculateNextSharing(weekdays: Weekday[]): number {
	if (weekdays.length === 0) return 0;

	const order: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const today = new Date();
	const todayIndex = today.getDay();

	// Find the next sharing day
	const daysUntilNextSharing = weekdays.map((day) => {
		const targetIndex = order.indexOf(day);
		let diff = targetIndex - todayIndex;
		if (diff < 0) diff += 7;
		return diff;
	});

	return Math.min(...daysUntilNextSharing);
}
