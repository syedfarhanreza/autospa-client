import AddSlot from "@/components/SlotManageMent/AddSlot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  useGetAllSlotsQuery,
  useToggleSlotStatusMutation,
} from "@/redux/features/slots/slots.api";
import { ListOrderedIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const SlotManage = () => {
  const [limit, setLimit] = useState(10);

  const [page, setCurrentPage] = useState(1);
  const { data, isFetching } = useGetAllSlotsQuery({ limit, page });
  const [toggleSlotStatus] = useToggleSlotStatusMutation();

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleSlotStatus(id);
    } catch (error) {
      toast.error("Something went wrong while making this request", {
        description: "please try agin, or maybe this slot has already booked",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Slot Management</h1>
        <p className="text-muted-foreground">Manage slots to get booking</p>
      </div>
      <div className="w-full flex items-center justify-end my-6 gap-[10px]">
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
        <AddSlot />
      </div>
      <Card className="overflow-x-auto relative w-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((slot) => (
                <TableRow key={slot._id}>
                  <TableCell>{slot.startTime}</TableCell>
                  <TableCell>{slot.endTime}</TableCell>
                  <TableCell>{slot.date}</TableCell>
                  <TableCell>
                    {slot.isBooked === "booked" ? "Booked" : "-"}
                  </TableCell>
                  <TableCell>{slot.service.name}</TableCell>
                  <TableCell>
                    {slot.isBooked !== "booked" ? (
                      <Button
                        size="sm"
                        variant={
                          slot.isBooked === "available"
                            ? "destructive"
                            : "secondary"
                        }
                        onClick={() => handleToggleStatus(slot._id)}
                      >
                        {slot.isBooked === "available"
                          ? "Cancel"
                          : "Make Available"}
                      </Button>
                    ) : (
                      <Badge variant={"default"} className="bg-green-300">
                        Booked
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>{" "}
          {isFetching ? (
            <span className="w-full h-full absolute top-0 left-0 bg-primary/60 skeleton opacity-[0.6] rounded-[10px] center">
              <span className="text-primaryMat">Loading...</span>
            </span>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
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

export default SlotManage;
