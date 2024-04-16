package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class BillAdvAmt {

	private int bill_advance_amt_id;
	private int bill_id;
	private String date;
	private String time;
	private String recp_no;
	private String heading;
	private float amount;
	private String refund_flag;
	private String convert_Flag;
	private float refund_amount;
	private float balance_amount;
	private String common_Advance_Flag;
	private String billtype;
	private String bill_advance_type;
	
	private String card_no;
	private List<OPDReceiptMaster> billOpdReceipt;
	
	@JsonGetter("opdbilllist")
	public List<OPDReceiptMaster> getBillOpdReceipt() {
		return billOpdReceipt;
	}
	@JsonSetter("opdbilllist")
	public void setBillOpdReceipt(List<OPDReceiptMaster> billOpdReceipt) {
		this.billOpdReceipt = billOpdReceipt;
	}

	@JsonGetter("cno")
	public String getCard_no() {
		return card_no;
	}

	@JsonSetter("cno")
	public void setCard_no(String card_no) {
		this.card_no = card_no;
	}

	private List<BillAdvAmt> BillAdvAmtLi;

	@JsonGetter("baali")
	public List<BillAdvAmt> getBillAdvAmtLi() {
		return BillAdvAmtLi;
	}

	@JsonSetter("baali")
	public void setBillAdvAmtLi(List<BillAdvAmt> billAdvAmtLi) {
		BillAdvAmtLi = billAdvAmtLi;
	}

	@JsonGetter("baaid")
	public int getBill_advance_amt_id() {
		return bill_advance_amt_id;
	}

	@JsonSetter("baaid")
	public void setBill_advance_amt_id(int bill_advance_amt_id) {
		this.bill_advance_amt_id = bill_advance_amt_id;
	}

	@JsonGetter("bid")
	public int getBill_id() {
		return bill_id;
	}

	@JsonSetter("bid")
	public void setBill_id(int bill_id) {
		this.bill_id = bill_id;
	}

	@JsonGetter("date")
	public String getDate() {
		return date;
	}

	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	
	@JsonGetter("time")
	public String getTime() {
		return time;
	}

	@JsonSetter("time")
	public void setTime(String time) {
		this.time = time;
	}

	@JsonGetter("reno")
	public String getRecp_no() {
		return recp_no;
	}

	@JsonSetter("reno")
	public void setRecp_no(String recp_no) {
		this.recp_no = recp_no;
	}

	@JsonGetter("head")
	public String getHeading() {
		return heading;
	}

	@JsonSetter("head")
	public void setHeading(String heading) {
		this.heading = heading;
	}

	@JsonGetter("amt")
	public float getAmount() {
		return amount;
	}

	@JsonSetter("amt")
	public void setAmount(float f) {
		this.amount = f;
	}
	
	@JsonGetter("refdflag")
	public String getRefund_flag() {
		return refund_flag;
	}
	@JsonSetter("refdflag")
	public void setRefund_flag(String refund_flag) {
		this.refund_flag = refund_flag;
	}
	@JsonGetter("cvrtflag")
	public String getConvert_Flag() {
		return convert_Flag;
	}
	@JsonSetter("cvrtflag")
	public void setConvert_Flag(String convert_Flag) {
		this.convert_Flag = convert_Flag;
	}
	@JsonGetter("refamt")
	public float getRefund_amount() {
		return refund_amount;
	}
	@JsonSetter("refamt")
	public void setRefund_amount(float refund_amount) {
		this.refund_amount = refund_amount;
	}
	@JsonGetter("balamt")
	public float getBalance_amount() {
		return balance_amount;
	}
	@JsonSetter("balamt")
	public void setBalance_amount(float balance_amount) {
		this.balance_amount = balance_amount;
	}
	
	@JsonGetter("common_Advance_Flag")
	public String getCommon_Advance_Flag() {
		return common_Advance_Flag;
	}
	@JsonSetter("common_Advance_Flag")
	public void setCommon_Advance_Flag(String common_Advance_Flag) {
		this.common_Advance_Flag = common_Advance_Flag;
	}
	@JsonGetter("billtype")
	public String getBilltype() {
		return billtype;
	}
	@JsonSetter("billtype")
	public void setBilltype(String billtype) {
		this.billtype = billtype;
	}
	@JsonGetter("bill_advance_type")
	public String getBill_advance_type() {
		return bill_advance_type;
	}
	@JsonSetter("bill_advance_type")
	public void setBill_advance_type(String bill_advance_type) {
		this.bill_advance_type = bill_advance_type;
	}

	

}
