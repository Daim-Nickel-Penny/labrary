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

const massFormSchema = z.object({
  electrodeWithFoil: z
    .number()
    .min(0, {
      message: "Electrode with Foil Thickness must be greater than 0",
    })
    .max(10000, {
      message: "Electrode with Foil Thickness must be lower",
    }),
  foil: z.number().min(0).max(100000),
  electrode: z.number().min(0).max(100000),
});

export const MassCard: React.FC = () => {
  const { electrodeData, setElectrodeData } = useElectrodeStore();

  const form = useForm<z.infer<typeof massFormSchema>>({
    resolver: zodResolver(massFormSchema),
    defaultValues: {
      electrodeWithFoil: electrodeData.mass.electrodeWithFoil,
      foil: electrodeData.mass.foil,
      electrode: electrodeData.mass.electrode,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const electrodeWithFoilParsedFloat = parseFloat(
        String(values.electrodeWithFoil),
      );
      const foilParsedFloat = parseFloat(String(values.foil));
      const electrodeParsedFloat = parseFloat(String(values.electrode));

      // Validate inputs using Zod schema
      const parsedData = {
        electrodeWithFoil: electrodeWithFoilParsedFloat,
        foil: foilParsedFloat,
        electrode: electrodeParsedFloat,
      };

      const validationResult = massFormSchema.safeParse(parsedData);

      if (validationResult.success) {
        setElectrodeData({
          mass: {
            electrodeWithFoil: parsedData.electrodeWithFoil,
            foil: parsedData.foil,
            electrode: parsedData.electrode,
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
            Mass Inputs
            <span className="ml-1 font-serif text-sm italic">(g)</span>
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
                  <p>Please enter the mass inputs of the electrode.</p>
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
              name="electrodeWithFoil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Mass of Electrode with Foil
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Electrode with Foil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Mass of Foil
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Foil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electrode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Electrode Mass
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Electrode" {...field} />
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
