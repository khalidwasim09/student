export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <p className="text-center max-w-xl">
        A student-only matching app. Sign in with your institution to get started.
      </p>
      <div className="flex gap-4">
        <a href="/login" className="rounded bg-blue-600 px-4 py-2 text-white">Login</a>
        <a href="/privacy" className="underline">Privacy</a>
        <a href="/tos" className="underline">Terms</a>
      </div>
    </main>
  );
}