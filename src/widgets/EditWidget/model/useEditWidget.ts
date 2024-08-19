import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEditWidgetMainOptions, fetchWidgetOptions } from "../api";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { EditOptionsProps } from "./types";

export const useEditWidget = (
  widgetId: string,
  widgetOptions: EditOptionsProps
) => {
  const { data: widget } = useQuery({
    queryKey: ["widget", widgetId],
    queryFn: () => fetchWidgetOptions(widgetId),
  });

  const { register, control, reset, handleSubmit } = useForm();

  const { mutate } = useMutation({
    mutationKey: ["widget", widgetId],
    mutationFn: (data) => fetchEditWidgetMainOptions(data, widgetId),
    onSuccess: (data: any) => {
      reset({ ...data.options });
    },
  });

  useEffect(() => {
    if (widget) {
      reset({
        ...widget.options,
      });
    }
  }, [widget, reset]);

  const handleUpdateMainOptions = (data: any) => {
    mutate(data);
  };

  return {
    register,
    control,
    handleSubmit: handleSubmit(handleUpdateMainOptions),
    widgetOptions,
  };
};
