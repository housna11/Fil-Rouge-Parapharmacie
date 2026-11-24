import AdminSidebar from "../Components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-5 md:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}