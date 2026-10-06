export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex flex-1 items-center justify-center bg-[var(--bg)] px-5 py-16">
      <div className="w-full max-w-[400px]">{children}</div>
    </main>
  );
}
