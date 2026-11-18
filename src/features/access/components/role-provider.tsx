"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { DEMO_MANAGER } from "../constants/access";
import type { Role } from "../types/access";

type Session = { role: Role; userName: string };

type RoleState = Session & {
  isManager: boolean;
  /** false until the saved session has been read, so guarded pages do not flash the wrong view */
  ready: boolean;
  /** true when the demo account matches; the session is saved */
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const RoleContext = createContext<RoleState | null>(null);
const STORAGE_KEY = "mangrove-demo-session";
const SERVER = "server";
const VISITOR: Session = { role: "visitor", userName: "" };

// shortcut: dummy session kept in localStorage (memory when storage is blocked); replace with real sign-in and server-side roles (FR-01).
let memory: string | null | undefined;
const listeners = new Set<() => void>();
const read = () => {
  if (memory !== undefined) return memory;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
const write = (session: Session) => {
  memory = JSON.stringify(session);
  try {
    localStorage.setItem(STORAGE_KEY, memory);
  } catch {
    // blocked storage: the session lasts until reload
  }
  listeners.forEach((listener) => listener());
};
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, read, () => SERVER);

  const value = useMemo<RoleState>(() => {
    let session = VISITOR;
    try {
      if (raw && raw !== SERVER) session = JSON.parse(raw);
    } catch {
      // a corrupted saved value falls back to visitor
    }
    return {
      ...session,
      isManager: session.role === "manager",
      ready: raw !== SERVER,
      login: (email, password) => {
        if (email.trim().toLowerCase() !== DEMO_MANAGER.email || password !== DEMO_MANAGER.password) return false;
        write({ role: "manager", userName: DEMO_MANAGER.name });
        return true;
      },
      logout: () => write(VISITOR),
    };
  }, [raw]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const value = useContext(RoleContext);
  if (!value) throw new Error("useRole must be used inside RoleProvider");
  return value;
}
