import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { toast } from "sonner";
import { MESSAGES } from '@/constant';
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/constant/schema/auth.schema";
import { validateResetToken, resetForgottenPassword } from "@/api";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const verifyToken = async () => {
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get("request_id");
    if (!requestId) {
      toast.error(MESSAGES.TOAST.AUTH.RESET_PASSWORD.ERROR.INVALID_LINK);
      return;
    }

    setLoading(true);
    try {
      const response = await validateResetToken(requestId);
      if (response.status) {
        const data = response?.data?.data;
        setUserDetails(data);
        const emailVal = data?.staffEmail || data?.email || data?.adminEmail || "";
        form.setValue("email", emailVal);
      } else {
        toast.error(response.errorMsg || MESSAGES.TOAST.AUTH.RESET_PASSWORD.ERROR.VALIDATE_FAILED);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || MESSAGES.TOAST.AUTH.RESET_PASSWORD.ERROR.VALIDATE_FAILED);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
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
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get("request_id");

    setLoading(true);
    try {
      const response = await resetForgottenPassword(requestId, data.password);
      if (response.status) {
        toast.success(MESSAGES.TOAST.AUTH.RESET_PASSWORD.SUCCESS);
        setIsSuccess(true);
      } else {
        toast.error(response.errorMsg || MESSAGES.TOAST.AUTH.RESET_PASSWORD.ERROR.RESET_FAILED);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || MESSAGES.TOAST.AUTH.RESET_PASSWORD.ERROR.RESET_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const name = userDetails?.staffName || userDetails?.name || "";

  return (
    <AuthLayout
      title={isSuccess ? "Password updated" : "Create new password"}
      subtitle={
        isSuccess
          ? "Your credentials have been securely updated."
          : name
          ? `Welcome back ${name}, enter your new password below.`
          : "Set up a new secure password for your account."
      }
    >
      {!isSuccess ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Read-only email via FormFieldWrapper */}
            <FormFieldWrapper
              control={form.control}
              name="email"
              type="email"
              placeholder="Work email"
              icon={Mail}
              disabled={true}
              outline={true}
            />

            {/* New Password */}
            <FormFieldWrapper
              control={form.control}
              name="password"
              type="password"
              placeholder="New password"
              icon={Lock}
              disabled={loading}
              outline={true}
            />

            {/* Confirm Password */}
            <FormFieldWrapper
              control={form.control}
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              icon={Lock}
              disabled={loading}
              outline={true}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#0B1728] px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-[#0B1728]/90 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Update password"
              )}
            </button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6 text-center py-4">
          <div className="inline-flex size-14 place-items-center rounded-full bg-success-soft text-success">
            <CheckCircle2 size={32} />
          </div>
          <p className="text-sm text-muted-foreground">
            Redirecting to sign in page in a few seconds...
          </p>
          <Link
            to="/login"
            className="block w-full rounded-md bg-[#0B1728] px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-[#0B1728]/90"
          >
            Sign in now
          </Link>
        </div>
      )}

      {!isSuccess && (
        <div className="pt-2">
          <Link to="/login" className="block text-center text-sm text-ocean hover:underline font-medium">
            Back to sign in
          </Link>
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
