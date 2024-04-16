package com.hms.ecogreenapi;

public class PharmaIndentSlaveDTO {
     String itemCode;
     String itemName;
     int itemRequireQty;
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public int getItemRequireQty() {
		return itemRequireQty;
	}
	public void setItemRequireQty(int itemRequireQty) {
		this.itemRequireQty = itemRequireQty;
	}
	@Override
	public String toString() {
		return "PharmaIndentSlaveDTO [itemCode=" + itemCode + ", itemName=" + itemName + ", itemRequireQty="
				+ itemRequireQty + "]";
	}
	
     
     
     
}
