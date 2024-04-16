package com.hms.administrator.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.ChannelHospitalMgmtDao;
import com.hms.administrator.dto.HospitalDetailsDTO;
import com.hms.administrator.service.ChannelHospitalMgmtService;
@Service
@Transactional
public class ChannelHospitalMgmtServiceImpl implements ChannelHospitalMgmtService{
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	ChannelHospitalMgmtDao hdao;
	
	@Override
	public int saveHospitaldetails(HospitalDetailsDTO hobj,HttpServletRequest request) {
		String sql="";
		sql="SELECT count(*) from channel_hospital r where r.deleted='N' and r.hospital_name='"+hobj.getHos_name()+"' " ;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if (hobj.getHosId() == 0){			
			
				if(count > 0){
					return 3;
				}
				else{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				hobj.setCreatedBy(userId);
				hobj.setStatus("Y");
				hobj.setCreatedDate(new Date(new java.util.Date().getTime()));
				int response = hdao.saveHospitaldetails(hobj);			
				return response;
				}
		}
		else{
			
				String sql1="";
				sql1="SELECT count(*) from channel_hospital r where r.deleted='N' and r.hospital_name='"+hobj.getHos_name()+"' and r.idchannel_hospital not in("+hobj.getHosId()+")";
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				
				int count1 = ((Number)countQuery1.uniqueResult()).intValue();
				if(count1 >0){
					return 3;
				}else{
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					hobj.setUpdatedBy(userId);
					hobj.setUpdatedBy(userId);
					hobj.setStatus("Y");
					hobj.setUpdatedDate(new Date(new java.util.Date().getTime()));			
					int response = hdao.saveHospitaldetails(hobj);	
					return response;
			  }
		}
	}

	@Override
	public List<HospitalDetailsDTO> setExistingHospitalTemp(Integer unitId,	HttpServletRequest request) {
		return hdao.setExistingHospitalTemp(unitId);
	}

	@Override
	public HospitalDetailsDTO editChannelHospitalMgmt(Integer hosId) {
		return hdao.editChannelHospitalMgmt(hosId);
	}

	@Override
	public boolean deleteChannelHospitalMgmt(Integer hosId,	HttpServletRequest request) {
		HospitalDetailsDTO obj=	(HospitalDetailsDTO)sessionFactory.getCurrentSession().get(HospitalDetailsDTO.class, hosId);
		obj.setDeleted("Y");
		obj.setStatus("N");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		return hdao.deleteChannelHospitalMgmt(obj);
	}

	@Override
	public List<HospitalDetailsDTO> channelHospitalAutoSuggestion(String hospitalName, Integer unitId) {
		return hdao.channelHospitalAutoSuggestion(hospitalName, unitId);
	}

}
