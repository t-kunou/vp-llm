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

// Dictionary length block
const dictLength = {
  type: 'dict_length',
  message0: 'length of %1',
  args0: [
    {
      type: 'input_value',
      name: 'DICT',
      check: null,
    },
  ],
  output: 'Number',
  colour: 290,
  tooltip: 'Returns the number of items in the dictionary',
  helpUrl: '',
};

// Dictionary is empty block
const dictIsEmpty = {
  type: 'dict_is_empty',
  message0: '%1 is empty',
  args0: [
    {
      type: 'input_value',
      name: 'DICT',
      check: null,
    },
  ],
  output: 'Boolean',
  colour: 290,
  tooltip: 'Returns true if the dictionary is empty',
  helpUrl: '',
};

// Dictionary has key block
const dictHasKey = {
  type: 'dict_has_key',
  message0: '%1 has key %2',
  args0: [
    {
      type: 'input_value',
      name: 'DICT',
      check: null,
    },
    {
      type: 'input_value',
      name: 'KEY',
      check: 'String',
    },
  ],
  output: 'Boolean',
  colour: 290,
  tooltip: 'Returns true if the dictionary contains the specified key',
  helpUrl: '',
};

// Dictionary keys block
const dictKeys = {
  type: 'dict_keys',
  message0: 'keys of %1',
  args0: [
    {
      type: 'input_value',
      name: 'DICT',
      check: null,
    },
  ],
  output: 'Array',
  colour: 290,
  tooltip: 'Returns a list of all keys in the dictionary',
  helpUrl: '',
};

// Dictionary get value block
const dictGet = {
  type: 'dict_get',
  message0: 'get %1 from %2',
  args0: [
    {
      type: 'input_value',
      name: 'KEY',
      check: 'String',
    },
    {
      type: 'input_value',
      name: 'DICT',
      check: null,
    },
  ],
  output: null,
  colour: 290,
  tooltip: 'Returns the value for the specified key',
  helpUrl: '',
};

// Dictionary delete key block
const dictDelete = {
  type: 'dict_delete',
  message0: 'delete key %1 from %2',
  args0: [
    {
      type: 'input_value',
      name: 'KEY',
      check: 'String',
    },
    {
      type: 'input_value',
      name: 'DICT',
      check: null,
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 290,
  tooltip: 'Deletes the specified key from the dictionary',
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
  dictLength,
  dictIsEmpty,
  dictHasKey,
  dictKeys,
  dictGet,
  dictDelete,
]);
