import { GroupData } from "@/hooks/useGroups";
import { create } from "zustand";

type GroupStore = {
	groups: GroupData[];
	setGroups: (groups: GroupData[]) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
	groups: [],
	setGroups: (groups) => set({ groups }),
}));
