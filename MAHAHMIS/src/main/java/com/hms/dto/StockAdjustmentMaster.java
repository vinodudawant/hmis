package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class StockAdjustmentMaster {
	private int id;
	private String date;
	private String details;
	private String type;
	private String doc_date;
	private String dic_ref;
	private String account;
	private String status;
	private List<StockAdjustmentMaster> StockAdjustmentMasterList;
	
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("details")
	public String getDetails() {
		return details;
	}
	@JsonSetter("details")
	public void setDetails(String details) {
		this.details = details;
	}
	@JsonGetter("type")
	public String getType() {
		return type;
	}
	@JsonSetter("type")
	public void setType(String type) {
		this.type = type;
	}
	@JsonGetter("doc_date")
	public String getDoc_date() {
		return doc_date;
	}
	@JsonSetter("doc_date")
	public void setDoc_date(String doc_date) {
		this.doc_date = doc_date;
	}
	@JsonGetter("dic_ref")
	public String getDic_ref() {
		return dic_ref;
	}
	@JsonSetter("dic_ref")
	public void setDic_ref(String dic_ref) {
		this.dic_ref = dic_ref;
	}
	@JsonGetter("account")
	public String getAccount() {
		return account;
	}
	@JsonSetter("account")
	public void setAccount(String account) {
		this.account = account;
	}
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("StockAdjustmentMasterList")
	public List<StockAdjustmentMaster> getStockAdjustmentMasterList() {
		return StockAdjustmentMasterList;
	}
	@JsonSetter("StockAdjustmentMasterList")
	public void setStockAdjustmentMasterList(
			List<StockAdjustmentMaster> stockAdjustmentMasterList) {
		StockAdjustmentMasterList = stockAdjustmentMasterList;
	}

}
