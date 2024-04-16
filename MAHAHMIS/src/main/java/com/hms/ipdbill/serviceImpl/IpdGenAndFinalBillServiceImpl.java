package com.hms.ipdbill.serviceImpl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.PhysicalDischargeDao;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dao.IpdGenAndFinalBillDao;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.ipdbill.dto.IpdPhysicalDischargedPatientsDTO;
import com.hms.ipdbill.service.IpdGenAndFinalBillService;


@Service
public class IpdGenAndFinalBillServiceImpl implements IpdGenAndFinalBillService{

	
	@Autowired
	IpdGenAndFinalBillDao gfDao;
	
	@Override 
	@Transactional
	public String phyDisflagForOt(Integer treatmentId) {
		return gfDao.phyDisflagForOt(treatmentId);
	}
	
	@Override
	@Transactional
	public List<IpdPhysicalDischargedPatientsDTO> autoIPDActivePhyDisPat(String letter,String finalBill,String usertype,HttpServletRequest request){
	if(usertype.equalsIgnoreCase("Y")){
		return gfDao.autoIPDActivePhyDisPat(letter,finalBill,usertype,request);
	}else{
		return gfDao.autoIPDActivePhyDisPat(letter,finalBill,usertype, request);
	}
	}

	@Override
	@Transactional
	public List<IpdPhysicalDischargedPatientsDTO> autoIPDBillPhyDisPat(String letter,String finalBill,String usertype,HttpServletRequest request){
	if(usertype.equalsIgnoreCase("Y")){
		return gfDao.autoIPDBillPhyDisPat(letter,finalBill,usertype,request);
	}else{
		return gfDao.autoIPDBillPhyDisPat(letter,finalBill,usertype, request);
	}
	}

	@Override
	@Transactional
	public List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPatients(Integer unit_id, String callFrom,
			String findText,int wardType,int wardName,Integer startIndex) {
		// TODO Auto-generated method stub
		return gfDao.autoSuggestationGeneralBillPatients(unit_id,callFrom,findText,wardType,wardName,startIndex);
	}

	@Override
	@Transactional
	public List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPhyDis(Integer unit_id, String callFrom,
			String findText,int wardType,int wardName,Integer startIndex) {
		// TODO Auto-generated method stub
		return gfDao.autoSuggestationGeneralBillPhyDis(unit_id,callFrom,findText,wardType,wardName,startIndex);
	}
	
	
	@Override
	@Transactional
	public List<IpdGenFinalBillDTO> autoSuggestationFinalBillPatients(Integer unit_id, String callFrom,
			String findText,int wardType,int wardName,Integer startIndex) {
		// TODO Auto-generated method stub
		return gfDao.autoSuggestationFinalBillPatients(unit_id,callFrom,findText,wardType,wardName,startIndex);
	}

	@Override
	@Transactional
	public List<IpdGenFinalBillDTO> autoSuggestationFinalBillPhyDisPatients(Integer unit_id, String callFrom,
			String findText,int wardType,int wardName,Integer startIndex) {
		// TODO Auto-generated method stub
		return gfDao.autoSuggestationFinalBillPhyDisPatients(unit_id,callFrom,findText,wardType,wardName,startIndex);
	}

	@Override
	@Transactional
	public Integer getAllGenBillPatCount() {
		// TODO Auto-generated method stub
		return gfDao.getAllGenBillPatCount();
	}

	@Override
	@Transactional
	public Integer getAllFinBillPatCount() {
		// TODO Auto-generated method stub
		return gfDao.getAllFinBillPatCount();
	}

	@Override
	@Transactional
	public Integer getAllGenPhyDisBillPatCount() {
		// TODO Auto-generated method stub
		return gfDao.getAllGenPhyDisBillPatCount();
	}

	@Override
	@Transactional
	public Integer getAllFinBillPhyDisPatCount() {
		// TODO Auto-generated method stub
		return gfDao.getAllFinBillPhyDisPatCount();
	}

}
