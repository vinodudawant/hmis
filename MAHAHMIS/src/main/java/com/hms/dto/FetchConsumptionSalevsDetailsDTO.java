package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class FetchConsumptionSalevsDetailsDTO {
	
	private Integer inv_consumption_item_info_slave_id;
	private Integer inv_consumption_master_id;
	
	 private String inv_consumption_info_slave_item_name;
	 private Integer inv_consumption_item_info_slave_item_code;
	 private Integer inv_consumption_item_info_slave_item_qty;
	
	 private String inv_consumption_item_info_slave_uom;
	 private String inv_consumption_item_info_consumption_status;
	 private List<FetchConsumptionSalevsDetailsDTO>ltFetchConsumptionSalevsDetailsDTO;
	 
	 @JsonGetter("inv_consumption_item_info_slave_id")
	public Integer getInv_consumption_item_info_slave_id() {
		return inv_consumption_item_info_slave_id;
	}
	 @JsonSetter("inv_consumption_item_info_slave_id")
	public void setInv_consumption_item_info_slave_id(
			Integer inv_consumption_item_info_slave_id) {
		this.inv_consumption_item_info_slave_id = inv_consumption_item_info_slave_id;
	}
	@JsonGetter("inv_consumption_master_id")
	public Integer getInv_consumption_master_id() {
		return inv_consumption_master_id;
	}
	@JsonSetter("inv_consumption_master_id")
	public void setInv_consumption_master_id(Integer inv_consumption_master_id) {
		this.inv_consumption_master_id = inv_consumption_master_id;
	}
	
	@JsonGetter("inv_consumption_info_slave_item_name")
	public String getInv_consumption_info_slave_item_name() {
		return inv_consumption_info_slave_item_name;
	}
	@JsonSetter("inv_consumption_info_slave_item_name")
	public void setInv_consumption_info_slave_item_name(
			String inv_consumption_info_slave_item_name) {
		this.inv_consumption_info_slave_item_name = inv_consumption_info_slave_item_name;
	}
	@JsonGetter("inv_consumption_item_info_slave_item_code")
	public Integer getInv_consumption_item_info_slave_item_code() {
		return inv_consumption_item_info_slave_item_code;
	}
	@JsonSetter("inv_consumption_item_info_slave_item_code")
	public void setInv_consumption_item_info_slave_item_code(
			Integer inv_consumption_item_info_slave_item_code) {
		this.inv_consumption_item_info_slave_item_code = inv_consumption_item_info_slave_item_code;
	}
	@JsonGetter("inv_consumption_item_info_slave_item_qty")
	public Integer getInv_consumption_item_info_slave_item_qty() {
		return inv_consumption_item_info_slave_item_qty;
	}
	@JsonSetter("inv_consumption_item_info_slave_item_qty")
	public void setInv_consumption_item_info_slave_item_qty(
			Integer inv_consumption_item_info_slave_item_qty) {
		this.inv_consumption_item_info_slave_item_qty = inv_consumption_item_info_slave_item_qty;
	}
	
	@JsonGetter("inv_consumption_item_info_slave_uom")
	public String getInv_consumption_item_info_slave_uom() {
		return inv_consumption_item_info_slave_uom;
	}
	@JsonSetter("inv_consumption_item_info_slave_uom")
	public void setInv_consumption_item_info_slave_uom(
			String inv_consumption_item_info_slave_uom) {
		this.inv_consumption_item_info_slave_uom = inv_consumption_item_info_slave_uom;
	}
	@JsonGetter("inv_consumption_item_info_consumption_status")
	public String getInv_consumption_item_info_consumption_status() {
		return inv_consumption_item_info_consumption_status;
	}
	@JsonSetter("inv_consumption_item_info_consumption_status")
	public void setInv_consumption_item_info_consumption_status(
			String inv_consumption_item_info_consumption_status) {
		this.inv_consumption_item_info_consumption_status = inv_consumption_item_info_consumption_status;
	}
	
	@JsonGetter("ltFetchConsumptionSalevsDetailsDTO")
	public List<FetchConsumptionSalevsDetailsDTO> getLtFetchConsumptionSalevsDetailsDTO() {
		return ltFetchConsumptionSalevsDetailsDTO;
	}
	
	@JsonSetter("ltFetchConsumptionSalevsDetailsDTO")
	public void setLtFetchConsumptionSalevsDetailsDTO(
			List<FetchConsumptionSalevsDetailsDTO> ltFetchConsumptionSalevsDetailsDTO) {
		this.ltFetchConsumptionSalevsDetailsDTO = ltFetchConsumptionSalevsDetailsDTO;
	}
	 
 


}
