import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export function AlertWithDelete({
  children,
  handleDelete,
  id,
  category,
  userCookie,
}: {
  children: React.ReactNode;
  handleDelete: any;
  id: string;
  category: string;
  userCookie: string;
}) {
  const router = useRouter();
  // const handleDelete = async () => {
  //   toast({ variant: "default", title: "Please wait..." });
  //   const res = await fetch(`/api/user/records/${category}/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userCookie}`,
  //     },
  //   });
  //   const data = await res.json();
  //   if (!data.success) {
  //     toast({ variant: "destructive", title: data.message });
  //   } else {
  //     router.refresh();
  //     toast({ variant: "default", title: data.message });
  //   }
  //   console.log(data);
  // };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
        {/* <Button variant="outline">Show Dialog</Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
