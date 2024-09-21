import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeRoleMutation } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hooks";
import { TRole } from "@/types/user";
import { toast } from "sonner";
const ChangeUserRole = ({ role, id }: { role: string; id: string }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [changeRole] = useChangeRoleMutation();

  const handleChangeRole = async (updateRole: TRole) => {
    const toasId = toast.loading("Please wati...");
    try {
      await changeRole({ id, role: updateRole });
      toast.dismiss(toasId);
      toast.success(`Successfully updated user role to ${updateRole}`);
    } catch (error) {
      toast.dismiss(toasId);
      toast.error("Something went wrong while making this request");
    }
  };
  return (
    <Select
      defaultValue={role}
      disabled={user?._id === id}
      onValueChange={handleChangeRole}
    >
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
  );
};

export default ChangeUserRole;
