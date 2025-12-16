import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import data from "../database.json";

export const AcademicRecordsPage = ({ darkMode }) => {
  const redColor = "#9b0001";

  const getGradePoints = (grade) => {
    const gradeMap = {
      A: 4.0,
      "A-": 3.67,
      "B+": 3.33,
      B: 3.0,
      "B-": 2.67,
      "C+": 2.33,
      C: 2.0,
      "C-": 1.67,
      "D+": 1.33,
      D: 1.0,
      F: 0.0,
      IP: null, // In Progress
    };
    return gradeMap[grade] ?? null;
  };

  const calculateSemesterGPA = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const gradePoints = getGradePoints(course.grade);
      if (gradePoints !== null) {
        totalPoints += gradePoints * course.credits;
        totalCredits += course.credits;
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "N/A";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-12">
      <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle
              className="text-2xl font-bold"
              style={{ color: redColor }}
            >
              Academic Records
            </CardTitle>
            <p
              className={`text-lg mt-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {data.user.name}
            </p>
            <p
              className={`text-xl font-semibold mt-1 ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Cumulative GPA:{" "}
              <span style={{ color: redColor }}>
                {data.academicRecords.gpa}
              </span>
            </p>
          </div>
          <Button
            onClick={handlePrint}
            className="text-white gap-2"
            style={{ backgroundColor: redColor }}
          >
            <Printer className="h-5 w-5" />
            Print Transcript
          </Button>
        </CardHeader>
        <CardContent className="space-y-8">
          {data.academicRecords.semesters.map((semester) => {
            const semesterGPA = calculateSemesterGPA(semester.courses);
            const totalCredits = semester.courses.reduce((sum, course) => {
              return getGradePoints(course.grade) !== null
                ? sum + course.credits
                : sum;
            }, 0);

            return (
              <div key={semester.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {semester.name}
                  </h3>
                  <div className="text-right">
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Semester GPA:{" "}
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {semesterGPA}
                      </span>
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Credits:{" "}
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {totalCredits}
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  className={`overflow-hidden rounded-lg border ${
                    darkMode ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <table className="w-full">
                    <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                      <tr>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
                            darkMode ? "text-gray-200" : "text-gray-900"
                          }`}
                        >
                          Course Code
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-sm font-semibold ${
                            darkMode ? "text-gray-200" : "text-gray-900"
                          }`}
                        >
                          Course Name
                        </th>
                        <th
                          className={`px-4 py-3 text-center text-sm font-semibold ${
                            darkMode ? "text-gray-200" : "text-gray-900"
                          }`}
                        >
                          Credits
                        </th>
                        <th
                          className={`px-4 py-3 text-center text-sm font-semibold ${
                            darkMode ? "text-gray-200" : "text-gray-900"
                          }`}
                        >
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className={darkMode ? "bg-gray-800" : "bg-white"}>
                      {semester.courses.map((course, index) => (
                        <tr
                          key={index}
                          className={`border-t ${
                            darkMode ? "border-gray-600" : "border-gray-200"
                          }`}
                        >
                          <td
                            className={`px-4 py-3 text-sm font-medium ${
                              darkMode ? "text-gray-300" : "text-gray-900"
                            }`}
                          >
                            {course.code}
                          </td>
                          <td
                            className={`px-4 py-3 text-sm ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {course.name}
                          </td>
                          <td
                            className={`px-4 py-3 text-sm text-center ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {course.credits}
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            <span
                              className={`font-semibold px-3 py-1 rounded ${
                                course.grade === "IP"
                                  ? darkMode
                                    ? "bg-blue-900 text-blue-200"
                                    : "bg-blue-100 text-blue-800"
                                  : getGradePoints(course.grade) >= 3.67
                                  ? darkMode
                                    ? "bg-green-900 text-green-200"
                                    : "bg-green-100 text-green-800"
                                  : getGradePoints(course.grade) >= 3.0
                                  ? darkMode
                                    ? "bg-yellow-900 text-yellow-200"
                                    : "bg-yellow-100 text-yellow-800"
                                  : darkMode
                                  ? "bg-red-900 text-red-200"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {course.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .cursor-pointer, button:not([class*="print"]) {
            display: none !important;
          }
          nav {
            display: none !important;
          }
          header {
            display: none !important;
          }
          .p-12 {
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
