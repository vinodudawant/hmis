package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.Doctor;
import com.hms.dto.Patient;
import com.hms.dto.Users;
import com.hms.ehat.dao.BillingDao;

@Repository
public class BillingDaoImpl implements BillingDao {
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Doctor> fetchAuthorisedBy() {
		List<Doctor> list = new ArrayList<Doctor>();
		try {
			 String sql="SELECT User_ID,doc_name,Doctor_ID FROM doctor where motivatorAuthorisation='Authorised' and status='Y'";
			 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> autholist = query.list();
	         for (Map rs : autholist) {
					Doctor doctor = new Doctor();
					
					doctor.setDoctor_ID((Integer) rs.get("Doctor_ID"));
					doctor.setUser_ID((Integer) rs.get("User_ID"));
					doctor.setDoc_name((String) rs.get("doc_name"));
					list.add(doctor);
				}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<Users> fetchAvaStatus() {
		String sql = "SELECT u.User_ID,u.User_Name,u.user_Type,u.password,u.Availability,d.doc_name FROM users u,doctor d where (u.user_Type='doctor' or u.user_Type='rmo' or u.user_Type='visitingdoctor'  and u.Availability is not null and u.Availability != '') and  d.User_ID=u.User_ID and d.status = 'Y' and u.status = 'Y' and u.loged_in_status='Y' ";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> userDetails =query.list();
		List<Users> arrUsers = new ArrayList<Users>();

		for (Map rs : userDetails) {

			Users objUserDetails = new Users();

			objUserDetails.setUser_ID((Integer) rs.get("User_ID"));
			objUserDetails.setUser_Name((String) rs.get("User_Name"));
			objUserDetails.setUser_Type((String) rs.get("user_Type"));
			objUserDetails.setPassword((String) rs.get("password"));
			objUserDetails.setCreated_Date((String) rs.get("created_date"));
			objUserDetails.setAvailability((String) rs.get("Availability"));
			objUserDetails.setDoc_name((String) rs.get("doc_name"));

			arrUsers.add(objUserDetails);
		}
		return arrUsers;
	}

	@Override
	public List<Patient> showDiscountApproval(String searchOn, String searchBy, String value) {
		List<Patient> arrPatient = new ArrayList<Patient>();
		String sql = "";
		if (searchOn.equalsIgnoreCase("search")) {
			if (searchBy.equalsIgnoreCase("byName")) {
				String TempValue = value;
				String[] NewValue = TempValue.split(" ");
				int len = NewValue.length;
				if (len == 1) {
					value = NewValue[0];
					sql = "select distinct bill_disc.idipdbill_discount, bill_disc.discount, bill_disc.total_payable, p.patient_id, p.title, p.fName, p.mName, p.lName,b.Bed_ID,t.Treatment_ID, t.treatmentCount, h.Hname, htype.hall_type_name,bm.bill_id "
							+ "From ehat_patient p, ehat_treatment t, ehat_bill_master bm, treatment_beds b, beds bed, hall h, hall_type htype, ehat_ipdbill_discount bill_disc "
							+ "WHERE p.Patient_ID = t.Patient_ID	and t.Treatment_ID = bm.Treatment_ID and bm.bill_id = bill_disc.bill_id"
							+ " and t.Treatment_ID = b.Treatment_ID and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID "
							+ "and h.Htype = htype.idhall_type and bed.status = 'Y' "
							+ "and bill_disc.approval_status = '0' and bill_disc.status ='Y' and (p.fName like"
							+ "'%"
							+ value
							+ "%' || p.mName like"
							+ "'%"
							+ value
							+ "%' || p.lName like"
							+ "'%"
							+ value
							+ "%') order by bill_disc . idipdbill_discount DESC";
				} else {
					value = "";
					len = NewValue.length;
					if (len == 2) {

						sql = "select distinct bill_disc.idipdbill_discount, bill_disc.discount, bill_disc.total_payable, p.patient_id, p.title, p.fName, p.mName, p.lName,b.Bed_ID,t.Treatment_ID, t.treatmentCount, h.Hname, htype.hall_type_name,bm.bill_id "
								+ "From ehat_patient p, ehat_treatment t, ehat_bill_master bm, treatment_beds b, beds bed, hall h, hall_type htype, ehat_ipdbill_discount bill_disc "
								+ "WHERE p.Patient_ID = t.Patient_ID	and t.Treatment_ID = bm.Treatment_ID and bm.bill_id = bill_disc.bill_id"
								+ " and t.Treatment_ID = b.Treatment_ID and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID "
								+ "and h.Htype = htype.idhall_type and bed.status = 'Y' "
								+ "and bill_disc.approval_status = '0' and bill_disc.status ='Y' and (p.fName like"
								+ "'%"
								+ NewValue[0]
								+ "%' && p.lName like"
								+ "'%"
								+ NewValue[1]
								+ "%') order by bill_disc . idipdbill_discount DESC";
					} else {
						sql = "select distinct bill_disc.idipdbill_discount, bill_disc.discount, bill_disc.total_payable, p.patient_id, p.title, p.fName, p.mName, p.lName,b.Bed_ID,t.Treatment_ID, t.treatmentCount, h.Hname, htype.hall_type_name,bm.bill_id "
								+ "From ehat_patient p, ehat_treatment t, ehat_bill_master bm, treatment_beds b, beds bed, hall h, hall_type htype, ehat_ipdbill_discount bill_disc "
								+ "WHERE p.Patient_ID = t.Patient_ID	and t.Treatment_ID = bm.Treatment_ID and bm.bill_id = bill_disc.bill_id"
								+ " and t.Treatment_ID = b.Treatment_ID and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID "
								+ "and h.Htype = htype.idhall_type and bed.status = 'Y' "
								+ "and bill_disc.approval_status = '0' and bill_disc.status ='Y' and (p.fName like"
								+ "'%"
								+ NewValue[0]
								+ "%' && p.mName like"
								+ "'%"
								+ NewValue[1]
								+ "%' && p.lName like"
								+ "'%"
								+ NewValue[2]
								+ "%') order by bill_disc . idipdbill_discount DESC";
					}
				}
			} else {
				sql = "select distinct bill_disc.idipdbill_discount, bill_disc.discount, bill_disc.total_payable, p.patient_id, p.title, p.fName, p.mName, p.lName,b.Bed_ID,t.Treatment_ID, t.treatmentCount, h.Hname, htype.hall_type_name,bm.bill_id "
						+ "From ehat_patient p, ehat_treatment t, ehat_bill_master bm, treatment_beds b, beds bed, hall h, hall_type htype, ehat_ipdbill_discount bill_disc "
						+ "WHERE p.Patient_ID = t.Patient_ID	and t.Treatment_ID = bm.Treatment_ID and bm.bill_id = bill_disc.bill_id"
						+ " and t.Treatment_ID = b.Treatment_ID and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID "
						+ "and h.Htype = htype.idhall_type and bed.status = 'Y' "
						+ "and bill_disc.approval_status = '0' and bill_disc.status ='Y' and p.patient_id ='"
						+ value
						+ "' order by bill_disc . idipdbill_discount DESC";
			}
		} else {
			// onload for discount approval .
			sql = "select distinct bill_disc.idipdbill_discount, bill_disc.discount, bill_disc.total_payable, p.patient_id, p.title, p.fName, p.mName, p.lName,b.Bed_ID,t.Treatment_ID, t.treatmentCount, h.Hname, htype.hall_type_name,bm.bill_id "
					+ "From ehat_patient p, ehat_treatment t, ehat_bill_master bm, treatment_beds b, beds bed, hall h, hall_type htype, ehat_ipdbill_discount bill_disc "
					+ "WHERE p.Patient_ID = t.Patient_ID	and t.Treatment_ID = bm.Treatment_ID and bm.bill_id = bill_disc.bill_id"
					+ " and t.Treatment_ID = b.Treatment_ID and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID "
					+ "and h.Htype = htype.idhall_type and bed.status = 'Y' "
					+ "and bill_disc.approval_status = '0' and bill_disc.status = 'Y' order by bill_disc . idipdbill_discount DESC";
		}
		 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
         List<Map<String, Object>> map = query.list();
         for (Map rs : map) {
        	 Patient objpatientDetails = new Patient();
 			// BillMaster objBillMaster = new BillMaster();
 			objpatientDetails.setTitle((String) rs.get("title"));
 			objpatientDetails.setfName((String) rs.get("fName"));
 			objpatientDetails.setmName((String) rs.get("mName"));
 			objpatientDetails.setlName((String) rs.get("lName"));
 			objpatientDetails.setPatient_ID((Integer) rs.get("Patient_ID"));
 			objpatientDetails.setTreatment_id((Integer) rs.get("Treatment_ID"));
 			objpatientDetails.setTreatment((String) rs.get("treatmentCount"));
 			objpatientDetails.setBmiBsaID((Integer) rs
 					.get("idipdbill_discount"));
 			// objpatientDetails.setSdiscount(((Float) rs.get("discount")));

 			if ((rs.get("discount")).toString() == null) {
 				objpatientDetails.setAnnIncm("-");
 			} else {
 				objpatientDetails.setAnnIncm((rs.get("discount")).toString());
 			}
 			objpatientDetails.setTotalPayble((Float) rs.get("total_payable"));
 			objpatientDetails.setCategory((String) rs.get("Hname"));
 			objpatientDetails.setWtType((String) rs.get("hall_type_name"));
 			objpatientDetails.setEducation("Hospital");
 			arrPatient.add(objpatientDetails);
		}
		return arrPatient;
	}

	@Override
	public List<Patient> showSurgeonDiscountApproval(String searchOn, String searchBy, String value) {
		List<Patient> arrPatient = new ArrayList<Patient>();
		String sql = "";
		if (searchOn.equalsIgnoreCase("search")) {
			if (searchBy.equalsIgnoreCase("byName")) {
				String TempValue = value;
				String[] NewValue = TempValue.split(" ");
				int len = NewValue.length;
				if (len == 1) {
					value = NewValue[0];
					sql = "select distinct opSlave.idipdbill_operation_slave,opSlave.doctor_discount,opSlave.total_payable,"
							+ "p.patient_id,p.title, p.fName, p.mName,p.lName,b.Bed_ID,t.Treatment_ID,t.treatmentCount,"
							+ "h.Hname,htype.hall_type_name,bm.bill_id "
							+ "From ehat_patient p,ehat_treatment t, ehat_bill_master bm,treatment_beds b,beds bed,hall h,hall_type htype,"
							+ "ipdbill_operation_master opMaster,ipdbill_operation_slave opSlave"
							+ " WHERE p.Patient_ID = t.Patient_ID and t.Treatment_ID = bm.Treatment_ID a"
							+ "nd opSlave.idipdbill_operation_master = opMaster.idipdbill_operation_master"
							+ " and opMaster.ipdBill_master_id = bm.bill_id and t.Treatment_ID = b.Treatment_ID "
							+ "and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) "
							+ "and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID and h.Htype = htype.idhall_type "
							+ "and bed.status = 'Y' and opSlave.approval_status = '0' and (p.fName like"
							+ "'%"
							+ value
							+ "%' || p.mName like"
							+ "'%"
							+ value
							+ "%' || p.lName like"
							+ "'%"
							+ value
							+ "%') order by opSlave.idipdbill_operation_slave DESC";

				} else {
					value = "";
					len = NewValue.length;
					if (len == 2) {
						sql = "select distinct opSlave.idipdbill_operation_slave,opSlave.doctor_discount,opSlave.total_payable,"
								+ "p.patient_id,p.title, p.fName, p.mName,p.lName,b.Bed_ID,t.Treatment_ID,t.treatmentCount,"
								+ "h.Hname,htype.hall_type_name,bm.bill_id "
								+ "From ehat_patient p,ehat_treatment t, ehat_bill_master bm,treatment_beds b,beds bed,hall h,hall_type htype,"
								+ "ipdbill_operation_master opMaster,ipdbill_operation_slave opSlave"
								+ " WHERE p.Patient_ID = t.Patient_ID and t.Treatment_ID = bm.Treatment_ID a"
								+ "nd opSlave.idipdbill_operation_master = opMaster.idipdbill_operation_master"
								+ " and opMaster.ipdBill_master_id = bm.bill_id and t.Treatment_ID = b.Treatment_ID "
								+ "and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) "
								+ "and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID and h.Htype = htype.idhall_type "
								+ "and bed.status = 'Y' and opSlave.approval_status = '0' and (p.fName like"
								+ "'%"
								+ NewValue[0]
								+ "%' && p.lName like"
								+ "'%"
								+ NewValue[1]
								+ "%') order by opSlave.idipdbill_operation_slave DESC";
					} else {
						sql = "select distinct opSlave.idipdbill_operation_slave,opSlave.doctor_discount,opSlave.total_payable,"
								+ "p.patient_id,p.title, p.fName, p.mName,p.lName,b.Bed_ID,t.Treatment_ID,t.treatmentCount,"
								+ "h.Hname,htype.hall_type_name,bm.bill_id "
								+ "From ehat_patient p,ehat_treatment t, ehat_bill_master bm,treatment_beds b,beds bed,hall h,hall_type htype,"
								+ "ipdbill_operation_master opMaster,ipdbill_operation_slave opSlave"
								+ " WHERE p.Patient_ID = t.Patient_ID and t.Treatment_ID = bm.Treatment_ID a"
								+ "nd opSlave.idipdbill_operation_master = opMaster.idipdbill_operation_master"
								+ " and opMaster.ipdBill_master_id = bm.bill_id and t.Treatment_ID = b.Treatment_ID "
								+ "and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) "
								+ "and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID and h.Htype = htype.idhall_type "
								+ "and bed.status = 'Y' and opSlave.approval_status = '0' and (p.fName like"
								+ "'%"
								+ NewValue[0]
								+ "%' && p.mName like"
								+ "'%"
								+ NewValue[1]
								+ "%' && p.lName like"
								+ "'%"
								+ NewValue[2]
								+ "%') order by opSlave.idipdbill_operation_slave DESC";
					}
				}
			} else {
				sql = "select distinct opSlave.idipdbill_operation_slave,opSlave.doctor_discount,opSlave.total_payable,"
						+ "p.patient_id,p.title, p.fName, p.mName,p.lName,b.Bed_ID,t.Treatment_ID,t.treatmentCount,"
						+ "h.Hname,htype.hall_type_name,bm.bill_id "
						+ "From ehat_patient p,ehat_treatment t, ehat_bill_master bm,treatment_beds b,beds bed,hall h,hall_type htype,"
						+ "ipdbill_operation_master opMaster,ipdbill_operation_slave opSlave"
						+ " WHERE p.Patient_ID = t.Patient_ID and t.Treatment_ID = bm.Treatment_ID a"
						+ "nd opSlave.idipdbill_operation_master = opMaster.idipdbill_operation_master"
						+ " and opMaster.ipdBill_master_id = bm.bill_id and t.Treatment_ID = b.Treatment_ID "
						+ "and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) "
						+ "and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID and h.Htype = htype.idhall_type "
						+ "and bed.status = 'Y' and opSlave.approval_status = '0' and p.patient_id ='"
						+ value
						+ "' order by opSlave.idipdbill_operation_slave DESC";
			}
		} else {
			// onload for doctor discount approval .
			sql = "select distinct opSlave.idipdbill_operation_slave,opSlave.doctor_discount,opSlave.total_payable,"
					+ "p.patient_id,p.title, p.fName, p.mName,p.lName,b.Bed_ID,t.Treatment_ID,t.treatmentCount,"
					+ "h.Hname,htype.hall_type_name,bm.bill_id "
					+ "From ehat_patient p,ehat_treatment t, ehat_bill_master bm,treatment_beds b,beds bed,hall h,hall_type htype,"
					+ "ipdbill_operation_master opMaster,ipdbill_operation_slave opSlave"
					+ " WHERE p.Patient_ID = t.Patient_ID and t.Treatment_ID = bm.Treatment_ID a"
					+ "nd opSlave.idipdbill_operation_master = opMaster.idipdbill_operation_master"
					+ " and opMaster.ipdBill_master_id = bm.bill_id and t.Treatment_ID = b.Treatment_ID "
					+ "and b.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = t.Treatment_ID) "
					+ "and b.Bed_ID = bed.Bed_ID and bed.Hall_ID = h.Hall_ID and h.Htype = htype.idhall_type "
					+ "and bed.status = 'Y' and opSlave.approval_status = '0' order by opSlave.idipdbill_operation_slave DESC";
		}
		 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
         List<Map<String, Object>> map = query.list();
         for (Map rs : map) {
        	Patient objpatientDetails = new Patient();
 			objpatientDetails.setTitle((String) rs.get("title"));
 			objpatientDetails.setfName((String) rs.get("fName"));
 			objpatientDetails.setmName((String) rs.get("mName"));
 			objpatientDetails.setlName((String) rs.get("lName"));
 			objpatientDetails.setPatient_ID((Integer) rs.get("Patient_ID"));
 			objpatientDetails.setTreatment_id((Integer) rs.get("Treatment_ID"));
 			objpatientDetails.setTreatment((String) rs.get("treatmentCount"));
 			objpatientDetails.setBmiBsaID((Integer) rs
 					.get("idipdbill_operation_slave"));
 			objpatientDetails.setAnnIncm((String) rs.get("doctor_discount"));
 			objpatientDetails.setTotalPayble((Float) rs.get("total_payable"));
 			objpatientDetails.setCategory((String) rs.get("Hname"));
 			objpatientDetails.setWtType((String) rs.get("hall_type_name"));
 			objpatientDetails.setEducation("Surgeon");
 			arrPatient.add(objpatientDetails);
         }
		return arrPatient;
	}

}
