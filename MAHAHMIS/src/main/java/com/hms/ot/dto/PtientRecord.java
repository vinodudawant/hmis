package com.hms.ot.dto;

import java.io.Serializable;

public class PtientRecord implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String trcount;
	private Integer charges_master_slave_id ;
	private Integer source_type_id;
	
	private Integer bill_details_id;
	private Integer bill_id;
	private Integer id;
	private String category_name;
	private Double quantity;
	
	public String getTrcount() {
		return trcount;
	}
	public void setTrcount(String trcount) {
		this.trcount = trcount;
	}
	public Integer getCharges_master_slave_id() {
		return charges_master_slave_id;
	}
	public void setCharges_master_slave_id(Integer charges_master_slave_id) {
		this.charges_master_slave_id = charges_master_slave_id;
	}
	public Integer getSource_type_id() {
		return source_type_id;
	}
	public void setSource_type_id(Integer source_type_id) {
		this.source_type_id = source_type_id;
	}
	public Integer getBill_details_id() {
		return bill_details_id;
	}
	public void setBill_details_id(Integer bill_details_id) {
		this.bill_details_id = bill_details_id;
	}
	public Integer getBill_id() {
		return bill_id;
	}
	public void setBill_id(Integer bill_id) {
		this.bill_id = bill_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public Double getQuantity() {
		return quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	
	
}
