import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "@/constant/ImageConstant";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-0">
      {/* OUTER WRAPPER */}
      <div
        className="
          flex flex-col lg:flex-row w-full max-w-5xl
          bg-transparent shadow-none rounded-none
          lg:bg-white lg:shadow-2xl lg:rounded-3xl
          overflow-hidden
        "
      >
        {/* LEFT IMAGE (desktop only) */}
        <div
          className="hidden lg:block lg:w-1/2 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${Image.auth.authLayoutImage})` }}
        >
          {/* TITLE OVER IMAGE */}
          <div className="absolute top-6 left-6">
            <div className="border-l-4 border-primary pl-4">
              <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md">
                {title}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Secure administration portal
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 relative flex justify-center bg-transparent">
          <div className="w-full max-w-md">
            {/* FORM CARD */}
            <Card
              className="
                bg-white shadow-xl border rounded-xl
                lg:bg-transparent lg:shadow-none lg:border-none lg:rounded-none
              "
            >
              <CardHeader className="text-center mb-2 mt-2">
                <img src={Image.common.logo} alt="Logo" className="w-16 mx-auto" />
              </CardHeader>

              <CardContent>{children}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
