# Front-End Take-Home Assignment

Project: Song Library Widget

Tech: React + TypeScript

## Overview

You’ll build a small Song Library Widget that displays a list of songs, allows filtering by genre, and lets users perform simple actions on each song.

Your goal is to demonstrate clear React component design, TypeScript usage, state management, and basic testing.

All data should be mocked locally.

## Requirements

### 1. Data & Display

Display a list of songs in a table or card layout. Each song should show:

    Title

    Artist

    Album

    Genre

    Duration (e.g. 3:45)

Include a filter control (dropdown, tabs, or buttons) to filter by genre.

Use a mocked API function that returns data asynchronously:

// api/songs.ts

// TODO: replace with real API call later

export async function fetchSongs(): Promise<Song[]> {

await new Promise(r => setTimeout(r, 500)); // simulate network delay

return …

];

}

    Show a loading state while fetching songs.

    Show an empty state if no songs match the current filter.

    Add a search box (filter by song title).

    Add a “favorite” toggle that persists locally.

### 2. Song Actions

Each song should have two available actions:

    Add to Queue: Adds the song to a local “queue” list (you can show a small “Queued” indicator or section).

    Remove Song: Prompts for confirmation before removing the song from the list.

Example confirmation flow (simple modal or window.confirm is fine):

Are you sure you want to remove "Smooth" by Santana?

[Cancel] [Remove]

You may use React state, a context, or any simple local mechanism to manage the list and queue.

### 3. Testing

Include one or two basic tests using Jest + React Testing Library.

### 4. Deliverable

Submit a GitHub repository that can be run locally with:

npm install

npm start

npm test
