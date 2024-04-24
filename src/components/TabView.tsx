import React, { useContext } from 'react';
import NavigationContext from '../context/Navigation';

function TabView({ children }: Readonly<{ children: React.ReactNode }>) {
  const navigationContext = useContext(NavigationContext);
  return (
    <>
      <section className="pt-2">
        <div className="flex justify-between px-2">
          <img className="h-24" src="/assets/rda.png" alt="RDA" />
          <img className="h-24" src="/assets/tiger.png" alt="TIGER" />
        </div>
        <nav className="flex " aria-label="Tabs">
          {navigationContext.tabs.map((tab) => (
            <button
              onClick={() => navigationContext.setActiveTabs(tab.label)}
              type="button"
              key={tab.label}
              className={`${
                tab.active ? 'text-rda-500' : ''
              } group relative min-w-0 flex-1 overflow-hidden p-4 text-center text-sm font-bold text-gray-900 hover:text-rda-500 focus:z-10`}
              aria-current={tab.active ? 'page' : undefined}
            >
              <span>{tab.label}</span>
              <span
                aria-hidden="true"
                className={`${
                  tab.active ? 'bg-rda-500' : 'bg-transparent'
                } absolute inset-x-0 bottom-0 h-0.5`}
              />
            </button>
          ))}
        </nav>
      </section>
      <section className="scrolltrack w-full flex-auto overflow-y-scroll pl-4 pt-2">
        {children}
      </section>
    </>
  );
}

export default TabView;
