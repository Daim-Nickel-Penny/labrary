"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { InfoIcon } from "lucide-react";
import { useElectrodeStore } from "~/store/electrodeStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const mgMassFormSchema = z.object({ mg: z.number().min(0).max(100000) });

export const MgMassCard: React.FC = () => {
  const { electrodeData, setElectrodeData } = useElectrodeStore();

  const form = useForm<z.infer<typeof mgMassFormSchema>>({
    resolver: zodResolver(mgMassFormSchema),
    defaultValues: {
      mg: electrodeData.massMg,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const mgParsedFloat = parseFloat(String(values.mg));

      // Validate inputs using Zod schema
      const parsedData = {
        mg: mgParsedFloat,
      };

      const validationResult = mgMassFormSchema.safeParse(parsedData);

      if (validationResult.success) {
        setElectrodeData({
          massMg: parsedData.mg,
        });

        //reset particular field errors
        form.clearErrors();
      } else {
        const validationErrors = validationResult.error.issues ?? [];

        if (validationErrors.length > 0) {
          console.log(validationErrors);
          validationErrors.forEach((error) => {
            const message = error.message;
            const path = error.path[0] as keyof typeof values;

            form.setError(path, {
              type: "value",
              message,
            });
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, setElectrodeData]);

  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="select-none text-xl text-white/60">
            Mass
            <span className="ml-1 font-serif text-sm italic">mg</span>
          </div>
          <div className="cursor-pointer">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon
                    size={15}
                    className="stroke-white-500 transition-all duration-75 ease-in-out hover:stroke-slate-100"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Please enter the mass in mg of the electrode.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="mg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Mass
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Density of Active Material"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
