import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  github: string;
}

interface UsersStore {
  users: User[];
  resetInitial: () => void;
  deleteUserById: (name: string) => void;
  addUser: (name: string, email: string, github: string) => void;
  usersForEditing: User;
  PickUserToEdit: (userName: string) => void;
}

const initialUsers = [
  {
    name: "John Doe",
    email: "johndoe12@gmail.com",
    github: "johndoe",
  },
  {
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    github: "janesmith",
  },
  {
    name: "Michael Johnson",
    email: "michaelj@gmail.com",
    github: "mjohnson",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@gmail.com",
    github: "emilyd",
  },
  {
    name: "William Brown",
    email: "wbrown@gmail.com",
    github: "willbrown",
  },
  {
    name: "Sophia Wilson",
    email: "sophiawilson@gmail.com",
    github: "sophiaw",
  },
  {
    name: "James Miller",
    email: "jamesmiller@gmail.com",
    github: "jamesm",
  },
  {
    name: "Olivia Taylor",
    email: "oliviataylor@gmail.com",
    github: "oliviat",
  },
  {
    name: "Benjamin Anderson",
    email: "benanderson@gmail.com",
    github: "benanderson",
  },
  {
    name: "Midu Dev",
    email: "midudev@gmail.com",
    github: "midudev",
  },
];

export const useUsersStore = create<UsersStore>()(
  persist(
    (set, get) => {
      return {
        users: initialUsers,
        resetInitial: () => {
          set({ users: initialUsers });
        },

        deleteUserById: (name) => {
          set((state) => ({
            users: state.users.filter((user) => user.name !== name),
          }));
        },

        addUser: (name, email, github) => {
          const { users, usersForEditing } = get();

          if (!Object.values(usersForEditing).every((value) => value === "")) {
            const updatedUsers = users.map((user) =>
              user.name === usersForEditing.name &&
              user.email === usersForEditing.email &&
              user.github === usersForEditing.github
                ? { ...user, name, email, github }
                : user,
            );

            set({
              users: updatedUsers,
              usersForEditing: { name: "", email: "", github: "" },
            });
          } else {
            set((state) => ({
              users: [...state.users, { name, email, github }],
            }));
          }
        },

        usersForEditing: { name: "", email: "", github: "" },

        PickUserToEdit: (userName: string) => {
          const { users } = get();
          const dataUser = users.find((user) => user.name === userName);
          set({
            usersForEditing: dataUser,
          });
        },
      };
    },
    {
      name: "users", // por defecto guarda en el localStorage si no se especifica
    },
  ),
);
