import { UserService } from "@/services/user.service";

const Page = async ({ params }: { params: { verifyId: string } }) => {
  const response = await UserService.verifyAccount(params.verifyId);
  if (response.status === "Failed") {
    return (
      <div className="w-full py-[200px] text-[25px] text-[white] font-bold bg-gradient-to-r from-blue-500 to-red-500 flex  justify-center">
        {response.error}
      </div>
    );
  } else {
    return (
      <div className="w-full py-[200px] text-[25px] text-[white] font-bold bg-gradient-to-r from-red-500 to-blue-500 flex  justify-center">
        Account verify successfully
      </div>
    );
  }
};

export default Page;
