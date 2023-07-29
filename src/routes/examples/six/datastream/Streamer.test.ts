import { describe, it, expect, beforeAll, beforeEach } from 'vitest';

import { Streamer } from './Streamer';
import type { StreamHandler } from './StreamHandler'; // Import StreamHandler type if not already done

// Define a mock StreamHandler class for testing purposes
class MockStreamHandler implements StreamHandler {
    // Implement the necessary methods of StreamHandler
    onData(number: number): void {
        
    }
}

describe('Streamer', () => {
    let streamer: Streamer;
    const symbol = 'AAPL';
    const handler1 = new MockStreamHandler();
    const handler2 = new MockStreamHandler();

    beforeEach(() => {
        streamer = Streamer.getInstance();
        // Reset the handlerMap before each test to avoid interference between tests
        streamer['handlerMap'].clear();
    });

    it('should connect a handler to a symbol', () => {
        streamer.connect(symbol, handler1);
        const handlers = streamer['handlerMap'].get(symbol);
        expect(handlers).toEqual([handler1]);
    });

    it('should connect multiple handlers to a symbol', () => {
        streamer.connect(symbol, handler1);
        streamer.connect(symbol, handler2);
        const handlers = streamer['handlerMap'].get(symbol);
        expect(handlers).toEqual([handler1, handler2]);
    });

    it('should disconnect a handler from a symbol', () => {
        streamer.connect(symbol, handler1);
        streamer.connect(symbol, handler2);
        streamer.disconnect(symbol, handler1);
        const handlers = streamer['handlerMap'].get(symbol);
        expect(handlers).toEqual([handler2]);
    });

    it('should not throw an error when disconnecting an unknown handler', () => {
        streamer.connect(symbol, handler1);
        const unknownHandler = new MockStreamHandler();
        expect(() => streamer.disconnect(symbol, unknownHandler)).not.toThrow();
    });
});