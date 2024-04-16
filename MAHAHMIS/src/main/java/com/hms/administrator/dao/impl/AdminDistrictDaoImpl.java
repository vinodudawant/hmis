package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.AdminDistrictDao;
import com.hms.administrator.dto.AdminDistrictDTO;

@SuppressWarnings("unchecked")
@Repository
public class AdminDistrictDaoImpl implements AdminDistrictDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveAdminDistrict(AdminDistrictDTO district,HttpServletRequest request) {
        try {
        	
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminDistrictDTO.class);
            criteria.add(Restrictions.eq("state_ID", district.getState_ID()));
            criteria.add(Restrictions.eq("districtName", district.getDistrictName()));
            criteria.add(Restrictions.eq("status", "Y"));
                     
            if(criteria.uniqueResult() != null)
                return 3;
            
            if(district.getDistrict_ID() == 0) {
            	//district.setState_ID(stateId);
            	sessionFactory.getCurrentSession().merge(district);
                return 1;
            } else {
            	AdminDistrictDTO districtDTO = (AdminDistrictDTO) sessionFactory.getCurrentSession().get(AdminDistrictDTO.class, district.getDistrict_ID());
                if(districtDTO != null)
                {
                	districtDTO.setState_ID(district.getState_ID());
                	districtDTO.setDistrictName(district.getDistrictName());
                	districtDTO.setUpdatedBy(district.getCreatedBy());
                	sessionFactory.getCurrentSession().merge(districtDTO);
                }
                return 2;
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
	}

	
	@Override
	public List<AdminDistrictDTO> getAllDistrict() {
        try {
        	List<AdminDistrictDTO> adminDistrictList=new ArrayList<AdminDistrictDTO>();
        	
			String sql="SELECT d.dis_name,d.iddistrict,s.state_name,s.idstate FROM district d JOIN state s ON d.state_id=s.idstate WHERE d.status='Y' ORDER BY s.state_name ASC";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			
			for (Map<String, Object> row : list) {
				AdminDistrictDTO districtDto = new AdminDistrictDTO();
				districtDto.setDistrictName((String) row.get("dis_name"));
				districtDto.setStateName((String) row.get("state_name"));
				districtDto.setDistrict_ID((int) row.get("iddistrict"));
				districtDto.setState_ID((int) row.get("idstate"));
				adminDistrictList.add(districtDto);
				districtDto=null;
			}
              return  adminDistrictList;      
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
	}

	@Override
	public AdminDistrictDTO editDistrictById(int district_id,
			HttpServletRequest request) {
		 try {
			 	AdminDistrictDTO district=new AdminDistrictDTO();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminDistrictDTO.class);
	            criteria.add(Restrictions.eq("district_ID", district_id));
	            criteria.add(Restrictions.eq("status", "Y"));
	            district=(AdminDistrictDTO) criteria.uniqueResult();
	              return district;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public boolean deleteDistrictById(int district_id,
			HttpServletRequest request) {
		try {
			AdminDistrictDTO district = (AdminDistrictDTO) sessionFactory.getCurrentSession().get(AdminDistrictDTO.class,district_id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			district.setStatus("N");
			district.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


	@Override
	public List<AdminDistrictDTO> getAllDistrictListByStateId(int stateId,
			HttpServletRequest request) {
		 try {
				List<AdminDistrictDTO> districtListByState=new ArrayList<AdminDistrictDTO>();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminDistrictDTO.class);
	            criteria.add(Restrictions.eq("state_ID", stateId));
	            criteria.add(Restrictions.eq("status", "Y"));
	            criteria.addOrder(Order.asc("districtName"));
	            districtListByState= criteria.list();
	             return districtListByState;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}


	@Override
	public List<AdminDistrictDTO> searchDistrictByName(String name,
			HttpServletRequest request) {
		try {
			List<AdminDistrictDTO> adminDistrictList = new ArrayList<AdminDistrictDTO>();
			String sql="SELECT d.dis_name,d.iddistrict,s.state_name,s.idstate FROM district d JOIN state s ON d.state_id=s.idstate WHERE d.status='Y' and d.dis_name LIKE '"+name+"%' ORDER BY d.dis_name ASC";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			
			for (Map<String, Object> row : list) {
				AdminDistrictDTO districtDto = new AdminDistrictDTO();
				districtDto.setDistrictName((String) row.get("dis_name"));
				districtDto.setStateName((String) row.get("state_name"));
				districtDto.setDistrict_ID((int) row.get("iddistrict"));
				districtDto.setState_ID((int) row.get("idstate"));
				adminDistrictList.add(districtDto);
				districtDto=null;
			}
			return adminDistrictList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
