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

export const NavigationContext = createContext<NavigationContextProps>(
  defaultNavigationContext
);
