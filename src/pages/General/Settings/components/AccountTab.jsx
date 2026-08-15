import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LockIcon as Lock } from "@/assets/icons";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import Card from "./Card";
import CardHeader from "./CardHeader";
import { useUpdatePassword } from "../hooks/useSettingServices";
import { changePasswordSchema } from "../constants/settingSchemas";
import { Regex } from "@/constant";

const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (Regex.PASSWORD_UPPERCASE_CHAR_REGEX.test(password)) strength += 25;
  if (Regex.PASSWORD_DIGIT_CHAR_REGEX.test(password)) strength += 25;
  if (Regex.PASSWORD_NON_ALPHANUMERIC_REGEX.test(password)) strength += 25;
  return strength;
};

const getStrengthLabel = (strength) => {
  if (strength < 25) return { text: "Weak", color: "bg-red-500" };
  if (strength < 50) return { text: "Fair", color: "bg-amber-500" };
  if (strength < 75) return { text: "Good", color: "bg-sky-500" };
  return { text: "Strong", color: "bg-green-600" };
};

const AccountTab = () => {
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = form.watch("newPassword");
  const strength = getPasswordStrength(newPasswordValue);
  const { text: strengthText, color: strengthColor } = getStrengthLabel(strength);

  const onSubmit = async ({ currentPassword, newPassword }) => {
    try {
      await updatePassword({ currentPassword, newPassword });
      toast.success("Password updated successfully.");
      form.reset();
    } catch (error) {
      toast.error(error?.message || "Failed to update password. Please try again.");
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader
            iconBgClass="bg-primary"
            icon={<Lock />}
            title="Change Password"
            subheader="Update your account password for better security"
          />
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <FormFieldWrapper
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />

                <FormFieldWrapper
                  name="newPassword"
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />

                {/* Password strength indicator */}
                {newPasswordValue && (
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-600 mb-2">
                      Password Strength: <strong>{strengthText}</strong>
                    </p>
                    <div className="h-2 w-full rounded bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full ${strengthColor} transition-all`}
                        style={{ width: `${strength}%` }}
                      />
                    </div>
                  </div>
                )}

                <FormFieldWrapper
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  placeholder="Re-enter new password"
                />

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full"
                    size="lg"
                    disabled={isPending}
                  >
                    {isPending ? "Updating..." : "Update Password"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={() => form.reset()}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                </div>

              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountTab;
