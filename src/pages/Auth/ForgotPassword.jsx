import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "@/assets/icons";
import AuthLayout from "@/layouts/AuthLayout";
import { toast } from "sonner";
import { MESSAGES, UI_TEXT, VALIDATION_MESSAGES } from '@/constant';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { Form } from "@/components/ui/form";
import { requestPasswordReset } from "@/api";
import { forgotPasswordSchema } from "@/constant/schema/auth.schema";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await requestPasswordReset(data.email);
      if (response.status) {
        toast.success(MESSAGES.TOAST.AUTH.FORGOT_PASSWORD.SUCCESS);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error(response.errorMsg || MESSAGES.TOAST.AUTH.FORGOT_PASSWORD.ERROR.SEND_FAILED);
      }
    } catch (error) {
      toast.error(error.message || MESSAGES.TOAST.AUTH.FORGOT_PASSWORD.ERROR.SEND_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={UI_TEXT.AUTH.FORGOT_PASSWORD.TITLE}>
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-xl">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <span className="text-sm text-gray-600 mb-6 block text-center mx-auto">
        {UI_TEXT.AUTH.FORGOT_PASSWORD.INSTRUCTION}
      </span>

      <div className="flex justify-center items-center my-4">
        <div className="relative flex items-center justify-center">
          {/* Pulsing radar glow ring */}
          <div className="absolute h-20 w-20 rounded-full bg-primary/10 animate-ping opacity-60" />
          <div className="absolute h-24 w-24 rounded-full bg-secondary/5 animate-pulse" />

          {/* Main outer circle */}
          <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/20 border border-primary/20 shadow-md shadow-primary/5">
            {/* Inner white circle */}
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-inner border border-gray-100">
              <Lock
                className="h-6 w-6 text-primary animate-bounce"
                style={{ animationDuration: '2.5s' }}
              />
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {/* Email input field */}
          <FormFieldWrapper
            control={form.control}
            name="email"
            type="email"
            placeholder="Email Address"
            icon={Mail}
            disabled={loading}
            className="h-[60px]"
          />

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md flex items-center justify-center disabled:opacity-50 mt-auto"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              UI_TEXT.AUTH.FORGOT_PASSWORD.BTN_SUBMIT
            )}
          </button>
        </form>
      </Form>

      {/* Security Info Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-3 text-gray-500 text-sm">{UI_TEXT.AUTH.LOGIN.SECURITY_FEATURES}</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      {/* Back to Sign In footer */}
      <div className="flex justify-end items-center flex-wrap gap-2 mt-2">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer hover:underline"
        >
          {UI_TEXT.AUTH.FORGOT_PASSWORD.LINK_BACK_TO_SIGN_IN}
        </button>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
