// 'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Badge,
  Button,
} from "@tremor/react";
import { useUsersActions } from "../hooks/useUsersActions";
import { useUsersStore } from "../store/useUsersStore";

import { useState } from "react";
import { CreateNewUser, CreateNewUserModal } from "./CreateNewUser";
import { EditUser, EditUserModal } from "./EditUser";

export default function UsersList() {
  const { users, handleClickRemoveUserById, handleClickPickUserByName } =
    useUsersActions();
  const resetInitial = useUsersStore((state) => state.resetInitial);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <>
      <div style={{ width: 1000 }}>
        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
          <div>
            <Title className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Usuarios
              <Badge style={{ marginLeft: "8px" }}>{users.length}</Badge>
            </Title>
          </div>
          <div>
            <Button onClick={() => setOpen(true)} style={{ marginRight: 20 }}>
              Crear Usuario
            </Button>
            <Button onClick={resetInitial}>Reset</Button>
          </div>
        </div>
        <Table className="mt-8">
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Id
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Nombre
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Email
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Acciones
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {index + 1}
                </TableCell>
                <TableCell
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <img
                    src={`https://unavatar.io/github/${item.github}`}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />
                  {item.name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell style={{}}>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                    }}
                  >
                    <button onClick={handleClickRemoveUserById(item.name)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        handleClickPickUserByName(item.name);
                        setOpen2(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CreateNewUserModal open={open} onClose={() => setOpen(false)}>
          <CreateNewUser />
        </CreateNewUserModal>

        <EditUserModal open={open2} onClose={() => setOpen2(false)}>
          <EditUser />
        </EditUserModal>
      </div>
    </>
  );
}
