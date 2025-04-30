"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Users, BookOpen, UserCog } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "mentee";
  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulated login logic
    const validLogins = {
      "admin1@careerbridge.com": { id: "admin1", role: "admin" },
      "admin2@careerbridge.com": { id: "admin2", role: "admin" },
      "admin3@careerbridge.com": { id: "admin3", role: "admin" },
      "mentee1@example.com": { id: "mentee1", role: "mentee" },
      "mentee2@example.com": { id: "mentee2", role: "mentee" },
      "mentee3@example.com": { id: "mentee3", role: "mentee" },
      "mentor1@example.com": { id: "mentor1", role: "mentor" },
      "mentor2@example.com": { id: "mentor2", role: "mentor" },
    };

    const user = validLogins[email];

    if (user && user.role === role) {
      router.push(`/dashboard/${role}/${user.id}`);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-blue-50 dark:bg-blue-950 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Log in to your CareerBridge account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={role} onValueChange={setRole}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="mentee" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Mentee</span>
                </TabsTrigger>
                <TabsTrigger value="mentor" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Mentor</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  <span>Admin</span>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Log In
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Don't have an account?</p>
            <div className="flex justify-center space-x-2">
              <Button variant="link" onClick={() => router.push("/?role=mentee")}>
                Apply as Mentee
              </Button>
              <Button variant="link" onClick={() => router.push("/?role=mentor")}>
                Apply as Mentor
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}