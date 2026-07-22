import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area - Yeh change zaroori hai */}
      <main className="flex-1 md:pl-64 min-h-screen transition-all duration-300 flex flex-col">
        <div className="flex-1 w-full h-full p-8">
          {children}
        </div>
      </main>
    </div>
  );
}