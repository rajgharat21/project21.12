import React, { useState } from 'react';
import { Users, Plus, X, Trash2, CheckCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const UserSwitcher: React.FC = () => {
  const { userProfile, activeUser, switchUser, addUser, removeUser, isLoading } = useAuth();
  const { t } = useLanguage();
  const [showPanel, setShowPanel] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserData, setNewUserData] = useState({
    aadhaarNumber: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!userProfile || !activeUser) return null;

  const allUsers = [userProfile.primaryUser, ...userProfile.linkedUsers];

  const handleAddUser = async () => {
    setError('');
    setSuccess('');
    
    if (newUserData.aadhaarNumber.length !== 12 || newUserData.otp.length !== 6) {
      setError('Please enter valid Aadhaar number and OTP');
      return;
    }

    const result = await addUser(newUserData.aadhaarNumber, newUserData.otp);
    
    if (result.success) {
      setSuccess(result.message);
      setNewUserData({ aadhaarNumber: '', otp: '' });
      setShowAddUser(false);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.message);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    if (confirm('Are you sure you want to remove this user?')) {
      const result = await removeUser(userId);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message);
      }
    }
  };

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 14);
  };

  return (
    <>
      <button
        onClick={() => setShowPanel(true)}
        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Switch User"
      >
        <Users className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">{allUsers.length} Users</span>
      </button>

      {showPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPanel(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-6 h-6 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
                  </div>
                  <button
                    onClick={() => setShowPanel(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {success && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                )}
                {error && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>

              {/* Users List */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {allUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        user.id === activeUser.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-600">****-****-{user.aadhaarNumber.slice(-4)}</p>
                            {user.id === userProfile.primaryUser.id && (
                              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1">
                                Primary
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {user.id === activeUser.id ? (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          ) : (
                            <button
                              onClick={() => switchUser(user.id)}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                              Switch
                            </button>
                          )}
                          {user.id !== userProfile.primaryUser.id && (
                            <button
                              onClick={() => handleRemoveUser(user.id)}
                              className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                              title="Remove user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add User Section */}
                <div className="mt-6">
                  {!showAddUser ? (
                    <button
                      onClick={() => setShowAddUser(true)}
                      className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Another User
                    </button>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-4">Add New User</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Aadhaar Number
                          </label>
                          <input
                            type="text"
                            value={formatAadhaar(newUserData.aadhaarNumber)}
                            onChange={(e) => setNewUserData(prev => ({ 
                              ...prev, 
                              aadhaarNumber: e.target.value.replace(/\s/g, '') 
                            }))}
                            placeholder="1234 5678 9012"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            maxLength={14}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            OTP
                          </label>
                          <input
                            type="text"
                            value={newUserData.otp}
                            onChange={(e) => setNewUserData(prev => ({ 
                              ...prev, 
                              otp: e.target.value.replace(/\D/g, '').slice(0, 6) 
                            }))}
                            placeholder="123456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            maxLength={6}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Demo: Use any 6-digit number for testing
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={handleAddUser}
                            disabled={isLoading || newUserData.aadhaarNumber.length !== 12 || newUserData.otp.length !== 6}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                          >
                            {isLoading ? 'Adding...' : 'Add User'}
                          </button>
                          <button
                            onClick={() => {
                              setShowAddUser(false);
                              setNewUserData({ aadhaarNumber: '', otp: '' });
                              setError('');
                            }}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSwitcher;