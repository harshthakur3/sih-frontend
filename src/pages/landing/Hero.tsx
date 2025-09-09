import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Map, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobeViz from '@/components/Globe';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              <Brain className="mr-1 h-3 w-3" />
              AI-Powered Ocean Data Discovery
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Ocean Data with
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}Conversational AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl lg:max-w-none mx-auto lg:mx-0">
              FloatChat revolutionizes ocean data exploration through natural language queries, 
              interactive visualizations, and intelligent insights from ARGO profiling floats worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/chat')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Chatting
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              >
                <Map className="mr-2 h-5 w-5" />
                Explore Map
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <div className="absolute -top-4 left-6 h-3 w-3 rounded-full bg-cyan-300/80 animate-bounce" />
              <div className="absolute top-8 -left-2 h-2 w-2 rounded-full bg-blue-300/80 animate-bounce [animation-delay:200ms]" />
              <div className="absolute -bottom-2 right-8 h-2.5 w-2.5 rounded-full bg-cyan-300/80 animate-bounce [animation-delay:400ms]" />
              <GlobeViz className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


