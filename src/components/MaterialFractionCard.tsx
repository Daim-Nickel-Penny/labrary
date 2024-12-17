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

const materialFractionFormSchema = z.object({
  activeMaterial: z.number().min(0).max(100000),
  carbonAdditive: z.number().min(0).max(100000),
  binder: z.number().min(0).max(100000),
});

export const MaterialFractionCard: React.FC = () => {
  const { electrodeData, setElectrodeData } = useElectrodeStore();

  const form = useForm<z.infer<typeof materialFractionFormSchema>>({
    resolver: zodResolver(materialFractionFormSchema),
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

      const validationResult = materialFractionFormSchema.safeParse(parsedData);

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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="select-none text-white/60">
            Material Properites
            {/* <span className="ml-1 font-serif text-sm italic">
              (cm/
              <var>
                cm<sup>2</sup>
              </var>
              <var>
                cm<sup>3</sup>
              </var>
              )
            </span> */}
          </div>
          <div className="cursor-pointer">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon
                    size={15}
                    className="stroke-slate-500 transition-all duration-75 ease-in-out hover:stroke-slate-100"
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
                    Mass Fraction of Active Material
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Length of Electrode" {...field} />
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
                    Mass Fraction of Carbon Additive
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Breadth of Electrode" {...field} />
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
                    Mass Fraction of Binder
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Area of Electrode" {...field} />
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
