import AddService from "@/components/ServiceManageMent/AddService";
import DeleteService from "@/components/ServiceManageMent/DeleteService";
import EditService from "@/components/ServiceManageMent/EditService";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetServicesQuery } from "@/redux/features/service/service.api";

import { trimText } from "@/utils/trimText";
import { formatDistanceToNow } from "date-fns";
import { ListOrderedIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
const ServiceManage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetServicesQuery({ searchTerm, limit, page });
  console.log(data?.data);
  return (
    <div className="w-full bg-background">
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-6 shadow-sm">
        <h1 className="text-xl font-bold">Service Dashboard</h1>
        <div className="center gap-[20px]">
          <Select
            onValueChange={(e) => setLimit(Number(e))}
            value={limit.toString()}
            defaultValue={limit.toString()}
          >
            <SelectTrigger className="w-[100px]">
              <ListOrderedIcon className="h-4 w-4" />
              <SelectValue placeholder="Limit per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Content limit</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <AddService />
        </div>
      </header>
      <form
        className="flex w-[350px] pl-6 mt-6"
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
            placeholder="Search..."
            className="block w-full p-4 pl-10 text-sm text-foreground bg-background border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
        <Button type="submit" variant="secondary" className="ml-[10px]">
          Search
        </Button>
      </form>
      <main className="p-6">
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map(
                  ({ _id, description, duration, name, price, createdAt }) => (
                    <TableRow key={_id}>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell>{trimText(description, 30)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          {duration} Min
                        </Badge>
                      </TableCell>
                      <TableCell>${price}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(createdAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <EditService />
                          <DeleteService />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <div className="w-full px-6 flex items-center justify-start gap-[10px]">
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
                      ? "bg-primary text-muted-foreground"
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
export default ServiceManage;
