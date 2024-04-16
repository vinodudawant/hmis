package com.hms.administrator.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.ChannelDoctorMgmtDao;
import com.hms.administrator.dto.Chanelling_doctor;
import com.hms.administrator.service.ChannelDoctorMgmtService;
import com.hms.dto.PatientTitle;

@Service
@Transactional
public class ChannelDoctorMgmtServiceImpl implements ChannelDoctorMgmtService {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	ChannelDoctorMgmtDao channeldoctordao;
	@Override
	public int saveReferToDoc(Chanelling_doctor cobj, HttpServletRequest request) {
		if (cobj.getChannDocId() == 0){		
			
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				cobj.setCreatedBy(userId);
				cobj.setStatus("Y");
				cobj.setCreatedDate(new Date(new java.util.Date().getTime()));
				
				PatientTitle pobj=	(PatientTitle) sessionFactory.getCurrentSession().get(PatientTitle.class, cobj.getPrefixId());
				
				cobj.setPrefix(pobj.getPatientTitle());
				
				int response = channeldoctordao.saveReferToDoc(cobj);			
				return response;
				
		}
		else{
			
				
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					cobj.setUpdatedBy(userId);
					cobj.setUpdatedBy(userId);
					cobj.setStatus("Y");
					cobj.setUpdatedDate(new Date(new java.util.Date().getTime()));
					
					PatientTitle pobj=	(PatientTitle) sessionFactory.getCurrentSession().get(PatientTitle.class, cobj.getPrefixId());
					
					cobj.setPrefix(pobj.getPatientTitle());
					
					int response = channeldoctordao.saveReferToDoc(cobj);			
					return response;
			  
		}
	}

	@Override
	public List<Chanelling_doctor> setExistingDoctorTemp(Integer unitId,HttpServletRequest request) {
		return channeldoctordao.setExistingDoctorTemp(unitId);
	}
	
	@Override
	public List<Chanelling_doctor> setExistingDoctorTemp1(HttpServletRequest request) {
		return channeldoctordao.setExistingDoctorTemp1();
	}
	
	@Override
	public Chanelling_doctor editChannelDoctorMgmt(Integer doctorId) {
		return channeldoctordao.editChannelDoctorMgmt(doctorId);
	}

	@Override
	public boolean deleteChannelDoctorMgmt(Integer doctorId,HttpServletRequest request) {
		Chanelling_doctor obj=	(Chanelling_doctor)sessionFactory.getCurrentSession().get(Chanelling_doctor.class, doctorId);
		obj.setDeleted("Y");
		obj.setStatus("N");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		return channeldoctordao.deleteChannelDoctorMgmt(obj);
		
	}

	@Override
	public List<Chanelling_doctor> channelDoctorAutoSuggestion(String doctorName,Integer unitId) {
		return channeldoctordao.channelDoctorAutoSuggestion(doctorName,unitId);
	}

	@Override
	public Integer setnewDocTemp(String action, HttpServletRequest request) {
		return channeldoctordao.setnewDocTemp();
	}

}
