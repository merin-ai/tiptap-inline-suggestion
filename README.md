# Tiptap Inline Suggestion

![npm downloads](https://img.shields.io/npm/dt/%40merin-ai%2Ftiptap-inline-suggestion?style=for-the-badge&logo=npm&color=black)

A Tiptap extension that provides AI-powered inline suggestions with debounced API calls and tab-to-complete functionality.

> **Note**: This package is a fork of `@sereneinserenade/tiptap-inline-suggestion` with significant improvements including debouncing, better TypeScript support, and enhanced suggestion handling.

<!-- **Live Demo**: https://sereneinserenade.github.io/tiptap-inline-suggestion/ -->

<details open>
<summary> Video Demo </summary>

</details>

## Installation

```bash
npm install @merin-ai/tiptap-inline-suggestion
```

## Usage

Add `InlineSuggestion` extension to your list of extension for tiptap. Add a `fetchAutocompletion` function to the configuration object. This function should return a string. This string will be shown as a suggestion to the user.

Add styles to show the suggestion that gets stored in the attribute `data-inline-suggestion`. Below are styles I used for the demo, adjust it to your liking.

```ts
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import InlineSuggestion from "@merin-ai/tiptap-inline-suggestion";

const editor = new Editor({
  extensions: [
    StarterKit,
    // add InlineSuggestions to the array of tiptap extensions
    InlineSuggestion.configure({
      fetchAutocompletion: async (query) => {
        // make request to your API or something else
        const res = await fetch(`YOUR_API_ENDPOINT?query=${query}`);

        const stringRes = res.suggestion; // or whatever your API returns

        return stringRes; // return value should always be a string
      },
      debounceTime: 250, // optional: debounce API calls (default: 250ms)
    }),
  ],
});
```

```css
[data-inline-suggestion]::after {
  content: attr(data-inline-suggestion);
  color: #999;
}
```

## Configuration Options

| Option                | Type                                 | Default  | Description                                                                             |
| --------------------- | ------------------------------------ | -------- | --------------------------------------------------------------------------------------- |
| `fetchAutocompletion` | `(query: string) => Promise<string>` | Required | Function that fetches suggestions from your API                                         |
| `debounceTime`        | `number`                             | `250`    | Milliseconds to wait before making API calls (prevents excessive requests while typing) |

## How It Works

1. **User types text** → Normal editing experience
2. **User presses Space/Enter** → Triggers suggestion fetching (debounced)
3. **Suggestion appears** → Gray text displayed after cursor
4. **User presses Tab** → Accepts and inserts the suggestion
5. **User continues typing** → Suggestion is cleared

The debouncing prevents excessive API calls when users type quickly, saving costs and improving performance.

## Features

- ✅ **Debounced API calls** - Configurable debounce time (default 250ms)
- ✅ **Tab to complete** - Intuitive suggestion acceptance
- ✅ **TypeScript support** - Full type safety and IntelliSense
- ✅ **Framework agnostic** - Works with React, Vue, or vanilla JS

## Credits

This package is forked from [`@sereneinserenade/tiptap-inline-suggestion`](https://github.com/sereneinserenade/tiptap-inline-suggestion) by [Jeet Mandaliya](https://github.com/sereneinserenade).

**Enhancements in this fork:**

- Added configurable debouncing for API calls
- Improved TypeScript support and type safety
- Better error handling and null checks
- Enhanced documentation

## License

MIT © Merin AI
