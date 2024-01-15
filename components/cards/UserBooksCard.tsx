import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Book, CalendarCheck } from "lucide-react";

const UserBooksCard = ({ title, total }: { title: string; total: number }) => {
  return (
    <Card className="w-full shadow-lg rounded-2xl border-t-[6px] border-t-secondary hover:scale-105 transition-all duration-300 group">
      <CardHeader>
        <CardTitle className="flex justify-between items-center ">
          <span className="text-4xl group-hover:scale-150 font-bold text-secondary transition-all duration-300">
            {total}
          </span>
          <span className="bg-secondary bg-opacity-30 group-hover:bg-opacity-100 group-hover:text-secondary-foreground text-secondary p-2 rounded-md transition-all duration-300">
            <CalendarCheck />
          </span>
        </CardTitle>
        <CardDescription className="text-secondary pt-4 text-sm text-center">
          {/* {title.length > 34 ? `${title.slice(0, 34)}...` : title} */}
          {title}
        </CardDescription>
      </CardHeader>
      {/* <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent> */}
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
};

export default UserBooksCard;
