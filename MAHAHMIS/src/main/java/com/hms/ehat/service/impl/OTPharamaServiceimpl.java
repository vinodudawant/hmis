package com.hms.ehat.service.impl;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.OTPharamaDao;
import com.hms.ehat.dao.impl.OTPharamaDaoImpl;
import com.hms.ehat.dto.PharmaConsumtionSlaveDTO;
import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.ehat.service.OTPharamaService;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.service.CommonService;
@Service
public class OTPharamaServiceimpl implements OTPharamaService {

	@Autowired
	OTPharamaDao otPharama;
	@Autowired
	CommonService commonService;
	@Override
	@Transactional
	public Map<String, String> saveOrUpdatePatientSaleBill(
			pharmaConsumtionDTO patientSaleBillMaster, String storeId) {
		
		patientSaleBillMaster.setPatientSalesBillDeleteFlag(0);
		patientSaleBillMaster
				.setPatientSalesBillUpdateDate(new Date(new java.util.Date().getTime()));
		
		
	    //empty row not store into db
		if(patientSaleBillMaster.getLtPatientSaleBill().get(patientSaleBillMaster.getLtPatientSaleBill().size() - 1).getProductMaster().getProductId()==null)
		{
			patientSaleBillMaster.getLtPatientSaleBill().remove(patientSaleBillMaster.getLtPatientSaleBill().size() - 1);
		}
		if(patientSaleBillMaster.getPatientSalesBillId()==null)
		{
		List<PharmaConsumtionSlaveDTO> patientSaleBillSlaves = new ArrayList<PharmaConsumtionSlaveDTO>();
		
		List<PharmaConsumtionSlaveDTO> patientSaleBillSlaves2 = patientSaleBillMaster.getLtPatientSaleBill();
		
		for (PharmaConsumtionSlaveDTO patientSaleBillSlave : patientSaleBillSlaves2) {
			if (patientSaleBillSlave.getProductMaster().getBatchMaster()
					.get(0).getBatchId() != null) {
				patientSaleBillSlave
						.setPatientSlaveBatchId(patientSaleBillSlave
								.getProductMaster().getBatchMaster().get(0)
								.getBatchId());
			}
			patientSaleBillSlaves.add(patientSaleBillSlave);
		}

		patientSaleBillMaster
				.setLtPatientSaleBill(patientSaleBillSlaves);
		
				
		//delete Row	
	       List<PharmaConsumtionSlaveDTO> newPatientSlaves = new ArrayList<PharmaConsumtionSlaveDTO>();
			List<PharmaConsumtionSlaveDTO> newPatientSlaves1=patientSaleBillMaster.getLtPatientSaleBill();
			for(PharmaConsumtionSlaveDTO patientSaleSlave:newPatientSlaves1)
			{	
				if (patientSaleSlave.getProductMaster().getProductId() != null) {
					newPatientSlaves.add(patientSaleSlave);
				}
			}
			
			patientSaleBillMaster.setLtPatientSaleBill(newPatientSlaves);
		
				
			patientSaleBillMaster.setPatientSalesBillDocNo(commonService.getDocumentNumber(2));
			
			Map<String, String> result= new HashMap<String, String>();
			
			
			String patientType=patientSaleBillMaster.getPatientType();
			
			if(patientSaleBillMaster.getPatientType().equals("all"))
			{
			//	patientType=patientSaleBillDao.getPatientTypeByTreatmentId(patientSaleBillMaster.getPatientSaleTreatmentId());
			}
			
			
		
			result=otPharama.saveOrUpdatePatientSaleBill(patientSaleBillMaster,storeId);
			//result=patientSaleBillDao.saveOrUpdatePatientSaleBill(patientSaleBillMaster,storeId);
			
			String str=result.get("result");
			if (str.equals("Record Save Succesfully")) {} 
		return result;
		}
		else{
		List<PharmaConsumtionSlaveDTO> patientSaleBillSlaves = new ArrayList<PharmaConsumtionSlaveDTO>();
		List<PharmaConsumtionSlaveDTO> patientSaleBillSlaves2 = patientSaleBillMaster.getLtPatientSaleBill();
	
		for (PharmaConsumtionSlaveDTO patientSaleBillSlave : patientSaleBillSlaves2) 
		{
			if (patientSaleBillSlave.getProductMaster().getBatchMaster()
					.get(0).getBatchId() != null) 
			{
				patientSaleBillSlave
						.setPatientSlaveBatchId(patientSaleBillSlave
								.getProductMaster().getBatchMaster().get(0)
								.getBatchId());
				patientSaleBillSlave.setPatientSaleBillMaster(patientSaleBillMaster);
				
			}
			patientSaleBillSlaves.add(patientSaleBillSlave);
		}

					
				
		//delete Row	
	       List<PharmaConsumtionSlaveDTO> newPatientSlaves = new ArrayList<PharmaConsumtionSlaveDTO>();
			List<PharmaConsumtionSlaveDTO> newPatientSlaves1=patientSaleBillMaster.getLtPatientSaleBill();
			for(PharmaConsumtionSlaveDTO patientSaleSlave:newPatientSlaves1)
			{	
			
				if (patientSaleSlave.getProductMaster().getProductId() != null)
				{
					newPatientSlaves.add(patientSaleSlave);
				}
				
			}
			
			patientSaleBillMaster.setLtPatientSaleBill(newPatientSlaves);
		
				
			patientSaleBillMaster.setPatientSalesBillDocNo(commonService.getDocumentNumber(2));
			
			Map<String, String> result= new HashMap<String, String>();
			
			
			String patientType=patientSaleBillMaster.getPatientType();
			
			if(patientSaleBillMaster.getPatientType().equals("all"))
			{
			//	patientType=patientSaleBillDao.getPatientTypeByTreatmentId(patientSaleBillMaster.getPatientSaleTreatmentId());
			}
			
			
			result=otPharama.saveOrUpdatePatientSaleBill(patientSaleBillMaster,storeId);
			
			String str=result.get("result");
			if (str.equals("Record Save Succesfully")) {} 
		return result;
		}
		
	}

}
