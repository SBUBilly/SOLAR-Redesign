import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function SettingsPage({ darkMode, setDarkMode }) {
  const redColor = "#9b0001";

  return (
    <div className="p-12">
      <Card
        className={`max-w-2xl ${
          darkMode ? "bg-gray-800 border-gray-700" : ""
        }`}
      >
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: redColor }}
          >
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Dark Mode
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Toggle dark mode for better viewing in low light
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
