package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.dto.CenterMasterDTO;
import com.hms.dto.HospitalMasterDTO;
import com.hms.dto.OpdTokenLimitDto;
import com.hms.dto.TypeMasterDTO;
import com.hms.dto.YearMasterDTO;
import com.hms.ehat.dao.CenterDao;

import com.hms.ehat.service.CenterService;


@Service
public class CenterServiceImpl implements CenterService{

	@Autowired
	CenterDao centerDao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public int saveorUpdateStateMaster(StateMasterDto stateMaster, HttpServletRequest request) {
		
		int res = 0;
		try {
			if (stateMaster.getStateId() == 0){
				
				String sql = "select ifnull(count(state_id),0) from ehat_center_state_master where deleted='N' and state_name='"+stateMaster.getStateName()+"' ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number)refQuery.uniqueResult()).intValue();
				
				if(count == 0){
				
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					stateMaster.setCreatedBy(userId);
					stateMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
		
					res = centerDao.saveorUpdateStateMaster(stateMaster);
				}else{
					
					res = 3;
				}			
			}
			else{
				
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				stateMaster.setUpdatedBy(userId);
				stateMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));
				
				res = centerDao.saveorUpdateStateMaster(stateMaster);				
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return res;
	}
	
	@Override
	@Transactional
	public List<StateMasterDto> getAllStateMaster() {		
		return centerDao.getAllStateMaster();
	}

	@Override
	@Transactional
	public StateMasterDto editStateMaster(Integer stateId) {		
		return centerDao.editStateMaster(stateId);
	}

	@Override
	@Transactional
	public boolean deleteStateMaster(Integer stateId, HttpServletRequest request) {
	
		String sql="SELECT count(*) FROM ehat_center_district_master WHERE deleted='N' and state_id ="+stateId;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count > 0){
			return false;
		}else{
			StateMasterDto obj=	(StateMasterDto)sessionFactory.getCurrentSession().get(StateMasterDto.class, stateId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeletedBy(userId);
			
			return centerDao.deleteStateMaster(obj);
		}
	}

