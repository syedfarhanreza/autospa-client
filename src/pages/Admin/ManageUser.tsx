import ChangeUserRole from "@/components/ManageUser/ChangeUserRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGetAllUserQuery } from "@/redux/features/auth/user.api";
import { useAppSelector } from "@/redux/hooks";
import NotFound from "@/utils/NotFound";
import { formatDistanceToNow } from "date-fns";
import { ListOrderedIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

const ManageUser = () => {
  const [page, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetAllUserQuery({ searchTerm, page, limit });
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage user roles and permissions.
        </p>
      </div>

      <div className="w-full flex items-center justify-between my-6">
        <form
          className="flex w-[350px]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            setSearchTerm(form.search.value);
          }}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 text-muted-foreground w-auto" />
            </div>
            <Input
              type="search"
              name="search"
              onBlur={(e) => setSearchTerm(e.target.value)}
              placeholder="email or last name or first.."
              className="block w-full p-4 pl-10 text-sm text-foreground bg-background border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <Button type="submit" variant="secondary" className="ml-[10px]">
            Search
          </Button>
        </form>
        <div className="center gap-[20px]">
          <Select onValueChange={(e) => setLimit(Number(e))}>
            <SelectTrigger className="">
              <ListOrderedIcon className="h-4 w-4" />
              <SelectValue placeholder="Limit per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Content limit</SelectLabel>

                <SelectItem value="10">Limit: 10</SelectItem>
                <SelectItem value="20">Limit: 20</SelectItem>
                <SelectItem value="30">Limit: 30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {data?.data && data.data.length < 1 ? <NotFound /> : ""}

      <div className="gap-4 gridUser_responsive">
        {searchTerm || page > 1 ? (
          ""
        ) : (
          <Card key={user?._id} className="border-[1px] border-muted">
            <div className="flex items-center gap-4 p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image} alt="John Doe" />
                <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
                <div className="text-sm text-muted-foreground">
                  Member since{" "}
                  {formatDistanceToNow(
                    new Date(user?.createdAt || "11-11-2022"),
                    {
                      addSuffix: false,
                    }
                  )}
                </div>
              </div>
            </div>
            <Separator />
            <CardContent className="p-4">
              <Select defaultValue={user?.auth?.role} disabled={true}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Set Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select role</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {data?.data?.map((pay_user) => (
          <Card key={pay_user._id}>
            <div className="flex items-center gap-4 p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={pay_user.image} alt="John Doe" />
                <AvatarFallback>{pay_user.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">
                  {pay_user.firstName} {pay_user.lastName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {pay_user.email}
                </div>
                <div className="text-sm text-muted-foreground">
                  Member since{" "}
                  {formatDistanceToNow(new Date(pay_user.createdAt), {
                    addSuffix: false,
                  })}
                </div>
              </div>
            </div>
            <Separator />
            <CardContent className="p-4">
              <ChangeUserRole
                id={pay_user._id}
                role={pay_user.auth?.role || ""}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full px-6 flex items-center justify-start gap-[10px] mt-6">
        <p>Page:</p>
        <Pagination className="w-fit mx-0">
          <PaginationContent>
            {Array.from({
              length: Math.ceil((data?.totalDoc || 0) / limit),
            }).map((_, i) => (
              <PaginationItem key={i + "page"}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${
                    page === i + 1
                      ? "bg-primary text-muted hover:bg-primary"
                      : "text-primary"
                  } border-[1px] border-primary`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ManageUser;
