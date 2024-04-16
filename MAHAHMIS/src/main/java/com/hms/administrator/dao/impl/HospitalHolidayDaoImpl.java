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

import com.hms.administrator.dao.HospitalholidayDao;
import com.hms.administrator.dto.HospitalHolidaysDto;
@Repository
public class HospitalHolidayDaoImpl implements HospitalholidayDao{
	static Logger log=Logger.getLogger(HospitalDetailAdminDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	/*************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: Save HospitalHoliday Master
	 *************************************************/
	@Override
	public int saveHospitalHoliday(String date, String reason,int idHospitalHoliday,
			HttpServletRequest request) {
		log.info("In HospitalDetailAdminDaoImpl saveHospitalHoliday()");		
		String dateArray[]=date.split("/");
		String year=dateArray[2];
		//System.out.println("in"+year);
		List<HospitalHolidaysDto> hospital=new ArrayList<HospitalHolidaysDto>();
		HospitalHolidaysDto hospitalDTO=new HospitalHolidaysDto();
		try{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalHolidaysDto.class);
			criteria.add(Restrictions.eq("date",date));
			criteria.add(Restrictions.eq("selYear",year));
			hospital = criteria.list();
			if(hospital.size()== 0){			
				if(idHospitalHoliday==0)
				{
					hospitalDTO.setDate(date);
					hospitalDTO.setSelYear(year);
					hospitalDTO.setReason(reason);
					hospitalDTO.setStatus("Y");
					hospitalDTO.setCreatedBy(userId);
					hospitalDTO.setDeleted("N");
					sessionFactory.getCurrentSession().merge(hospitalDTO);										
				}
				else
				{
					HospitalHolidaysDto dto = (HospitalHolidaysDto) sessionFactory.getCurrentSession().get(HospitalHolidaysDto.class, idHospitalHoliday);
					if(dto != null)
					{
						dto.setDate(date);
						dto.setReason(reason);
						sessionFactory.getCurrentSession().merge(dto);
					}					
				}
				return 1;
				}
			
				else
				{
				return 2;
			}
		}catch(Exception e){
			log.error("Exception-------->"+e);
			return 0;
		}		
	}
	@Override
	public HospitalHolidaysDto getListHospitalHoliday(String selYear) {
		log.info("In HospitalDetailAdminDaoImpl getListHospitalHoliday()");	
		List<HospitalHolidaysDto> list = new ArrayList<HospitalHolidaysDto>();
		HospitalHolidaysDto hospitalHolidaysDto= new HospitalHolidaysDto();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalHolidaysDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("selYear", selYear));
		list = criteria.list();
		if(list.size()>0){
			hospitalHolidaysDto.setListHoliday(list);
		}

	} catch (Exception e) {
	log.error("Exception------->"+e);
		return null;
	}
	return hospitalHolidaysDto;
	}

	@Override
	public HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHolidays,
			HttpServletRequest request) {
		log.info("In HospitalDetailAdminDaoImpl editHospitalHoliday()");	
		HospitalHolidaysDto hospitalHolidaysDto = new HospitalHolidaysDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalHolidaysDto.class);
			criteria.add(Restrictions.eq("idHospitalHolidays",idHospitalHolidays));
			hospitalHolidaysDto = (HospitalHolidaysDto) criteria.uniqueResult();
			return hospitalHolidaysDto;
		} catch (Exception e) {
		log.error("Exception------>"+e);	  
		}
		return hospitalHolidaysDto;
	}

	@Override
	public boolean deleteHospitalHoliday(Integer idHospitalHolidays) {
		{
			log.info("In HospitalDetailAdminDaoImpl deleteHospitalHoliday()");	
			try{
				HospitalHolidaysDto hospitalHolidaysDto=(HospitalHolidaysDto) sessionFactory.getCurrentSession().get(HospitalHolidaysDto.class, idHospitalHolidays);
				hospitalHolidaysDto.setDeleted("Y");
				return true;
			}catch(Exception e){
				log.error("Exception-------->"+e);
			}
			return false;
		}
		}

	
	
	
	
	
}
