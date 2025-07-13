/**
 * Type definition for boundaries configuration
 */
export interface Boundaries {
  /** Unique name for this boundary */
  name: string;
  /** List of internal boundaries that this boundary can import from */
  internal: string[];
  /** List of external packages/modules that this boundary can import */
  external: string[];
}
