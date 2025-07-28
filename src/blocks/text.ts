/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const addText = {
  type: 'add_text',
  message0: 'Add text %1',
  args0: [
    {
      type: 'input_value',
      name: 'TEXT',
      check: 'String',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: '',
  helpUrl: '',
};

// LLM Query block for LangChain integration
const llmQuery = {
  type: 'llm_query',
  message0: 'LLM Query %1 model: %2 %3 template: %4 %5 variables: %6 %7 parser: %8',
  args0: [
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'MODEL',
      check: null,
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'TEMPLATE',
      check: null,
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'VARIABLES',
      check: null,
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'PARSER',
      check: null,
    },
  ],
  output: 'String',
  colour: 290,
  tooltip: 'Query LLM using LangChain with model, template, variables, and parser (defaults to StrOutputParser)',
  helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  addText,
  llmQuery,
]);
