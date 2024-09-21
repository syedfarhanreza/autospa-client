import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { useGetAllBookingsQuery } from "@/redux/features/booking/booking.api";
import { ListOrderedIcon } from "lucide-react";
import { useState } from "react";

export default function BookingManage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetAllBookingsQuery({ limit, page });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground">
          Manage upcoming Bookings from slots.
        </p>
      </div>
      <Select onValueChange={(e) => setLimit(Number(e))}>
        <SelectTrigger className="w-fit">
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
      <Card className="overflow-x-auto mt-6 relative">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Customer</TableHead>
                <TableHead className="cursor-pointer">Service</TableHead>
                <TableHead className="cursor-pointer">Booking Slot</TableHead>
                <TableHead className="cursor-pointer">Payment Status</TableHead>
                <TableHead className="cursor-pointer">Booking Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <div className="font-medium">
                      {booking.customer.firstName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.customer.email}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.customer.phone}
                    </div>
                  </TableCell>
                  <TableCell>{booking.service?.name}</TableCell>
                  <TableCell>
                    {booking.slot?.date} at {booking.slot?.startTime}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.payment === "paid" ? "secondary" : "outline"
                      }
                    >
                      {booking.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "confirm" ? "default" : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isFetching ? (
            <span className="w-full h-full absolute top-0 left-0 bg-primary/60 skeleton opacity-[0.6] rounded-[10px] center">
              <span className="text-primaryMat">Loading...</span>
            </span>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
      <div className="w-full px-6 flex items-center justify-start gap-[10px] mt-6">
        <p>Page:</p>
        <Pagination className="w-fit mx-0">
          <PaginationContent>
            {Array.from({
              length: Math.ceil((data?.totalDoc || 0) / limit),
            }).map((_, i) => (
              <PaginationItem key={i + "page"}>
                <PaginationLink
                  onClick={() => setPage(i + 1)}
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
}
