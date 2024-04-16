package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class GeneralVoucherDTO implements Serializable
{
	private int voucherID;
	private String VoucherName;
	private List<GeneralVoucherDTO> voucherList;
	
	public int getVoucherID() {
		return voucherID;
	}
	public void setVoucherID(int voucherID) {
		this.voucherID = voucherID;
	}
	public String getVoucherName() {
		return VoucherName;
	}
	public void setVoucherName(String voucherName) {
		VoucherName = voucherName;
	}
	public List<GeneralVoucherDTO> getVoucherList() {
		return voucherList;
	}
	public void setVoucherList(List<GeneralVoucherDTO> voucherList) {
		this.voucherList = voucherList;
	}
}
