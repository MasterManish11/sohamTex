import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { data } from './data'; // Assumed to contain sidebar items, including "Report".
import { useDashboardContext } from '../Provider';
import { useState, useEffect, useRef } from 'react';

const style = {
  title: 'mx-4 text-sm whitespace-pre',
  active: 'bg-gray-700 rounded-full',
  link: 'flex items-center justify-start my-1 p-3 w-full hover:text-white',
  close: 'lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all',
  open: 'lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto',
  dropdownItem:
    'flex items-center justify-start my-1 py-2 w-full text-sm text-gray-400 hover:text-white',
  dropdownList:
    'overflow-hidden transition-all duration-700 ease-in-out transform origin-top',
};

export function SidebarItems() {
  const pathname = usePathname();
  const { isOpen } = useDashboardContext();
  const [isReportDropdownOpen, setReportDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle the "Report" dropdown menu
  const toggleReportDropdown = () => {
    setReportDropdownOpen(!isReportDropdownOpen);
  };

  // Handle click outside to close the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setReportDropdownOpen(false);
    }
  };

  // Set up event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ul className="md:pl-3">
      {data.map((item) => (
        <li key={item.title}>
          {item.title === 'Report' ? (
            <div onClick={toggleReportDropdown} className="cursor-pointer" ref={dropdownRef}>
              <span className={style.link}>
                <div className={`p-2 ${item.link === pathname ? style.active : ''}`}>
                  <span>{item.icon}</span>
                </div>
                {/* Toggle between showing the title or only the icon based on the dropdown state */}
                <span className={`${style.title} ${isOpen ? style.open : style.close}`}>
                  {item.title}
                </span>
              </span>
            </div>
          ) : (
            <Link href={item.link}>
              <span className={style.link}>
                <div className={`p-2 ${item.link === pathname ? style.active : ''}`}>
                  <span>{item.icon}</span>
                </div>
                <span className={`${style.title} ${isOpen ? style.open : style.close}`}>
                  {item.title}
                </span>
              </span>
            </Link>
          )}
          {/* Render dropdown menu items if "Report" is open */}
          {item.title === 'Report' && (
            <ul
              className={`${style.dropdownList} ${
                isReportDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              } flex flex-col -ml-5 items-center`}
            >
              <li>
                <Link href="/admin/reports/production">
                  <div className="flex items-center space-x-3">
                    <span className={style.dropdownItem}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                        <text
                          x="12"
                          y="16"
                          textAnchor="middle"
                          fontSize="12"
                          fontFamily="Arial"
                          fill="currentColor"
                        >
                          P
                        </text>
                      </svg>
                    </span>
                    {isOpen ? <span className="text-sm">Production</span> : null}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin/reports/stoppage">
                  <div className={`flex items-center space-x-3 ${isOpen ? '-ml-2' : ''}`}>
                    <span className={style.dropdownItem}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                        <text
                          x="12"
                          y="16"
                          textAnchor="middle"
                          fontSize="12"
                          fontFamily="Arial"
                          fill="currentColor"
                        >
                          S
                        </text>
                      </svg>
                    </span>
                    {isOpen ? <span className="text-sm">Stoppage</span> : null}
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
