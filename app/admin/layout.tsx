import AppSidebar from "@/features/sidebar/app-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">

      <AppSidebar />

      <main className="flex-1 bg-gray-100 min-h-screen p-8">
        {children}
      </main>

    </div>
  )
}