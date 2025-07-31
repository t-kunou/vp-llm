/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/text';
import {forBlock} from './generators/python';
import {pythonGenerator} from 'blockly/python';
import {save, load, downloadWorkspace, importWorkspace} from './serialization';
import {toolbox} from './toolbox';
import './index.css';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(pythonGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode')?.firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const copyButton = document.getElementById('copyButton');
const exportButton = document.getElementById('exportButton');
const importButton = document.getElementById('importButton');
const toggleButton = document.getElementById('toggleButton');
const outputPane = document.getElementById('outputPane');

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}
const ws = Blockly.inject(blocklyDiv, {
  toolbox,
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  },
  zoom: {
    controls: true, // Blockly標準のズームコントロールを使用
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  trashcan: true // ゴミ箱機能を有効化
});

// Copy functionality
const copyCodeToClipboard = async () => {
  const codeElement = document.getElementById('generatedCode');
  if (!codeElement || !copyButton) return;
  
  const code = codeElement.textContent || '';
  
  try {
    await navigator.clipboard.writeText(code);
    
    // Visual feedback
    const originalText = copyButton.textContent;
    copyButton.textContent = '✓ Copied!';
    copyButton.classList.add('copied');
    
    // Reset button after 2 seconds
    setTimeout(() => {
      copyButton.textContent = originalText;
      copyButton.classList.remove('copied');
    }, 2000);
    
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Visual feedback for fallback
    const originalText = copyButton.textContent;
    copyButton.textContent = '✓ Copied!';
    copyButton.classList.add('copied');
    
    setTimeout(() => {
      copyButton.textContent = originalText;
      copyButton.classList.remove('copied');
    }, 2000);
  }
};

// Add click event listener to copy button
if (copyButton) {
  copyButton.addEventListener('click', copyCodeToClipboard);
}

// Export functionality
const exportWorkspaceToFile = () => {
  if (!ws) return;
  
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const filename = `blockly-workspace-${timestamp}.json`;
  
  downloadWorkspace(ws, filename);
  
  // Visual feedback
  if (exportButton) {
    const originalText = exportButton.textContent;
    exportButton.textContent = '✓ Exported!';
    
    setTimeout(() => {
      exportButton.textContent = originalText;
    }, 2000);
  }
};

// Import functionality
const importWorkspaceFromFile = () => {
  if (!ws) return;
  
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        const success = importWorkspace(ws, content);
        
        if (success) {
          // Save to localStorage after successful import
          save(ws);
          
          // Trigger code regeneration after import
          setTimeout(() => runCode(), 100);
        }
        
        // Visual feedback
        if (importButton) {
          const originalText = importButton.textContent;
          if (success) {
            importButton.textContent = '✓ Imported!';
          } else {
            importButton.textContent = '✗ Failed!';
          }
          
          setTimeout(() => {
            importButton.textContent = originalText;
          }, 2000);
        }
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
};

// Add click event listeners for export/import buttons
if (exportButton) {
  exportButton.addEventListener('click', exportWorkspaceToFile);
}

if (importButton) {
  importButton.addEventListener('click', importWorkspaceFromFile);
}

// Toggle panel functionality
let isPanelVisible = true;

const togglePanel = () => {
  if (!outputPane || !toggleButton) return;
  
  isPanelVisible = !isPanelVisible;
  
  if (isPanelVisible) {
    outputPane.classList.remove('hidden');
    toggleButton.textContent = '>>';
  } else {
    outputPane.classList.add('hidden');
    toggleButton.textContent = '<<';
  }
  
  // Trigger Blockly resize after animation
  setTimeout(() => {
    if (ws) {
      Blockly.svgResize(ws);
    }
  }, 300);
};

// Add click event listener to toggle button
if (toggleButton) {
  toggleButton.addEventListener('click', togglePanel);
}

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = pythonGenerator.workspaceToCode(ws as Blockly.Workspace);
  
  // Add a header comment and make it more executable
  const executableCode = `#!/usr/bin/env python3
# Generated Python code from Blockly
# You can copy this code and run it in any Python environment

${code}`;
  
  if (codeDiv) codeDiv.textContent = executableCode;

  // Clear the output div instead of showing the copy message
  if (outputDiv) {
    outputDiv.innerHTML = '';
  }

  // Note: For Python code, we just display it instead of executing it
  // eval(code);
};

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()
    ) {
      return;
    }
    runCode();
  });
}
