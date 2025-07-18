import React from 'react';
import { useState } from 'react';
import { Clock, CheckCircle, XCircle, FileText, Eye } from 'lucide-react';
import { Application } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import NewApplicationForm from './NewApplicationForm';

interface ApplicationStatusProps {
  applications: Application[];
  onUpdateApplication: (id: string, updates: Partial<Application>) => void;
  onAddApplication: (application: Application) => void;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ 
  applications, 
  onUpdateApplication, 
  onAddApplication 
}) => {
  const { t } = useLanguage();
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  
  const handleNewApplication = () => {
    setShowNewApplicationForm(true);
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'in-review':
        return <Eye className="w-5 h-5 text-yellow-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatStatus = (status: Application['status']) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('applications.title')}</h2>
          <p className="text-gray-600">{t('applications.description')}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <span onClick={handleNewApplication}>{t('applications.newApplication')}</span>
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  {getStatusIcon(application.status)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{application.type}</h3>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">{t('applications.submitted')}:</span> {new Date(application.submittedDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">{t('applications.lastUpdated')}:</span> {new Date(application.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                  {application.comments && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{t('applications.comments')}:</span> {application.comments}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                  {formatStatus(application.status)}
                </span>
                <button className="text-blue-600 hover:text-blue-700">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  ['pending', 'in-review', 'approved', 'rejected'].includes(application.status) 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300'
                }`}></div>
                <div className={`h-0.5 flex-1 ${
                  ['in-review', 'approved', 'rejected'].includes(application.status)
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}></div>
                <div className={`w-3 h-3 rounded-full ${
                  ['in-review', 'approved', 'rejected'].includes(application.status)
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}></div>
                <div className={`h-0.5 flex-1 ${
                  ['approved', 'rejected'].includes(application.status)
                    ? application.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                    : 'bg-gray-300'
                }`}></div>
                <div className={`w-3 h-3 rounded-full ${
                  application.status === 'approved' 
                    ? 'bg-green-500' 
                    : application.status === 'rejected'
                    ? 'bg-red-500'
                    : 'bg-gray-300'
                }`}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{t('applications.submitted')}</span>
                <span>{t('applications.underReview')}</span>
                <span>{t('applications.completed')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <NewApplicationForm
        isOpen={showNewApplicationForm}
        onClose={() => setShowNewApplicationForm(false)}
        onSubmit={onAddApplication}
      />
    </div>
  );
};

export default ApplicationStatus;