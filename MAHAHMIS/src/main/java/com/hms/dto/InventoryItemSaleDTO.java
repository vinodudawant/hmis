package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryItemSaleDTO {

	
	private Integer item_sales_id;
	private String item_sales_uom;
	private String item_sales_uom_factor1;
	private String item_sales_uom_factor2 ;
	private String item_sales_uom_factor3;
	private String item_sales_uom_factor4;
	private String item_sales_factor_uom1;
	private String  item_sales_factor_uom2;
	private String item_sales_factor_uom3;
	private String item_sales_factor_uom4;
	private String item_sales_tax_code;
	private Double item_sales_unit_price;
	private Double item_sales_unit_price2;
	private Double item_sales_unit_price3;
	private Double item_sales_unit_price4;
	
	@JsonGetter("item_sales_unit_price2")
	public Double getItem_sales_unit_price2() {
		return item_sales_unit_price2;
	}
	@JsonSetter("item_sales_unit_price2")
	public void setItem_sales_unit_price2(Double item_sales_unit_price2) {
		this.item_sales_unit_price2 = item_sales_unit_price2;
	}
	@JsonGetter("item_sales_unit_price3")
	public Double getItem_sales_unit_price3() {
		return item_sales_unit_price3;
	}
	@JsonSetter("item_sales_unit_price3")
	public void setItem_sales_unit_price3(Double item_sales_unit_price3) {
		this.item_sales_unit_price3 = item_sales_unit_price3;
	}
	@JsonGetter("item_sales_unit_price4")
	public Double getItem_sales_unit_price4() {
		return item_sales_unit_price4;
	}
	@JsonSetter("item_sales_unit_price4")
	public void setItem_sales_unit_price4(Double item_sales_unit_price4) {
		this.item_sales_unit_price4 = item_sales_unit_price4;
	}
	private Integer item_sale_condition_precreption;
	private Integer item_sale_delete_flag;
	private  Date item_sale_update;
	private Integer item_sale_item_id;
	private List<InventoryItemSaleDTO> ltInventoryItemSaleDTOs;
	
	
	
	@JsonGetter("item_sales_id")
	public Integer getItem_sales_id() {
		return item_sales_id;
	}
	@JsonSetter("item_sales_id")
	public void setItem_sales_id(Integer item_sales_id) {
		this.item_sales_id = item_sales_id;
	}
	@JsonGetter("item_sales_uom")
	public String getItem_sales_uom() {
		return item_sales_uom;
	}
	@JsonSetter("item_sales_uom")
	public void setItem_sales_uom(String item_sales_uom) {
		this.item_sales_uom = item_sales_uom;
	}
	@JsonGetter("item_sales_uom_factor1")
	public String getItem_sales_uom_factor1() {
		return item_sales_uom_factor1;
	}
	@JsonSetter("item_sales_uom_factor1")
	public void setItem_sales_uom_factor1(String item_sales_uom_factor1) {
		this.item_sales_uom_factor1 = item_sales_uom_factor1;
	}
	@JsonGetter("item_sales_uom_factor2")
	public String getItem_sales_uom_factor2() {
		return item_sales_uom_factor2;
	}
	@JsonSetter("item_sales_uom_factor2")
	public void setItem_sales_uom_factor2(String item_sales_uom_factor2) {
		this.item_sales_uom_factor2 = item_sales_uom_factor2;
	}
	@JsonGetter("item_sales_uom_factor3")
	public String getItem_sales_uom_factor3() {
		return item_sales_uom_factor3;
	}
	@JsonSetter("item_sales_uom_factor3")
	public void setItem_sales_uom_factor3(String item_sales_uom_factor3) {
		this.item_sales_uom_factor3 = item_sales_uom_factor3;
	}
	@JsonGetter("item_sales_uom_factor4")
	public String getItem_sales_uom_factor4() {
		return item_sales_uom_factor4;
	}
	@JsonSetter("item_sales_uom_factor4")
	public void setItem_sales_uom_factor4(String item_sales_uom_factor4) {
		this.item_sales_uom_factor4 = item_sales_uom_factor4;
	}
	@JsonGetter("item_sales_tax_code")
	public String getItem_sales_tax_code() {
		return item_sales_tax_code;
	}
	@JsonSetter("item_sales_tax_code")
	public void setItem_sales_tax_code(String item_sales_tax_code) {
		this.item_sales_tax_code = item_sales_tax_code;
	}
	@JsonGetter("item_sales_unit_price")
	public Double getItem_sales_unit_price() {
		return item_sales_unit_price;
	}
	@JsonSetter("item_sales_unit_price")
	public void setItem_sales_unit_price(Double item_sales_unit_price) {
		this.item_sales_unit_price = item_sales_unit_price;
	}
	@JsonGetter("item_sale_condition_precreption")
	public Integer getItem_sale_condition_precreption() {
		return item_sale_condition_precreption;
	}
	@JsonSetter("item_sale_condition_precreption")
	public void setItem_sale_condition_precreption(
			Integer item_sale_condition_precreption) {
		this.item_sale_condition_precreption = item_sale_condition_precreption;
	}
	@JsonGetter("item_sale_delete_flag")
	public Integer getItem_sale_delete_flag() {
		return item_sale_delete_flag;
	}
	@JsonSetter("item_sale_delete_flag")
	public void setItem_sale_delete_flag(Integer item_sale_delete_flag) {
		this.item_sale_delete_flag = item_sale_delete_flag;
	}
	@JsonGetter("item_sale_update")
	public Date getItem_sale_update() {
		return item_sale_update;
	}
	@JsonSetter("item_sale_update")
	public void setItem_sale_update(Date item_sale_update) {
		this.item_sale_update = item_sale_update;
	}
	@JsonGetter("item_sales_factor_uom1")
	public String getItem_sales_factor_uom1() {
		return item_sales_factor_uom1;
	}
	@JsonSetter("item_sales_factor_uom1")
	public void setItem_sales_factor_uom1(String item_sales_factor_uom1) {
		this.item_sales_factor_uom1 = item_sales_factor_uom1;
	}
	@JsonGetter("item_sales_factor_uom2")
	public String getItem_sales_factor_uom2() {
		return item_sales_factor_uom2;
	}
	@JsonSetter("item_sales_factor_uom2")
	public void setItem_sales_factor_uom2(String item_sales_factor_uom2) {
		this.item_sales_factor_uom2 = item_sales_factor_uom2;
	}
	@JsonGetter("item_sales_factor_uom3")
	public String getItem_sales_factor_uom3() {
		return item_sales_factor_uom3;
	}
	@JsonSetter("item_sales_factor_uom3")
	public void setItem_sales_factor_uom3(String item_sales_factor_uom3) {
		this.item_sales_factor_uom3 = item_sales_factor_uom3;
	}
	@JsonGetter("item_sales_factor_uom4")
	public String getItem_sales_factor_uom4() {
		return item_sales_factor_uom4;
	}
	@JsonSetter("item_sales_factor_uom4")
	public void setItem_sales_factor_uom4(String item_sales_factor_uom4) {
		this.item_sales_factor_uom4 = item_sales_factor_uom4;
	}
	@JsonSetter("item_sale_item_id")
	public Integer getItem_sale_item_id() {
		return item_sale_item_id;
	}
	@JsonSetter("item_sale_item_id")
	public void setItem_sale_item_id(Integer item_sale_item_id) {
		this.item_sale_item_id = item_sale_item_id;
	}
	@JsonGetter("ltInventoryItemSaleDTOs")
	public List<InventoryItemSaleDTO> getLtInventoryItemSaleDTOs() {
		return ltInventoryItemSaleDTOs;
	}
	@JsonSetter("ltInventoryItemSaleDTOs")
	public void setLtInventoryItemSaleDTOs(
			List<InventoryItemSaleDTO> ltInventoryItemSaleDTOs) {
		this.ltInventoryItemSaleDTOs = ltInventoryItemSaleDTOs;
	}
	
	
}
