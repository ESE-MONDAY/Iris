"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Overview", href: "/app" },
  { name: "Agents", href: "/app/agents" },
  { name: "Register Agent", href: "/app/register" },
  { name: "Payments (x402)", href: "/app/payments" },
  { name: "Reviews & Reputation", href: "/app/reviews" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-300 p-6 flex flex-col">

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-md font-medium transition
              ${pathname === item.href ? "bg-black text-white" : "hover:bg-gray-200"}
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
