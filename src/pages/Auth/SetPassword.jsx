import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock } from "@/assets/icons";
import AuthLayout from "@/layouts/AuthLayout";
import { toast } from "sonner";
import { MESSAGES, UI_TEXT } from '@/constant';
import { setupGetUserDetails, setupCreatePassword } from "@/api";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/constant/schema/auth.schema";

const SetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const getUserDetails = async () => {
    const queryParams = new URLSearchParams(location.search);
    try {
      const response = await setupGetUserDetails(queryParams.get("request_id"));
      if (response.status) {
        setUserDetails(response?.data?.data);
      } else {
        toast.error(response.errorMsg || MESSAGES.TOAST.AUTH.SET_PASSWORD.ERROR.FETCH_DETAILS_FAILED);
      }
    } catch (err) {
      toast.error(err?.response?.data?.errorMsg || MESSAGES.TOAST.AUTH.SET_PASSWORD.ERROR.FETCH_DETAILS_ERROR);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams(location.search);
      const response = await setupCreatePassword({
        password: data.password,
        request_id: queryParams.get("request_id"),
      });
      if (response.status) {
        toast.success(MESSAGES.TOAST.AUTH.SET_PASSWORD.SUCCESS);
        setIsSuccess(true);
      } else {
        toast.error(response.errorMsg || MESSAGES.TOAST.AUTH.SET_PASSWORD.ERROR.CREATE_FAILED);
      }
    } catch (err) {
      toast.error(err?.response?.data?.errorMsg || MESSAGES.TOAST.AUTH.SET_PASSWORD.ERROR.CREATE_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={UI_TEXT.AUTH.SET_PASSWORD.TITLE}>
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-xl">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {!isSuccess && (
        <>
          <span className="text-sm text-gray-600 mb-4 block text-center mx-auto">
            {UI_TEXT.AUTH.SET_PASSWORD.INSTRUCTION(userDetails?.staffName)}
          </span>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4 sm:gap-5 min-h-[330px]"
            >
              {/* Email - Read Only, not part of form submission directly but displayed */}
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  disabled
                  value={userDetails?.staffEmail || ""}
                  readOnly
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 disabled:bg-gray-50 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* New Password */}
              <FormFieldWrapper
                control={form.control}
                name="password"
                type="password"
                placeholder="New Password"
                icon={Lock}
                disabled={loading}
              />

              {/* Confirm New Password */}
              <FormFieldWrapper
                control={form.control}
                name="confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                icon={Lock}
                disabled={loading}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  UI_TEXT.AUTH.SET_PASSWORD.BTN_SUBMIT
                )}
              </button>
            </form>
          </Form>
        </>
      )}
      {isSuccess && (
        <div className="flex flex-col items-center justify-center min-h-[330px] text-center">
          <div className="text-green-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {UI_TEXT.AUTH.SET_PASSWORD.SUCCESS_TITLE}
          </h2>
          <p className="text-gray-600 mb-6">
            {UI_TEXT.AUTH.SET_PASSWORD.SUCCESS_CONTENT}
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
          >
            {UI_TEXT.AUTH.RESET_PASSWORD.BTN_GO_TO_LOGIN}
          </button>
        </div>
      )}
    </AuthLayout>
  );
};

export default SetPassword;
