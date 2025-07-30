/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Input block for user input
const inputBlock = {
  type: 'input_block',
  message0: 'input %1',
  args0: [
    {
      type: 'input_value',
      name: 'MESSAGE',
      check: 'String',
    },
  ],
  output: 'String',
  colour: 160,
  tooltip: 'Get user input with a message prompt',
  helpUrl: '',
};

// Print block for standard output
const printBlock = {
  type: 'print_block',
  message0: 'print %1',
  args0: [
    {
      type: 'input_value',
      name: 'VALUE',
      check: null,
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: 'Print value to standard output',
  helpUrl: '',
};

// Create the block definitions for I/O blocks.
export const ioBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  inputBlock,
  printBlock,
]);
