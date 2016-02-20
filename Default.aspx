<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="PageContent" runat="server">

    <div id="Streamers_image" style="margin-left: 0; height: 50%; background-color: #FFFFFF;">
        <a runat="server" href="~/Streamers">
            <asp:Image ID="Image1" runat="server" Height="100%" Width="100%" ImageUrl="~/streamers.jpg" />
        </a>
    </div>
    <div id="Youtubers_image" style="margin-left: 0; height: 50%; background-color: #FFFFFF;">
        <a runat="server" href="~/Youtubers">
            <asp:Image ID="Image2" runat="server" Height="100%" Width="100%" ImageUrl="~/Youtubers-1.jpg" />
        </a>
    </div>



</asp:Content>
