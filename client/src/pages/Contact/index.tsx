// src/pages/Contact/index.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useToast } from "../../components/ui/Toast";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(4, { message: "Subject must be at least 4 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const Contact = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast("Message Sent Successfully", {
          description: `Thanks for writing to us, ${data.name}! We'll get back to you within 24 hours.`,
          type: "success",
        });
        reset();
        resolve();
      }, 1500);
    });
  };

  const contactInfo = [
    {
      title: "Email Us",
      details: "support@carboom.in",
      subText: "For general inquiries, bookings, and owner issues.",
      icon: Mail,
    },
    {
      title: "Call Us",
      details: "+91 98765 43210",
      subText: "Monday to Sunday: 9:00 AM to 9:00 PM.",
      icon: Phone,
    },
    {
      title: "Our Headquarters",
      details: "4th Floor, Startup Hub, Outer Ring Road, Bangalore - 560103",
      subText: "Visit us by appointment.",
      icon: MapPin,
    },
    {
      title: "Business Hours",
      details: "9:00 AM - 9:00 PM",
      subText: "Support center is open 24/7 for active rentals.",
      icon: Clock,
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Contact <span className="text-yellow-500">Us</span>
          </h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">
            Have questions or need assistance? Reach out and we'll reply as soon as possible.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Contact Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <Card key={idx} className="bg-white border-gray-100 p-5 rounded-[20px] text-left flex gap-4 items-start shadow-sm">
                    <div className="w-10 h-10 rounded-[14px] bg-yellow-400/10 flex items-center justify-center text-yellow-600 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{info.title}</h4>
                      <div className="font-extrabold text-gray-900 text-sm mt-1">{info.details}</div>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5">{info.subText}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Google Map */}
            <Card className="bg-white border-gray-100 p-2 rounded-[24px] shadow-sm overflow-hidden h-64">
              <iframe
                title="CarBoom Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9268393529944!2d77.6974189758784!3d12.912445816223594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!1d218!2d77.69!3d12.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full rounded-[20px] border-0"
                allowFullScreen
                loading="lazy"
              />
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <Card className="bg-white border border-gray-100 rounded-[24px] p-6 md:p-8 shadow-sm text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-xs text-gray-500 font-semibold mb-6">
                Fill out the form below and our customer success team will get back to you.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.name ? "border-red-500" : "border-gray-200"}`}
                      {...register("name")}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.subject ? "border-red-500" : "border-gray-200"}`}
                    {...register("subject")}
                    disabled={isSubmitting}
                  />
                  {errors.subject && <p className="text-xs text-red-500 font-bold">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Type your message here..."
                    className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.message ? "border-red-500" : "border-gray-200"}`}
                    {...register("message")}
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-xs text-red-500 font-bold">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs py-3 rounded-xl shadow-yellow-glow-hover cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={14} />
                </Button>
              </form>

              {/* Social Media links */}
              <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Connect on Socials</span>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                    <button
                      key={idx}
                      className="p-2 rounded-full border border-gray-100 hover:border-yellow-400 text-gray-500 hover:text-yellow-600 transition hover:scale-115 cursor-pointer"
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
