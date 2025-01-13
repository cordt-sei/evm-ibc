"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Import our shadcn form components from form.tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface AddressFormProps {
  onSubmit: (address: string) => void;
}

// Example: EVM style address
const addressSchema = z.object({
  address: z
    .string()
    .nonempty("Address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid address format"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export function AddressForm({ onSubmit }: AddressFormProps) {
  const formMethods = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { address: "" },
  });

  async function handleAutoFill() {
    try {
      // For example, if using Keplr/Leap/dynamic:
      // await window.keplr.enable("chain-id");
      // const offlineSigner = window.keplr.getOfflineSigner("chain-id");
      // const accounts = await offlineSigner.getAccounts();
      // const fetchedAddress = accounts[0].address;
      // formMethods.setValue("address", fetchedAddress);

      const dummyAddress = "0x1234567890abcdef1234567890abcdef12345678";
      formMethods.setValue("address", dummyAddress);
    } catch (err) {
      console.error("Failed to auto-fill from wallet:", err);
    }
  }

  const submitHandler = (values: AddressFormValues) => {
    onSubmit(values.address);
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(submitHandler)}
        className="space-y-4"
      >
        <FormField
          control={formMethods.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Address</FormLabel>
              <FormControl>
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring"
                  placeholder="Enter wallet address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button type="submit">Validate</Button>
          <Button variant="secondary" type="button" onClick={handleAutoFill}>
            Autofill from Wallet
          </Button>
        </div>
      </form>
    </Form>
  );
}
