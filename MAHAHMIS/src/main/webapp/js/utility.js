/**
 * @author Touheed 
 * @description following function convert  "yyyy-MM-dd" format i.e.  31/12/2022 to 2022-12-31 if always take First Day next month and last year
 * @param dateDDMMYYYY '31/12/2022'
 * @param separator '/'
*  @param replaceWith '-'	
 */
function convertStringtoYYYYMMDD(dateDDMMYYYY,separator,replaceWith){
    var oldDateAry=dateDDMMYYYY.split(separator);
    var day = oldDateAry[0];
    var month = oldDateAry[1];
    var year = oldDateAry[2];
return year+replaceWith+month+replaceWith+day;
}