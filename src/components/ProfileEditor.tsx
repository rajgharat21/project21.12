import React, { useState } from 'react';
import { User, Phone, MapPin, Users, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { FamilyMember } from '../types';

interface ProfileEditorProps {
  familyMembers: FamilyMember[];
  onUpdateProfile: (data: any) => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ familyMembers, onUpdateProfile }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    email: ''
  });

  // Family members state
  const [members, setMembers] = useState<FamilyMember[]>(familyMembers);
  const [newMember, setNewMember] = useState({
    name: '',
    age: '',
    relation: '',
    aadhaarNumber: ''
  });

  const handlePersonalInfoSave = () => {
    onUpdateProfile({ type: 'personal', data: personalInfo });
    setIsEditing(false);
    
    // Show success notification
    alert('Personal information updated successfully!');
  };

  const handleMemberSave = (memberId: string, memberData: Partial<FamilyMember>) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, ...memberData } : member
      )
    );
    setEditingMember(null);
    onUpdateProfile({ type: 'family', data: members });
    
    // Show success notification
    alert('Family member updated successfully!');
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.age && newMember.relation && newMember.aadhaarNumber) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        name: newMember.name,
        age: parseInt(newMember.age),
        relation: newMember.relation,
        aadhaarNumber: newMember.aadhaarNumber
      };
      setMembers(prev => [...prev, member]);
      setNewMember({ name: '', age: '', relation: '', aadhaarNumber: '' });
      setShowAddMember(false);
      onUpdateProfile({ type: 'family', data: [...members, member] });
      
      // Show success notification
      alert('Family member added successfully!');
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this family member?')) {
      setMembers(prev => prev.filter(member => member.id !== memberId));
      onUpdateProfile({ type: 'family', data: members.filter(member => member.id !== memberId) });
      
      // Show success notification
      alert('Family member removed successfully!');
    }
  };

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 14);
  };

  const relations = ['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister', 'Other'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile Management</h2>
        <p className="text-gray-600">Update your personal information and family member details</p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handlePersonalInfoSave}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2">{personalInfo.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {personalInfo.phone}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <textarea
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2 flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                {personalInfo.address}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
            {isEditing ? (
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            ) : (
              <p className="text-gray-900 py-2">{personalInfo.email || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
            <p className="text-gray-900 py-2 font-mono">****-****-{user?.aadhaarNumber?.slice(-4)}</p>
            <p className="text-xs text-gray-500">Aadhaar number cannot be changed</p>
          </div>
        </div>
      </div>

      {/* Family Members */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Family Members ({members.length})
          </h3>
          <button
            onClick={() => setShowAddMember(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>

        {/* Add New Member Form */}
        {showAddMember && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-4">Add New Family Member</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={newMember.age}
                  onChange={(e) => setNewMember(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Age"
                  min="0"
                  max="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                <select
                  value={newMember.relation}
                  onChange={(e) => setNewMember(prev => ({ ...prev, relation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select relation</option>
                  {relations.map(relation => (
                    <option key={relation} value={relation}>{relation}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                <input
                  type="text"
                  value={formatAadhaar(newMember.aadhaarNumber)}
                  onChange={(e) => setNewMember(prev => ({ ...prev, aadhaarNumber: e.target.value.replace(/\s/g, '') }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 5678 9012"
                  maxLength={14}
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Member
              </button>
              <button
                onClick={() => {
                  setShowAddMember(false);
                  setNewMember({ name: '', age: '', relation: '', aadhaarNumber: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Family Members List */}
        <div className="space-y-4">
          {members.map((member) => (
            <FamilyMemberCard
              key={member.id}
              member={member}
              isEditing={editingMember === member.id}
              onEdit={() => setEditingMember(member.id)}
              onSave={(data) => handleMemberSave(member.id, data)}
              onCancel={() => setEditingMember(null)}
              onRemove={() => handleRemoveMember(member.id)}
              relations={relations}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface FamilyMemberCardProps {
  member: FamilyMember;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Partial<FamilyMember>) => void;
  onCancel: () => void;
  onRemove: () => void;
  relations: string[];
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({
  member,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  relations
}) => {
  const [editData, setEditData] = useState({
    name: member.name,
    age: member.age.toString(),
    relation: member.relation,
    aadhaarNumber: member.aadhaarNumber
  });

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 14);
  };

  const handleSave = () => {
    onSave({
      name: editData.name,
      age: parseInt(editData.age),
      relation: editData.relation,
      aadhaarNumber: editData.aadhaarNumber
    });
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={editData.age}
                onChange={(e) => setEditData(prev => ({ ...prev, age: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
              <select
                value={editData.relation}
                onChange={(e) => setEditData(prev => ({ ...prev, relation: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {relations.map(relation => (
                  <option key={relation} value={relation}>{relation}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
              <input
                type="text"
                value={formatAadhaar(editData.aadhaarNumber)}
                onChange={(e) => setEditData(prev => ({ ...prev, aadhaarNumber: e.target.value.replace(/\s/g, '') }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={14}
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{member.name}</h4>
            <div className="mt-1 text-sm text-gray-600 space-y-1">
              <p>{member.relation}, Age {member.age}</p>
              <p className="font-mono">Aadhaar: ****-****-{member.aadhaarNumber.slice(-4)}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit member"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            {member.relation !== 'Head of Family' && (
              <button
                onClick={onRemove}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove member"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditor;