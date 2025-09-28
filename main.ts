// main.ts (or main.js)
import { Plugin, Editor, MarkdownView, Notice } from 'obsidian';

export default class CRLFRemoverPlugin extends Plugin {
    async onload() {
        // Add command to command palette
        this.addCommand({
            id: 'remove-crlf-after-spaces',
            name: 'Remove CRLF after spaces-only lines',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.removeCRLFAfterSpaces(editor);
            },
            hotkeys: [
                {
                    modifiers: ['Ctrl', 'Shift'],
                    key: 'r'
                }
            ]
        });

        console.log('CRLF Remover plugin loaded');
    }

    onunload() {
        console.log('CRLF Remover plugin unloaded');
    }

    removeCRLFAfterSpaces(editor: Editor) {
        const selection = editor.getSelection();
        
        if (!selection) {
            new Notice('No text selected');
            return;
        }

        // Remove CRLF from lines that start with spaces/tabs and end with CRLF
        const cleaned = selection.replace(/^[ \t]+\r?\n/gm, '');
        
        if (cleaned !== selection) {
            editor.replaceSelection(cleaned);
            new Notice('CRLF removed from spaces-only lines');
        } else {
            new Notice('No spaces-only lines found');
        }
    }
}