import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Input,
  Separator,
} from "@/shared/ui";

export default function AdminLoginPage() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Card className="p-4">
        <CardTitle className="text-center mb-3">Login</CardTitle>
        <Separator />
        <CardContent className="p-4">
          <form className="flex flex-col gap-2">
            <Input label="Login" type="text" />
            <Input label="Password" type="password" />
            <Button className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
