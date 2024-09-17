import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Theme, useTheme } from "@/components/ui/ThemeProvider";
import { Laptop, Moon, Sun } from "lucide-react";
const ThemeChanger = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Select onValueChange={(e) => setTheme(e as Theme)} value={theme}>
      <SelectTrigger className="w-fit border-none outline-none focus:outline-none">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <Sun className="h-4 w-4" />
        </SelectItem>
        <SelectItem value="dark">
          <Moon className="h-4 w-4" />
        </SelectItem>
        <SelectItem value="system">
          <Laptop className="h-4 w-4" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ThemeChanger;
