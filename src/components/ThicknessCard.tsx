"use client";

import React from "react";

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
import { Button } from "./ui/button";

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
  const form = useForm<z.infer<typeof thicknessFormSchema>>({
    resolver: zodResolver(thicknessFormSchema),
    defaultValues: {
      coatedElectrode: 0,
      foil: 0,
      material: 0,
    },
  });

  function onSubmit(values: z.infer<typeof thicknessFormSchema>) {
    console.log(values);
  }

  /**Auto Submit */

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          Thickness Inputs{" "}
          <span className="ml-1 font-serif text-sm italic">(cm)</span>
        </CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="coatedElectrode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans font-semibold">
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
                  <FormLabel>Thickness of Foil</FormLabel>
                  <FormControl>
                    <Input placeholder="Foil" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thickness of Material</FormLabel>
                  <FormControl>
                    <Input placeholder="Material" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
