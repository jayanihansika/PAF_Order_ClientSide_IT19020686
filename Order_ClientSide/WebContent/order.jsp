<%@page import="com.Order"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Order</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/order.js"></script>
</head>
<body> 
<div class="container"><div class="row"><div class="col-6"> 
<h1>Order</h1>
<form id="formOrder" name="formOrder">
Item Code: 
 <input id="itemCode" name="itemCode" type="text" 
 class="form-control form-control-sm">
 <br> Item name: 
 <input id="itemName" name="itemName" type="text" 
 class="form-control form-control-sm">
 <br> Item price: 
 <input id="itemPrice" name="itemPrice" type="text" 
 class="form-control form-control-sm">
 <br> Quantity: 
 <input id="quantity" name="quantity" type="text" 
 class="form-control form-control-sm">
 <br>Description: 
 <input id="description" name="description" type="text" 
 class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save" 
 class="btn btn-primary">
 <input type="hidden" id="hidOIDSave" 
 name="hidOIDSave" value="">
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divOrderGrid">
	<%
 		Order OrderObj = new Order(); 
 		out.print(OrderObj.readOrder()); 
 	%>
</div>
</div> </div> </div> 
</body>
</html>