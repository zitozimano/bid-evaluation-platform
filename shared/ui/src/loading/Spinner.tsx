export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-brand border-t-transparent"
      style={{ width: size, height: size }}
    />
  );
}
