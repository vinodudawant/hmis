package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class BillComponent implements Serializable {
	private static final long serialVersionUID = 1L;
	private int bill_id;
	private int bc_id;
	private int item_id;
	private int quantity;
	private float amount;
	private String  type;
	private String date;
	private String time;
	private String mType;
	private String mName;
	private int master_id;
	private int slave_id;
	/**
	 * @return the mType
	 */
	@JsonGetter("mty")
	public String getMType() {
		return mType;
	}
	/**
	 * @param type the mType to set
	 */
	@JsonSetter("mty")
	public void setMType(String type) {
		mType = type;
	}
	private int updatedBy;
	private List<BillComponent> bcList;
	private ItemMaster objItem ;
	/**
	 * @return the objItem
	 */
	@JsonGetter("oi")
	public ItemMaster getObjItem() {
		return objItem;
	}
	/**
	 * @param objItem the objItem to set
	 */
	@JsonSetter("oi")
	public void setObjItem(ItemMaster objItem) {
		this.objItem = objItem;
	}
	/**
	 * @return the objDoctor
	 */
	@JsonGetter("od")
	public Doctor getObjDoctor() {
		return objDoctor;
	}
	/**
	 * @param objDoctor the objDoctor to set
	 */
	@JsonSetter("od")
	public void setObjDoctor(Doctor objDoctor) {
		this.objDoctor = objDoctor;
	}
	private Doctor objDoctor ;
	/**
	 * @return the date
	 */
	@JsonGetter("dt")
	public String getDate() {
		return date;
	}
	/**
	 * @param date the date to set
	 */
	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}
	/**
	 * @return the time
	 */
	@JsonGetter("tm")
	public String getTime() {
		return time;
	}
	/**
	 * @param time the time to set
	 */
	@JsonSetter("tm")
	public void setTime(String time) {
		this.time = time;
	}
	/**
	 * @return the updatedBy
	 */
	@JsonGetter("ub")
	public int getUpdatedBy() {
		return updatedBy;
	}
	/**
	 * @param updatedBy the updatedBy to set
	 */
	@JsonSetter("ub")
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	/**
	 * @return the bill_id
	 */
	@JsonGetter("bid")
	public int getBill_id() {
		return bill_id;
	}
	/**
	 * @param bill_id the bill_id to set
	 */
	@JsonSetter("bid")
	public void setBill_id(int bill_id) {
		this.bill_id = bill_id;
	}
	/**
	 * @return the bc_id
	 */
	@JsonGetter("bcid")
	public int getBc_id() {
		return bc_id;
	}
	/**
	 * @param bc_id the bc_id to set
	 */
	@JsonSetter("bcid")
	public void setBc_id(int bc_id) {
		this.bc_id = bc_id;
	}
	/**
	 * @return the item_id
	 */
	@JsonGetter("Imd")
	public int getItem_id() {
		return item_id;
	}
	/**
	 * @param item_id the item_id to set
	 */
	@JsonSetter("Imd")
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	/**
	 * @return the quantity
	 */
	@JsonGetter("qty")
	public int getQuantity() {
		return quantity;
	}
	/**
	 * @param quantity the quantity to set
	 */
	@JsonSetter("qty")
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	/**
	 * @return the amount
	 */
	@JsonGetter("am")
	public float getAmount() {
		return amount;
	}
	/**
	 * @param amount the amount to set
	 */
	@JsonSetter("am")
	public void setAmount(float amount) {
		this.amount = amount;
	}
	/**
	 * @return the type
	 */
	@JsonGetter("tp")
	public String getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	@JsonSetter("tp")
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * @return the bcList
	 */
	@JsonGetter("bcl")
	public List<BillComponent> getBcList() {
		return bcList;
	}
	/**
	 * @param bcList the bcList to set
	 */
	@JsonSetter("bcl")
	public void setBcList(List<BillComponent> bcList) {
		this.bcList = bcList;
	}
	@JsonGetter("mid")
	public int getMaster_id() {
		return master_id;
	}
	@JsonSetter("mid")
	public void setMaster_id(int master_id) {
		this.master_id = master_id;
	}
	@JsonGetter("sid")
	public int getSlave_id() {
		return slave_id;
	}
	@JsonSetter("sid")
	public void setSlave_id(int slave_id) {
		this.slave_id = slave_id;
	}
	@JsonGetter("mn")
	public String getmName() {
		return mName;
	}
	@JsonSetter("mn")
	public void setmName(String mName) {
		this.mName = mName;
	}
}
