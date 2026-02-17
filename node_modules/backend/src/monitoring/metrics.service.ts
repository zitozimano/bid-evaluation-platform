import { Injectable } from "@nestjs/common";
import {
  collectDefaultMetrics,
  Registry,
  Counter,
  Histogram,
} from "prom-client";

@Injectable()
export class MetricsService {
  private registry: Registry;
  public httpRequestsTotal: Counter<string>;
  public httpRequestDuration: Histogram<string>;

  constructor() {
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });

    this.httpRequestsTotal = new Counter({
      name: "http_requests_total",
      help: "Total number of HTTP requests",
      labelNames: ["method", "route", "status"],
      registers: [this.registry],
    });

    this.httpRequestDuration = new Histogram({
      name: "http_request_duration_seconds",
      help: "HTTP request duration in seconds",
      labelNames: ["method", "route", "status"],
      buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
      registers: [this.registry],
    });
  }

  getRegistry() {
    return this.registry;
  }
}
