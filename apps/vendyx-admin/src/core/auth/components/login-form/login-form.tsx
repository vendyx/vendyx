'use client';

import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { Form } from '@/shared/form/form';
import { FormInput } from '@/shared/form/form-input';

import { useLoginForm } from './use-login-form';

export const LoginForm = () => {
  const form = useLoginForm();
  const { isLoading } = form;

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.onSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <FormInput
                control={form.control}
                name="email"
                placeholder="m@example.com"
                label="Email"
                type="email"
              />
              <FormInput
                control={form.control}
                name="password"
                placeholder="********"
                label="Password"
                type="password"
                isPassword
              />
              <Button disabled={isLoading} isLoading={isLoading} type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};
