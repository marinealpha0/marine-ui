import React from "react";
import { DataTable, PageHeader, Panel, Section } from "@/components/app/kit";
import { organizations, roles } from "@/data/marine";

export default function Settings() {
  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Organization, roles, permissions and vessel configuration" />
      <Section title="Organizations">
        <div className="grid gap-4 md:grid-cols-3">
          {organizations.map((o) => (
            <Panel key={o.id} title={o.name}>
              <p className="text-sm text-muted-foreground">{o.vessels} vessels · {o.plan} plan</p>
              <p className="mt-3 text-xs text-muted-foreground">Tenant isolation enabled · SSO via SAML · Audit retention 7 years</p>
            </Panel>
          ))}
        </div>
      </Section>
      <Section title="Roles & permissions">
        <Panel padded={false}>
          <DataTable
            columns={["Role", "Users", "Scope", "Permissions"]}
            rows={roles.map((r) => [<span key="a" className="font-medium">{r.role}</span>, <span key="b" className="tabular-nums">{r.users}</span>, r.scope, <span key="d" className="text-muted-foreground">{r.permissions}</span>])}
          />
        </Panel>
      </Section>
    </div>
  );
}
