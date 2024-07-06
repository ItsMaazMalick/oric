import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type DialogProps = {
  title: string;
  children: React.ReactNode;
  headers: { title: string; key: string }[];
  data: { [key: string]: any }; // Define the type for data as an object with string keys and any values
};

export function ViewDialog({ title, children, headers, data }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-100px)] md:max-h-[calc(100dvh-20px)] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {headers.map((head, index) => {
          const keysToCheck = [
            "link",
            "evidence",
            "file",
            "policyCaseStudyCopy",
            "mouCopy",
            "contractResearchCopy",
            "briefReport",
            "copyOfContract",
          ];

          const linkText =
            keysToCheck.includes(head.key) && data[head.key] !== "NILL";

          return (
            <div key={index} className="mb-2">
              <Label>{head.title}</Label>
              {linkText ? (
                <Link
                  className="block bg-gradient-to-r from-primary/90 to-secondary/90 p-1 rounded-md text-white"
                  href={data[head.key]}
                  target="_blank"
                >
                  View In New Tab
                </Link>
              ) : (
                <p className="bg-gradient-to-r from-primary/90 to-secondary/90 p-1 rounded-md text-white">
                  {data[head.key]}
                </p>
              )}
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
