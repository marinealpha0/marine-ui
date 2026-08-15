import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, RefreshCcw, Lock } from "@/assets/icons";
import { toast } from "sonner";
import { MESSAGES } from '@/constant';
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
          login(response.jwtToken || response.accessToken, response.user || response);
          setTimeout(() => navigate("/"), 1000);
        },
        onError: (error) => {
          toast.error(error.message || MESSAGES.TOAST.AUTH.LOGIN.ERROR.LOGIN_FAILED);
          handleGenerateCaptcha();
          setIsLoggingIn(false);
        },
      }
    );
  };

  const isLoading = loginMutation.isPending || isLoggingIn;

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Use your organization credentials."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email FormFieldWrapper */}
          <FormFieldWrapper
            control={form.control}
            name="email"
            type="email"
            placeholder="Work email"
            icon={Mail}
            disabled={isLoading}
            outline={true}
          />

          {/* Password FormFieldWrapper */}
          <FormFieldWrapper
            control={form.control}
            name="password"
            type="password"
            placeholder="Password"
            icon={Lock}
            disabled={isLoading}
            outline={true}
          />

          {/* Captcha */}
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-surface-sunken p-3 rounded-lg border border-border mt-2">
            <div className="font-mono text-base font-bold tracking-widest text-navy px-3.5 py-1.5 rounded bg-surface border border-border select-none shadow-sm">
              {captcha}
            </div>
            <button
              type="button"
              onClick={handleGenerateCaptcha}
              className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
            >
              <RefreshCcw size={16} />
            </button>
            <Input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter captcha"
              disabled={isLoading}
              className="w-full sm:flex-1 px-3 py-2 border border-input rounded-md bg-surface text-sm focus:outline-none h-auto"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-[#0B1728] px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-[#0B1728]/90 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </Form>

      {/* Navigation Links */}
      <div className="flex justify-between items-center text-sm pt-2">
        <Link to="/forgot-password" className="text-ocean hover:underline font-medium">
          Forgot password?
        </Link>
        <Link to="/contact-admin" className="text-muted-foreground hover:underline">
          Contact admin
        </Link>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;
