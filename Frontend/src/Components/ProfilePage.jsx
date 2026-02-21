import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, MapPin, Save } from "lucide-react";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    address: user?.address || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
    // Add API call to update profile here
  };

  const profileFields = [
    { label: "Full Name", icon: User, key: "name", type: "text" },
    { label: "Email", icon: Mail, key: "email", type: "email" },
    { label: "Phone", icon: Phone, key: "phone", type: "tel" },
    { label: "Date of Birth", icon: Calendar, key: "dateOfBirth", type: "date" },
    { label: "Address", icon: MapPin, key: "address", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-600 mt-2">View and manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100/60 p-8">
          {/* Profile Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg mb-4">
              <User size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{formData.name}</h2>
            <p className="text-slate-600 text-sm mt-1">{formData.email}</p>
          </div>

          {/* Profile Fields */}
          <div className="space-y-6">
            {profileFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon size={18} className="text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {field.label}
                    </label>
                    {isEditing ? (
                      <input
                        type={field.type}
                        name={field.key}
                        value={formData[field.key]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <p className="text-slate-600">
                        {formData[field.key] || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-blue-100/60">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Save size={18} />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-blue-100/60 p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Account Settings</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-slate-700 font-medium">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-slate-700 font-medium">
              Privacy Settings
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
