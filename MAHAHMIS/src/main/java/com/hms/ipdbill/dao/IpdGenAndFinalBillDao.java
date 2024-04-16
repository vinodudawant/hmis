package com.hms.ipdbill.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.ipdbill.dto.IpdPhysicalDischargedPatientsDTO;

public interface IpdGenAndFinalBillDao {

	String phyDisflagForOt(Integer treatmentId);
	
	List<IpdPhysicalDischargedPatientsDTO> autoIPDActivePhyDisPat(String letter,String finalBill, String usertype,HttpServletRequest request);

	List<IpdPhysicalDischargedPatientsDTO> autoIPDBillPhyDisPat(String letter,String finalBill, String usertype,HttpServletRequest request);
	
	List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPatients(Integer unit_id, String callFrom, String findText,int wardType,int wardName,Integer startIndex);
	
	List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPhyDis(Integer unit_id, String callFrom, String findText,int wardType,int wardName,Integer startIndex);

	List<IpdGenFinalBillDTO> autoSuggestationFinalBillPatients(Integer unit_id, String callFrom, String findText,int wardType,int wardName,Integer startIndex);

	List<IpdGenFinalBillDTO> autoSuggestationFinalBillPhyDisPatients(Integer unit_id, String callFrom, String findText,
			int wardType, int wardName,Integer startIndex);

	Integer getAllGenBillPatCount();
	
	Integer getAllFinBillPatCount();

	Integer getAllGenPhyDisBillPatCount();

	Integer getAllFinBillPhyDisPatCount();
    
}

