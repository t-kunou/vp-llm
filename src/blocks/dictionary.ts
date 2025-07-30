/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

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

// Dictionary add/set key-value block
const dictAdd = {
  type: 'dict_add',
  message0: 'in %1 set key %2 to value %3',
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
    {
      type: 'input_value',
      name: 'VALUE',
      check: null,
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 290,
  tooltip: 'Adds or updates a key-value pair in the dictionary',
  helpUrl: '',
};

// Create the block definitions for Dictionary blocks.
export const dictionaryBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  createDict,
  dictPair,
  dictLength,
  dictIsEmpty,
  dictHasKey,
  dictKeys,
  dictGet,
  dictDelete,
  dictAdd,
]);
