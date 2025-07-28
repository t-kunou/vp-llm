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

// LLM Model creation block
const createModel = {
  type: 'create_model',
  message0: 'Create %1 model %2 model name: %3',
  args0: [
    {
      type: 'field_dropdown',
      name: 'PROVIDER',
      options: [
        ['OpenAI', 'openai'],
      ],
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'MODEL_NAME',
      check: 'String',
    },
  ],
  output: null,
  colour: 290,
  tooltip: 'Create an LLM model instance',
  helpUrl: '',
};

// Dictionary creation block with variable length key-value pairs
const createDict = {
  type: 'create_dict',
  message0: 'create dictionary %1 %2',
  args0: [
    {
      type: 'input_dummy',
    },
    {
      type: 'input_statement',
      name: 'PAIRS',
    },
  ],
  output: null,
  colour: 290,
  tooltip: 'Create a dictionary with key-value pairs',
  helpUrl: '',
};

// Dictionary pair block (used inside the dictionary block)
const dictPair = {
  type: 'dict_pair',
  message0: 'key: %1 value: %2',
  args0: [
    {
      type: 'input_value',
      name: 'KEY',
      check: 'String',
    },
    {
      type: 'input_value',
      name: 'VALUE',
      check: null,
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 290,
  tooltip: 'A key-value pair for dictionary',
  helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  addText,
  llmQuery,
  createModel,
  createDict,
  dictPair,
]);
