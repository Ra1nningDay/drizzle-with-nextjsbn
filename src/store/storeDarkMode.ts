import { create } from "zustand";
import { persist } from "zustand/middleware";

type ToggleDarkMode = "darkMode" | "lightMode";

interface DarkModeState {
    mode: ToggleDarkMode;
    toggleMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>()(
    persist(
        (set) => ({
            mode: "lightMode",
            toggleMode: () =>
                set((state) => ({
                    mode: state.mode === "darkMode" ? "lightMode" : "darkMode",
                })),
        }),
        { name: "dark-mode" }
    )
);
