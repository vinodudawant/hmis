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

import com.hms.administrator.dao.AdminTalukaDao;
import com.hms.administrator.dto.AdminTalukaDTO;

@SuppressWarnings("unchecked")
@Repository
public class AdminTalukaDaoImpl implements AdminTalukaDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public int saveAdminTaluka(AdminTalukaDTO taluka,
			HttpServletRequest request) {
	       try {
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminTalukaDTO.class);
	            criteria.add(Restrictions.eq("state_ID", taluka.getState_ID()));
	            criteria.add(Restrictions.eq("district_ID", taluka.getDistrict_ID()));
	            criteria.add(Restrictions.eq("talukaName", taluka.getTalukaName()));
	            criteria.add(Restrictions.eq("status", "Y"));
	                     
	            if(criteria.uniqueResult() != null)
	                return 3;
	            if(taluka.getTaluka_ID() == 0) {
	            	sessionFactory.getCurrentSession().merge(taluka);
	                return 1;
	            } else {
	            	AdminTalukaDTO adminTalukaDTO = (AdminTalukaDTO) sessionFactory.getCurrentSession().get(AdminTalukaDTO.class, taluka.getTaluka_ID());
	                if(adminTalukaDTO != null)
	                {
	                	adminTalukaDTO.setState_ID(taluka.getState_ID());
	                	adminTalukaDTO.setDistrict_ID(taluka.getDistrict_ID());
	                	adminTalukaDTO.setTalukaName(taluka.getTalukaName());
	                	adminTalukaDTO.setUpdatedBy(taluka.getCreatedBy());
	                	sessionFactory.getCurrentSession().merge(adminTalukaDTO);
	                }
	                return 2;
	            }
	        } catch(Exception e) {
	            e.printStackTrace();
	        }
	        return 0;
	}

	
	@Override
	public List<AdminTalukaDTO> getAllTaluka() {
		  try {
	        	List<AdminTalukaDTO> adminTalukaList=new ArrayList<AdminTalukaDTO>();
	        	String sql="SELECT t.taluka_name,t.idtaluka,d.dis_name,d.iddistrict,s.state_name,s.idstate FROM taluka t JOIN district d ON t.district_id=d.iddistrict JOIN state s ON t.state_id=s.idstate WHERE t.status='Y' ORDER BY t.taluka_name ASC";
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				
				for (Map<String, Object> row : list) {
					AdminTalukaDTO talukaDto = new AdminTalukaDTO();
					talukaDto.setTalukaName((String) row.get("taluka_name"));
					talukaDto.setDistrictName((String) row.get("dis_name"));
					talukaDto.setStateName((String) row.get("state_name"));
					talukaDto.setTaluka_ID((int) row.get("idtaluka"));
					talukaDto.setDistrict_ID((int) row.get("iddistrict"));
					talukaDto.setState_ID((int) row.get("idstate"));
					adminTalukaList.add(talukaDto);
					talukaDto=null;
				}
	              return  adminTalukaList;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public AdminTalukaDTO editTalukaById(int taluka_id,
			HttpServletRequest request) {
		 try {
			 AdminTalukaDTO taluka=new AdminTalukaDTO();
	         Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminTalukaDTO.class);
	         criteria.add(Restrictions.eq("taluka_ID", taluka_id));
	         criteria.add(Restrictions.eq("status", "Y"));
	         taluka=(AdminTalukaDTO) criteria.uniqueResult();
	         return taluka;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public boolean deleteTalukaById(int taluka_id, HttpServletRequest request) {
		try {
			AdminTalukaDTO taluka = (AdminTalukaDTO) sessionFactory.getCurrentSession().get(AdminTalukaDTO.class,taluka_id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			taluka.setStatus("N");
			taluka.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


	@Override
	public List<AdminTalukaDTO> getAllTalukaListByDistrictId(int districtId,
			HttpServletRequest request) {
		 try {
				List<AdminTalukaDTO> talukaListByDistrict=new ArrayList<AdminTalukaDTO>();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminTalukaDTO.class);
	            criteria.add(Restrictions.eq("district_ID", districtId));
	            criteria.add(Restrictions.eq("status", "Y"));
	            criteria.addOrder(Order.asc("talukaName"));
	            talukaListByDistrict= criteria.list();
	             return talukaListByDistrict;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	
	}


	@Override
	public List<AdminTalukaDTO> searchTalukaByName(String name,
			HttpServletRequest request) {
		try {
			List<AdminTalukaDTO> adminTalukaList = new ArrayList<AdminTalukaDTO>();
			String sql="SELECT t.taluka_name,t.idtaluka,d.dis_name,d.iddistrict,s.state_name,s.idstate FROM taluka t JOIN district d ON t.district_id=d.iddistrict JOIN state s ON t.state_id=s.idstate WHERE t.status='Y' and t.taluka_name LIKE '"+name+"%' ORDER BY t.taluka_name ASC";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			
			for (Map<String, Object> row : list) {
				AdminTalukaDTO talukaDto = new AdminTalukaDTO();
				talukaDto.setTalukaName((String) row.get("taluka_name"));
				talukaDto.setDistrictName((String) row.get("dis_name"));
				talukaDto.setStateName((String) row.get("state_name"));
				talukaDto.setTaluka_ID((int) row.get("idtaluka"));
				talukaDto.setDistrict_ID((int) row.get("iddistrict"));
				talukaDto.setState_ID((int) row.get("idstate"));
				adminTalukaList.add(talukaDto);
				talukaDto=null;
			}
			return adminTalukaList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
