import { Building } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Departments = ({
  title,
  total,
  href,
}: {
  title: string;
  total: number;
  href: string;
}) => {
  return (
    <div className="w-full p-2 bg-primary-foreground shadow-lg">
      <div className="flex justify-center items-center gap-2 p-2">
        <div className="w-1/4">
          <div className="w-full flex justify-center items-center bg-primary opacity-80 text-secondary-foreground py-4 rounded-lg">
            <Building size={34} />
          </div>
        </div>
        <div className="w-3/4">
          <h3 className="font-medium">
            <Link href={href}>{title}</Link>
          </h3>
          <div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link className="font-bold" href={href}>
                    {/* <CornerRightUp /> */}
                    {total}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show Detail</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
    // <Card className="w-full p-2 shadow-lg">
    //   <CardHeader>
    //     <CardTitle className="text-md text-secondary">
    //       {/* {title.length > 34 ? `${title.slice(0, 34)}...` : title} */}
    //       {title}
    //     </CardTitle>
    //     <CardDescription className="flex justify-between items-center pt-4">
    //       <span className="bg-secondary text-secondary-foreground opacity-50 group-hover:opacity-100 p-2 rounded-full transition-all duration-300">
    //         ICON
    //       </span>
    //       <span className="text-xl group-hover:scale-150 font-bold text-secondary transition-all duration-300">
    //         Show Detail
    //       </span>
    //     </CardDescription>
    //   </CardHeader>
    //   {/* <CardContent>
    //   <form>
    //     <div className="grid w-full items-center gap-4">
    //       <div className="flex flex-col space-y-1.5">
    //         <Label htmlFor="name">Name</Label>
    //         <Input id="name" placeholder="Name of your project" />
    //       </div>
    //       <div className="flex flex-col space-y-1.5">
    //         <Label htmlFor="framework">Framework</Label>
    //         <Select>
    //           <SelectTrigger id="framework">
    //             <SelectValue placeholder="Select" />
    //           </SelectTrigger>
    //           <SelectContent position="popper">
    //             <SelectItem value="next">Next.js</SelectItem>
    //             <SelectItem value="sveltekit">SvelteKit</SelectItem>
    //             <SelectItem value="astro">Astro</SelectItem>
    //             <SelectItem value="nuxt">Nuxt.js</SelectItem>
    //           </SelectContent>
    //         </Select>
    //       </div>
    //     </div>
    //   </form>
    // </CardContent> */}
    //   {/* <CardFooter className="flex justify-between">
    //   <Button variant="outline">Cancel</Button>
    //   <Button>Deploy</Button>
    // </CardFooter> */}
    // </Card>
  );
};

export default Departments;
