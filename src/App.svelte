<script>
  let habits = [];
  let newHabit = "";

  function addHabit() {
    if (newHabit.trim()) {
      habits = [...habits, { name: newHabit, done: false }];
      newHabit = "";
    }
  }
</script>

<main>
  <h1>Habit Builder</h1>
  <form on:submit|preventDefault={addHabit}>
    <input
      type="text"
      bind:value={newHabit}
      placeholder="New habit"
      autocomplete="off"
      required
    />
    <button type="submit">Add</button>
  </form>

  <ul>
    {#each habits as habit, idx}
      <li>
        <input type="checkbox" bind:checked={habit.done} />
        {habit.name}
      </li>
    {/each}
  </ul>
</main>

<style>
  main { max-width: 400px; margin: 2rem auto; padding: 1rem; border-radius: 8px; background: #f8fafc; box-shadow: 0 2px 8px rgba(0,0,0,0.06);}
  h1 { text-align: center; }
  form { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;}
  input[type="text"] { flex: 1; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;}
  button { padding: 0.5rem 1rem; border: none; background: #2563eb; color: #fff; border-radius: 4px; cursor: pointer;}
  button:hover { background: #1d4ed8;}
  ul { list-style: none; padding: 0;}
  li { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0;}
</style>