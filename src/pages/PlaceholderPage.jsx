import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PlaceholderPage({ darkMode, currentPage }) {
  const redColor = "#9b0001";

  return (
    <div className="p-12">
      <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: redColor }}
          >
            Page: {currentPage}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
            This page is under construction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
