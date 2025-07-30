/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// LLM Query block for LangChain integration
const llmQuery = {
  type: 'llm_query',
  message0: 'LLM Query %1 model: %2 %3 template: %4 %5 variables: %6 %7 optional_parser: %8',
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
      name: 'OPTIONAL_PARSER',
      check: null,
    },
  ],
  output: 'String',
  colour: 290,
  tooltip: 'Query LLM using LangChain with model, template, variables, and optional parser (default: StrOutputParser)',
  helpUrl: '',
};

// LLM Model creation block
const createModel = {
  type: 'create_model',
  message0: 'Create %1 model %2 model name: %3 %4 optional_temperature: %5',
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
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'OPTIONAL_TEMPERATURE',
      check: 'Number',
    },
  ],
  output: null,
  colour: 290,
  tooltip: 'Create an LLM model instance with optional temperature setting (default: 0.7)',
  helpUrl: '',
};

// LLM Message creation block
const createMessage = {
  type: 'create_message',
  message0: 'Create %1 %2 content: %3',
  args0: [
    {
      type: 'field_dropdown',
      name: 'MESSAGE_TYPE',
      options: [
        ['system', 'system'],
        ['human', 'human'],
        ['ai', 'ai'],
      ],
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'CONTENT',
      check: 'String',
    },
  ],
  output: null,
  previousStatement: null,
  nextStatement: null,
  colour: 290,
  tooltip: 'Create a message for LLM conversation',
  helpUrl: '',
};

// ChatPromptTemplate creation block
const createChatPromptTemplate = {
  type: 'create_chat_prompt_template',
  message0: 'Create ChatPromptTemplate %1 %2',
  args0: [
    {
      type: 'input_dummy',
    },
    {
      type: 'input_statement',
      name: 'MESSAGES',
    },
  ],
  output: null,
  colour: 290,
  tooltip: 'Create a ChatPromptTemplate from multiple messages',
  helpUrl: '',
};

// LLM Chain creation block
const createChain = {
  type: 'create_chain',
  message0: 'Create Chain %1 template: %2 %3 model: %4 %5 optional_parser: %6',
  args0: [
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
      name: 'MODEL',
      check: null,
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'OPTIONAL_PARSER',
      check: null,
    },
  ],
  output: null,
  colour: 290,
  tooltip: 'Create a LangChain chain with template, model, and optional parser (default: StrOutputParser)',
  helpUrl: '',
};

// LLM Chain invoke block
const invokeChain = {
  type: 'invoke_chain',
  message0: 'Invoke Chain %1 chain: %2 %3 variables: %4',
  args0: [
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'CHAIN',
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
  ],
  output: 'String',
  colour: 290,
  tooltip: 'Invoke a LangChain chain with variables',
  helpUrl: '',
};

// RunnableWithMessageHistory creation block
const createRunnableWithMessageHistory = {
  type: 'create_runnable_with_message_history',
  message0: 'Create RunnableWithMessageHistory',
  message1: 'chain: %1',
  message2: 'optional_get_session_history: %1',
  message3: 'optional_input_messages_key: %1',
  message4: 'optional_history_messages_key: %1',
  args1: [
    {
      type: 'input_value',
      name: 'CHAIN',
      check: null,
    },
  ],
  args2: [
    {
      type: 'input_value',
      name: 'OPTIONAL_GET_SESSION_HISTORY',
      check: null,
    },
  ],
  args3: [
    {
      type: 'input_value',
      name: 'OPTIONAL_INPUT_MESSAGES_KEY',
      check: 'String',
    },
  ],
  args4: [
    {
      type: 'input_value',
      name: 'OPTIONAL_HISTORY_MESSAGES_KEY',
      check: 'String',
    },
  ],
  output: null,
  colour: 290,
  tooltip: 'Create a RunnableWithMessageHistory with chain and optional history configuration (defaults: get_session_history, input, history)',
  helpUrl: '',
};

// MessagesPlaceholder creation block
const createMessagesPlaceholder = {
  type: 'create_messages_placeholder',
  message0: 'Create MessagesPlaceholder %1 optional_variable_name: %2',
  args0: [
    {
      type: 'input_dummy',
    },
    {
      type: 'input_value',
      name: 'OPTIONAL_VARIABLE_NAME',
      check: 'String',
    },
  ],
  output: null,
  previousStatement: null,
  nextStatement: null,
  colour: 290,
  tooltip: 'Create a MessagesPlaceholder with optional variable name (default: history)',
  helpUrl: '',
};

// Create the block definitions for LLM blocks.
export const llmBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  llmQuery,
  createModel,
  createMessage,
  createChatPromptTemplate,
  createChain,
  invokeChain,
  createRunnableWithMessageHistory,
  createMessagesPlaceholder,
]);
