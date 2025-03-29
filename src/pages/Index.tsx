
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Eye, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-shadow">
      {/* Header */}
      <header className="px-6 py-4 md:px-10 md:py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Eye className="h-8 w-8 text-highlight-purple" />
          <h1 className="ml-2 text-xl font-bold text-white">
            Shadow<span className="text-highlight-purple">Sight</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="hover:bg-shadow-light">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-highlight-purple hover:bg-highlight-purple/90">Sign up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:px-10 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gradient">
              Detect Invisible Cheating in Technical Interviews
            </h2>
            <p className="text-lg text-gray-300">
              ShadowSight silently integrates with platforms like HackerRank and CoderPad 
              to identify stealth cheating behaviors without disrupting the candidate experience.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="bg-highlight-purple hover:bg-highlight-purple/90 px-8 py-6 w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="border-shadow-light bg-shadow-dark hover:bg-shadow px-8 py-6 w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <div className="rounded-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80" 
                alt="Coding session visualization" 
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="mt-6 bg-shadow-dark rounded-md p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-mono text-gray-400">Candidate #42</span>
                <span className="text-sm font-medium bg-severity-high/20 text-severity-high px-2 py-0.5 rounded">
                  HIGH RISK
                </span>
              </div>
              <div className="w-full bg-shadow h-2 rounded-full">
                <div className="bg-severity-high h-2 rounded-full w-[35%]"></div>
              </div>
              <div className="mt-4 text-sm font-mono">
                <div className="flex items-center text-severity-high mb-1">
                  <span className="w-16 text-gray-400">10:14:23</span>
                  <span>GPT Overlay Detected</span>
                </div>
                <div className="flex items-center text-severity-medium mb-1">
                  <span className="w-16 text-gray-400">10:15:46</span>
                  <span>Complex Code Pasted</span>
                </div>
                <div className="flex items-center text-severity-high mb-1">
                  <span className="w-16 text-gray-400">10:18:02</span>
                  <span>Tab Switching Detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 md:px-10 md:py-24 bg-shadow-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How ShadowSight Works</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our comprehensive monitoring system provides full transparency 
              into how candidates complete their coding interviews.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-highlight-purple/20 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-highlight-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Stealth Detection</h3>
              <p className="text-gray-300">
                Identify hidden GPT overlays, burst pastes, DOM tampering, and tab switching 
                without disrupting the candidate.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-highlight-purple/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-highlight-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Trust Score</h3>
              <p className="text-gray-300">
                Each session receives a comprehensive Trust Score based on detected behaviors 
                and anomalies in coding patterns.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-highlight-purple/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-highlight-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Integration</h3>
              <p className="text-gray-300">
                Chrome Extension seamlessly integrates with HackerRank, CoderPad, and other 
                popular interview platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:px-10 md:py-24 max-w-7xl mx-auto">
        <div className="glass-card rounded-lg p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ensure Fair Technical Hiring?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Join growing companies who trust ShadowSight to validate the integrity 
              of their technical interviews.
            </p>
            <Link to="/signup">
              <Button className="bg-highlight-purple hover:bg-highlight-purple/90 px-10 py-6">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 md:px-10 border-t border-shadow-light">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Eye className="h-6 w-6 text-highlight-purple" />
            <span className="ml-2 text-sm font-medium">
              © 2023 ShadowSight. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
