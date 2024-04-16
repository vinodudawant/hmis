package com.hms.inventory.dao.impl;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.TicketManagementDaoM;
import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.dto.AssetComplaintSlaveDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class TicketManagementDaoImplM implements TicketManagementDaoM{

	static Logger log=Logger.getLogger(TicketManagementDaoImplM.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public AssetComplaintMasterDto editAssetTicketManagement(Integer id) {
		AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
		List<AssetComplaintMasterDto> list = new ArrayList<AssetComplaintMasterDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AssetComplaintMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			assetComplaintMasterDto = (AssetComplaintMasterDto) criteria.uniqueResult();
			List<AssetComplaintSlaveDto> slaveDtos = new ArrayList<AssetComplaintSlaveDto>();
			for(AssetComplaintSlaveDto assetComplaintSlaveDto : assetComplaintMasterDto.getLstAssetComplaintSlaveDtos()){
				if(assetComplaintSlaveDto.getDeleted().equalsIgnoreCase("N")){
					slaveDtos.add(assetComplaintSlaveDto);
				}
			}
			assetComplaintMasterDto.setLstAssetComplaintSlaveDtos(slaveDtos);
			
			return assetComplaintMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return assetComplaintMasterDto;
	}

	@Override
	public Integer saveAssetTicketManagement(String assetTicketManagementSlaveDetails,
			AssetComplaintMasterDto assetComplaintMasterDto,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			if(assetComplaintMasterDto.getId() == 0){
				AssetComplaintSlaveDto assetComplaintSlaveDto = (AssetComplaintSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(assetTicketManagementSlaveDetails, AssetComplaintSlaveDto.class);
				List<AssetComplaintSlaveDto> assetComplaintSlaveDtos = assetComplaintSlaveDto.getLstAssetComplaintSlaveDto();
				assetComplaintMasterDto.setCreatedBy(userId);
				assetComplaintMasterDto.setLstAssetComplaintSlaveDtos(assetComplaintSlaveDtos);
				sessionFactory.getCurrentSession().merge(assetComplaintMasterDto);
				return 1;
			}
			else{
				
				AssetComplaintSlaveDto assetComplaintSlaveDto = (AssetComplaintSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(assetTicketManagementSlaveDetails, AssetComplaintSlaveDto.class);
				List<AssetComplaintSlaveDto> assetComplaintSlaveDtos = assetComplaintSlaveDto.getLstAssetComplaintSlaveDto();
				assetComplaintMasterDto.setUpdatedBy(userId);
				assetComplaintMasterDto.setLstAssetComplaintSlaveDtos(assetComplaintSlaveDtos);
				sessionFactory.getCurrentSession().merge(assetComplaintMasterDto);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<AssetComplaintMasterDto> universalSearchAssetTicketManagement(
			String productCategoryTicket, String assetNameTicket,
			String fromDateTicket, String toDateTicket,Integer department, Integer hospitalDept, String searchBy,String callFrom,
			HttpServletRequest request) {
		List<AssetComplaintMasterDto> masterDtos = new ArrayList<AssetComplaintMasterDto>();
		Session session = null;
		String sql="";
		try {
			session = sessionFactory.getCurrentSession();
			if(searchBy.equalsIgnoreCase("byProductId") && callFrom.equalsIgnoreCase("Others")){
				sql = "select  * from inv_asset_complaint_master_new as ac where ac.asset_id="+assetNameTicket+" and ac.ticket_status !='CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductId") && callFrom.equalsIgnoreCase("Others")){
				sql = "select * from inv_asset_complaint_master_new as ac where ac.asset_id="+assetNameTicket+" and SUBSTR(ac.created_date_time, 1, 10) >= '"+fromDateTicket+"' and SUBSTR(ac.created_date_time, 1, 10) <= '"+toDateTicket+"' and ac.ticket_status !='CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductIdCategoryDate") && callFrom.equalsIgnoreCase("Others")){
				sql = "select * from inv_asset_complaint_master_new as ac where ac.asset_id="+assetNameTicket+" and ac.product_category_id = "+productCategoryTicket+" and SUBSTR(ac.created_date_time, 1, 10) >= '"+fromDateTicket+"' and SUBSTR(ac.created_date_time, 1, 10) <= '"+toDateTicket+"' and ac.ticket_status !='CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryAssetName") && callFrom.equalsIgnoreCase("Others")){
				sql = "select * from inv_asset_complaint_master_new as ac where ac.product_category_id="+productCategoryTicket+" and asset_id="+assetNameTicket+" and ac.ticket_status !='CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byAll") && callFrom.equalsIgnoreCase("Others")){
				sql = "select * from inv_asset_complaint_master_new as ac where ac.product_category_id="+productCategoryTicket+" and asset_id="+assetNameTicket+" and SUBSTR(ac.created_date_time, 1, 10) >= '"+fromDateTicket+"' and SUBSTR(ac.created_date_time, 1, 10) <= '"+toDateTicket+"' and ac.ticket_status !='CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byDate") && callFrom.equalsIgnoreCase("Others")){
				sql = "select * from inv_asset_complaint_master_new as ac where SUBSTR(ac.created_date_time, 1, 10) >= '"+fromDateTicket+"' and SUBSTR(ac.created_date_time, 1, 10) <= '"+toDateTicket+"' and ac.ticket_status !='CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductId") && callFrom.equalsIgnoreCase("Closed")){
				sql = "select * from inv_asset_complaint_master_new as ac where ac.asset_id="+assetNameTicket+" and ac.ticket_status = 'CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					masterDtos.add(assetComplaintMasterDto);
			}
			}else if(searchBy.equalsIgnoreCase("byProductIdCategoryDate") && callFrom.equalsIgnoreCase("Closed")){
				sql = "select * from inv_asset_complaint_master_new as ac where ac.asset_id="+assetNameTicket+" and ac.product_category_id ="+productCategoryTicket+" and SUBSTR(ac.created_date_time, 1, 10) >= '"+fromDateTicket+"' and SUBSTR(ac.created_date_time, 1, 10) <= '"+toDateTicket+"' and ac.ticket_status = 'CLOSED' ";
				
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryAssetName") && callFrom.equalsIgnoreCase("Closed")){
				sql = "select * from inv_asset_complaint_master_new as ac where ac.product_category_id="+productCategoryTicket+" and asset_id="+assetNameTicket+" and ac.ticket_status = 'CLOSED' ";
				
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byAll") && callFrom.equalsIgnoreCase("Closed")){
				sql = "select * from inv_asset_complaint_master_new as ac where ac.product_category_id="+productCategoryTicket+" and asset_id="+assetNameTicket+" and SUBSTR(ac.created_date_time, 1, 10) >= '"+fromDateTicket+"' and SUBSTR(ac.created_date_time, 1, 10) <= '"+toDateTicket+"' and ac.ticket_status = 'CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byDate") && callFrom.equalsIgnoreCase("Closed")){
				sql = "select * from inv_asset_complaint_master_new as ac where SUBSTR(ac.created_date_time, 1, 10) >= '"+fromDateTicket+"' and SUBSTR(ac.created_date_time, 1, 10) <= '"+toDateTicket+"' and ac.ticket_status = 'CLOSED' ";
				if((department !=0 && hospitalDept ==0)){
					sql = sql+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";
				}else if((hospitalDept !=0 && department == 0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" group by ac.id order by ac.id desc";
				}else if((department !=0 && hospitalDept !=0)){
					sql = sql+" and ac.complaint_hosp_dept_id="+hospitalDept+" and ac.complaint_dept_id="+department+" group by ac.id order by ac.id desc";	
				}else if((department == 0 && hospitalDept == 0)){
					sql = sql+" group by ac.id order by ac.id desc ";
				}
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
					assetComplaintMasterDto.setId((Integer)row.get("id"));
					assetComplaintMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					assetComplaintMasterDto.setUserName((String)row.get("user_name"));
					assetComplaintMasterDto.setProductCategoryId((Integer)row.get("product_category_id"));
					assetComplaintMasterDto.setProductCategoryName((String)row.get("product_category_name"));
					assetComplaintMasterDto.setAssetId((Integer)row.get("asset_id"));
					assetComplaintMasterDto.setAssetName((String)row.get("asset_name"));
					assetComplaintMasterDto.setComplainType((String)row.get("complain_type"));
					assetComplaintMasterDto.setTicketStatus((String)row.get("ticket_status"));
					assetComplaintMasterDto.setPriority((String)row.get("priority"));
					assetComplaintMasterDto.setRateOfInconvenience((Integer)row.get("rate_of_inconvenience"));
					assetComplaintMasterDto.setUrgent((String)row.get("urgent"));
					
					// this is added by Vishnu
					assetComplaintMasterDto.setComplaintBatchMasterId((Integer)row.get("complaint_batch_master_id"));
					assetComplaintMasterDto.setComplaintBatchNo((String)row.get("complaint_batch_no"));
					assetComplaintMasterDto.setComplaintDeptId((Integer)row.get("complaint_dept_id"));
					assetComplaintMasterDto.setComplaintDeptName((String)row.get("complaint_dept_name"));
					assetComplaintMasterDto.setComplaintHospDeptId((Integer)row.get("complaint_hosp_dept_id"));
					assetComplaintMasterDto.setComplaintHospDeptName((String)row.get("complaint_hosp_dept_name"));
					assetComplaintMasterDto.setDescription((String)row.get("description"));
					assetComplaintMasterDto.setSerialNo((String)row.get("serial_no"));
					assetComplaintMasterDto.setLocation((String)row.get("location"));
					
					assetComplaintMasterDto.setCreatedBy((Integer)row.get("created_by"));
					assetComplaintMasterDto.setUnitId((Integer)row.get("unit_id"));
					assetComplaintMasterDto.setUpdatedBy((Integer)row.get("updated_by"));
					assetComplaintMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					
					masterDtos.add(assetComplaintMasterDto);
				}
				return masterDtos;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return masterDtos;
		
	}

	@Override
	public List<AssetComplaintMasterDto> getAllBreakdownRecords(
			HttpServletRequest request) {
		List<AssetComplaintMasterDto> assetComplaintMasterDtos = new ArrayList<AssetComplaintMasterDto>();
		try {
			String sql = "select TIMEDIFF(ac.updated_date_time,ac.created_date_time) As downtime_hours,ac.id as id,ac.user_name as user_name,ac.product_category_name as product_category_name,ac.asset_name as asset_name,ac.serial_no as serial_no,ac.created_date_time as created_date_time,ac.description as description,ac.updated_date_time as ticket_closed_date,ac.user_id as user_id from inv_asset_complaint_master_new as ac where ac.ticket_status='CLOSED' group by ac.id order by ac.id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				AssetComplaintMasterDto assetComplaintMasterDto = new AssetComplaintMasterDto();
				assetComplaintMasterDto.setId((Integer) row.get("id"));
				assetComplaintMasterDto.setUserName((String) row.get("user_name"));
				assetComplaintMasterDto.setProductCategoryName((String) row.get("product_category_name"));
				assetComplaintMasterDto.setAssetName((String) row.get("asset_name"));	
				assetComplaintMasterDto.setDowntimeHours((Time) row.get("downtime_hours"));
				assetComplaintMasterDto.setSerialNo((String) row.get("serial_no"));
				assetComplaintMasterDto.setCreatedDateTime((Date) row.get("created_date_time"));
				assetComplaintMasterDto.setDescription((String) row.get("description"));
				assetComplaintMasterDto.setUpdatedDateTime((Date) row.get("ticket_closed_date"));
				assetComplaintMasterDto.setUserId((Integer) row.get("user_id"));
                assetComplaintMasterDtos.add(assetComplaintMasterDto);
                
			}
			 
			}catch (Exception e) {
			e.printStackTrace();
		}
		return assetComplaintMasterDtos;
	}

}
