import type { CSSProperties } from "react"

export { cn } from "cn"

/** Stagger offset for `.rise` entrance animations. */
export function delay(ms: number) {
  return { "--delay": `${ms}ms` } as CSSProperties
}
