"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.email(),
    passsword: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      passsword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if(type === "sign-up"){
            console.log('Sign Up',values)
            toast.success("Sign In Successful");
        } else {
            console.log('Sign In',values)
            toast.success("Sign Up Successful");
        }
    } catch (error) {
      console.log(error);
      toast.error(`There were errors with your submission : ${error}`);
    }
  }
  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-[-566px]:">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Intervu Prep</h2>
        </div>
        <h3>Practice mock interview with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 space-y-6 form"
          >
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>
            {/* <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
          <form>
            <p className="text-center">
              {isSignIn ? "No Account Yet ? " : "Have an account already"}
              <Link
                href={!isSignIn ? "/sign-in" : "/sign-up"}
                className="font-bold text-user-primary ml-1"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
