package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Product {
private int id;
private String name;
private double cost;
private double mrp;
private String manufacturer;
private String catogory;
private String form;
private String packing;
private String uom;
private String shelf;
private String vendor;
private String ingradient;
private List<Product> product;
private double quantity;
private int reqId;
private double requirment;
private Date expDate;
private double level;
private int trolleyId;

@JsonGetter("id")
public int getId() {
	return id;
}
@JsonSetter("id")
public void setId(int id) {
	this.id = id;
}
@JsonGetter("name")
public String getName() {
	return name;
}
@JsonSetter("name")
public void setName(String name) {
	this.name = name;
}
@JsonGetter("cost")
public double getCost() {
	return cost;
}
@JsonSetter("cost")
public void setCost(double cost) {
	this.cost = cost;
}
@JsonGetter("mrp")
public double getMrp() {
	return mrp;
}
@JsonSetter("mrp")
public void setMrp(double mrp) {
	this.mrp = mrp;
}
@JsonGetter("manufacturer")
public String getManufacturer() {
	return manufacturer;
}
@JsonSetter("manufacturer")
public void setManufacturer(String manufacturer) {
	this.manufacturer = manufacturer;
}
@JsonGetter("catogory")
public String getCatogory() {
	return catogory;
}
@JsonSetter("catogory")
public void setCatogory(String catogory) {
	this.catogory = catogory;
}
@JsonGetter("form")
public String getForm() {
	return form;
}
@JsonSetter("form")
public void setForm(String form) {
	this.form = form;
}
@JsonGetter("packing")
public String getPacking() {
	return packing;
}
@JsonSetter("packing")
public void setPacking(String packing) {
	this.packing = packing;
}
@JsonGetter("uom")
public String getUom() {
	return uom;
}
@JsonSetter("uom")
public void setUom(String uom) {
	this.uom = uom;
}
@JsonGetter("shelf")
public String getShelf() {
	return shelf;
}
@JsonSetter("shelf")
public void setShelf(String shelf) {
	this.shelf = shelf;
}
@JsonGetter("vendor")
public String getVendor() {
	return vendor;
}
@JsonSetter("vendor")
public void setVendor(String vendor) {
	this.vendor = vendor;
}
@JsonGetter("ingradient")
public String getIngradient() {
	return ingradient;
}
@JsonSetter("ingradient")
public void setIngradient(String ingradient) {
	this.ingradient = ingradient;
}
@JsonGetter("product")
public List<Product> getProduct() {
	return product;
}
@JsonSetter("product")
public void setProduct(List<Product> product) {
	this.product = product;
}
@JsonGetter("quantity")
public double getQuantity() {
	return quantity;
}
@JsonSetter("quantity")
public void setQuantity(double quantity) {
	this.quantity = quantity;
}
@JsonGetter("reqId")
public int getReqId() {
	return reqId;
}
@JsonSetter("reqId")
public void setReqId(int reqId) {
	this.reqId = reqId;
}

@JsonGetter("requirment")
public double getRequirment() {
	return requirment;
}

@JsonSetter("requirment")
public void setRequirment(double requirment) {
	this.requirment = requirment;
}
@JsonGetter("expDate")
public Date getExpDate() {
	return expDate;
}
@JsonSetter("expDate")
public void setExpDate(Date expDate) {
	this.expDate = expDate;
}
@JsonGetter("level")
public double getLevel() {
	return level;
}
@JsonSetter("level")
public void setLevel(double level) {
	this.level = level;
}
@JsonGetter("trolleyId")
public int getTrolleyId() {
	return trolleyId;
}
@JsonSetter("trolleyId")
public void setTrolleyId(int trolleyId) {
	this.trolleyId = trolleyId;
}
}
