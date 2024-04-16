package com.hms.dto;

import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ItemMaster {

	private int item_id;
	private String item_name;
	/**
	 * @param item_id
	 * @param item_name
	 * @param price
	 * @param avail_qty
	 * @param stock_updated_on
	 * @param updated_by
	 * @param lab_avail_qty
	 * @param lab_stock_upated_on
	 * @param lab_updated_by
	 */
	public ItemMaster(int item_id, String item_name, float price,
			float avail_qty, Date stock_updated_on, int updated_by,
			float lab_avail_qty, Date lab_stock_upated_on, int lab_updated_by) {
		this.item_id = item_id;
		this.item_name = item_name;
		this.price = price;
		this.avail_qty = avail_qty;
		this.stock_updated_on = stock_updated_on;
		this.updated_by = updated_by;
		this.lab_avail_qty = lab_avail_qty;
		this.lab_stock_upated_on = lab_stock_upated_on;
		this.lab_updated_by = lab_updated_by;
	}
	private float price;
	private float avail_qty;
	private Date stock_updated_on;
	private int updated_by;
	private float lab_avail_qty;
	private Date lab_stock_upated_on;
	private int lab_updated_by;
	private float lab_min_qty;
	private float min_qty;
	private int flag;

	private CathTrolley objCathTrolley;

	@JsonGetter("objCT")
	public CathTrolley getObjCathTrolley() {
		return objCathTrolley;
	}

	@JsonSetter("objCT")
	public void setObjCathTrolley(CathTrolley objCathTrolley) {
		this.objCathTrolley = objCathTrolley;
	}

	private NursingTrolley objNursingTrolley;

	@JsonGetter("objNT")
	public NursingTrolley getObjNursingTrolley() {
		return objNursingTrolley;
	}

	@JsonSetter("objNT")
	public void setObjNursingTrolley(NursingTrolley objNursingTrolley) {
		this.objNursingTrolley = objNursingTrolley;
	}

	private float ccu_avail_qty;
	private Date ccu_stock_upated_on;
	private int ccu_updated_by;
	private float ccu_min_qty;

	private float opd_avail_qty;
	private Date opd_stock_upated_on;
	private int opd_updated_by;
	private float opd_min_qty;

	public ItemMaster(int item_id, String item_name, float price,
			float avail_qty, Date stock_updated_on, int updated_by,
			float lab_avail_qty, Date lab_stock_upated_on, int lab_updated_by,
			float lab_min_qty, float min_qty, int flag, float ccu_avail_qty,
			Date ccu_stock_upated_on, int ccu_updated_by, float ccu_min_qty,
			float opd_avail_qty, Date opd_stock_upated_on, int opd_updated_by,
			float opd_min_qty) {

		this.item_id = item_id;
		this.item_name = item_name;
		this.price = price;
		this.avail_qty = avail_qty;
		this.stock_updated_on = stock_updated_on;
		this.updated_by = updated_by;
		this.lab_avail_qty = lab_avail_qty;
		this.lab_stock_upated_on = lab_stock_upated_on;
		this.lab_updated_by = lab_updated_by;
		this.lab_min_qty = lab_min_qty;
		this.min_qty = min_qty;
		this.flag = flag;
		this.ccu_avail_qty = ccu_avail_qty;
		this.ccu_stock_upated_on = ccu_stock_upated_on;
		this.ccu_updated_by = ccu_updated_by;
		this.ccu_min_qty = ccu_min_qty;
		this.opd_avail_qty = opd_avail_qty;
		this.opd_stock_upated_on = opd_stock_upated_on;
		this.opd_updated_by = opd_updated_by;
		this.opd_min_qty = opd_min_qty;

	}

	/**
	 * @param item_id
	 * @param item_name
	 * @param price
	 * @param avail_qty
	 * @param stock_updated_on
	 * @param updated_by
	 * @param lab_avail_qty
	 * @param lab_stock_upated_on
	 * @param lab_updated_by
	 */
	/*
	 * public ItemMaster(int item_id, String item_name, float price, float
	 * avail_qty, Date stock_updated_on, int updated_by, float lab_avail_qty,
	 * Date lab_stock_upated_on, int lab_updated_by, float ccu_avail_qty, float
	 * opd_avail_qty) { this.item_id = item_id; this.item_name = item_name;
	 * this.price = price; this.avail_qty = avail_qty; this.stock_updated_on =
	 * stock_updated_on; this.updated_by = updated_by; this.lab_avail_qty =
	 * lab_avail_qty; this.lab_stock_upated_on = lab_stock_upated_on;
	 * this.lab_updated_by = lab_updated_by; this.ccu_avail_qty = ccu_avail_qty;
	 * this.opd_avail_qty = opd_avail_qty; }
	 */

	/**
	 * @return the flag
	 */

	@JsonGetter("fl")
	public int getFlag() {
		return flag;
	}

	/**
	 * @param flag
	 *            the flag to set
	 */
	@JsonSetter("fl")
	public void setFlag(int flag) {
		this.flag = flag;
	}

	@JsonGetter("lmq")
	public float getLab_min_qty() {
		return lab_min_qty;
	}

	@JsonSetter("lmq")
	public void setLab_min_qty(float lab_min_qty) {
		this.lab_min_qty = lab_min_qty;
	}

	@JsonGetter("ccumq")
	public float getCcu_min_qty() {
		return ccu_min_qty;
	}

	@JsonSetter("ccumq")
	public void setCcu_min_qty(float ccu_min_qty) {
		this.ccu_min_qty = ccu_min_qty;
	}

	@JsonGetter("opdmq")
	public float getOpd_min_qty() {
		return opd_min_qty;
	}

	@JsonSetter("opdmq")
	public void setOpd_min_qty(float opd_min_qty) {
		this.opd_min_qty = opd_min_qty;
	}

	@JsonGetter("imq")
	public float getMin_qty() {
		return min_qty;
	}

	@JsonSetter("imq")
	public void setMin_qty(float min_qty) {
		this.min_qty = min_qty;
	}

	@JsonGetter("il")
	public List<ItemMaster> getLi_item_master() {
		return li_item_master;
	}

	@JsonSetter("il")
	public void setLi_item_master(List<ItemMaster> li_item_master) {
		this.li_item_master = li_item_master;
	}

	private List<ItemMaster> li_item_master;

	public ItemMaster() {
		super();
	}

	@JsonGetter("ii")
	public int getItem_id() {
		return item_id;
	}

	@JsonSetter("ii")
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}

	@JsonGetter("in")
	public String getItem_name() {
		return item_name;
	}

	@JsonSetter("in")
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}

	@JsonGetter("ip")
	public float getPrice() {
		return price;
	}

	@JsonSetter("ip")
	public void setPrice(float price) {
		this.price = price;
	}

	@JsonGetter("iaq")
	public float getAvail_qty() {
		return avail_qty;
	}

	@JsonSetter("iaq")
	public void setAvail_qty(float avail_qty) {
		this.avail_qty = avail_qty;
	}

	@JsonGetter("suo")
	public Date getStock_updated_on() {
		return stock_updated_on;
	}

	@JsonSetter("suo")
	public void setStock_updated_on(Date stock_updated_on) {
		this.stock_updated_on = stock_updated_on;
	}

	@JsonGetter("ub")
	public int getUpdated_by() {
		return updated_by;
	}

	@JsonSetter("ub")
	public void setUpdated_by(int updated_by) {
		this.updated_by = updated_by;
	}

	@JsonGetter("laq")
	public float getLab_avail_qty() {
		return lab_avail_qty;
	}

	@JsonSetter("laq")
	public void setLab_avail_qty(float lab_avail_qty) {
		this.lab_avail_qty = lab_avail_qty;
	}

	@JsonGetter("ccuaq")
	public float getCcu_avail_qty() {
		return ccu_avail_qty;
	}

	@JsonSetter("ccuaq")
	public void setCcu_avail_qty(float ccu_avail_qty) {
		this.ccu_avail_qty = ccu_avail_qty;
	}

	@JsonGetter("opdaq")
	public float getOpd_avail_qty() {
		return opd_avail_qty;
	}

	@JsonSetter("opdaq")
	public void setOpd_avail_qty(float opd_avail_qty) {
		this.opd_avail_qty = opd_avail_qty;
	}

	@JsonGetter("lsuo")
	public Date getLab_stock_upated_on() {
		return lab_stock_upated_on;
	}

	@JsonSetter("lsuo")
	public void setLab_stock_upated_on(Date lab_stock_upated_on) {
		this.lab_stock_upated_on = lab_stock_upated_on;
	}

	@JsonGetter("lub")
	public int getLab_updated_by() {
		return lab_updated_by;
	}

	@JsonSetter("lub")
	public void setLab_updated_by(int lab_updated_by) {
		this.lab_updated_by = lab_updated_by;
	}

	@JsonGetter("ccusuo")
	public Date getCcu_stock_upated_on() {
		return ccu_stock_upated_on;
	}

	@JsonSetter("ccusuo")
	public void setCcu_stock_upated_on(Date ccu_stock_upated_on) {
		this.ccu_stock_upated_on = ccu_stock_upated_on;
	}

	@JsonGetter("ccuub")
	public int getCcu_updated_by() {
		return ccu_updated_by;
	}

	@JsonSetter("ccuub")
	public void setCcu_updated_by(int ccu_updated_by) {
		this.ccu_updated_by = ccu_updated_by;
	}

	@JsonGetter("opdsuo")
	public Date getOpd_stock_upated_on() {
		return opd_stock_upated_on;
	}

	@JsonSetter("opdsuo")
	public void setOpd_stock_upated_on(Date opd_stock_upated_on) {
		this.opd_stock_upated_on = opd_stock_upated_on;
	}

	@JsonGetter("opdsub")
	public int getOpd_updated_by() {
		return opd_updated_by;
	}

	@JsonSetter("opdsub")
	public void setOpd_updated_by(int opd_updated_by) {
		this.opd_updated_by = opd_updated_by;
	}
}
