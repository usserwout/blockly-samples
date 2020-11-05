/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Custom tooltip block extension.
 */
import * as Blockly from 'blockly/core';
import './tooltip_monkey_patch';

type TooltipRender = (block: Blockly.Block) => HTMLElement;

interface TooltipBlock extends Blockly.Block {
  customTooltip: () => HTMLElement;
}

/**
 * Register the Blockly tooltip block extension.
 * @param {!TooltipRender} tooltipRender Custom tooltip render function.
 * @param {string=} extensionName Optional extension name.
 * @return {string} The registered extension name.
 */
export const registerTooltipExtension = (tooltipRender: TooltipRender,
    extensionName = 'custom-tooltip-extension') => {
  
  // Register the tooltip extension.
  Blockly.Extensions.register(extensionName, function() {
    const block = this as TooltipBlock;
    block.customTooltip = function() {
      return tooltipRender(block);
    };
  });

  return extensionName;
};
