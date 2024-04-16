package com.hms.ehat.service.impl;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.Doctor;
import com.hms.ehat.dao.DeathRecordDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DeathPatientView;
/*import com.hms.ehat.dto.DeathPatientView2;*/
import com.hms.ehat.dto.DeathRecordDto;
import com.hms.ehat.service.DeathRecordService;


@Service
public class DeathRecordServiceImpl implements DeathRecordService 
{
	@Autowired
	DeathRecordDao Deathdao;
	
	@Transactional
	@Override
	public int saveOrUpdateDeathRecord(String patientId,
			HttpServletRequest request, int docId,String narration, int deathId,String deathFlag,String deathDate, String deathTime) {
		
		

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		SimpleDateFormat sf=new SimpleDateFormat("dd/MM/yyyy");
		Date deathDate2=null;
		try {
			deathDate2 = sf.parse(deathDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		int val=Deathdao.saveOrUpdateDeathRecord(patientId,docId,userId,unitId,narration,  deathId,deathFlag,deathDate2,deathTime);
		
		return val;
	}

	@Override
	@Transactional
	public List<DeathPatientView> getDeathList() {
		
		return Deathdao.getDeathList();
	}

	@Override
	@Transactional
	public boolean deleteDeathRecord(Integer deathId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		

		return Deathdao.deleteUnit(deathId, userId);
	}

	@Override
	@Transactional
	public List<DeathPatientView> getMarkVisitList() {
		
		return Deathdao.getMarkVisitList();
	}

	@Override
	@Transactional
	public DeathPatientView autoSuggestionMarkVisit(String letter,String call) {
		return Deathdao.autoSuggestionMarkVisit( letter,call);
	}

	@Override
	@Transactional
	public List<Doctor> setDoctorList() {
		
		return Deathdao.setDoctorList();
	}

	@Override
	@Transactional
	public List<DeathPatientView> getdeathpatientsList(String fromdate,
			String todate, String callfrom) {
		// TODO Auto-generated method stub
		return Deathdao.getdeathpatientsList( fromdate,  todate,  callfrom);
	}

}
