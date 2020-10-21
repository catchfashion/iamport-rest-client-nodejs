/*!
 * iamport
 * MIT Licensed
 */

'use strict';

var resource = require('../resource'),
    iamportMethod = resource.iamportMethod;

/**
 * Module exports.
 * @public
 */
module.exports = resource.extend({

  path: 'escrows/logis',

  /** method 생성
   * 에스크로 결제 건에 대한 배송정보 등록
   * @see {@link https://api.iamport.kr/#!/escrow.logis/escrow_logis_save}
   *
   * @returns {promise} json 결제 정보
   * @public
   */
  postEscrow: iamportMethod({
    method: 'POST',
    command: null,
    urlParam: 'imp_uid'
  })

});
