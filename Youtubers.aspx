<%@ Page Title="Youtubers" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Youtubers.aspx.cs" Inherits="Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="PageContent" runat="server">
<meta charset="UTF-8">
<style>
     .con{
        width: 150px;
        margin-left: 10px;
        margin-right: 150px;
        float: left;
    }
    img{
        width: 150px;
        height:150px;
        float:left;

    }
    .text{
        text-align:center;
    }
</style>
<h1>Τελευταίο Βίντεο</h1>
<div id ="lvideo-grid">

    
</div>
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>  
<script src="youtube.js"></script>  

</asp:Content>
