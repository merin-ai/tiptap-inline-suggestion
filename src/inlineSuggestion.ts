import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

// Utility function for debouncing
function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: number | null = null;

	return (...args: Parameters<T>) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => func(...args), wait);
	};
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		inlineSuggestion: {
			/**
			 * fetch inline suggestions
			 */
			fetchSuggestion: () => ReturnType;
			/**
			 * insert the current suggestion
			 */
			insertSuggestion: () => ReturnType;
		};
	}
}

export const inlineSuggestionPluginKey = new PluginKey("inlineSuggestion");

export interface InlineSuggestionOptions {
	/**
	 * fetch inline suggestions
	 *
	 * @param existingText -  existing text in the node
	 * @returns {string} - the suggestion to be shown
	 */
	fetchAutocompletion: (existingText: string) => Promise<string>;
	/**
	 * debounce time for fetching suggestions in milliseconds
	 *
	 * @default 250
	 */
	debounceTime?: number;
}

export interface InlineSuggestionStorage {
	data: {
		currentSuggestion?: string;
		nodeDetails?: {
			from: number;
			to: number;
		};
	};
	debouncedFetchSuggestion?: () => void;
}

export const InlineSuggestion = Extension.create<
	InlineSuggestionOptions,
	InlineSuggestionStorage
>({
	name: "inlineSuggestion",

	addOptions() {
		return {
			fetchAutocompletion: async () => {
				const message =
					"[@merin-ai/tiptap-inline-suggestions] Please add a fetchSuggestion function to fetch suggestions from.";

				console.warn(message);

				return message;
			},
			debounceTime: 250,
		};
	},

	addStorage() {
		return {
			data: {},
			debouncedFetchSuggestion: undefined,
		};
	},

	addCommands() {
		// Initialize debounced function if not already created
		const getDebouncedFetchSuggestion = () => {
			if (!this.storage.debouncedFetchSuggestion) {
				const actualFetchSuggestion = () => {
					const { state } = this.editor;
					const { $from } = state.selection;
					const node = $from.parent;
					const [from, to] = [$from.start() - 1, $from.end() + 1];
					const existingText = node.textContent;

					if (existingText) {
						this.options.fetchAutocompletion(existingText).then((res) => {
							const trimmedSuggestion = res.replace(/^\s+/, "");

							this.storage.data = {
								currentSuggestion: trimmedSuggestion,
								nodeDetails: {
									from,
									to,
								},
							};

							this.editor.view.dispatch(
								this.editor.view.state.tr.setMeta("addToHistory", false),
							);
						});
					}
				};

				this.storage.debouncedFetchSuggestion = debounce(
					actualFetchSuggestion,
					this.options.debounceTime || 250,
				);
			}
			return this.storage.debouncedFetchSuggestion;
		};

		return {
			fetchSuggestion:
				() =>
				({ state, chain, editor }) => {
					if (this.storage.data.currentSuggestion) {
						return chain()
							.command(() => {
								const currentSuggestion = this.storage.data.currentSuggestion;
								if (!currentSuggestion) return false;

								const chunkifiedSuggestion = currentSuggestion.split("");

								this.storage.data = {};

								for (let i = 0; i < chunkifiedSuggestion.length; i++) {
									setTimeout(
										() =>
											editor
												.chain()
												.insertContent(chunkifiedSuggestion[i])
												.focus()
												.run(),
										2 * i,
									);
								}

								return true;
							})
							.run();
					}

					getDebouncedFetchSuggestion()();
					return true;
				},
			insertSuggestion:
				() =>
				({ state, chain, editor }) => {
					const currentSuggestion = this.storage.data.currentSuggestion;
					if (!currentSuggestion) return false;

					// Clears suggestion after inserting
					this.storage.data = {};

					return chain().insertContent(currentSuggestion).run();
				},
		};
	},

	addProseMirrorPlugins() {
		const getStorage = () => this.storage;

		const fetchSuggestion = () => this.editor.commands.fetchSuggestion();

		const insertSuggestion = () => this.editor.commands.insertSuggestion();

		const handleNonTabKey = () => {
			this.storage.data = {};
		};

		return [
			new Plugin({
				key: inlineSuggestionPluginKey,
				state: {
					init() {
						return DecorationSet.empty;
					},
					apply(tr) {
						const storage = getStorage().data;

						if (storage.currentSuggestion && storage.nodeDetails) {
							const { from, to } = storage.nodeDetails;

							const decoration = Decoration.node(from, to, {
								"data-inline-suggestion": storage.currentSuggestion,
							});

							return DecorationSet.create(tr.doc, [decoration]);
						}

						return DecorationSet.empty;
					},
				},
				props: {
					decorations(state) {
						return this.getState(state);
					},
					handleKeyDown(view, event) {
						const storage = getStorage().data;

						// Insert suggestion on tab key
						if (event.key === "Tab" && storage.currentSuggestion) {
							event.preventDefault();
							insertSuggestion();
							return true;
						}

						// Clear suggestions on other keys
						if (event.key !== "Tab" && storage.currentSuggestion) {
							handleNonTabKey();
						}

						// Optionally trigger suggestion fetching on specific keys (like space or certain characters)
						if (event.key === " " || event.key === "Enter") {
							setTimeout(() => {
								fetchSuggestion();
							}, 10);
						}

						return false;
					},
				},
			}),
		];
	},
});
