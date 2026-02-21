import { Injectable } from "@nestjs/common";

type Handler<T> = (payload: T) => void | Promise<void>;

@Injectable()
export class DomainEventsService {
  private handlers = new Map<string, Handler<any>[]>();

  on<T>(eventName: string, handler: Handler<T>): void {
    const list = this.handlers.get(eventName) ?? [];
    list.push(handler as Handler<any>);
    this.handlers.set(eventName, list);
  }

  async emit<T>(eventName: string, payload: T): Promise<void> {
    const list = this.handlers.get(eventName) ?? [];
    for (const handler of list) {
      await handler(payload);
    }
  }
}
