import React from 'react';

const tabs = [
  { label: 'Annotate', active: true },
  { label: 'Linked Open Dat', active: false },
  { label: 'Rate This', active: false },
  { label: 'Publish', active: false },
//   { label: 'Settings', active: false },
];

function TabView({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-rda-400 pt-2">
        <h1 className="px-4 pb-2 text-2xl font-black">
          <span className="text-white">RDA</span>
          {' '}
          <span className="text-orange-500">TIGER</span>
        </h1>
        <nav
          className="flex divide-x divide-rda-300"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href="#"
              className={`${
                tab.active
                  ? 'bg-rda-500'
                  : ''
              } group relative min-w-0 flex-1 overflow-hidden bg-rda-400 p-4 text-center text-sm font-bold text-white hover:bg-rda-500 focus:z-10`}
              aria-current={tab.active ? 'page' : undefined}
            >
              <span>{tab.label}</span>
              <span
                aria-hidden="true"
                className={`${
                  tab.active ? 'bg-rda-500' : 'bg-transparent'
                } absolute inset-x-0 bottom-0 h-0.5`}
              />
            </a>
          ))}
        </nav>
      </section>
      <section className="scrolltrack w-full flex-auto overflow-y-scroll pl-4 pt-2">
        <h2 className="pr-4 text-xl font-bold">Resource Metadata</h2>
        <form
          className="my-4 space-y-4 pr-[1px]"
          action=""
        >
          {children}
        </form>
      </section>
    </>
  );
}

export default TabView;
