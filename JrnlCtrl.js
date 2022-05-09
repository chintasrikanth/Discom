var txtglaccount = '';
function JrnlTranCtrl($scope, EntityModel, EntityDataModel, DatabaseFty,  $filter, $http) {  
    $scope.model = EntityModel.GetEntityModel();
    $scope.ResetModel = angular.copy($scope.model);
    $scope.detdata = EntityDataModel.GetEntityDataModel(); 
    $scope.mxdt = $('#hdnsysdate').val();   
    $scope.checkdate = function (endDate,Ctrl) {
        var $element='';

        if (Ctrl == 'tran') $element = $('#txtTransactionDate'); else $element = $('#txtInstrumentDate');
        if (!$element.val().match((/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/))) {

            $element.data("title", "").removeClass("error").tooltip("destroy");
            $element.tooltip("destroy").data("title", 'Please enter valid Date.').addClass("error").tooltip();
            $element.val('');
            return false;
        }
        var endDat = endDate.split('/');
        var edt = endDat[1] + '/' + endDat[0] + '/' + endDat[2];
        var curDate = new Date();
        if (new Date(edt) > new Date($scope.model.maxdate)) {
            if (Ctrl == 'tran') {
                //$element.data("title", "").removeClass("error").tooltip("destroy");
                //$element.tooltip("destroy").data("title", 'Transaction Date should be less than ' + $scope.model.Book_date).addClass("error").tooltip();
                alert('Transaction Date should be less than ' + $scope.model.Book_date);
                $scope.model.Transaction_Date = $scope.model.Book_date;
                return false;
            }
            else {

                //$element.data("title", "").removeClass("error").tooltip("destroy");
                //$element.tooltip("destroy").data("title", 'Instrument Date should be less than ' + $scope.model.Book_date).addClass("error").tooltip();
                alert('Instrument Date should be less than ' + $scope.model.Book_date);
                $scope.model.Instrument_Date = $scope.model.Book_date;
                return false;
            }
            return false;
        }
       
    };
    $scope.isDisabled = true;
    $scope.model.JrnlDtlsList[0].DR_CR = $scope.detdata.DebitCreditList[0].Id;
    $scope.GetJrnTranByAppNo = function (Transaction_ID, RecordType, DMLMode, VerNo, ID) {
        $scope.model.DMLMode = DMLMode;
        var _result = DatabaseFty.GetModelByID('../FundTrackTrans/JrnlVOU.aspx/GetJrnlTranByAppNo', "{ Transaction_ID: '" + Transaction_ID + "' ,Record_Type: '" + RecordType + "' ,DMLMode: '" + DMLMode + "',VerNo: '" + VerNo + "',ID: '" + ID + "' }");
        _result.then(function (response) {
            if (response.success) {
                // $("#DetEntTabs").tabs();
                $scope.mxdt = $('#hdnsysdate').val();
                $scope.model = EntityModel.SetEntityModel(response.data); //response.data;//
                $scope.Transaction_Date = response.data.Transaction_Date;
                $scope.Instrument_Date = response.data.Instrument_Date;
                $scope.model.JrnlDtlsList = response.data.JrnlDtlsList;
               // $('#txtEventType_1').val(response.data.Event_Type);
                $scope.model.DMLMode = DMLMode;  
                // $scope.trd = (response.success) ? response.data : 'Empty Model Object';
                $("#div_Fields").slideDown("slow");
                $("#div_Grid").slideUp("slow");
                if ($scope.model.JrnlDtlsList[0].GL_Account != "") {
                    $('#txtAccountNo').addClass('linkDisabled');
                    $('#btn_AccountNo').addClass('linkDisabled');
                }
                else {
                    $('#txtAccountNo').removeClass('linkDisabled');
                    $('#btn_AccountNo').removeClass('linkDisabled');
                }
            }
            else {
                alert("Error in fetching data from server.");

            }

        });
    }// 
    $scope.GetExchangeRate = function (index) {
       // $scope.model.DMLMode = DMLMode;
        var _result1 = DatabaseFty.GetModelByID('../FundTrackTrans/JrnlVOU.aspx/GetExchangeRate', "{ Transaction_Date: '" + $scope.model.Transaction_Date + "' ,Scurrency: '" + $scope.model.SeCurrency + "' ,FCurrency: '" + $scope.model.fCurrency + "'}");
        _result1.then(function (response) {
            if (response.success) {
                // $("#DetEntTabs").tabs();
                $scope.model.JrnlDtlsList[index].Exchange_Rate = response.data[0].Exchange_Rate.toString();
            }
            else {
                alert("Error in fetching data from server.");

            }

        });
    }// 
    $scope.shouldEnable = function () {
        var isEnable = true;
        // make necessary checks
        return isEnable;
    }    
    $scope.ShowEventTypeLookup1 = function (index) {
        txtglaccount = 'txtglacc_' + index;
        if ($("#txtAccountNo").val().length == 0) { alert('please select Account No');  return false; }       
        if ($scope.model.JrnlDtlsList[0].GL_Account != "") {
            $('#txtAccountNo').addClass('linkDisabled');
            $('#btn_AccountNo').addClass('linkDisabled');
        }
        else {
            $('#txtAccountNo').removeClass('linkDisabled');
            $('#btn_AccountNo').removeClass('linkDisabled');
        }
        OpenDynamicModalPopup('GL_Account', 'V_GL_Account', 'GL_Account', txtglaccount, txtglaccount, 'GetGlAccount', 'Fund_ID', $("#txtAccountNo").val(), 0, 'GL_Account Fetch');
        event.preventDefault();
        return false;

    };
    $scope.submitJrnlTranEntry = function () {

        try {
            var isValid = true;
            var $element = $('#txtAMCCode');
            if ($('#txtAMCCode').val().trim().length == 0) {
                $element.data("title", "").removeClass("error").tooltip("destroy");
                $element.tooltip("destroy").data("title", 'Please Enter AMC Code.').addClass("error").tooltip();
                isValid = false;
            }
            else {
                $element.data("title", "").removeClass("error").tooltip("destroy");
            }
            $element = $('#txtAccountNo');
            if ($('#txtAccountNo').val().trim().length == 0) {
                $element.data("title", "").removeClass("error").tooltip("destroy");
                $element.tooltip("destroy").data("title", 'please enter Account No.').addClass("error").tooltip();
                isValid = false;
            }
            else {
                $element.data("title", "").removeClass("error").tooltip("destroy");
            }
            $element = $('#txtEventType');
            if ($('#txtEventType').val().length == 0) {
                $element.data("title", "").removeClass("error").tooltip("destroy");
                $element.tooltip("destroy").data("title", 'Please Enter Event Type.').addClass("error").tooltip();
                isValid = false;
            }
            else {
                $element.data("title", "").removeClass("error").tooltip("destroy");
            }
            //$element = $('#txtEventType_1');
            //if ($('#txtEventType_1').val().length == 0) {
            //    $element.data("title", "").removeClass("error").tooltip("destroy");
            //    $element.tooltip("destroy").data("title", 'Please Enter Event Type.').addClass("error").tooltip();
            //    isValid = false;
            //}
            //else {
            //    $element.data("title", "").removeClass("error").tooltip("destroy");
            //}
            $element = $('#txtTransactionDate');
            if ($('#txtTransactionDate').val().length == 0) {
                $element.data("title", "").removeClass("error").tooltip("destroy");
                $element.tooltip("destroy").data("title", 'please enter Transaction Date.').addClass("error").tooltip();
                isValid = false;
            }
            else {
                var endDat = $("#txtTransactionDate").val().split('/');
                var edt = endDat[1] + '/' + endDat[0] + '/' + endDat[2];
                var curDate = new Date();
                $element.data("title", "").removeClass("error").tooltip("destroy");
                if (!$("#txtTransactionDate").val().match((/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/))) {

                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'Please enter valid Date.').addClass("error").tooltip();
                    isValid = false;
                }
                else if (new Date(edt) > new Date($scope.model.maxdate)) {

                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'Transaction Date should be less than ' + $scope.model.Book_date).addClass("error").tooltip();
                    isValid = false;
                }
                else {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                }
            }
            $element = $('#txtInstrumentDate');
            if ($('#txtInstrumentDate').val().length != 0) {
                var endDat1 = $("#txtInstrumentDate").val().split('/');
                var edt1 = endDat1[1] + '/' + endDat1[0] + '/' + endDat1[2];
                if (!$("#txtInstrumentDate").val().match((/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/))) {

                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'Please enter valid Date.').addClass("error").tooltip();
                    isValid = false;
                }
                else if (new Date(edt1) > new Date($scope.model.maxdate)) {

                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'Instrument Date Date should be less than ' + $scope.model.Book_date).addClass("error").tooltip();
                    isValid = false;
                }
                else {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                }
            }
           
            var count = 0;
            $('#grdJrnlTranDtls tr').each(function (index, element) {
                var rowCount = $('#grdJrnlTranDtls tr').length-1;
                if (index != rowCount) {                   
                    var el = $('#txtglacc_' + index.toString());
                    var $element = $('#txtglacc_' + index.toString());
                    if (el.val().length == 0) {
                        $element.data("title", "").removeClass("error").tooltip("destroy");
                        $element.tooltip("destroy").data("title", 'please enter GL Account.').addClass("error").tooltip();
                        isValid = false;
                        count++;
                    }
                    else {
                        $element.data("title", "").removeClass("error").tooltip("destroy");
                    }
                    el = $('#ddlcrdr_' + index.toString());
                    $element = $('#ddlcrdr_' + index.toString());

                    if (el.val() == '' || $('#ddlcrdr_' + index.toString() + ' option:selected').index() == '0') {

                        $element.data("title", "").removeClass("error").tooltip("destroy");
                        $element.tooltip("destroy").data("title", 'Please Select Debit/Credit.').addClass("error").tooltip();
                        isValid = false;
                        count++;
                    }
                    else {
                        $element.data("title", "").removeClass("error").tooltip("destroy");
                    }
                    el = $('#txtAmtLcy_' + index.toString());
                    var $element = $('#txtAmtLcy_' + index.toString());
                    if (el.val().length == 0) {
                        $element.data("title", "").removeClass("error").tooltip("destroy");
                        $element.tooltip("destroy").data("title", 'please enter Amount LCY.').addClass("error").tooltip();
                        isValid = false;
                        count++;
                    }
                    else {
                        $element.data("title", "").removeClass("error").tooltip("destroy");
                    }
                    el = $('#txtCNarration_' + index.toString());
                    var $element = $('#txtCNarration_' + index.toString());
                    if (el.val().length == 0) {
                        $element.data("title", "").removeClass("error").tooltip("destroy");
                        $element.tooltip("destroy").data("title", 'please enter Narration.').addClass("error").tooltip();
                        isValid = false;
                        count++;
                    }
                    else {
                        $element.data("title", "").removeClass("error").tooltip("destroy");
                    }
                }
                });

            if (count > 0) {
                alert('Please enter mandatory fields');
                isValid = false;
            }

            $scope.totalSum = Object.keys($scope.model.JrnlDtlsList).map(function (k) {
                return +$scope.model.JrnlDtlsList[k].Amount_LCY.replace(/[,\s]/,"");
            }).reduce(function (a, b) { return a + b }, 0);

            if ($scope.totalSum != 0) { isValid = false; alert('Debits & Credits should be equal'); }

            if (isValid) {

                $scope.model.Transaction_Date = $('#txtTransactionDate').val();
                $scope.model.Instrument_Date = $('#txtInstrumentDate').val();
                if ($scope.model.DMLMode == 'I') {
                    var _result = DatabaseFty.GetModelByID('../CommonWebServices/MasterBindings.aspx/GetTransactionID', "{ Prefix: '" + $scope.model.Prefix + "' ,Fund_ID: '" + $scope.model.Fund_ID + "' ,Amc_Code: '" + $scope.model.AMC_Code + "' }");
                    _result.then(function (response) {
                        if (response.success) {
                            $scope.model.Transaction_ID = response.data[0].Transaction_ID;                         
                            if ($scope.model.Transaction_ID == '') { return false;}
                            var httpRequest = $http({
                                method: "POST",
                                url: "../FundTrackTrans/JrnlVOU.aspx/SaveJrnlTranData",
                                dataType: 'json',
                                // data: "{detEntry:" + txt + "}",
                                data: "{JrnlTranEntry:" + JSON.stringify($scope.model) + "}",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                            httpRequest.success(function (data, status) {
                                var tdata = JSON.parse(data.d);
                                if (RemmoveUndifined(tdata.JrnlTran) != '') {
                                    if (tdata.JrnlTran[0].Column2 == 'Validation Error') {

                                        CreateTable(tdata);
                                        //Crate table html tag
                                       
                                    }
                                }
                                else {
                                    alert(tdata.Table[0].Column2);
                                    $scope.model = $scope.ResetModel;
                                    $scope.detdata.JrnlDtlsList = [];
                                    $scope.model.JrnlDtlsList = [];
                                    //$('#txtEventType_1').val('');
                                    if (parseInt(tdata.Table[0].Column1) != -1) {
                                        $("#div_Fields").slideUp("slow");
                                        $("#div_Grid").slideDown("slow");
                                    }
                                    else {
                                        alert("Error in Save data.");
                                    }
                                }
                            });
                            httpRequest.error(function (data, status) {

                                alert("Error in Save data.");
                                // console.log(status);
                            });

                        }
                        else {
                            alert("Error in fetching data from server.");

                        }

                    });
                }
                else {
                    if ($scope.model.DMLMode == 'V') { $scope.model.DMLMode = 'U'; }
                    if ($scope.model.DMLMode == 'R') { $scope.model.DMLMode = 'R'; }
                    var httpRequest = $http({
                        method: "POST",
                        url: "../FundTrackTrans/JrnlVOU.aspx/SaveJrnlTranData",
                        dataType: 'json',
                        // data: "{detEntry:" + txt + "}",
                        data: "{JrnlTranEntry:" + JSON.stringify($scope.model) + "}",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    httpRequest.success(function (data, status) {
                        var tdata = JSON.parse(data.d);
                        if (RemmoveUndifined(tdata.JrnlTran) != '') {
                            if (tdata.JrnlTran[0].Column2 == 'Validation Error') {
                                CreateTable(tdata);
                                //Crate table html tag
                            }
                        }
                        else {
                            alert(tdata.Table[0].Column2);
                            // $('#txtEventType_1').val('');
                            $scope.model = $scope.ResetModel;
                            $scope.detdata.JrnlDtlsList = [];
                            $scope.model.JrnlDtlsList = [];
                            $("#div_Fields").slideUp("slow");
                            $("#div_Grid").slideDown("slow");
                        }
                    });
                    httpRequest.error(function (data, status) {

                        alert("Error in Save data.");
                        // console.log(status);
                    });
                }
            }
            else {
                return false;
            }
        }
        catch (e) {
            alert("Some Error..");
            //console.log(e + " Some Error");
        }
        return false;
    };
    $scope.addNewJrnlDtls = function () {
        //if ($scope.JrnlDtlsList.length > 0) {

        //    var JrnlDtlsTemp = {
        //        ID: "0",
        //        GL_Account: "",
        //        DR_CR: "Please Select",
        //        Amount_LCY: "",
        //        Fund_Currency: "",
        //        Exchange_Rate: "",
        //        Amount_FCY: "",
        //        Narration: "",
        //        VerNo: "",
        //        RecordType: "N",
                
        //    };
        //    if (angular.equals($scope.model.JrnlDtlsList[$scope.model.JrnlDtlsList.length - 1], JrnlDtlsTemp)) {
        //        alert("Please Enter Jrnl Details signatory details");
        //        return false;
        //    }



        //}
        if ($("#txtAccountNo").val().length == 0) { alert('please select Account No'); return false; }
        var count = 0;
        $('#grdJrnlTranDtls tr').each(function (index, element) {
            var rowCount = $('#grdJrnlTranDtls tr').length - 1;
            if (index != rowCount) {
                var el = $('#txtglacc_' + index.toString());
                var $element = $('#txtglacc_' + index.toString());
                if (el.val().length == 0) {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'please enter GL Account.').addClass("error").tooltip();
                    isValid = false;
                    count++;
                }
                else {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                }
                el = $('#ddlcrdr_' + index.toString());
                $element = $('#ddlcrdr_' + index.toString());

                if (el.val() == '' || $('#ddlcrdr_' + index.toString() + ' option:selected').index() == '0') {

                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'Please Select Debit/Credit.').addClass("error").tooltip();
                    isValid = false;
                    count++;
                }
                else {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                }
                el = $('#txtAmtLcy_' + index.toString());
                var $element = $('#txtAmtLcy_' + index.toString());
                if (el.val().length == 0) {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'please enter Amount LCY.').addClass("error").tooltip();
                    isValid = false;
                    count++;
                }
                else {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                }
                el = $('#txtCNarration_' + index.toString());
                var $element = $('#txtCNarration_' + index.toString());
                if (el.val().length == 0) {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'please enter Narration.').addClass("error").tooltip();
                    isValid = false;
                    count++;
                }
                else {
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                }
            }
        });
        if (count > 0) {
            var count = 0;
            alert('Please enter mandatory fields');
            return false;
        }
        $scope.model.JrnlDtlsList.push({
            ID: "0",
            GL_Account: "",
            GL_AccountName: "",
            DR_CR: $scope.detdata.DebitCreditList[0].Id,
            Amount_LCY: "",
            Fund_Currency: $scope.model.fCurrency,
            Exchange_Rate: "",
            Amount_FCY: "",
            CNarration: $scope.model.JrnlDtlsList[0].CNarration,
            VerNo: "1",
            Record_Type: "N",          
            CSrlno: $scope.model.JrnlDtlsList.length+1
        });

        
      
    };
    
    $scope.removeJrnlDtls = function (e, JrnlDtl) {
        if ($scope.model.JrnlDtlsList.length == 1) return;
        $scope.model.JrnlDtlsList.splice($scope.model.JrnlDtlsList.indexOf(JrnlDtl), 1);
        $element.remove();
        $scope.$destroy();
    };
    $scope.AmtLCY_Changed = function (index, JrnlDtl) {
        var amtLcy = '';
        if (JrnlDtl.Exchange_Rate == '' || $scope.model.Deci == '') { $scope.model.JrnlDtlsList[index].Amount_LCY = ''; alert('please select GLAccount and AccountNo.'); return false; }
        if (JrnlDtl.Amount_LCY == '') { $scope.model.JrnlDtlsList[index].Amount_FCY = ''; $scope.model.JrnlDtlsList[index].Exchange_Rate = ''; return };
            if (JrnlDtl.DR_CR == 'C') {
            if ((JrnlDtl.Amount_LCY.indexOf('-') == -1)) {
                amtLcy = "-" + (1 * JrnlDtl.Amount_LCY.replace(/[,\s]/, ""));
            }
            $scope.model.JrnlDtlsList[index].Amount_LCY = amtLcy;
        }
            else if (JrnlDtl.DR_CR == "D" || JrnlDtl.DR_CR == "0") {
                if (JrnlDtl.DR_CR == "0") {
                    //JrnlDtl.DR_CR = "D";
                    //$scope.model.JrnlDtlsList[index].DR_CR = "D"
                }

            if (JrnlDtl.Amount_LCY != "") {
                amtLcy = (1 * parseFloat(JrnlDtl.Amount_LCY.replace(/[,\s]/, "")));
            }
            else {
                return;
            }            
            $scope.model.JrnlDtlsList[index].Amount_LCY = amtLcy;
        }
        else {
        }       
            
            var _result = DatabaseFty.GetModelByID('../FundTrackTrans/JrnlVOU.aspx/GetAmountFcy', "{ Amount_LCY: '" + amtLcy + "',ExchangeRate:'" + JrnlDtl.Exchange_Rate + "' ,Transaction_Date: '" + $scope.model.Transaction_Date + "',Deci: '" + $scope.model.Deci + "'}");
        _result.then(function (response) {
            if (response.success) {
                // $("#DetEntTabs").tabs();
                //$scope.model = EntityModel.SetEntityModel(response.data); //response.data;//
                $scope.model.JrnlDtlsList[index].Amount_LCY = response.data[0].Amount_LCY;               
                $scope.model.JrnlDtlsList[index].Amount_FCY = response.data[0].Amount_FCY; 
                $('#txtCNarration_' + index).focus();
            }
            else {
                alert("Error in fetching data from server.");
            }

        });

    }; 
    $scope.DR_DR_Changed = function (index, JrnlDtl) {

        if (JrnlDtl.Amount_LCY == '') return;
        if (JrnlDtl.DR_CR == 'C') {
            if ((JrnlDtl.Amount_LCY.indexOf('-') == -1)) {               
                $scope.model.JrnlDtlsList[index].Amount_LCY = "-" + JrnlDtl.Amount_LCY;
                $scope.model.JrnlDtlsList[index].Amount_FCY = "-" + JrnlDtl.Amount_FCY;
                return false;
            }
         
        }
        else if (JrnlDtl.DR_CR == "D") {

            if (!(JrnlDtl.Amount_LCY.indexOf('-') == -1)) {               
                $scope.model.JrnlDtlsList[index].Amount_LCY = $scope.model.JrnlDtlsList[index].Amount_LCY.replace('-', '');
                $scope.model.JrnlDtlsList[index].Amount_FCY = $scope.model.JrnlDtlsList[index].Amount_FCY.replace('-', '');
                return false;
            }   
        }
        else {
            $scope.model.JrnlDtlsList[index].Amount_FCY = '';  $scope.model.JrnlDtlsList[index].Amount_LCY = ''; return false;
        }
        return false;
    };
    $scope.CreateNew = function (Ctrl) {

        $("#div_Fields").slideDown("slow");
        $("#div_Grid").slideUp("slow");
        $("#CreateT").show();
        $("#ReverseT").hide();
        $("#ViewT").hide();
        $("#Cupdate").hide();
        $scope.model = EntityModel.GetEntityModel();
        $scope.ResetModel = angular.copy($scope.model);
        $scope.detdata = EntityDataModel.GetEntityDataModel();
        //$scope.GetDefaultData();
        $('#txtAccountNo').removeClass('linkDisabled');
        $('#btn_AccountNo').removeClass('linkDisabled');
        PageButtons(true, false, false);
        $scope.model.JrnlDtlsList[0].DR_CR = $scope.detdata.DebitCreditList[0].Id;
       // $scope.isDisabled = 1;
        return false;
    };
    $scope.reset = function ($event) {
        $scope.model = EntityModel.GetEntityModel();
        $scope.ResetModel = angular.copy($scope.model);
        $("#div_Fields").slideUp("slow");
        $("#div_Grid").slideDown("slow");
       // $('#txtEventType_1').val('');
        $('#txtAccountNo').removeClass('linkDisabled');
        $('#btn_AccountNo').removeClass('linkDisabled');
        ClearERROR();
        return false;// $event.preventDefault();
    };
}
function EditData(ctrl) {
    var Transaction_ID = ctrl.parentNode.parentElement.cells[0].innerHTML;
    var RecordType = ctrl.parentNode.parentElement.cells[5].innerHTML;
    var VerNo = 0;
    var ID = 0;    
    PageButtons(false, true, false);
    var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
    var VarDMLMode = "V";   
    scope.GetJrnTranByAppNo(Transaction_ID, RecordType, VarDMLMode, VerNo,ID);
}
function ViewData(ctrl) {
    var Transaction_ID = ctrl.parentNode.parentElement.cells[0].innerHTML;
    var RecordType = ctrl.parentNode.parentElement.cells[5].innerHTML;
    var VerNo =0;
   var ID =0;
    PageButtons(false, false, false);
    var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
    var VarDMLMode = "V"   
    scope.GetJrnTranByAppNo(Transaction_ID, RecordType, VarDMLMode, VerNo, ID);
}
function ReverseData(ctrl) {
    var Transaction_ID = ctrl.parentNode.parentElement.cells[0].innerHTML;
    var RecordType = ctrl.parentNode.parentElement.cells[5].innerHTML;
    var VerNo = 0;
    var ID = 0;
    PageButtons(false, false, true);
    var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
    var VarDMLMode = "R"
    scope.GetJrnTranByAppNo(Transaction_ID, RecordType, VarDMLMode, VerNo, ID);
}
function nodatafound(grdName, no) {
    removeTableRow(grdName);
    $('#' + grdName).append("<tr id=trid>"
            + "<td style='text-align:center;font-weight:bold;' colspan='" + no + "'>No data found</td>"
            + "</tr>");
}
function FillGrid(data) {

    try {
        removeTableRow('gv_JrnlTrans');
        if (data.d == "FALSE") {

            nodatafound('gv_JrnlTrans', 13);
            return;
        }
        result = jQuery.parseJSON(data.d);
        if (result == null) {
            nodatafound('gv_JrnlTrans', 13);
            return;
        }
        if (result.length <= 0) {
            nodatafound('gv_JrnlTrans', 13);
            return;
        }
        else {
            removeTableRow('grdDetailsEntry');
            var tdata = jQuery.parseJSON(data.d);
            removeTableRow('gv_JrnlTrans');
            if (tdata.length > 0) {
                for (var i = 0; i < tdata.length; i++) {
                    var st = "";
                    var st1 = "";
                    var dwn = "";
                   
                    if (tdata[i].Record_Type == 'L') {
                        st = "";
                        $("#gv_JrnlTrans td:nth-child(7),th:nth-child(7)").show();
                    }
                    else {
                       
                        st = "style='Display:none;cursor:pointer;'";
                        $("#gv_JrnlTrans td:nth-child(7),th:nth-child(7)").hide();
                    }

                    //if ($('#hdnfld_DMode').val() == 'H' || tdata[i].RecordType == 'R') {
                    //    st1 = "style='Display:none;cursor:pointer;'";
                    //}
                    var versty = '';//"style='Display:none'";
                    
                    
                    $('#gv_JrnlTrans').append("<tr><td>" + ReplacceUndifined(tdata[i].Transaction_ID) + "</td><td>"
                        + ReplacceUndifined(tdata[i].Transaction_Date) + "</td><td>"
                        + ReplacceUndifined(tdata[i].Event_Type) + "</td><td>"
                        + ReplacceUndifined(tdata[i].Fund_ID) + "</td><td>"
                        + ReplacceUndifined(tdata[i].AMC_Code) + "</td><td>"
                        + tdata[i].Record_Type + "</td>"
                        //+ "<td " + versty + ">" + tdata[i].VerNo + "</td>"
                       //+ "<td><a style='display:none;' id='a_Edit_" + i + "' onclick='EditData(this);'><img id='img_Edit_" + i + "' alt='Edit' title='Edit' src='../Images/edit.png' /></a></td>"
                       + "<td " + st + "><a  id='a_Reverse_" + i + "' onclick='ReverseData(this);'><img id='img_Reverse_" + i + "' alt='Reverse' title='Reverse' src='../Images/close.png' /></a></td>"
                       + "<td><a id='a_View_" + i + "' onclick='ViewData(this);'><img id='img_View_" + i + "' alt='View Details' title='View' src='../Images/view1.jpg' /></a></td>"
                       //+ "<td style='Display:none'>" + tdata[i].ID + "</td>"
                       + "</tr>");

                }
            }

        }
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
    //GetPagelevelAccess();
}
function ViewImage(Id) {

    var url = "DownloadDetFiles.aspx?ID=" + Id + "";
    window.open(url, "popup", "width=500,height=20,scrollbars=yes");
}
function ReplacceUndifined(vobj) {
    if (vobj == undefined) {
        return '';
    }
    else { return vobj; }
}
function PageButtons(Save, Update, Reverse) {

    if (!Save || Save == false) $('#btn_Save').hide();
    else $('#btn_Save').show();

    if (!Update || Update == false) $('#btn_Update').hide();
    else $('#btn_Update').show();

    if (!Reverse || Reverse == false) $('#btn_Reverse').hide();
    else $('#btn_Reverse').show();
} 
function showclientlkp() {    
    OpenDynamicModalPopup('Currency_Decimals', 'V_AccountInfo', 'Fund_ID', 'txtAccountNo', 'hdn_AccountNo', 'GetCAccnt');
    return false;
}
function GetCAccnt(obj) {
    var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
    scope.$apply(function () {
        scope.model.Fund_ID = $('#txtAccountNo').val();
        var arr = [];             //new storage
        obj[2] = obj[2].split('-');     //split by spaces
        arr.push(obj[2].shift());    //add the number
          //and the rest of the string
        scope.model.AccountName = obj[2].join('-');
        scope.model.Deci = $('#hdn_AccountNo').val();
        scope.model.JrnlDtlsList.forEach(function (JrnlDtls) {          
            JrnlDtls.Fund_Currency = obj[3];
        });
        scope.model.fCurrency = obj[3];
        var  $element = $('#txtAccountNo');
        $element.data("title", "").removeClass("error").tooltip("destroy");
    });
}
function ShowEventTypeLookup() {
    OpenDynamicModalPopup('Prefix', 'Eventtype', 'Event_Type', 'txtEventType', 'hdnPrefix', 'GetEvnttype', 'Event_Type', 'JRNL');
    return false;
} 
function GetEvnttype(obj) {
    var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
    scope.$apply(function () {
        scope.model.Event_Type = $('#txtEventType').val();
        //scope.model.Prefix = $('#hdnPrefix').val();
        //$('#txtEventType_1').val(scope.model.Event_Type);
    });
} 
function ShowBankAccount() {
    if ($("#txtAccountNo").val().length == 0) { alert('please select Account No'); return false;}
    OpenDynamicModalPopup('GL_Account', 'V_BANK_Account', 'GL_Account', 'txtBankAccount', 'hdn_BankAccount', 'GentBank', 'Fund_ID', $("#txtAccountNo").val(), 0, 'Bank ledger');
    return false;
}
function GentBank(obj) {
    var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
    scope.$apply(function () {
        scope.model.Bank_Account = $('#txtBankAccount').val();
    });
} 
function ShowSecurityCode() {   
    OpenDynamicModalPopup('Security_Code', 'V_SecInfo', 'Security_Code', 'txtSecurityCode', 'hdn_SecurityCode', 'GetSecurityCode', '','',0,'Security Code Fetch');
    return false;
}
function GetSecurityCode(obj) {
    var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
    scope.$apply(function () {
        scope.model.Security_Code = $('#txtSecurityCode').val();
    });
}
function GetGlAccount(obj) {
    var scope = angular.element(document.getElementById('JrnlTranDiv')).scope();
    var index = txtglaccount.split("_")[1];
    scope.$apply(function () {
        var count = 0;
        if (scope.model.JrnlDtlsList[index].GL_Account != $('#' + txtglaccount).val()) {
            scope.model.JrnlDtlsList.forEach(function (JrnlDtls) {
                if (JrnlDtls.GL_Account === $('#' + txtglaccount).val()) {
                    count++;
                }
            });
        }

        if (count == 0) {

            scope.model.JrnlDtlsList[index].GL_Account = $('#' + txtglaccount).val();
            scope.model.JrnlDtlsList[index].GL_AccountName = obj[1];
            scope.model.SeCurrency = obj[2];
            scope.GetExchangeRate(index);
            $(".ui-dialog-content").dialog("close");
        }
        else {
            scope.model.JrnlDtlsList[index].GL_Account = "";
            scope.model.JrnlDtlsList[index].GL_AccountName = "";
            alert('GLAccount Should not be Same');           
            $('#' + txtglaccount).val('');           
            $('#' + txtglaccount).focus();           
          
        }
      
        if (scope.model.JrnlDtlsList[0].GL_Account != "") {
            $('#txtAccountNo').addClass('linkDisabled');
            $('#btn_AccountNo').addClass('linkDisabled');
        }
        else {
            $('#txtAccountNo').removeClass('linkDisabled');
            $('#btn_AccountNo').removeClass('linkDisabled');
        }
        return false;
    });
   
}

$(function () {


    $("#PopUpOfIHNO").dialog({

        autoOpen: false,
        height: "auto",
        width: "auto",
        left: 200,
        top: 300,
        modal: true,
        buttons: {

            OK: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            $('#PopUpOfIHNO').dialog("close");
        }
    });
});
function RemmoveUndifined(vobj) {
    return (vobj === undefined) ? "" : vobj;
}

function CreateTable(tdata) {
    $('#PopUpOfIHNO').html('');
    if (tdata.JrnlTran.length > 0) {
        var table = $("<table  border=1></table>").appendTo("#PopUpOfIHNO");
        //Create table header row
        var rowHeader = $("<tr></tr>").appendTo(table);
        $("<td></td>").text("GL_Account").appendTo(rowHeader);
        $("<td style='color:red;'></td").text("Remarks").appendTo(rowHeader);

        //Get JSON data by calling action method in controller

        $.each(tdata.JrnlTran, function (i, value) {

            //Create new row for each record
            var row = $("<tr></tr>").appendTo(table);
            $("<td></td>").text(value.GL_Account).appendTo(row);
            $("<td style='color:red;'></td>").text(value.Remarks.replace(/,/g, '\n')).appendTo(row);
        });

        $('#PopUpOfIHNO').dialog("open");
    }
}