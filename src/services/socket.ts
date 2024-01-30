import { io } from "socket.io-client";

const URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}socket/tracking`;

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export type Socket = typeof socket;
