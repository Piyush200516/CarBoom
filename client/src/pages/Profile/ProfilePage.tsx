// src/pages/Profile/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import { useToast } from "../../components/ui/Toast";
import { useAuth } from "../../store/AuthContext";
import profileService from "../../services/profileService";

// Define validation schema using Zod
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  dob: z.string().optional(), // ISO date string, optional client‑side validation can be added later
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  accountType: z.enum(["Renter", "Owner"]).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfilePage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState<string>(user?.avatar || "");
  const [memberSince, setMemberSince] = useState<string>("");
  const [accountStatus, setAccountStatus] = useState<string>("Verified"); // placeholder – replace with real data if available

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      gender: undefined,
      dob: undefined,
      city: undefined,
      state: undefined,
      address: undefined,
      accountType: undefined,
    },
  });

  // Fetch profile data once component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        // Populate form fields
        reset({
          fullName: data.name || "",
          email: data.email || "",
          mobile: data.phone || "",
          gender: data.gender,
          dob: data.dob?.split("T")[0] || "",
          city: data.city,
          state: data.state,
          address: data.address,
          accountType: data.role?.toUpperCase() === "OWNER" ? "Owner" : "Renter",
        });
        setProfilePic(data.avatar || "");
        setMemberSince(new Date(data.createdAt).toLocaleDateString());
        // Account status could be derived from a flag; using placeholder here
        setAccountStatus(data.isVerified ? "Verified" : "Unverified");
      } catch (err) {
        toast("Failed to load profile", { type: "error" });
      } finally {
        setLoading(false);
      }
    };
    // Avoid duplicate fetch when auth is still loading
    if (!authLoading) {
      fetchProfile();
    }
  }, [reset, toast, authLoading]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await profileService.updateProfile({
        name: values.fullName,
        email: values.email,
        phone: values.mobile,
        gender: values.gender,
        dob: values.dob,
        city: values.city,
        state: values.state,
        address: values.address,
      });
      toast("Profile updated successfully", { type: "success" });
      setEditMode(false);
    } catch (e) {
      toast("Failed to save profile", { type: "error" });
    }
  };

  const handleCancel = () => {
    // Reset to original values
    if (user) {
      reset({
        fullName: user.name,
        email: user.email,
        mobile: (user as any).phone,
        gender: (user as any).gender,
        dob: (user as any).dob?.split("T")[0] || "",
        city: (user as any).city,
        state: (user as any).state,
        address: (user as any).address,
        accountType: (user.role?.toUpperCase() === "OWNER" ? "Owner" : "Renter") as any,
      });
    }
    setEditMode(false);
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const resp = await profileService.uploadPhoto(formData);
      setProfilePic(resp.avatarUrl);
      toast("Profile picture updated", { type: "success" });
    } catch (err) {
      toast("Failed to upload picture", { type: "error" });
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <Card variant="glass" className="w-full max-w-4xl p-8 space-y-6">
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            {editMode && (
              <label className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                Change Photo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{profilePic ? "" : "Profile"}</h2>
            <p className="text-gray-400">Member since {memberSince}</p>
            <p className="text-gray-400">Status: {accountStatus}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              disabled={!editMode}
              className={`mt-1 block w-full rounded-xl bg-gray-800 border ${errors.fullName ? "border-red-500" : "border-gray-600"} text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              {...register("email")}
              disabled={!editMode}
              className={`mt-1 block w-full rounded-xl bg-gray-800 border ${errors.email ? "border-red-500" : "border-gray-600"} text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Mobile Number</label>
            <input
              type="text"
              {...register("mobile")}
              disabled={!editMode}
              className={`mt-1 block w-full rounded-xl bg-gray-800 border ${errors.mobile ? "border-red-500" : "border-gray-600"} text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
            />
            {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile.message}</p>}
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Gender</label>
            <select
              {...register("gender")}
              disabled={!editMode}
              className="mt-1 block w-full rounded-xl bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              disabled={!editMode}
              className="mt-1 block w-full rounded-xl bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-300">City</label>
            <input
              type="text"
              {...register("city")}
              disabled={!editMode}
              className="mt-1 block w-full rounded-xl bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-300">State</label>
            <input
              type="text"
              {...register("state")}
              disabled={!editMode}
              className="mt-1 block w-full rounded-xl bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">Address</label>
            <textarea
              {...register("address")}
              rows={2}
              disabled={!editMode}
              className="mt-1 block w-full rounded-xl bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Account Type</label>
            <input
              type="text"
              value={user?.role?.toUpperCase() === "OWNER" ? "Owner" : "Renter"}
              disabled
              className="mt-1 block w-full rounded-xl bg-gray-800 border border-gray-600 text-gray-400"
            />
          </div>
          {/* Member Since & Status displayed above */}
          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
            {editMode ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-xl bg-gray-600 text-white hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default ProfilePage;
