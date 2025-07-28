/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/python';
import * as Blockly from 'blockly/core';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['add_text'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
  
  // Generate Python code for adding text to output
  // Add a comment for better understanding
  const code = `# Add text to output\nprint(${text})\n`;
  return code;
};

forBlock['llm_query'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const model = generator.valueToCode(block, 'MODEL', Order.NONE) || 'None';
  const template = generator.valueToCode(block, 'TEMPLATE', Order.NONE) || 'None';
  const variables = generator.valueToCode(block, 'VARIABLES', Order.NONE) || '{}';
  const parser = generator.valueToCode(block, 'PARSER', Order.NONE) || 'StrOutputParser()';
  
  const code = `${parser}.invoke(${model}.invoke(${template}.format(**${variables})))`;
  
  return [code, Order.FUNCTION_CALL];
};

forBlock['create_model'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const provider = block.getFieldValue('PROVIDER');
  const modelName = generator.valueToCode(block, 'MODEL_NAME', Order.NONE) || '"gpt-3.5-turbo"';
  
  let code = '';
  if (provider === 'openai') {
    code = `ChatOpenAI(model=${modelName})`;
  }
  
  return [code, Order.FUNCTION_CALL];
};
