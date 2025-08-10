export default function LoginPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Login</h1>
      <section className="mb-8">
        <h2 className="mb-2 font-medium">Choose your institution</h2>
        <form action="/api/auth/oidc/init" method="POST" className="flex gap-2">
          <input name="institutionId" placeholder="Institution ID" className="w-full rounded border px-3 py-2" />
          <button className="rounded bg-blue-600 px-4 py-2 text-white" type="submit">Continue</button>
        </form>
      </section>
      <section>
        <h2 className="mb-2 font-medium">Or verify your student email</h2>
        <form action="/api/auth/email/start" method="POST" className="flex gap-2">
          <input type="email" name="email" placeholder="you@school.ca" className="w-full rounded border px-3 py-2" />
          <button className="rounded bg-gray-800 px-4 py-2 text-white" type="submit">Send Link</button>
        </form>
      </section>
    </main>
  );
}