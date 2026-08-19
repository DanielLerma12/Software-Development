import { useUsersStore } from "../store/useUsersStore";
import { useState } from "react";
import { toast } from "sonner";

export const useUsersActions = () => {
  const users = useUsersStore((state) => state.users);
  const deleteUserById = useUsersStore((state) => state.deleteUserById);
  const addUser = useUsersStore((state) => state.addUser);
  const PickUserToEdit = useUsersStore((state) => state.PickUserToEdit);

  const [addUserError, setAddUserError] = useState<"ok" | "error" | null>(null);

  const handleClickRemoveUserById = (name: string) => () => {
    deleteUserById(name);
    toast(`Usuario [${name}] borrado correctamente`);
  };

  const handleClickAddUser = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    if (!name || !email || !github) {
      return setAddUserError("error");
    }

    addUser(name, email, github);
    setAddUserError("ok");

    if (form.className === "formCreate") {
      toast(`Usuario [${name}] agregado correctamente`);
    } else {
      toast(`Usuario [${name}] editado correctamente`);
    }

    form.reset();
  };

  const handleClickPickUserByName = (userName: string) => {
    PickUserToEdit(userName);
  };

  return {
    users,
    handleClickRemoveUserById,
    handleClickAddUser,
    addUserError,
    handleClickPickUserByName,
  };
};
