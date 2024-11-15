export function SidebarHeader() {
  return (
    <div className="sticky top-0 z-10 mb-6 flex items-center justify-center bg-gray-900 py-3 pl-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="#e0c0b0" />

        <circle cx="100" cy="100" r="80" fill="#d1b493" />

        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="serif"
          fontSize="100"
          fill="#5e4b4b"
          fontWeight="bold"
          // fontStyle='italic'
        >
          R
        </text>
      </svg>
    </div>
  );
}
