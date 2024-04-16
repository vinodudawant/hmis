package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.HospitalOwnerAdminDao;
import com.hms.administrator.dto.HospitalOwnerDetailDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class HospitalOwnerAdminDaoImpl implements HospitalOwnerAdminDao {
	static Logger log=Logger.getLogger(HospitalDetailAdminDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	/***************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 15-Jan-2020
	* @codeFor	: save hospitalowner detail
	 ***************************************/	
	@Override
	public int savehospitalownerdetail(String savehospitalownerdetail,
			HttpServletRequest request) {
		log.info("In HospitalDetailAdminDaoImpl savehospitalownerdetail()");				
		int res;
		@SuppressWarnings("unused")
		HospitalOwnerDetailDto hospitalOwnerDetailDto=null;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			HospitalOwnerDetailDto hopitalowner = (HospitalOwnerDetailDto) ConfigUIJSONUtility.getObjectFromJSON(savehospitalownerdetail,HospitalOwnerDetailDto.class);
			HospitalOwnerDetailDto hopitalownerdto = hopitalowner.getListHospitalOwner().get(0);
			//System.err.println("AAAA"+hopitalownerdto.getIdhospitalOwner());
			if (hopitalownerdto.getIdhospitalOwner() == 0) {
				hopitalownerdto.setCreatedBy(userId);
				sessionFactory.getCurrentSession().save(hopitalownerdto);
				res=1;
			} else {
				hopitalownerdto.setUpdatedBy(userId);
				sessionFactory.getCurrentSession().merge(hopitalownerdto);
				res=2;
			}
		}

		catch (Exception e) {
			log.error("Exception----->"+e);
			return 0;
		}
		return res;
	}

	@Override
	public HospitalOwnerDetailDto getListhospitalownerdetail() {
		log.info("In HospitalDetailAdminDaoImpl getListhospitalownerdetail()");					
		List<HospitalOwnerDetailDto> list = new ArrayList<HospitalOwnerDetailDto>();
		HospitalOwnerDetailDto hospitalDepartmentDto= new HospitalOwnerDetailDto();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalOwnerDetailDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		list = criteria.list();
		if(list.size()>0){
			hospitalDepartmentDto.setListHospitalOwner(list);
		}

	} catch (Exception e) {
	log.error("Exception--------->"+e);
		return null;
	}
	return hospitalDepartmentDto;
	}

	@Override
	public HospitalOwnerDetailDto edithospitalownerdetail(Integer idhospitalOwner,
			HttpServletRequest request) {
		log.info("In HospitalDetailAdminDaoImpl edithospitalownerdetail()");		
		HospitalOwnerDetailDto hospitalOwnerDetailDto = new HospitalOwnerDetailDto();
		HospitalOwnerDetailDto hospitalownerdetaildto=null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalOwnerDetailDto.class);
			criteria.add(Restrictions.eq("idhospitalOwner",idhospitalOwner));
			hospitalownerdetaildto = (HospitalOwnerDetailDto) criteria.uniqueResult();
			return hospitalownerdetaildto;
		} catch (Exception e) {
			 log.error("Exception--------->"+e);
		}
		return hospitalownerdetaildto;
	}
	
	@Override
	public boolean delethospitalownerdetail(Integer idhospitalOwner,HttpServletRequest request) {		
		{
			log.info("In HospitalDetailAdminDaoImpl delethospitalownerdetail()");		
			
		try{
			HospitalOwnerDetailDto detailDto=(HospitalOwnerDetailDto) sessionFactory.getCurrentSession().get(HospitalOwnerDetailDto.class, idhospitalOwner);
			detailDto.setDeleted("Y");
			return true;
		}catch(Exception e){
		log.error("Exception--------->"+e);	
		}
		return false;
		}
	}

	
	

}
