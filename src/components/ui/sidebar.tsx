"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

// Constants
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// Sidebar Context
type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

// SidebarProvider
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & { defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback((value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === "function" ? value(open) : value;
    setOpenProp ? setOpenProp(openState) : _setOpen(openState);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [setOpenProp, open]);

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(() => ({
    state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties}
          className={cn("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

/* ---------------------------
   Stub Components for Sidebar
--------------------------- */
const Sidebar = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar" {...props}>{children}</div>
);

const SidebarContent = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-content" {...props}>{children}</div>
);

const SidebarFooter = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-footer" {...props}>{children}</div>
);

const SidebarGroup = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-group" {...props}>{children}</div>
);

const SidebarGroupAction = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-group-action" {...props}>{children}</div>
);

const SidebarGroupContent = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-group-content" {...props}>{children}</div>
);

const SidebarGroupLabel = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-group-label" {...props}>{children}</div>
);

const SidebarHeader = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-header" {...props}>{children}</div>
);

const SidebarInput = ({ ...props }: React.ComponentProps<"input">) => (
  <input data-slot="sidebar-input" {...props} />
);

const SidebarInset = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-inset" {...props}>{children}</div>
);

const SidebarMenu = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-menu" {...props}>{children}</div>
);

const SidebarMenuAction = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-menu-action" {...props}>{children}</div>
);

const SidebarMenuBadge = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-menu-badge" {...props}>{children}</div>
);

const SidebarMenuButton = ({ children, ...props }: React.ComponentProps<"button">) => (
  <button data-slot="sidebar-menu-button" {...props}>{children}</button>
);

const SidebarMenuItem = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-menu-item" {...props}>{children}</div>
);

const SidebarMenuSkeleton = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-menu-skeleton" {...props}>{children}</div>
);

const SidebarMenuSub = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-menu-sub" {...props}>{children}</div>
);

const SidebarMenuSubButton = ({ children, ...props }: React.ComponentProps<"button">) => (
  <button data-slot="sidebar-menu-sub-button" {...props}>{children}</button>
);

const SidebarMenuSubItem = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-menu-sub-item" {...props}>{children}</div>
);

const SidebarRail = ({ children, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-rail" {...props}>{children}</div>
);

const SidebarSeparator = ({ ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-separator" {...props} />
);

const SidebarTrigger = ({ children, ...props }: React.ComponentProps<"button">) => (
  <button data-slot="sidebar-trigger" {...props}>{children}</button>
);

/* ---------------------------
           Exports
--------------------------- */
export {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger
};
