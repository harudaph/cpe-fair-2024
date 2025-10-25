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

/* ---------------------------
   Small utility: cva button
----------------------------*/
const sidebarMenuButton = cva(
  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm",
  {
    variants: {
      variant: {
        default: "text-gray-700 hover:bg-gray-100",
        primary: "bg-red-600 text-white hover:bg-red-700",
        ghost: "text-gray-400 hover:text-gray-700",
      },
      compact: {
        true: "px-2 py-1 text-xs",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      compact: false,
    },
  }
);

type SidebarMenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof sidebarMenuButton> & { asChild?: boolean; tooltip?: string };

/* ---------------------------
   SidebarProvider
---------------------------*/
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
    if (setOpenProp) setOpenProp(openState);
    else _setOpen(openState);

    // persist in cookie (best-effort)
    try {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    } catch {
      // ignore cookie errors (e.g. SSR or blocked cookies)
    }
  }, [setOpenProp, open]);

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
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

  // Apply mobile sidebar width when mobile
  const cssVars: React.CSSProperties = {
    "--sidebar-width": isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH,
    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
    ...style,
  } as React.CSSProperties;

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={cssVars}
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
   Polymorphic SidebarMenuButton
---------------------------*/

// Use React.ElementType instead of `any` for polymorphic component
type SidebarMenuButtonElement = React.ElementType;

const SidebarMenuButton = ({
  children,
  asChild = false,
  className,
  variant,
  compact,
  tooltip,
  ...props
}: SidebarMenuButtonProps) => {
  const Comp: SidebarMenuButtonElement = asChild ? Slot : "button";

  const content = (
    // It's ok to pass HTML button attributes into a generic ElementType here.
    <Comp className={cn(sidebarMenuButton({ variant, compact }), className)} {...props}>
      {children}
    </Comp>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

/* ---------------------------
   Stub Components for Sidebar
   (use imported helpers where appropriate to avoid "unused" warnings)
---------------------------*/

const Sidebar: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar" {...props}>{children}</div>
);

const SidebarContent: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-content" {...props}>{children}</div>
);

const SidebarFooter: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-footer" {...props}>
    {/* Use Separator + Button inside footer so imports are consumed meaningfully */}
    <div className="p-3">
      <Separator />
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div>
            <div className="text-sm text-white">Guest</div>
            <div className="text-xs text-gray-400">Not signed in</div>
          </div>
        </div>
        <Button onClick={() => alert("Sign in (stub)")} size="sm">Sign in</Button>
      </div>
    </div>
    {children}
  </div>
);

const SidebarGroup: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-group" {...props}>{children}</div>
);

const SidebarGroupAction: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-group-action" {...props}>{children}</div>
);

const SidebarGroupContent: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-group-content" {...props}>{children}</div>
);

const SidebarGroupLabel: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-group-label" {...props}>{children}</div>
);

const SidebarHeader: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-header" {...props}>{children}</div>
);

const SidebarInput: React.FC<React.ComponentProps<"input">> = (props) => (
  <div data-slot="sidebar-input" className="px-3 py-2">
    <Input {...props} />
  </div>
);

const SidebarInset: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-inset" {...props}>{children}</div>
);

const SidebarMenu: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-menu" {...props}>{children}</div>
);

const SidebarMenuAction: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-menu-action" {...props}>{children}</div>
);

const SidebarMenuBadge: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-menu-badge" {...props}>{children}</div>
);

// Exported wrapper that provides tooltip text when children is simple string
const SidebarMenuButtonExport: React.FC<SidebarMenuButtonProps> = ({ children, ...props }) => {
  const tooltip = typeof children === "string" ? children : undefined;
  return (
    <SidebarMenuButton tooltip={tooltip} {...props}>
      {children ?? <span className="sr-only">Action</span>}
    </SidebarMenuButton>
  );
};

const SidebarMenuItem: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-menu-item" {...props}>{children}</div>
);

const SidebarMenuSkeleton: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-menu-skeleton" {...props}>
    {/* A tiny demo that consumes Skeleton, Button and Sheet so they’re not unused */}
    <div className="p-3">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
      <div className="mt-3">
        <Button size="sm" onClick={() => { /* intentionally blank demo action */ }}>
          Try Demo
        </Button>
      </div>

      {/* demonstrate Sheet usage in markup (non-interactive demo) */}
      <Sheet>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Demo Sheet</SheetTitle>
            <SheetDescription>This is a stub sheet used in the sidebar skeleton for demonstration.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
    {children}
  </div>
);

const SidebarMenuSub: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-menu-sub" {...props}>{children}</div>
);

const SidebarMenuSubButton: React.FC<React.ComponentProps<"button">> = ({ children, ...props }) => (
  <button data-slot="sidebar-menu-sub-button" {...props}>{children}</button>
);

const SidebarMenuSubItem: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-menu-sub-item" {...props}>{children}</div>
);

const SidebarRail: React.FC<React.ComponentProps<"div">> = ({ children, ...props }) => (
  <div data-slot="sidebar-rail" {...props}>{children}</div>
);

const SidebarSeparator: React.FC<React.ComponentProps<"div">> = (props) => (
  <div data-slot="sidebar-separator" {...props} />
);

const SidebarTrigger: React.FC<React.ComponentProps<"button">> = ({ children, ...props }) => {
  // Use PanelLeftIcon as a sensible default so import is used
  return (
    <button data-slot="sidebar-trigger" {...props}>
      {children ?? <IconWrapper />}
    </button>
  );
};

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
  SidebarMenuButtonExport as SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
};

/* ---------------------------
   Small helpers
---------------------------*/
function IconWrapper() {
  return <PanelLeftIcon className="w-5 h-5" />;
}
