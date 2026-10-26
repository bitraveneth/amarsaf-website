import type { Media } from "@prisma/client";

export function MediaSelect({
  media,
  name,
  defaultValue,
  allowEmpty = true,
}: {
  media: Pick<Media, "id" | "alt" | "filename" | "url">[];
  name: string;
  defaultValue?: string | null;
  allowEmpty?: boolean;
}) {
  return (
    <select name={name} defaultValue={defaultValue ?? ""}>
      {allowEmpty ? <option value="">— None —</option> : null}
      {media.map((m) => (
        <option key={m.id} value={m.id}>
          {m.filename || m.alt || m.url}
        </option>
      ))}
    </select>
  );
}
