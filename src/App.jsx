import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import data from "./database.json";
import { HomePage } from "@/pages/HomePage";
import { SettingsPage } from "@/pages/SettingsPage";
import { ClassEnrollmentPage } from "@/pages/ClassEnrollmentPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { FinancialServicesPage } from "@/pages/FinancialServicesPage";
import { AcademicRecordsPage } from "@/pages/AcademicRecordsPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [enrollmentConfirmation, setEnrollmentConfirmation] = useState(null);
  const [scrollToPayTuition, setScrollToPayTuition] = useState(false);
  const redColor = "#9b0001";

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            darkMode={darkMode}
            setCurrentPage={setCurrentPage}
            setScrollToPayTuition={setScrollToPayTuition}
          />
        );
      case "settings":
        return <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />;
      case "class-enrollment":
        return (
          <ClassEnrollmentPage
            darkMode={darkMode}
            enrolledClasses={enrolledClasses}
            setEnrolledClasses={setEnrolledClasses}
            setEnrollmentConfirmation={setEnrollmentConfirmation}
          />
        );
      case "financial-services":
        return (
          <FinancialServicesPage
            darkMode={darkMode}
            scrollToPayTuition={scrollToPayTuition}
          />
        );
      case "academic-records":
        return <AcademicRecordsPage darkMode={darkMode} />;
      default:
        return (
          <PlaceholderPage darkMode={darkMode} currentPage={currentPage} />
        );
    }
  };

  const _oldRenderCard = (cardId) => {
    switch (cardId) {
      case "tasks":
        return (
          <SortableCard
            id="tasks"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } min-h-[280px] flex flex-col`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  My Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Holds Section */}
                  <Button
                    variant="ghost"
                    className={`w-full flex items-center justify-between p-4 h-auto ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Holds
                    </h3>
                    <span
                      className="text-lg font-bold"
                      style={{
                        color:
                          data.tasks.holds > 0
                            ? redColor
                            : darkMode
                            ? "white"
                            : "black",
                      }}
                    >
                      {data.tasks.holds}
                    </span>
                  </Button>

                  {/* To Do List Section */}
                  <Button
                    variant="ghost"
                    className={`w-full flex items-center justify-between p-4 h-auto ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      To Do List
                    </h3>
                    <span
                      className="text-lg font-bold"
                      style={{
                        color:
                          data.tasks.toDos > 0
                            ? redColor
                            : darkMode
                            ? "white"
                            : "black",
                      }}
                    >
                      {data.tasks.toDos}
                    </span>
                  </Button>

                  {/* Messages Section */}
                  <Button
                    variant="ghost"
                    className={`w-full flex items-center justify-between p-4 h-auto ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Messages
                    </h3>
                    <span
                      className="text-lg font-bold"
                      style={{
                        color:
                          data.tasks.messages > 0
                            ? redColor
                            : darkMode
                            ? "white"
                            : "black",
                      }}
                    >
                      {data.tasks.messages}
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SortableCard>
        );
      case "schedule":
        return (
          <SortableCard
            id="schedule"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } min-h-[280px] flex flex-col`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`space-y-4 ${
                    data.schedule.length > 2
                      ? "max-h-64 overflow-y-auto pr-2"
                      : ""
                  }`}
                >
                  {data.schedule.map((classItem, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          darkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {classItem.course}
                      </p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {classItem.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SortableCard>
        );
      case "tuition":
        return (
          <SortableCard
            id="tuition"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } self-start`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  Tuition Due
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p
                    className={`text-4xl font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    ${data.tuition.amount.toLocaleString()}
                  </p>
                </div>
                {data.tuition.amount > 0 && (
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: redColor }}
                  >
                    Pay Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </SortableCard>
        );
      case "announcements":
        return (
          <SortableCard
            id="announcements"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } min-h-[280px] flex flex-col`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  {data.announcements.map((announcement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          darkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {announcement.title}
                      </p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {announcement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SortableCard>
        );
      case "events":
        return (
          <SortableCard
            id="events"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } min-h-[280px] flex flex-col`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  {data.events.map((event, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          darkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {event.title}
                      </p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {event.date}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SortableCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        darkMode={darkMode}
      />

      {/* Main content area with left margin for navbar */}
      <main className="ml-64">
        {/* Banner */}
        <div
          className="text-white px-12 py-8 shadow-lg flex items-center justify-between"
          style={{
            background: `linear-gradient(to right, ${redColor}, #7a0001)`,
          }}
        >
          <h1 className="text-4xl font-bold">Welcome, {data.user.name}</h1>
          <Button
            variant="outline"
            className="gap-2 bg-transparent border-white text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {renderPage()}
      </main>

      {/* Enrollment Confirmation Popup - Bottom Right */}
      {enrollmentConfirmation && (
        <div
          className={`fixed bottom-6 right-6 z-50 border-2 rounded-lg shadow-lg p-4 ${
            darkMode
              ? "bg-green-900 border-green-700"
              : "bg-green-50 border-green-500"
          }`}
        >
          <p
            className={`font-semibold ${
              darkMode ? "text-green-100" : "text-green-800"
            }`}
          >
            ✓ Successfully enrolled in {enrollmentConfirmation} class
            {enrollmentConfirmation !== 1 ? "es" : ""}!
          </p>
        </div>
      )}
    </div>
  );
}
export default App;
