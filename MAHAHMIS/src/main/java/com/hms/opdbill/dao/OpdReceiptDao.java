package com.hms.opdbill.dao;

import com.hms.opdbill.dto.OpdReceiptMasterDto;

public interface OpdReceiptDao {

	OpdReceiptMasterDto saveOpdBillReceipt(OpdReceiptMasterDto objDto);
}
