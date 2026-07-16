// src/pages/Profile/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import { useToast } from "../../components/ui/Toast";
import { useAuth } from "../../store/AuthContext";
import profileService from "../../services/profileService";
import { HeaderSection } from "../../components/profile/HeaderSection";
import { StatsCard } from "../../components/profile/StatsCard";
import { SectionCard } from "../../components/profile/SectionCard";
import { GlassInput } from "../../components/ui/GlassInput";
import { User, Mail, Phone, Calendar, MapPin, Key } from "lucide-react";

// Validation schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  dob: z.string().optional(),
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
  const [memberSince, setMemberSince] = useState<string>(""
  );
  const [accountStatus, setAccountStatus] = useState<string>("Verified");
  const [completion, setCompletion] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
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

  // Compute profile completion percentage based on filled fields
  const computeCompletion = (values: ProfileFormValues) => {
    const fields = [
      values.fullName,
      values.email,
      values.mobile,
      values.gender,
      values.dob,
      values.city,
      values.state,
      values.address,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setCompletion(computeCompletion(value as ProfileFormValues));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
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
        setAccountStatus(data.isVerified ? "Verified" : "Unverified");
        setCompletion(computeCompletion({
          fullName: data.name || "",
          email: data.email || "",
          mobile: data.phone || "",
          gender: data.gender,
          dob: data.dob?.split("T")[0] || "",
          city: data.city,
          state: data.state,
          address: data.address,
          accountType: data.role?.toUpperCase() === "OWNER" ? "Owner" : "Renter",
        }));
      } catch (err) {
        toast("Failed to load profile", { type: "error" });
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) fetchProfile();
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
        accountType: user.role?.toUpperCase() === "OWNER" ? "Owner" : "Renter",
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

  // Quick stats placeholders – replace with real API data when available
  const quickStats = [
    { label: "Total Bookings", value: 12, icon: Key },
    { label: "Wishlist", value: 5, icon: Key },
    { label: "Reward Points", value: 340, icon: Key },
    { label: "Reviews", value: 4, icon: Key },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      {/* Header */}
      <HeaderSection
        profilePic={profilePic}
        name={watch("fullName") as string}
        email={watch("email") as string}
        memberSince={memberSince}
        status={accountStatus}
        accountType={watch("accountType") as string}
        editMode={editMode}
        onAvatarChange={handlePhotoChange}
        onEditToggle={() => setEditMode(true)}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        {quickStats.map((stat) => (
          <StatsCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Profile Completion */}
      <div className="w-full max-w-4xl">
        <p className="text-gray-300 mb-2">Profile Completion: {completion}%</p>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-width duration-300"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </div>

      {/* Form Sections */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl space-y-6">
        {/* Personal Information */}
        <SectionCard title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassInput label="Full Name" type="text" icon={User} disabled={!editMode} register={register("fullName")} name="fullName" />
            <GlassInput label="Email" type="email" icon={Mail} disabled={!editMode} register={register("email")} name="email" />
            <GlassInput label="Mobile Number" type="text" icon={Phone} disabled={!editMode} register={register("mobile")} name="mobile" />
            <GlassInput label="Gender" type="text" icon={User} disabled={!editMode} register={register("gender")} name="gender" />
            <GlassInput label="Date of Birth" type="date" icon={Calendar} disabled={!editMode} register={register("dob")} name="dob" />
          </div>
        </SectionCard>

        {/* Contact Information */}
        <SectionCard title="Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassInput label="City" type="text" icon={MapPin} disabled={!editMode} register={register("city")} name="city" />
            <GlassInput label="State" type="text" icon={MapPin} disabled={!editMode} register={register("state")} name="state" />
            <GlassInput label="Address" type="text" icon={MapPin} disabled={!editMode} register={register("address")} name="address" />
          </div>
        </SectionCard>

        {/* Account Information */}
        <SectionCard title="Account Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassInput label="Account Type" type="text" icon={Key} disabled={true} register={register("accountType")} name="accountType" />
          </div>
        </SectionCard>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          {editMode ? (
            <>
              <button type="button" onClick={handleCancel} className="px-4 py-2 rounded-xl bg-gray-600 text-white hover:bg-gray-500 transition">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-primary text-black font-bold hover:bg-primary/80 transition">
                Save Changes
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setEditMode(true)} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition">
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ProfilePage;
