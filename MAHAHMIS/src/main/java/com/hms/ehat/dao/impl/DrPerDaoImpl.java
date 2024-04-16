package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.sql.Date;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.DrPerDao;
import com.hms.ehat.dto.DrPercentageDto;
import com.hms.ehat.dto.ProfeesVoucherMasterDto;
import com.hms.ehat.dto.ProfeesVoucherSlaveDto;
import com.hms.ehat.dto.ProfessionalFeesDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class DrPerDaoImpl implements DrPerDao {

	@Autowired
	SessionFactory sessionFactory;

	DecimalFormat df = new DecimalFormat("0.00");
	
	//Irfan Khan @date: 15-June-2017 @reason : To Save and Update percentage
	@Override
	public int saveDrPercentage(DrPercentageDto drPercentageDto) {

		int a=0;
		if (drPercentageDto.getDrPercentageId() == 0) {
			//check whether record is already exist or not
			Query q = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT count(*) as count FROM ehat_dr_percentage where deleted='N' and doctor_id = "+drPercentageDto.getDoctorId()
						+" and dept_id = "+drPercentageDto.getDeptId()+" and  unit_id ="+drPercentageDto.getUnitId()
						+ " and service_id = "+drPercentageDto.getServiceId());

			Integer count =((Number) q.uniqueResult()).intValue();
			//double count = Double.parseDouble(list.get(0));
			 if(count == 0){//record is new can insert
				 sessionFactory.getCurrentSession().merge(drPercentageDto);
				 a=1;
			 }else{//count > 0 means record is already exists.
				 a=3;
			 }
			
		}else{//update record
			sessionFactory.getCurrentSession().merge(drPercentageDto);
			a=2;
		}
		
		return a;
	}
	
	//Irfan Khan @date: 15-June-2017 @reason : To Fetch all records
	@Override
	public DrPercentageDto getAllRecords() {

		DrPercentageDto drPercentageDto = new DrPercentageDto();
		try {
			List<DrPercentageDto> listDrPer = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DrPercentageDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			listDrPer = criteria.list();

			drPercentageDto.setListDrPercentage(listDrPer);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return drPercentageDto;
	}
	
	
	@Override
	public boolean deleteDrPer(int drPercentageId, Integer userId) {
		try {
			DrPercentageDto drPercentageDto = (DrPercentageDto) sessionFactory
					.getCurrentSession().get(DrPercentageDto.class, drPercentageId);

			drPercentageDto.setDeleted("Y");
			drPercentageDto.setDeletedBy(userId);
			drPercentageDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public ProfessionalFeesDto fetchTestListForDr(int doctorId, int unitId,
			int deptId, int serviceId, Date fromDate, Date toDate) {
		ProfessionalFeesDto professionalFeesDto = new ProfessionalFeesDto();
		try {
			List<ProfessionalFeesDto> listProfees = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProfessionalFeesDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("doctorId", doctorId));
			criteria.add(Restrictions.eq("voucherGenerated", "N"));
			if(unitId > 0){
				criteria.add(Restrictions.eq("unitId", unitId));
			}
				
			if(deptId>0){
				criteria.add(Restrictions.eq("deptId", deptId));
			}
				
			if(serviceId > 0){
				criteria.add(Restrictions.eq("serviceId", serviceId));
			}
				
			
			criteria.add(Restrictions.between("serviceAssignDate", fromDate, toDate));
			
			//criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			listProfees = criteria.list();

			professionalFeesDto.setListProFees(listProfees);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return professionalFeesDto;
	}

	// Irfan Khan @date: 22-June-2017 @reason : To Save and Update profees
	// voucher
	@Override
	public int saveProfeesVoucher(
			ProfeesVoucherMasterDto profeesVoucherMasterDto,
			String voucherSlaveDetails, Integer userId) {

		int maxMasterId = 0;

		// inserting in master voucher
		sessionFactory.getCurrentSession().merge(profeesVoucherMasterDto);
		maxMasterId = maxCountOfColumn(ProfeesVoucherMasterDto.class,
				"voucherMasterId");

		// converting list into pojo
		ProfeesVoucherSlaveDto profeesVoucherSlaveDto2 = (ProfeesVoucherSlaveDto) ConfigUIJSONUtility
				.getObjectFromJSON(voucherSlaveDetails,	ProfeesVoucherSlaveDto.class);
		for (int i = 0; i < profeesVoucherSlaveDto2.getListVoucherSlave().size(); i++) {
			//ProfeesVoucherSlaveDto profeesVoucherSlaveDto = profeesVoucherSlaveDto2.getListVoucherSlave().get(i);

			if (profeesVoucherSlaveDto2.getListVoucherSlave().get(i).getVoucherSlaveId() == 0) {
				profeesVoucherSlaveDto2.getListVoucherSlave().get(i).setVoucherMasterId(maxMasterId);
				profeesVoucherSlaveDto2.getListVoucherSlave().get(i).setCreatedBy(userId);
				profeesVoucherSlaveDto2.getListVoucherSlave().get(i).setCreatedDateTime(new Date(
						new java.util.Date().getTime()));
				profeesVoucherSlaveDto2.getListVoucherSlave().get(i).setDeleted("N");
			} else {
				profeesVoucherSlaveDto2.getListVoucherSlave().get(i).setUpdatedBy(userId);
				profeesVoucherSlaveDto2.getListVoucherSlave().get(i).setUpdatedDateTime(new Date(
						new java.util.Date().getTime()));
				profeesVoucherSlaveDto2.getListVoucherSlave().get(i).setDeleted("N");
			}

			// inserting in slave voucher
			sessionFactory.getCurrentSession().merge(profeesVoucherSlaveDto2.getListVoucherSlave().get(i));

			Query alfa = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update ehat_profees_details set reduction = "
									+ profeesVoucherSlaveDto2.getListVoucherSlave().get(i).getReduction()
									+ ",pf_paid = "
									+ profeesVoucherSlaveDto2.getListVoucherSlave().get(i).getPfPaid()
									+ ",pf_unpaid = 0,"
									+ "pf_paid_status = 'paid',voucher_generated = 'Y' where  profees_id ="
									+ profeesVoucherSlaveDto2.getListVoucherSlave().get(i).getProfeesId());
			int result = alfa.executeUpdate();
			//System.err.println("alfa==" + result);
		}

		return 1;
	}

	// Max value of any coloumn
	public int maxCountOfColumn(@SuppressWarnings("rawtypes") Class className,
			String columnName) {

		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(className)
				.setProjection(Projections.max(columnName));
		Integer maxAge = (Integer) criteria.uniqueResult();
		if (maxAge == null) {
			maxAge = 0;
		}
		return maxAge;
	}

	// Irfan Khan @date: 23-June-2017 @reason : To Fetch Voucher
	@Override
	public ProfeesVoucherMasterDto fetchAllGenVouchers(int voucherMasterId,
			String callFrom) {

		ProfeesVoucherMasterDto profeesVoucherMasterDto = new ProfeesVoucherMasterDto();
		try {
			List<ProfeesVoucherMasterDto> listDrPer = null;

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProfeesVoucherMasterDto.class);
			
			if (callFrom.equalsIgnoreCase("Current")) {//for active vouchers
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.setMaxResults(20);
				
				if (voucherMasterId != 0) {// For search by voucherMasterId
					criteria.add(Restrictions.eq("voucherMasterId",
							voucherMasterId));
				}
			} else {// for canceled vouchers
				criteria.add(Restrictions.eq("deleted", "Y"));
				criteria.setMaxResults(20);

				if (voucherMasterId != 0) {// For search by voucherMasterId
					criteria.add(Restrictions.eq("voucherMasterId",
							voucherMasterId));
				}
			}

			listDrPer = criteria.list();
			profeesVoucherMasterDto.setListVoucherMaster(listDrPer);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return profeesVoucherMasterDto;
	}

	// Irfan Khan @date: 23-June-2017 @reason : To Fetch Voucher slave
	@Override
	public ProfeesVoucherMasterDto viewVoucherById(int voucherMasterId,
			String callFrom) {
		ProfeesVoucherMasterDto profeesVoucherMasterDto = new ProfeesVoucherMasterDto();
		List<ProfeesVoucherMasterDto> listDrPer = null;
		List<ProfeesVoucherSlaveDto> listDrPer2 = null;
		try {
			if (callFrom.equalsIgnoreCase("Current")
					|| callFrom.equalsIgnoreCase("Cancel")) {
				
				//records from voucher master
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ProfeesVoucherMasterDto.class);
				criteria.add(Restrictions
						.eq("voucherMasterId", voucherMasterId));

				listDrPer = criteria.list();
				profeesVoucherMasterDto.setListVoucherMaster(listDrPer);
				
				//records from voucher slave
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(ProfeesVoucherSlaveDto.class);
				criteria2.add(Restrictions
						.eq("voucherMasterId", voucherMasterId));
				
				listDrPer2 = criteria2.list();
				profeesVoucherMasterDto.setListVoucherSlave(listDrPer2);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return profeesVoucherMasterDto;
	}

	// Irfan Khan @date: 23-June-2017 @reason : cancel generated voucher
	@Override
	public int cancelGenratedVoucher(int voucherMasterId, String narration,
			Integer userId) {
		int a=0;
		List<ProfeesVoucherSlaveDto> listVoucherSlave = null;
		java.util.Calendar calendar = java.util.Calendar.getInstance();
		
		try{
		// checking alerady cancel or not
		Query q = sessionFactory.getCurrentSession().createSQLQuery(
				"select deleted from ehat_profees_voucher_master where voucher_master_id="
						+ voucherMasterId);

		String isCanceled = (q.list().get(0)).toString();
		//System.err.println("iscan=="+isCanceled);
		if(isCanceled.equalsIgnoreCase("N")){
			Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
							"update ehat_profees_voucher_master SET deleted='Y',cancel_by="+userId
							+",cancel_narration='"+narration+"',cancel_date_time=now()"
							+" where voucher_master_id="+voucherMasterId);
			int result = alfa.executeUpdate();
			//System.err.println("master result=="+result);
			//get details of voucher slave
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProfeesVoucherSlaveDto.class);
			criteria.add(Restrictions
					.eq("voucherMasterId", voucherMasterId));

			listVoucherSlave = criteria.list();
			
			//loop till all slave records
			for(int i=0 ; i <listVoucherSlave.size();i++){
				//setting unpaid amount roll back in profees details table
				double unpaidAmount = listVoucherSlave.get(i).getReduction() + listVoucherSlave.get(i).getPfPaid();
				
				Query alfa2 = sessionFactory.getCurrentSession().createSQLQuery(
						"update ehat_profees_details SET voucher_generated='N',pf_paid_status='unpaid',pf_paid=0,reduction=0"
						+",pf_unpaid = "+df.format(unpaidAmount)+" where profees_id="+listVoucherSlave.get(i).getProfeesId());
				
				int result2 = alfa2.executeUpdate();
				//System.err.println("master result2=="+result2);
			}
		}else{
			a=1;//if record is already canceled
		}
		} catch (Exception e) {
			e.printStackTrace();
			a = 2;//if exception occurred
		}

		return a;
	}

	@Override
	public ProfessionalFeesDto proFeesfetchReports1(int doctorId,
			Date fromDate, Date toDate,int unitId,int deptId,int serviceId) {
		ProfessionalFeesDto professionalFeesDto = new ProfessionalFeesDto();
		try {
			List<ProfessionalFeesDto> listProfees = null;
			
			String all = "select u.unit_name as unitName,dt.dept_name as deptName,s.service_name as serviceName,pf.patient_id as patientId,concat(p.f_name,' ', p.l_name) as patientName,pf.service_assign_date as serviceAssignDate,pf.component_name as componentName,"
					+ "pf.doctor_id as doctorId,dr.doc_name as doctorName,pf.rate as rate,pf.concession as concession,pf.quantity as quantity,"
					+ "pf.amount as amount,pf.pf_amount as pfAmount,pf.reduction as reduction,pf.pf_paid as pfPaid,pf.pf_unpaid as pfUnpaid,pf.hosp_percent_in_amount as hospPercentInAmount from "
					+ "ehat_patient p,doctor dr,ehat_profees_details pf,ehat_service_master s,dept_master dt,ehat_unit_master u where u.unit_id=pf.unit_id and dt.dept_id=pf.dept_id and s.service_id=pf.service_id and p.patient_id=pf.patient_id and "
					+ "dr.Doctor_ID=pf.doctor_id and pf.service_assign_date between :fromDate and :toDate and pf.doctor_id= :doctorId";
			if(unitId > 0){
			String byUnit = " and pf.unit_id= :unitId";
			all = all + byUnit;
			}
			
			if(deptId > 0){
			String byDept = " and pf.dept_id= :deptId";	
			all = all + byDept;
			}
			if(serviceId > 0){
				String byService = " and pf.service_id= :serviceId";	
				all = all + byService;
				}
			
			Query q = sessionFactory
					.getCurrentSession()
					.createSQLQuery(all
							);

			q.setParameter("fromDate", fromDate);
			q.setParameter("toDate", toDate);
			q.setParameter("doctorId", doctorId);
			if(unitId > 0){
				q.setParameter("unitId", unitId);
			}
			if(deptId > 0){
				q.setParameter("deptId", deptId);
			}
			if(serviceId > 0){
				q.setParameter("serviceId", serviceId);
			}
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			listProfees = q.list();

			professionalFeesDto.setListProFees(listProfees);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return professionalFeesDto;
	}
}
