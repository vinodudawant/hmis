package com.hms.dto;

import java.util.List;


public class PayAllMatrix {
	
	private String docName = null;
	private List<Double> values =null;
	private String heading = null;
	private List<String> headingList = null;
	private List<PayAllMatrix> mainList= null;
	private double totalSumOfUnpaidAmount =0;
	private double totalSumReductionAmount=0;
	private double totalSumPaidAmount=0;
	private double totalSumUnpaidAmount=0;

	
	public String getDocName() {
		return docName;
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
	public String getHeading() {
		return heading;
	}
	public void setHeading(String heading) {
		this.heading = heading;
	}
	public List<String> getHeadingList() {
		return headingList;
	}
	public void setHeadingList(List<String> headingList) {
		this.headingList = headingList;
	}
	public List<PayAllMatrix> getMainList() {
		return mainList;
	}
	public void setMainList(List<PayAllMatrix> mainList) {
		this.mainList = mainList;
	}
	public List<Double> getValues() {
		return values;
	}
	public void setValues(List<Double> values) {
		this.values = values;
	}
	public double getTotalSumOfUnpaidAmount() {
		return totalSumOfUnpaidAmount;
	}
	public void setTotalSumOfUnpaidAmount(double totalSumOfUnpaidAmount) {
		this.totalSumOfUnpaidAmount = totalSumOfUnpaidAmount;
	}
	public double getTotalSumReductionAmount() {
		return totalSumReductionAmount;
	}
	public void setTotalSumReductionAmount(double totalSumReductionAmount) {
		this.totalSumReductionAmount = totalSumReductionAmount;
	}
	public double getTotalSumPaidAmount() {
		return totalSumPaidAmount;
	}
	public void setTotalSumPaidAmount(double totalSumPaidAmount) {
		this.totalSumPaidAmount = totalSumPaidAmount;
	}
	public double getTotalSumUnpaidAmount() {
		return totalSumUnpaidAmount;
	}
	public void setTotalSumUnpaidAmount(double totalSumUnpaidAmount) {
		this.totalSumUnpaidAmount = totalSumUnpaidAmount;
	}

	
}
