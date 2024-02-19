import { createContext } from "react";

interface NavigationTabs {
  label: string;
  active: boolean;
}

interface NavigationContextProps {
  tabs: NavigationTabs[];
  setActiveTabs: (label: string) => void;
  currentTab: string;
}

const defaultNavigationContext: NavigationContextProps = {
  tabs: [],
  setActiveTabs: () => {},
  currentTab: "",
};

/**
 * NavigationContext is used to manage the state of the navigation tabs
 * 
 * @param tabs - Array of NavigationTabs
 * @param setActiveTabs - Function to set the active tab
 * @param currentTab - The current active tab
 */
export const NavigationContext = createContext<NavigationContextProps>(
  defaultNavigationContext
);
