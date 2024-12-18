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

const thicknessFormSchema = z.object({
  coatedElectrode: z
    .number()
    .min(0, {
      message: "Coated Electrode Thickness must be greater than 0",
    })
    .max(10000, {
      message: "Coated Electrode Thickness must be lower",
    }),
  foil: z.number().min(0).max(100000),
  material: z.number().min(0).max(100000),
});

export const ThicknessCard: React.FC = () => {
  const { electrodeData, setElectrodeData } = useElectrodeStore();

  const form = useForm<z.infer<typeof thicknessFormSchema>>({
    resolver: zodResolver(thicknessFormSchema),
    defaultValues: {
      coatedElectrode: electrodeData.thickness.coatedElectrode,
      foil: electrodeData.thickness.foil,
      material: electrodeData.thickness.material,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const coatedElectrodeParsedFloat = parseFloat(
        String(values.coatedElectrode),
      );
      const foilParsedFloat = parseFloat(String(values.foil));
      const materialParsedFloat = parseFloat(String(values.material));

      // Validate inputs using Zod schema
      const parsedData = {
        coatedElectrode: coatedElectrodeParsedFloat,
        foil: foilParsedFloat,
        material: materialParsedFloat,
      };

      const validationResult = thicknessFormSchema.safeParse(parsedData);

      if (validationResult.success) {
        setElectrodeData({
          thickness: {
            coatedElectrode: parsedData.coatedElectrode,
            foil: parsedData.foil,
            material: parsedData.material,
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
            Thickness Inputs
            <span className="ml-1 font-serif text-sm italic">(cm)</span>
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
                  <p>Please enter the thickness of the electrode.</p>
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
              name="coatedElectrode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Thickness of Coated Electrode
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Coated Electrode" {...field} />
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
                    Thickness of Foil
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
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="select-none font-sans text-white/80">
                    Thickness of Material
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Material"
                      {...field}
                      readOnly
                      className="bg-neutral-800"
                      value={electrodeData.thickness.material}
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
