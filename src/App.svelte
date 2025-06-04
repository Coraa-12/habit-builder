<script>
  import { onMount } from "svelte";
  let habits = [];
  let newHabit = "";
  let isInitialized = false;
  let darkMode = false; // Dark mode state

  // ← New: filter state
  let filter = "all";

  onMount(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      habits = JSON.parse(savedHabits);
    }
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      darkMode = JSON.parse(savedDarkMode);
    }
    isInitialized = true;
  });

  $: if (isInitialized) {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }

  // Update body class when darkMode changes
  $: if (isInitialized && typeof document !== 'undefined') {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  function toggleDarkMode() {
    darkMode = !darkMode;
  }

  function addHabit() {
  if (newHabit.trim()) {
    habits = [...habits, { id: Date.now(), name: newHabit, done: false }];
    newHabit = "";
  }
}

  // ← New: remove by index
  function removeHabit(id) {
  habits = habits.filter(h => h.id !== id);
}

  // ← New: derive filtered list
  $: filteredHabits = habits.filter((h) => {
    if (filter === "active") return !h.done;
    if (filter === "completed") return h.done;
    return true;
  });
</script>

<main class:dark={darkMode}>
  <h1>Habit Builder</h1>

  <!-- ← New: filter buttons -->
  <div class="filters">
    <button
      class:selected={filter === "all"}
      on:click={() => (filter = "all")}
    >All</button>
    <button
      class:selected={filter === "active"}
      on:click={() => filter = "active"}
    >Active</button>
    <button
      class:selected={filter === "completed"}
      on:click={() => filter = "completed"}
    >Completed</button>
    <button on:click={toggleDarkMode}>
      {darkMode ? "Light" : "Dark"} Mode
    </button>
  </div>

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
  {#each filteredHabits as habit (habit.id)}
    <li>
      <input type="checkbox" bind:checked={habit.done} />
      <span class:done={habit.done}>{habit.name}</span>
      <!-- delete button -->
      <button class="delete" on:click={() => removeHabit(habit.id)} aria-label="Delete habit">
        ✕
      </button>
    </li>
  {/each}
</ul>
</main>

<style>
  main {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 16px rgba(0,0,0,0.10);
    font-family: system-ui, sans-serif;
  }
  h1 {
    text-align: center;
    margin-bottom: 1.2rem;
    font-size: 2rem;
    background: none;
    color: #2563eb;
    font-weight: 800;
    letter-spacing: .5px;
  }
  form {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.2rem;
  }
  input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    background: #f3f4f6;
    color: #222;
    font-size: 1rem;
    transition: border 0.2s;
  }
  input[type="text"]:focus {
    border: 1.5px solid #2563eb;
    outline: none;
    background: #fff;
  }
  button {
    padding: 0.5rem 1.1rem;
    border: none;
    background: #2563eb;
    color: #fff;
    border-radius: 4px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  button:hover, button:focus {
    background: #1749b1;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  input[type="checkbox"] {
    accent-color: #2563eb;
    width: 1rem;
    height: 1rem;
  }
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0;
    font-size: 1rem;
    color: #222;
  }
  /* Strike-through when done */
  .done {
    text-decoration: line-through;
    opacity: 0.6;
  }
  /* Delete button styles */
  .delete {
    margin-left: auto;
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  .delete:hover {
    color: #e11d48; /* red-ish */
  }
  .filters {
  display: inline-flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin: 0 auto 1rem;
}

.filters button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #2563eb;
  border-radius: 9999px;
  color: #2563eb;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.filters button:hover {
  background: rgba(37, 99, 235, 0.1);
}

.filters button.selected {
  background: #2563eb;
  color: #fff;
}

/* Dark Mode Styles */
main.dark {
  background: #1f2937; /* dark gray */
  color: #f3f4f6; /* light gray */
}
main.dark h1 {
  color: #60a5fa; /* lighter blue */
}
main.dark input[type="text"] {
  background: #374151; /* darker gray */
  color: #f3f4f6;
  border-color: #4b5563; /* medium gray */
}
main.dark input[type="text"]:focus {
  border-color: #60a5fa;
  background: #4b5563;
}
main.dark button {
  background: #60a5fa;
  color: #1f2937;
}
main.dark button:hover, main.dark button:focus {
  background: #3b82f6; /* slightly darker blue */
}
main.dark .filters button {
  border-color: #60a5fa;
  color: #60a5fa;
}
main.dark .filters button:hover {
  background: rgba(96, 165, 250, 0.1);
}
main.dark .filters button.selected {
  background: #60a5fa;
  color: #1f2937;
}
main.dark li {
  color: #f3f4f6;
}
main.dark .delete:hover {
  color: #f87171; /* lighter red */
}
</style>