$(document).ready(function()
{ 
if ($("#alertSuccess").text().trim() == "") 
 { 
 $("#alertSuccess").hide(); 
 } 
 $("#alertError").hide(); 
}); 


// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
// Clear alerts---------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 
// Form validation-------------------
var status = validateOrderForm(); 

if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 
// If valid------------------------
var type = ($("#hidOIDSave").val() == "") ? "POST" : "PUT"; 
$.ajax( 
{ 
url : "OrderAPI", 
type : type, 
data : $("#formOrder").serialize(), 
dataType : "text", 
complete : function(response, status) 
{ 
onOrderSaveComplete(response.responseText, status); 
} 
}); 
}); 
// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
	$("#hidOIDSave").val($(this).data("oid")); 
 $("#itemCode").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#itemName").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#itemPrice").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#quantity").val($(this).closest("tr").find('td:eq(3)').text());
 $("#description").val($(this).closest("tr").find('td:eq(4)').text());  
});


$(document).on("click", ".btnRemove", function(event)
		{ 
		 $.ajax( 
		 { 
		 url : "OrderAPI", 
		 type : "DELETE", 
		 data : "OID=" + $(this).data("oid"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
		 onOrderDeleteComplete(response.responseText, status); 
		 } 
		 }); 
		});


//CLIENT-MODEL================================================================
function validateOrderForm() 
{ 
// CODE
if ($("#itemCode").val().trim() == "") 
 { 
 return "Insert Order Code."; 
 } 
// NAME
if ($("#itemName").val().trim() == "") 
 { 
 return "Insert Item Name."; 
 } 
//PRICE-------------------------------
if ($("#itemPrice").val().trim() == "") 
 { 
 return "Insert Item Price."; 
 } 
// is numerical value
var tmpPrice = $("#itemPrice").val().trim(); 
if (!$.isNumeric(tmpPrice)) 
 { 
 return "Insert a numerical value for Item Price."; 
 } 
// convert to decimal price
 $("#itemPrice").val(parseFloat(tmpPrice).toFixed(2)); 
// QUANTITY------------------------
if ($("#quantity").val().trim() == "") 
 { 
 return "Insert quantity."; 
 }
// DESCRIPTION------------------------
if ($("#description").val().trim() == "") 
 { 
 return "Insert description."; 
 }  
return true; 
}

function onOrderSaveComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully saved."); 
 $("#alertSuccess").show(); 
 $("#divOrderGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while saving."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while saving.."); 
 $("#alertError").show(); 
 } 
$("#hidPIDSave").val(""); 
$("#formPay")[0].reset(); 
}


function onOrderDeleteComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully deleted."); 
 $("#alertSuccess").show(); 
 $("#divPaymentGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while deleting."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while deleting.."); 
 $("#alertError").show(); 
 } 
}
