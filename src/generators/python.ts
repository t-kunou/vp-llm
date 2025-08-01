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

forBlock['input_block'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || '""';
  
  const code = `input(${message})`;
  
  return [code, Order.FUNCTION_CALL];
};

forBlock['print_block'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '""';
  
  const code = `print(${value})\n`;
  return code;
};

forBlock['llm_query'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const model = generator.valueToCode(block, 'MODEL', Order.NONE) || 'None';
  const template = generator.valueToCode(block, 'TEMPLATE', Order.NONE) || 'None';
  const variables = generator.valueToCode(block, 'VARIABLES', Order.NONE) || '{}';
  const parser = generator.valueToCode(block, 'OPTIONAL_PARSER', Order.NONE) || 'StrOutputParser()';
  
  const code = `(${template} | ${model} | ${parser}).invoke(${variables})`;
  
  return [code, Order.FUNCTION_CALL];
};

forBlock['create_model'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const provider = block.getFieldValue('PROVIDER');
  const modelName = generator.valueToCode(block, 'MODEL_NAME', Order.NONE) || '"gpt-3.5-turbo"';
  const temperature = generator.valueToCode(block, 'OPTIONAL_TEMPERATURE', Order.NONE) || '0.7';
  
  let code = '';
  if (provider === 'openai') {
    code = `ChatOpenAI(model=${modelName}, temperature=${temperature})`;
  }
  
  return [code, Order.FUNCTION_CALL];
};

forBlock['create_message'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const messageType = block.getFieldValue('MESSAGE_TYPE');
  const content = generator.valueToCode(block, 'CONTENT', Order.NONE) || '""';
  
  const code = `('${messageType}', ${content})\n`;
  
  return code;
};

forBlock['create_chat_prompt_template'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const messages = generator.statementToCode(block, 'MESSAGES');
  
  if (messages) {
    // Extract messages from the statement code
    const lines = messages.trim().split('\n');
    const messageItems = lines
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .join(', ');
    
    const code = `ChatPromptTemplate.from_messages([${messageItems}])`;
    return [code, Order.FUNCTION_CALL];
  } else {
    return ['ChatPromptTemplate.from_messages([])', Order.FUNCTION_CALL];
  }
};

forBlock['create_dict'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const pairs = generator.statementToCode(block, 'PAIRS');
  
  if (pairs) {
    // Extract key-value pairs from the statement code and ensure proper comma separation
    const lines = pairs.trim().split('\n');
    const dictItems = lines
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .join(', ');
    
    const code = `{${dictItems}}`;
    return [code, Order.ATOMIC];
  } else {
    return ['{}', Order.ATOMIC];
  }
};

forBlock['dict_pair'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 'None';
  
  const code = `${key}: ${value}\n`;
  return code;
};

forBlock['dict_length'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, 'DICT', Order.NONE) || '{}';
  const code = `len(${dict})`;
  return [code, Order.FUNCTION_CALL];
};

forBlock['dict_is_empty'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, 'DICT', Order.NONE) || '{}';
  const code = `len(${dict}) == 0`;
  return [code, Order.RELATIONAL];
};

forBlock['dict_has_key'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, 'DICT', Order.NONE) || '{}';
  const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
  const code = `${key} in ${dict}`;
  return [code, Order.RELATIONAL];
};

forBlock['dict_keys'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, 'DICT', Order.NONE) || '{}';
  const code = `list(${dict}.keys())`;
  return [code, Order.FUNCTION_CALL];
};

forBlock['dict_get'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, 'DICT', Order.NONE) || '{}';
  const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
  const code = `${dict}[${key}]`;
  return [code, Order.MEMBER];
};

forBlock['dict_delete'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, 'DICT', Order.NONE) || '{}';
  const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
  const code = `del ${dict}[${key}]\n`;
  return code;
};

forBlock['dict_add'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, 'DICT', Order.NONE) || '{}';
  const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 'None';
  const code = `${dict}[${key}] = ${value}\n`;
  return code;
};

forBlock['create_chain'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const template = generator.valueToCode(block, 'TEMPLATE', Order.NONE) || 'None';
  const model = generator.valueToCode(block, 'MODEL', Order.NONE) || 'None';
  const parser = generator.valueToCode(block, 'OPTIONAL_PARSER', Order.NONE) || 'StrOutputParser()';
  
  const code = `${template} | ${model} | ${parser}`;
  
  return [code, Order.BITWISE_OR];
};

forBlock['invoke_chain'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const chain = generator.valueToCode(block, 'CHAIN', Order.NONE) || 'None';
  const variables = generator.valueToCode(block, 'VARIABLES', Order.NONE) || '{}';
  
  const code = `(${chain}).invoke(${variables})`;
  
  return [code, Order.FUNCTION_CALL];
};

forBlock['create_runnable_with_message_history'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const chain = generator.valueToCode(block, 'CHAIN', Order.NONE) || 'None';
  const getSessionHistory = generator.valueToCode(block, 'OPTIONAL_GET_SESSION_HISTORY', Order.NONE) || 'get_session_history';
  const inputMessagesKey = generator.valueToCode(block, 'OPTIONAL_INPUT_MESSAGES_KEY', Order.NONE) || '"input"';
  const historyMessagesKey = generator.valueToCode(block, 'OPTIONAL_HISTORY_MESSAGES_KEY', Order.NONE) || '"history"';
  
  const code = `RunnableWithMessageHistory(${chain}, ${getSessionHistory}, input_messages_key=${inputMessagesKey}, history_messages_key=${historyMessagesKey})`;
  
  return [code, Order.FUNCTION_CALL];
};

forBlock['create_messages_placeholder'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const variableName = generator.valueToCode(block, 'OPTIONAL_VARIABLE_NAME', Order.NONE) || '"history"';
  
  const code = `MessagesPlaceholder(variable_name=${variableName})`;
  
  return code;
};

forBlock['invoke_runnable_with_message_history'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const runnable = generator.valueToCode(block, 'RUNNABLE', Order.NONE) || 'None';
  const variables = generator.valueToCode(block, 'VARIABLES', Order.NONE) || '{}';
  const config = generator.valueToCode(block, 'CONFIG', Order.NONE) || '{}';
  
  const code = `(${runnable}).invoke(${variables}, config=${config})`;
  
  return [code, Order.FUNCTION_CALL];
};
