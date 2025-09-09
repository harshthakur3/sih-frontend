import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Explore Ocean Data?</h2>
        <p className="text-xl text-gray-600 mb-8">Join researchers, scientists, and ocean enthusiasts in discovering the world's oceans through AI-powered conversation.</p>
        <Button 
          size="lg"
          onClick={() => navigate('/chat')}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-12 py-4 text-xl"
        >
          <MessageSquare className="mr-2 h-6 w-6" />
          Start Your Ocean Journey
        </Button>
      </div>
    </section>
  );
};

export default CTA;


