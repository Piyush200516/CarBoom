// src/components/privacy/PrivacyContact.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Landmark, MessageSquare, Send, CheckCircle2, RefreshCw } from "lucide-react";

export const PrivacyContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "access",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(`CB-PRV-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", requestType: "access", message: "" });
    setIsSubmitted(false);
    setTicketId("");
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20 text-xs font-black uppercase tracking-wider">
            Resolution Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Contact Us & Data Requests
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Need to request file extraction, account termination, or have compliance questions? Submit a request straight to our Data Protection Desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Cards - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            {/* Card 1: DPO Email */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm flex items-start gap-4"
            >
              <div className="p-3 bg-yellow-400/10 text-[#FACC15] rounded-xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Direct Inquiries
                </span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Data Protection Officer</h4>
                <a
                  href="mailto:privacy@carboom.com"
                  className="text-xs font-bold text-[#FACC15] hover:underline block"
                >
                  privacy@carboom.com
                </a>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-normal">
                  Response within 2 business days. Direct regulatory escalation channel.
                </p>
              </div>
            </motion.div>

            {/* Card 2: HQ Office Address */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm flex items-start gap-4"
            >
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl shrink-0">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Physical Correspondence
                </span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">CarBoom HQ Operations</h4>
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  100 Innovation Way, Suite 400<br />
                  San Francisco, CA 94107
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-normal">
                  Attn: Legal & Data Privacy Compliance Desk
                </p>
              </div>
            </motion.div>

            {/* Card 3: Support Desk */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm flex items-start gap-4"
            >
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Customer Assistance
                </span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">24/7 Live Chat Center</h4>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  For immediate rental issues or booking updates.
                </p>
                <a
                  href="/help"
                  className="text-xs font-bold text-emerald-500 hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>Open Help Center</span>
                  <Landmark className="w-3.5 h-3.5 hidden" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Interactive Form - 7 Cols */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[450px]">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="privacy-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Privacy Request Form</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Submit verified identity actions</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Your Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#FACC15] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Registered Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#FACC15] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Request Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Type of Action Requested</label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-800 dark:text-white focus:outline-none focus:border-[#FACC15] transition-colors cursor-pointer"
                    >
                      <option value="access">Access my personal data (Data Export)</option>
                      <option value="erasure">Erasure / Delete my account profile</option>
                      <option value="rectification">Rectify / Correct my verified information</option>
                      <option value="optout">Opt-out of marketing trackers / CCPA opt-out</option>
                      <option value="other">General inquiry / compliance question</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Request & Context details</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Please clarify details of the records you'd like to inspect or delete. For driver licenses, specify country/state."
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#FACC15] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-black dark:bg-[#FACC15] dark:text-black dark:hover:bg-yellow-300 font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-80"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying and sending request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Secure Request</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="privacy-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center space-y-6 max-w-md mx-auto"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Request Submitted</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      We have logged your privacy request. A security agent will review your registered email profile matching this submission.
                    </p>
                  </div>

                  {/* Ticket Details */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-150 dark:border-gray-700/60 font-mono text-xs">
                    <span className="text-[10px] font-black uppercase text-gray-400 block tracking-wider mb-1">
                      Tracking Reference ID
                    </span>
                    <span className="font-extrabold text-gray-900 dark:text-white text-base">{ticketId}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleReset}
                      className="w-full bg-gray-100 hover:bg-gray-250 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 rounded-xl text-xs transition"
                    >
                      Submit Another Request
                    </button>
                    <a
                      href="/help"
                      className="w-full bg-gray-900 text-white dark:bg-[#FACC15] dark:text-black hover:opacity-90 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center"
                    >
                      Visit Help Center
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyContact;
