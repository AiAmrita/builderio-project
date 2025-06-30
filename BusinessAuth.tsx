import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBusinessAuth } from "@/hooks/use-business-auth";
import { Eye, EyeOff, X, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BusinessRegistration from "./BusinessRegistration";

export default function BusinessAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const { login, isLoading } = useBusinessAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Attempting login with email:", email); // Debug log

    const result = await login(email, password);
    console.log("Login result:", result); // Debug log

    if (!result.success) {
      if (result.error === "account_not_found") {
        console.log("Setting error to account_not_found"); // Debug log
        setError("account_not_found");
      } else if (result.error === "invalid_password") {
        setError("invalid_password");
      } else {
        setError("invalid_credentials");
      }
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    // Optionally redirect to dashboard after successful registration
    navigate("/dashboard");
  };

  if (showRegistration) {
    return (
      <BusinessRegistration
        onClose={() => setShowRegistration(false)}
        onSuccess={handleRegistrationSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute right-4 top-4 h-8 w-8 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            ARRSAL Business Login
          </CardTitle>
          <p className="text-gray-600">Access your business dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            {error && (
              <div className="space-y-3">
                {error === "account_not_found" ? (
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-blue-900 mb-2">
                          ✋ Hold on! Account Not Found
                        </h4>
                        <p className="text-blue-800 mb-4 leading-relaxed">
                          <strong>
                            We couldn't find a business account with "{email}"
                          </strong>
                          <br />
                          <span className="text-blue-700">
                            No worries! You just need to create a business
                            account first. It only takes 2 minutes and comes
                            with a 14-day free trial.
                          </span>
                        </p>
                        <Button
                          onClick={() => setShowRegistration(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
                        >
                          <Building2 className="h-4 w-4 mr-2" />
                          Create Business Account Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : error === "invalid_password" ? (
                  <p className="text-red-600 text-sm">
                    Invalid password. Try: aiamrita654@gmail.com / Arrsal!0440
                  </p>
                ) : (
                  <p className="text-red-600 text-sm">
                    Invalid credentials. Try: aiamrita654@gmail.com /
                    Arrsal!0440
                  </p>
                )}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Account:</strong>
              <br />
              Email: aiamrita654@gmail.com
              <br />
              Password: Arrsal!0440
            </p>
          </div>

          {/* Create Account Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Need a business account?
              </p>
              <Button
                variant="outline"
                onClick={() => setShowRegistration(true)}
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Create Business Account
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Start with a 14-day free trial • No credit card required
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
