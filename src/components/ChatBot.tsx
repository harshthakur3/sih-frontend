import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  Thermometer,
  Droplets,
  Wind,
  Loader2,
  BarChart3
} from 'lucide-react';
import OceanChart from './charts/OceanChart';
import { geminiService } from '@/services/GeminiService';
import { GeminiOceanResponse } from '@/types/OceanData';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  visualizations?: any;
}

interface ChatBotProps {
  onLocationDetected?: (location: string) => void;
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ onLocationDetected, className = "" }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m FloatChat, your AI assistant for ARGO float data discovery. I can help you explore oceanographic information, visualize ocean parameters, and answer questions about specific locations. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const processUserMessage = async (message: string) => {
    try {
      // Get AI response from Gemini with ocean data
      const geminiResponse: GeminiOceanResponse = await geminiService.generateOceanResponse(message);
      
      let visualizations: any = {};
      let response = geminiResponse.text;

      // Handle location detection
      if (geminiResponse.locations && geminiResponse.locations.length > 0) {
        const primaryLocation = geminiResponse.locations[0];
        if (onLocationDetected) {
          onLocationDetected(primaryLocation);
        }
        response = `${response}\n\nI've zoomed the map to show the ${primaryLocation} area.`;
      }

      // Handle visualizations - always generate some dummy data for demonstration
      if (geminiResponse.visualizations?.chart) {
        visualizations.chart = geminiResponse.visualizations.chart;
      } else {
        // Generate default visualization based on data type
        visualizations.chart = generateDefaultVisualization(geminiResponse.dataType, geminiResponse.locations?.[0]);
      }

      return { response, visualizations };

    } catch (error) {
      console.error('Error processing message:', error);
      return {
        response: 'I apologize, but I encountered an error processing your request. Please try again.',
        visualizations: {}
      };
    }
  };

  const generateDefaultVisualization = (dataType: string, location?: string) => {
    const baseTitle = location ? `${dataType.charAt(0).toUpperCase() + dataType.slice(1)} Data - ${location}` : `${dataType.charAt(0).toUpperCase() + dataType.slice(1)} Profile`;
    
    switch (dataType) {
      case 'temperature':
        return {
          type: 'temperature',
          data: [
            { depth: 0, temperature: 25.2 + Math.random() * 2 },
            { depth: 50, temperature: 24.8 + Math.random() * 1.5 },
            { depth: 100, temperature: 23.5 + Math.random() * 1 },
            { depth: 200, temperature: 20.1 + Math.random() * 0.8 },
            { depth: 500, temperature: 15.3 + Math.random() * 0.5 }
          ],
          title: baseTitle
        };
      
      case 'salinity':
        return {
          type: 'salinity',
          data: [
            { depth: 0, salinity: 35.1 + Math.random() * 0.2 },
            { depth: 50, salinity: 35.2 + Math.random() * 0.15 },
            { depth: 100, salinity: 35.3 + Math.random() * 0.1 },
            { depth: 200, salinity: 35.4 + Math.random() * 0.08 },
            { depth: 500, salinity: 35.6 + Math.random() * 0.05 }
          ],
          title: baseTitle
        };
      
      case 'wind':
        return {
          type: 'wind',
          data: [
            { date: '2024-01-01', windSpeed: 12.5 + Math.random() * 3 },
            { date: '2024-01-15', windSpeed: 15.2 + Math.random() * 2.5 },
            { date: '2024-02-01', windSpeed: 18.7 + Math.random() * 2 },
            { date: '2024-02-15', windSpeed: 14.3 + Math.random() * 2.8 },
            { date: '2024-03-01', windSpeed: 16.8 + Math.random() * 2.2 },
            { date: '2024-03-15', windSpeed: 13.1 + Math.random() * 2.5 }
          ],
          title: baseTitle
        };
      
      case 'pressure':
        return {
          type: 'pressure',
          data: [
            { depth: 0, pressure: 0 },
            { depth: 50, pressure: 51 + Math.random() * 2 },
            { depth: 100, pressure: 102 + Math.random() * 3 },
            { depth: 200, pressure: 204 + Math.random() * 4 },
            { depth: 500, pressure: 510 + Math.random() * 5 }
          ],
          title: baseTitle
        };

      case 'argo':
        return {
          type: 'argo',
          data: [
            { floatId: 'ARGO-001', latitude: 25.7 + Math.random() * 2, longitude: -80.2 + Math.random() * 2, depth: 1000, temperature: 15.2, salinity: 35.4, pressure: 100 },
            { floatId: 'ARGO-002', latitude: 25.8 + Math.random() * 2, longitude: -80.1 + Math.random() * 2, depth: 1500, temperature: 12.8, salinity: 35.6, pressure: 150 },
            { floatId: 'ARGO-003', latitude: 25.6 + Math.random() * 2, longitude: -80.3 + Math.random() * 2, depth: 2000, temperature: 10.5, salinity: 35.8, pressure: 200 },
            { floatId: 'ARGO-004', latitude: 25.9 + Math.random() * 2, longitude: -80.0 + Math.random() * 2, depth: 800, temperature: 18.1, salinity: 35.2, pressure: 80 },
            { floatId: 'ARGO-005', latitude: 25.5 + Math.random() * 2, longitude: -80.4 + Math.random() * 2, depth: 1200, temperature: 14.3, salinity: 35.5, pressure: 120 }
          ],
          title: location ? `ARGO Floats near ${location}` : 'ARGO Float Locations'
        };

      case 'trends':
        return {
          type: 'trends',
          data: [
            { month: 'Jan 2023', temperature: 24.2, salinity: 35.1, pressure: 1013 },
            { month: 'Feb 2023', temperature: 23.8, salinity: 35.2, pressure: 1015 },
            { month: 'Mar 2023', temperature: 25.1, salinity: 35.0, pressure: 1012 },
            { month: 'Apr 2023', temperature: 26.3, salinity: 34.9, pressure: 1010 },
            { month: 'May 2023', temperature: 27.1, salinity: 34.8, pressure: 1008 },
            { month: 'Jun 2023', temperature: 28.2, salinity: 34.7, pressure: 1006 }
          ],
          title: location ? `6-Month Trends - ${location}` : 'Ocean Parameter Trends'
        };

      case 'conditions':
        return {
          type: 'conditions',
          data: [
            { parameter: 'Temperature', value: 25.4, unit: '°C', status: 'Normal' },
            { parameter: 'Salinity', value: 35.2, unit: 'PSU', status: 'Normal' },
            { parameter: 'Pressure', value: 1013, unit: 'hPa', status: 'Normal' },
            { parameter: 'Wind Speed', value: 12.5, unit: 'm/s', status: 'Moderate' },
            { parameter: 'Wave Height', value: 1.8, unit: 'm', status: 'Calm' }
          ],
          title: location ? `Current Conditions - ${location}` : 'Current Ocean Conditions'
        };
      
      default:
        return {
          type: 'temperature',
          data: [
            { depth: 0, temperature: 25.2 },
            { depth: 50, temperature: 24.8 },
            { depth: 100, temperature: 23.5 },
            { depth: 200, temperature: 20.1 },
            { depth: 500, temperature: 15.3 }
          ],
          title: 'Ocean Temperature Profile'
        };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { response, visualizations } = await processUserMessage(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        visualizations
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderChart = (chartData: any) => {
    if (!chartData) return null;

    const { type, data, title } = chartData;

    return (
      <div className="mt-3 p-3 bg-white rounded-lg border shadow-sm">
        <OceanChart
          type={type}
          data={data}
          title={title}
        />
      </div>
    );
  };

  return (
    <div className={`flex flex-col border-r bg-white ${className}`}>
      {/* Messages Container - Fixed height with scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-md flex space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`rounded-lg px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 border'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {message.visualizations?.chart && renderChart(message.visualizations.chart)}
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-md flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-gray-100 border rounded-lg px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  <span className="text-sm text-gray-600">Analyzing your query...</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Processing with Gemini AI and generating ocean data
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t bg-white p-4 flex-shrink-0">
        <div className="flex space-x-3 mb-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about ocean data, ARGO floats, temperature, salinity, wind speed..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {/* Sample Prompts */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Examples</p>
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline"
              onClick={() => setShowExamples((v) => !v)}
            >
              {showExamples ? 'Hide' : 'Show'}
            </button>
          </div>
          {showExamples && (
            <div className="mt-2 space-y-2">
              <div 
                className="text-xs p-2 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => setInputValue('Show me salinity profiles near the equator in March 2023')}
              >
                <span className="font-medium text-blue-700">🌊</span> 
                <span className="ml-1 text-blue-600">"Show me salinity profiles near the equator in March 2023"</span>
              </div>
              <div 
                className="text-xs p-2 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                onClick={() => setInputValue('Compare BGC parameters in the Arabian Sea for the last 6 months')}
              >
                <span className="font-medium text-green-700">📊</span> 
                <span className="ml-1 text-green-600">"Compare BGC parameters in the Arabian Sea for the last 6 months"</span>
              </div>
              <div 
                className="text-xs p-2 bg-purple-50 border border-purple-200 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                onClick={() => setInputValue('What are the nearest ARGO floats to this location?')}
              >
                <span className="font-medium text-purple-700">🎯</span> 
                <span className="ml-1 text-purple-600">"What are the nearest ARGO floats to this location?"</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-blue-50 px-3 py-1" onClick={() => setInputValue('Show me temperature data for Miami')}>
            <Thermometer className="mr-1 h-3 w-3" />
            Temperature
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-blue-50 px-3 py-1" onClick={() => setInputValue('What is the salinity profile near Tokyo?')}>
            <Droplets className="mr-1 h-3 w-3" />
            Salinity
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-blue-50 px-3 py-1" onClick={() => setInputValue('Show wind speed trends for London')}>
            <Wind className="mr-1 h-3 w-3" />
            Wind Speed
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-blue-50 px-3 py-1" onClick={() => setInputValue('Show pressure data for Sydney')}>
            <BarChart3 className="mr-1 h-3 w-3" />
            Pressure
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
