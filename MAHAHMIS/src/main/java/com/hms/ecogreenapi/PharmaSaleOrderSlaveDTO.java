package com.hms.ecogreenapi;

public class PharmaSaleOrderSlaveDTO {
	String item_id ;
	int item_branch_id;
	int item_qty;
	double  item_price;
	double item_discount;
	 double disc_per;
	public String getItem_id() {
		return item_id;
	}
	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}
	public int getItem_branch_id() {
		return item_branch_id;
	}
	public void setItem_branch_id(int item_branch_id) {
		this.item_branch_id = item_branch_id;
	}
	public int getItem_qty() {
		return item_qty;
	}
	public void setItem_qty(int item_qty) {
		this.item_qty = item_qty;
	}
	public double getItem_price() {
		return item_price;
	}
	public void setItem_price(double item_price) {
		this.item_price = item_price;
	}
	public double getItem_discount() {
		return item_discount;
	}
	public void setItem_discount(double item_discount) {
		this.item_discount = item_discount;
	}
	public double getDisc_per() {
		return disc_per;
	}
	public void setDisc_per(double disc_per) {
		this.disc_per = disc_per;
	}
	@Override
	public String toString() {
		return "PharmaSaleOrderSlaveDTO [item_id=" + item_id + ", item_branch_id=" + item_branch_id + ", item_qty="
				+ item_qty + ", item_price=" + item_price + ", item_discount=" + item_discount + ", disc_per="
				+ disc_per + "]";
	}
	 
	 
}
