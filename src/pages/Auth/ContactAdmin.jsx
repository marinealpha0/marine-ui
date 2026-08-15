import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Clock } from "@/assets/icons";
import AuthLayout from "@/layouts/AuthLayout";
import { UI_TEXT } from "@/constant";

const ContactAdmin = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title={UI_TEXT.AUTH.CONTACT_ADMIN.TITLE}>
      <span className="text-sm text-gray-600 mb-4 block text-center mx-auto pb-9">
        {UI_TEXT.AUTH.CONTACT_ADMIN.INSTRUCTION}
      </span>

      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Support Email Field */}
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="email"
            value="admin@udyogvriksh.com"
            readOnly
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none text-gray-700 text-sm font-medium"
          />
        </div>

        {/* Support Hours Field */}
        <div className="relative">
          <Clock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value="Mon – Fri, 9:00 AM – 6:00 PM IST"
            readOnly
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none text-gray-700 text-sm"
          />
        </div>

        {/* Send Email Button */}
        <a
          href="mailto:admin@udyogvriksh.com"
          className="w-full py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md flex items-center justify-center gap-2 hover:opacity-90 active:opacity-95 transition-opacity mt-2"
        >
          <Mail size={18} />
          {UI_TEXT.AUTH.CONTACT_ADMIN.BTN_SEND_SUPPORT_EMAIL}
        </a>
      </div>

      {/* Security Info Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-3 text-gray-500 text-sm">{UI_TEXT.AUTH.LOGIN.SECURITY_FEATURES}</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      <div className="flex justify-end items-center flex-wrap gap-2 mt-2">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer hover:underline"
        >
          {UI_TEXT.AUTH.CONTACT_ADMIN.LINK_BACK_TO_SIGN_IN}
        </button>
      </div>
    </AuthLayout>
  );
};

export default ContactAdmin;