	@Override
	@Transactional
	public int saveDistrictMaster(DistrictMasterDto districtMaster, HttpServletRequest request) {
		
		int res = 0;
		try {
			if(districtMaster.getDistrictId() == 0){
				
				String sql = "select ifnull(count(district_id),0) from ehat_center_district_master where deleted='N' and district_name='"+districtMaster.getDistrictName()+"' ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number)refQuery.uniqueResult()).intValue();
				
				if(count == 0){
				
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					districtMaster.setCreatedBy(userId);
					districtMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
					StateMasterDto stobj=(StateMasterDto) sessionFactory.getCurrentSession().get(StateMasterDto.class, districtMaster.getStateId());
					districtMaster.setStateName(stobj.getStateName());
					res = centerDao.saveDistrictMaster(districtMaster);
				}else{
					
					res = 3;
				}			
			}else{
				
				StateMasterDto stobj=(StateMasterDto) sessionFactory.getCurrentSession().get(StateMasterDto.class, districtMaster.getStateId());
				districtMaster.setStateName(stobj.getStateName());
				
				String sql1="";
				sql1 = "select ifnull(count(district_id),0) from ehat_center_district_master d where d.deleted='N' and district_name='"+districtMaster.getDistrictName()+"'and  d.district_id not in("+districtMaster.getDistrictId()+") ";
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);				
				int count1 = ((Number)countQuery1.uniqueResult()).intValue();
				
				if(count1 >0){
					return 3;
				}else{
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					districtMaster.setUpdatedBy(userId);
					districtMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));							
					res = centerDao.saveDistrictMaster(districtMaster);
				}
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return res;
	}

	@Override
	@Transactional
	public List<DistrictMasterDto> getAllDistrictMaster() {
		return centerDao.getAllDistrictMaster();
	}

	@Override
	@Transactional
	public DistrictMasterDto editDistrictMaster(Integer districtId) {
		return centerDao.editDistrictMaster(districtId);
	}

	@Override
	@Transactional
	public boolean deleteDistrictMaster(Integer districtId, HttpServletRequest request) {
	
		
			DistrictMasterDto obj =	(DistrictMasterDto)sessionFactory.getCurrentSession().get(DistrictMasterDto.class, districtId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeletedBy(userId);
			
			return centerDao.deleteDistrictMaster(obj);
		
	}

	@Override
	@Transactional
	public int saveTypeMaster(TypeMasterDTO tObj, HttpServletRequest request) {
		int res = 0;
		try {
			if (tObj.getTypeId() == 0){
				
				String sql = "select ifnull(count(type_id),0) from ehat_type_doc where deleted='N' and type_name='"+tObj.getTypeName()+"' ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number)refQuery.uniqueResult()).intValue();
				
				if(count == 0){
				
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					tObj.setCreatedBy(userId);
					tObj.setCreatedDate(new Date(new java.util.Date().getTime()));
		
					res = centerDao.saveTypeMaster(tObj);
				}else{
					
					res = 3;
				}			
			}
			else{
					String sql1="";
					sql1 = "select ifnull(count(type_id),0) from ehat_type_doc t where t.deleted='N' and type_name='"+tObj.getTypeName()+"' and  t.type_id not in("+tObj.getTypeId()+")";
					Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);				
						int count1 = ((Number)countQuery1.uniqueResult()).intValue();	
						if(count1 >0){
							return 3;
						}else{
						HttpSession session = request.getSession();
						Integer userId = (Integer) session.getAttribute("userId1");
						tObj.setUpdatedBy(userId);
						tObj.setUpdatedDate(new Date(new java.util.Date().getTime()));				
						res = centerDao.saveTypeMaster(tObj);
						}
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return res;
	}

	@Override
	@Transactional
	public List<TypeMasterDTO> getAllTypeMaster() {
		
		return centerDao.getAllTypeMaster();
	}

	@Override
	@Transactional
	public TypeMasterDTO editTypeMaster(Integer typeId) {
		
		return centerDao.editTypeMaster(typeId);
	}

	@Override
	@Transactional
	public boolean deleteTypeMaster(Integer typeId, HttpServletRequest request) {
		TypeMasterDTO obj=	(TypeMasterDTO)sessionFactory.getCurrentSession().get(TypeMasterDTO.class, typeId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return centerDao.deleteTypeMaster(obj);
	}

	@Override
	@Transactional
	public List<TypeMasterDTO> getAllITypeMasterAutosuggestion(String typeName) {		
		return centerDao.getAllITypeMasterAutosuggestion(typeName);
	}

	@Override
	@Transactional
	public int saveHospitalMaster(HospitalMasterDTO hObj,HttpServletRequest request) {
		int res = 0;
		try {
			if (hObj.getHospitalId() == 0){
				
				String sql = "select ifnull(count(hospital_id),0) from ehat_hospital_doc where deleted='N' and hospital_code='"+hObj.getHospitalCode()+"' ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number)refQuery.uniqueResult()).intValue();
				
				if(count == 0){
				
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					hObj.setCreatedBy(userId);
					hObj.setCreatedDate(new Date(new java.util.Date().getTime()));
		
					res = centerDao.saveHospitalMaster(hObj);
				}else{
					
					res = 3;
				}			
			}
			else{
				String sql1="";
				sql1 = "select ifnull(count(hospital_id),0) from ehat_hospital_doc  h where h.deleted='N' and hospital_code='"+hObj.getHospitalCode()+"' and  h.hospital_id not in("+hObj.getHospitalId()+") ";
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);				
					int count1 = ((Number)countQuery1.uniqueResult()).intValue();
				HttpSession session = request.getSession();
				if(count1 >0){
					return 3;
				}else{
				Integer userId = (Integer) session.getAttribute("userId1");
				hObj.setUpdatedBy(userId);
				hObj.setUpdatedDate(new Date(new java.util.Date().getTime()));				
				res = centerDao.saveHospitalMaster(hObj);	
				}
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return res;
	}

	@Override
	@Transactional
	public List<HospitalMasterDTO> getAllHospitalMaster() {
		
		return centerDao.getAllHospitalMaster();
	}

	@Override
	@Transactional
	public HospitalMasterDTO editHospitalMaster(Integer hospitalId) {
		
		return centerDao.editHospitalMaster(hospitalId);
	}

	@Override
	@Transactional
	public boolean deleteHospitalMaster(Integer hospitalId,HttpServletRequest request) {
		HospitalMasterDTO obj=	(HospitalMasterDTO)sessionFactory.getCurrentSession().get(HospitalMasterDTO.class, hospitalId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return centerDao.deleteHospitalMaster(obj);
	}

	@Override
	@Transactional
	public List<HospitalMasterDTO> getAllHospitalMasterAutosuggestion(String hospitalCode) {
		
		return centerDao.getAllHospitalMasterAutosuggestion(hospitalCode);
	}

	@Override
	@Transactional
	public int saveYearMaster(YearMasterDTO yObj, HttpServletRequest request) {
		int res = 0;
		try {
			if (yObj.getYearId() == 0){
				
				String sql = "select ifnull(count(year_id),0) from ehat_year_doc where deleted='N' and year='"+yObj.getYear()+"' ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number)refQuery.uniqueResult()).intValue();
				
				if(count == 0){
				
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					yObj.setCreatedBy(userId);
					yObj.setCreatedDate(new Date(new java.util.Date().getTime()));
		
					res = centerDao.saveYearMaster(yObj);
				}else{
					
					res = 3;
				}			
			}
			else{
				String sql1="";
				 sql1 = "select ifnull(count(year_id),0) from ehat_year_doc y where y.deleted='N' and year='"+yObj.getYear()+"' and  y.year_id not in("+yObj.getYearId()+") ";
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);				
					int count1 = ((Number)countQuery1.uniqueResult()).intValue();
					if(count1 >0){
						return 3;
					}else{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				yObj.setUpdatedBy(userId);
				yObj.setUpdatedDate(new Date(new java.util.Date().getTime()));				
				res = centerDao.saveYearMaster(yObj);	
				}
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return res;
	}

	@Override
	@Transactional
	public List<YearMasterDTO> getAllYearMaster() {
		
		return centerDao.getAllYearMaster();
	}

	@Override
	@Transactional
	public YearMasterDTO editYearMaster(Integer yearId) {
		
		return centerDao.editYearMaster(yearId);
	}

	@Override
	@Transactional
	public boolean deleteYearMaster(Integer yearId, HttpServletRequest request) {
		YearMasterDTO obj=	(YearMasterDTO)sessionFactory.getCurrentSession().get(YearMasterDTO.class, yearId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return centerDao.deleteYearMaster(obj);
	}

	@Override
	@Transactional
	public List<YearMasterDTO> getAllYearMasterAutosuggestion(String year) {
		
		return centerDao.getAllYearMasterAutosuggestion(year);
	}

	@Override
	@Transactional

	public List<DistrictMasterDto> getAllDistrictBystateId(Integer stateId) {
		
		return centerDao.getAllDistrictBystateId(stateId);
	}

	@Override
	@Transactional
	public int saveCenterMaster(CenterMasterDTO cObj, HttpServletRequest request) {
		int res = 0;
		try {
			String sql = "select ifnull(count(center_id),0) from ehat_center_master_doc where deleted='N' and center_name='"+cObj.getCenterName()+"' ";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number)refQuery.uniqueResult()).intValue();
			
			String sName="SELECT  r.state_name from ehat_center_state_master r where r.deleted='N' and r.state_id="+cObj.getStateId();
			Query stateDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sName);
			String stateName  = stateDetailsQuery.uniqueResult().toString();
			
			String dsql="SELECT  r.district_name from ehat_center_district_master r where r.deleted='N' and r.district_id="+cObj.getDistrictId();
			Query districtDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(dsql);
			String distictName  = districtDetailsQuery.uniqueResult().toString();
			
			String tsql="SELECT  r.type_name from ehat_type_doc r where r.deleted='N' and r.type_id="+cObj.getTypeId();
			Query typeDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(tsql);
			String typeName  = typeDetailsQuery.uniqueResult().toString();
			
			String hsql="SELECT  r.hospital_code from ehat_hospital_doc r where r.deleted='N' and r.hospital_id="+cObj.getHospitalId();
			Query hospitalDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(hsql);
			String hospitalCode  = hospitalDetailsQuery.uniqueResult().toString();
			
			String ysql="SELECT  r.year from ehat_year_doc r where r.deleted='N' and r.year_id="+cObj.getYearId();
			Query yearDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(ysql);
			String year  = yearDetailsQuery.uniqueResult().toString();
			
			cObj.setStateName(stateName);
			cObj.setDistrictName(distictName);
			cObj.setTypeName(typeName);
			cObj.setHospitalName(hospitalCode);
			cObj.setYear(year);
			
			
			
			if (cObj.getCenterId() == 0){			
				
				
				if(count == 0){
				
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					cObj.setCreatedBy(userId);
					cObj.setCreatedDate(new Date(new java.util.Date().getTime()));
		
					res = centerDao.saveCenterMaster(cObj);
				}else{
					
					res = 3;
				}			
			}
			else{
				 if(count==0)
					 {
					
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					cObj.setUpdatedBy(userId);
					cObj.setUpdatedDate(new Date(new java.util.Date().getTime()));
					
					res = centerDao.saveCenterMaster(cObj);	
					 }else{
							
							res = 3;
						}
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return res;
	}

	@Override
	@Transactional
	public List<CenterMasterDTO> getAllCenterMaster() {
		
		return centerDao.getAllCenterMaster();
	}

	@Override
	@Transactional
	public CenterMasterDTO editCenterMaster(Integer centerId) {
		
		return centerDao.editCenterMaster(centerId);
	}

	@Override
	@Transactional
	public boolean deleteCenterMaster(Integer centerId,	HttpServletRequest request) {
		CenterMasterDTO obj=	(CenterMasterDTO)sessionFactory.getCurrentSession().get(CenterMasterDTO.class, centerId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return centerDao.deleteCenterMaster(obj);
	}

	@Override
	@Transactional
	public List<CenterMasterDTO> getAllCenetrMasterAutosuggestion(String centerName) {
		
		return centerDao.getAllCenetrMasterAutosuggestion(centerName);
	}

	@Override
	@Transactional
	public List<StateMasterDto> getAllStateMasterAutosuggestion(String stateName) {
		
		return centerDao.getAllStateMasterAutosuggestion(stateName);
	}

	@Override
	@Transactional
	public List<DistrictMasterDto> getAllDistrictMasterAutosuggestion(String districtName) {
		
		return centerDao.getAllDistrictMasterAutosuggestion(districtName);
	}

	
	/*******************************************************************************
	 * @CodeBy : Tushar Jadhav.
	 * @CodeFor : OPD_Token_Limit_Master.
	 ******************************************************************************/
	@Override
	@Transactional
	public int saveTokenLimitMaster(OpdTokenLimitDto TokenMaster, HttpServletRequest request) {
		
		int res = 0;
		try {
			if(TokenMaster.getTokenid() == 0){
				
				//String sql = "select ifnull(count(id),0) from opd_token_limit where deleted='N' and in_count='"+TokenMaster.getInCount()+"' and next_count='"+TokenMaster.getNextCount()+"' and wait_count='"+TokenMaster.getWaitingCount()+"' ";
				String sql = "select ifnull(count(id),0) from opd_token_limit where deleted='N' and speciality_id='"+TokenMaster.getSpecialisationId()+"' ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number)refQuery.uniqueResult()).intValue();
				
				if(count == 0){
				
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					TokenMaster.setCreatedBy(userId);
					TokenMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
					HospitalSpecialisationDto specializationDto = (HospitalSpecialisationDto) sessionFactory.getCurrentSession().get(HospitalSpecialisationDto.class,TokenMaster.getSpecialisationId());
					TokenMaster.setSpecializationName(specializationDto.getSpecializationName());
					res = centerDao.saveTokenLimitMaster(TokenMaster);
				}else{
					
					res = 3;
				}			
			}else{
				
				HospitalSpecialisationDto specializationDto = (HospitalSpecialisationDto) sessionFactory.getCurrentSession().get(HospitalSpecialisationDto.class,TokenMaster.getSpecialisationId());
				TokenMaster.setSpecializationName(specializationDto.getSpecializationName());
				
				String sql1="";
				//sql1 = "select ifnull(count(id),0) from opd_token_limit where deleted='N' and in_count='"+TokenMaster.getInCount()+"' and next_count='"+TokenMaster.getNextCount()+"' and wait_count='"+TokenMaster.getWaitingCount()+"' and  id not in("+TokenMaster.getTokenid()+") ";
				sql1 = "select ifnull(count(id),0) from opd_token_limit where deleted='N' and speciality_id='"+TokenMaster.getSpecialisationId()+"' and  id not in("+TokenMaster.getTokenid()+") ";
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);				
				int count1 = ((Number)countQuery1.uniqueResult()).intValue();
				
				if(count1 >0){
					return 3;
				}else{
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					TokenMaster.setUpdatedBy(userId);
					TokenMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));							
					res =  centerDao.saveTokenLimitMaster(TokenMaster);
				}
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return res;
	}

	@Override
	@Transactional
	public List<OpdTokenLimitDto> getAllSpecialityMaster() {
		return centerDao.getAllSpecialityMaster();
	}

	@Override
	@Transactional
	public OpdTokenLimitDto editSpecialityMaster(Integer tokenid) {
		return centerDao.editSpecialityMaster(tokenid);
	}

	@Override
	@Transactional
	public boolean deleteSpecialityMaster(Integer tokenid, HttpServletRequest request) {
		
		OpdTokenLimitDto obj =	(OpdTokenLimitDto)sessionFactory.getCurrentSession().get(OpdTokenLimitDto.class, tokenid);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return centerDao.deleteSpecialityMaster(obj);
	}

	@Override
	@Transactional
	public List<OpdTokenLimitDto> getAllSpecialityMasterAutosuggestion(String specializationName) {
		return centerDao.getAllSpecialityMasterAutosuggestion(specializationName);

	}
		
	
}
