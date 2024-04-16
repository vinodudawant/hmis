package com.hms.administrator.dao.impl;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.administrator.dao.HospitalDetailAdminDao;
import com.hms.administrator.dto.HospitalOwnerDetailDto;
import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.administrator.dto.HospitalHolidaysDto;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.patient.util.ConfigUIJSONUtility;
@Repository

public class HospitalDetailAdminDaoImpl implements HospitalDetailAdminDao {

	
	@Autowired
	SessionFactory sessionFactory;
		
	/************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: Save HospitalInfomartion Detail
	 *************************************************/	
	/*@Override
	public Integer savehospitalInfo(String hospitalInfo, HttpServletRequest request) {
		int res;
		HospitalDetails hospitalinfodto=null;
		try {	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");						
			HospitalDetails hospitalInfoList=(HospitalDetails) ConfigUIJSONUtility.getObjectFromJSON(hospitalInfo,HospitalDetails.class);	
			HospitalDetails	hospitalDto=hospitalInfoList.getListHospitalDetails().get(0);
			System.err.println("obj.........."+hospitalDto.getIdhospital());
			System.err.println("cobj.........."+hospitalDto.getHospitalCity());
			Session s=sessionFactory.getCurrentSession();
			//System.out.println("id:"+hospitalDto.getIdhospital());
			  if(hospitalDto.getIdhospital()==0)
			    {
				  hospitalDto.setCreatedBy(userId);
				  hospitalDto.setDeleted("N");
				  hospitalDto.setCreatedDate(new Date(new java.util.Date().getTime()));								
						hospitalDto.setCreatedBy(userId);
						hospitalDto.setDeleted("N");
						hospitalDto.setCreatedDate(new Date(new java.util.Date().getTime()));					
						Serializable ser= s.save(hospitalDto);	
						Integer id=(Integer)ser;
						return id;
				}else{
					hospitalDto.setUpdatedBy(userId);
					hospitalDto.setDeleted("N");
					hospitalDto.setUpdatedBy(userId);
					hospitalDto.setDeleted("N");
					hospitalDto.setUpdatedDate(new Date(new java.util.Date().getTime()));				
					hospitalinfodto=(HospitalDetails) s.merge(hospitalDto);			
					return 1;
				}
			} 		
		catch (Exception e) {
			e.printStackTrace();			
		}
		return 0;
	}*/
	
	/************************************************
	* @author	:Annapurna Jamnor
	* @date		: 23-Nov-2023
	* @codeFor	: Save HospitalInfomartion Detail Unitwise
	 *************************************************/	
	@Override
	public Integer savehospitalInfo(String hospitalInfo,String hospitalId, HttpServletRequest request) {
			int res;
		HospitalDetails hospitalinfodto=null;
		try {	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");						
			HospitalDetails hospitalInfoList=(HospitalDetails) ConfigUIJSONUtility.getObjectFromJSON(hospitalInfo,HospitalDetails.class);	
			HospitalDetails	hospitalDto=hospitalInfoList.getListHospitalDetails().get(0);
			//System.err.println("obj.........."+hospitalDto.getIdhospital());
			//System.err.println("cobj.........."+hospitalDto.getHospitalCity());
			Session s=sessionFactory.getCurrentSession();
			//System.out.println("id:"+hospitalDto.getIdhospital());
			
			String sql = "select ifnull(count(idhospital),0) from hospital where deleted='N' and hospital_unit_id="+hospitalId+" ";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number)refQuery.uniqueResult()).intValue();
			
			if(count == 0){
			    
				  hospitalDto.setCreatedBy(userId);
				  hospitalDto.setDeleted("N");
				  hospitalDto.setCreatedDate(new Date(new java.util.Date().getTime()));								
						hospitalDto.setCreatedBy(userId);
						hospitalDto.setDeleted("N");
						hospitalDto.setCreatedDate(new Date(new java.util.Date().getTime()));					
						Serializable ser= s.save(hospitalDto);	
						Integer id=(Integer)ser;
						return id;
							
			}else{
					hospitalDto.setUpdatedBy(userId);
					hospitalDto.setDeleted("N");
					hospitalDto.setUpdatedBy(userId);
					hospitalDto.setDeleted("N");
					hospitalDto.setUpdatedDate(new Date(new java.util.Date().getTime()));				
					hospitalinfodto=(HospitalDetails) s.merge(hospitalDto);			
					return 1;
				}			
			} 		
		catch (Exception e) {
			e.printStackTrace();			
		}
		return 0;
	}
		
	@SuppressWarnings("unchecked")
	@Override
	public HospitalDetails getListHospitalDetails() {
		List<HospitalDetails> list = new ArrayList<HospitalDetails>();
		HospitalDetails hospitalDto= new HospitalDetails();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		list = criteria.list();
		if(list.size()>0){
			hospitalDto.setListHospitalDetails(list);
		}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return hospitalDto;
	}
	
