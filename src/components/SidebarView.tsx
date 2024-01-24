import React from 'react';

const navigation = [
  { label: 'Annotate', active: true },
  { label: 'Linked Open Data', active: false },
  { label: 'Rate This', active: false },
  { label: 'Publish', active: false },
  { label: 'Settings', active: false },
];

function SidebarView({ children } : { children: React.ReactNode }) {
  return (
    <>
      <section className="w-5/12 bg-rda-400 pt-2">
        <h1 className="px-4 text-2xl font-black">
          <span className="text-white">RDA</span>
          {' '}
          <span className="text-orange-500">TIGER</span>
        </h1>
        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            {navigation.map(({ label, active }) => (
              <li
                key={label}
                className={`rounded-md ${
                  active ? 'bg-rda-300' : 'has-[:hover]:bg-rda-200'
                }`}
              >
                <button
                  type="button"
                  className="block w-full cursor-pointer p-4 text-left text-xl font-bold text-white hover:text-white"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className="flex h-screen w-7/12 flex-col pl-4 pt-2">
        <h2 className="grow-0 pr-4 text-xl font-bold">Resource Metadata</h2>
        <form
          className="scrolltrack my-4 space-y-4 overflow-y-scroll pr-[1px]"
          action=""
        >
          {children}
        </form>
      </section>
    </>
  );
}

export default SidebarView;
