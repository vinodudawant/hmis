package com.hms.dto;

import java.util.List;

public class UomRelationDTO {
private int uom_id;
private int product_id;
private double qty;
private double sub_qty;
private List<UomRelationDTO> objuomrelation;
public int getUom_id() {
	return uom_id;
}
public void setUom_id(int uom_id) {
	this.uom_id = uom_id;
}
public int getProduct_id() {
	return product_id;
}
public void setProduct_id(int product_id) {
	this.product_id = product_id;
}
public double getQty() {
	return qty;
}
public void setQty(double qty) {
	this.qty = qty;
}
public double getSub_qty() {
	return sub_qty;
}
public void setSub_qty(double sub_qty) {
	this.sub_qty = sub_qty;
}
public List<UomRelationDTO> getObjuomrelation() {
	return objuomrelation;
}
public void setObjuomrelation(List<UomRelationDTO> objuomrelation) {
	this.objuomrelation = objuomrelation;
}

}
