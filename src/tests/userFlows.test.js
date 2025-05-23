import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import App from '../App.svelte';

describe('User Flows', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a new habit', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit' } });
    await fireEvent.click(addButton);

    expect(getByLabelText('Test Habit')).toBeInTheDocument();
  });

  it('should remove a habit', async () => {
    const { getByPlaceholderText, getByText, getByLabelText, getByRole } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit' } });
    await fireEvent.click(addButton);

    const deleteButton = getByRole('button', { name: /delete habit/i });
    await fireEvent.click(deleteButton);

    expect(getByLabelText('Test Habit')).not.toBeInTheDocument();
  });

  it('should mark a habit as complete', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit' } });
    await fireEvent.click(addButton);

    const checkbox = getByLabelText('Test Habit');
    await fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should filter habits by active', async () => {
    const { getByPlaceholderText, getByText, getByLabelText, getByRole } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit 1' } });
    await fireEvent.click(addButton);

    await fireEvent.input(input, { target: { value: 'Test Habit 2' } });
    await fireEvent.click(addButton);

    const checkbox = getByLabelText('Test Habit 2');
    await fireEvent.click(checkbox);

    const activeButton = getByRole('button', { name: /active/i });
    await fireEvent.click(activeButton);

    expect(getByLabelText('Test Habit 1')).toBeInTheDocument();
    expect(getByLabelText('Test Habit 2')).not.toBeInTheDocument();
  });

  it('should filter habits by completed', async () => {
    const { getByPlaceholderText, getByText, getByLabelText, getByRole } = render(App);
    const input = getByPlaceholderText('New habit');
    const addButton = getByText('Add');

    await fireEvent.input(input, { target: { value: 'Test Habit 1' } });
    await fireEvent.click(addButton);

    await fireEvent.input(input, { target: { value: 'Test Habit 2' } });
    await fireEvent.click(addButton);

    const checkbox = getByLabelText('Test Habit 2');
    await fireEvent.click(checkbox);

    const completedButton = getByRole('button', { name: /completed/i });
    await fireEvent.click(completedButton);

    expect(getByLabelText('Test Habit 1')).not.toBeInTheDocument();
    expect(getByLabelText('Test Habit 2')).toBeInTheDocument();
  });
});
