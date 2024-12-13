import { LogOutDialog } from "@/components/logout-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import UserLayout from "@/layout/user-layout";
import { Theme, useTheme } from "@/providers/ThemeProvider";

export default function Settings() {
  const { theme, themes, setTheme } = useTheme();

  return (
    <UserLayout>
      <div className="bg-background w-full flex flex-col items-center gap-8 p-8">
        <Card className="w-full max-w-3xl h-fit">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            {/* THEME */}
            <div className="flex justify-between items-center">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-3xl h-fit border-destructive">
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* LOG OUT */}
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="log-out">Log Out</Label>
                <p className="text-muted-foreground text-xs">
                  Are you sure you want to log out? You will need to log in again to access your account.
                </p>
              </div>
              <LogOutDialog text="LogOut" />
            </div>
            {/* DELETE ACCOUNT */}
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="delete-account">Delete Account</Label>
                <p className="text-muted-foreground text-xs">
                  Are you sure you want to delete your account? This action is irreversible and you will lose all your
                  data.
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
