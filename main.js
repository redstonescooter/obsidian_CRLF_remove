"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts (or main.js)
const obsidian_1 = require("obsidian");
class CRLFRemoverPlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            // Add command to command palette
            this.addCommand({
                id: 'remove-crlf-after-spaces',
                name: 'Remove CRLF after spaces-only lines',
                editorCallback: (editor, view) => {
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
        });
    }
    onunload() {
        console.log('CRLF Remover plugin unloaded');
    }
    removeCRLFAfterSpaces(editor) {
        const selection = editor.getSelection();
        if (!selection) {
            new obsidian_1.Notice('No text selected');
            return;
        }
        // Remove CRLF from lines that start with spaces/tabs and end with CRLF
        const cleaned = selection.replace(/^[ \t]+\r?\n/gm, '');
        if (cleaned !== selection) {
            editor.replaceSelection(cleaned);
            new obsidian_1.Notice('CRLF removed from spaces-only lines');
        }
        else {
            new obsidian_1.Notice('No spaces-only lines found');
        }
    }
}
exports.default = CRLFRemoverPlugin;
