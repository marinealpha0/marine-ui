import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, ArrowLeft, Home, Search, Ship, Wrench, ShieldCheck, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-6">
      <div className="relative w-full max-w-xl text-center space-y-8">

        {/* Large subtle background 404 watermark */}
        <div className="relative flex justify-center">
          <span className="text-[120px] sm:text-[180px] font-extrabold leading-none tracking-tight text-secondary/70 select-none font-display">
            404
          </span>
        </div>

        {/* Messaging */}
        <div className="space-y-3 max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sorry, we couldn’t find the page you’re looking for. The link might be broken or the page may have been moved.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="h-10 px-5 text-sm font-medium border-border hover:bg-secondary"
          >
            <ArrowLeft className="mr-2 size-4" /> Go back
          </Button>

          <Button
            asChild
            className="h-10 px-5 text-sm font-semibold bg-navy text-navy-foreground hover:bg-navy/90 shadow-sm"
          >
            <Link to="/">
              <Home className="mr-2 size-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
