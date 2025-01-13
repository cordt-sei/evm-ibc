"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import {
  FormProvider,
  Controller,
  useFormContext,
  FieldValues,
  ControllerProps,
  UseFormReturn,
} from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";

// -----------------------------------------------------------------------------
// 1) <Form> - Wraps react-hook-form's FormProvider
//    Accepts the form methods (UseFormReturn) + any children.
// -----------------------------------------------------------------------------
interface FormProps<TFieldValues extends FieldValues> extends UseFormReturn<TFieldValues> {
  children?: React.ReactNode;
  className?: string;
}

export function Form<TFieldValues extends FieldValues>({
  children,
  className,
  ...formMethods
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...formMethods}>
      <div className={cn(className)}>{children}</div>
    </FormProvider>
  );
}

// -----------------------------------------------------------------------------
// 2) <FormField> - Ties a field to react-hook-form's Controller
//    Optionally parametrize with TFieldValues & name type.
// -----------------------------------------------------------------------------
export function FormField<TFieldValues extends FieldValues>(
  props: ControllerProps<TFieldValues>
) {
  return <Controller {...props} />;
}

// -----------------------------------------------------------------------------
// 3) <FormItem> - Generic container for a label + control + message
// -----------------------------------------------------------------------------
export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", props.className)} {...props} />
  );
});
FormItem.displayName = "FormItem";

// -----------------------------------------------------------------------------
// 4) <FormLabel> - Ties a label to a field
// -----------------------------------------------------------------------------
export const FormLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>((props, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("font-medium", props.className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

// -----------------------------------------------------------------------------
// 5) <FormControl> - The Slot wrapping the input or select, etc.
// -----------------------------------------------------------------------------
export const FormControl = React.forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>((props, ref) => {
  return <Slot ref={ref} {...props} />;
});
FormControl.displayName = "FormControl";

// -----------------------------------------------------------------------------
// 6) <FormMessage> - Displays field errors
// -----------------------------------------------------------------------------
export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  // If you need field-specific errors, pass a field name or
  // rely on <FormField> with a render prop that shows errors.
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <p
      ref={ref}
      className={cn("text-sm text-red-500", props.className)}
      {...props}
    >
      {props.children ? props.children : null}
    </p>
  );
});
FormMessage.displayName = "FormMessage";
