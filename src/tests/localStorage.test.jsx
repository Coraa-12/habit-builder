import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import App from '../App.svelte';

describe('LocalStorage Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should persist habits to localStorage', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit' } });
    await fireEvent.click(addButton);

    const savedHabits = JSON.parse(localStorage.getItem('habits'));
    expect(savedHabits).toHaveLength(1);
    expect(savedHabits[0].name).toBe('Test Habit');
  });

  it('should retrieve habits from localStorage', async () => {
    localStorage.setItem('habits', JSON.stringify([{ id: 1, name: 'Test Habit', done: false }]));
    const { getByLabelText } = render(App);

    expect(getByLabelText('Test Habit')).toBeInTheDocument();
  });

  it('should update localStorage when a habit is marked as complete', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit' } });
    await fireEvent.click(addButton);

    const checkbox = getByLabelText('Test Habit');
    await fireEvent.click(checkbox);

    const savedHabits = JSON.parse(localStorage.getItem('habits'));
    expect(savedHabits[0].done).toBe(true);
  });

  it('should update localStorage when a habit is removed', async () => {
    const { getByPlaceholderText, getByText, getByLabelText, getByRole } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit' } });
    await fireEvent.click(addButton);

    const deleteButton = getByRole('button', { name: /delete habit/i });
    await fireEvent.click(deleteButton);

    const savedHabits = JSON.parse(localStorage.getItem('habits'));
    expect(savedHabits).toHaveLength(0);
  });
});
