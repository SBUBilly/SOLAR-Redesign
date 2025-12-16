import {
  Home,
  BookOpen,
  GraduationCap,
  DollarSign,
  User,
  Settings,
} from "lucide-react";

export function Navbar({ onNavigate, currentPage, darkMode }) {
  const redColor = "#9b0001";

  return (
    <nav
      className={`fixed left-0 top-0 h-screen w-64 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-r shadow-lg flex flex-col z-50`}
    >
      {/* Logo/Icon at the top - Clickable */}
      <button
        onClick={() => onNavigate("home")}
        className={`p-6 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } border-b text-left`}
      >
        <div className="flex items-center gap-3">
          <img
            src="/icons/blob.png"
            alt="SOLAR Logo"
            className="h-20 w-20 object-contain"
          />
          <span className="text-2xl font-bold" style={{ color: redColor }}>
            SOLAR
          </span>
        </div>
      </button>

      {/* Navigation Menu - Vertical */}
      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col">
          <button
            onClick={() => onNavigate("home")}
            className={`flex items-center gap-3 px-6 py-4 transition-colors text-left ${
              currentPage === "home"
                ? darkMode
                  ? "bg-gray-700"
                  : "bg-red-50"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-red-50"
            }`}
            style={currentPage === "home" ? { color: redColor } : {}}
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </button>
          <button
            onClick={() => onNavigate("class-enrollment")}
            className={`flex items-center gap-3 px-6 py-4 transition-colors text-left ${
              currentPage === "class-enrollment"
                ? darkMode
                  ? "bg-gray-700"
                  : "bg-red-50"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-red-50"
            }`}
            style={
              currentPage === "class-enrollment" ? { color: redColor } : {}
            }
          >
            <BookOpen className="h-5 w-5" />
            <span className="font-medium">Class Enrollment</span>
          </button>
          <button
            onClick={() => onNavigate("financial-services")}
            className={`flex items-center gap-3 px-6 py-4 transition-colors text-left ${
              currentPage === "financial-services"
                ? darkMode
                  ? "bg-gray-700"
                  : "bg-red-50"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-red-50"
            }`}
            style={
              currentPage === "financial-services" ? { color: redColor } : {}
            }
          >
            <DollarSign className="h-5 w-5" />
            <span className="font-medium">Financial Services</span>
          </button>
          <button
            onClick={() => onNavigate("academic-records")}
            className={`flex items-center gap-3 px-6 py-4 transition-colors text-left ${
              currentPage === "academic-records"
                ? darkMode
                  ? "bg-gray-700"
                  : "bg-red-50"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-red-50"
            }`}
            style={
              currentPage === "academic-records" ? { color: redColor } : {}
            }
          >
            <GraduationCap className="h-5 w-5" />
            <span className="font-medium">Academic Records</span>
          </button>
          <button
            onClick={() => onNavigate("settings")}
            className={`flex items-center gap-3 px-6 py-4 transition-colors text-left ${
              currentPage === "settings"
                ? darkMode
                  ? "bg-gray-700"
                  : "bg-red-50"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-red-50"
            }`}
            style={currentPage === "settings" ? { color: redColor } : {}}
          >
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>
      </div>
    </nav>
  );
}