/*************************************************************************************************
	* @author	:Annapurna Jamnor
	* @date		: 23-Nov-2023
	* @codeFor	: Get  hospital Information Unitwise
 ************************************************************************************************/

	@SuppressWarnings("unchecked")
	@Override
	public HospitalDetails getListHospitalDetailsNew(Integer hospitalUnitId) {
		List<HospitalDetails> list = new ArrayList<HospitalDetails>();
		HospitalDetails hospitalDto= new HospitalDetails();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("hospitalUnitId", hospitalUnitId));
		list = criteria.list();
		if(list.size()>0){
			hospitalDto.setListHospitalDetails(list);
		}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return hospitalDto;
	}
	
	@Override
	public int saveHospitalSpcialization(String hospitalSpecialization,	HttpServletRequest request,Integer unitId) {

		int res;
		@SuppressWarnings("unused")
		HospitalSpecialisationDto hospitalSpecialisationDto = null;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
		
			HospitalSpecialisationDto hospitalspcl = (HospitalSpecialisationDto) ConfigUIJSONUtility
					.getObjectFromJSON(hospitalSpecialization, HospitalSpecialisationDto.class);
			HospitalSpecialisationDto hospitalspcldto = hospitalspcl.getListHospSpcl().get(0);
			System.out.print("hiiiiiiiiiiiii"+hospitalSpecialization);
			if (hospitalspcldto.getSpecialisationId() == 0) {
				hospitalspcldto.setCreatedBy(userId);
				hospitalspcldto.setUnitId(unitId);
				sessionFactory.getCurrentSession().save(hospitalspcldto);
				res=1;
			} else {
				hospitalspcldto.setUpdatedBy(userId);
				sessionFactory.getCurrentSession().merge(hospitalspcldto);
				res=2;
			}
		}

		catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return res;
	}
     
	
	
	@Override
	public HospitalSpecialisationDto getHospitalspecilizationList() {	
		List<HospitalSpecialisationDto> list = new ArrayList<HospitalSpecialisationDto>();
		HospitalSpecialisationDto hospitalSpecialisationDto= new HospitalSpecialisationDto();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		list = criteria.list();
		if(list.size()>0){
			hospitalSpecialisationDto.setListHospSpcl(list);
		}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return hospitalSpecialisationDto;
	}

	@Override
	public boolean deletehospitalspcialization(Integer specialisationId,HttpServletRequest request) {
		{
			try{
				HospitalSpecialisationDto hospitalSpecialisationDto=(HospitalSpecialisationDto) sessionFactory.getCurrentSession().get(HospitalSpecialisationDto.class, specialisationId);
				hospitalSpecialisationDto.setDeleted("Y");
				return true;
			}catch(Exception e){
				e.printStackTrace();
			}
			return false;
		}
	}
		
	@Override
	public int savehospitaldeaprtment(String HospitalDepartment, Integer unitId,
			HttpServletRequest request) {
		
		int res;
		HospitalDepartmentDto hospitalDepartmentDto = null;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			HospitalDepartmentDto hospitaldepartment = (HospitalDepartmentDto) ConfigUIJSONUtility
					.getObjectFromJSON(HospitalDepartment, HospitalDepartmentDto.class);
			HospitalDepartmentDto hospitaldeaprtdto =hospitaldepartment .getListDepartments().get(0);
			//System.out.println("1 :"+hospitaldeaprtdto);
			if (hospitaldeaprtdto.getDepartmentId() == 0) {
				hospitaldeaprtdto.setCreatedBy(userId);
				sessionFactory.getCurrentSession().save(hospitaldeaprtdto);
				res=1;
			} else {
				hospitaldeaprtdto.setUpdatedBy(userId);
				sessionFactory.getCurrentSession().merge(hospitaldeaprtdto);
				res=2;
			}
		}		
		catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return res;
	}

	@Override
	public HospitalDepartmentDto getListDepartments() {
		
		List<HospitalDepartmentDto> list = new ArrayList<HospitalDepartmentDto>();
		HospitalDepartmentDto hospitalDepartmentDto= new HospitalDepartmentDto();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDepartmentDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		list = criteria.list();
		if(list.size()>0){
			hospitalDepartmentDto.setListDepartments(list);
		}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return hospitalDepartmentDto;
	}
	

	@Override
	public boolean deletehospitalhospitaldepartment(Integer departmentId,
			HttpServletRequest request) {
		
		{
			
		try{
			HospitalDepartmentDto hospitalDepartmentDto=(HospitalDepartmentDto) sessionFactory.getCurrentSession().get(HospitalDepartmentDto.class, departmentId);
			hospitalDepartmentDto.setDeleted("Y");
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	}
	
	/***************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 15-Jan-2020
	* @codeFor	: save hospitalowner detail
	 ***************************************/	
	@Override
	public int savehospitalownerdetail(String savehospitalownerdetail,
			HttpServletRequest request) {
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
			e.printStackTrace();
			return 0;
		}
		return res;
	}

	
	  @Override public HospitalOwnerDetailDto getListhospitalownerdetail() {
	  
	  List<HospitalOwnerDetailDto> list = new ArrayList<HospitalOwnerDetailDto>();
	  HospitalOwnerDetailDto hospitalDepartmentDto= new HospitalOwnerDetailDto();
	  try { Criteria criteria =
	  sessionFactory.getCurrentSession().createCriteria(HospitalOwnerDetailDto.
	  class); criteria.add(Restrictions.eq("deleted", "N")); list =
	  criteria.list(); if(list.size()>0){
	  hospitalDepartmentDto.setListHospitalOwner(list); }
	  
	  } catch (Exception e) { e.printStackTrace(); return null; } return
	  hospitalDepartmentDto; }
	  
	  @Override public HospitalOwnerDetailDto edithospitalownerdetail(Integer
	  idhospitalOwner, HttpServletRequest request) {
	  
	  HospitalOwnerDetailDto hospitalOwnerDetailDto = new HospitalOwnerDetailDto();
	  HospitalOwnerDetailDto hospitalownerdetaildto=null; try {
	  
	  Criteria criteria =
	  sessionFactory.getCurrentSession().createCriteria(HospitalOwnerDetailDto.
	  class); criteria.add(Restrictions.eq("idhospitalOwner",idhospitalOwner));
	  hospitalownerdetaildto = (HospitalOwnerDetailDto) criteria.uniqueResult();
	  return hospitalownerdetaildto; } catch (Exception e) { e.printStackTrace(); }
	  return hospitalownerdetaildto; }
	  
	  @Override public boolean delethospitalownerdetail(Integer
	  idhospitalOwner,HttpServletRequest request) { { try{ HospitalOwnerDetailDto
	  detailDto=(HospitalOwnerDetailDto)
	  sessionFactory.getCurrentSession().get(HospitalOwnerDetailDto.class,
	  idhospitalOwner); detailDto.setDeleted("Y"); return true; }catch(Exception
	  e){ e.printStackTrace(); } return false; } }
	 
	
	/*************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: Save HospitalHoliday Master
	 *************************************************/
	@Override
	public int saveHospitalHoliday(String date, String reason,int idHospitalHoliday,
			HttpServletRequest request) {
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
			e.printStackTrace();
			return 0;
		}		
	}
	@Override
	public HospitalHolidaysDto getListHospitalHoliday(String selYear) {
		
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
		e.printStackTrace();
		return null;
	}
	return hospitalHolidaysDto;
	}

	@Override
	public HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHolidays,
			HttpServletRequest request) {
		
		HospitalHolidaysDto hospitalHolidaysDto = new HospitalHolidaysDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalHolidaysDto.class);
			criteria.add(Restrictions.eq("idHospitalHolidays",idHospitalHolidays));
			hospitalHolidaysDto = (HospitalHolidaysDto) criteria.uniqueResult();
			return hospitalHolidaysDto;
		} catch (Exception e) {
			  e.printStackTrace();
		}
		return hospitalHolidaysDto;
	}

	@Override
	public boolean deleteHospitalHoliday(Integer idHospitalHolidays) {
		{
			
			try{
				HospitalHolidaysDto hospitalHolidaysDto=(HospitalHolidaysDto) sessionFactory.getCurrentSession().get(HospitalHolidaysDto.class, idHospitalHolidays);
				hospitalHolidaysDto.setDeleted("Y");
				return true;
			}catch(Exception e){
				e.printStackTrace();
			}
			return false;
		}
		}

	@Override
	public HospitalDetails gethospitalinfoadmin1(int hospitalId) {

		List<HospitalDetails> list = new ArrayList<HospitalDetails>();
		HospitalDetails hospitalDto= new HospitalDetails();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("hospitalUnitId",hospitalId));
		list = criteria.list();
		if(list.size()>0){
			hospitalDto.setListHospitalDetails(list);
		}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return hospitalDto;
	
		
	}

	@Override
	public HospitalSpecialisationDto gethospitalspcializationListByUnitId(Integer unitId) {	
		List<HospitalSpecialisationDto> list = new ArrayList<HospitalSpecialisationDto>();
		HospitalSpecialisationDto hospitalSpecialisationDto= new HospitalSpecialisationDto();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId", unitId));
		list = criteria.list();
		if(list.size()>0){
			hospitalSpecialisationDto.setListHospSpcl(list);
		}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return hospitalSpecialisationDto;
	}	
	@Override
	public HospitalDepartmentDto getListDepartmentsByUnitId(Integer unitId) {
		
		List<HospitalDepartmentDto> list = new ArrayList<HospitalDepartmentDto>();
		HospitalDepartmentDto hospitalDepartmentDto= new HospitalDepartmentDto();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDepartmentDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId", unitId));
		list = criteria.list();
		if(list.size()>0){
			hospitalDepartmentDto.setListDepartments(list);
		}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return hospitalDepartmentDto;
	}

	

}
