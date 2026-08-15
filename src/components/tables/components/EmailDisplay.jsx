import React from "react";
import { CustomTooltip } from "@/components/ui/tooltip";
import { Mail } from "@/assets/icons";

const EmailDisplay = React.memo(({ email }) => (
  <CustomTooltip content={email} position="top">
    <div className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors duration-200 cursor-pointer group">
      <div className="p-1 rounded-md bg-gray-50 group-hover:bg-primary/5 transition-colors duration-200">
        <Mail className="w-3.5 h-3.5" />
      </div>
      <p className="text-sm truncate max-w-[150px]">{email}</p>
    </div>
  </CustomTooltip>
));

export default EmailDisplay;
