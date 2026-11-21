"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { Typography } from "@/components/ui/typography";
import { DEMO_MANAGER, safeNext } from "../constants/access";
import { RoleProvider, useRole } from "./role-provider";

const schema = z.object({
  email: z.string().trim().min(1, "Email wajib diisi"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const { ready, isManager, login } = useRole();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<"email" | "password" | "form", string>>>({});
  const target = safeNext(next);

  // someone who is already signed in has nothing to do here
  useEffect(() => {
    if (ready && isManager) router.replace(target);
  }, [ready, isManager, router, target]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    if (!login(parsed.data.email, parsed.data.password)) {
      setErrors({ form: "Email atau kata sandi salah" });
      return;
    }
    router.replace(target);
  }

  const field = (name: "email" | "password", label: string, type: string) => (
    <div className="flex flex-col gap-1.5">
      <Typography as="label" variant="bs" weight="medium" htmlFor={`login-${name}`}>{label}</Typography>
      <Input
        id={`login-${name}`}
        type={type}
        autoComplete={name === "email" ? "username" : "current-password"}
        value={values[name]}
        aria-invalid={Boolean(errors[name])}
        onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value }))}
      />
      {errors[name] && <Typography as="p" variant="c" className="text-danger" role="alert">{errors[name]}</Typography>}
    </div>
  );

  return (
    <Card className="flex w-full max-w-sm flex-col gap-5 p-6">
      <div>
        <Typography as="h1" variant="t" weight="semibold">Masuk sebagai Manager</Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">MangroLens</Typography>
      </div>
      <Notice tone="info">
        <Typography as="p" variant="bs" weight="medium">Akun demo</Typography>
        <Typography as="p" variant="bs">Email: {DEMO_MANAGER.email}</Typography>
        <Typography as="p" variant="bs">Kata sandi: {DEMO_MANAGER.password}</Typography>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => {
            setValues({ email: DEMO_MANAGER.email, password: DEMO_MANAGER.password });
            setErrors({});
          }}
        >
          Isi otomatis
        </Button>
      </Notice>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        {field("email", "Email", "text")}
        {field("password", "Kata sandi", "password")}
        {errors.form && <Typography as="p" variant="bs" className="text-danger" role="alert">{errors.form}</Typography>}
        <Button type="submit" variant="primary" size="lg">Masuk</Button>
      </form>
      <Typography as="p" variant="bs" className="text-center text-ink-2">
        <Link href="/" className="underline underline-offset-4">Lanjut sebagai pengunjung</Link>
      </Typography>
      <Typography as="p" variant="c" className="text-center text-ink-3">
        Demo tanpa autentikasi sungguhan: sesi hanya tersimpan di browser ini.
      </Typography>
    </Card>
  );
}

export function LoginOverview({ next }: { next?: string }) {
  return (
    <RoleProvider>
      <main id="main-content" className="flex min-h-dvh items-center justify-center bg-page p-4">
        <LoginForm next={next} />
      </main>
    </RoleProvider>
  );
}
