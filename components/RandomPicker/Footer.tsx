import { Save } from "lucide-react";

export function Footer() {
  return (
    <div className="flex justify-center mt-4 text-sm text-gray-500">
      <Save className="h-4 w-4 mr-1" /> Your list is automatically saved to your
      browser
    </div>
  );
}
