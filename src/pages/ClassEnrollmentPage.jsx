import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ShoppingCart, Plus, X } from "lucide-react";
import data from "../database.json";

export function ClassEnrollmentPage({
  darkMode,
  enrolledClasses,
  setEnrolledClasses,
  setEnrollmentConfirmation,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const redColor = "#9b0001";

  return (
    <div className="p-12">
      <div className="max-w-7xl">
        {/* Header with search and cart */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search for classes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
          </div>
          <Button
            onClick={() => {
              setShowSchedule(!showSchedule);
              setShowCart(false);
            }}
            variant="outline"
            className={`gap-2 ${
              darkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            View Schedule
            {enrolledClasses.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-900 text-white">
                {enrolledClasses.length}
              </span>
            )}
          </Button>
          <Button
            onClick={() => {
              setShowCart(!showCart);
              setShowSchedule(false);
            }}
            className="gap-2 text-white relative"
            style={{ backgroundColor: redColor }}
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cart.length}
              </span>
            )}
          </Button>
        </div>

        {/* Schedule View */}
        {showSchedule && (
          <Card
            className={`mb-8 relative ${
              darkMode ? "bg-gray-800 border-gray-700" : ""
            }`}
          >
            <button
              onClick={() => setShowSchedule(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-600"
              } transition-colors`}
            >
              <X className="h-4 w-4" />
            </button>
            <CardHeader>
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: redColor }}
              >
                My Schedule ({enrolledClasses.length} classes)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {enrolledClasses.length === 0 ? (
                <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                  You have not enrolled in any classes yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {enrolledClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className={`p-4 rounded-lg border flex items-center justify-between ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div>
                        <p
                          className={`font-semibold ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {classItem.code} - {classItem.name}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {classItem.instructor} • {classItem.time} •{" "}
                          {classItem.credits} credits
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setEnrolledClasses(
                            enrolledClasses.filter(
                              (item) => item.id !== classItem.id
                            )
                          )
                        }
                        className={
                          darkMode
                            ? "border-gray-600 text-gray-300 hover:bg-gray-600"
                            : ""
                        }
                      >
                        Unenroll
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Cart View */}
        {showCart && (
          <Card
            className={`mb-8 relative ${
              darkMode ? "bg-gray-800 border-gray-700" : ""
            }`}
          >
            <button
              onClick={() => setShowCart(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-600"
              } transition-colors`}
            >
              <X className="h-4 w-4" />
            </button>
            <CardHeader>
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: redColor }}
              >
                Shopping Cart ({cart.length} classes)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-3">
                  {cart.map((classItem) => (
                    <div
                      key={classItem.id}
                      className={`p-4 rounded-lg border flex items-center justify-between ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div>
                        <p
                          className={`font-semibold ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {classItem.code} - {classItem.name}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {classItem.instructor} • {classItem.time} •{" "}
                          {classItem.credits} credits
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCart(
                            cart.filter((item) => item.id !== classItem.id)
                          )
                        }
                        className={
                          darkMode
                            ? "border-gray-600 text-gray-300 hover:bg-gray-600"
                            : ""
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => {
                        const enrolledCount = cart.length;
                        setEnrolledClasses([...enrolledClasses, ...cart]);
                        setEnrollmentConfirmation(enrolledCount);
                        setCart([]);
                        setShowCart(false);
                        setShowSchedule(true);
                        setTimeout(() => setEnrollmentConfirmation(null), 5000);
                      }}
                      className="w-full text-white"
                      style={{ backgroundColor: redColor }}
                    >
                      Enroll in {cart.length} Class
                      {cart.length !== 1 ? "es" : ""}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchQuery.length >= 3 && (
          <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: redColor }}
              >
                Available Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const enrolledIds = enrolledClasses.map((c) => c.id);
                  const filteredClasses =
                    searchQuery.length >= 3
                      ? data.classes.filter(
                          (classItem) =>
                            !enrolledIds.includes(classItem.id) &&
                            (classItem.code
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                              classItem.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              classItem.instructor
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()))
                        )
                      : data.classes.filter((c) => !enrolledIds.includes(c.id));

                  if (filteredClasses.length === 0) {
                    return (
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        No classes found matching "{searchQuery}"
                      </p>
                    );
                  }

                  return filteredClasses.map((classItem) => {
                    const isInCart = cart.some(
                      (item) => item.id === classItem.id
                    );
                    return (
                      <div
                        key={classItem.id}
                        className={`p-4 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3
                              className={`text-lg font-semibold ${
                                darkMode ? "text-gray-100" : "text-gray-900"
                              }`}
                            >
                              {classItem.code} - {classItem.name}
                            </h3>
                            <p
                              className={`text-sm mt-1 ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              <strong>Instructor:</strong>{" "}
                              {classItem.instructor}
                            </p>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              <strong>Time:</strong> {classItem.time}
                            </p>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              <strong>Location:</strong> {classItem.location}
                            </p>
                            <div className="flex gap-4 mt-2">
                              <span
                                className={`text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {classItem.credits} Credits
                              </span>
                              <span
                                className={`text-sm ${
                                  classItem.seats > 10
                                    ? darkMode
                                      ? "text-green-400"
                                      : "text-green-600"
                                    : darkMode
                                    ? "text-yellow-400"
                                    : "text-yellow-600"
                                }`}
                              >
                                {classItem.seats} seats available
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              if (isInCart) {
                                setCart(
                                  cart.filter(
                                    (item) => item.id !== classItem.id
                                  )
                                );
                              } else {
                                setCart([...cart, classItem]);
                              }
                            }}
                            variant={isInCart ? "outline" : "default"}
                            className={
                              isInCart
                                ? darkMode
                                  ? "border-gray-600 text-gray-300 hover:bg-gray-600"
                                  : ""
                                : "text-white"
                            }
                            style={
                              isInCart ? {} : { backgroundColor: redColor }
                            }
                          >
                            {isInCart ? (
                              "Remove from Cart"
                            ) : (
                              <>
                                <Plus className="h-4 w-4 mr-2" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
