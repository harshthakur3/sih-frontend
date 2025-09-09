import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, BarChart3, Map, Brain, Waves, Globe } from 'lucide-react';

const features = [
  { icon: <MessageSquare className="h-8 w-8 text-blue-500" />, title: 'AI-Powered Chat', description: 'Natural language interface for ocean data queries with intelligent responses' },
  { icon: <BarChart3 className="h-8 w-8 text-green-500" />, title: 'Data Visualization', description: 'Interactive charts, graphs, and visual representations of ocean data' },
  { icon: <Map className="h-8 w-8 text-purple-500" />, title: 'Interactive Maps', description: 'Geographic visualization with city-based zoom and location tracking' },
  { icon: <Brain className="h-8 w-8 text-orange-500" />, title: 'ARGO Integration', description: 'Direct access to ARGO ocean profiling float data and real-time information' },
  { icon: <Waves className="h-8 w-8 text-cyan-500" />, title: 'Ocean Analytics', description: 'Comprehensive oceanographic data analysis and trend identification' },
  { icon: <Globe className="h-8 w-8 text-indigo-500" />, title: 'Global Coverage', description: 'Worldwide ocean data access with regional and temporal filtering' },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Ocean Data Discovery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to explore, analyze, and understand ocean data through intelligent conversation and visualization.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;


