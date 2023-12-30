import Footer from "@/components/footer/Footer";
import MainHeader from "@/components/header/MainHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { aboutOric } from "@/constants/basicInfo";

const AboutPage = () => {
  return (
    <div>
      <MainHeader />
      <h2 className="text-center my-10 text-3xl font-bold text-primary">
        ORIC TEAM
      </h2>
      {/* TABLE */}
      <div className="p-2 bg-primary-foreground border-2 border-primary rounded-lg m-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aboutOric?.map((about: any) => (
              <TableRow key={about.id}>
                <TableCell className="">{about.id}</TableCell>
                <TableCell className="">{about.name}</TableCell>
                <TableCell className="">{about.designation}</TableCell>
                <TableCell className="">{about.phone}</TableCell>
                <TableCell className="">{about.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
