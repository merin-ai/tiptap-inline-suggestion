export const initContent = {
	type: "doc",
	content: [
		{
			type: "heading",
			attrs: {
				level: 2,
			},
			content: [
				{
					type: "text",
					text: "@merin-ai/tiptap-inline-suggestion",
				},
			],
		},
		{
			type: "paragraph",
			content: [
				{
					type: "text",
					text: "Tiptap extension with debounced API calls and improved TypeScript support. Press ",
				},
				{
					type: "text",
					marks: [
						{
							type: "code",
						},
					],
					text: "Space",
				},
				{
					type: "text",
					text: " to trigger suggestion fetching, then press ",
				},
				{
					type: "text",
					marks: [
						{
							type: "code",
						},
					],
					text: "Tab",
				},
				{
					type: "text",
					text: " to accept the suggestion.",
				},
			],
		},
		{
			type: "blockquote",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Enhanced fork by ",
						},
						{
							type: "text",
							marks: [
								{
									type: "link",
									attrs: {
										href: "https://github.com/merin-ai/",
										target: "_blank",
										class: null,
									},
								},
							],
							text: "@merin-ai",
						},
						{
							type: "text",
							text: " with debouncing, and better TypeScript support.",
						},
					],
				},
			],
		},
		{
			type: "bulletList",
			content: [
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "✨ ",
								},
								{
									type: "text",
									marks: [
										{
											type: "bold",
										},
									],
									text: "New Features:",
								},
								{
									type: "text",
									text: " Configurable debounce time (250ms default), enhanced TypeScript support, improved error handling.",
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "📦 Install: ",
								},
								{
									type: "text",
									marks: [
										{
											type: "code",
										},
									],
									text: "npm install @merin-ai/tiptap-inline-suggestion",
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "🙏 Based on awesome work by ",
								},
								{
									type: "text",
									marks: [
										{
											type: "link",
											attrs: {
												href: "https://github.com/sereneinserenade/tiptap-inline-suggestion",
												target: "_blank",
												class: null,
											},
										},
									],
									text: "@sereneinserenade/tiptap-inline-suggestion",
								},
							],
						},
					],
				},
				{
					type: "listItem",
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Give a ⭐️ to ",
								},
								{
									type: "text",
									marks: [
										{
											type: "link",
											attrs: {
												href: "https://github.com/merin-ai/tiptap-inline-suggestion",
												target: "_blank",
												class: null,
											},
										},
									],
									text: "@merin-ai/tiptap-inline-suggestion",
								},
							],
						},
					],
				},
			],
		},
	],
};
