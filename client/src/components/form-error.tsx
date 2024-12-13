export function FormError({ error }: { error: Error | null }) {
  if (!error) return null;

  return <div className="text-destructive text-sm bg-destructive/25 py-2 px-4 flex rounded-md">{error.message}</div>;
}
