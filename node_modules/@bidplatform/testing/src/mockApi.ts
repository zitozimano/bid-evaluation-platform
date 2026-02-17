export function createMockApi(overrides: any = {}) {
  return {
    evaluations: {
      get: vi.fn().mockResolvedValue({ id: "1", state: "DRAFT" }),
      update: vi.fn().mockResolvedValue({}),
      ...overrides.evaluations
    },
    bids: {
      list: vi.fn().mockResolvedValue([]),
      ...overrides.bids
    }
  };
}
