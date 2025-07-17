import Sidebar from '../../component/dashboard/Sidebar'

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex ">
      {/* Sidebar */}
      <aside className="w-[20%] bg-gray-800 text-white md:p-6 p-2">
      <Sidebar /> 
      </aside>

      {/* Main Content */}
      <main className="w-[80%] p-6">{children}</main>
    </div>
  );
}
