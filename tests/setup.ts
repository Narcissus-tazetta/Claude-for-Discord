import { afterEach, mock } from "bun:test";

// Durable Object classes extend this runtime-only base class; tests construct them directly
// with an in-memory storage double instead.
mock.module("cloudflare:workers", () => ({
  DurableObject: class {
    constructor(
      public ctx: any,
      public env: any,
    ) {}
  },
}));

afterEach(() => mock.restore());
