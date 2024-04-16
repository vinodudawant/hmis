package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class GINMaster {

	private int stock_gin_adj_master_Id;
	private int stock_grn_adj_master_Id;
	private String stock_adj_date;
	private String stock_adj_detail;
	private String stock_adj_account;
	private String TrollyName;
	private String stock_adj_doc_date;
	private String stock_adj_doc_ref;
	private List<GINMaster> listGINmaster;
	private List<GINComponant> listGINComponant;
	private int acceptFlag;

	@JsonGetter("idGinMaster")
	public int getStock_gin_adj_master_Id() {
		return stock_gin_adj_master_Id;
	}

	@JsonSetter("idGinMaster")
	public void setStock_gin_adj_master_Id(int stock_gin_adj_master_Id) {
		this.stock_gin_adj_master_Id = stock_gin_adj_master_Id;
	}

	@JsonSetter("idGrnMaster")
	public int getStock_grn_adj_master_Id() {
		return stock_grn_adj_master_Id;
	}

	@JsonSetter("idGrnMaster")
	public void setStock_grn_adj_master_Id(int stock_grn_adj_master_Id) {
		this.stock_grn_adj_master_Id = stock_grn_adj_master_Id;
	}

	@JsonGetter("ginDate")
	public String getStock_adj_date() {
		return stock_adj_date;
	}

	@JsonSetter("ginDate")
	public void setStock_adj_date(String stock_adj_date) {
		this.stock_adj_date = stock_adj_date;
	}

	@JsonGetter("ginadjDe")
	public String getStock_adj_detail() {
		return stock_adj_detail;
	}

	@JsonSetter("ginadjDe")
	public void setStock_adj_detail(String stock_adj_detail) {
		this.stock_adj_detail = stock_adj_detail;
	}

	@JsonGetter("ginAc")
	public String getstock_adj_account() {
		return stock_adj_account;
	}

	@JsonSetter("ginAc")
	public void setSstock_adj_account(String stock_adj_account) {
		this.stock_adj_account = stock_adj_account;
	}

	@JsonGetter("ginDocDate")
	public String getStock_adj_doc_date() {
		return stock_adj_doc_date;
	}

	@JsonSetter("ginDocDate")
	public void setStock_adj_doc_date(String date) {
		this.stock_adj_doc_date = date;
	}

	@JsonGetter("ginDocRef")
	public String getStock_adj_doc_ref() {
		return stock_adj_doc_ref;
	}

	@JsonSetter("ginDocRef")
	public void setStock_adj_doc_ref(String stock_adj_doc_ref) {
		this.stock_adj_doc_ref = stock_adj_doc_ref;
	}

	@JsonGetter("trollyName")
	public String getTrollyName() {
		return TrollyName;
	}

	@JsonSetter("trollyName")
	public void setTrollyName(String trollyName) {
		TrollyName = trollyName;
	}

	@JsonGetter("listGinMaster")
	public List<GINMaster> getListGINmaster() {
		return listGINmaster;
	}

	@JsonSetter("listGinMaster")
	public void setListGINmaster(List<GINMaster> listGINmaster) {
		this.listGINmaster = listGINmaster;
	}

	@JsonGetter("listGinCompo")
	public List<GINComponant> getListGINComponat() {
		return listGINComponant;
	}

	@JsonSetter("listGinCompo")
	public void setListGINComponat(List<GINComponant> listGINComponant) {
		this.listGINComponant = listGINComponant;
	}

	@JsonGetter("acceptFlag")
	public int getAcceptFlag() {
		return acceptFlag;
	}

	@JsonSetter("acceptFlag")
	public void setAcceptFlag(int acceptFlag) {
		this.acceptFlag = acceptFlag;
	}

}
