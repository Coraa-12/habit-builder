import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import App from '../App.svelte';

describe('Edge Cases', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should not add an empty habit', async () => {
    const { getByPlaceholderText, getByText } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: '' } });
    await fireEvent.click(addButton);

    const savedHabits = JSON.parse(localStorage.getItem('habits'));
    expect(savedHabits).toHaveLength(0);
  });

  it('should not add a duplicate habit', async () => {
    const { getByPlaceholderText, getByText } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit' } });
    await fireEvent.click(addButton);

    await fireEvent.input(input, { target: { value: 'Test Habit' } });
    await fireEvent.click(addButton);

    const savedHabits = JSON.parse(localStorage.getItem('habits'));
    expect(savedHabits).toHaveLength(1);
  });

  it('should handle long habit names', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');
    const longHabitName = 'A'.repeat(100);

    await fireEvent.input(input, { target: { value: longHabitName } });
    await fireEvent.click(addButton);

    expect(getByLabelText(longHabitName)).toBeInTheDocument();
  });

  it('should handle special characters in habit names', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');
    const specialCharHabitName = '!@#$%^&*()_+';

    await fireEvent.input(input, { target: { value: specialCharHabitName } });
    await fireEvent.click(addButton);

    expect(getByLabelText(specialCharHabitName)).toBeInTheDocument();
  });
});
