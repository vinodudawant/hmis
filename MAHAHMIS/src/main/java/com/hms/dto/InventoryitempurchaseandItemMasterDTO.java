package com.hms.dto;

import java.util.List;



import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryitempurchaseandItemMasterDTO {
	
	/*private Integer item_purchase_uom_factor1;
	private Integer item_purchase_uom_factor2;
	private Integer item_purchase_uom_factor3;
	private Integer item_purchase_uom_factor4;*/
	
	private String item_purchase_uom_factor1;
	private String item_purchase_uom_factor2;
	private String item_purchase_uom_factor3;
	private String item_purchase_uom_factor4;
	
	private String item_purchase_factor_uom_1;
	private String item_purchase_factor_uom_2;
	private String item_purchase_factor_uom_3;
	private String item_purchase_factor_uom_4;
	
	 
	
	private Integer item_purchase_item_id;
	private Integer item_id;
	private Integer order_stock;
	private Double item_purchase_unit_price;
	private Double item_purchase_unit_price2;
	private Double item_purchase_unit_price3;
	private Double item_purchase_unit_price4;
	
	private Double hiddenFactorValue;
	private Double hiddenFactorPrice;
	private String hiddenLastUOM;
	
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
	@JsonGetter("hiddenFactorValue")
	public Double getHiddenFactorValue() {
		return hiddenFactorValue;
	}
	@JsonSetter("hiddenFactorValue")
	public void setHiddenFactorValue(Double hiddenFactorValue) {
		this.hiddenFactorValue = hiddenFactorValue;
	}
	@JsonGetter("hiddenFactorPrice")
	public Double getHiddenFactorPrice() {
		return hiddenFactorPrice;
	}
	@JsonSetter("hiddenFactorPrice")
	public void setHiddenFactorPrice(Double hiddenFactorPrice) {
		this.hiddenFactorPrice = hiddenFactorPrice;
	}
	
	private String inv_item_taxcode_and_rate;
	
	@JsonGetter("item_purchase_unit_price")
	public Double getItem_purchase_unit_price() {
		return item_purchase_unit_price;
	}
	@JsonSetter("item_purchase_unit_price")
	public void setItem_purchase_unit_price(Double item_purchase_unit_price) {
		this.item_purchase_unit_price = item_purchase_unit_price;
	}
	private InventoryItemMasterDTO inventoryItemMasterDTO;
	private InventoryItemPurchaseDTO inventoryItemPurchaseDTO;
	private List<InventoryitempurchaseandItemMasterDTO>inventoryitempurchaseandItemMasterDTOs;
	
	public List<InventoryitempurchaseandItemMasterDTO> getInventoryitempurchaseandItemMasterDTOs() {
		return inventoryitempurchaseandItemMasterDTOs;
	}
	public void setInventoryitempurchaseandItemMasterDTOs(
			List<InventoryitempurchaseandItemMasterDTO> inventoryitempurchaseandItemMasterDTOs) {
		this.inventoryitempurchaseandItemMasterDTOs = inventoryitempurchaseandItemMasterDTOs;
	}
	
	@JsonGetter("item_purchase_uom_factor1")
	public String getItem_purchase_uom_factor1() {
		return item_purchase_uom_factor1;
	}
	
	@JsonSetter("item_purchase_uom_factor2")
	public void setItem_purchase_uom_factor1(String item_purchase_uom_factor1) {
		this.item_purchase_uom_factor1 = item_purchase_uom_factor1;
	}
	@JsonIgnore
	@JsonGetter("item_purchase_uom_factor2")
	public String getItem_purchase_uom_factor2() {
		return item_purchase_uom_factor2;
	}
	@JsonSetter("item_purchase_uom_factor2")
	public void setItem_purchase_uom_factor2(String item_purchase_uom_factor2) {
		this.item_purchase_uom_factor2 = item_purchase_uom_factor2;
	}
	@JsonIgnore
	@JsonGetter("item_purchase_uom_factor3")
	public String getItem_purchase_uom_factor3() {
		return item_purchase_uom_factor3;
	}
	@JsonSetter("item_purchase_uom_factor3")
	public void setItem_purchase_uom_factor3(String item_purchase_uom_factor3) {
		this.item_purchase_uom_factor3 = item_purchase_uom_factor3;
	}
	@JsonIgnore
	@JsonGetter("item_purchase_uom_factor4")
	public String getItem_purchase_uom_factor4() {
		return item_purchase_uom_factor4;
	}
	@JsonSetter("item_purchase_uom_factor4")
	public void setItem_purchase_uom_factor4(String item_purchase_uom_factor4) {
		this.item_purchase_uom_factor4 = item_purchase_uom_factor4;
	}
	@JsonGetter("item_purchase_item_id")
	public Integer getItem_purchase_item_id() {
		return item_purchase_item_id;
	}
	@JsonSetter("item_purchase_item_id")
	public void setItem_purchase_item_id(Integer item_purchase_item_id) {
		this.item_purchase_item_id = item_purchase_item_id;
	}
	@JsonGetter("item_id")
	public Integer getItem_id() {
		return item_id;
	}
	@JsonSetter("item_id")
	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}
	@JsonGetter("order_stock")
	public Integer getOrder_stock() {
		return order_stock;
	}
	@JsonSetter("order_stock")
	public void setOrder_stock(Integer order_stock) {
		this.order_stock = order_stock;
	}
	public InventoryItemMasterDTO getInventoryItemMasterDTO() {
		return inventoryItemMasterDTO;
	}
	public void setInventoryItemMasterDTO(
			InventoryItemMasterDTO inventoryItemMasterDTO) {
		this.inventoryItemMasterDTO = inventoryItemMasterDTO;
	}
	public InventoryItemPurchaseDTO getInventoryItemPurchaseDTO() {
		return inventoryItemPurchaseDTO;
	}
	public void setInventoryItemPurchaseDTO(
			InventoryItemPurchaseDTO inventoryItemPurchaseDTO) {
		this.inventoryItemPurchaseDTO = inventoryItemPurchaseDTO;
	}
	@JsonGetter("inv_item_taxcode_and_rate")
	public String getInv_item_taxcode_and_rate() {
		return inv_item_taxcode_and_rate;
	}
	@JsonSetter("inv_item_taxcode_and_rate")
	public void setInv_item_taxcode_and_rate(String inv_item_taxcode_and_rate) {
		this.inv_item_taxcode_and_rate = inv_item_taxcode_and_rate;
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
	@JsonGetter("hiddenLastUOM")
	public String getHiddenLastUOM() {
		return hiddenLastUOM;
	}
	@JsonSetter("hiddenLastUOM")
	public void setHiddenLastUOM(String hiddenLastUOM) {
		this.hiddenLastUOM = hiddenLastUOM;
	}
	
	
	
	
	
	

}
