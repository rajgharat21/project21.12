import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Globe, BarChart3, Calendar, Download, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getInternetUsage, InternetAccessManager } from '../utils/internetAccess';

interface InternetUsageStats {
  dataUsed: number;
  dataLimit: number;
  validUntil: string;
  plan: string;
}

const InternetAccessPanel: React.FC = () => {
  const { user, hasInternetAccess } = useAuth();
  const [usageStats, setUsageStats] = useState<InternetUsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && hasInternetAccess) {
      loadUsageStats();
    }
  }, [user, hasInternetAccess]);

  const loadUsageStats = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const stats = await getInternetUsage(user.aadhaarNumber);
      setUsageStats(stats);
    } catch (error) {
      console.error('Error loading usage stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUsagePercentage = () => {
    if (!usageStats) return 0;
    return (usageStats.dataUsed / usageStats.dataLimit) * 100;
  };

  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {hasInternetAccess ? (
            <Wifi className="w-6 h-6 text-green-600 mr-3" />
          ) : (
            <WifiOff className="w-6 h-6 text-gray-400 mr-3" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Internet Access</h3>
            <p className="text-sm text-gray-600">
              {hasInternetAccess ? 'Active' : 'Not Available'}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          hasInternetAccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {hasInternetAccess ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      {hasInternetAccess && usageStats && !isLoading ? (
        <div className="space-y-6">
          {/* Data Usage */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Data Usage</span>
              <span className="text-sm text-gray-600">
                {usageStats.dataUsed} GB / {usageStats.dataLimit} GB
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  getUsagePercentage() >= 90 ? 'bg-red-500' :
                  getUsagePercentage() >= 70 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(getUsagePercentage(), 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {(100 - getUsagePercentage()).toFixed(1)}% remaining
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Download className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">
                {(Math.random() * 50 + 10).toFixed(1)} Mbps
              </div>
              <div className="text-xs text-gray-600">Download Speed</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Upload className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">
                {(Math.random() * 20 + 5).toFixed(1)} Mbps
              </div>
              <div className="text-xs text-gray-600">Upload Speed</div>
            </div>
          </div>

          {/* Plan Details */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-900">Plan: {usageStats.plan}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                Valid until {new Date(usageStats.validUntil).toLocaleDateString()}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Unlimited browsing and social media</p>
              <p>• High-speed data up to {usageStats.dataLimit} GB</p>
              <p>• Free access to government websites</p>
              <p>• 24/7 customer support</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Recharge Plan
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      ) : hasInternetAccess && isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Loading usage data...</p>
        </div>
      ) : (
        <div className="text-center py-8">
          <WifiOff className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Internet Access Not Available</h4>
          <p className="text-sm text-gray-600 mb-4">
            Your current plan doesn't include internet access. Upgrade to a premium plan to get online.
          </p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Upgrade Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default InternetAccessPanel;