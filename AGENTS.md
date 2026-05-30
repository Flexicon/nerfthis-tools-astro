# Agent Guide

Guidance for coding agents working in this repository.

## Project Intent

NerfThis Tools is a small Astro app for simple web utilities. The tools should feel direct, useful, and intentionally boring: paste something in, get the answer, move on.

Prefer small changes that match the existing app over introducing new abstractions, dependencies, or design systems.

## Commands

- Install dependencies: `npm install`
- Start dev server (only if needed or requested by the user): `npm run dev`
- Build: `npm run build`

## Testing

There is no dedicated test suite currently. Run `npm run build` after code changes.

## Implementation Style

- Follow existing Astro conventions: page files live in `src/pages`, reusable tool UI lives in `src/components`, shared shell lives in `src/layouts/Layout.astro`.
- Keep each tool self-contained unless there is a clear reason to share logic.
- Prefer client-side logic for tools that do not need server data.
- Do not add backend routes, API calls, storage, or new packages unless the feature genuinely needs them.
- Use the smallest correct implementation. Avoid speculative extensibility.
- Preserve the current Tailwind-first styling approach.

## Tool Page Pattern

Most tools should follow the existing structure:

- A route in `src/pages/<tool>.astro`.
- `export const prerender = true` for fully client-side/static tools.
- A `Layout` wrapper with a specific `<title>`.
- A centered hero section with an emoji, short title, and one-sentence description.
- A constrained content container using the same width classes as other tools:
  `px-3 mx-auto sm:w-11/12 md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-2/5`.
- A focused component in `src/components` for the interactive tool UI.
- Optional short explanatory copy below the tool when it helps set expectations.

Use `src/pages/unicode.astro`, `src/pages/tokens.astro`, `src/components/UnicodeConverter.astro`, and `src/components/TokenCounter.astro` as reference points.

## Homepage Tool Listing

The homepage contains a local `tools` array and a responsive card grid. Keep it simple and update that array when adding a new public tool.

Tool cards should remain quiet and scannable:

- Icon block on the left.
- Subtle arrow affordance on the right.
- Tool title and short description.
- No repeated visible CTA like “Open tool” on every card.
- Include screen-reader-only text such as `Open {tool.title}` inside the link.

## Voice And Copy

The site voice is practical, dry, and mildly playful. It should not sound corporate or inflated.

Good examples:

- “Pick a tool. Do the thing. Move on.”
- “Small, boring utilities that help get the job done.”
- “Paste or type text and get a live token estimate for LLM usage.”

Prefer short, plain wording. Avoid hype phrases like “powerful”, “seamless”, “revolutionary”, or “supercharge”.

## Styling

- Use Tailwind utility classes in the Astro files, consistent with the existing codebase.
- Match existing form styling for inputs, textareas, buttons, and result panels.
- Keep layouts responsive for mobile and desktop.
- Use modest hover/focus states. Make links keyboard accessible with visible focus rings.
- Do not introduce custom CSS unless a pattern is shared globally or cannot be expressed cleanly with existing utilities.

## JavaScript

- Inline `<script>` blocks in Astro components are acceptable for small client-side tools.
- Keep DOM selection and event handling straightforward.
- Prefer readable functions over clever abstractions.
- If a result is an estimate, say so clearly in the UI.

## Before Finishing

- Run `npm run build` after code changes.
- Check that new public tools are reachable from the header navigation and homepage listing.
- Avoid changing unrelated files or broad formatting unless requested.
