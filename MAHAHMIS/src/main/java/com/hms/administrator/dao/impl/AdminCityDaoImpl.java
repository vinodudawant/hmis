package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.AdminCityDao;
import com.hms.administrator.dto.AdminCityDTO;

@Repository
public class AdminCityDaoImpl implements AdminCityDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public int saveAdminCity(AdminCityDTO city, HttpServletRequest request) {
	       try {
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminCityDTO.class);
	            criteria.add(Restrictions.eq("state_ID", city.getState_ID()));
	            criteria.add(Restrictions.eq("district_ID", city.getDistrict_ID()));
	            criteria.add(Restrictions.eq("taluka_ID", city.getTaluka_ID()));
	            criteria.add(Restrictions.eq("cityName", city.getCityName()));
	            criteria.add(Restrictions.eq("status", "Y"));
	                     
	            if(criteria.uniqueResult() != null)
	                return 3;
	            
	            if(city.getCity_ID() == 0) {
	            	sessionFactory.getCurrentSession().merge(city);
	                return 1;
	            } else {
	            	AdminCityDTO adminCityDTO = (AdminCityDTO) sessionFactory.getCurrentSession().get(AdminCityDTO.class, city.getCity_ID());
	                if(adminCityDTO != null)
	                {
	                	adminCityDTO.setState_ID(city.getState_ID());
	                	adminCityDTO.setDistrict_ID(city.getDistrict_ID());
	                	adminCityDTO.setTaluka_ID(city.getTaluka_ID());
	                	adminCityDTO.setCityName(city.getCityName());
	                	adminCityDTO.setUpdatedBy(city.getCreatedBy());
	                	sessionFactory.getCurrentSession().merge(adminCityDTO);
	                }
	                return 2;
	            }
	        } catch(Exception e) {
	            e.printStackTrace();
	        }
	        return 0;
	}

	@Override
	public List<AdminCityDTO> getAllCities() {
		try {
			List<AdminCityDTO> adminCityList = new ArrayList<AdminCityDTO>();
			String sql="SELECT c.city_name,c.idcity,t.taluka_name,t.idtaluka,d.dis_name,d.iddistrict,s.state_name,s.idstate FROM city c JOIN taluka t ON c.taluka_id=t.idtaluka JOIN district d ON c.district_id=d.iddistrict JOIN state s ON c.state_id=s.idstate WHERE c.status='Y' ORDER BY c.city_name ASC";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			
			for (Map<String, Object> row : list) {
				AdminCityDTO cityDto = new AdminCityDTO();
				cityDto.setCityName((String) row.get("city_name"));
				cityDto.setTalukaName((String) row.get("taluka_name"));
				cityDto.setDistrictName((String) row.get("dis_name"));
				cityDto.setStateName((String) row.get("state_name"));
				cityDto.setCity_ID((int) row.get("idcity"));
				cityDto.setTaluka_ID((int) row.get("idtaluka"));
				cityDto.setDistrict_ID((int) row.get("iddistrict"));
				cityDto.setState_ID((int) row.get("idstate"));
				adminCityList.add(cityDto);
				cityDto=null;
			}
			return adminCityList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public AdminCityDTO editCityById(int city_id, HttpServletRequest request) {
		 try {
			 AdminCityDTO city=new AdminCityDTO();
	         Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminCityDTO.class);
	         criteria.add(Restrictions.eq("city_ID", city_id));
	         criteria.add(Restrictions.eq("status", "Y"));
	         city=(AdminCityDTO) criteria.uniqueResult();
	         return city;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public boolean deleteCityById(int city_id, HttpServletRequest request) {
		try {
			AdminCityDTO city = (AdminCityDTO) sessionFactory.getCurrentSession().get(AdminCityDTO.class,city_id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			city.setStatus("N");
			city.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<AdminCityDTO> searchCityByName(String name,
			HttpServletRequest request) {
		try {
		List<AdminCityDTO> adminCityList = new ArrayList<AdminCityDTO>();
		String sql="SELECT c.city_name,c.idcity,t.taluka_name,t.idtaluka,d.dis_name,d.iddistrict,s.state_name,s.idstate FROM city c JOIN taluka t ON c.taluka_id=t.idtaluka JOIN district d ON c.district_id=d.iddistrict JOIN state s ON c.state_id=s.idstate WHERE c.status='Y' and c.city_name LIKE '"+name+"%' ORDER BY c.city_name ASC";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list=query.list();
		for (Map<String, Object> row : list) {
			AdminCityDTO cityDto = new AdminCityDTO();
			cityDto.setCityName((String) row.get("city_name"));
			cityDto.setTalukaName((String) row.get("taluka_name"));
			cityDto.setDistrictName((String) row.get("dis_name"));
			cityDto.setStateName((String) row.get("state_name"));
			cityDto.setCity_ID((int) row.get("idcity"));
			cityDto.setTaluka_ID((int) row.get("idtaluka"));
			cityDto.setDistrict_ID((int) row.get("iddistrict"));
			cityDto.setState_ID((int) row.get("idstate"));
			adminCityList.add(cityDto);
			cityDto=null;
		}
		return adminCityList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
