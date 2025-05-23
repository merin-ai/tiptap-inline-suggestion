import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import InlineSuggestion from "@merin-ai/tiptap-inline-suggestion";

import { initContent } from "./initContent";

import "./tiptap.css";

export const Tiptap = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			InlineSuggestion.configure({
				fetchAutocompletion: async (existingText: string) => {
					console.log(
						`🚀 API Call at ${new Date().toLocaleTimeString()}: "${existingText}"`,
					);

					// Simulate API delay
					await new Promise((resolve) => setTimeout(resolve, 100));

					// Return a mock suggestion based on content
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
			}),
			Link.configure({
				autolink: true,
			}),
		],
		content: initContent,
		editorProps: {
			attributes: {
				class:
					"prose w-[768px] focus:outline-none prose-headings:font-medium prose-h2:text-3xl",
			},
		},
	});

	return (
		<div className="p-8 h-fit rounded-lg">
			<EditorContent className="focus:outline-none" editor={editor} />
		</div>
	);
};
