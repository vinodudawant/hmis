package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryItemPurchaseDTO {

	private Integer item_purchase_id;
	private String item_purchase_uom;
	private String item_purchase_uom_factor1;
	private String item_purchase_uom_factor2;
	private String item_purchase_uom_factor3;
	private String item_purchase_uom_factor4;
	private String item_purchase_factor_uom_1;
	private String item_purchase_factor_uom_2;
	private String item_purchase_factor_uom_3;
	private String item_purchase_factor_uom_4;
	
	private String item_purchase_tax_code;
	private Double item_purchase_unit_price;
	private Double item_purchase_unit_price2;
	private Double item_purchase_unit_price3;
	private Double item_purchase_unit_price4;
	
	private Double hiddenFactorValue;
	private Double hiddenFactorPrice;
	
	private String hiddenLastUOM;
	
	@JsonGetter("hiddenLastUOM")
	public String getHiddenLastUOM() {
		return hiddenLastUOM;
	}
	@JsonSetter("hiddenLastUOM")
	public void setHiddenLastUOM(String hiddenLastUOM) {
		this.hiddenLastUOM = hiddenLastUOM;
	}
	@JsonGetter("hiddenFactorPrice")
	public Double getHiddenFactorPrice() {
		return hiddenFactorPrice;
	}
	@JsonSetter("hiddenFactorPrice")
	public void setHiddenFactorPrice(Double hiddenFactorPrice) {
		this.hiddenFactorPrice = hiddenFactorPrice;
	}
	@JsonGetter("hiddenFactorValue")
	public Double getHiddenFactorValue() {
		return hiddenFactorValue;
	}
	@JsonSetter("hiddenFactorValue")
	public void setHiddenFactorValue(Double hiddenFactorValue) {
		this.hiddenFactorValue = hiddenFactorValue;
	}
	
	private Integer item_purchase_delete_flag;
	private Date item_purchase_update;
	private Integer item_purchase_item_id;
	private List<InventoryItemPurchaseDTO> inventoryItemPurchaseDTO;
	
	@JsonGetter("item_purchase_unit_price2")
	public Double getItem_purchase_unit_price2() {
		return item_purchase_unit_price2;
	}
	@JsonSetter("item_purchase_unit_price2")
	public void setItem_purchase_unit_price2(Double item_purchase_unit_price2) {
		this.item_purchase_unit_price2 = item_purchase_unit_price2;
	}
	@JsonGetter("item_purchase_unit_price3")
	public Double getItem_purchase_unit_price3() {
		return item_purchase_unit_price3;
	}
	@JsonSetter("item_purchase_unit_price3")
	public void setItem_purchase_unit_price3(Double item_purchase_unit_price3) {
		this.item_purchase_unit_price3 = item_purchase_unit_price3;
	}
	@JsonGetter("item_purchase_unit_price4")
	public Double getItem_purchase_unit_price4() {
		return item_purchase_unit_price4;
	}
	@JsonSetter("item_purchase_unit_price4")
	public void setItem_purchase_unit_price4(Double item_purchase_unit_price4) {
		this.item_purchase_unit_price4 = item_purchase_unit_price4;
	}
	
	@JsonGetter("item_purchase_id")
	public Integer getItem_purchase_id() {
		return item_purchase_id;
	}
	@JsonSetter("item_purchase_id")
	public void setItem_purchase_id(Integer item_purchase_id) {
		this.item_purchase_id = item_purchase_id;
	}
	@JsonGetter("item_purchase_uom")
	public String getItem_purchase_uom() {
		return item_purchase_uom;
	}
	@JsonSetter("item_purchase_uom")
	public void setItem_purchase_uom(String item_purchase_uom) {
		this.item_purchase_uom = item_purchase_uom;
	}
	@JsonGetter("item_purchase_uom_factor1")
	public String getItem_purchase_uom_factor1() {
		return item_purchase_uom_factor1;
	}
	@JsonSetter("item_purchase_uom_factor1")
	public void setItem_purchase_uom_factor1(String item_purchase_uom_factor1) {
		this.item_purchase_uom_factor1 = item_purchase_uom_factor1;
	}
	@JsonGetter("item_purchase_uom_factor2")
	public String getItem_purchase_uom_factor2() {
		return item_purchase_uom_factor2;
	}
	@JsonSetter("item_purchase_uom_factor2")
	public void setItem_purchase_uom_factor2(String item_purchase_uom_factor2) {
		this.item_purchase_uom_factor2 = item_purchase_uom_factor2;
	}
	@JsonGetter("item_purchase_uom_factor3")
	public String getItem_purchase_uom_factor3() {
		return item_purchase_uom_factor3;
	}
	@JsonSetter("item_purchase_uom_factor3")
	public void setItem_purchase_uom_factor3(String item_purchase_uom_factor3) {
		this.item_purchase_uom_factor3 = item_purchase_uom_factor3;
	}
	@JsonGetter("item_purchase_uom_factor4")
	public String getItem_purchase_uom_factor4() {
		return item_purchase_uom_factor4;
	}
	@JsonSetter("item_purchase_uom_factor4")
	public void setItem_purchase_uom_factor4(String item_purchase_uom_factor4) {
		this.item_purchase_uom_factor4 = item_purchase_uom_factor4;
	}
	@JsonGetter("item_purchase_tax_code")
	public String getItem_purchase_tax_code() {
		return item_purchase_tax_code;
	}
	@JsonSetter("item_purchase_tax_code")
	public void setItem_purchase_tax_code(String item_purchase_tax_code) {
		this.item_purchase_tax_code = item_purchase_tax_code;
	}
	@JsonGetter("item_purchase_unit_price")
	public Double getItem_purchase_unit_price() {
		return item_purchase_unit_price;
	}
	@JsonSetter("item_purchase_unit_price")
	public void setItem_purchase_unit_price(Double item_purchase_unit_price) {
		this.item_purchase_unit_price = item_purchase_unit_price;
	}
	@JsonGetter("item_purchase_delete_flag")
	public Integer getItem_purchase_delete_flag() {
		return item_purchase_delete_flag;
	}
	@JsonSetter("item_purchase_delete_flag")
	public void setItem_purchase_delete_flag(Integer item_purchase_delete_flag) {
		this.item_purchase_delete_flag = item_purchase_delete_flag;
	}
	@JsonGetter("item_purchase_update")
	public Date getItem_purchase_update() {
		return item_purchase_update;
	}
	@JsonSetter("item_purchase_update")
	public void setItem_purchase_update(Date item_purchase_update) {
		this.item_purchase_update = item_purchase_update;
	}
	@JsonGetter("item_purchase_factor_uom_1")
	public String getItem_purchase_factor_uom_1() {
		return item_purchase_factor_uom_1;
	}
	@JsonSetter("item_purchase_factor_uom_1")
	public void setItem_purchase_factor_uom_1(String item_purchase_factor_uom_1) {
		this.item_purchase_factor_uom_1 = item_purchase_factor_uom_1;
	}
	@JsonGetter("item_purchase_factor_uom_2")
	public String getItem_purchase_factor_uom_2() {
		return item_purchase_factor_uom_2;
	}
	@JsonSetter("item_purchase_factor_uom_2")
	public void setItem_purchase_factor_uom_2(String item_purchase_factor_uom_2) {
		this.item_purchase_factor_uom_2 = item_purchase_factor_uom_2;
	}
	@JsonGetter("item_purchase_factor_uom_3")
	public String getItem_purchase_factor_uom_3() {
		return item_purchase_factor_uom_3;
	}
	@JsonSetter("item_purchase_factor_uom_3")
	public void setItem_purchase_factor_uom_3(String item_purchase_factor_uom_3) {
		this.item_purchase_factor_uom_3 = item_purchase_factor_uom_3;
	}
	@JsonGetter("item_purchase_factor_uom_4")
	public String getItem_purchase_factor_uom_4() {
		return item_purchase_factor_uom_4;
	}
	@JsonSetter("item_purchase_factor_uom_4")
	public void setItem_purchase_factor_uom_4(String item_purchase_factor_uom_4) {
		this.item_purchase_factor_uom_4 = item_purchase_factor_uom_4;
	}
	@JsonGetter("item_purchase_item_id")
	public Integer getItem_purchase_item_id() {
		return item_purchase_item_id;
	}
	@JsonSetter("item_purchase_item_id")
	public void setItem_purchase_item_id(Integer item_purchase_item_id) {
		this.item_purchase_item_id = item_purchase_item_id;
	}
	public List<InventoryItemPurchaseDTO> getInventoryItemPurchaseDTO() {
		return inventoryItemPurchaseDTO;
	}
	public void setInventoryItemPurchaseDTO(
			List<InventoryItemPurchaseDTO> inventoryItemPurchaseDTO) {
		this.inventoryItemPurchaseDTO = inventoryItemPurchaseDTO;
	}
	
	
	
}
