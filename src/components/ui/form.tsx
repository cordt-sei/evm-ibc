"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface AddressFormProps {
  // This callback receives the validated address
  onSubmit: (address: string) => void;
}

// Simple address validation schema (example uses EVM style):
const addressSchema = z.object({
  address: z
    .string()
    .nonempty("Address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address format"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export function AddressForm({ onSubmit }: AddressFormProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { address: "" },
  });

  function handleFormSubmit(values: AddressFormValues) {
    onSubmit(values.address);
  }

  // Placeholder for pulling address from Keplr/Leap/dynamic.xyz
  async function handleAutoFill() {
    try {
      // For instance, if window.keplr is present:
      // await window.keplr.enable("chain-id");
      // const offlineSigner = window.keplr.getOfflineSigner("chain-id");
      // const accounts = await offlineSigner.getAccounts();
      // const fetchedAddress = accounts[0].address;
      
      // Or if using dynamic.xyz embedded wallet, fetch the user address similarly

      const fetchedAddress = "0x1234..."; // Example dummy address
      form.setValue("address", fetchedAddress);
    } catch (error) {
      console.error("Failed to fetch wallet address:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Address</FormLabel>
              <FormControl>
                <input
                  placeholder="Enter wallet address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide the wallet address on the target chain
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit">Validate</Button>
          <Button variant="secondary" type="button" onClick={handleAutoFill}>
            Autofill from Wallet
          </Button>
        </div>
      </form>
    </Form>
  );
}
