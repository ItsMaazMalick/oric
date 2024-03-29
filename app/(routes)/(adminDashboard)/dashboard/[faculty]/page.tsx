import Departments from "@/components/cards/Departments";
import { faculties } from "@/constants/data";

const Faculties = ({ params }: { params: { faculty: string } }) => {
  const faculty = faculties.find((faculty) => faculty.href === params.faculty);
  const departments = faculty ? faculty.departments : [];
  return (
    <div className="w-full p-2">
      <div className="flex justify-center mt-8">
        <h2 className="text-3xl font-bold uppercase animate-pulse">
          {faculty?.title}
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments?.map((department) => (
          <Departments
            key={department.id}
            title={department.title}
            href={`/dashboard/${params.faculty}/${department.href}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Faculties;
