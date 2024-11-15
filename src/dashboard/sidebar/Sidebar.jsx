'use client';
import css from '../style.module.css';
import { SidebarItems } from './SidebarItems';
import { SidebarHeader } from './SidebarHeader';
import { useDashboardContext } from '../Provider';

const style = {
  mobileOrientation: {
    start: 'left-0 ',
    end: 'right-0 lg:left-0',
  },
  container: 'flex flex-col h-full', // Ensure full height and no bottom padding
  close: 'duration-700 ease-out hidden transition-all lg:w-24',
  // close: 'absolute duration-500 ease-in transition-all w-8/12 z-40 sm:w-5/12 md:w-64',
  open: 'absolute duration-500 ease-in transition-all w-8/12 z-40 sm:w-5/12 md:w-64',
  default: 'h-screen overflow-y-auto text-white top-0 lg:absolute bg-gray-900 lg:block lg:z-40',
  headerContainer: 'flex items-center space-x-2 mb-4', // Flex container for SidebarHeader and AutoLink
  // autoLink: 'text-xl font-bold absolute top-0 right-0', // Absolute positioning for AutoLink
};

export function Sidebar({ mobileOrientation }) {
  const { isOpen } = useDashboardContext();

  return (
    <aside
      className={`${style.default}
        ${style.mobileOrientation[mobileOrientation]}
        ${isOpen ? style.open : style.close} ${css.scrollbar}`}
    >
      <div className={style.container}>
        <div className={style.headerContainer}>
          <SidebarHeader />
          {isOpen && (
            <div className="text-xl font-bold absolute top-8 sm:right-16 right-14 ">
              Rs Automation
            </div>
          )}
          {/* <div className="text-xl font-bold absolute top-8 right-16">Soham Tex</div> */}
        </div>
        <div className="flex-1">
          <SidebarItems />
        </div>
      </div>
    </aside>
  );
}
