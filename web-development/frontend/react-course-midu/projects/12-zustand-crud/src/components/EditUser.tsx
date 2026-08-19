import { Button, Card, TextInput, Title } from "@tremor/react";
import { useUsersActions } from "../hooks/useUsersActions";

import { Dialog, DialogPanel } from "@tremor/react";
import { useUsersStore } from "../store/useUsersStore";

export const EditUser = () => {
  const { name, email, github } = useUsersStore(
    (state) => state.usersForEditing,
  );

  const { addUserError, handleClickAddUser } = useUsersActions();

  return (
    <Card>
      <Title style={{ marginBottom: "16px" }}>Create New User</Title>

      <form className="formEdit" onSubmit={handleClickAddUser}>
        <TextInput
          placeholder="nombre"
          name="name"
          defaultValue={name}
        ></TextInput>
        <TextInput
          placeholder="email"
          name="email"
          defaultValue={email}
        ></TextInput>
        <TextInput
          placeholder="usuario de Github"
          name="github"
          defaultValue={github}
        ></TextInput>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Button type="submit" style={{ marginTop: "16px" }}>
            Editar Usuario
          </Button>
          {addUserError === "error" && (
            <span
              className="inline-flex rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-700"
              style={{ marginTop: 15 }}
            >
              ❌ Error en los campos
            </span>
          )}
        </div>
      </form>
    </Card>
  );
};

export const EditUserModal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={open} onClose={onClose} static={true} className="z-50">
      <DialogPanel
        className="w-full max-w-lg rounded-xl"
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        {children}
      </DialogPanel>
    </Dialog>
  );
};
