"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-primary text-primary-foreground p-2 rounded-md">
            RP
          </span>
          <span className="font-bold text-xl">Resume Parser</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-10 w-20 bg-muted animate-pulse rounded-md"></div>
          ) : user ? (
            <UserMenu user={user} signOut={signOut} />
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/auth/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function UserMenu({
  user,
  signOut,
}: {
  user: { email: string };
  signOut: () => Promise<void>;
}) {
  const initials = user.email
    ? user.email.split("@")[0].substring(0, 2).toUpperCase()
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal text-xs text-muted-foreground truncate max-w-[200px]">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
