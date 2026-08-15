import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GroupIcon, InfoIcon as Info } from "@/assets/icons";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import Card from "./Card";
import CardHeader from "./CardHeader";
import Toggle from "./Toggle";
import { useUpdateAppSettings, useGetAppSettings } from "../hooks/useSettingServices";
import { referralSchema } from "../constants/settingSchemas";
import { useRoleNames } from "@/Hooks/useCommonListing";

// ── Sub-components ───────────────────────────────────────────────
const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

const InfoAlert = ({ children }) => (
  <div className="rounded-lg border border-primary/20 bg-primary/5 text-primary text-sm p-3">
    {children}
  </div>
);

// ── Main Component ───────────────────────────────────────────────
const ReferralsTab = () => {
  const { mutateAsync: saveSettings, isPending: isSaving } = useUpdateAppSettings();
  const { data: settingsData, isLoading } = useGetAppSettings("referral_settings");
  
  // Fetch role names for dropdown
  const hasSavedRoleIds = !!(settingsData?.employeeReferral?.roleIds && settingsData.employeeReferral.roleIds.length > 0);
  const { data: roleList, refetch: refetchRoles, isFetching: isLoadingRoles } = useRoleNames({
    enabled: hasSavedRoleIds,
  });
  const roleOptions = roleList?.map(r => ({ value: r._id, label: r.role || r.roleName || r.name })) || [];

  const form = useForm({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      employeeAmount: 0,
      employeeIsActive: true,
      employeeRoles: [],
      userAmount: 0,
      userIsActive: true,
    },
  });

  // Pre-fill form when API data arrives
  useEffect(() => {
    if (settingsData) {
      form.reset({
        employeeAmount: settingsData.employeeReferral?.amount ?? 0,
        employeeIsActive: settingsData.employeeReferral?.isActive ?? true,
        employeeRoles: settingsData.employeeReferral?.roleIds ?? [],
        userAmount: settingsData.userReferral?.amount ?? 0,
        userIsActive: settingsData.userReferral?.isActive ?? true,
      });
    }
  }, [settingsData, form]);

  const employeeIsActive = form.watch("employeeIsActive");
  const userIsActive = form.watch("userIsActive");

  const onSubmit = async (data) => {
    try {
      await saveSettings({
        userReferral: { amount: data.userAmount, isActive: data.userIsActive },
        employeeReferral: {
          amount: data.employeeAmount,
          isActive: data.employeeIsActive,
          roleIds: data.employeeRoles,
        },
      });
      toast.success("Referral settings saved successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to save referral settings.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Configuration Card */}
        <Card>
          <CardHeader
            iconBgClass="bg-indigo-600"
            icon={<GroupIcon />}
            title="Referral Program Settings"
            subheader="Configure default payout amounts and status for referrals"
          />
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                {/* ── Employee Referral ── */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-slate-800">
                        Employee Referral
                      </span>
                      <span className="text-xs text-slate-500">
                        Enable employees to earn referral rewards
                      </span>
                    </div>
                    <Controller
                      control={form.control}
                      name="employeeIsActive"
                      render={({ field }) => (
                        <Toggle
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className={`transition-all flex flex-col gap-3 ${!employeeIsActive ? "opacity-50 pointer-events-none" : ""}`}>
                    <FormFieldWrapper
                      name="employeeRoles"
                      label="Eligible Roles"
                      type="multi-select"
                      options={roleOptions}
                      loading={isLoadingRoles}
                      placeholder="Select roles"
                      onOpenChange={(open) => {
                        if (open) {
                          refetchRoles();
                        }
                      }}
                    />
                    <FormFieldWrapper
                      name="employeeAmount"
                      label="Employee Referral Amount"
                      type="number"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                {/* ── User Referral ── */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-slate-800">
                        User Referral
                      </span>
                      <span className="text-xs text-slate-500">
                        Enable users to earn referral rewards
                      </span>
                    </div>
                    <Controller
                      control={form.control}
                      name="userIsActive"
                      render={({ field }) => (
                        <Toggle
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className={`transition-all ${!userIsActive ? "opacity-50 pointer-events-none" : ""}`}>
                    <FormFieldWrapper
                      name="userAmount"
                      label="User Referral Amount"
                      type="number"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  className="w-full mt-2"
                  size="lg"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Referral Settings"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Information / Guidelines Card */}
        <Card>
          <CardHeader
            iconBgClass="bg-sky-600"
            icon={<Info />}
            title="Program Guidelines"
            subheader="About Udyog Vriksh Referral Rewards"
          />
          <CardContent>
            <div className="flex flex-col gap-4 text-sm text-slate-600 leading-relaxed">
              <p>
                The referral program is designed to incentivize both internal employees and external users to bring new talent and users to our platform.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-indigo-600">1</span>
                  </div>
                  <div>
                    <strong className="text-slate-800">Employee Referral Amount:</strong> This reward is paid out to employees whose candidate referrals complete registration and are successfully hired or subscribed.
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-indigo-600">2</span>
                  </div>
                  <div>
                    <strong className="text-slate-800">User Referral Amount:</strong> This reward is granted to users who refer new students, learners, or subscribers to the platform.
                  </div>
                </div>
              </div>

              <InfoAlert>
                Changing these values will update the referral amount calculations for all <strong>new</strong> invites created after this save.
              </InfoAlert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralsTab;
