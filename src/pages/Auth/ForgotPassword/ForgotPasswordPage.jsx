import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-6 bg-background">
      <form className="w-full max-w-sm space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <h1 className="text-2xl font-semibold">Reset your password</h1>
          <p className="mt-1 text-sm text-muted-foreground">We will email a secure reset link to your work address.</p>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">Work email</label>
          <input id="email" type="email" placeholder="name@company.com"
            className="w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
        </div>
        <button className="w-full rounded-md bg-navy px-3 py-2.5 text-sm font-medium text-navy-foreground hover:bg-navy/90">
          Send reset link
        </button>
        <Link to="/login" className="block text-center text-sm text-ocean hover:underline">Back to sign in</Link>
      </form>
    </main>
  );
}
