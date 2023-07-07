'use strict'

const { correct, Grammarly } = require('@stewartmcgown/grammarly-api');

/**
 * Use Grammarly API to correct the submitted text
 *
 * @param {String} text
 */
exports.correctText = async (text) => {
    const { corrected } = await new Grammarly().analyse(String(text)).then(correct);
    return corrected;
};