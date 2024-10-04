export function Snippet() {
  return (
    <pre className="max-w-full overflow-x-auto rounded border bg-gray-100 px-4 py-1 font-mono text-sm text-black">
      {`[ 
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Report",
    icon: <ReportIcon />,
    link: "/admin/report",
  },
]
`}
    </pre>
  );
}
