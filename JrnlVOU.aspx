<%@ Page Title="" Language="VB" MasterPageFile="~/MasterPages/PWMMaster.master" AutoEventWireup="false" CodeFile="JrnlVOU.aspx.vb" Inherits="FundTrackTrans_JrnlVOU" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="Server">
    <script src="../Scripts/Comman.js" type="text/javascript"></script>
    <script src="../Scripts/Angular.js"></script>
    <script src="../WebPageJScripts/FundTrack/JrnlVOU.js" type="text/javascript"></script>
    <script src="../WebPageJScripts/FundTrack/JrnlTran/JrnlCtrl.js?v=1.3"></script>
    <script src="../WebPageJScripts/FundTrack/JrnlTran/JrnlDirec.js"></script>
    <script src="../WebPageJScripts/FundTrack/JrnlTran/JrnlTranModel.js?v=0.2"></script>
    <script src="../WebPageJScripts/FundTrack/JrnlTran/JrnlFty.js"></script>
    <script src="../WebPageJScripts/Common/NGUtility.js"></script>
     <script src="../WebPageJScripts/Common/CommonApps.js"></script>
    <style>
        .linkDisabled {
          
    
    cursor: default;
    pointer-events: none;
    text-decoration: none;
  
  
        }
    </style>
   
    <script type="text/javascript">
        $(document).ready(function () {
            //debugger;
            $('#PageTitle').text('Journal Voucher');
            $('#subTitle').text('Wealth Tracking Aggregator - BO Transactions - Journal Voucher');
            var jsondata = " SortBy: '',SortByColumnName : '',ID:'0',Record_Type:'L',VerNo:'',SearchVal : ''";
            $('#hdnfld_DMode').val('L');
            OnGettingDataAndBind<%=Me.uctlpage1.ClientID%>("FillGrid", jsondata);
            GetCAccnt
          // Openautocomplete('Prefix', 'Eventtype', 'Event_Type', 'txtEventType', 'hdnPrefix', GetEvnttype1,'', '', '', '', 'right');
            //Openautocomplete('Fund_ID', 'V_AccountInfo', 'Fund_ID', 'txtAccountNo', 'hdn_AccountNo', GetCAccnt1, '', '', '', '', 'right');
            //Openautocomplete('Security_Code', 'V_SecInfo', 'Security_Code', 'txtSecurityCode', 'hdn_SecurityCode', GetSecurityCode1, 'Security_Code', 'Jrnl', '', '', 'left');
        });
        function GetEvnttype1(obj) {
            var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
            scope.$apply(function () {
               
                scope.model.Event_Type = obj['Event Type'];
                $('#txtEventType').val(obj['Event Type']);
                scope.model.Prefix = obj['Prefix'];
                $('#hdnPrefix').val(obj['Prefix']);
                
            });
        }
        function GetSecurityCode1(obj) {
            var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
            scope.$apply(function () {
                //scope.model.Event_Type = obj['Event Type'];
                //$('#txtEventType').val(obj['Event Type']);
                //scope.model.Prefix = obj['Prefix'];
                //$('#hdnPrefix').val(obj['Prefix']);
            });
        }
        function GetCAccnt1(obj) {
            var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
            scope.$apply(function () {
                //scope.model.Event_Type = obj['Event Type'];
                //$('#txtEventType').val(obj['Event Type']);
                //scope.model.Prefix = obj['Prefix'];
                //$('#hdnPrefix').val(obj['Prefix']);
            });
        }
        function Pending() {
            $('#ui_txtsearch').val('');
            //debugger;
            Init<%=Me.uctlpage1.ClientID%>();
            var jsondata = " SortBy: '',SortByColumnName : '',PageNumber: '1',PageSize: '10',ID:'0',Record_Type:'P',VerNo:'',SearchVal : ''";
	     $('#hdnfld_DMode').val('P');
	     OnGettingDataAndBind<%=Me.uctlpage1.ClientID%>("FillGrid", jsondata);
        }
        function History() {
            $('#ui_txtsearch').val('');
            Init<%=Me.uctlpage1.ClientID%>();
            var jsondata = " SortBy: '',SortByColumnName : '',PageNumber: '1',PageSize: '10',ID:'0',Record_Type:'H',VerNo:'',SearchVal : ''";
		 $('#hdnfld_DMode').val('H');
		 OnGettingDataAndBind<%=Me.uctlpage1.ClientID%>("FillGrid", jsondata);
        }
        function Live() {
            $('#ui_txtsearch').val('');
            Init<%=Me.uctlpage1.ClientID%>();
            var jsondata = " SortBy: '',SortByColumnName : '',PageNumber: '1',PageSize: '10',ID:'0',Record_Type:'L',VerNo:'',SearchVal : ''";
            $('#hdnfld_DMode').val('L');
            OnGettingDataAndBind<%=Me.uctlpage1.ClientID%>("FillGrid", jsondata);
        }

        function SortData(SortColumn) {
            var jsondata = " SortBy: '" + $('#hdnSortOrder').val() + "',SortByColumnName : '" + SortColumn + "',ID:'0',Record_Type:'" + $('#hdnfld_DMode').val() + "',VerNo:'',SearchVal : '" + $('#ui_txtsearch').val() + "'";
            OnGettingDataAndBind<%=Me.uctlpage1.ClientID%>("FillGrid", jsondata);
        }
        function SearchGridData() {
            Init<%=Me.uctlpage1.ClientID%>();
            //if (isWhitespace(data)) return;
            var jsondata = " SortBy: '',SortByColumnName : '',ID:'0',Record_Type:'" + $('#hdnfld_DMode').val() + "',VerNo:'',PageNumber: '1',PageSize: '10',SearchVal : '" + $('#ui_txtsearch').val() + "'";
            OnGettingDataAndBind<%=Me.uctlpage1.ClientID%>("FillGrid", jsondata);
            return false;
        }

    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="Server">
    <div ng-app="JrnlTranApp" ng-controller="JrnlTranCtrl" id="JrnlTranDiv" >
        <div>
            <div class="h1">
                <div id="pnl">
                    <div class="lh1">
                        <a id="a_New" ng-click="CreateNew(this)" style="cursor: pointer;">
                            <img src="../Images/add_record.png" alt="Add New" style="border-style: none;" />
                        </a>
                        <a id="a_Live" onclick="Live();" style="cursor: pointer;">
                            <img alt="Live" title="Live" src="../Images/Live.png" style="height: 16px; width: 17px;" />
                        </a>
                        <a id="a1" onclick="Pending();" style="cursor: pointer;">
                            <img alt="History" title="Pending" src="../Images/Pending.png" style="height: 16px; width: 17px;" />
                        </a>
                        <a id="a_History" onclick="History();" style="cursor: pointer;">
                            <img alt="History" title="History" src="../Images/History.png" style="height: 16px; width: 17px;" />
                        </a>

                    </div>
                    <div class="rh1">
                        <span>Search : </span>
                        <asp:TextBox ClientIDMode="Static" ID="ui_txtsearch" runat="server" onblur="return SearchGridData();" onkeydown="return (event.keyCode!=13);"></asp:TextBox>
                        <asp:Button ID="bntsearach" CssClass="hd" CausesValidation="False" runat="server" />

                        <asp:LinkButton ID="ui_bntsearach" runat="server" OnClientClick="return SearchGridData()">
                            <img id="Img1" src="../Images/search.png" runat="server" alt="Search" title="Search"
                                style="border-style: none;" />
                        </asp:LinkButton>
                    </div>
                </div>
            </div>
        </div>
        <div id="div_Grid">
            <asp:GridView runat="server" ID="gv_JrnlTrans" AllowSorting="true" AutoGenerateColumns="false"
                Width="100%" AllowPaging="false" GridLines="None" CssClass="mGrid" ClientIDMode="Static">
                <Columns>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            <u style="cursor: pointer; text-decoration: none;">
                                <span id="lbl_Reg" onclick="GridSorting(this);" itemid="Transaction_ID">Transaction ID</span>
                                <img id="img_Reg" src="../Images/down-arrow.png" />
                            </u>
                        </HeaderTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            <u style="cursor: pointer; text-decoration: none;">
                                <span id="lbl_Reg" onclick="GridSorting(this);" itemid="Transaction_Date">Transaction Date</span>
                                <img id="img_Reg" src="../Images/down-arrow.png" />
                            </u>
                        </HeaderTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            <u style="cursor: pointer; text-decoration: none;">
                                <span id="lbl_Reg" onclick="GridSorting(this);" itemid="Event_Type">Event Type</span>
                                <img id="img_Reg" src="../Images/down-arrow.png" />
                            </u>
                        </HeaderTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            <u style="cursor: pointer; text-decoration: none;">
                                <span id="lbl_Reg" onclick="GridSorting(this);" itemid="Fund_ID">Fund ID</span>
                                <img id="img_Reg" src="../Images/down-arrow.png" />
                            </u>
                        </HeaderTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            <u style="cursor: pointer; text-decoration: none;">
                                <span id="lbl_Reg" onclick="GridSorting(this);" itemid="AMC_Code">AMC Code</span>
                                <img id="img_Reg" src="../Images/down-arrow.png" />
                            </u>
                        </HeaderTemplate>
                    </asp:TemplateField>                 
                    <asp:BoundField HeaderText="Record_Type"  />
                   <%-- <asp:BoundField HeaderText="VerNo"  />--%>
                   <%-- <asp:BoundField Visible="false" HeaderText="" DataField="Edit" />--%>
                    <asp:BoundField  HeaderText="" DataField="Reverse" />
                    <asp:BoundField HeaderText="" DataField="View" />
                </Columns>
            </asp:GridView>
            <uctlPaging:paging runat="server" ID="uctlpage1" ServiceURL="../FundTrackTrans/JrnlVOU.aspx/GetJrnlTranList" />
        </div>
        <div id="div_Fields" style="display: none;">
            <div class="divrow">
                <div class="divcell_left">
                    <div class="divcell"></div>
                    <div class="divcell"></div>
                </div>
                <div class="divcell_right">
                    <div class="divcell"></div>
                    <div class="divcell"></div>
                </div>
            </div>

            <div class="divrow">
                <div class="divcell_left">
                    <div class="divcell">
                        <asp:Label ID="lblTransactionID" runat="server" Text="Transaction ID" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls linkDisabled"  ID="txtTransactionID" runat="server" ClientIDMode="Static" MaxLength="30" ng-model="model.Transaction_ID"></asp:TextBox>
                    </div>
                </div>
                <div class="divcell_right">
                    <div class="divcell">
                        <asp:Label runat="server" ID="lblAMCCode" Text="AMC Code" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls linkDisabled" ID="txtAMCCode" runat="server" ClientIDMode="Static" MaxLength="6" ng-model="model.AMC_Code"
                            data-rule-required="true" data-msg-required="please enter AMC Code"></asp:TextBox>
                        <span class="commonError">*</span>
                        <asp:HiddenField ID="hdn_AMCCode" runat="server" Value="0" ClientIDMode="Static" />
                    </div>

                </div>
            </div>
            <div class="divrow">
                <div class="divcell_left">
                    <div class="divcell">
                        <asp:Label runat="server" ID="Label16" Text="Account No" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls"    ID="txtAccountNo"  runat="server" ClientIDMode="Static" MaxLength="6" ng-model="model.Fund_ID" onchange="return showclientlkp();"
                            data-rule-required="true" data-msg-required="please enter Account No"></asp:TextBox>
                        <asp:Button runat="server" ID="btn_AccountNo" ng-disabled=" (model.JrnlDtlsList[0].GL_Account.length === 0) ?  false : true" CssClass="ButtonCls Lookup" ClientIDMode="Static" OnClientClick="return showclientlkp();" />
                        <asp:HiddenField runat="server" ID="hdn_AccountNo" ClientIDMode="Static" />
                        <span class="commonError">*</span>
                    </div>
                </div>
                <div class="divcell_right">
                    <div class="divcell">
                        <asp:Label runat="server" ID="lblAccountName" Text="Account Name" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls linkDisabled" ID="txtAccountName" ng-disabled="isDisabled" runat="server" ClientIDMode="Static" MaxLength="200" ng-model="model.AccountName"></asp:TextBox>
                        <span class="commonError">*</span>
                        <asp:HiddenField ID="hdn_AccountName" runat="server" Value="0" ClientIDMode="Static" />
                    </div>

                </div>
            </div>
            <div class="divrow">
                <div class="divcell_left">
                    <div class="divcell">
                        <asp:Label runat="server" ID="lblEventType" Text="Event Type" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls linkDisabled" ID="txtEventType"  runat="server" ClientIDMode="Static" MaxLength="6" ng-model="model.Event_Type" onchange="return ShowEventTypeLookup();"
                            data-rule-required="true" data-msg-required="please enter Event Type"></asp:TextBox>
                        <%--<asp:Button runat="server" ID="btn_EventType" CssClass="ButtonCls Lookup" ClientIDMode="Static" OnClientClick="return ShowEventTypeLookup();" />--%>
                        <asp:HiddenField runat="server" ID="hdn_EventType" ClientIDMode="Static" />
                        <span class="commonError">*</span>
                    </div>
                </div>
                <div class="divcell_right">
                    <div class="divcell">
                        <asp:Label runat="server" ID="lblTransactionDate" Text="Transaction Date" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls" ID="txtTransactionDate" runat="server"  data-ng-model-options="{ updateOn: 'blur' }"  ClientIDMode="Static" MaxLength="10"  ng-model="model.Transaction_Date" 
                            ></asp:TextBox>
                        <span class="commonError">*</span>
                        <asp:HiddenField ID="hdn_TransactionDate" runat="server" Value="0" ClientIDMode="Static" />
                    </div>
                    <%--  ng-change='checkdate(model.Transaction_Date,tran)' validatedate jqdatepicker--%>
                </div>
            </div>
            <div class="divrow">
                <div class="divcell_left">
                    <div class="divcell">
                        <asp:Label runat="server" ID="lblBankAccount" Text="Bank Account" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls" ID="txtBankAccount" runat="server" ClientIDMode="Static" MaxLength="20" ng-model="model.Bank_Account" onchange="return ShowBankAccount();">
                        </asp:TextBox>
                        <asp:Button runat="server" ID="btn_BankAccount" CssClass="ButtonCls Lookup" ClientIDMode="Static" OnClientClick="return ShowBankAccount();" />
                        <asp:HiddenField runat="server" ID="hdn_BankAccount" ClientIDMode="Static" />
                    </div>
                </div>
                <div class="divcell_right">
                    <div class="divcell">
                        <asp:Label runat="server" ID="lblInstrumentNo" Text="Instrument No" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls" ID="txtInstrumentNo"  runat="server" ClientIDMode="Static" MaxLength="20" ng-model="model.DEClientDtls.Instrument_No"></asp:TextBox>
                        <asp:HiddenField ID="hdn_InstrumentNo" runat="server" Value="0" ClientIDMode="Static" />
                    </div>

                </div>
            </div>
            <div class="divrow">
                <div class="divcell_left">
                   <div class="divcell">
                        <asp:Label runat="server" ID="lblInstrumentDate" Text="Instrument Date" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls" ID="txtInstrumentDate"  runat="server"  ClientIDMode="Static" MaxLength="10" ng-model="model.Instrument_Date"  data-ng-model-options="{ updateOn: 'blur' }"  ></asp:TextBox>
                        <asp:HiddenField ID="hdn_InstrumentDate" runat="server" Value="0" ClientIDMode="Static" />
                    </div>
                </div>
                <div class="divcell_right">
                  <%-- ng-change='checkdate(model.Instrument_Date,instru)'jqdatepicker  validatedate--%>
                      <div class="divcell">
                        <asp:Label runat="server" ID="lblSecurityCode" Text="Security Code" ClientIDMode="Static"></asp:Label>
                    </div>
                    <div class="divcell">
                        <asp:TextBox CssClass="TextCls" ID="txtSecurityCode" runat="server" ClientIDMode="Static" MaxLength="35" ng-model="model.Security_Code" onchange="return ShowSecurityCode();"></asp:TextBox>
                        <asp:Button runat="server" ID="btn_SecurityCode" CssClass="ButtonCls Lookup" ClientIDMode="Static" OnClientClick="return ShowSecurityCode();" />
                        <asp:HiddenField runat="server" ID="hdn_SecurityCode" ClientIDMode="Static" />
                    </div>
                </div>
            </div>           
            <div class="h1">
                <div id="Div1">
                    <div class="lh1">
                        <a id="a2" data-ng-click="addNewJrnlDtls(this);">
                            <img alt="New" title="New" src="../Images/add_record.png" style="height: 16px; width: 17px;" />
                        </a>

                    </div>

                </div>
            </div>
            <div style="overflow-x: auto; width: 100%; padding-left: 5px;">
                <div id="div_JrnlDtlstbl">
                    <table id="grdJrnlTranDtls" style="border: 1px solid black; width: 118%;" class="mGrid">
                        <tr>
                            <th>GL Account</th>
                            <th>GL Account Name</th>
                            <th>Debit/Credit</th>
                            <th>Amt LCY</th>
                            <th>Fund Currency</th>
                            <th>Exchange Rate</th>
                            <th>Amt FCY</th>
                            <th>Narration</th>
                            <th></th>                           
                        </tr>
                        <tr data-ng-repeat="JrnlDtl in model.JrnlDtlsList">
                            <td>
                                <input type="text" data-ng-model="JrnlDtl.GL_Account" id="{{'txtglacc_'+ $index }}" data-ng-change="ShowEventTypeLookup1($index);" data-ng-model-options="{ updateOn: 'blur' }" >
                                <input runat="server" type="button" class="ButtonCls Lookup" ng-click="ShowEventTypeLookup1($index);" />
                                <span class="commonError">*</span>
                            </td>
                            <td>
                                <input type="text" class="linkDisabled"  data-ng-model="JrnlDtl.GL_AccountName"></td>
                            <td>
                                <select id="{{'ddlcrdr_'+ $index }}" data-ng-model="JrnlDtl.DR_CR"  data-ng-change="DR_DR_Changed($index,JrnlDtl)"  data-ng-options="item.Id as item.Name for item in detdata.DebitCreditList" ></select>
                                <span class="commonError">*</span>
                            </td>
                            <td>
                                <input type="text" class="txtaln" id="{{'txtAmtLcy_'+ $index }}" data-max-decimal-points=2 data-ng-change="AmtLCY_Changed($index,JrnlDtl)" data-ng-model="JrnlDtl.Amount_LCY" data-ng-model-options="{ updateOn: 'blur' }" ><span class="commonError">*</span></td>
                            <td>
                                <input type="text"  class="linkDisabled" data-ng-model="JrnlDtl.Fund_Currency" ></td>
                            <td>
                                <input type="text"  class="linkDisabled txtaln" data-ng-model="JrnlDtl.Exchange_Rate" ></td>
                            <td>
                                <input type="text" class="txtaln linkDisabled" data-ng-model="JrnlDtl.Amount_FCY" data-max-decimal-points=2 ></td>
                            <td>
                                <input type="text" id="{{'txtCNarration_'+ $index }}" data-ng-model="JrnlDtl.CNarration"> <span class="commonError">*</span></td>
                            <td>
                                <img data-ng-show="$last"  data-ng-click="removeJrnlDtls($event,JrnlDtl)" data-ng-src="../Images/close.png" alt="Reverse" style="cursor: hand; cursor: pointer;" />
                            </td>                           
                            <td style="display: none;">
                                <input type="text" data-ng-disabled="true" data-ng-model="JrnlDtl.ID"></td>
                            <td style="display: none;">
                                <input type="text" data-ng-disabled="true" data-ng-model="JrnlDtl.CSrlno"></td>
                             <td style="display: none;">
                                <input type="text" data-ng-disabled="true" data-ng-model="JrnlDtl.VerNo"></td>
                            <td style="display: none;">
                                <input type="text" data-ng-disabled="true" data-ng-model="JrnlDtl.Record_Type"></td>

                        </tr>
                    </table>


                  <%--  <pre>{{model.JrnlDtlsList | json}}</pre>--%>
                  <%--   <pre>{{model | json}}</pre>--%>
                </div>
            </div>
            <div id="div_EmpCtc" style="display: none">
                <div class="divrow">
                    <div class="divcell_left">
                        <div class="divcell"></div>
                        <div class="divcell"></div>
                    </div>
                    <div class="divcell_right">
                        <div class="divcell"></div>
                        <div class="divcell"></div>
                    </div>
                </div>
                <div class="divrow">
                    <div class="divcell_left">
                        <div class="divcell">
                            <asp:Label ID="lblGLAccount" runat="server" Text="GL Account" ClientIDMode="Static"></asp:Label>
                        </div>
                        <div class="divcell">
                            <asp:TextBox CssClass="TextCls" ID="txtGLAccount" runat="server" ClientIDMode="Static" MaxLength="30"
                                data-rule-required="true" data-msg-required="please enter GL Account"></asp:TextBox>
                            <asp:Button runat="server" ID="btn_GLAccount" CssClass="ButtonCls Lookup" ClientIDMode="Static" OnClientClick="return ShowtxtInternalCodeLookup();" />
                            <asp:HiddenField runat="server" ID="hdn_GLAccount" ClientIDMode="Static" />
                            <span class="commonError">*</span>
                        </div>

                    </div>
                    <div class="divcell_right">
                        <div class="divcell">
                            <asp:Label ID="lblGLAccountName" runat="server" Text="GL Account Name" ClientIDMode="Static"></asp:Label>
                        </div>
                        <div class="divcell">
                            <asp:TextBox CssClass="TextCls" ID="txtGLAccountName" runat="server" data-rule-required="true" data-msg-required="please enter GL Account Name." ClientIDMode="Static" MaxLength="100"></asp:TextBox>
                            <span class="commonError">*</span>
                        </div>

                    </div>
                </div>
                <div class="divrow">
                    <div class="divcell_left">
                        <div class="divcell">
                            <asp:Label ID="lblDebitCredit" runat="server" Text="Debit/Credit" AssociatedControlID="ddl_DebitCredit"></asp:Label>
                        </div>
                        <div class="divcell">
                            <asp:DropDownList ID="ddl_DebitCredit" Width="160px" runat="server" onchange="ColumnNameFill(this.value)" ClientIDMode="Static" data-rule-required="true" data-rule-min="1" data-msg-min="Please select Debit/Credit" CssClass="validate[required] select-one SelectCls">
                                <asp:ListItem Selected="True" Value="0">Select one</asp:ListItem>

                            </asp:DropDownList>
                            <span class="commonError">*</span>
                            <asp:HiddenField ID="hdn_DebitCredit" runat="server" Value="0" ClientIDMode="Static" />
                        </div>

                    </div>
                    <div class="divcell_right">
                        <div class="divcell">
                            <asp:Label ID="lblAmtLCY" runat="server" Text="Amt LCY" ClientIDMode="Static"></asp:Label>
                        </div>
                        <div class="divcell">
                            <asp:TextBox CssClass="TextCls" ID="txtAmtLCY" runat="server" data-rule-required="true" data-msg-required="please enter Amt LCY." ClientIDMode="Static" MaxLength="30"></asp:TextBox>
                            <span class="commonError">*</span>
                        </div>

                    </div>
                </div>

                <div class="divrow">
                    <div class="divcell_left">
                        <div class="divcell">
                            <asp:Label ID="lblFundCurrency" runat="server" Text="Fund Currency" ClientIDMode="Static"></asp:Label>
                        </div>
                        <div class="divcell">
                            <asp:TextBox CssClass="TextCls" ID="txtFundCurrency" runat="server" data-rule-required="true" data-msg-required="please enter Fund Currency." ClientIDMode="Static" MaxLength="30"></asp:TextBox>
                            <span class="commonError">*</span>
                        </div>

                    </div>
                    <div class="divcell_right">
                        <div class="divcell">
                            <asp:Label ID="lblExchangeRate" runat="server" Text="Exchange Rate" ClientIDMode="Static"></asp:Label>
                        </div>
                        <div class="divcell">
                            <asp:TextBox CssClass="TextCls" ID="txtExchangeRate" runat="server" data-rule-required="true" data-msg-required="please enter Exchange Rate." ClientIDMode="Static" MaxLength="30"></asp:TextBox>
                            <span class="commonError">*</span>
                        </div>

                    </div>
                </div>


                <div class="divrow">
                    <div class="divcell_left">
                        <div class="divcell">
                            <asp:Label ID="lblAmtFCY" runat="server" Text="Amt FCY" ClientIDMode="Static"></asp:Label>
                        </div>
                        <div class="divcell">
                            <asp:TextBox CssClass="TextCls" ID="txtAmtFCY" runat="server" data-rule-required="true" data-msg-required="please enter Amt FCY." ClientIDMode="Static" MaxLength="30"></asp:TextBox>
                            <span class="commonError">*</span>
                        </div>

                    </div>
                    <div class="divcell_right">
                        <div class="divcell">
                            <asp:Label ID="lblCNarration" runat="server" Text="Narration" ClientIDMode="Static"></asp:Label>
                        </div>
                        <div class="divcell">
                            <asp:TextBox CssClass="TextCls" ID="txtCNarration" runat="server" data-rule-required="true" data-msg-required="please enter Narration." ClientIDMode="Static" MaxLength="30"></asp:TextBox>
                            <span class="commonError">*</span>
                        </div>

                    </div>
                </div>
            </div>

            <div class="divrow">
                <div class="divcell_left">
                    <div class="divcell"></div>
                    <div class="divcell"></div>
                </div>
                <div class="divcell_right">
                    <div class="divcell"></div>
                    <div class="divcell"></div>
                </div>
            </div>

            <div class="divrow">
                <div class="divcell_left">
                    <div class="divcell">
                      
                    </div>
                    <div class="divcell">
                    </div>
                </div>
                <div class="divcell_right">
                    <div class="divcell">
                        <input type="button" value="Submit" ng-click="submitJrnlTranEntry()" id="btn_Save" class="submit" />
                        <input type="button" value="Update" ng-click="submitJrnlTranEntry()" id="btn_Update" class="submit" />
                         <input type="button" value="Reverse" ng-click="submitJrnlTranEntry()" id="btn_Reverse" class="submit" />  
                        <input type="button" value="Cancel" ng-click="reset($event);" id="btn_Cancel" class="reset" />
                    </div>
                </div>
            </div>
        </div>
         <div id="PopUpOfIHNO" ></div>
        <div id="div_HiddenFields">
            <asp:HiddenField runat="server" ID="hdnfldEmpctc" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnFlag" runat="server" ClientIDMode="Static" />
            <asp:HiddenField runat="server" ID="hdnfld_PkId" ClientIDMode="Static" />
            <asp:HiddenField runat="server" ID="hdnfld_VerNo" ClientIDMode="Static" />
            <asp:HiddenField runat="server" ID="hdnfld_RecType" ClientIDMode="Static" />
            <asp:HiddenField runat="server" ID="hdnfld_DMode" ClientIDMode="Static" />
            <asp:HiddenField runat="server" ID="hdnUserID" ClientIDMode="Static" />
            <asp:HiddenField runat="server" ID="hdnEmpctcId" ClientIDMode="Static" />
            <asp:HiddenField runat="server" ID="hdnCompanyID" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnEditID" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnChildData" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnSortOrder" ClientIDMode="Static" runat="server" />
            <asp:HiddenField runat="server" ID="hdnPrefix" ClientIDMode="Static" />
            <asp:HiddenField runat="server" ID="hdnmaxdate" ClientIDMode="Static" />
             <asp:HiddenField runat="server" ID="hdnsysdate" ClientIDMode="Static" />
        </div>
    </div>


</asp:Content>

