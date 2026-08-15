const MESSAGES = {
  TOAST: {
    COMMON: {
      SUCCESS: {
        GENERIC: "Action completed successfully",
      },
      ERROR: {
        GENERIC: "An error occurred",
      },
      INFO: {
        NO_CHANGES_SAVED: "No changes to save",
        NO_CHANGES_DETECTED: "No changes detected",
      },
    },
    AUTH: {
      LOGIN: {
        ERROR: {
          INVALID_CAPTCHA: "Invalid captcha. Please try again.",
          LOGIN_FAILED: "Login failed. Please check your credentials.",
        },
      },
      SET_PASSWORD: {
        SUCCESS: "Password has been created successfully!",
        ERROR: {
          FETCH_DETAILS_FAILED: "Failed to fetch user details.",
          FETCH_DETAILS_ERROR: "An error occurred while fetching user details.",
          CREATE_FAILED: "Failed to create password.",
          CREATE_ERROR: "An error occurred while creating the password.",
        },
      },
      RESET_PASSWORD: {
        SUCCESS: "Password has been reset successfully!",
        ERROR: {
          INVALID_LINK: "Invalid reset link. Missing request_id.",
          VALIDATE_FAILED: "Invalid or expired password reset link.",
          VALIDATE_ERROR: "An error occurred while validating the reset link.",
          RESET_FAILED: "Failed to reset password.",
          RESET_ERROR: "An error occurred while resetting the password.",
        },
      },
      FORGOT_PASSWORD: {
        SUCCESS: "Password reset request sent successfully. Please check your email inbox.",
        ERROR: {
          SEND_FAILED: "Failed to send reset link. Please check the email and try again.",
          SEND_ERROR: "An error occurred. Please try again later.",
        },
      },
    },
    ROLES: {
      SUCCESS: {
        MODULES_CREATED: "Modules created successfully",
        ROLE_CREATED: "Role created successfully",
        ROLE_UPDATED: "Role updated successfully",
        ROLE_STATUS_UPDATED: "Role status updated successfully",
        CONFIG_SAVED: "Configuration Saved Successfully!",
        MODULE_UPDATED: "Module updated successfully",
        SUBMODULE_UPDATED: "Submodule updated successfully",
        SUBMODULE_ADDED: "Submodule added successfully",
        ACTION_UPDATED: "Action updated successfully",
        ACTION_ADDED: "Action added successfully",
        RESTORE_DELETE: (type, isRestore) =>
          `${type.charAt(0).toUpperCase() + type.slice(1)} ${
            isRestore ? "restored" : "deleted"
          } successfully`,
      },
      ERROR: {
        MODULES_CREATE_FAILED: "Failed to create modules",
        STATUS_UPDATE_FAILED: "Failed to update status",
        ROLE_CREATE_FAILED: "Failed to create role",
        ROLE_UPDATE_FAILED: "Failed to update role",
        ROLE_STATUS_UPDATE_FAILED: "Failed to update role status",
        CONFIG_SAVE_FAILED: "Failed to save configuration",
        MODULE_UPDATE_FAILED: "Failed to update module",
        SUBMODULE_UPDATE_FAILED: "Failed to update submodule",
        SUBMODULE_ADD_FAILED: "Failed to add submodule",
        ACTION_UPDATE_FAILED: "Failed to update action",
        ACTION_ADD_FAILED: "Failed to add action",
      },
      INFO: {
        CHANGES_DISCARDED: "Changes discarded.",
      },
    },
    EMPLOYEES: {
      SUCCESS: {
        STATUS_UPDATED: (newStatus) =>
          `Status updated to ${
            newStatus === "active" ? "Active" : "Inactive"
          } successfully`,
      },
      ERROR: {
        STATUS_UPDATE_FAILED: "Failed to update status",
      },
    },
    REFERRALS: {
      SUCCESS: {
        INVITE: "Student invited successfully!",
      },
      ERROR: {
        INVITE_FAILED: "Failed to invite student.",
      },
    },
    SUBSCRIPTIONS: {
      SUCCESS: {
        UPDATED: "Plan updated successfully",
        ADDED: "Plan added successfully",
      },
    },
    MCQS: {
      SUCCESS: {
        UPLOADED: "MCQs uploaded successfully!",
      },
      ERROR: {
        FILE_REQUIRED: "Please upload a file",
        COURSE_REQUIRED: "Please select a course",
        MIN_OPTIONS: "Please add at least two options",
        CORRECT_OPTION: "Please select at least one correct option",
      },
    },
    LEGAL_PAGES: {
      SUCCESS: {
        CREATED: "Legal page created successfully",
        UPDATED: "Legal page updated successfully",
      },
      ERROR: {
        CREATE_FAILED: "Failed to create legal page",
        UPDATE_FAILED: "Failed to update legal page",
      },
    },
    COUPONS: {
      SUCCESS: {
        UPDATED: "Coupon updated successfully!",
        ADDED: "Coupon added successfully!",
      },
    },
    DISCUSSIONS: {
      ERROR: {
        ATTACHMENT_FAILED: "Message sent but failed to upload attachment.",
        SEND_FAILED: "Failed to send message",
      },
    },
    OUTREACH: {
      SUCCESS: {
        NOTIFICATION_SENT: "Notification Sent!",
        EMAIL_QUEUED: "Email Queued!",
        WHATSAPP_SENT: "WhatsApp Broadcast Sent!",
        POSTED: (platform) => `Posted to ${platform}!`,
      },
    },
    ADMINS: {
      SUCCESS: {
        UPDATED: "Admin updated successfully",
        INVITED: "Admin invited successfully",
        INVITE_RESENT: "Invitation resent successfully",
        SESSIONS_CLEARED: "Session cleared successfully",
      },
    },
    LEADS: {
      SUCCESS: {
        ADDED: "Lead added successfully!",
        UPDATED: "Lead updated successfully!",
        STATUS_UPDATED: "Lead status updated successfully!",
        DELETED: "Lead deleted successfully!",
      },
      ERROR: {
        ADD_FAILED: "Failed to add lead",
        UPDATE_FAILED: "Failed to update lead",
        DELETE_FAILED: "Failed to delete lead",
        STATUS_UPDATE_FAILED: "Failed to update lead status",
      },
    },
  },
};

export default MESSAGES;
