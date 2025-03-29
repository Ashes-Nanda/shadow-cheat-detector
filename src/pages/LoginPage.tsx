
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-shadow">
      <div className="hidden md:block md:w-1/2 bg-shadow-dark p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <Eye className="h-10 w-10 text-highlight-purple" />
            <h1 className="ml-2 text-2xl font-bold text-white">
              Shadow<span className="text-highlight-purple">Sight</span>
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gradient">Detect Invisible Cheating</h2>
          <p className="text-muted-foreground mb-6">
            Silent integration with coding platforms to identify stealth cheating 
            behaviors without disrupting the candidate experience.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-shadow-light mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" 
                    fill="#9b87f5" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Hidden GPT Overlay Detection</h3>
                <p className="text-sm text-muted-foreground">Identifies when candidates use AI assistance overlays</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-shadow-light mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" 
                    fill="#9b87f5" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Trust Score Analysis</h3>
                <p className="text-sm text-muted-foreground">Provides a detailed integrity assessment for each interview</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-shadow-light mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" 
                    fill="#9b87f5" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Timeline-Based Red Flags</h3>
                <p className="text-sm text-muted-foreground">Visual timeline of suspicious activities during interviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md glass-card">
          <CardHeader className="space-y-1">
            <div className="flex items-center mb-2 md:hidden">
              <Eye className="h-6 w-6 text-highlight-purple" />
              <h1 className="ml-2 text-xl font-bold text-white">
                Shadow<span className="text-highlight-purple">Sight</span>
              </h1>
            </div>
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-highlight-purple hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
