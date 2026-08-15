import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { toast } from "sonner";
import { MESSAGES } from '@/constant';
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
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const getUserDetails = async () => {
    const queryParams = new URLSearchParams(location.search);
    try {
      const response = await setupGetUserDetails(queryParams.get("request_id"));
      if (response.status) {
        const data = response?.data?.data;
        setUserDetails(data);
        const emailVal = data?.staffEmail || data?.email || data?.adminEmail || "";
        form.setValue("email", emailVal);
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
    <AuthLayout
      title={isSuccess ? "Password created" : "Setup account password"}
      subtitle={
        isSuccess
          ? "Your account setup is complete."
          : userDetails?.staffName
          ? `Welcome ${userDetails.staffName}, set up your password to activate your access.`
          : "Create a password for your organization account."
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
                "Save & continue"
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
            Account activated! Redirecting to sign in...
          </p>
          <Link
            to="/login"
            className="block w-full rounded-md bg-[#0B1728] px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-[#0B1728]/90"
          >
            Sign in
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

export default SetPassword;
