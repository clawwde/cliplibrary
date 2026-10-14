import { describe, expect, it } from 'bun:test';
import { act, renderHook } from '@testing-library/react';
import { useUndoable } from '../../src/lib/use-undoable';

describe('useUndoable', () => {
  it('records each discrete set as its own undo step', () => {
    const { result } = renderHook(() => useUndoable(0));
    act(() => result.current.set(1));
    act(() => result.current.set(2));
    expect(result.current.value).toBe(2);
    act(() => result.current.undo());
    expect(result.current.value).toBe(1);
    act(() => result.current.undo());
    expect(result.current.value).toBe(0);
  });

  it('coalesces a live run into a single step keeping only the first and final values', () => {
    const { result } = renderHook(() => useUndoable(0));
    act(() => result.current.setLive(0.1));
    act(() => result.current.setLive(0.2));
    act(() => result.current.setLive(2));
    act(() => result.current.seal());
    expect(result.current.value).toBe(2);
    act(() => result.current.undo());
    expect(result.current.value).toBe(0);
    expect(result.current.canUndo).toBe(false);
  });

  it('starts a fresh step after sealing so separate gestures undo separately', () => {
    const { result } = renderHook(() => useUndoable(0));
    act(() => result.current.setLive(1));
    act(() => result.current.setLive(2));
    act(() => result.current.seal());
    act(() => result.current.setLive(3));
    act(() => result.current.setLive(4));
    act(() => result.current.seal());
    expect(result.current.value).toBe(4);
    act(() => result.current.undo());
    expect(result.current.value).toBe(2);
    act(() => result.current.undo());
    expect(result.current.value).toBe(0);
  });

  it('redoes a coalesced step back to its final value', () => {
    const { result } = renderHook(() => useUndoable(0));
    act(() => result.current.setLive(5));
    act(() => result.current.setLive(9));
    act(() => result.current.seal());
    act(() => result.current.undo());
    expect(result.current.value).toBe(0);
    act(() => result.current.redo());
    expect(result.current.value).toBe(9);
  });
});
