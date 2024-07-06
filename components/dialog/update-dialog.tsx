"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UpdateStatusForm } from "../forms/update-status-form";

type DialogProps = {
  title: string;
  children: React.ReactNode;
  data: any;
  index: number;
};

export function UpdateDialog({ title, children, data, index }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-100px)] md:max-h-[calc(100dvh-20px)] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UpdateStatusForm data={data} index={index} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
