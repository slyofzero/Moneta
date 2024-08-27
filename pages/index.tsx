import { Link, MainLayout } from "@/components";

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="flex-grow flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl lg:text-4xl font-bold capitalize text-center">
          Lorem ipsum dolor sit amet consectetur
        </h1>

        <div className="flex gap-4 font-semibold text-center">
          <Link
            href={"/profile"}
            className="bg-black text-white border-[1.5px] border-white p-2 rounded-md w-32"
          >
            Profile
          </Link>

          <Link
            href={"/form"}
            className="bg-white text-black p-2 rounded-md w-32"
          >
            Fill Form
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
