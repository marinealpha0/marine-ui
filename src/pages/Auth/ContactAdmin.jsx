import React from "react";
import { Link } from "react-router-dom";
import { Mail, Clock } from "@/assets/icons";
import AuthLayout from "@/layouts/AuthLayout";

const ContactAdmin = () => {
  return (
    <AuthLayout
      title="Contact administrator"
      subtitle="Reach out to support or your system administrator for assistance."
    >
      <div className="space-y-4">
        {/* Support Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground block">
            Support email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4.5" />
            <input
              type="email"
              value="admin@udyogvriksh.com"
              readOnly
              className="w-full rounded-md border border-input bg-surface-sunken pl-10 pr-3 py-2 text-sm text-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* Support Hours Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground block">
            Operating hours
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4.5" />
            <input
              type="text"
              value="Mon – Fri, 9:00 AM – 6:00 PM IST"
              readOnly
              className="w-full rounded-md border border-input bg-surface-sunken pl-10 pr-3 py-2 text-sm text-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* Send Email Action Button */}
        <a
          href="mailto:support@oceanicmarine.com"
          className="w-full rounded-md bg-[#0B1728] px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-[#0B1728]/90 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
        >
          <Mail size={16} />
          Send support email
        </a>
      </div>

      <div className="pt-2">
        <Link to="/login" className="block text-center text-sm text-ocean hover:underline font-medium">
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ContactAdmin;
