/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

const storageKey = 'mainWorkspace';

/**
 * Saves the state of the workspace to browser's local storage.
 * @param workspace Blockly workspace to save.
 */
export const save = function (workspace: Blockly.Workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param workspace Blockly workspace to load into.
 */
export const load = function (workspace: Blockly.Workspace) {
  const data = window.localStorage?.getItem(storageKey);
  if (!data) return;

  // Don't emit events during loading.
  Blockly.Events.disable();
  Blockly.serialization.workspaces.load(JSON.parse(data), workspace, undefined);
  Blockly.Events.enable();
};

/**
 * Exports the workspace to a JSON string for file download.
 * @param workspace Blockly workspace to export.
 * @returns JSON string representation of the workspace.
 */
export const exportWorkspace = function (workspace: Blockly.Workspace): string {
  const data = Blockly.serialization.workspaces.save(workspace);
  return JSON.stringify(data, null, 2); // Pretty-printed JSON
};

/**
 * Imports workspace from JSON string.
 * @param workspace Blockly workspace to import into.
 * @param jsonString JSON string representation of the workspace.
 * @returns boolean indicating success or failure.
 */
export const importWorkspace = function (workspace: Blockly.Workspace, jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    
    // Clear existing workspace first
    workspace.clear();
    
    // Don't emit events during loading.
    Blockly.Events.disable();
    Blockly.serialization.workspaces.load(data, workspace, undefined);
    Blockly.Events.enable();
    
    // Fire a change event to trigger auto-save and code generation
    setTimeout(() => {
      Blockly.Events.fire(new Blockly.Events.FinishedLoading(workspace));
    }, 50);
    
    return true;
  } catch (error) {
    console.error('Failed to import workspace:', error);
    return false;
  }
};

/**
 * Downloads workspace as a JSON file.
 * @param workspace Blockly workspace to export.
 * @param filename Optional filename (default: 'blockly-workspace.json').
 */
export const downloadWorkspace = function (workspace: Blockly.Workspace, filename: string = 'blockly-workspace.json') {
  const jsonString = exportWorkspace(workspace);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the object URL
  URL.revokeObjectURL(url);
};
