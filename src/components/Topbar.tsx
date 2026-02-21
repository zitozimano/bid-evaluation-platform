export const Topbar = ({ title }: { title: string }) => (
  <header className="w-full bg-white shadow-sm border-b p-4 flex items-center justify-between">
    <h1 className="text-xl font-semibold">{title}</h1>
  </header>
);
