
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { SignupForm } from "@/components/auth/SignupForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SignupPage = () => {
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
          <h2 className="text-3xl font-bold mb-4 text-gradient">Fair Technical Hiring</h2>
          <p className="text-muted-foreground mb-6">
            Ensure the integrity of your technical interviews with advanced 
            AI-powered cheating detection technology.
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
                <h3 className="font-medium text-white">Chrome Extension Integration</h3>
                <p className="text-sm text-muted-foreground">Seamlessly works with platforms like HackerRank and CoderPad</p>
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
                <h3 className="font-medium text-white">Exportable Reports</h3>
                <p className="text-sm text-muted-foreground">Share interview integrity insights with your team</p>
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
                <h3 className="font-medium text-white">Candidate Respect</h3>
                <p className="text-sm text-muted-foreground">Non-invasive monitoring respects candidate privacy</p>
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
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Get started with ShadowSight today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-highlight-purple hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
