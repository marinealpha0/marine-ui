import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, RefreshCcw, Lock } from "@/assets/icons";
import { toast } from "sonner";
import { MESSAGES, UI_TEXT, VALIDATION_MESSAGES } from '@/constant';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/layouts/AuthLayout";
import { generateCaptcha } from "@/utils/generateCaptcha";
import { useLogin } from "./hooks/useAuthServices";
import { useAuthStore } from "@/store";
import { fetchToken } from "@/Hooks/useFcmToken";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/constant/schema/auth.schema";

const AdminLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loginMutation = useLogin();

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  useEffect(() => {
    handleGenerateCaptcha();
  }, []);

  const validateCaptcha = () => {
    if (captchaInput.trim() !== captcha) {
      toast.error(MESSAGES.TOAST.AUTH.LOGIN.ERROR.INVALID_CAPTCHA);
      handleGenerateCaptcha();
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (!validateCaptcha()) return;
    setIsLoggingIn(true);

    // fetchToken might hang if service worker isn't ready. 
    // We race it against a 2-second timeout to prevent blocking login.
    let fcmToken = null;
    try {
      const tokenPromise = fetchToken();
      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 2000));
      fcmToken = await Promise.race([tokenPromise, timeoutPromise]);
    } catch (e) {
      console.error("Error fetching FCM token provided to login:", e);
    }

    loginMutation.mutate(
      {
        email: data.email,
        password: data.password,
        fcmToken,
      },
      {
        onSuccess: (response) => {
          // Store token in memory/context
          // Assumes response contains jwtToken and optionally user details
          login(response.jwtToken || response.accessToken, response.user || response);
          setTimeout(() => navigate("/"), 1000);
          // Keep loading state until navigation completes
        },
        onError: (error) => {
          toast.error(error.message || MESSAGES.TOAST.AUTH.LOGIN.ERROR.LOGIN_FAILED);
          handleGenerateCaptcha();
          setIsLoggingIn(false);
        },
      }
    );
  };

  return (
    <AuthLayout title={UI_TEXT.AUTH.LOGIN.TITLE}>
      {(loginMutation.isPending || isLoggingIn) && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-xl">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5">
          {/* Email */}
          <FormFieldWrapper
            control={form.control}
            name="email"
            type="email"
            placeholder="Email Address"
            icon={Mail}
            disabled={loginMutation.isPending || isLoggingIn}
          />

          {/* Password */}
          <FormFieldWrapper
            control={form.control}
            name="password"
            type="password"
            placeholder="Password"
            icon={Lock}
            disabled={loginMutation.isPending || isLoggingIn}
          />

          {/* Captcha */}
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2">
            <div className="font-mono text-lg font-bold tracking-widest text-gray-700 px-4 py-2 rounded-md bg-gray-100 border-2 border-gray-300 select-none">
              {captcha}
            </div>
            <button
              type="button"
              onClick={handleGenerateCaptcha}
              className="p-1 rounded hover:bg-gray-200"
            >
              <RefreshCcw size={18} />
            </button>
            <Input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter captcha"
              disabled={loginMutation.isPending || isLoggingIn}
              className="w-full sm:flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-none bg-white h-auto"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending || isLoggingIn}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md flex items-center justify-center disabled:opacity-50 mt-2"
          >
            {UI_TEXT.AUTH.LOGIN.BTN_SUBMIT}
          </button>
        </form>
      </Form>

      {/* Security Info */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-3 text-gray-500 text-sm">{UI_TEXT.AUTH.LOGIN.SECURITY_FEATURES}</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      <div className="flex justify-between items-center flex-wrap gap-2 mt-2">
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer hover:underline"
        >
          {UI_TEXT.AUTH.LOGIN.LINK_FORGOT_PASSWORD}
        </button>
        <button
          type="button"
          onClick={() => navigate("/contact-admin")}
          className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer hover:underline"
        >
          {UI_TEXT.AUTH.LOGIN.LINK_CONTACT_ADMIN}
        </button>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;
