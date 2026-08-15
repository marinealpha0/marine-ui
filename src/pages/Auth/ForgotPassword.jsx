import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail } from "@/assets/icons";
import AuthLayout from "@/layouts/AuthLayout";
import { toast } from "sonner";
import { MESSAGES } from '@/constant';
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
    <AuthLayout
      title="Reset your password"
      subtitle="We will email a secure reset link to your work address."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormFieldWrapper
            control={form.control}
            name="email"
            type="email"
            placeholder="Work email"
            icon={Mail}
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
              "Send reset link"
            )}
          </button>
        </form>
      </Form>

      <div className="pt-2">
        <Link to="/login" className="block text-center text-sm text-ocean hover:underline font-medium">
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
