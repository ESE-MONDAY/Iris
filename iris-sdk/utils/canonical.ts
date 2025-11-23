// utils/canonical.ts

/**
 * Deterministic JSON canonicalizer
 * Ensures keys are sorted and arrays/objects are serialized consistently.
 * Used for generating agentId and signing identity packets.
 */

export function canonicalize(obj: any): string {
  if (obj === null) return "null";
  if (typeof obj === "string") return JSON.stringify(obj);
  if (typeof obj === "number" || typeof obj === "boolean") return JSON.stringify(obj);

  if (Array.isArray(obj)) {
    const parts = obj.map((v) => canonicalize(v));
    return "[" + parts.join(",") + "]";
  }

  if (typeof obj === "object") {
    const keys = Object.keys(obj).sort();
    const parts = keys.map((k) => JSON.stringify(k) + ":" + canonicalize(obj[k]));
    return "{" + parts.join(",") + "}";
  }

  return JSON.stringify(String(obj));
}
