import { Bell, UserCircle, Leaf } from "lucide-react";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between bg-[#FCFFFB] rounded-2xl shadow-md px-8 py-5 mb-6">

      {/* Logo */}
      <div className="flex items-center gap-4">

        <div className="bg-green-100 p-3 rounded-2xl">
          <Leaf className="text-[#2E7D32]" size={30} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#2E7D32]">
            EcoVia
          </h1>

          <p className="text-sm text-gray-500">
            Smart Urban Mobility Assistant
          </p>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notifications */}
        <button className="relative bg-[#EEF7EA] p-3 rounded-xl hover:bg-green-100 transition">

          <Bell className="text-[#2E7D32]" size={22} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-600"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-[#2E7D32]"
          />

          <div>

            <h3 className="font-semibold">
              Laasya
            </h3>

            <p className="text-sm text-gray-500">
              Eco Explorer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}