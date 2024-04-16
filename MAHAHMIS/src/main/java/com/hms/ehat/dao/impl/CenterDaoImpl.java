package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.ShelfDocDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.dto.CenterMasterDTO;
import com.hms.dto.HospitalMasterDTO;
import com.hms.dto.OpdTokenLimitDto;
import com.hms.dto.TypeMasterDTO;
import com.hms.dto.YearMasterDTO;
import com.hms.ehat.dao.CenterDao;

@Repository
public class CenterDaoImpl implements CenterDao{

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveorUpdateStateMaster(StateMasterDto stateMaster) {
		
		try {
			sessionFactory.getCurrentSession().merge(stateMaster);
			
			if(stateMaster.getStateId() == 0)				
				return 1;
			else
				return 2;				
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<StateMasterDto> getAllStateMaster() {
		List<StateMasterDto> lstStateMaster=new ArrayList<StateMasterDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(StateMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstStateMaster = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstStateMaster;
	}

	@Override
	public StateMasterDto editStateMaster(Integer stateId) {
		StateMasterDto obj=new StateMasterDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(StateMasterDto.class);
			criteria.add(Restrictions.eq("stateId", stateId));
			obj=(StateMasterDto) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteStateMaster(StateMasterDto stateMaster) {
		try {
			sessionFactory.getCurrentSession().merge(stateMaster);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public int saveDistrictMaster(DistrictMasterDto districtMaster) {
		
		try {
			sessionFactory.getCurrentSession().merge(districtMaster);
			
			if(districtMaster.getDistrictId() == 0)				
				return 1;
			else
				return 2;				
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DistrictMasterDto> getAllDistrictMaster() {
		List<DistrictMasterDto> lstDistrictMaster=new ArrayList<DistrictMasterDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DistrictMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstDistrictMaster = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstDistrictMaster;
	}

	@Override
	public DistrictMasterDto editDistrictMaster(Integer districtId) {
		DistrictMasterDto obj=new DistrictMasterDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DistrictMasterDto.class);
			criteria.add(Restrictions.eq("districtId", districtId));
			obj=(DistrictMasterDto) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteDistrictMaster(DistrictMasterDto districtMaster) {
		try {
			sessionFactory.getCurrentSession().merge(districtMaster);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}


	@Override
	public int saveTypeMaster(TypeMasterDTO tObj) {
		try {
			sessionFactory.getCurrentSession().merge(tObj);
			
			if(tObj.getTypeId() == 0)				
				return 1;
			else
				return 2;				
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<TypeMasterDTO> getAllTypeMaster() {
		List<TypeMasterDTO> lsttypemaster=new ArrayList<TypeMasterDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(TypeMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lsttypemaster = criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}		
		return lsttypemaster;
	}

	@Override
	public TypeMasterDTO editTypeMaster(Integer typeId) {
		TypeMasterDTO obj=new TypeMasterDTO();
		try{
			obj=(TypeMasterDTO) sessionFactory.getCurrentSession().get(TypeMasterDTO.class, typeId);
			
			return obj;
		}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteTypeMaster(TypeMasterDTO tObj) {
		try{
			sessionFactory.getCurrentSession().merge(tObj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<TypeMasterDTO> getAllITypeMasterAutosuggestion(String typeName) {
		 String sql = "";
		 List<TypeMasterDTO> lsttypeMaster=new ArrayList<TypeMasterDTO>();
		 try{
				
				sql ="SELECT c.type_id, c.type_name FROM ehat_type_doc  c  where c.type_name like '" + typeName + "%' and c.deleted='N' limit 20";
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					TypeMasterDTO obj = new TypeMasterDTO();
					obj.setTypeName((String) row.get("type_name"));
					obj.setTypeId((Integer) row.get("type_id"));
					lsttypeMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
				 
		return lsttypeMaster;
	}

	@Override
	public int saveHospitalMaster(HospitalMasterDTO hObj) {
		try {
			sessionFactory.getCurrentSession().merge(hObj);
			
			if(hObj.getHospitalId() == 0)				
				return 1;
			else
				return 2;				
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<HospitalMasterDTO> getAllHospitalMaster() {
		List<HospitalMasterDTO> lsthospitalmaster=new ArrayList<HospitalMasterDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(HospitalMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lsthospitalmaster = criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}		
		return lsthospitalmaster;
	}

	@Override
	public HospitalMasterDTO editHospitalMaster(Integer hospitalId) {
		HospitalMasterDTO obj=new HospitalMasterDTO();
		try{
			obj=(HospitalMasterDTO) sessionFactory.getCurrentSession().get(HospitalMasterDTO.class, hospitalId);
			
			return obj;
		}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteHospitalMaster(HospitalMasterDTO hObj) {
		try{
			sessionFactory.getCurrentSession().merge(hObj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<HospitalMasterDTO> getAllHospitalMasterAutosuggestion(String hospitalCode) {
		 String sql = "";
		 List<HospitalMasterDTO> lsthospitalMaster=new ArrayList<HospitalMasterDTO>();
		 try{
				sql = "SELECT c.hospital_id, c.hospital_code FROM ehat_hospital_doc  c  where c.hospital_code like '"	+ hospitalCode + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					HospitalMasterDTO obj = new HospitalMasterDTO();
					obj.setHospitalCode((String) row.get("hospital_code"));
					obj.setHospitalId((Integer) row.get("hospital_id"));
					lsthospitalMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
				 
		return lsthospitalMaster;
	}

	@Override
	public int saveYearMaster(YearMasterDTO yObj) {
		try {
			sessionFactory.getCurrentSession().merge(yObj);
			
			if(yObj.getYearId() == 0)				
				return 1;
			else
				return 2;				
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<YearMasterDTO> getAllYearMaster() {
		List<YearMasterDTO> lstyearmaster=new ArrayList<YearMasterDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(YearMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstyearmaster = criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}		
		return lstyearmaster;
	}

	@Override
	public YearMasterDTO editYearMaster(Integer yearId) {
		YearMasterDTO obj=new YearMasterDTO();
		try{
			obj=(YearMasterDTO) sessionFactory.getCurrentSession().get(YearMasterDTO.class, yearId);
			
			return obj;
		}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteYearMaster(YearMasterDTO yObj) {
		try{
			sessionFactory.getCurrentSession().merge(yObj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<YearMasterDTO> getAllYearMasterAutosuggestion(String year) {
		 String sql = "";
		 List<YearMasterDTO> lstyearMaster=new ArrayList<YearMasterDTO>();
		 try{
				sql = "SELECT c.year_id, c.year FROM ehat_year_doc  c  where c.year like '"	+ year + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					YearMasterDTO obj = new YearMasterDTO();
					obj.setYear((String) row.get("year"));
					obj.setYearId((Integer) row.get("year_id"));
					lstyearMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
				 
		return lstyearMaster;
	}

	@Override
	public List<DistrictMasterDto> getAllDistrictBystateId(Integer stateId) {
		List<DistrictMasterDto> lstdistrict=new ArrayList<DistrictMasterDto>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DistrictMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("stateId",stateId));
		
		lstdistrict=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}		
		
		return lstdistrict;
	}

	@Override
	public int saveCenterMaster(CenterMasterDTO cObj) {
		try {
			sessionFactory.getCurrentSession().merge(cObj);
			
			if(cObj.getCenterId() == 0)				
				return 1;
			else
				return 2;				
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<CenterMasterDTO> getAllCenterMaster() {
		List<CenterMasterDTO> lstyearmaster=new ArrayList<CenterMasterDTO>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CenterMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstyearmaster = criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}		
		return lstyearmaster;
	}

	@Override
	public CenterMasterDTO editCenterMaster(Integer centerId) {
		CenterMasterDTO obj=new CenterMasterDTO();
		try{
			obj=(CenterMasterDTO) sessionFactory.getCurrentSession().get(CenterMasterDTO.class, centerId);
			
			return obj;
		}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteCenterMaster(CenterMasterDTO cObj) {
		try{
			sessionFactory.getCurrentSession().merge(cObj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<CenterMasterDTO> getAllCenetrMasterAutosuggestion(String centerName) {
		 String sql = "";
		 List<CenterMasterDTO> lstcenterMaster=new ArrayList<CenterMasterDTO>();
		 try{
				sql = "SELECT c.center_id, c.center_name FROM ehat_center_master_doc  c  where c.center_name like '"	+ centerName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					CenterMasterDTO obj = new CenterMasterDTO();
					obj.setCenterName((String) row.get("center_name"));
					obj.setCenterId((Integer) row.get("center_id"));
					lstcenterMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
				 
		return lstcenterMaster;
	}

	@Override
	public List<StateMasterDto> getAllStateMasterAutosuggestion(String stateName) {
		 String sql = "";
		 List<StateMasterDto> lststateMaster=new ArrayList<StateMasterDto>();
		 try{
				sql = "SELECT c.state_id, c.state_name FROM ehat_center_state_master  c  where c.state_name like '"	+ stateName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					StateMasterDto obj = new StateMasterDto();
					obj.setStateName((String) row.get("state_name"));
					obj.setStateId((Integer) row.get("state_id"));
					lststateMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
				 
		return lststateMaster;
	}

	@Override
	public List<DistrictMasterDto> getAllDistrictMasterAutosuggestion(String districtName) {
		 String sql = "";
		 List<DistrictMasterDto> lstdistrictMaster=new ArrayList<DistrictMasterDto>();
		 try{
				sql = "SELECT c.district_id, c.district_name FROM ehat_center_district_master  c  where c.district_name like '"	+ districtName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					DistrictMasterDto obj = new DistrictMasterDto();
					obj.setDistrictName((String) row.get("district_name"));
					obj.setDistrictId((Integer) row.get("district_id"));
					lstdistrictMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
				 
		return lstdistrictMaster;
	}

	
	
	/*******************************************************************************
	 * @CodeBy : Tushar Jadhav.
	 * @CodeFor : OPD_Token_Limit_Master.
	 ******************************************************************************/
	@Override
	public int saveTokenLimitMaster(OpdTokenLimitDto TokenMaster) {		
			try {
				sessionFactory.getCurrentSession().merge(TokenMaster);
				
				if(TokenMaster.getTokenid() == 0)				
					return 1;
				else
					return 2;				
				
			} catch (Exception e) {
				e.printStackTrace();
				return 0;
				}
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OpdTokenLimitDto> getAllSpecialityMaster() {
		List<OpdTokenLimitDto> lstSpecialityMaster=new ArrayList<OpdTokenLimitDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(OpdTokenLimitDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstSpecialityMaster = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstSpecialityMaster;
	}

	@Override
	public OpdTokenLimitDto editSpecialityMaster(Integer tokenid) {
		OpdTokenLimitDto obj = new OpdTokenLimitDto();
				try{
					Criteria criteria=sessionFactory.getCurrentSession().createCriteria(OpdTokenLimitDto.class);
					criteria.add(Restrictions.eq("tokenid", tokenid));
					obj=(OpdTokenLimitDto) criteria.uniqueResult();
					return obj;
				}catch(Exception e) {
					e.printStackTrace();
				}
				return obj;
		}

	@Override
	public boolean deleteSpecialityMaster(OpdTokenLimitDto TokenMaster) {
		try {
			sessionFactory.getCurrentSession().merge(TokenMaster);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<OpdTokenLimitDto> getAllSpecialityMasterAutosuggestion(String specializationName) {
		 String sql = "";
		 List<OpdTokenLimitDto> lstSpecialityMaster=new ArrayList<OpdTokenLimitDto>();
		 try{
				sql = "SELECT c.id, c.specialization_name FROM opd_token_limit  c  where c.specialization_name like '"	+ specializationName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					OpdTokenLimitDto obj = new OpdTokenLimitDto();
					obj.setSpecializationName((String) row.get("specialization_name"));
					obj.setTokenid((Integer) row.get("id"));
					lstSpecialityMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				 e.printStackTrace();
			}
				 
		return lstSpecialityMaster;
	}
		
		
}
