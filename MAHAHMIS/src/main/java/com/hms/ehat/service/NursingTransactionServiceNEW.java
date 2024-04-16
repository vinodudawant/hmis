package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.hms.ehat.dto.PrePostChecklistDTO;
import com.hms.ehat.dto.PrePostDetailsDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ehat.dto.nursingAsmentTwoDataDTO;


public interface NursingTransactionServiceNEW 
{
//	public int savePrePostData(PrePostChecklistDTO objDto,HttpServletRequest request);
	public List<PrePostChecklistDTO> fetchprepostData(int patientId,int treatmentId);
	public int savePrePostData(PrePostChecklistDTO objDto, HttpServletRequest request);
	
	public int saveNursingAssessmentData01(nursingAsmentDataDTO objDto,HttpServletRequest request);
	public List<nursingAsmentDataDTO> fetchNursingAs(int patientId,int treatmentId);
	
	public int saveNursingAssessmentData02(nursingAsmentTwoDataDTO objDto,HttpServletRequest request);
	public List<nursingAsmentTwoDataDTO> fetchNursingAs02(int patientId,int treatmentId);
	
}