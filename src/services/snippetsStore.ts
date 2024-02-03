import { app } from 'electron';
import { Snippet } from '../types';
import { readFileSync, writeFileSync } from 'node:fs';
import { assign, parse, stringify } from 'comment-json';

const homeDir = app.getPath('home');

const snippetsDir = `${homeDir}/Library/Application Support/Code/User/snippets`;

export class SnippetsStore {
  static installSnippet(snippet: Snippet) {
    console.log(snippet);

    snippet.languages.split(',').forEach((lang) => {
      const snippetFile = `${snippetsDir}/${lang}.json`;
      const file = readFileSync(snippetFile, 'utf-8');

      const data = parse(file);

      const newData = assign(
        {
          [snippet.title]: {
            id: snippet.id,
            prefix: snippet.prefix,
            body: snippet.body,
            description: snippet.description,
          },
        },
        data
      );

      writeFileSync(snippetFile, stringify(newData, null, 2));
    });
  }

  static uninstallSnippet(snippet: Snippet) {}

  static isSnippetInstalled(snippet: Snippet): string[] {
    return snippet.languages.split(',').filter((lang) => {
      const snippetFile = `${snippetsDir}/${lang}.json`;
      const file = readFileSync(snippetFile, 'utf-8');
      const data = parse(file);

      if (data) {
        return Object.values(data).some((s) => s.id === snippet.id);
      } else {
        return false;
      }
    });
  }
}