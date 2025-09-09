import React, { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Waves, Bot } from 'lucide-react';
import MapComponent from '@/components/MapComponent';
import ChatBot from '@/components/ChatBot';

const ChatPage = () => {
  const mapComponentRef = useRef<any>(null);

  const handleLocationDetected = (location: string) => {
    // This will be called when the chatbot detects a location
    console.log('Location detected:', location);
    
    // Automatically search the location in the map component
    if (mapComponentRef.current) {
      console.log('Calling zoomToLocation with:', location);
      mapComponentRef.current.zoomToLocation(location);
    } else {
      console.log('mapComponentRef.current is null');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                FloatChat
              </h1>
              <p className="text-sm text-gray-500">AI-Powered Ocean Data Discovery</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Bot className="mr-1 h-3 w-3" />
            Online
          </Badge>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel - Left Side */}
        <div className="w-1/2">
          <ChatBot 
            onLocationDetected={handleLocationDetected}
            className="h-full"
          />
        </div>

        {/* Map Panel - Right Side */}
        <div className="w-1/2">
          <MapComponent 
            ref={mapComponentRef}
            onLocationSearch={handleLocationDetected}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;