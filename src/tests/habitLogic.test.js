import { describe, it, expect } from 'vitest';
import { addHabit, removeHabit, toggleHabitDone, filterHabits } from '../habitLogic';

describe('Habit Logic', () => {
  it('should add a new habit', () => {
    const habits = [];
    const newHabit = { id: 1, name: 'Test Habit', done: false };
    const updatedHabits = addHabit(habits, newHabit);
    expect(updatedHabits).toContainEqual(newHabit);
  });

  it('should remove a habit', () => {
    const habits = [{ id: 1, name: 'Test Habit', done: false }];
    const updatedHabits = removeHabit(habits, 1);
    expect(updatedHabits).not.toContainEqual({ id: 1, name: 'Test Habit', done: false });
  });

  it('should toggle habit done status', () => {
    const habits = [{ id: 1, name: 'Test Habit', done: false }];
    const updatedHabits = toggleHabitDone(habits, 1);
    expect(updatedHabits[0].done).toBe(true);
  });

  it('should filter habits by all', () => {
    const habits = [
      { id: 1, name: 'Test Habit 1', done: false },
      { id: 2, name: 'Test Habit 2', done: true }
    ];
    const filteredHabits = filterHabits(habits, 'all');
    expect(filteredHabits).toHaveLength(2);
  });

  it('should filter habits by active', () => {
    const habits = [
      { id: 1, name: 'Test Habit 1', done: false },
      { id: 2, name: 'Test Habit 2', done: true }
    ];
    const filteredHabits = filterHabits(habits, 'active');
    expect(filteredHabits).toHaveLength(1);
    expect(filteredHabits[0].done).toBe(false);
  });

  it('should filter habits by completed', () => {
    const habits = [
      { id: 1, name: 'Test Habit 1', done: false },
      { id: 2, name: 'Test Habit 2', done: true }
    ];
    const filteredHabits = filterHabits(habits, 'completed');
    expect(filteredHabits).toHaveLength(1);
    expect(filteredHabits[0].done).toBe(true);
  });
});
