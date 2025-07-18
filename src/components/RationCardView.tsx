import React from 'react';
import { QrCode, Download, Edit, Calendar, MapPin, Phone } from 'lucide-react';
import { RationCard } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface RationCardViewProps {
  rationCard: RationCard;
}

const RationCardView: React.FC<RationCardViewProps> = ({ rationCard }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const getCardTypeColor = (type: string) => {
    switch (type) {
      case 'APL':
        return 'bg-green-100 text-green-800';
      case 'BPL':
        return 'bg-blue-100 text-blue-800';
      case 'AAY':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardTypeName = (type: string) => {
    switch (type) {
      case 'APL':
        return t('rationCard.apl');
      case 'BPL':
        return t('rationCard.bpl');
      case 'AAY':
        return t('rationCard.aay');
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Digital Ration Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">{t('rationCard.title')}</h2>
              <p className="text-blue-100">{t('rationCard.government')}</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCardTypeColor(rationCard.cardType)}`}>
                {rationCard.cardType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <p className="text-blue-200 text-sm">{t('rationCard.cardNumber')}</p>
                <p className="text-xl font-mono font-bold">{rationCard.cardNumber}</p>
              </div>
              <div className="mb-4">
                <p className="text-blue-200 text-sm">{t('rationCard.headOfFamily')}</p>
                <p className="text-lg font-semibold">{user?.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-200 text-sm">{t('rationCard.issued')}</p>
                  <p className="font-medium">{new Date(rationCard.issuedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm">{t('rationCard.validUntil')}</p>
                  <p className="font-medium">{new Date(rationCard.validUntil).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <QrCode className="w-24 h-24 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          {t('rationCard.downloadCard')}
        </button>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <Edit className="w-4 h-4 mr-2" />
          {t('rationCard.updateDetails')}
        </button>
      </div>

      {/* Card Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('rationCard.personalInfo')}</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">{t('rationCard.address')}</p>
                <p className="font-medium">{user?.address}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">{t('rationCard.phone')}</p>
                <p className="font-medium">{user?.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">{t('rationCard.cardType')}</p>
                <p className="font-medium">{getCardTypeName(rationCard.cardType)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Family Members */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('rationCard.familyMembers')} ({rationCard.familyMembers.length})
          </h3>
          <div className="space-y-3">
            {rationCard.familyMembers.map((member) => (
              <div key={member.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.relation}, Age {member.age}</p>
                </div>
                <span className="text-sm text-gray-500">****{member.aadhaarNumber.slice(-4)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RationCardView;