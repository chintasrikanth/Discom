Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports FundTrackBLLService
Imports WebCommonUtility
Imports PWM_MasterBllService
Imports System.Globalization

Partial Class FundTrackTrans_JrnlVOU
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Dim Action = String.Empty
        Try
            If IsPostBack Then
                Return
            End If
            hdnUserID.Value = Session("UserID").ToString()
            hdnCompanyID.Value = Session("CompanyID").ToString()
            Dim mxdate = Session("DisplayName").ToString().Split("|")
            hdnsysdate.Value = Trim(mxdate(1).Split("/")(0)) + "/" + Trim(mxdate(1).Split("/")(1)) + "/" + Trim(mxdate(1).Split("/")(2))
            hdnmaxdate.Value = Trim(mxdate(1).Split("/")(1)) + "/" + Trim(mxdate(1).Split("/")(0)) + "/" + Trim(mxdate(1).Split("/")(2))
            ' hdnmaxdate.Value = Session("Systemdate")
            WebCommonUtility.BindEmptyGrid(gv_JrnlTrans, New String() {"Transaction_ID", "Transaction_Date", "Event_Type", "Fund_ID", "AMC_Code", "VerNo", "Edit", "Reverse", "View"})


        Catch ex As Exception
            WebErrorUtility.ErrorLog(ex)
            ScriptManager.RegisterStartupScript(Me, Me.GetType(), WebErrorUtility.ErrorKey, WebErrorUtility.ErrorMsg(), True)
        End Try
    End Sub

 
    <System.Web.Script.Services.ScriptMethod> _
<System.Web.Services.WebMethod(EnableSession:=True)> _
    Public Shared Function GetAmountFcy(ByVal Amount_LCY As String, ExchangeRate As String, Transaction_Date As String, Deci As String) As String
        Dim robj As New FundTrackBLLService.CommonReturnType
        Try
            Dim data As New JrnlDtls
            data.UserID = HttpContext.Current.Session("UserID").ToString()
            data.Company_Code = HttpContext.Current.Session("CompanyID").ToString()
            data.Amount_LCY = Amount_LCY
            data.Decim = Deci
            Using sobj As New FundTrackBLLService.FundTrackBllClient
                robj = sobj.GetAmountFcy(Amount_LCY, ExchangeRate, Transaction_Date, deci)
            End Using
        Catch ex As Exception
            WebErrorUtility.ErrorLog(ex)
        End Try
        Return robj.JSONData
    End Function

    <System.Web.Script.Services.ScriptMethod> _
<System.Web.Services.WebMethod(EnableSession:=True)> _
    Public Shared Function GetExchangeRate(ByVal Transaction_Date As String, Scurrency As String, FCurrency As String) As String
        Dim robj As New FundTrackBLLService.CommonReturnType
        Try
            Dim data As New JrnlDtls
            data.Fund_Currency = FCurrency
            data.SCurrency = Scurrency
            data.Tdate = Transaction_Date
            Using sobj As New FundTrackBLLService.FundTrackBllClient
                robj = sobj.GetExchangeRate(data)
            End Using
        Catch ex As Exception
            WebErrorUtility.ErrorLog(ex)
        End Try
        Return robj.JSONData
    End Function
    <System.Web.Script.Services.ScriptMethod> _
<System.Web.Services.WebMethod(EnableSession:=True)> _
    Public Shared Function GetJrnlTranList(ByVal SortBy As String, ByVal SortByColumnName As String, ByVal ID As Integer, ByVal PageNumber As Integer, ByVal PageSize As Integer, ByVal Record_Type As String, ByVal VerNo As String, ByVal SearchVal As String) As String
        Dim robj As New FundTrackBLLService.CommonReturnType
        Try
            Dim data As New JrnlTran
            data.ID = ID
            data.PageNumber = PageNumber
            data.PageSize = PageSize
            data.SortBy = SortBy
            data.SortByColumnName = SortByColumnName
            If SearchVal.Trim() <> "" Then
                data.SearchVal = SearchVal.Trim()
            End If
            data.Record_Type = Record_Type
            data.Inputted_By = HttpContext.Current.Session("UserID").ToString()
            data.Company_Code = HttpContext.Current.Session("CompanyID").ToString()
            Using sobj As New FundTrackBLLService.FundTrackBllClient
                robj = sobj.JrnlTranList(data)
            End Using
        Catch ex As Exception
            robj.JSONData = "FALSE"
            WebErrorUtility.ErrorLog(ex)
        End Try
        Return robj.JSONData
    End Function

    <System.Web.Script.Services.ScriptMethod> _
<System.Web.Services.WebMethod(EnableSession:=True)> _
    Public Shared Function GetJrnlTranByAppNo(ByVal Transaction_ID As String, Record_Type As String, DMLMode As String, VerNo As String, ID As String) As String
        Dim robj As New FundTrackBLLService.CommonReturnType
        Try
            Dim data As New JrnlTran
            data.ID = ID
            data.Transaction_ID = Transaction_ID
            data.Record_Type = Record_Type
            data.DMLMode = DMLMode
            data.VerNo = VerNo
            data.UserID = HttpContext.Current.Session("UserID").ToString()
            data.Company_Code = HttpContext.Current.Session("CompanyID").ToString()
            Using sobj As New FundTrackBLLService.FundTrackBllClient
                robj = sobj.JrnlTranList(data)
            End Using
        Catch ex As Exception
            WebErrorUtility.ErrorLog(ex)
        End Try
        Return robj.JSONData
    End Function
    <System.Web.Services.WebMethod(EnableSession:=True)> _
<System.Web.Script.Services.ScriptMethod> _
    Public Shared Function SaveJrnlTranData(JrnlTranEntry As FundTrackBLLService.JrnlTran) As String
        Dim obj As FundTrackBLLService.CommonReturnType = Nothing
        Dim jsondata As String = ""
        Try
            JrnlTranEntry.Inputted_By = HttpContext.Current.Session("UserID").ToString()
            JrnlTranEntry.UserID = HttpContext.Current.Session("UserID").ToString()
            JrnlTranEntry.Company_Code = HttpContext.Current.Session("CompanyID").ToString()
            Using sobj As New FundTrackBLLService.FundTrackBllClient
                obj = sobj.JrnlTranEntrySave(JrnlTranEntry)
                If obj.Status = True Then
                    jsondata = obj.JSONData
                Else
                    Return obj.StatusMessage
                End If
            End Using
        Catch ex As Exception
            WebErrorUtility.ErrorLog(ex)
        End Try
        Return jsondata
    End Function
End Class
