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

const densitiesFormSchema = z.object({
  activeMaterial: z.number().min(0).max(100000),
  carbonAdditive: z.number().min(0).max(100000),
  binder: z.number().min(0).max(100000),
});

export const DensityCard: React.FC = () => {
  const { electrodeData, setElectrodeData } = useElectrodeStore();

  const form = useForm<z.infer<typeof densitiesFormSchema>>({
    resolver: zodResolver(densitiesFormSchema),
    defaultValues: {
      activeMaterial: electrodeData.materialFractions.activeMaterial,
      carbonAdditive: electrodeData.materialFractions.carbonAdditive,
      binder: electrodeData.materialFractions.binder,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const activeMaterialParsedFloat = parseFloat(
        String(values.activeMaterial),
      );
      const carbonAdditiveParsedFloat = parseFloat(
        String(values.carbonAdditive),
      );
      const binderParsedFloat = parseFloat(String(values.binder));

      // Validate inputs using Zod schema
      const parsedData = {
        activeMaterial: activeMaterialParsedFloat,
        carbonAdditive: carbonAdditiveParsedFloat,
        binder: binderParsedFloat,
      };

      const validationResult = densitiesFormSchema.safeParse(parsedData);

      if (validationResult.success) {
        setElectrodeData({
          materialFractions: {
            activeMaterial: parsedData.activeMaterial,
            carbonAdditive: parsedData.carbonAdditive,
            binder: parsedData.binder,
          },
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
            Densities
            <span className="ml-1 font-serif text-sm italic">
              (g/
              <var>
                cm<sup>3</sup>
              </var>
              )
            </span>
          </div>
          <div className="cursor-pointer">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon
                    aria-label="Information"
                    size={15}
                    className="stroke-white-500 transition-all duration-75 ease-in-out hover:stroke-slate-100"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Please enter the material properties of the electrode.</p>
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
              name="activeMaterial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Density of Active Material
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
            <FormField
              control={form.control}
              name="carbonAdditive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Density of Carbon Additive
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Density of Carbon Additive"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="binder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Density of Binder
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Density of Binder" {...field} />
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
