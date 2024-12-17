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

const dimensionsFormSchema = z.object({
  length: z.number().min(0).max(100000),
  breadth: z.number().min(0).max(100000),
  area: z.number().min(0).max(100000),
  volume: z.number().min(0).max(100000),
});

export const DimensionCard: React.FC = () => {
  const { electrodeData, setElectrodeData } = useElectrodeStore();

  const form = useForm<z.infer<typeof dimensionsFormSchema>>({
    resolver: zodResolver(dimensionsFormSchema),
    defaultValues: {
      length: electrodeData.dimensions.length,
      breadth: electrodeData.dimensions.breadth,
      area: electrodeData.dimensions.area,
      volume: electrodeData.dimensions.volume,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const lengthParsedFloat = parseFloat(String(values.length));
      const breadthParsedFloat = parseFloat(String(values.breadth));
      const areaParsedFloat = parseFloat(String(values.area));
      const volumeParsedFloat = parseFloat(String(values.volume));

      // Validate inputs using Zod schema
      const parsedData = {
        length: lengthParsedFloat,
        breadth: breadthParsedFloat,
        area: areaParsedFloat,
        volume: volumeParsedFloat,
      };

      const validationResult = dimensionsFormSchema.safeParse(parsedData);

      if (validationResult.success) {
        setElectrodeData({
          dimensions: {
            length: parsedData.length,
            breadth: parsedData.breadth,
            area: parsedData.area,
            volume: parsedData.volume,
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
            Dimensions
            <span className="ml-1 font-serif text-sm italic">
              (cm/
              <var>
                cm<sup>2</sup>
              </var>
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
                    size={15}
                    className="stroke-white-500 transition-all duration-75 ease-in-out hover:stroke-slate-100"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Please enter the dimensions of the electrode.</p>
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
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Length of Electrode
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
              name="breadth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Breadth of Electrode
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
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Area of Electrode
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Area of Electrode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Volume of Electrode
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Volume of Electrode" {...field} />
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
