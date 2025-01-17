type Listener = (...args: unknown[]) => void;

export class EventEmitter {
    private events: Map<string, Listener[]> = new Map();

    on(eventName: string, listener: Listener): void {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        const listeners = this.events.get(eventName);
        if (listeners) {
            listeners.push(listener);
        }
    }

    emit(eventName: string, ...args: unknown[]): void {
        const listeners = this.events.get(eventName);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }

    off(eventName: string, listener: Listener): void {
        const listeners = this.events.get(eventName);
        if (listeners) {
            this.events.set(
                eventName,
                listeners.filter(eachListener => eachListener !== listener)
            );
        }
    }
}
