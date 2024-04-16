package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class OtherComps {

	private int o_id;
	private String name;
	private float price;
	private List<OtherComps> li_other_comps;

	public OtherComps() {
		super();
	}
@JsonGetter("od")
	public int getO_id() {
		return o_id;
	}

	public void setO_id(int o_id) {
		this.o_id = o_id;
	}
	@JsonGetter("on")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	@JsonGetter("op")
	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}
	@JsonGetter("ol")
	public List<OtherComps> getLi_other_comps() {
		return li_other_comps;
	}

	public void setLi_other_comps(List<OtherComps> li_other_comps) {
		this.li_other_comps = li_other_comps;
	}
}
