package com.hms.dto;

 
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InvAbcRangeAnalsysDTO {
	
	
	private Integer idinv_abcanalysis_details;
	private String inv_abc_minrange_item_a;
	private String inv_abc_maxrange_item_a;
	
	private String inv_abc_minrange_item_b;
	private String inv_abc_maxrange_item_b;
	
	private String inv_abc_minrange_item_c;
	private String inv_abc_maxrange_item_c;
	
	private String inv_abcanalysis_delete_flag;
	private String inv_abcanalysis_create_date;
	private String inv_abcanalysis_update_date;
	
	private List<InvAbcRangeAnalsysDTO> ltAbcRangeAnalsysDTOs;
	
	@JsonGetter("idinv_abcanalysis_details")
	public Integer getIdinv_abcanalysis_details() {
		return idinv_abcanalysis_details;
	}

	@JsonSetter("idinv_abcanalysis_details")
	public void setIdinv_abcanalysis_details(Integer idinv_abcanalysis_details) {
		this.idinv_abcanalysis_details = idinv_abcanalysis_details;
	}

	@JsonGetter("inv_abc_minrange_item_a")
	public String getInv_abc_minrange_item_a() {
		return inv_abc_minrange_item_a;
	}

	@JsonSetter("inv_abc_minrange_item_a")
	public void setInv_abc_minrange_item_a(String inv_abc_minrange_item_a) {
		this.inv_abc_minrange_item_a = inv_abc_minrange_item_a;
	}
	@JsonGetter("inv_abc_maxrange_item_a")
	public String getInv_abc_maxrange_item_a() {
		return inv_abc_maxrange_item_a;
	}

	@JsonSetter("inv_abc_maxrange_item_a")
	public void setInv_abc_maxrange_item_a(String inv_abc_maxrange_item_a) {
		this.inv_abc_maxrange_item_a = inv_abc_maxrange_item_a;
	}
	@JsonGetter("inv_abc_minrange_item_b")
	public String getInv_abc_minrange_item_b() {
		return inv_abc_minrange_item_b;
	}
	
	@JsonSetter("inv_abc_minrange_item_b")
	public void setInv_abc_minrange_item_b(String inv_abc_minrange_item_b) {
		this.inv_abc_minrange_item_b = inv_abc_minrange_item_b;
	}

	@JsonGetter("inv_abc_maxrange_item_b")
	public String getInv_abc_maxrange_item_b() {
		return inv_abc_maxrange_item_b;
	}

	@JsonSetter("inv_abc_maxrange_item_b")
	public void setInv_abc_maxrange_item_b(String inv_abc_maxrange_item_b) {
		this.inv_abc_maxrange_item_b = inv_abc_maxrange_item_b;
	}
	@JsonGetter("inv_abc_minrange_item_c")
	public String getInv_abc_minrange_item_c() {
		return inv_abc_minrange_item_c;
	}

	@JsonSetter("inv_abc_minrange_item_c")
	public void setInv_abc_minrange_item_c(String inv_abc_minrange_item_c) {
		this.inv_abc_minrange_item_c = inv_abc_minrange_item_c;
	}

	@JsonGetter("inv_abc_maxrange_item_c")
	public String getInv_abc_maxrange_item_c() {
		return inv_abc_maxrange_item_c;
	}
	@JsonSetter("inv_abc_maxrange_item_c")
	public void setInv_abc_maxrange_item_c(String inv_abc_maxrange_item_c) {
		this.inv_abc_maxrange_item_c = inv_abc_maxrange_item_c;
	}

	public String getInv_abcanalysis_delete_flag() {
		return inv_abcanalysis_delete_flag;
	}

	public void setInv_abcanalysis_delete_flag(String inv_abcanalysis_delete_flag) {
		this.inv_abcanalysis_delete_flag = inv_abcanalysis_delete_flag;
	}
	@JsonSetter("inv_abcanalysis_create_date")
	public String getInv_abcanalysis_create_date() {
		return inv_abcanalysis_create_date;
	}

	@JsonSetter("inv_abcanalysis_create_date")
	public void setInv_abcanalysis_create_date(String inv_abcanalysis_create_date) {
		this.inv_abcanalysis_create_date = inv_abcanalysis_create_date;
	}
	@JsonGetter("inv_abcanalysis_update_date")
	public String getInv_abcanalysis_update_date() {
		return inv_abcanalysis_update_date;
	}
	@JsonSetter("inv_abcanalysis_update_date")
	public void setInv_abcanalysis_update_date(String inv_abcanalysis_update_date) {
		this.inv_abcanalysis_update_date = inv_abcanalysis_update_date;
	}
	@JsonGetter("ltAbcRangeAnalsysDTOs")
	public List<InvAbcRangeAnalsysDTO> getLtAbcRangeAnalsysDTOs() {
		return ltAbcRangeAnalsysDTOs;
	}
	@JsonSetter("ltAbcRangeAnalsysDTOs")
	public void setLtAbcRangeAnalsysDTOs(
			List<InvAbcRangeAnalsysDTO> ltAbcRangeAnalsysDTOs) {
		this.ltAbcRangeAnalsysDTOs = ltAbcRangeAnalsysDTOs;
	}
	
	
	

}
