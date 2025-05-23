<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import InlineSuggestion from '@merin-ai/tiptap-inline-suggestion';
import Link from '@tiptap/extension-link'

import { initContent } from './initContent'

const editor = useEditor({
  content: initContent,
  extensions: [
    StarterKit,
    InlineSuggestion.configure(
      {
        fetchAutocompletion: async (existingText: string) => {
          console.log(`🚀 API Call at ${new Date().toLocaleTimeString()}: "${existingText}"`);
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Return a mock suggestion
          const suggestions = [
            " and this completes your thought",
            " with some helpful context",
            " making your writing better",
            " that adds valuable information",
            " continuing this sentence naturally",
          ];
          
          return suggestions[existingText.length % suggestions.length];
        },
        debounceTime: 250, // 250ms debounce for demo purposes
      }
    ),
    Link.configure({
      autolink: true,
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose w-[768px] focus:outline-none'
    }
  }
})
</script>

<template>
  <div className='h-fit rounded-lg'>
    <EditorContent class="focus:outline-none" :editor="editor" />
  </div>
</template>

<style>
[data-inline-suggestion]::after {
  content: attr(data-inline-suggestion);
  color: #999;
}
</style>
