// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center bg-base-200">
      <div className="w-full max-w-md rounded-2xl shadow-card bg-base-100 p-6">
        {children}
      </div>
    </div>
  );
}
