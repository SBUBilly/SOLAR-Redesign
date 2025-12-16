import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import data from "../database.json";

export const FinancialServicesPage = ({ darkMode, scrollToPayTuition }) => {
  const redColor = "#9b0001";
  const [acceptedAwards, setAcceptedAwards] = useState([]);
  const [declinedAwards, setDeclinedAwards] = useState([]);

  // Scroll to pay tuition section if needed
  useEffect(() => {
    if (scrollToPayTuition) {
      setTimeout(() => {
        document.getElementById("pay-tuition-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [scrollToPayTuition]);

  const handleAccept = (award) => {
    setAcceptedAwards([...acceptedAwards, award]);
    setDeclinedAwards(declinedAwards.filter((a) => a.id !== award.id));
  };

  const handleDecline = (award) => {
    setDeclinedAwards([...declinedAwards, award]);
    setAcceptedAwards(acceptedAwards.filter((a) => a.id !== award.id));
  };

  const totalAcceptedAmount = acceptedAwards.reduce(
    (sum, award) => sum + award.amount,
    0
  );

  const totalCharges = data.tuitionCharges.reduce(
    (sum, charge) => sum + charge.amount,
    0
  );

  const totalDue = totalCharges - totalAcceptedAmount;

  const getTypeColor = (type) => {
    switch (type) {
      case "grant":
        return darkMode ? "text-green-400" : "text-green-600";
      case "scholarship":
        return darkMode ? "text-blue-400" : "text-blue-600";
      case "loan":
        return darkMode ? "text-yellow-400" : "text-yellow-600";
      default:
        return darkMode ? "text-gray-400" : "text-gray-600";
    }
  };

  const getTypeLabel = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="p-12 space-y-8">
      {/* Financial Aid Section */}
      <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{ color: redColor }}>
            Financial Aid Awards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.financialAid.map((award) => {
              const isAccepted = acceptedAwards.some((a) => a.id === award.id);
              const isDeclined = declinedAwards.some((a) => a.id === award.id);

              return (
                <div
                  key={award.id}
                  className={`p-4 rounded-lg border flex items-center justify-between ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } ${isDeclined ? "opacity-50" : ""}`}
                >
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {award.name}
                    </h3>
                    <p className={`text-sm mt-1 ${getTypeColor(award.type)}`}>
                      {getTypeLabel(award.type)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xl font-bold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      ${award.amount.toLocaleString()}
                    </span>
                    {!isAccepted && !isDeclined && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAccept(award)}
                          className="text-white"
                          style={{ backgroundColor: redColor }}
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleDecline(award)}
                          variant="outline"
                          className={
                            darkMode
                              ? "border-gray-600 text-gray-300 hover:bg-gray-600"
                              : ""
                          }
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                    {isAccepted && (
                      <span
                        className={`px-3 py-1 rounded ${
                          darkMode
                            ? "bg-green-900 text-green-200"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        Accepted
                      </span>
                    )}
                    {isDeclined && (
                      <span
                        className={`px-3 py-1 rounded ${
                          darkMode
                            ? "bg-gray-700 text-gray-400"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        Declined
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {acceptedAwards.length > 0 && (
              <div
                className={`p-4 rounded-lg border-2 ${
                  darkMode
                    ? "bg-gray-700 border-green-700"
                    : "bg-green-50 border-green-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`text-lg font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Total Accepted Financial Aid
                  </span>
                  <span
                    className={`text-2xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    ${totalAcceptedAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pay Tuition Section */}
      <div id="pay-tuition-section">
        <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
          <CardHeader>
            <CardTitle
              className="text-2xl font-bold"
              style={{ color: redColor }}
            >
              Pay Tuition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Charges Table */}
            <div>
              <h3
                className={`text-lg font-semibold mb-3 ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Charges
              </h3>
              <div className="space-y-2">
                {data.tuitionCharges.map((charge) => (
                  <div
                    key={charge.id}
                    className={`p-3 rounded flex justify-between ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      {charge.description}
                    </span>
                    <span
                      className={`font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      ${charge.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div
                  className={`p-3 rounded border-t-2 flex justify-between ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Total Charges
                  </span>
                  <span
                    className={`font-bold text-lg ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    ${totalCharges.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Aid Disbursement Table */}
            {acceptedAwards.length > 0 && (
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Financial Aid Disbursement
                </h3>
                <div className="space-y-2">
                  {acceptedAwards.map((award) => (
                    <div
                      key={award.id}
                      className={`p-3 rounded flex justify-between ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        {award.name}
                      </span>
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        -${award.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div
                    className={`p-3 rounded border-t-2 flex justify-between ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    <span
                      className={`font-bold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Total Financial Aid
                    </span>
                    <span
                      className={`font-bold text-lg ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      -${totalAcceptedAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Total Due */}
            <div
              className={`p-6 rounded-lg border-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-2xl font-bold ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Total Due
                </span>
                <span
                  className="text-3xl font-bold"
                  style={{
                    color:
                      totalDue > 0
                        ? redColor
                        : darkMode
                        ? "#4ade80"
                        : "#16a34a",
                  }}
                >
                  ${totalDue.toLocaleString()}
                </span>
              </div>
              {totalDue > 0 && (
                <Button
                  className="w-full text-white text-lg py-6"
                  style={{ backgroundColor: redColor }}
                  onClick={() => {
                    alert(
                      `Processing payment of $${totalDue.toLocaleString()}...`
                    );
                  }}
                >
                  Pay ${totalDue.toLocaleString()}
                </Button>
              )}
              {totalDue <= 0 && (
                <div
                  className={`text-center py-3 rounded ${
                    darkMode
                      ? "bg-green-900 text-green-200"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <p className="font-semibold">
                    ✓ Your balance is paid in full!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
